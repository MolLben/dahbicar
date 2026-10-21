import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace href="/cars" and href="/cars/anything" → href="cars.html"
# Also href="/cars" used as standalone
original = content

# Replace /cars/slug-name → cars.html
content = re.sub(r'href="/cars/[^"]*"', 'href="cars.html"', content)
# Replace href="/cars" → cars.html
content = re.sub(r'href="/cars"', 'href="cars.html"', content)

changed = sum(1 for a, b in zip(original, content) if a != b)
print(f"Changes made: {(original != content)}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
hrefs = re.findall(r'href="([^"]+)"', content)
from collections import Counter
print("Updated hrefs:")
for href, count in Counter(hrefs).most_common():
    print(f"  {count}x  {href}")
