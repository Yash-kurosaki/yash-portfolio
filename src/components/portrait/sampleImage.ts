export interface Dot {
  x: number;
  y: number;
  brightness: number;
  size: number;
}

export function sampleImage(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  gap: number = 4
): Dot[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
  const w = Math.floor(img.width * scale);
  const h = Math.floor(img.height * scale);

  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const pixels = imageData.data;

  const offsetX = (targetWidth - w) / 2;
  const offsetY = (targetHeight - h) / 2;

  const dots: Dot[] = [];

  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      const i = (y * w + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a < 50) continue;

      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      if (brightness > 0.08) {
        dots.push({
          x: (x + offsetX) / targetWidth,
          y: (y + offsetY) / targetHeight,
          brightness,
          size: 0.5 + brightness * 1.5,
        });
      }
    }
  }

  return dots;
}
