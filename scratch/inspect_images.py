import os
from PIL import Image

header_dir = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project\assets\images\header"
output_file = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project\scratch\image_inspection.txt"

try:
    import pytesseract
    # Try to set tesseract path if it's in common windows locations
    # pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    has_tesseract = True
except ImportError:
    has_tesseract = False

results = []

print(f"Inspecting images in: {header_dir}")
print(f"Pytesseract available: {has_tesseract}")

for filename in os.listdir(header_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        full_path = os.path.join(header_dir, filename)
        try:
            with Image.open(full_path) as img:
                width, height = img.size
                text = ""
                if has_tesseract:
                    try:
                        # Crop to the middle-upper part where titles usually are to make it faster
                        # Or just run on the whole image
                        text = pytesseract.image_to_string(img)
                        text = text.strip().replace('\n', ' ')
                    except Exception as ocr_err:
                        text = f"OCR Error: {ocr_err}"
                
                results.append({
                    "filename": filename,
                    "width": width,
                    "height": height,
                    "text": text
                })
                print(f"Processed {filename}: size={width}x{height}, text_length={len(text)}")
        except Exception as e:
            results.append({
                "filename": filename,
                "error": str(e)
            })
            print(f"Error processing {filename}: {e}")

# Write results
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("Image Inspection Results:\n")
    f.write("========================\n\n")
    for r in results:
        f.write(f"File: {r['filename']}\n")
        if "error" in r:
            f.write(f"  Error: {r['error']}\n")
        else:
            f.write(f"  Dimensions: {r['width']}x{r['height']}\n")
            if r['text']:
                f.write(f"  Extracted Text: {r['text']}\n")
            else:
                f.write("  Extracted Text: None (or OCR disabled/failed)\n")
        f.write("-" * 40 + "\n")

print(f"Inspection complete. Written to {output_file}")
