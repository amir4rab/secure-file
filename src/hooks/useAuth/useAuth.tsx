import { useEffect, useState, useCallback, createContext, useContext } from 'react';
import localforage from 'localforage';
import { v4 as uuidV4 } from 'uuid';
import { pbkdf2KeyGenerate, aesEncrypt, hashCrypt, aesDecrypt } from '@/utils/frontend/crypto';
import { useRouter } from 'next/router';

//** types **//
type StatusState = 'loading' | 'authenticated' | 'unauthenticated' | 'newUser';
type NameState = null | string;
type HashedPasswordState = null | string;
type EncryptedUuidV5NameSpace = null | string;
type AuthenticateFunction = ( password: string ) => Promise<boolean>;
type VerifyFunction = ( password: string ) => Promise<boolean>;
type SetupFunction = ( name: string, hashedPassword: string ) => Promise<boolean>;
type RecheckAuthenticationFunction = () => Promise<boolean>;
type UserRootSetting = {
  hashedPassword: string,
  name: string,
  encryptedUuidV5NameSpace: string
}
type UserObject = {
  password: string,
  name: string,
  uuidV5NameSpace: string
}

//** interfaces **//
interface AuthState {
  status: StatusState,
  name: NameState,
  password: HashedPasswordState;
  verifyPassword: VerifyFunction,
  authenticate: AuthenticateFunction;
  setup: SetupFunction;
  recheckAuthentication: RecheckAuthenticationFunction;
  uuidV5NameSpace: EncryptedUuidV5NameSpace;
  singout: ( level?: 'limited' | 'complete', redirectTo?: string ) => void;
}

//** provider default values **//
const authContextDefaultValues : AuthState = {
  status: 'loading',
  name: null,
  password: null,
  uuidV5NameSpace: null,
  authenticate: async ( password: string  ) => false,
  verifyPassword: async ( password: string  ) => false,
  setup: async ( name: string, password: string  ) => false,
  recheckAuthentication: async () => false,
  singout: async ( level: 'limited' | 'complete' = 'limited', redirectTo: string= '/' ) => {}
};

//** Context **//
export const AuthContext = createContext<AuthState>(authContextDefaultValues);

