import os
from PIL import Image

header_dir = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project\assets\images\header"

mapping = {
    "01c8629c-f6d1-427b-bf0c-02af5999f2bd.png": "international-partnerships.webp",
    "1b4257da-3ab1-4b4f-b9b7-50fbf33825af.png": "international-education.webp",
    "4ea24e29-e6c9-4b45-a057-13890b6a5914.png": "virtual-labs.webp",
    "5baded0d-75a4-463a-b0a3-bae09ee06aca.png": "placement-employability.webp",
    "5ec312a3-de53-4327-b8b6-f743b5ef6a6b.png": "entrepreneurship-programs.webp",
    "881b0884-630e-4970-95b8-9543cd0ac970.png": "ai-proctoring.webp",
    "a43dc71b-6fa9-4b4d-b2ae-2a972e927387.png": "our-journey.webp",
    "c6f0c9ec-47f2-4a6e-85ee-e1fff8159d41.png": "contact-us.webp",
    "d3ee3b9d-6a42-4514-aed8-45970a18cd33.png": "ai-assessment.webp",
    "file_00000000082c720b837e2436c863f6e0.png": "platforms.webp",
    "file_000000001094720bbc3b2033d1c339ae.png": "placement-services.webp",
    "file_000000001bd8720b9e16582adb9d9d74.png": "institutional-solutions.webp",
    "file_000000003460720bae85524b343285ca.png": "research-innovation.webp",
    "file_000000003a40720b94b9a7d565684852.png": "careers.webp",
    "file_000000003b20720b886a3a3abeb8a74b.png": "services.webp",
    "file_000000003d00720baad82ae091a1d838.png": "ai-products.webp",
    "file_000000007260720bb95303c4c494f3f8.png": "industry-training.webp",
    "file_00000000762c720b8e084fd81f01853c.png": "vision-mission-values.webp",
    "file_000000008758720b92d150a40adfabb6.png": "lms.webp",
    "file_00000000a840720b8f1b55aa5fb4b534.png": "institutional-consulting.webp",
    "file_00000000c554720bbb40a6847bcbb503.png": "career-counselling.webp",
    "file_00000000db8c720ba5d97bdffb08d682.png": "about-group.webp"
}

print("Starting image conversion to WebP...")

for src_name, dest_name in mapping.items():
    src_path = os.path.join(header_dir, src_name)
    dest_path = os.path.join(header_dir, dest_name)
    
    if os.path.exists(src_path):
        try:
            with Image.open(src_path) as img:
                # Save as webp with optimize=True and high quality (90) to avoid pixelation
                img.save(dest_path, 'webp', optimize=True, quality=90)
            print(f"Successfully converted {src_name} -> {dest_name}")
            # Delete original png file
            os.remove(src_path)
            print(f"Deleted original {src_name}")
        except Exception as e:
            print(f"Error converting {src_name}: {e}")
    else:
        print(f"Source file {src_name} does not exist!")

print("All image conversions completed.")
