import os
import re

root_dir = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project"
pages_dir = os.path.join(root_dir, "pages")
service_dir = os.path.join(pages_dir, "service")

# Map of old files to new simplified names
mappings = {
    "service-ai-assessment.html": "ai-assessment.html",
    "service-ai-proctoring.html": "ai-proctoring.html",
    "service-virtual-labs.html": "virtual-labs.html",
    "service-lms.html": "lms.html",
    "service-career-counselling.html": "career-counselling.html",
    "service-placement-services.html": "placement-services.html",
    "service-industry-training.html": "industry-training.html",
    "service-entrepreneurship-programs.html": "entrepreneurship-programs.html",
    "service-institutional-consulting.html": "institutional-consulting.html",
    "service-international-education.html": "international-education.html",
}

# 1. Update references in root HTML files
root_files = [f for f in os.listdir(root_dir) if f.endswith(".html")]
for rf in root_files:
    path = os.path.join(root_dir, rf)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    updated = False
    for old_name, new_name in mappings.items():
        # Root links should target pages/service/<new_name>
        old_pattern1 = f'pages/{old_name}'
        new_pattern1 = f'pages/service/{new_name}'
        if old_pattern1 in content:
            content = content.replace(old_pattern1, new_pattern1)
            updated = True
            
        old_pattern2 = f'href="{old_name}"'
        new_pattern2 = f'href="pages/service/{new_name}"'
        if old_pattern2 in content:
            content = content.replace(old_pattern2, new_pattern2)
            updated = True
            
    if updated:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated links in root file: {rf}")

# 2. Update references in pages/ HTML files (excluding service/)
page_files = [f for f in os.listdir(pages_dir) if f.endswith(".html")]
for pf in page_files:
    path = os.path.join(pages_dir, pf)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    updated = False
    for old_name, new_name in mappings.items():
        # Sibling links should target service/<new_name>
        old_pattern = f'href="{old_name}"'
        new_pattern = f'href="service/{new_name}"'
        if old_pattern in content:
            content = content.replace(old_pattern, new_pattern)
            updated = True
            
        old_pattern2 = f'href="../pages/{old_name}"'
        new_pattern2 = f'href="service/{new_name}"'
        if old_pattern2 in content:
            content = content.replace(old_pattern2, new_pattern2)
            updated = True
            
    if updated:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated links in pages file: {pf}")
