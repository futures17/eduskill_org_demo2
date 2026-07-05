import os
import glob
import re

new_nav = '''                <li class="nav-item dropdown">
                    <a href="{prefix}services/services.html" class="nav-link dropdown-toggle{active_class}">Services <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></a>
                    <div class="dropdown-panel dropdown-large">
                        <div class="dropdown-grid grid-2-col">
                            <a href="{prefix}services/ai-proctoring.html" class="dropdown-item">
                                <div class="dropdown-icon blue">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                </div>
                                <div class="dropdown-info">
                                    <span class="dropdown-title">AI Proctoring System</span>
                                    <span class="dropdown-desc">Secure eye-tracking & voice anti-cheat</span>
                                </div>
                            </a>
                            <a href="{prefix}services/virtual-labs.html" class="dropdown-item">
                                <div class="dropdown-icon purple">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                                </div>
                                <div class="dropdown-info">
                                    <span class="dropdown-title">Virtual Science Labs</span>
                                    <span class="dropdown-desc">Cloud-based chemistry & coding labs</span>
                                </div>
                            </a>
                            <a href="{prefix}services/ai-assessment.html" class="dropdown-item">
                                <div class="dropdown-icon orange">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                </div>
                                <div class="dropdown-info">
                                    <span class="dropdown-title">AI Resume Architect</span>
                                    <span class="dropdown-desc">Create ATS-optimized job resumes</span>
                                </div>
                            </a>
                            <a href="{prefix}services/career-counselling.html" class="dropdown-item">
                                <div class="dropdown-icon green">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                </div>
                                <div class="dropdown-info">
                                    <span class="dropdown-title">AI Interview Coach</span>
                                    <span class="dropdown-desc">Behavioral and technical mock feedback</span>
                                </div>
                            </a>
                            <a href="{prefix}services/placement-services.html" class="dropdown-item">
                                <div class="dropdown-icon blue">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>
                                </div>
                                <div class="dropdown-info">
                                    <span class="dropdown-title">Placement CRM Hub</span>
                                    <span class="dropdown-desc">College drive analytics & offer tracker</span>
                                </div>
                            </a>
                            <a href="{prefix}services/platforms.html" class="dropdown-item">
                                <div class="dropdown-icon orange">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                                </div>
                                <div class="dropdown-info">
                                    <span class="dropdown-title">Recruiter Portal</span>
                                    <span class="dropdown-desc">Filter vetted student portfolios</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>'''

html_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'deploy_temp' in root or 'public' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

services_regex = re.compile(r'<li class="nav-item dropdown">\s*<a[^>]*>Services.*?</svg></a>.*?</div>\s*</div>\s*</li>', re.DOTALL)

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        rel_path = os.path.relpath(file, '.')
        parts = rel_path.split(os.sep)
        
        if len(parts) == 1:
            prefix = 'pages/'
        elif len(parts) == 2:
            prefix = ''
        elif len(parts) == 3:
            if parts[1] == 'services':
                prefix = ''
            else:
                prefix = '../'
                
        is_active = ''
        if 'services' in parts:
            is_active = ' active'

        replacement = new_nav.format(prefix=prefix, active_class=is_active)
        new_content = services_regex.sub(replacement, content)
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
    except Exception as e:
        print(f"Error processing {file}: {e}")
