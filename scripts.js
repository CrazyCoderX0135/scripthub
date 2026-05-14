const SCRIPTS = [
  {
    id: "bulk-rename",
    name: "bulk-rename",
    desc: "Batch rename files in a folder using find-and-replace or regex patterns.",
    tag: "file tools",
    lang: "python",
    icon: "📁",
    code: `import os
import re
import sys

folder = input("Folder path: ").strip()
find    = input("Find (text or regex): ").strip()
replace = input("Replace with: ").strip()

if not os.path.isdir(folder):
    print("Error: folder not found.")
    sys.exit(1)

renamed = 0
for fname in os.listdir(folder):
    new_name = re.sub(find, replace, fname)
    if new_name != fname:
        os.rename(
            os.path.join(folder, fname),
            os.path.join(folder, new_name)
        )
        print(f"  {fname}  →  {new_name}")
        renamed += 1

print(f"\\nDone. {renamed} file(s) renamed.")
`
  },
  {
    id: "sysmon",
    name: "sysmon",
    desc: "Live CPU, RAM, and disk usage monitor that refreshes in your terminal every second.",
    tag: "utilities",
    lang: "python",
    icon: "📊",
    code: `import psutil
import time
import os

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

print("sysmon — press Ctrl+C to stop")
time.sleep(1)

while True:
    clear()
    cpu  = psutil.cpu_percent(interval=1)
    ram  = psutil.virtual_memory()
    disk = psutil.disk_usage('/')

    print("=" * 36)
    print("  SYSMON")
    print("=" * 36)
    print(f"  CPU   {cpu:>5.1f}%  {'█' * int(cpu // 5)}")
    print(f"  RAM   {ram.percent:>5.1f}%  {'█' * int(ram.percent // 5)}")
    print(f"  DISK  {disk.percent:>5.1f}%  {'█' * int(disk.percent // 5)}")
    print(f"\\n  RAM used: {ram.used // (1024**2)} MB / {ram.total // (1024**2)} MB")
    print(f"  Disk free: {disk.free // (1024**3)} GB")
    print("=" * 36)
    time.sleep(1)
`
  },
  {
    id: "remind-me",
    name: "remind-me",
    desc: "Set a desktop notification reminder from the command line. Works on Windows, Mac, and Linux.",
    tag: "utilities",
    lang: "python",
    icon: "⏰",
    code: `import time
import subprocess
import sys
import os

msg     = input("Reminder message: ").strip()
minutes = float(input("Remind me in how many minutes? ").strip())

print(f"\\nOK! I'll remind you in {minutes} minute(s).")
time.sleep(minutes * 60)

if sys.platform == "darwin":
    subprocess.run(["osascript", "-e",
        f'display notification "{msg}" with title "Reminder"'])
elif sys.platform == "win32":
    from ctypes import windll
    windll.user32.MessageBoxW(0, msg, "Reminder", 0x40)
else:
    subprocess.run(["notify-send", "Reminder", msg])

print("Reminder sent!")
`
  },
  {
    id: "img-crush",
    name: "img-crush",
    desc: "Compress and resize all images in a folder in one command. Supports JPG and PNG.",
    tag: "file tools",
    lang: "python",
    icon: "🖼️",
    code: `from PIL import Image
import os

folder  = input("Folder with images: ").strip()
quality = int(input("Quality (1-95, recommended 75): ").strip())
max_w   = input("Max width in px (leave blank to keep): ").strip()
max_w   = int(max_w) if max_w else None

out_dir = os.path.join(folder, "compressed")
os.makedirs(out_dir, exist_ok=True)

count = 0
for fname in os.listdir(folder):
    if fname.lower().endswith(('.jpg', '.jpeg', '.png')):
        path = os.path.join(folder, fname)
        img  = Image.open(path)

        if max_w and img.width > max_w:
            ratio  = max_w / img.width
            new_h  = int(img.height * ratio)
            img    = img.resize((max_w, new_h), Image.LANCZOS)

        out = os.path.join(out_dir, fname)
        img.save(out, optimize=True, quality=quality)
        print(f"  ✓ {fname}")
        count += 1

print(f"\\nDone. {count} image(s) saved to /compressed/")
`
  },
  {
    id: "net-scan",
    name: "net-scan",
    desc: "Scan your local network and list every connected device with its IP and hostname.",
    tag: "utilities",
    lang: "python",
    icon: "📡",
    code: `import socket
import subprocess
import ipaddress

subnet = input("Subnet to scan (e.g. 192.168.1): ").strip()
print(f"\\nScanning {subnet}.0/24 ...\\n")

live = []
for i in range(1, 255):
    ip = f"{subnet}.{i}"
    result = subprocess.run(
        ["ping", "-c", "1", "-W", "1", ip],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    if result.returncode == 0:
        try:
            host = socket.gethostbyaddr(ip)[0]
        except socket.herror:
            host = "(unknown)"
        print(f"  {ip:<18} {host}")
        live.append(ip)

print(f"\\nFound {len(live)} device(s) online.")
`
  },
  {
    id: "password-gen",
    name: "password-gen",
    desc: "Generate strong random passwords with custom length and character sets.",
    tag: "utilities",
    lang: "python",
    icon: "🔑",
    code: `import secrets
import string

length = int(input("Password length (e.g. 20): ").strip())
use_symbols = input("Include symbols? (y/n): ").strip().lower() == 'y'
count = int(input("How many passwords to generate? ").strip())

chars = string.ascii_letters + string.digits
if use_symbols:
    chars += "!@#$%^&*()-_=+[]{}|;:,.<>?"

print()
for i in range(count):
    pwd = ''.join(secrets.choice(chars) for _ in range(length))
    print(f"  {pwd}")

print(f"\\n{count} password(s) generated.")
`
  },
  {
    id: "csv-to-json",
    name: "csv-to-json",
    desc: "Convert any CSV file to a clean JSON file with one command.",
    tag: "file tools",
    lang: "python",
    icon: "🔄",
    code: `import csv
import json
import sys
import os

csv_file = input("CSV file path: ").strip()

if not os.path.exists(csv_file):
    print("Error: file not found.")
    sys.exit(1)

with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

out_file = os.path.splitext(csv_file)[0] + ".json"
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)

print(f"Done! {len(rows)} row(s) saved to: {out_file}")
`
  },
  {
    id: "countdown-timer",
    name: "countdown-timer",
    desc: "A simple terminal countdown timer with a sound alert when time is up.",
    tag: "utilities",
    lang: "python",
    icon: "⏱️",
    code: `import time
import sys

def beep():
    print("\\a", end="", flush=True)

mins = float(input("Timer duration in minutes: ").strip())
total = int(mins * 60)

print(f"\\nTimer started for {mins} minute(s). Press Ctrl+C to cancel.\\n")

try:
    for remaining in range(total, 0, -1):
        m, s = divmod(remaining, 60)
        print(f"\\r  ⏱  {m:02d}:{s:02d} remaining", end="", flush=True)
        time.sleep(1)
    print("\\r  ✅ Time's up!             ")
    for _ in range(3):
        beep()
        time.sleep(0.3)
except KeyboardInterrupt:
    print("\\n\\nTimer cancelled.")
`
  }
];
