import os

root_dir = r"c:\Users\Lenovo\OneDrive\Desktop\eduskill-org-project"
service_dir = os.path.join(root_dir, "pages", "service")

for f in os.listdir(service_dir):
    if f.endswith(".html"):
        path = os.path.join(service_dir, f)
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
        
        # Replace awards.html with ../awards.html
        new_content = content.replace('href="awards.html"', 'href="../awards.html"')
        new_content = new_content.replace('href="pages/awards.html"', 'href="../awards.html"')
        
        if new_content != content:
            with open(path, "w", encoding="utf-8") as file:
                file.write(new_content)
            print(f"Fixed awards.html link in {f}")
