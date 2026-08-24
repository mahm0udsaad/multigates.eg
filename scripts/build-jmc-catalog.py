#!/usr/bin/env python3
"""Build the JMC catalog from the 88 replacement image pages in Supabase."""

from __future__ import annotations

import io
import json
import re
import urllib.request
import urllib.parse
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / "audit" / "current-db-snapshot.json"
OUTPUT = ROOT / "output" / "pdf" / "jmc-product-catalog.pdf"

SECTIONS = [
    ("Cam Followers", {"CF", "CF...V", "CFE", "CFH", "CR", "NART", "NAST", "NUKR", "NUTR", "TJ"}),
    ("Rod Ends", {"JF", "JFT", "JFTS", "JM", "JMT", "JMTS", "ZBL", "ZBS"}),
    ("Linear Bearings", {"ST"}),
    ("Needle Bearings", {"NA", "NK", "NKI"}),
    ("Spherical Plain Bearings", {"GE", "JES-JETS", "JET-JETS", "JS", "SB"}),
]


def natural_key(name: str) -> list[object]:
    return [int(piece) if piece.isdigit() else piece.lower() for piece in re.split(r"(\d+)", name)]


def draw_centered(c: canvas.Canvas, text: str, y: float, font: str, size: float, color: str) -> None:
    c.setFont(font, size)
    c.setFillColor(HexColor(color))
    c.drawString((A4[0] - stringWidth(text, font, size)) / 2, y, text)


def main() -> None:
    payload = json.loads(SNAPSHOT.read_text())
    brands = {row["id"]: row["slug"] for row in payload["tables"]["eg_brands"]}
    rows = [
        row
        for row in payload["tables"]["eg_products"]
        if brands.get(row["brand_id"]) == "jmc"
        and row.get("is_active") is False
        and row.get("image_url")
    ]
    if len(rows) != 88:
        raise RuntimeError(f"Expected 88 JMC catalog pages, found {len(rows)}")

    by_code: dict[str, list[dict[str, object]]] = {}
    for row in rows:
        code = str(row["name"]).split(" SERIES", 1)[0].split(" INCH", 1)[0]
        by_code.setdefault(code, []).append(row)

    ordered: list[tuple[str, list[dict[str, object]]]] = []
    used: set[str] = set()
    for title, codes in SECTIONS:
        section_rows: list[dict[str, object]] = []
        for code in codes:
            section_rows.extend(by_code.get(code, []))
            used.add(code)
        section_rows.sort(key=lambda row: natural_key(str(row["name"])))
        ordered.append((title, section_rows))

    unexpected = sorted(set(by_code) - used)
    if unexpected:
        raise RuntimeError(f"Unexpected JMC series: {unexpected}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    pdf.setTitle("JMC Product Catalog")
    pdf.setAuthor("Multi GATES Trading")
    pdf.setSubject("JMC bearing product catalog")

    navy = "#16345B"
    orange = "#E8912D"
    width, height = A4
    pdf.setFillColor(HexColor(navy))
    pdf.rect(0, 0, width, height, fill=1, stroke=0)
    pdf.setFillColor(HexColor(orange))
    pdf.rect(0, height - 22, width, 22, fill=1, stroke=0)
    draw_centered(pdf, "JMC", height * 0.61, "Helvetica-Bold", 54, "#FFFFFF")
    draw_centered(pdf, "PRODUCT CATALOG", height * 0.53, "Helvetica-Bold", 23, "#FFFFFF")
    draw_centered(pdf, "Bearing Solutions", height * 0.47, "Helvetica", 16, "#DCE6F2")
    draw_centered(pdf, "Multi GATES Trading", 54, "Helvetica", 11, "#DCE6F2")
    pdf.showPage()

    image_page_count = 0
    for section_title, section_rows in ordered:
        pdf.setPageSize(A4)
        width, height = A4
        pdf.setFillColor(HexColor("#F4F7FA"))
        pdf.rect(0, 0, width, height, fill=1, stroke=0)
        pdf.setFillColor(HexColor(orange))
        pdf.rect(0, 0, 16, height, fill=1, stroke=0)
        draw_centered(pdf, "JMC", height * 0.61, "Helvetica-Bold", 34, navy)
        draw_centered(pdf, section_title.upper(), height * 0.51, "Helvetica-Bold", 21, navy)
        draw_centered(pdf, f"{len(section_rows)} catalog pages", height * 0.45, "Helvetica", 12, "#56697F")
        pdf.showPage()

        for row in section_rows:
            name = str(row["name"])
            raw_url = str(row["image_url"])
            parsed_url = urllib.parse.urlsplit(raw_url)
            url = urllib.parse.urlunsplit(
                (parsed_url.scheme, parsed_url.netloc, urllib.parse.quote(parsed_url.path), parsed_url.query, parsed_url.fragment)
            )
            with urllib.request.urlopen(url, timeout=45) as response:
                data = response.read()
            with Image.open(io.BytesIO(data)) as source:
                source.load()
                pixel_width, pixel_height = source.size
                if source.mode not in ("RGB", "L"):
                    converted = Image.new("RGB", source.size, "white")
                    if "A" in source.getbands():
                        converted.paste(source, mask=source.getchannel("A"))
                    else:
                        converted.paste(source)
                    image_buffer = io.BytesIO()
                    converted.save(image_buffer, format="PNG", optimize=True)
                    image_buffer.seek(0)
                    image_reader = ImageReader(image_buffer)
                else:
                    image_reader = ImageReader(io.BytesIO(data))

                page_size = landscape(A4) if pixel_width > pixel_height * 1.12 else A4
                pdf.setPageSize(page_size)
                width, height = page_size
                pdf.setFillColorRGB(1, 1, 1)
                pdf.rect(0, 0, width, height, fill=1, stroke=0)
                margin = 18
                footer = 24
                available_width = width - 2 * margin
                available_height = height - 2 * margin - footer
                scale = min(available_width / pixel_width, available_height / pixel_height)
                draw_width = pixel_width * scale
                draw_height = pixel_height * scale
                x = (width - draw_width) / 2
                y = footer + margin + (available_height - draw_height) / 2
                pdf.drawImage(
                    image_reader,
                    x,
                    y,
                    width=draw_width,
                    height=draw_height,
                    preserveAspectRatio=True,
                    mask="auto",
                )
                pdf.setStrokeColor(HexColor("#D8E0E8"))
                pdf.line(margin, footer, width - margin, footer)
                pdf.setFont("Helvetica", 7.5)
                pdf.setFillColor(HexColor("#56697F"))
                pdf.drawString(margin, 10, f"JMC - {section_title} - {name}")
                image_page_count += 1
                pdf.drawRightString(width - margin, 10, str(image_page_count))
                pdf.showPage()

    pdf.save()
    print(f"Created {OUTPUT} with {image_page_count} source pages and {len(SECTIONS) + 1} divider pages")


if __name__ == "__main__":
    main()
