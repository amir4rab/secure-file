import QRCode from 'qrcode'

const qrCodeSettings: QRCode.QRCodeToDataURLOptions = {
  type: 'image/jpeg',
  margin: 1, 
  errorCorrectionLevel: 'H',
  width: 1024,
  color: {
    light: '#F5F5F5',
    dark: '#1F1F1F'
  }
}

export const qrCodeGenerator = async ( input: string, settings?: QRCode.QRCodeToDataURLOptions ) => {
  try {
    const imageData = await QRCode.toDataURL(
      input, 
      {
        ...qrCodeSettings,
        ...settings
      }
    );
    return imageData;
  } catch (err) {
    console.error(err)
  }
}

export default qrCodeGenerator
