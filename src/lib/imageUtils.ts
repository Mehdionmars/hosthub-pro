export interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.crossOrigin = "anonymous";
    image.src = url;
  });

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: CroppedArea,
  maxWidth = 1200,
  quality = 0.85
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Calculate the output dimensions while maintaining aspect ratio
  let outputWidth = pixelCrop.width;
  let outputHeight = pixelCrop.height;

  if (outputWidth > maxWidth) {
    const ratio = maxWidth / outputWidth;
    outputWidth = maxWidth;
    outputHeight = outputHeight * ratio;
  }

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return canvas.toDataURL("image/jpeg", quality);
};

export const optimizeImage = async (
  file: File,
  maxWidth = 1200,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imageSrc = e.target?.result as string;
        const image = await createImage(imageSrc);
        
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("No 2d context");
        }

        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
