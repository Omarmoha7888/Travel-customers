/**
 * Helper to compress and resize document images client-side before sending over HTTP
 * or storing in localStorage. Prevents 413 PayloadTooLargeError and browser quota errors.
 */
export async function compressDocumentImage(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.75
): Promise<{ dataUrl: string; fileName: string }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    const reader = new FileReader();
    reader.onerror = (e) => reject(e);
    reader.onload = () => {
      const img = new Image();
      img.onerror = (e) => reject(e);
      img.onload = () => {
        let { width, height } = img;

        // Maintain aspect ratio while bounding within maxWidth/maxHeight
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve({
            dataUrl: String(reader.result),
            fileName: file.name,
          });
        }

        // Use high quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to standard JPEG format to maintain strong compression
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({
          dataUrl: compressedDataUrl,
          fileName: file.name.replace(/\.[^/.]+$/, '.jpg'),
        });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
