const str2ab = ( str: string ): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};
const ab2str = ( buf: ArrayBuffer ): string => {
  const buffer = new Uint8Array(buf);
  const array: number[] = [];
  buffer.forEach(item => array.push(item));
  let output = '';
  for ( let i = 0; i < array.length; i = i + 64000 ) {
    output = output + String.fromCharCode.apply(null, array.slice(i, i + 64000));
  }
  return output;
};

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
  
  return btoa(ab2str(key));
};

export const aesImportKey = async ( secretKey: string ): Promise< CryptoKey > => {
  const secretKeyString = atob(secretKey); // decoding base64

  const key = await crypto.subtle.importKey(
    'raw',
    str2ab(secretKeyString),
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

  const encryptedDataAsString = ab2str(encryptedData);
  const encryptedDataAsBase64 = btoa(encryptedDataAsString);

  const ivAsString = ab2str(iv);
  const ivAsBase64 = btoa(ivAsString);

  const result = JSON.stringify({
    encryptionIv: ivAsBase64,
    encryptedData: encryptedDataAsBase64,
  });
  return result;
};

export const aesDecrypt = async ( encryptedDataString: string, secretKey: string ): Promise< string > => {
  try {
    const { encryptionIv, encryptedData } = JSON.parse(encryptedDataString);
  
    const textDecoder = new TextDecoder();
  
    const ivStr = atob(encryptionIv);
    const ivAb = str2ab(ivStr);
  
    const encryptedDataStr = atob(encryptedData);
    const encryptedDataAb = str2ab(encryptedDataStr)
  
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

  const hashString = ab2str(hashArrayBuffer);
  const hashBase64 = btoa(hashString);

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

  return btoa(ab2str(key));
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
  // console.log(btoa(ab2str(iv)), ab2str(iv), iv)
  return ({
    key: btoa(ab2str(wrappedKeyObj)),
    iv: btoa(ab2str(iv))
  });
}

export const unwrapCryptoKey = async ( keyToUnwrap: string, iv: string, unwrappingKey: string ) => {

  const ivDecoded = atob(iv);
  const ivArrayBuffer = str2ab(ivDecoded);

  const wrappingKeyCryptoKey = await aesImportKey(unwrappingKey);

  const wrappedKeyDecoded = atob(keyToUnwrap);
  const wrappedKeyArrayBuffer = str2ab(wrappedKeyDecoded);


  // console.log(iv, ivDecoded, ivArrayBuffer)
  const unwrappedKeyObj = await crypto.subtle.unwrapKey(
    'raw',
    wrappedKeyArrayBuffer,
    wrappingKeyCryptoKey,
    { "name": "AES-GCM", iv: ivArrayBuffer },
    { "name": "AES-GCM", length: 256 },
    true,
    [ 'encrypt', 'decrypt' ]
  );
  console.log('here')

  const exportedUnwrappedKeyObject = await crypto.subtle.exportKey(
    'raw',
    unwrappedKeyObj
  )

  return btoa(ab2str(exportedUnwrappedKeyObject));
}