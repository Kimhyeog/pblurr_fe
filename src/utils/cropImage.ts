// utils/cropImage.ts

import pica from "pica";

/**
 * 자른 이미지를 Blob으로 반환하며, 해상도를 2배 업스케일링함
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: any
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    image.onload = async () => {
      // 1. 원본에서 자를 canvas
      const cropCanvas = document.createElement("canvas");
      cropCanvas.width = pixelCrop.width;
      cropCanvas.height = pixelCrop.height;
      const ctx = cropCanvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context not available"));

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // 2. 업스케일할 canvas (2배 해상도 예시)
      const upscaleCanvas = document.createElement("canvas");
      upscaleCanvas.width = pixelCrop.width * 2;
      upscaleCanvas.height = pixelCrop.height * 2;

      try {
        await pica().resize(cropCanvas, upscaleCanvas);

        upscaleCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.95
        ); // 품질 설정 가능
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = (error) => reject(error);
  });
}
