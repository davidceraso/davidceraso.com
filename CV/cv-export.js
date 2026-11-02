(function () {
    const HTML2PDF_SRC = '/CV/vendor/html2pdf.bundle.min.js';
    const PDF_FILENAME = 'DavidCeraso_CV.pdf';

    const PDF_MARGIN_IN = 0;
    /** 3× ≈ 216 DPI on US Letter — sharp screen/print without huge PDFs at 4×. */
    const CANVAS_SCALE = 3;
    const MIN_BASE_PX = 5.5;
    const LETTER_BASE_FONT_PX = 9;
    const LETTER_W_PX = 612;
    const LETTER_H_PX = 792;
    const HTML2PDF_LOAD_MS = 20000;

    /** Must run synchronously inside the click handler (before any await). */
    function openPreviewPlaceholderTab() {
        const tab = window.open('about:blank', '_blank', 'noopener,noreferrer');
        if (!tab) {
            return null;
        }
        try {
            tab.opener = null;
            tab.document.title = 'David Ceraso CV';
            tab.document.body.innerHTML =
                '<p style="font:14px system-ui,sans-serif;padding:24px;color:#0000ff">Generating PDF preview…</p>';
        } catch (_) {
            /* cross-origin guard; location will be set when PDF is ready */
        }
        return tab;
    }

    function downloadPdfBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename || PDF_FILENAME;
        anchor.rel = 'noopener';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 120000);
    }

    function loadPdfIntoPreviewTab(previewTab, blob) {
        const url = URL.createObjectURL(blob);
        if (!previewTab || previewTab.closed) {
            const fallback = window.open(url, '_blank', 'noopener,noreferrer');
            if (!fallback) {
                URL.revokeObjectURL(url);
                throw new Error('Pop-up blocked — allow pop-ups to preview the PDF.');
            }
            fallback.opener = null;
            return;
        }
        try {
            previewTab.location.replace(url);
        } catch (_) {
            previewTab.location.href = url;
        }
    }

    function closePreviewTab(previewTab) {
        if (previewTab && !previewTab.closed) {
            try {
                previewTab.close();
            } catch (_) {
                /* ignore */
            }
        }
    }

    function withTimeout(promise, ms, message) {
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error(message)), ms);
            }),
        ]);
    }

    function loadHtml2Pdf() {
        if (typeof window.html2pdf === 'function') {
            return Promise.resolve(window.html2pdf);
        }

        const waitForGlobal = () =>
            new Promise((resolve, reject) => {
                const started = Date.now();
                (function poll() {
                    if (typeof window.html2pdf === 'function') {
                        resolve(window.html2pdf);
                        return;
                    }
                    if (Date.now() - started >= HTML2PDF_LOAD_MS) {
                        reject(new Error('PDF library load timed out'));
                        return;
                    }
                    setTimeout(poll, 40);
                })();
            });

        return withTimeout(
            new Promise((resolve, reject) => {
                if (typeof window.html2pdf === 'function') {
                    resolve(window.html2pdf);
                    return;
                }

                const existing = document.querySelector('script[data-cv-html2pdf]');
                if (existing) {
                    if (existing.dataset.cvHtml2pdfLoaded === 'error') {
                        existing.remove();
                    } else {
                        waitForGlobal().then(resolve).catch(reject);
                        return;
                    }
                }

                const script = document.createElement('script');
                script.src = HTML2PDF_SRC;
                script.async = true;
                script.dataset.cvHtml2pdf = 'true';
                script.onload = () => {
                    script.dataset.cvHtml2pdfLoaded = 'true';
                    if (typeof window.html2pdf === 'function') {
                        resolve(window.html2pdf);
                    } else {
                        waitForGlobal().then(resolve).catch(reject);
                    }
                };
                script.onerror = () => {
                    script.dataset.cvHtml2pdfLoaded = 'error';
                    reject(new Error('Could not load PDF library'));
                };
                document.head.appendChild(script);
            }),
            HTML2PDF_LOAD_MS,
            'PDF library load timed out'
        );
    }

    function waitForLayout() {
        return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }

    async function ensureExportFonts() {
        if (!document.fonts || !document.fonts.load) {
            return;
        }
        try {
            await Promise.all([
                document.fonts.load('400 9px "Courier Prime"'),
                document.fonts.load('700 9px "Courier Prime"'),
                document.fonts.load('400 14px "Courier Prime"'),
                document.fonts.load('700 14px "Courier Prime"'),
                document.fonts.load('700 40px "Replica Pro"'),
            ]);
            await document.fonts.ready;
        } catch (_) {
            /* fall back to system / Courier New */
        }
    }

    function getLetterPageFromTrigger(trigger) {
        if (!trigger) {
            return null;
        }
        const inSheet = trigger.closest('.cv-sheet');
        if (inSheet) {
            return inSheet.querySelector('[data-cv-letter-page]');
        }
        return trigger.closest('[data-cv-letter-page]');
    }

    function letterPageIsVisible(letterPage) {
        if (!letterPage) {
            return false;
        }
        if (letterPage.closest('#cv-preview-source, .cv-preview-root__source')) {
            return true;
        }
        const panel = letterPage.closest('.project-panel');
        if (panel && !panel.classList.contains('is-active')) {
            return false;
        }
        return letterPage.offsetWidth > 0 && letterPage.offsetHeight > 0;
    }

    function canvasHasContent(canvas) {
        if (!canvas || canvas.width < 10 || canvas.height < 10) {
            return false;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return false;
        }
        let nonWhite = 0;
        const step = Math.max(4, Math.floor(canvas.width / 80));
        for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
                const p = ctx.getImageData(x, y, 1, 1).data;
                if (p[3] > 8 && (p[0] < 250 || p[1] < 250 || p[2] < 250)) {
                    nonWhite += 1;
                }
            }
        }
        return nonWhite >= 12;
    }

    function letterPageInPortfolioPreview(letterPage) {
        return Boolean(
            letterPage.closest('.case-study--cv, #project-cv') &&
                !letterPage.closest('.cv-exporting')
        );
    }

    function innerContentHeight(inner, letterPage) {
        if (!inner) {
            return letterPage.scrollHeight;
        }
        return Math.max(inner.scrollHeight, inner.offsetHeight);
    }

    async function loadExportFontsAtSize(px) {
        if (!document.fonts || !document.fonts.load) {
            return;
        }
        const size = Math.max(MIN_BASE_PX, px);
        try {
            await Promise.all([
                document.fonts.load('400 ' + size + 'px "Courier Prime"'),
                document.fonts.load('700 ' + size + 'px "Courier Prime"'),
                document.fonts.load('700 ' + Math.round(size * 1.55) + 'px "Replica Pro"'),
            ]);
            await document.fonts.ready;
        } catch (_) {
            /* ignore */
        }
    }

    /** Letter capture at 612pt — same type/page ratio as portfolio preview (9px @ 612, scaled by width on screen). */
    async function applyLetterTypographyForCapture(letterPage) {
        letterPage.style.fontSize = LETTER_BASE_FONT_PX + 'px';
        await waitForLayout();
        await loadExportFontsAtSize(LETTER_BASE_FONT_PX);
        await waitForLayout();
    }

    function clearInnerExportTransform(inner) {
        if (!inner) {
            return;
        }
        inner.style.transform = '';
        inner.style.width = '';
        inner.style.transformOrigin = '';
    }

    /** Uniform scale (WYSIWYG) if copy runs long — never crush root em with micro type. */
    async function scaleInnerToFitIfNeeded(letterPage) {
        const inner = letterPage.querySelector('.cv-letter-page__inner');
        if (!inner) {
            return;
        }
        clearInnerExportTransform(inner);
        await waitForLayout();
        const maxHeight = inner.clientHeight;
        const scroll = innerContentHeight(inner, letterPage);
        if (scroll <= maxHeight + 1) {
            return;
        }
        const scale = maxHeight / scroll;
        inner.style.transformOrigin = 'top left';
        inner.style.transform = 'scale(' + scale + ')';
        inner.style.width = 100 / scale + '%';
        await waitForLayout();
    }

    /** Screen preview: width-scaled root em; standalone /CV may shrink to fit one page. */
    async function fitLetterPageForExport(letterPage) {
        if (!letterPageIsVisible(letterPage)) {
            return function () {};
        }

        const inner = letterPage.querySelector('.cv-letter-page__inner');
        const savedSize = letterPage.style.fontSize;
        const exporting = Boolean(
            letterPage.closest('.cv-exporting') ||
                letterPage.classList.contains('cv-letter-page--export-capture')
        );
        const portfolioPreview = letterPageInPortfolioPreview(letterPage);

        if (exporting) {
            return function restore() {
                letterPage.style.fontSize = savedSize;
                clearInnerExportTransform(inner);
            };
        }

        let basePx;
        if (portfolioPreview) {
            const width = letterPage.clientWidth || LETTER_W_PX;
            basePx = LETTER_BASE_FONT_PX * (width / LETTER_W_PX);
            letterPage.style.fontSize = basePx + 'px';
            await waitForLayout();
            return function restore() {
                letterPage.style.fontSize = savedSize;
            };
        }

        basePx = parseFloat(getComputedStyle(letterPage).fontSize) || LETTER_BASE_FONT_PX;
        letterPage.style.fontSize = basePx + 'px';
        await waitForLayout();

        const maxHeight = inner ? inner.clientHeight : letterPage.clientHeight;
        if (maxHeight < 1) {
            return function () {};
        }

        while (inner && innerContentHeight(inner, letterPage) > maxHeight + 1 && basePx > MIN_BASE_PX) {
            basePx -= 0.25;
            letterPage.style.fontSize = basePx + 'px';
            await waitForLayout();
        }

        if (inner && innerContentHeight(inner, letterPage) > maxHeight + 1) {
            const scale = maxHeight / innerContentHeight(inner, letterPage);
            basePx = Math.max(MIN_BASE_PX * 0.85, basePx * scale);
            letterPage.style.fontSize = basePx + 'px';
            await waitForLayout();
        }

        return function restore() {
            letterPage.style.fontSize = savedSize;
        };
    }

    function getJsPDFConstructor(html2pdf) {
        if (typeof window !== 'undefined' && window.jspdf && window.jspdf.jsPDF) {
            return window.jspdf.jsPDF;
        }
        if (typeof window !== 'undefined' && window.jsPDF) {
            return window.jsPDF;
        }
        const internal = html2pdf().internal;
        if (internal && internal.get && internal.get('pdf')) {
            return internal.get('pdf').constructor;
        }
        return null;
    }

    /** Freeze layout so html2canvas matches the on-screen letter box (font + box size). */
    function lockLetterPageForCapture(letterPage) {
        const computed = getComputedStyle(letterPage);
        const captureWidth = Math.max(1, Math.round(letterPage.offsetWidth));
        const measuredHeight = Math.max(1, Math.round(letterPage.offsetHeight));
        const aspectHeight = Math.max(1, Math.round(captureWidth * (LETTER_H_PX / LETTER_W_PX)));
        const captureHeight =
            Math.abs(measuredHeight - aspectHeight) <= 3 ? measuredHeight : aspectHeight;
        const saved = {
            fontSize: letterPage.style.fontSize,
            width: letterPage.style.width,
            height: letterPage.style.height,
            maxWidth: letterPage.style.maxWidth,
            boxSizing: letterPage.style.boxSizing,
        };
        letterPage.style.fontSize = computed.fontSize;
        letterPage.style.width = captureWidth + 'px';
        letterPage.style.maxWidth = captureWidth + 'px';
        letterPage.style.height = captureHeight + 'px';
        letterPage.style.boxSizing = 'border-box';
        return { saved, captureWidth, captureHeight };
    }

    function restoreLetterPageCaptureStyles(letterPage, saved) {
        if (!letterPage || !saved) {
            return;
        }
        letterPage.style.fontSize = saved.fontSize;
        letterPage.style.width = saved.width;
        letterPage.style.height = saved.height;
        letterPage.style.maxWidth = saved.maxWidth;
        letterPage.style.boxSizing = saved.boxSizing;
    }

    /** Rasterize the on-screen letter box and place it on a US Letter PDF (true WYSIWYG). */
    async function buildLetterPagePdfBlob(letterPage, html2pdf) {
        if (!letterPage) {
            throw new Error('CV letter page not found');
        }
        if (!letterPageIsVisible(letterPage)) {
            throw new Error('CV letter page is not visible');
        }

        const portfolioHost = letterPage.closest('.case-study--cv, #project-cv');
        const sheet = letterPage.closest('.cv-sheet');
        const lock = lockLetterPageForCapture(letterPage);
        const captureWidth = lock.captureWidth;
        const captureHeight = lock.captureHeight;

        const stage = document.createElement('div');
        stage.className = 'cv-export-stage cv-export-stage--wysiwyg';
        const stageWidth =
            portfolioHost && sheet ? Math.max(1, sheet.offsetWidth) : captureWidth;
        if (portfolioHost) {
            stage.classList.add('case-study--cv');
            stage.style.containerType = 'inline-size';
        }
        stage.style.width = stageWidth + 'px';
        stage.style.minHeight = captureHeight + 'px';

        const parent = letterPage.parentNode;
        const nextSibling = letterPage.nextSibling;

        stage.appendChild(letterPage);
        document.body.appendChild(stage);

        try {
            await ensureExportFonts();
            await waitForLayout();

            /* Capture only — do not pass jsPDF + pagebreak here; html2pdf renders a blank canvas. */
            const worker = html2pdf().set({
                margin: 0,
                html2canvas: {
                    scale: CANVAS_SCALE,
                    width: captureWidth,
                    height: captureHeight,
                    backgroundColor: null,
                    logging: false,
                    useCORS: true,
                    allowTaint: false,
                },
            });

            await worker.from(letterPage).toCanvas();
            const exportCanvas = await worker.get('canvas');
            if (!canvasHasContent(exportCanvas)) {
                throw new Error('Canvas capture failed');
            }

            const JsPDF = getJsPDFConstructor(html2pdf);
            if (!JsPDF) {
                await worker
                    .set({
                        jsPDF: {
                            unit: 'pt',
                            format: [LETTER_W_PX, LETTER_H_PX],
                            orientation: 'portrait',
                            compress: true,
                        },
                    })
                    .toPdf();
                const pdfBlob = await worker.output('blob');
                if (!pdfBlob || pdfBlob.size < 500) {
                    throw new Error('PDF generation failed');
                }
                return pdfBlob;
            }

            const pdf = new JsPDF({
                unit: 'pt',
                format: [LETTER_W_PX, LETTER_H_PX],
                orientation: 'portrait',
                compress: true,
            });
            const imgData = exportCanvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, LETTER_W_PX, LETTER_H_PX, undefined, 'FAST');
            const pdfBlob = pdf.output('blob');
            if (!pdfBlob || pdfBlob.size < 500) {
                throw new Error('PDF generation failed');
            }
            return pdfBlob;
        } finally {
            restoreLetterPageCaptureStyles(letterPage, lock.saved);
            if (parent) {
                if (nextSibling) {
                    parent.insertBefore(letterPage, nextSibling);
                } else {
                    parent.appendChild(letterPage);
                }
            }
            stage.remove();
            if (portfolioHost) {
                fitLetterPageForExport(letterPage).catch(() => {});
            }
        }
    }

    async function exportViaHtml2Pdf(letterPage, html2pdf, previewTab) {
        const pdfBlob = await buildLetterPagePdfBlob(letterPage, html2pdf);
        loadPdfIntoPreviewTab(previewTab, pdfBlob);
    }

    function buildPrintDocumentHtml(cloneOuterHtml) {
        const stylesheetHrefs = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map((link) => link.href)
            .filter(Boolean);

        const links = stylesheetHrefs.map((href) => '<link rel="stylesheet" href="' + href + '">').join('');

        return (
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
            '<title>David Ceraso CV</title>' +
            links +
            '<style>@page { size: letter; margin: 0; } html, body { margin: 0; padding: 0; background: #fff; }</style>' +
            '</head><body><div class="cv-sheet cv-sheet--print">' +
            cloneOuterHtml +
            '</div></body></html>'
        );
    }

    async function exportViaPrintIframe(letterPage) {
        if (!letterPage) {
            throw new Error('CV letter page not found');
        }
        const clone = letterPage.cloneNode(true);
        clone.classList.add('cv-letter-page--print');

        const iframe = document.createElement('iframe');
        iframe.className = 'cv-export-print-frame';
        iframe.setAttribute('title', 'CV print preview');
        document.body.appendChild(iframe);

        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(buildPrintDocumentHtml(clone.outerHTML));
        doc.close();

        await new Promise((resolve) => {
            iframe.onload = resolve;
            setTimeout(resolve, 1500);
        });

        const docLetter = iframe.contentDocument.querySelector('[data-cv-letter-page]');
        if (docLetter) {
            if (iframe.contentDocument.fonts && iframe.contentDocument.fonts.ready) {
                try {
                    await iframe.contentDocument.fonts.load('400 9px "Courier Prime"');
                    await iframe.contentDocument.fonts.load('700 9px "Courier Prime"');
                    await iframe.contentDocument.fonts.load('700 14px "Replica Pro"');
                    await iframe.contentDocument.fonts.ready;
                } catch (_) {
                    /* ignore */
                }
            }
            await fitLetterPageForExport(docLetter);
        }

        iframe.contentWindow.focus();
        iframe.contentWindow.print();

        setTimeout(() => iframe.remove(), 60000);
    }

    function exportViaPrintWindow(letterPage) {
        if (!letterPage) {
            throw new Error('CV letter page not found');
        }
        const clone = letterPage.cloneNode(true);
        clone.classList.add('cv-letter-page--print');

        const printWindow = window.open('', '_blank', 'noopener,noreferrer');
        if (!printWindow) {
            throw new Error('Pop-up blocked');
        }

        printWindow.document.open();
        printWindow.document.write(buildPrintDocumentHtml(clone.outerHTML));
        printWindow.document.close();

        printWindow.onload = async function () {
            const docLetter = printWindow.document.querySelector('[data-cv-letter-page]');
            if (docLetter) {
                await fitLetterPageForExport(docLetter);
            }
            printWindow.focus();
            printWindow.print();
        };
    }

    async function exportCvToPdf(letterPage, trigger) {
        if (!letterPage) {
            return;
        }

        const link = trigger && trigger.matches('[data-cv-export]') ? trigger : letterPage.closest('.cv-sheet')?.querySelector('[data-cv-export]');
        const label = link ? link.textContent : '';
        if (link) {
            link.textContent = 'Generating…';
            link.setAttribute('aria-busy', 'true');
        }

        try {
            await ensureExportFonts();
            const html2pdf = await loadHtml2Pdf();
            const pdfBlob = await buildLetterPagePdfBlob(letterPage, html2pdf);
            downloadPdfBlob(pdfBlob, PDF_FILENAME);
        } catch (error) {
            const detail = error && error.message ? error.message : 'Unknown error';
            window.alert(
                'PDF download failed (' +
                    detail +
                    '). Hard-refresh the page (cv-export.js?v=36) and try Download PDF again.'
            );
            throw error;
        } finally {
            if (link) {
                link.textContent = label || 'Download PDF';
                link.removeAttribute('aria-busy');
            }
        }
    }

    async function fitAllLetterPages(root) {
        const pages = root
            ? root.querySelectorAll('[data-cv-letter-page]')
            : document.querySelectorAll('[data-cv-letter-page]');
        if (!pages.length) {
            return;
        }
        await ensureExportFonts();
        for (const letterPage of pages) {
            await fitLetterPageForExport(letterPage);
        }
    }

    document.addEventListener('cv-letter-fit', (event) => {
        fitAllLetterPages(event.detail && event.detail.root).catch(() => {});
        loadHtml2Pdf().catch(() => {});
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => fitAllLetterPages().catch(() => {}));
    } else {
        fitAllLetterPages().catch(() => {});
    }

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-cv-export]');
        if (!trigger) {
            return;
        }

        event.preventDefault();
        const letterPage = getLetterPageFromTrigger(trigger);
        exportCvToPdf(letterPage, trigger).catch(() => {});
    });

    window.cvBuildPdfBlob = async function cvBuildPdfBlob(letterPage) {
        const html2pdf = await loadHtml2Pdf();
        return buildLetterPagePdfBlob(letterPage, html2pdf);
    };
})();
