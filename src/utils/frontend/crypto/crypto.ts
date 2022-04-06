import base64ArrayBuffer from '@/utils/frontend/base64ArrayBuffer';

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
  
  return base64ArrayBuffer(key);
};

export const aesImportKey = async ( secretKey: string ): Promise< CryptoKey > => {

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

  const encryptedDataAsBase64 = base64ArrayBuffer(encryptedData);
  const ivAsBase64 = base64ArrayBuffer(iv);

  const result = ivAsBase64 + encryptedDataAsBase64;
  return result;
};

export const aesDecrypt = async ( encryptedDataString: string, secretKey: string ): Promise< string > => {
  try {
    const encryptionIv = encryptedDataString.slice(0, 24);
    const encryptedData = encryptedDataString.slice(24, encryptedDataString.length);
  
    const textDecoder = new TextDecoder();
  
    const ivAb = Buffer.from(encryptionIv, 'base64');
  
    const encryptedDataAb = Buffer.from(encryptedData, 'base64');
  
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

  const encryptedDataAsBase64 = base64ArrayBuffer(wrappedKeyObj);
  const ivAsBase64 = base64ArrayBuffer(iv);

  const result = ivAsBase64 + encryptedDataAsBase64;
  return result;
}

export const unwrapCryptoKey = async ( keyToUnwrap: string, unwrappingKey: string ) => {
  const encryptionIv = keyToUnwrap.slice(0, 24);
  const wrappedKeyString = keyToUnwrap.slice(24, keyToUnwrap.length);

  const ivArrayBuffer = Buffer.from(encryptionIv, 'base64');
  const wrappedKeyArrayBuffer = Buffer.from(wrappedKeyString, 'base64');

  const wrappingKeyCryptoKey = await aesImportKey(unwrappingKey);

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
  );

  return base64ArrayBuffer(exportedUnwrappedKeyObject);
}