import os

header_dir = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project\assets\images\header"
gallery_file = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project\scratch\gallery.html"

images = []
for filename in os.listdir(header_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        # Use relative path from scratch folder to assets
        rel_path = f"../assets/images/header/{filename}"
        images.append(filename)

html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>Header Images Catalog</title>
    <style>
        body {{ font-family: sans-serif; background: #eef2f3; margin: 30px; color: #333; }}
        h1 {{ text-align: center; color: #0d1146; margin-bottom: 30px; }}
        .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 25px; }}
        .card {{ background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: transform 0.2s; }}
        .card:hover {{ transform: translateY(-5px); }}
        .card img {{ width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd; }}
        .card h3 {{ margin: 15px 0 5px 0; font-size: 14px; word-break: break-all; color: #222; }}
        .card p {{ font-size: 12px; color: #666; margin: 0; }}
    </style>
</head>
<body>
    <h1>Header Images Catalog</h1>
    <div class="grid">
"""

for img in images:
    rel_path = f"../assets/images/header/{img}"
    html_content += f"""        <div class="card">
            <img src="{rel_path}" alt="{img}">
            <h3>{img}</h3>
        </div>
"""

html_content += """    </div>
</body>
</html>
"""

with open(gallery_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Generated gallery at {gallery_file} with {len(images)} images.")
