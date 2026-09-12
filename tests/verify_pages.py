import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

REPO = r"e:\Scripts\GitHub\california-auto-repair"
img_pattern = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.IGNORECASE)

html_files = [f for f in os.listdir(REPO) if f.endswith(".html")]
print(f"Testing {len(html_files)} HTML pages in california-auto-repair...")

for f in html_files:
    path = os.path.join(REPO, f)
    with open(path, "r", encoding="utf-8") as fp:
        html = fp.read()
    
    # Verify inlined SVG sprite exists
    assert '<symbol id="icon-' in html, f"Inlined SVG sprite missing in {f}"
    
    # Find all images
    matches = img_pattern.findall(html)
    content_pics = [m for m in matches if "assets/images" in m]
    print(f"✓ {f}: {len(content_pics)} pictures verified!")
    assert len(content_pics) >= 6, f"Expected at least 6 pictures in {f}, found {len(content_pics)}"
    
    for src in content_pics:
        img_file = os.path.join(REPO, src.replace("/", os.sep))
        assert os.path.exists(img_file), f"Image file does not exist: {img_file}"

print("ALL CALIFORNIA AUTO REPAIR PAGES FULLY VERIFIED WITH 6+ PICTURES & WORKING ICONS!")
