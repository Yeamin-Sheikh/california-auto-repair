import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
img_pattern = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.IGNORECASE)

# Verify js/app.js does not use external icons.svg
js_app_path = os.path.join(REPO, "js", "app.js")
if os.path.exists(js_app_path):
    with open(js_app_path, "r", encoding="utf-8") as jfp:
        js_content = jfp.read()
        assert "assets/svgs/icons.svg" not in js_content, "Found external assets/svgs/icons.svg in js/app.js"
print("✓ js/app.js verified: 0 external SVG sprite references!")

html_files = [f for f in os.listdir(REPO) if f.endswith(".html")]
print(f"Testing {len(html_files)} HTML pages in california-auto-repair...")

for f in html_files:
    path = os.path.join(REPO, f)
    with open(path, "r", encoding="utf-8") as fp:
        html = fp.read()
    
    # Verify inlined SVG sprite exists
    assert '<symbol id="icon-' in html, f"Inlined SVG sprite missing in {f}"
    assert "assets/svgs/icons.svg" not in html, f"Found external SVG sprite reference in {f}"
    
    # Find all images
    matches = img_pattern.findall(html)
    content_pics = [m for m in matches if "assets/images" in m]
    print(f"✓ {f}: {len(content_pics)} pictures verified!")
    assert len(content_pics) >= 6, f"Expected at least 6 pictures in {f}, found {len(content_pics)}"
    
    for src in content_pics:
        img_file = os.path.join(REPO, src.replace("/", os.sep))
        assert os.path.exists(img_file), f"Image file does not exist: {img_file}"

print("ALL CALIFORNIA AUTO REPAIR PAGES FULLY VERIFIED WITH 6+ PICTURES & WORKING ICONS!")
