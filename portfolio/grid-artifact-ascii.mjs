/** Live classic ASCII from a hidden <video> source (canvas renderer). */

const DEFAULT_CHARSET = ' .,:;i1tfLCG08@';

function drawVideoCover(ctx, video, destWidth, destHeight, fillStyle) {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, destWidth, destHeight);

    if (!vw || !vh || !destWidth || !destHeight) {
        if (vw && vh) {
            ctx.drawImage(video, 0, 0, destWidth, destHeight);
        }
        return;
    }

    const destAspect = destWidth / destHeight;
    const srcAspect = vw / vh;
    let sx;
    let sy;
    let sw;
    let sh;

    if (srcAspect > destAspect) {
        sh = vh;
        sw = vh * destAspect;
        sx = (vw - sw) / 2;
        sy = 0;
    } else {
        sw = vw;
        sh = vw / destAspect;
        sx = 0;
        sy = (vh - sh) / 2;
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, destWidth, destHeight);
}

export function mountGridArtifactAscii(canvas, video, options = {}) {
    const charset = options.charset ?? DEFAULT_CHARSET;
    const cellSize = options.cellSize ?? 5;
    const ink = options.ink ?? '#0000ff';
    const background = options.background ?? '#ffffff';
    const fontFamily = options.fontFamily ?? '"Courier New", monospace';
    const contrast = options.contrast ?? 2.1;
    const brightness = options.brightness ?? 0.04;
    const gamma = options.gamma ?? 0.72;
    const normalizeFrame = options.normalizeFrame ?? true;

    const ctx = canvas.getContext('2d', { alpha: false });
    const sample = document.createElement('canvas');
    const sampleCtx = sample.getContext('2d', { willReadFrequently: true });

    let layoutWidth = 0;
    let layoutHeight = 0;
    let rafId = 0;

    function layoutGrid() {
        const step = cellSize;
        const cols = Math.max(1, Math.floor(layoutWidth / step));
        const rows = Math.max(1, Math.floor(layoutHeight / step));
        const gridW = cols * step;
        const gridH = rows * step;
        return {
            cols,
            rows,
            step,
            offsetX: (layoutWidth - gridW) / 2,
            offsetY: (layoutHeight - gridH) / 2,
            fontPx: step
        };
    }

    function resize(width, height) {
        layoutWidth = Math.max(1, Math.round(width));
        layoutHeight = Math.max(1, Math.round(height));
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(layoutWidth * dpr);
        canvas.height = Math.round(layoutHeight * dpr);
        canvas.style.width = layoutWidth + 'px';
        canvas.style.height = layoutHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function toneMap(luminance, minL, maxL) {
        let lum = luminance;
        if (normalizeFrame && maxL > minL) {
            lum = (lum - minL) / (maxL - minL);
        }
        lum = (lum - 0.5) * contrast + 0.5 + brightness;
        lum = Math.min(1, Math.max(0, lum));
        lum = Math.pow(lum, gamma);
        return lum;
    }

    function pickChar(luminance) {
        const index = Math.round((1 - luminance) * (charset.length - 1));
        return charset[Math.min(charset.length - 1, Math.max(0, index))];
    }

    function drawFrame() {
        rafId = requestAnimationFrame(drawFrame);

        if (!layoutWidth || !layoutHeight || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            return;
        }

        const { cols, rows, step, offsetX, offsetY, fontPx } = layoutGrid();

        if (sample.width !== cols || sample.height !== rows) {
            sample.width = cols;
            sample.height = rows;
        }

        drawVideoCover(sampleCtx, video, cols, rows, background);
        const { data } = sampleCtx.getImageData(0, 0, cols, rows);

        let minL = 1;
        let maxL = 0;
        const lums = new Float32Array(cols * rows);

        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const idx = row * cols + col;
                const i = idx * 4;
                const lum =
                    (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
                lums[idx] = lum;
                if (lum < minL) {
                    minL = lum;
                }
                if (lum > maxL) {
                    maxL = lum;
                }
            }
        }

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, layoutWidth, layoutHeight);
        ctx.fillStyle = ink;
        ctx.font = `bold ${fontPx}px ${fontFamily}`;
        ctx.textBaseline = 'top';

        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const idx = row * cols + col;
                const char = pickChar(toneMap(lums[idx], minL, maxL));
                if (char === ' ') {
                    continue;
                }
                ctx.fillText(char, offsetX + col * step, offsetY + row * step);
            }
        }
    }

    resize(canvas.clientWidth || 320, canvas.clientHeight || 320);
    rafId = requestAnimationFrame(drawFrame);

    return {
        resize,
        destroy() {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = 0;
            }
        }
    };
}
