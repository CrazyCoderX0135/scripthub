const SCRIPTS = [

  // ── FILE TOOLS ──────────────────────────────────────────────
  {
    id: "bulk-rename",
    name: "bulk-rename",
    desc: "Batch rename files in a folder using find-and-replace or regex patterns.",
    tag: "file tools", lang: "python", icon: "📁",
    code: `import os, re, sys

folder  = input("Folder path: ").strip()
find    = input("Find (text or regex): ").strip()
replace = input("Replace with: ").strip()

if not os.path.isdir(folder):
    print("Error: folder not found."); sys.exit(1)

renamed = 0
for fname in os.listdir(folder):
    new_name = re.sub(find, replace, fname)
    if new_name != fname:
        os.rename(os.path.join(folder, fname), os.path.join(folder, new_name))
        print(f"  {fname}  →  {new_name}")
        renamed += 1

print(f"\\nDone. {renamed} file(s) renamed.")`
  },
  {
    id: "img-crush",
    name: "img-crush",
    desc: "Compress and resize all images in a folder in one command. Supports JPG and PNG.",
    tag: "file tools", lang: "python", icon: "🖼️",
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
        img = Image.open(os.path.join(folder, fname))
        if max_w and img.width > max_w:
            img = img.resize((max_w, int(img.height * max_w / img.width)), Image.LANCZOS)
        img.save(os.path.join(out_dir, fname), optimize=True, quality=quality)
        print(f"  ✓ {fname}")
        count += 1

print(f"\\nDone. {count} image(s) saved to /compressed/")`
  },
  {
    id: "csv-to-json",
    name: "csv-to-json",
    desc: "Convert any CSV file to a clean JSON file with one command.",
    tag: "file tools", lang: "python", icon: "🔄",
    code: `import csv, json, sys, os

csv_file = input("CSV file path: ").strip()
if not os.path.exists(csv_file):
    print("Error: file not found."); sys.exit(1)

with open(csv_file, newline='', encoding='utf-8') as f:
    rows = list(csv.DictReader(f))

out_file = os.path.splitext(csv_file)[0] + ".json"
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)

print(f"Done! {len(rows)} row(s) saved to: {out_file}")`
  },
  {
    id: "json-to-csv",
    name: "json-to-csv",
    desc: "Convert a JSON file (array of objects) into a clean CSV spreadsheet.",
    tag: "file tools", lang: "python", icon: "📊",
    code: `import json, csv, sys, os

json_file = input("JSON file path: ").strip()
if not os.path.exists(json_file):
    print("Error: file not found."); sys.exit(1)

with open(json_file, encoding='utf-8') as f:
    data = json.load(f)

if not isinstance(data, list) or not data:
    print("Error: JSON must be a non-empty array of objects."); sys.exit(1)

out_file = os.path.splitext(json_file)[0] + ".csv"
with open(out_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)

print(f"Done! {len(data)} row(s) saved to: {out_file}")`
  },
  {
    id: "duplicate-finder",
    name: "duplicate-finder",
    desc: "Scan a folder and find all duplicate files, even if they have different names.",
    tag: "file tools", lang: "python", icon: "🔍",
    code: `import os, hashlib
from collections import defaultdict

folder = input("Folder to scan: ").strip()

def file_hash(path):
    h = hashlib.md5()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()

print("\\nScanning...")
hashes = defaultdict(list)
for root, _, files in os.walk(folder):
    for fname in files:
        path = os.path.join(root, fname)
        try:
            hashes[file_hash(path)].append(path)
        except: pass

dupes = {h: paths for h, paths in hashes.items() if len(paths) > 1}

if not dupes:
    print("No duplicates found!")
else:
    print(f"\\nFound {len(dupes)} group(s) of duplicates:\\n")
    for paths in dupes.values():
        print("  DUPLICATE GROUP:")
        for p in paths:
            print(f"    {p}")
        print()`
  },
  {
    id: "folder-size",
    name: "folder-size",
    desc: "Show the size of every subfolder in a directory, sorted largest to smallest.",
    tag: "file tools", lang: "python", icon: "📦",
    code: `import os

folder = input("Folder path: ").strip()

def get_size(path):
    total = 0
    for root, _, files in os.walk(path):
        for f in files:
            try: total += os.path.getsize(os.path.join(root, f))
            except: pass
    return total

def fmt(size):
    for unit in ['B','KB','MB','GB']:
        if size < 1024: return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"

items = []
for name in os.listdir(folder):
    path = os.path.join(folder, name)
    if os.path.isdir(path):
        items.append((name, get_size(path)))

items.sort(key=lambda x: x[1], reverse=True)
print(f"\\n{'Folder':<40} {'Size':>10}")
print("-" * 52)
for name, size in items:
    print(f"  {name:<38} {fmt(size):>10}")`
  },
  {
    id: "pdf-merger",
    name: "pdf-merger",
    desc: "Merge multiple PDF files into one with a single command.",
    tag: "file tools", lang: "python", icon: "📄",
    code: `from pypdf import PdfWriter
import os, sys

print("Enter PDF file paths one by one (blank line when done):")
paths = []
while True:
    p = input(f"  File {len(paths)+1}: ").strip()
    if not p: break
    if not os.path.exists(p):
        print(f"  ⚠ Not found: {p}")
    else:
        paths.append(p)

if len(paths) < 2:
    print("Need at least 2 files."); sys.exit(1)

out = input("Output filename (e.g. merged.pdf): ").strip()
writer = PdfWriter()
for path in paths:
    writer.append(path)

with open(out, 'wb') as f:
    writer.write(f)

print(f"\\n✓ Merged {len(paths)} files into: {out}")`
  },
  {
    id: "text-search",
    name: "text-search",
    desc: "Search all text files in a folder for a word or phrase and show which files contain it.",
    tag: "file tools", lang: "python", icon: "🔎",
    code: `import os

folder  = input("Folder to search: ").strip()
keyword = input("Search for: ").strip().lower()
exts    = ('.txt', '.py', '.js', '.html', '.css', '.md', '.json', '.csv')

found = 0
for root, _, files in os.walk(folder):
    for fname in files:
        if fname.lower().endswith(exts):
            path = os.path.join(root, fname)
            try:
                with open(path, encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                matches = [(i+1, l.strip()) for i, l in enumerate(lines) if keyword in l.lower()]
                if matches:
                    print(f"\\n📄 {path}")
                    for num, line in matches[:5]:
                        print(f"   line {num}: {line[:80]}")
                    found += len(matches)
            except: pass

print(f"\\n{'Found' if found else 'No'} match(es) for '{keyword}'.")`
  },

  // ── UTILITIES ───────────────────────────────────────────────
  {
    id: "sysmon",
    name: "sysmon",
    desc: "Live CPU, RAM, and disk usage monitor that refreshes in your terminal every second.",
    tag: "utilities", lang: "python", icon: "📊",
    code: `import psutil, time, os

def clear(): os.system('cls' if os.name == 'nt' else 'clear')

print("sysmon — press Ctrl+C to stop"); time.sleep(1)

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
    time.sleep(1)`
  },
  {
    id: "remind-me",
    name: "remind-me",
    desc: "Set a desktop notification reminder from the command line.",
    tag: "utilities", lang: "python", icon: "⏰",
    code: `import time, subprocess, sys

msg     = input("Reminder message: ").strip()
minutes = float(input("Remind me in how many minutes? ").strip())

print(f"\\nOK! Reminding you in {minutes} minute(s).")
time.sleep(minutes * 60)

if sys.platform == "darwin":
    subprocess.run(["osascript", "-e", f'display notification "{msg}" with title "Reminder"'])
elif sys.platform == "win32":
    from ctypes import windll
    windll.user32.MessageBoxW(0, msg, "Reminder", 0x40)
else:
    subprocess.run(["notify-send", "Reminder", msg])

print("Reminder sent!")`
  },
  {
    id: "password-gen",
    name: "password-gen",
    desc: "Generate strong random passwords with custom length and character sets.",
    tag: "utilities", lang: "python", icon: "🔑",
    code: `import secrets, string

length      = int(input("Password length (e.g. 20): ").strip())
use_symbols = input("Include symbols? (y/n): ").strip().lower() == 'y'
count       = int(input("How many passwords? ").strip())

chars = string.ascii_letters + string.digits
if use_symbols: chars += "!@#$%^&*()-_=+[]{}|;:,.<>?"

print()
for _ in range(count):
    print(f"  {''.join(secrets.choice(chars) for _ in range(length))}")

print(f"\\n{count} password(s) generated.")`
  },
  {
    id: "countdown-timer",
    name: "countdown-timer",
    desc: "A simple terminal countdown timer with a beep alert when time is up.",
    tag: "utilities", lang: "python", icon: "⏱️",
    code: `import time, sys

mins  = float(input("Timer duration in minutes: ").strip())
total = int(mins * 60)
print(f"\\nTimer started for {mins} minute(s). Ctrl+C to cancel.\\n")

try:
    for remaining in range(total, 0, -1):
        m, s = divmod(remaining, 60)
        print(f"\\r  ⏱  {m:02d}:{s:02d} remaining", end="", flush=True)
        time.sleep(1)
    print("\\r  ✅ Time's up!                  ")
    for _ in range(3): print("\\a", end="", flush=True); time.sleep(0.3)
except KeyboardInterrupt:
    print("\\n\\nTimer cancelled.")`
  },
  {
    id: "net-scan",
    name: "net-scan",
    desc: "Scan your local network and list every connected device with its IP and hostname.",
    tag: "utilities", lang: "python", icon: "📡",
    code: `import socket, subprocess

subnet = input("Subnet to scan (e.g. 192.168.1): ").strip()
print(f"\\nScanning {subnet}.0/24 ...\\n")

live = []
for i in range(1, 255):
    ip = f"{subnet}.{i}"
    result = subprocess.run(["ping", "-c", "1", "-W", "1", ip],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode == 0:
        try: host = socket.gethostbyaddr(ip)[0]
        except: host = "(unknown)"
        print(f"  {ip:<18} {host}")
        live.append(ip)

print(f"\\nFound {len(live)} device(s) online.")`
  },
  {
    id: "weather",
    name: "weather",
    desc: "Get the current weather for any city right in your terminal.",
    tag: "utilities", lang: "python", icon: "🌤️",
    code: `import urllib.request, json

city = input("Enter city name: ").strip().replace(" ", "+")
url  = f"https://wttr.in/{city}?format=j1"

try:
    with urllib.request.urlopen(url) as r:
        data = json.loads(r.read())
    curr = data['current_condition'][0]
    area = data['nearest_area'][0]

    name    = area['areaName'][0]['value']
    country = area['country'][0]['value']
    temp_c  = curr['temp_C']
    temp_f  = curr['temp_F']
    feels   = curr['FeelsLikeC']
    desc    = curr['weatherDesc'][0]['value']
    humidity = curr['humidity']
    wind    = curr['windspeedKmph']

    print(f"\\n🌍 {name}, {country}")
    print(f"  {desc}")
    print(f"  🌡  {temp_c}°C / {temp_f}°F  (feels like {feels}°C)")
    print(f"  💧 Humidity: {humidity}%")
    print(f"  💨 Wind: {wind} km/h")
except Exception as e:
    print(f"Error: {e}")`
  },
  {
    id: "qr-gen",
    name: "qr-gen",
    desc: "Generate a QR code for any URL or text and save it as an image.",
    tag: "utilities", lang: "python", icon: "📱",
    code: `import qrcode

text    = input("Text or URL to encode: ").strip()
out     = input("Output filename (e.g. qr.png): ").strip() or "qr.png"

qr = qrcode.QRCode(box_size=10, border=4)
qr.add_data(text)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save(out)
print(f"\\n✓ QR code saved to: {out}")`
  },
  {
    id: "ip-info",
    name: "ip-info",
    desc: "Look up your public IP address and see your location, ISP, and timezone.",
    tag: "utilities", lang: "python", icon: "🌐",
    code: `import urllib.request, json

with urllib.request.urlopen("https://ipinfo.io/json") as r:
    data = json.loads(r.read())

print(f"\\n🌐 Your Public IP Info")
print(f"  IP:       {data.get('ip','N/A')}")
print(f"  City:     {data.get('city','N/A')}")
print(f"  Region:   {data.get('region','N/A')}")
print(f"  Country:  {data.get('country','N/A')}")
print(f"  ISP:      {data.get('org','N/A')}")
print(f"  Timezone: {data.get('timezone','N/A')}")`
  },
  {
    id: "stopwatch",
    name: "stopwatch",
    desc: "A terminal stopwatch with lap tracking. Press Enter to record a lap.",
    tag: "utilities", lang: "python", icon: "🏁",
    code: `import time, threading

running = True
start   = time.time()
laps    = []

def display():
    while running:
        elapsed = time.time() - start
        m, s = divmod(int(elapsed), 60)
        print(f"\\r  ⏱  {m:02d}:{s:02d}.{int((elapsed % 1)*10)}  (Enter = lap, q + Enter = quit)", end="", flush=True)
        time.sleep(0.1)

t = threading.Thread(target=display, daemon=True)
t.start()

lap_num = 1
while True:
    inp = input()
    if inp.lower() == 'q':
        running = False
        break
    elapsed = time.time() - start
    m, s = divmod(int(elapsed), 60)
    laps.append(elapsed)
    print(f"\\n  🏁 Lap {lap_num}: {m:02d}:{s:02d}.{int((elapsed % 1)*10)}")
    lap_num += 1

total = time.time() - start
m, s = divmod(int(total), 60)
print(f"\\n\\nTotal: {m:02d}:{s:02d}")`
  },
  {
    id: "unit-converter",
    name: "unit-converter",
    desc: "Convert between common units: length, weight, temperature, and speed.",
    tag: "utilities", lang: "python", icon: "📐",
    code: `def convert():
    print("\\n  Categories: [1] Length  [2] Weight  [3] Temperature  [4] Speed")
    cat = input("  Choose: ").strip()

    if cat == "1":
        print("  [1] km→miles  [2] miles→km  [3] m→ft  [4] ft→m  [5] cm→in  [6] in→cm")
        c = input("  Choose: ").strip()
        v = float(input("  Value: "))
        conversions = {"1":(v*0.621371,"miles"),"2":(v*1.60934,"km"),
                       "3":(v*3.28084,"ft"),"4":(v*0.3048,"m"),
                       "5":(v*0.393701,"in"),"6":(v*2.54,"cm")}
        r, unit = conversions.get(c, (None, None))
        if r: print(f"  = {r:.4f} {unit}")

    elif cat == "2":
        print("  [1] kg→lbs  [2] lbs→kg  [3] g→oz  [4] oz→g")
        c = input("  Choose: ").strip()
        v = float(input("  Value: "))
        conversions = {"1":(v*2.20462,"lbs"),"2":(v*0.453592,"kg"),
                       "3":(v*0.035274,"oz"),"4":(v*28.3495,"g")}
        r, unit = conversions.get(c, (None, None))
        if r: print(f"  = {r:.4f} {unit}")

    elif cat == "3":
        print("  [1] C→F  [2] F→C  [3] C→K  [4] K→C")
        c = input("  Choose: ").strip()
        v = float(input("  Value: "))
        conversions = {"1":((v*9/5)+32,"°F"),"2":((v-32)*5/9,"°C"),
                       "3":(v+273.15,"K"),"4":(v-273.15,"°C")}
        r, unit = conversions.get(c, (None, None))
        if r: print(f"  = {r:.4f} {unit}")

    elif cat == "4":
        print("  [1] km/h→mph  [2] mph→km/h  [3] m/s→km/h  [4] km/h→m/s")
        c = input("  Choose: ").strip()
        v = float(input("  Value: "))
        conversions = {"1":(v*0.621371,"mph"),"2":(v*1.60934,"km/h"),
                       "3":(v*3.6,"km/h"),"4":(v/3.6,"m/s")}
        r, unit = conversions.get(c, (None, None))
        if r: print(f"  = {r:.4f} {unit}")

while True:
    convert()
    if input("\\n  Convert another? (y/n): ").lower() != 'y': break`
  },
  {
    id: "clipboard-history",
    name: "clipboard-saver",
    desc: "Monitor your clipboard and save everything you copy to a text log file.",
    tag: "utilities", lang: "python", icon: "📋",
    code: `import pyperclip, time, datetime

log_file = "clipboard_log.txt"
last = ""
print(f"Monitoring clipboard. Saving to {log_file}. Ctrl+C to stop.\\n")

try:
    while True:
        current = pyperclip.paste()
        if current != last and current.strip():
            last = current
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            with open(log_file, "a", encoding="utf-8") as f:
                f.write(f"[{timestamp}]\\n{current}\\n\\n---\\n\\n")
            print(f"  ✓ Saved ({len(current)} chars)")
        time.sleep(0.5)
except KeyboardInterrupt:
    print("\\nStopped.")`
  },

  // ── AUTOMATION ──────────────────────────────────────────────
  {
    id: "auto-backup",
    name: "auto-backup",
    desc: "Automatically copy a folder to a backup location with a timestamped folder name.",
    tag: "automation", lang: "python", icon: "💾",
    code: `import shutil, os
from datetime import datetime

source = input("Folder to back up: ").strip()
dest   = input("Backup destination folder: ").strip()

if not os.path.isdir(source):
    print("Error: source folder not found."); exit(1)

timestamp  = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
folder_name = os.path.basename(source.rstrip('/\\\\'))
backup_path = os.path.join(dest, f"{folder_name}_backup_{timestamp}")

print(f"\\nBacking up to: {backup_path}")
shutil.copytree(source, backup_path)
print("✓ Backup complete!")`
  },
  {
    id: "file-organizer",
    name: "file-organizer",
    desc: "Automatically sort files in a folder into subfolders by file type (Images, Docs, Videos, etc).",
    tag: "automation", lang: "python", icon: "🗂️",
    code: `import os, shutil

folder = input("Folder to organize: ").strip()

TYPES = {
    "Images":    ['.jpg','.jpeg','.png','.gif','.bmp','.webp','.svg','.ico'],
    "Videos":    ['.mp4','.mov','.avi','.mkv','.wmv','.flv','.webm'],
    "Audio":     ['.mp3','.wav','.aac','.flac','.ogg','.m4a'],
    "Documents": ['.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx','.txt','.md'],
    "Code":      ['.py','.js','.html','.css','.ts','.json','.xml','.sh','.bat'],
    "Archives":  ['.zip','.rar','.7z','.tar','.gz'],
    "Other":     []
}

moved = 0
for fname in os.listdir(folder):
    fpath = os.path.join(folder, fname)
    if not os.path.isfile(fpath): continue
    ext = os.path.splitext(fname)[1].lower()

    dest_folder = "Other"
    for category, exts in TYPES.items():
        if ext in exts:
            dest_folder = category; break

    dest_path = os.path.join(folder, dest_folder)
    os.makedirs(dest_path, exist_ok=True)
    shutil.move(fpath, os.path.join(dest_path, fname))
    print(f"  {fname}  →  {dest_folder}/")
    moved += 1

print(f"\\n✓ Organized {moved} file(s).")`
  },
  {
    id: "screenshot-taker",
    name: "screenshot-taker",
    desc: "Take a screenshot every N seconds and save them with timestamps.",
    tag: "automation", lang: "python", icon: "📸",
    code: `import pyautogui, time, os
from datetime import datetime

out_dir  = input("Save screenshots to folder (leave blank for current): ").strip() or "."
interval = float(input("Take screenshot every how many seconds? ").strip())
count    = int(input("How many screenshots total? (0 = infinite): ").strip())

os.makedirs(out_dir, exist_ok=True)
taken = 0

print(f"\\nTaking screenshot every {interval}s. Ctrl+C to stop.\\n")
try:
    while count == 0 or taken < count:
        fname = datetime.now().strftime("screenshot_%Y%m%d_%H%M%S.png")
        path  = os.path.join(out_dir, fname)
        pyautogui.screenshot(path)
        print(f"  ✓ {fname}")
        taken += 1
        time.sleep(interval)
except KeyboardInterrupt:
    pass

print(f"\\nDone. {taken} screenshot(s) saved.")`
  },
  {
    id: "email-sender",
    name: "email-sender",
    desc: "Send an email from Gmail via the command line using your app password.",
    tag: "automation", lang: "python", icon: "📧",
    code: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

print("Gmail Sender (requires an App Password from Google)")
print("Get one at: myaccount.google.com/apppasswords\\n")

sender   = input("Your Gmail address: ").strip()
password = input("App password: ").strip()
to       = input("Recipient email: ").strip()
subject  = input("Subject: ").strip()
print("Message (type END on a new line when done):")

lines = []
while True:
    line = input()
    if line == "END": break
    lines.append(line)
body = "\\n".join(lines)

msg = MIMEMultipart()
msg['From'], msg['To'], msg['Subject'] = sender, to, subject
msg.attach(MIMEText(body, 'plain'))

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(sender, password)
    server.sendmail(sender, to, msg.as_string())

print("\\n✓ Email sent!")`
  },
  {
    id: "rename-by-date",
    name: "rename-by-date",
    desc: "Rename photos and files in a folder using their creation/modification date as the filename.",
    tag: "automation", lang: "python", icon: "📅",
    code: `import os
from datetime import datetime

folder = input("Folder path: ").strip()
prefix = input("Filename prefix (e.g. photo): ").strip() or "file"

files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
renamed = 0

for fname in files:
    path  = os.path.join(folder, fname)
    ext   = os.path.splitext(fname)[1]
    mtime = os.path.getmtime(path)
    date  = datetime.fromtimestamp(mtime).strftime("%Y%m%d_%H%M%S")
    new_name = f"{prefix}_{date}{ext}"
    new_path = os.path.join(folder, new_name)

    if path != new_path:
        os.rename(path, new_path)
        print(f"  {fname}  →  {new_name}")
        renamed += 1

print(f"\\nDone. {renamed} file(s) renamed.")`
  },
  {
    id: "website-monitor",
    name: "website-monitor",
    desc: "Ping a website every minute and alert you if it goes down.",
    tag: "automation", lang: "python", icon: "🔔",
    code: `import urllib.request, time, sys
from datetime import datetime

url      = input("Website URL (e.g. https://example.com): ").strip()
interval = int(input("Check every how many seconds? (e.g. 60): ").strip())

print(f"\\nMonitoring {url} every {interval}s. Ctrl+C to stop.\\n")

def check():
    try:
        urllib.request.urlopen(url, timeout=10)
        return True
    except:
        return False

was_down = False
try:
    while True:
        now  = datetime.now().strftime("%H:%M:%S")
        up   = check()
        if up:
            if was_down:
                print(f"  [{now}] ✅ {url} is BACK UP!")
                was_down = False
            else:
                print(f"  [{now}] ✓ Up")
        else:
            print(f"  [{now}] ❌ {url} is DOWN!")
            was_down = True
        time.sleep(interval)
except KeyboardInterrupt:
    print("\\nStopped.")`
  },

  // ── WEB ────────────────────────────────────────────────────
  {
    id: "webpage-to-pdf",
    name: "webpage-to-pdf",
    desc: "Download a webpage and save its HTML content to a file.",
    tag: "web", lang: "python", icon: "🌍",
    code: `import urllib.request
from datetime import datetime

url  = input("URL to download: ").strip()
out  = input("Output filename (leave blank for auto): ").strip()

if not out:
    out = f"page_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

with urllib.request.urlopen(req) as r:
    content = r.read()

with open(out, 'wb') as f:
    f.write(content)

print(f"\\n✓ Saved {len(content):,} bytes to: {out}")`
  },
  {
    id: "broken-link-checker",
    name: "broken-link-checker",
    desc: "Check a list of URLs and report which ones are broken or unreachable.",
    tag: "web", lang: "python", icon: "🔗",
    code: `import urllib.request

print("Enter URLs to check (one per line, blank line when done):")
urls = []
while True:
    u = input("  URL: ").strip()
    if not u: break
    if not u.startswith("http"): u = "https://" + u
    urls.append(u)

print()
for url in urls:
    try:
        code = urllib.request.urlopen(url, timeout=8).getcode()
        print(f"  ✅ {code}  {url}")
    except urllib.error.HTTPError as e:
        print(f"  ❌ {e.code}  {url}")
    except Exception as e:
        print(f"  ❌ ERR  {url}  ({e})")`
  },
  {
    id: "json-formatter",
    name: "json-formatter",
    desc: "Paste raw JSON and get it back beautifully formatted and indented.",
    tag: "web", lang: "python", icon: "✨",
    code: `import json, sys

print("Paste your JSON below (then press Enter twice):")
lines = []
while True:
    line = input()
    if line == "" and lines and lines[-1] == "":
        break
    lines.append(line)

raw = "\\n".join(lines)

try:
    data = json.loads(raw)
    print("\\n" + json.dumps(data, indent=2, ensure_ascii=False))
except json.JSONDecodeError as e:
    print(f"\\n❌ Invalid JSON: {e}")`
  },
  {
    id: "url-shortener",
    name: "url-shortener",
    desc: "Shorten any URL using the TinyURL API right from your terminal.",
    tag: "web", lang: "python", icon: "✂️",
    code: `import urllib.request, urllib.parse

url = input("URL to shorten: ").strip()
api = f"https://tinyurl.com/api-create.php?url={urllib.parse.quote(url)}"

with urllib.request.urlopen(api) as r:
    short = r.read().decode()

print(f"\\n✓ Shortened URL: {short}")`
  },

  // ── GAMES ──────────────────────────────────────────────────
  {
    id: "number-guesser",
    name: "number-guesser",
    desc: "Classic guess-the-number game. The computer picks, you guess.",
    tag: "games", lang: "python", icon: "🎲",
    code: `import random

def play():
    difficulty = input("Difficulty: [1] Easy (1-50)  [2] Medium (1-100)  [3] Hard (1-500): ").strip()
    ranges = {"1": 50, "2": 100, "3": 500}
    top = ranges.get(difficulty, 100)

    number  = random.randint(1, top)
    guesses = 0

    print(f"\\nGuess a number between 1 and {top}.\\n")
    while True:
        try:
            guess = int(input("  Your guess: "))
            guesses += 1
            if guess < number:   print("  📈 Too low!")
            elif guess > number: print("  📉 Too high!")
            else:
                print(f"\\n  🎉 Correct! It was {number}. You got it in {guesses} guess(es).")
                break
        except ValueError:
            print("  Please enter a number.")

play()
while input("\\nPlay again? (y/n): ").lower() == 'y': play()`
  },
  {
    id: "hangman",
    name: "hangman",
    desc: "Terminal hangman game with a built-in word list. Guess the word before you run out of tries.",
    tag: "games", lang: "python", icon: "🪢",
    code: `import random

WORDS = ["python","terminal","keyboard","monitor","function","variable",
         "database","algorithm","developer","interface","encryption","bandwidth",
         "compiler","debugger","repository","framework","javascript","network"]

HANGMAN = [
    "  +---+\\n  |   |\\n      |\\n      |\\n      |\\n      |\\n=========",
    "  +---+\\n  |   |\\n  O   |\\n      |\\n      |\\n      |\\n=========",
    "  +---+\\n  |   |\\n  O   |\\n  |   |\\n      |\\n      |\\n=========",
    "  +---+\\n  |   |\\n  O   |\\n /|   |\\n      |\\n      |\\n=========",
    "  +---+\\n  |   |\\n  O   |\\n /|\\\\  |\\n      |\\n      |\\n=========",
    "  +---+\\n  |   |\\n  O   |\\n /|\\\\  |\\n /    |\\n      |\\n=========",
    "  +---+\\n  |   |\\n  O   |\\n /|\\\\  |\\n / \\\\  |\\n      |\\n========="
]

def play():
    word    = random.choice(WORDS)
    guessed = set()
    wrong   = 0
    max_wrong = len(HANGMAN) - 1

    while True:
        display = " ".join(c if c in guessed else "_" for c in word)
        print(f"\\n{HANGMAN[wrong]}\\n")
        print(f"  Word: {display}")
        print(f"  Wrong guesses ({wrong}/{max_wrong}): {' '.join(sorted(guessed - set(word)))}")

        if "_" not in display:
            print("\\n  🎉 You won!"); return
        if wrong >= max_wrong:
            print(f"\\n  💀 Game over! The word was: {word}"); return

        guess = input("\\n  Guess a letter: ").lower().strip()
        if not guess or not guess.isalpha() or guess in guessed:
            print("  Invalid or already guessed."); continue
        guessed.add(guess)
        if guess not in word:
            wrong += 1

play()
while input("\\nPlay again? (y/n): ").lower() == 'y': play()`
  },
  {
    id: "rock-paper-scissors",
    name: "rock-paper-scissors",
    desc: "Play rock paper scissors against the computer with a score tracker.",
    tag: "games", lang: "python", icon: "✊",
    code: `import random

choices = ["rock", "paper", "scissors"]
beats   = {"rock": "scissors", "paper": "rock", "scissors": "paper"}
score   = {"you": 0, "computer": 0, "ties": 0}

print("Rock Paper Scissors — type 'quit' to stop\\n")

while True:
    your  = input("Your move (rock/paper/scissors): ").lower().strip()
    if your == "quit": break
    if your not in choices: print("Invalid choice!"); continue

    comp = random.choice(choices)
    print(f"  Computer: {comp}")

    if your == comp:
        print("  Tie!"); score["ties"] += 1
    elif beats[your] == comp:
        print("  You win! 🎉"); score["you"] += 1
    else:
        print("  Computer wins! 🤖"); score["computer"] += 1

    print(f"  Score → You: {score['you']}  Computer: {score['computer']}  Ties: {score['ties']}\\n")`
  },
  {
    id: "trivia-quiz",
    name: "trivia-quiz",
    desc: "A 10-question trivia quiz game with multiple choice answers and a final score.",
    tag: "games", lang: "python", icon: "🧠",
    code: `import random

QUESTIONS = [
    ("What is the capital of France?", ["Paris","London","Berlin","Madrid"], "Paris"),
    ("How many planets are in our solar system?", ["7","8","9","10"], "8"),
    ("What language is Python named after?", ["A snake","Monty Python","A scientist","A food"], "Monty Python"),
    ("What is 12 x 12?", ["124","134","144","154"], "144"),
    ("Which element has the symbol 'O'?", ["Gold","Oxygen","Osmium","Oganesson"], "Oxygen"),
    ("How many sides does a hexagon have?", ["5","6","7","8"], "6"),
    ("What year did the Titanic sink?", ["1905","1912","1920","1898"], "1912"),
    ("What is the fastest land animal?", ["Lion","Horse","Cheetah","Falcon"], "Cheetah"),
    ("How many bytes are in a kilobyte?", ["512","1000","1024","2048"], "1024"),
    ("What does CPU stand for?", ["Central Process Unit","Central Processing Unit","Computer Power Unit","Core Processing Unit"], "Central Processing Unit"),
]

random.shuffle(QUESTIONS)
score = 0

print("\\n🧠 Trivia Quiz — 10 questions\\n")
for i, (q, opts, answer) in enumerate(QUESTIONS[:10], 1):
    print(f"Q{i}: {q}")
    random.shuffle(opts)
    for j, opt in enumerate(opts, 1):
        print(f"  {j}. {opt}")
    try:
        pick = int(input("Your answer (number): ").strip())
        chosen = opts[pick - 1]
        if chosen == answer:
            print("  ✅ Correct!\\n"); score += 1
        else:
            print(f"  ❌ Wrong. Answer: {answer}\\n")
    except:
        print(f"  ❌ Invalid. Answer: {answer}\\n")

print(f"\\n🏆 Final Score: {score}/10")`
  },
  {
    id: "word-scramble",
    name: "word-scramble",
    desc: "Unscramble the word before the timer runs out. Gets harder as you go.",
    tag: "games", lang: "python", icon: "🔤",
    code: `import random, threading, time

WORDS = ["python","keyboard","monitor","browser","network","program","compile",
         "function","variable","database","terminal","password","download","install"]

def scramble(word):
    chars = list(word)
    while ''.join(chars) == word:
        random.shuffle(chars)
    return ''.join(chars)

score = 0
for round_num in range(1, 8):
    word    = random.choice(WORDS)
    mixed   = scramble(word)
    time_limit = max(5, 12 - round_num)
    answered   = [False]

    print(f"\\n  Round {round_num} | ⏱ {time_limit}s | Scrambled: {mixed.upper()}")

    def timeout():
        if not answered[0]:
            print(f"\\n  ⏰ Time's up! The word was: {word}")
            answered[0] = True

    timer = threading.Timer(time_limit, timeout)
    timer.start()

    guess = input("  Your answer: ").strip().lower()
    timer.cancel()

    if answered[0]: continue
    answered[0] = True

    if guess == word:
        print("  ✅ Correct! +1")
        score += 1
    else:
        print(f"  ❌ Wrong. It was: {word}")

print(f"\\n🏆 Final score: {score}/7")`
  },
  {
    id: "Blooket Flooder",
    name: "Blooket Flooder",
    desc: "Only works on windows must have vs code installed and chrome",
    tag: "games",
    lang: "python",
    icon: "🔧",
    code: `import asyncio
import random
import os
from playwright.async_api import async_playwright

# --- 🧠 THE COLLECTIVE HIVE MIND ---
LEARNED_ANSWERS = {}

# --- 📸 THE MONITORING HUB ---
async def start_camera(page, bot_name):
    while True:
        try:
            await page.screenshot(path=f"LIVE_VIEW_{bot_name}.png")
        except: break 
        await asyncio.sleep(5)

async def auto_grinder_logic(page, bot_name, mode):
    print(f"[*] {bot_name}: All-Systems Integrated (v12.9).")
    
    while True:
        try:
            await page.bring_to_front()

            # --- 1. POP-UP & HOOKED BUSTER ---
            # This clears the orange "Hooked!" sign and random Blooket modals
            hooked_or_modal = page.locator('div:has-text("Hooked!"), [class*="modal"], [class*="alert"], div:has-text("OK"), div:has-text("Close")')
            if await hooked_or_modal.count() > 0:
                await page.mouse.click(640, 360)
                await asyncio.sleep(0.2)
                continue

            # --- 2. THE LEARNING ENGINE ---
            feedback = page.locator('div:has-text("The correct answer was:"), [class*="feedback"]')
            q_text_el = page.locator('div[class*="questionText"]')
            
            if await feedback.is_visible() and await q_text_el.count() > 0:
                raw_feedback = await feedback.inner_text()
                current_q = await q_text_el.inner_text()
                if ":" in raw_feedback:
                    ans = raw_feedback.split(":")[-1].strip()
                    if LEARNED_ANSWERS.get(current_q) != ans:
                        LEARNED_ANSWERS[current_q] = ans
                        print(f"🎯 {bot_name} SNAPSHOT: {ans}")
                
                await asyncio.sleep(0.5)
                await page.mouse.click(640, 360)
                continue

            # --- 3. THE CLASSROOM ---
            if await q_text_el.count() > 0:
                current_q = await q_text_el.inner_text()
                known_a = LEARNED_ANSWERS.get(current_q)
                answers = page.locator('div[role="button"][style*="background-color"]')
                
                if await answers.count() > 0:
                    await asyncio.sleep(random.uniform(0.8, 1.2))
                    if known_a:
                        print(f"✅ {bot_name}: Using Hive Brain -> {known_a}")
                        target = page.locator(f'div[role="button"]:has-text("{known_a}")').first
                        if await target.count() > 0: await target.click(force=True)
                        else: await answers.nth(0).click(force=True)
                    else:
                        print(f"❓ {bot_name}: New question. Guessing...")
                        await answers.nth(0).click(force=True)
                    
                    await asyncio.sleep(0.5)
                    await page.mouse.click(640, 360)
                continue

            # --- 4. MODE LOGIC (Fishing / Gold / Factory) ---
            if mode == "fishing":
                await page.mouse.click(1050, 620) # Tutorial Buster
                catch_btn = page.locator('div:has-text("Catch!"), div:has-text("Reel!"), div:has-text("Tap")')
                
                if await catch_btn.count() > 0:
                    await catch_btn.first.click(force=True)
                else:
                    # Physics-Wake Jiggle Cast
                    cx, cy = 640 + random.randint(-30, 30), 450 + random.randint(-15, 15)
                    await page.mouse.move(cx - 5, cy + 5)
                    await page.mouse.down()
                    await asyncio.sleep(0.12)
                    await page.mouse.up()

            elif mode == "gold":
                chests = page.locator('div[class*="chest"]')
                if await chests.count() > 0:
                    await chests.nth(random.randint(0, await chests.count()-1)).click(force=True)

        except: pass
        await asyncio.sleep(random.uniform(0.7, 1.1))

async def deploy_phantom(game_id, bot_name, is_random, mode, index):
    await asyncio.sleep(index * 5) # Join Stagger
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, args=["--window-position=-2000,0"])
        context = await browser.new_context(viewport={'width': 1280, 'height': 720})
        page = await context.new_page()
        await page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        asyncio.create_task(start_camera(page, bot_name))

        try:
            await page.goto("https://play.blooket.com/play")
            
            # Phase 1: ID
            id_box = page.get_by_placeholder("Game ID")
            await id_box.wait_for(state="visible")
            await id_box.type(game_id, delay=150)
            await page.keyboard.press("Enter")
            await asyncio.sleep(5) 

            # Phase 2: Nickname
            name_box = page.get_by_placeholder("Nickname")
            await name_box.wait_for(state="visible")
            if not is_random: await name_box.type(bot_name, delay=150)
            else: 
                spin = page.locator('div:has-text("New Name"), div:has-text("Spin")').first
                if await spin.is_visible(): await spin.click()

            # SIBLING-LINK BREAKTHROUGH
            header = page.locator('div:has-text("Nickname")')
            attempts = 0
            while await header.count() > 0 and attempts < 10:
                sibling = page.locator('input[placeholder*="Nickname"] + div, i.fa-arrow-right').first
                try: await sibling.click(force=True, timeout=1000)
                except: pass
                await page.keyboard.press("Tab")
                await page.keyboard.press("Enter")
                await asyncio.sleep(1.5)
                attempts += 1

            await auto_grinder_logic(page, bot_name, mode)
        except Exception as e: print(f"❌ {bot_name} Error: {e}")
        finally: await browser.close()

async def main():
    print("="*45)
    print("   BLOOKET PHANTOM FINAL v12.9")
    print("="*45)
    gid = input("Game ID: ")
    num = int(input("How many bots: "))
    print("\nModes: [fishing], [gold], [classic]")
    mode = input("Select Mode: ").lower().strip()
    is_rand = input("Random Names? (y/n): ").lower() == 'y'
    base = "Agent" if is_rand else input("Base Name: ")
    
    tasks = [deploy_phantom(gid, f"{base}_{i+1}", is_rand, mode, i) for i in range(num)]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    try: asyncio.run(main())
    except KeyboardInterrupt: print("\n🛑 Offline.")`
  },

];
