import Compressor from "compressorjs";


export const compressImage = (
  file: File, 
  cb: (compressedResult: File | Blob ) => void, 
  quality: number = 0.8
) => new Compressor(file, {
    quality: quality,
    success: cb
  });
