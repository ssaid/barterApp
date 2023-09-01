
import React, { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';

type CameraCaptureProps = {
  onClick: (files: File[]) => void;

}

const CameraCapture = ({ onClick }: CameraCaptureProps) => {

  const handleCapture = () => {
    // Code para capturar una foto desde la cámara (puedes utilizar librerías de terceros para esto).
    // Por ejemplo, puedes utilizar la API de getUserMedia.
    
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
          video.play();

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            blob => {
              const file = new File([blob], 'image.png', { type: 'image/png' });
              onClick([file]);
            }

          );

          stream.getTracks().forEach((track) => track.stop());
        });
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara:', error);
      });
  };

  return (
    <div 
      className="bg-content2 p-4 rounded-md sm:h-32 w-full flex items-center border border-dashed cursor-pointer"
      onClick={handleCapture}
    >
      <span className="flex gap-2 items-center justify-center w-full">
        <AiFillCamera />
        <p>Tomar foto</p>
      </span>
    </div>

  );
};

export default CameraCapture;
