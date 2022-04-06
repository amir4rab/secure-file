import base64ArrayBuffer from '@/utils/frontend/base64ArrayBuffer';

// const str2ab = ( str: string ): ArrayBuffer => {
//   const buf = new ArrayBuffer(str.length);
//   const bufView = new Uint8Array(buf);
//   for (let i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// };

// const ab2str = ( buf: ArrayBuffer ): string => {
//   const buffer = new Uint8Array(buf);
//   const array: number[] = [];
//   buffer.forEach(item => array.push(item));
//   let output = '';
//   for ( let i = 0; i < array.length; i = i + 64000 ) {
//     output = output + String.fromCharCode.apply(null, array.slice(i, i + 64000));
//   }
//   return output;
// };

export const aesKeyGenerate = async (): Promise<string> => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    [ "encrypt", "decrypt", "unwrapKey", "wrapKey" ]
  );

  
  const key = await crypto.subtle.exportKey(
    'raw',
    keyPair,
  );
  
  // return btoa(ab2str(key));
  return base64ArrayBuffer(key);
};

export const aesImportKey = async ( secretKey: string ): Promise< CryptoKey > => {
  // const secretKeyString = atob(secretKey); // decoding base64

  const key = await crypto.subtle.importKey(
    'raw',
    Buffer.from(secretKey, 'base64'),
    'AES-GCM',
    true,
    [ 'decrypt', 'encrypt', 'wrapKey', 'unwrapKey' ]
  );
  return key;
}

export const aesEncrypt = async ( data: string | object, secretKey: string ): Promise< string > => {
  const inputData = typeof data === 'object' ? JSON.stringify(data) : data;

  const textEncoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const key = await aesImportKey(secretKey);

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    textEncoder.encode(inputData)
  );

  // const encryptedDataAsString = ab2str(encryptedData); // old method
  // const encryptedDataAsBase64 = btoa(encryptedDataAsString);
  const encryptedDataAsBase64 = base64ArrayBuffer(encryptedData); // new method


  // const ivAsString = ab2str(iv); // old method
  // const ivAsBase64 = btoa(ivAsString);
  const ivAsBase64 = base64ArrayBuffer(iv); // new method

  const result = ivAsBase64 + encryptedDataAsBase64;
  return result;
};

export const aesDecrypt = async ( encryptedDataString: string, secretKey: string ): Promise< string > => {
  try {
    const encryptionIv = encryptedDataString.slice(0, 24);
    const encryptedData = encryptedDataString.slice(24, encryptedDataString.length);
  
    const textDecoder = new TextDecoder();
  
    const ivAb = Buffer.from(encryptionIv, 'base64');
    // const ivAb = str2ab(ivStr);
  
    const encryptedDataAb = Buffer.from(encryptedData, 'base64');
    // const encryptedDataAb = str2ab(encryptedDataStr)
  
    const key = await aesImportKey(secretKey);;
  
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivAb
      },
      key,
      encryptedDataAb
    );
  
    return textDecoder.decode(decryptedData);
  } catch(err) {
    console.error(err);
    return '';
  }
};

export const generateHash = async ( input: string ) => {
  const textEncoder = new TextEncoder();

  const hashArrayBuffer = await crypto.subtle.digest(
    {
      'name': 'SHA-512'
    },
    textEncoder.encode(input)
  )

  // const hashString = ab2str(hashArrayBuffer);
  // const hashBase64 = btoa(hashString);
  const hashBase64 = base64ArrayBuffer(hashArrayBuffer);

  return hashBase64;
}

export const hashCrypt = async ( input: string, count: number = 100 ) => {
  let output = input;
  for ( let i = 0; i < count; i++ ) {
    output = await generateHash(output);
  }
  return output;
}

export const pbkdf2KeyGenerate = async ( password: string ) => {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    [ 'deriveBits', 'deriveKey' ]
  );
  
  const keyObj = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(8),
      iterations: 100000,
      hash: 'SHA-512'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    [ 'encrypt', 'decrypt', 'wrapKey', 'unwrapKey' ]
  );

  const key = await crypto.subtle.exportKey(
    'raw',
    keyObj
  )

  return base64ArrayBuffer(key);
};

export const wrapCryptoKey = async ( keyToWrap: string, wrappingKey: string ) => {
  const wrappingKeyCryptoKey = await aesImportKey(wrappingKey);
  const keyToWrapCryptoKey = await aesImportKey(keyToWrap);
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const wrappedKeyObj = await crypto.subtle.wrapKey(
    'raw',
    keyToWrapCryptoKey,
    wrappingKeyCryptoKey,
    { "name": "AES-GCM", iv }
  );
  
  // return ({
  //   key: btoa(ab2str(wrappedKeyObj)),
  //   iv: btoa(ab2str(iv))
  // });


  const encryptedDataAsBase64 = base64ArrayBuffer(wrappedKeyObj);
  const ivAsBase64 = base64ArrayBuffer(iv);

  const result = ivAsBase64 + encryptedDataAsBase64;
  return result;
}

export const unwrapCryptoKey = async ( keyToUnwrap: string, unwrappingKey: string ) => {

  // const ivDecoded = atob(iv);
  // const ivArrayBuffer = str2ab(ivDecoded);

  console.log(keyToUnwrap)

  const encryptionIv = keyToUnwrap.slice(0, 24);
  const wrappedKeyString = keyToUnwrap.slice(24, keyToUnwrap.length);

  const ivArrayBuffer = Buffer.from(encryptionIv, 'base64');
  const wrappedKeyArrayBuffer = Buffer.from(wrappedKeyString, 'base64');

  const wrappingKeyCryptoKey = await aesImportKey(unwrappingKey);

  // const wrappedKeyDecoded = atob(keyToUnwrap);
  // const wrappedKeyArrayBuffer = str2ab(wrappedKeyDecoded);


  const unwrappedKeyObj = await crypto.subtle.unwrapKey(
    'raw',
    wrappedKeyArrayBuffer,
    wrappingKeyCryptoKey,
    { "name": "AES-GCM", iv: ivArrayBuffer },
    { "name": "AES-GCM", length: 256 },
    true,
    [ 'encrypt', 'decrypt' ]
  );

  const exportedUnwrappedKeyObject = await crypto.subtle.exportKey(
    'raw',
    unwrappedKeyObj
  )

  // return btoa(ab2str(exportedUnwrappedKeyObject));
  return base64ArrayBuffer(exportedUnwrappedKeyObject);
}