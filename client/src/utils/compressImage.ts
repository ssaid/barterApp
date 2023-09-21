import Compressor from "compressorjs";


export const compressImage = 
(file: File, filename: string = null, quality: number = 0.8): Promise<File> =>
  new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      maxWidth: 900,
      maxHeight: 900,
      mimeType: 'image/jpeg',
      success: compressedImage => {
        const defaultFileName = `ityaimg_${Date.now()}.jpg`;
        const blob = new Blob([compressedImage], { type: 'image/jpeg' });
        const file = new File([blob], filename || defaultFileName, { type: 'image/jpeg' });
        resolve(file);
      },
      error: reject
    })
  })
