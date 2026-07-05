import os
import re

root_dir = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project"
pages_dir = os.path.join(root_dir, "pages")
service_dir = os.path.join(pages_dir, "service")

if not os.path.exists(service_dir):
    os.makedirs(service_dir)

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

for old_filename, new_filename in mappings.items():
    old_path = os.path.join(pages_dir, old_filename)
    new_path = os.path.join(service_dir, new_filename)
    
    if not os.path.exists(old_path):
        print(f"Skipping (not found): {old_filename}")
        continue
        
    with open(old_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace relative style/assets paths
    content = content.replace('href="../', 'href="../../')
    content = content.replace('src="../', 'src="../../')
    content = content.replace("this.src='../", "this.src='../../")
    
    # Replace links to peer pages with folder exit paths
    peer_pages = [
        "about.html", "vision-mission-values.html", "our-journey.html",
        "platforms.html", "services.html", "contact.html", "career.html",
        "privacy-policy.html", "terms-conditions.html", "cookie-policy.html",
        "sitemap.html", "downloads.html", "research-innovation.html",
        "events.html", "media-news.html", "faq.html"
    ]
    
    for peer in peer_pages:
        # Match peer.html or peer.html#anchor
        content = re.sub(rf'href=["\']{peer}(#|\?|["\'])', rf'href="../{peer}\1', content)
        
    # Replace specific service links that were pointing to sibling service-* files,
    # converting them to point to sibling simplified names (without '../' since they are now in the same folder)
    for brother_old, brother_new in mappings.items():
        content = content.replace(f'href="{brother_old}"', f'href="{brother_new}"')
        content = content.replace(f'href="../pages/{brother_old}"', f'href="{brother_new}"')
        content = content.replace(f'href="pages/{brother_old}"', f'href="{brother_new}"')
        
    with open(new_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Migrated and converted: {old_filename} -> service/{new_filename}")
    
    # Delete the old file
    os.remove(old_path)
    print(f"Removed old file: {old_filename}")
