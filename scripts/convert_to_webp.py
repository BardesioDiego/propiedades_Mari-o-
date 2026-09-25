#!/usr/bin/env python3
"""
Convierte imágenes PNG/JPG del proyecto a WebP y actualiza las referencias HTML.
Uso:
    py -3 scripts/convert_to_webp.py
    python scripts/convert_to_webp.py
Requiere: pillow
    py -3 -m pip install pillow
"""

from pathlib import Path
from PIL import Image
import os

root = Path(__file__).resolve().parents[1]
image_root = root / "assets" / "images"

if not image_root.exists():
    raise FileNotFoundError(f"No existe la carpeta de imágenes: {image_root}")

image_extensions = {".png", ".jpg", ".jpeg"}
converted = []

for image in sorted(image_root.rglob("*")):
    if image.is_dir() or image.suffix.lower() not in image_extensions:
        continue

    webp = image.with_suffix(".webp")
    if webp.exists():
        continue

    try:
        with Image.open(image) as img:
            if img.mode in ("RGBA", "LA"):
                img = img.convert("RGBA")
            elif img.mode not in ("RGB", "L"):
                img = img.convert("RGB")
            img.save(webp, "WEBP", quality=80, method=6)
        converted.append((image, webp))
        print(f"Convertido: {image.relative_to(root)} -> {webp.relative_to(root)}")
    except Exception as exc:
        print(f"Error al convertir {image}: {exc}")

html_files = list(root.rglob("*.html"))
updated_files = []

for html_file in html_files:
    original = html_file.read_text(encoding="utf-8", errors="ignore")
    updated = original

    for original_image, webp_image in converted:
        png_rel = os.path.relpath(original_image, html_file.parent).replace("\\", "/")
        webp_rel = os.path.relpath(webp_image, html_file.parent).replace("\\", "/")
        updated = updated.replace(png_rel, webp_rel)

    if updated != original:
        html_file.write_text(updated, encoding="utf-8")
        updated_files.append(html_file)
        print(f"Actualizado HTML: {html_file.relative_to(root)}")

print("\nResumen:")
print(f"- Imágenes convertidas: {len(converted)}")
print(f"- Archivos HTML actualizados: {len(updated_files)}")
