export const WORKER_CODE = `
self.onmessage = async (e) => {
  if (typeof OffscreenCanvas === 'undefined') {
      self.postMessage({ fileId: e.data.fileId, success: false, error: "Browser not supported" });
      return;
  }
  
  const { fileId, bitmap, w, h, fmt, q, cx, cy, cw, ch, rot, flipH, flipV, filter, showVisualCrop, isMasking, masks, originalMimeType } = e.data;
  
  try {
    let canvasWidth = Math.max(1, w || bitmap.width);
    let canvasHeight = Math.max(1, h || bitmap.height);
    
    const finalCw = Math.max(1, cw || bitmap.width); 
    const finalCh = Math.max(1, ch || bitmap.height);

    if (showVisualCrop) { 
        canvasWidth = finalCw; 
        canvasHeight = finalCh; 
    } else if (Math.abs(rot) % 180 === 90) { 
        canvasWidth = h || bitmap.height; 
        canvasHeight = w || bitmap.width; 
    }

    const canvas = new OffscreenCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
    
    const actualFmt = (fmt === 'original' || !fmt) ? originalMimeType : fmt;
    const isTransparent = ['image/png', 'image/gif', 'image/webp'].includes(actualFmt);
    
    if (!isTransparent) { 
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); 
    }

    ctx.imageSmoothingEnabled = true; 
    ctx.imageSmoothingQuality = 'high';
    if (filter && filter !== 'none') ctx.filter = filter;

    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    if (rot) ctx.rotate((rot * Math.PI) / 180);
    if (flipH || flipV) ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    let drawW = (Math.abs(rot) % 180 === 90) ? canvasHeight : canvasWidth;
    let drawH = (Math.abs(rot) % 180 === 90) ? canvasWidth : canvasHeight;
    
    if (showVisualCrop) { 
        ctx.restore(); 
        ctx.save(); 
        if (filter && filter !== 'none') ctx.filter = filter; 
        ctx.drawImage(bitmap, cx, cy, cw, ch, 0, 0, canvasWidth, canvasHeight); 
    } else {
        // Draw Full Image
        ctx.drawImage(bitmap, -drawW / 2, -drawH / 2, drawW, drawH);
        
        // --- ID MASKING LOGIC (multiple boxes) ---
        // cx/cy/w/h are from the Top-Left of the original image; the context is
        // translated to the centre, so we subtract half the draw width/height.
        if (isMasking) {
            ctx.fillStyle = "#000000"; // Secure black redaction (pixels are removed)
            if (Array.isArray(masks) && masks.length) {
                for (const m of masks) {
                    if (m && m.w > 0 && m.h > 0) {
                        ctx.fillRect(m.x - drawW/2, m.y - drawH/2, m.w, m.h);
                    }
                }
            } else if (cw > 0 && ch > 0) {
                ctx.fillRect(cx - drawW/2, cy - drawH/2, cw, ch);
            }
        }
    }
    ctx.restore();

    let mimeType = actualFmt;
    // Only formats canvases can actually ENCODE. BMP/GIF requests silently
    // came back as PNG bytes but kept the wrong name — strict portals reject
    // a .bmp file with PNG bytes inside. Fall back to PNG honestly instead.
    const encodableMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!encodableMimeTypes.includes(mimeType)) mimeType = 'image/png';

    let qualityToUse = Math.max(0.1, Math.min(1, q || 0.8));
    if (mimeType === 'image/png') qualityToUse = undefined;

    const blob = await canvas.convertToBlob({ type: mimeType, quality: qualityToUse });
    if (bitmap.close) bitmap.close();
    self.postMessage({ fileId, success: true, blob, mimeType: mimeType });
    
  } catch (err) { 
      console.error(err);
      self.postMessage({ fileId, success: false, error: err.message }); 
  }
}`;