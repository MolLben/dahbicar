
with open('index.html', 'rb') as f:
    start = f.read(10)
print('First bytes:', start.hex())
print('Has UTF-8 BOM?', start[:3] == b'\xef\xbb\xbf')

with open('index.html', 'r', encoding='utf-8') as f:
    head = f.read(2000)

import re
charset = re.findall(r'charset[=: ]+["\']*([^"\'> ]+)', head, re.IGNORECASE)
print('Charset declarations found:', charset)

# Check the actual characters in the title
title = re.search(r'<title>(.*?)</title>', head)
if title:
    t = title.group(1)
    print('Title:', t)
    print('Title char codepoints:')
    for ch in t:
        if ord(ch) > 127:
            print(f'  U+{ord(ch):04X} = {repr(ch)}')
