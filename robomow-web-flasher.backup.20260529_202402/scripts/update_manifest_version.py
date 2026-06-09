#!/usr/bin/env python3
"""Обновляет version во всех manifest*.json.

Пример:
  python3 scripts/update_manifest_version.py 0.2.0
"""
from pathlib import Path
import json
import sys

if len(sys.argv) != 2:
    raise SystemExit('Usage: update_manifest_version.py <version>')

version = sys.argv[1]
for path in sorted(Path('firmware').glob('manifest*.json')):
    data = json.loads(path.read_text(encoding='utf-8'))
    data['version'] = version
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'updated {path}: {version}')
