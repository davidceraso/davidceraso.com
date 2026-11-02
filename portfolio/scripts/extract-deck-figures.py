#!/usr/bin/env python3
"""Extract in-slide UI images and content crops from deck.pdf for the DCM case study."""
from __future__ import annotations

import os
import sys

try:
    import pymupdf as fitz
except ImportError:
    import fitz  # noqa: F401

ROOT = os.path.join(os.path.dirname(__file__), "..")
PDF = os.path.join(ROOT, "assets/disney-campaign-manager/deck.pdf")
FIG = os.path.join(ROOT, "assets/disney-campaign-manager/figures")


def crop_page(doc, page_num: int, name: str, top=0.14, bottom=0.88, left=0.05, right=0.92) -> None:
    page = doc[page_num - 1]
    r = page.rect
    clip = fitz.Rect(r.width * left, r.height * top, r.width * right, r.height * bottom)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
    path = os.path.join(FIG, name)
    pix.save(path)
    print("crop", page_num, "->", path)


def best_image(doc, page_num: int, name: str, min_area: int = 300_000) -> bool:
    page = doc[page_num - 1]
    best_pix = None
    best_area = 0
    for img in page.get_images(full=True):
        pix = fitz.Pixmap(doc, img[0])
        if pix.n - pix.alpha > 3:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        area = pix.width * pix.height
        if area > best_area:
            best_area = area
            best_pix = pix
    if best_pix and best_area >= min_area:
        path = os.path.join(FIG, name)
        best_pix.save(path)
        print("embed", page_num, "->", path)
        return True
    return False


def main() -> int:
    if not os.path.isfile(PDF):
        print(f"Missing {PDF}", file=sys.stderr)
        return 1
    os.makedirs(FIG, exist_ok=True)
    doc = fitz.open(PDF)

    for pn, fn in [
        (24, "problem-chart.png"),
        (30, "advertiser-controlled-themes.png"),
        (41, "externalization-roadmap.png"),
    ]:
        crop_page(doc, pn, fn, top=0.12, bottom=0.9, left=0.04, right=0.9)

    crop_page(doc, 36, "unified-platform-diagram.png", top=0.22, bottom=0.92, left=0.03, right=0.88)

    ui_pages = [
        (44, "internal-reporting-ui.png"),
        (46, "external-reporting-ui.png"),
        (52, "content-packages-ui.png"),
        (58, "audiences-ui.png"),
        (65, "dxc-unified-ui.png"),
        (67, "dxc-formats-ui.png"),
        (68, "dxc-creation-flow.png"),
        (69, "dxc-review-flow.png"),
    ]

    def embed_by_index(doc, page_num: int, index: int, name: str) -> bool:
        page = doc[page_num - 1]
        images = page.get_images(full=True)
        if index >= len(images):
            return False
        xref = images[index][0]
        pix = fitz.Pixmap(doc, xref)
        if pix.n - pix.alpha > 3:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        path = os.path.join(FIG, name)
        pix.save(path)
        print("embed", page_num, "index", index, "->", path)
        return True

    for pn, fn in ui_pages:
        if not best_image(doc, pn, fn):
            crop_page(doc, pn, fn)

    # Google Slides deck page 70 — Preview & share (chrome + TV ad still)
    if not embed_by_index(doc, 70, 0, "dxc-preview-ui.png"):
        crop_page(doc, 70, "dxc-preview-ui.png")
    embed_by_index(doc, 70, 1, "dxc-preview-ad-content.jpg")

    embed_by_index(doc, 66, 0, "dxc-ad-format-ui.png")

    # Venn diagram from slide 65 (right column)
    try:
        from PIL import Image

        page = doc[64]
        r = page.rect
        clip = fitz.Rect(r.width * 0.04, r.height * 0.08, r.width * 0.96, r.height * 0.92)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=clip, alpha=False)
        tmp = os.path.join(FIG, "_slide65_full.png")
        pix.save(tmp)
        full = Image.open(tmp)
        w, h = full.size
        full.crop((int(w * 0.52), int(h * 0.18), int(w * 0.98), int(h * 0.88))).save(
            os.path.join(FIG, "dxc-unified-diagram.png")
        )
        os.remove(tmp)
        print("crop 65 -> dxc-unified-diagram.png")
    except ImportError:
        crop_page(doc, 65, "dxc-unified-diagram.png", top=0.18, bottom=0.88, left=0.52, right=0.98)

    crop_page(doc, 72, "okr-results.png", top=0.12, bottom=0.92, left=0.04, right=0.96)

    doc.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