//** Provider **//
export const AuthProvider = ({ children }:{ children: JSX.Element }) => {
  const router = useRouter();
  const [ status, setStatus ] = useState<StatusState>('loading')
  const [ password, setPassword ] = useState< string | null >(null);
  const [ name, setName ] = useState<NameState>(null);
  const [ uuidV5NameSpace, setUuidV5NameSpace ] = useState< string | null >(null)


  const getDetails = async () => {
    const authObj : UserRootSetting | undefined | null = await localforage.getItem('root-settings');
    const localSessionPassword = sessionStorage.getItem('password');

    return ({
      authObj, localSessionPassword
    })
  }

  const verifyPassword = async ( password: string, hashedPassword: string ) => {
    const hashedInputPassword = await hashCrypt(password); 
    return (hashedInputPassword === hashedPassword);
  }

  const formVerifyPassword = async ( password: string ) => {
    const settingsObj: UserRootSetting | null = await localforage.getItem('root-settings');

    if ( settingsObj === null ) return false;

    const hashedPassword = settingsObj.hashedPassword;
    const result = await verifyPassword(password, hashedPassword);
    return result;
  }

  // checks users authentication state, returns <'unauthenticated' | 'newUser'> if the user is not authenticated and returns <'authenticated'> with user object is user is authenticated //
  const checkAuthentication = useCallback(
    async ( 
      authObj: UserRootSetting | undefined | null ,
      localSessionPassword: string | null
    ): Promise<{ state: StatusState, userObject: UserObject | null }> => {

    if ( typeof window === 'undefined' ) return ({ // exits the function on ssr //
      state: 'newUser',
      userObject: null
    });

    try {
      // const authObj = await localforage.getItem('root-settings');
      
      if ( typeof authObj === 'undefined' || authObj === null ) return ({ // returns "newUser" if there is no IndexDB record //
        state: 'newUser',
        userObject: null
      });

      // const localSessionPassword = sessionStorage.getItem('password');

      if ( localSessionPassword === null ) return ({ // returns "unauthenticated" if there is no password in session storage //
        state: 'unauthenticated',
        userObject: null
      });

      const userIndexedDbObj = authObj as UserRootSetting;

      const isPasswordVerified = await verifyPassword(localSessionPassword, userIndexedDbObj.hashedPassword!);

      if ( !isPasswordVerified ) { // runs the block if password doesn't match with hashed password and returns "unauthenticated" //
        sessionStorage.removeItem('password');
        return ({
          state: 'unauthenticated',
          userObject: null
        })
      }

      const key = await pbkdf2KeyGenerate(localSessionPassword);
      const decryptedUuidNameSpace = await aesDecrypt(userIndexedDbObj.encryptedUuidV5NameSpace, key);

      return ({ // returns "authenticated" every thing checks out
        state: 'authenticated',
        userObject: {
          name: userIndexedDbObj.name !== null ? userIndexedDbObj.name : 'unknown',
          password: localSessionPassword,
          uuidV5NameSpace: decryptedUuidNameSpace
        }
      });

    } catch (err) {
      console.error('Something went wrong when getting "root-settings"',err);
      return ({
        state: 'newUser',
        userObject: null
      })
    }
  }, []);

  const authenticate: AuthenticateFunction = async ( password: string ) => {
    sessionStorage.setItem('password', password);

    const value = await recheckAuthentication();
    return value;
  }

  const setup: SetupFunction = async ( name: string, password: string ) => {
    try {
      const hashedPassword = await hashCrypt(password);
      const uuidNameSpace = uuidV4();
      
      const key = await pbkdf2KeyGenerate(password);
      const encryptedUuidV5NameSpace = await aesEncrypt(uuidNameSpace, key);
      
      const userRootSettingsObj: UserRootSetting = {
        hashedPassword: hashedPassword,
        encryptedUuidV5NameSpace,
        name: name
      };

      sessionStorage.setItem('password', password);
      await localforage.setItem('root-settings',  userRootSettingsObj);
      await recheckAuthentication();
  
      return true;
    } catch(err) {
      console.error(err);
      return false; 
    }
  }

  const recheckAuthentication: RecheckAuthenticationFunction = useCallback( async () => {
    const { authObj, localSessionPassword } = await getDetails();
    const { state, userObject } = await checkAuthentication(authObj, localSessionPassword);

    if ( state !== 'authenticated' || userObject === null ) {
      setStatus(state);
      return false;
    }

    setStatus('authenticated');
    setName(userObject.name);
    setPassword(userObject.password);
    setUuidV5NameSpace(userObject.uuidV5NameSpace);

    return true;
  }, [ checkAuthentication ]);

  const singout = async ( level: 'limited' | 'complete' = 'limited', redirectTo: string = '/' ) => {
    sessionStorage.removeItem('password');
    if ( level === 'limited' ) {
      setStatus('unauthenticated')
    } else {
      await localforage.clear();
      await localforage.dropInstance({ name: 'files-storage' });
      setStatus('newUser')
    }
    setPassword(null)
    setName(null)
    setUuidV5NameSpace(null);
    router.push(redirectTo);
  }

  useEffect(() => {
    recheckAuthentication();
  }, [ recheckAuthentication ]);

  const value = {
    status,
    password,
    name,
    uuidV5NameSpace,
    authenticate,
    setup,
    recheckAuthentication,
    verifyPassword: formVerifyPassword,
    singout
  }

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}

//** Hook **//
const useAuth = () => {
  const auth = useContext(AuthContext);

  return {
    ...auth
  }
};

export default useAuth;
