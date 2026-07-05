import os

broken_to_fixed = {
    'points="6 9 12 15 18 "': 'points="6 9 12 15 18 9"',
    'd="M16 10a4 4 0 0 1-8 "': 'd="M16 10a4 4 0 0 1-8 0"',
    'd="M6 12v5c0 2 2 3 6 3s6-1 6-3v-"': 'd="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"',
    'd="M16 3.13a4 4 0 0 1 0 7.7"': 'd="M16 3.13a4 4 0 0 1 0 7.75"'
}

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root: continue
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                original = content
                for broken, fixed in broken_to_fixed.items():
                    content = content.replace(broken, fixed)
                if original != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'Fixed SVGs in {path}')
            except Exception as e:
                pass
