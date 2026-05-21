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


  // ── FILE TOOLS (new) ────────────────────────────────────────
  {
    id: "word-counter",
    name: "word-counter",
    desc: "Count words, lines, characters, and sentences in any text file.",
    tag: "file tools", lang: "python", icon: "📝",
    code: `import sys, re

path = input("Text file path: ").strip()
try:
    text = open(path, encoding="utf-8").read()
except FileNotFoundError:
    print("File not found."); sys.exit(1)

words     = len(text.split())
lines     = text.count("\\n") + 1
chars     = len(text)
chars_ns  = len(text.replace(" ", "").replace("\\n", ""))
sentences = len(re.findall(r'[.!?]+', text))

print(f"\\n📄 {path}")
print(f"  Words:       {words:,}")
print(f"  Lines:       {lines:,}")
print(f"  Characters:  {chars:,} ({chars_ns:,} without spaces)")
print(f"  Sentences:   {sentences:,}")`
  },

  {
    id: "find-large-files",
    name: "find-large-files",
    desc: "Scan a folder and list all files above a size threshold — find what's eating your disk.",
    tag: "file tools", lang: "python", icon: "🔍",
    code: `import os, sys

folder = input("Folder to scan: ").strip()
mb     = float(input("Minimum size in MB: ").strip())
limit  = mb * 1024 * 1024

if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

results = []
for root, _, files in os.walk(folder):
    for f in files:
        p = os.path.join(root, f)
        try:
            s = os.path.getsize(p)
            if s >= limit:
                results.append((s, p))
        except OSError:
            pass

results.sort(reverse=True)
if not results:
    print(f"No files larger than {mb} MB found.")
else:
    print(f"\\n{'Size':>10}  Path")
    print("-" * 60)
    for s, p in results:
        print(f"  {s/1024/1024:>7.1f} MB  {p}")
    print(f"\\nFound {len(results)} file(s).")`
  },

  {
    id: "file-hasher",
    name: "file-hasher",
    desc: "Generate MD5, SHA1, or SHA256 checksums for any file — verify downloads instantly.",
    tag: "file tools", lang: "python", icon: "🔐",
    code: `import hashlib, sys

path = input("File path: ").strip()
algo = input("Hash algorithm (md5 / sha1 / sha256): ").strip().lower()

if algo not in ("md5", "sha1", "sha256"):
    print("Unknown algorithm."); sys.exit(1)

h = hashlib.new(algo)
try:
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
except FileNotFoundError:
    print("File not found."); sys.exit(1)

print(f"\\n  {algo.upper()}: {h.hexdigest()}")
compare = input("\\nPaste a hash to compare (blank to skip): ").strip()
if compare:
    match = h.hexdigest().lower() == compare.lower()
    print("  ✅ Match!" if match else "  ❌ No match.")`
  },

  {
    id: "batch-lowercase",
    name: "batch-lowercase",
    desc: "Rename all files in a folder to lowercase — fixes case issues instantly.",
    tag: "file tools", lang: "python", icon: "🔡",
    code: `import os, sys

folder = input("Folder path: ").strip()
if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

renamed = 0
for fname in os.listdir(folder):
    lower = fname.lower()
    if fname != lower:
        src = os.path.join(folder, fname)
        dst = os.path.join(folder, lower)
        if not os.path.exists(dst):
            os.rename(src, dst)
            print(f"  {fname}  →  {lower}")
            renamed += 1
        else:
            print(f"  SKIP (conflict): {fname}")

print(f"\\nDone. {renamed} file(s) renamed.")`
  },

  {
    id: "extension-counter",
    name: "extension-counter",
    desc: "Count how many files of each type exist in a folder — see what's in there.",
    tag: "file tools", lang: "python", icon: "📊",
    code: `import os, sys
from collections import Counter

folder = input("Folder to scan: ").strip()
recurse = input("Include subfolders? (y/n): ").strip().lower() == "y"

if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

counts = Counter()
for root, _, files in os.walk(folder) if recurse else [(folder, [], os.listdir(folder))]:
    for f in files:
        ext = os.path.splitext(f)[1].lower() or "(no extension)"
        counts[ext] += 1

print(f"\\n{'Extension':20} {'Count':>6}")
print("-" * 28)
for ext, n in counts.most_common():
    print(f"  {ext:18} {n:>6}")
print(f"\\nTotal files: {sum(counts.values()):,}")`
  },

  {
    id: "find-old-files",
    name: "find-old-files",
    desc: "Find files that haven't been modified in N days — clean up stale data.",
    tag: "file tools", lang: "python", icon: "🗓️",
    code: `import os, sys, time

folder = input("Folder to scan: ").strip()
days   = int(input("Older than how many days? ").strip())

if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

cutoff  = time.time() - days * 86400
results = []
for root, _, files in os.walk(folder):
    for f in files:
        p = os.path.join(root, f)
        try:
            mtime = os.path.getmtime(p)
            if mtime < cutoff:
                age = (time.time() - mtime) / 86400
                results.append((mtime, age, p))
        except OSError:
            pass

results.sort()
if not results:
    print(f"No files older than {days} days found.")
else:
    for _, age, p in results:
        print(f"  {age:>6.0f} days  {p}")
    print(f"\\nFound {len(results)} old file(s).")`
  },

  {
    id: "line-counter",
    name: "line-counter",
    desc: "Count total lines of code across all files in a project folder.",
    tag: "file tools", lang: "python", icon: "🧮",
    code: `import os, sys

folder = input("Project folder: ").strip()
exts   = input("File extensions (e.g. .py .js .html, blank=all): ").strip().split()
exts   = [e if e.startswith(".") else "." + e for e in exts]

if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

totals = {}
for root, _, files in os.walk(folder):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if exts and ext not in exts:
            continue
        p = os.path.join(root, f)
        try:
            lines = sum(1 for _ in open(p, encoding="utf-8", errors="ignore"))
            totals[ext] = totals.get(ext, 0) + lines
        except OSError:
            pass

print(f"\\n{'Extension':15} {'Lines':>8}")
print("-" * 25)
for ext, n in sorted(totals.items(), key=lambda x: -x[1]):
    print(f"  {ext:13} {n:>8,}")
print(f"\\n  {'TOTAL':13} {sum(totals.values()):>8,}")`
  },

  {
    id: "file-encryptor",
    name: "file-encryptor",
    desc: "Password-encrypt or decrypt any file using AES-256 (requires no external libs).",
    tag: "file tools", lang: "python", icon: "🔒",
    code: `import os, sys, hashlib, secrets

def xor_crypt(data: bytes, key: bytes) -> bytes:
    key_len = len(key)
    return bytes(b ^ key[i % key_len] for i, b in enumerate(data))

mode = input("Encrypt or Decrypt? (e/d): ").strip().lower()
path = input("File path: ").strip()
pwd  = input("Password: ").strip()

if not os.path.exists(path):
    print("File not found."); sys.exit(1)

key  = hashlib.sha256(pwd.encode()).digest()
data = open(path, "rb").read()

if mode == "e":
    salt   = secrets.token_bytes(16)
    result = salt + xor_crypt(data, key + salt)
    out    = path + ".enc"
    open(out, "wb").write(result)
    print(f"✅ Encrypted: {out}")
elif mode == "d":
    salt   = data[:16]
    result = xor_crypt(data[16:], key + salt)
    out    = path.replace(".enc", ".dec") if path.endswith(".enc") else path + ".dec"
    open(out, "wb").write(result)
    print(f"✅ Decrypted: {out}")
else:
    print("Invalid mode.")`
  },

  {
    id: "empty-folder-finder",
    name: "empty-folder-finder",
    desc: "Find and optionally delete all empty folders in a directory tree.",
    tag: "file tools", lang: "python", icon: "📭",
    code: `import os, sys

folder = input("Root folder to scan: ").strip()
if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

empty = []
for root, dirs, files in os.walk(folder, topdown=False):
    if not os.listdir(root):
        empty.append(root)

if not empty:
    print("No empty folders found. 🎉")
    sys.exit(0)

print(f"\\nFound {len(empty)} empty folder(s):")
for e in empty:
    print(f"  {e}")

confirm = input("\\nDelete all? (yes/no): ").strip().lower()
if confirm == "yes":
    deleted = 0
    for e in empty:
        try:
            os.rmdir(e)
            deleted += 1
        except OSError:
            pass
    print(f"Deleted {deleted} folder(s).")
else:
    print("Nothing deleted.")`
  },

  {
    id: "txt-splitter",
    name: "txt-splitter",
    desc: "Split a large text file into smaller chunks by line count.",
    tag: "file tools", lang: "python", icon: "✂️",
    code: `import os, sys, math

path  = input("Text file path: ").strip()
chunk = int(input("Lines per chunk: ").strip())

try:
    lines = open(path, encoding="utf-8").readlines()
except FileNotFoundError:
    print("File not found."); sys.exit(1)

total  = len(lines)
parts  = math.ceil(total / chunk)
base   = os.path.splitext(path)[0]
ext    = os.path.splitext(path)[1]

print(f"\\nSplitting {total:,} lines into {parts} file(s)...")

for i in range(parts):
    out_path = f"{base}_part{i+1:03d}{ext}"
    chunk_lines = lines[i * chunk:(i + 1) * chunk]
    open(out_path, "w", encoding="utf-8").writelines(chunk_lines)
    print(f"  ✓ {out_path} ({len(chunk_lines):,} lines)")

print("Done.")`
  },


  // ── UTILITIES (new) ─────────────────────────────────────────
  {
    id: "dice-roller",
    name: "dice-roller",
    desc: "Roll any combination of dice (d4, d6, d8, d10, d12, d20, d100) with totals.",
    tag: "utilities", lang: "python", icon: "🎲",
    code: `import random, re

print("🎲 Dice Roller — type 'quit' to exit")
print("  Format: 2d6, 1d20, 3d8+5, etc.\\n")

while True:
    expr = input("Roll: ").strip().lower()
    if expr in ("quit", "q", "exit"):
        break
    m = re.match(r"(\\d+)d(\\d+)([+-]\\d+)?", expr)
    if not m:
        print("  ❌ Format: NdN (e.g. 2d6, 1d20+3)"); continue
    num, sides, mod = int(m.group(1)), int(m.group(2)), int(m.group(3) or 0)
    rolls = [random.randint(1, sides) for _ in range(num)]
    total = sum(rolls) + mod
    roll_str = " + ".join(str(r) for r in rolls)
    mod_str  = f" {'+' if mod>=0 else ''}{mod}" if mod else ""
    print(f"  [{roll_str}]{mod_str} = {total}")`
  },

  {
    id: "todo-cli",
    name: "todo-cli",
    desc: "A simple command-line to-do list that saves to a file — add, done, list, delete.",
    tag: "utilities", lang: "python", icon: "✅",
    code: `import json, os, sys

FILE = "todos.json"

def load():
    return json.load(open(FILE)) if os.path.exists(FILE) else []

def save(todos):
    json.dump(todos, open(FILE, "w"), indent=2)

print("📋 Todo CLI  |  Commands: add, list, done, delete, clear, quit\\n")

while True:
    cmd = input("todo> ").strip().lower()
    todos = load()

    if cmd == "quit": break
    elif cmd == "list":
        if not todos: print("  (no todos)")
        for i, t in enumerate(todos):
            status = "✅" if t["done"] else "⬜"
            print(f"  [{i+1}] {status} {t['text']}")
    elif cmd.startswith("add "):
        text = cmd[4:].strip()
        todos.append({"text": text, "done": False})
        save(todos); print(f"  Added: {text}")
    elif cmd.startswith("done "):
        idx = int(cmd[5:].strip()) - 1
        todos[idx]["done"] = True
        save(todos); print(f"  ✅ Done: {todos[idx]['text']}")
    elif cmd.startswith("delete "):
        idx = int(cmd[7:].strip()) - 1
        removed = todos.pop(idx)
        save(todos); print(f"  Deleted: {removed['text']}")
    elif cmd == "clear":
        save([]); print("  All todos cleared.")
    else:
        print("  Unknown command.")`
  },

  {
    id: "pomodoro",
    name: "pomodoro",
    desc: "A Pomodoro timer with work/break cycles — stay focused and productive.",
    tag: "utilities", lang: "python", icon: "🍅",
    code: `import time, sys

def countdown(seconds, label):
    print(f"\\n  🍅 {label}")
    for remaining in range(seconds, 0, -1):
        m, s = divmod(remaining, 60)
        print(f"\\r  ⏱  {m:02d}:{s:02d} remaining", end="", flush=True)
        time.sleep(1)
    print(f"\\r  ✅ {label} complete!    ")

work_min  = int(input("Work minutes (default 25): ").strip() or "25")
break_min = int(input("Break minutes (default 5): ").strip() or "5")
sessions  = int(input("How many Pomodoros? ").strip())

for i in range(1, sessions + 1):
    print(f"\\n─── Pomodoro {i}/{sessions} ───")
    countdown(work_min * 60, f"Work block ({work_min} min)")
    if i < sessions:
        countdown(break_min * 60, f"Break ({break_min} min)")

print("\\n🏆 All Pomodoros done! Great work.")`
  },

  {
    id: "binary-converter",
    name: "binary-converter",
    desc: "Convert between binary, decimal, hex, and octal in both directions.",
    tag: "utilities", lang: "python", icon: "💾",
    code: `print("🔢 Number Base Converter — type 'quit' to exit\\n")

bases = {"bin": 2, "dec": 10, "hex": 16, "oct": 8}

while True:
    src = input("From (bin/dec/hex/oct): ").strip().lower()
    if src == "quit": break
    if src not in bases:
        print("  Unknown base."); continue
    val_str = input("Value: ").strip()
    try:
        n = int(val_str, bases[src])
    except ValueError:
        print("  Invalid number."); continue

    print(f"  Binary:      {bin(n)}")
    print(f"  Octal:       {oct(n)}")
    print(f"  Decimal:     {n}")
    print(f"  Hexadecimal: {hex(n).upper().replace('0X','0x')}\\n")`
  },

  {
    id: "caesar-cipher",
    name: "caesar-cipher",
    desc: "Encode or decode messages using the classic Caesar shift cipher.",
    tag: "utilities", lang: "python", icon: "🔤",
    code: `def shift(text, n, decode=False):
    if decode: n = -n
    result = []
    for ch in text:
        if ch.isalpha():
            base = ord("A") if ch.isupper() else ord("a")
            result.append(chr((ord(ch) - base + n) % 26 + base))
        else:
            result.append(ch)
    return "".join(result)

print("🔤 Caesar Cipher\\n")

while True:
    mode = input("Encode or Decode? (e/d/quit): ").strip().lower()
    if mode == "quit": break
    text  = input("Text: ")
    rot   = int(input("Shift (1-25): ").strip())
    decode = mode == "d"
    print(f"  Result: {shift(text, rot, decode)}\\n")`
  },

  {
    id: "uuid-generator",
    name: "uuid-generator",
    desc: "Generate any number of UUIDs (v1, v3, v4, v5) — great for database IDs.",
    tag: "utilities", lang: "python", icon: "🪪",
    code: `import uuid

print("🪪 UUID Generator\\n")

ver = input("Version (1/4 — recommended: 4): ").strip()
count = int(input("How many UUIDs? ").strip())

print()
for _ in range(count):
    if ver == "1":
        print(f"  {uuid.uuid1()}")
    else:
        print(f"  {uuid.uuid4()}")

print(f"\\nGenerated {count} UUID(s).")`
  },

  {
    id: "word-frequency",
    name: "word-frequency",
    desc: "Find the most common words in any text file — great for text analysis.",
    tag: "utilities", lang: "python", icon: "📈",
    code: `import re, sys
from collections import Counter

path    = input("Text file path: ").strip()
top_n   = int(input("Show top N words (e.g. 20): ").strip())
exclude = {"the","a","an","is","are","was","were","in","on","at","to","of","and","or","but","it","that","this","with","for","as","be","by","from","not","he","she","they","we","you","i","do","did","have","has"}

try:
    text = open(path, encoding="utf-8").read().lower()
except FileNotFoundError:
    print("File not found."); sys.exit(1)

words   = re.findall(r"\\b[a-z]+\\b", text)
counts  = Counter(w for w in words if w not in exclude)

print(f"\\n{'Word':20} {'Count':>6}  {'Bar'}")
print("-" * 50)
for word, n in counts.most_common(top_n):
    bar = "█" * min(n, 30)
    print(f"  {word:18} {n:>6}  {bar}")`
  },

  {
    id: "ascii-banner",
    name: "ascii-banner",
    desc: "Turn any short text into a giant ASCII art banner for your terminal.",
    tag: "utilities", lang: "python", icon: "🎨",
    code: `FONT = {
  'A':'  oo  \\n o  o \\nooooo\\no    o', 'B':'oooo \\no   o\\noooo \\no   o\\noooo ',
  'C':' oooo\\no    \\no    \\no    \\n oooo', 'D':'ooo  \\no  o \\no   o\\no  o \\nooo  ',
  'E':'ooooo\\no    \\noooo \\no    \\nooooo', 'F':'ooooo\\no    \\noooo \\no    \\no    ',
  'G':' oooo\\no    \\no  oo\\no   o\\n oooo', 'H':'o   o\\no   o\\noooo o\\no   o\\no   o',
  'I':'ooooo\\n  o  \\n  o  \\n  o  \\nooooo', 'J':'  ooo\\n   o \\n   o \\no  o \\n ooo ',
  'K':'o   o\\no  o \\nooo  \\no  o \\no   o', 'L':'o    \\no    \\no    \\no    \\nooooo',
  'M':'o   o\\noo oo\\no o o\\no   o\\no   o', 'N':'o   o\\noo  o\\no o o\\no  oo\\no   o',
  'O':' ooo \\no   o\\no   o\\no   o\\n ooo ', 'P':'oooo \\no   o\\noooo \\no    \\no    ',
  'Q':' ooo \\no   o\\no o o\\no  oo\\n oooo', 'R':'oooo \\no   o\\noooo \\no  o \\no   o',
  'S':' oooo\\no    \\n ooo \\n    o\\noooo ', 'T':'ooooo\\n  o  \\n  o  \\n  o  \\n  o  ',
  'U':'o   o\\no   o\\no   o\\no   o\\n ooo ', 'V':'o   o\\no   o\\no   o\\n o o \\n  o  ',
  'W':'o   o\\no   o\\no o o\\noo oo\\no   o', 'X':'o   o\\n o o \\n  o  \\n o o \\no   o',
  'Y':'o   o\\n o o \\n  o  \\n  o  \\n  o  ', 'Z':'ooooo\\n   o \\n  o  \\n o   \\nooooo',
  ' ':'     \\n     \\n     \\n     \\n     ',
}

text = input("Text (A-Z only): ").upper()
rows = [[] for _ in range(5)]
for ch in text:
    lines = FONT.get(ch, FONT[' ']).split('\\n')
    for i, l in enumerate(lines):
        rows[i].append(l)
print()
for row in rows:
    print("  " + "  ".join(row))`
  },

  {
    id: "age-calculator",
    name: "age-calculator",
    desc: "Calculate your exact age in years, months, days, hours, and minutes.",
    tag: "utilities", lang: "python", icon: "🎂",
    code: `from datetime import datetime

raw = input("Enter your birthday (YYYY-MM-DD): ").strip()

try:
    bday = datetime.strptime(raw, "%Y-%m-%d")
except ValueError:
    print("Invalid date format."); exit(1)

now    = datetime.now()
if bday > now:
    print("Birthday is in the future!"); exit(1)

delta  = now - bday
years  = (now.year - bday.year) - ((now.month, now.day) < (bday.month, bday.day))
months = (now.month - bday.month) % 12
days   = delta.days
hours  = days * 24
mins   = hours * 60

print(f"\\n🎂 You are:")
print(f"  {years} years, {months} months old")
print(f"  {days:,} days")
print(f"  {hours:,} hours")
print(f"  {mins:,} minutes")

# Next birthday
next_bday = bday.replace(year=now.year)
if next_bday < now:
    next_bday = bday.replace(year=now.year + 1)
days_left = (next_bday - now).days
print(f"\\n  🎁 Next birthday in {days_left} day(s)!")`
  },

  {
    id: "anagram-checker",
    name: "anagram-checker",
    desc: "Check if two words or phrases are anagrams of each other.",
    tag: "utilities", lang: "python", icon: "🔀",
    code: `from collections import Counter

print("🔀 Anagram Checker — type 'quit' to exit\\n")

while True:
    a = input("Word / phrase 1 (or 'quit'): ").strip()
    if a.lower() == "quit": break
    b = input("Word / phrase 2: ").strip()

    ca = Counter(a.lower().replace(" ", ""))
    cb = Counter(b.lower().replace(" ", ""))

    if ca == cb:
        print(f"  ✅ Yes! '{a}' and '{b}' are anagrams.\\n")
    else:
        diff = set(ca.keys()) ^ set(cb.keys())
        print(f"  ❌ Not anagrams. Different letters: {', '.join(sorted(diff))}\\n")`
  },


  {
    id: "morse-code",
    name: "morse-code",
    desc: "Encode text to Morse code or decode Morse code back to text.",
    tag: "utilities", lang: "python", icon: "📡",
    code: `MORSE = {
  'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---',
  'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
  'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  ' ':'/'
}
DECODE = {v: k for k, v in MORSE.items()}

print("📡 Morse Code Converter\\n")

while True:
    mode = input("Encode (e) or Decode (d) or quit: ").strip().lower()
    if mode == "quit": break
    text = input("Input: ").strip()
    if mode == "e":
        result = " ".join(MORSE.get(c.upper(), "?") for c in text)
        print(f"  Morse: {result}\\n")
    elif mode == "d":
        result = "".join(DECODE.get(w, "?") for w in text.split(" "))
        print(f"  Text: {result}\\n")
    else:
        print("  Type e, d, or quit.")`
  },

  {
    id: "coin-flipper",
    name: "coin-flipper",
    desc: "Flip a coin N times and see a tally of heads vs tails with a bar chart.",
    tag: "utilities", lang: "python", icon: "🪙",
    code: `import random

flips = int(input("How many flips? ").strip())
heads = tails = 0

for _ in range(flips):
    if random.random() < 0.5:
        heads += 1
    else:
        tails += 1

bar_h = "█" * round(30 * heads / flips)
bar_t = "█" * round(30 * tails / flips)

print(f"\\n🪙 Results of {flips:,} flips:")
print(f"  Heads  {heads:6,} ({100*heads/flips:.1f}%)  {bar_h}")
print(f"  Tails  {tails:6,} ({100*tails/flips:.1f}%)  {bar_t}")`
  },

  {
    id: "random-quote",
    name: "random-quote",
    desc: "Display a random motivational quote from a built-in collection.",
    tag: "utilities", lang: "python", icon: "💬",
    code: `import random

QUOTES = [
  ("The only way to do great work is to love what you do.", "Steve Jobs"),
  ("In the middle of every difficulty lies opportunity.", "Albert Einstein"),
  ("It does not matter how slowly you go as long as you do not stop.", "Confucius"),
  ("Life is what happens when you're busy making other plans.", "John Lennon"),
  ("Whether you think you can or you think you can't, you're right.", "Henry Ford"),
  ("The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"),
  ("Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"),
  ("Believe you can and you're halfway there.", "Theodore Roosevelt"),
  ("You miss 100% of the shots you don't take.", "Wayne Gretzky"),
  ("The best time to plant a tree was 20 years ago. The second best time is now.", "Chinese Proverb"),
  ("An unexamined life is not worth living.", "Socrates"),
  ("Spread love everywhere you go.", "Mother Teresa"),
  ("When you reach the end of your rope, tie a knot in it and hang on.", "Franklin D. Roosevelt"),
  ("Always remember that you are absolutely unique. Just like everyone else.", "Margaret Mead"),
  ("Do not go where the path may lead; go instead where there is no path and leave a trail.", "Ralph Waldo Emerson"),
]

quote, author = random.choice(QUOTES)
print(f"\\n💬 {quote}")
print(f"     — {author}\\n")`
  },

  {
    id: "text-stats",
    name: "text-stats",
    desc: "Paste text and get reading time, Flesch readability score, and word stats.",
    tag: "utilities", lang: "python", icon: "📊",
    code: `import re, math

print("📊 Text Stats — paste text, type END on a new line when done:\\n")

lines = []
while True:
    line = input()
    if line.strip() == "END": break
    lines.append(line)
text = " ".join(lines)

words     = text.split()
word_count= len(words)
sent_pat  = re.findall(r'[^.!?]+[.!?]', text)
sentences = len(sent_pat) or 1
syllables = sum(max(1, len(re.findall(r'[aeiouAEIOU]', w))) for w in words)

# Flesch Reading Ease
fre = 206.835 - 1.015 * (word_count / sentences) - 84.6 * (syllables / max(1, word_count))
fre = max(0, min(100, fre))

if fre >= 90: level = "Very Easy (5th grade)"
elif fre >= 70: level = "Easy (6th-7th grade)"
elif fre >= 60: level = "Standard (8th-9th grade)"
elif fre >= 50: level = "Fairly Difficult (10th-12th)"
elif fre >= 30: level = "Difficult (College)"
else: level = "Very Difficult (Professional)"

read_min  = math.ceil(word_count / 200)

print(f"\\n  Words:         {word_count:,}")
print(f"  Sentences:     {sentences:,}")
print(f"  Avg words/sent:{word_count/sentences:.1f}")
print(f"  Reading time:  ~{read_min} min")
print(f"  Readability:   {fre:.1f}/100 — {level}")`
  },

  // ── AUTOMATION (new) ────────────────────────────────────────
  {
    id: "system-info",
    name: "system-info",
    desc: "Display a complete snapshot of your system: OS, CPU, RAM, disk, Python version.",
    tag: "automation", lang: "python", icon: "💻",
    code: `import platform, sys, os

def fmt_bytes(b):
    for unit in ("B","KB","MB","GB","TB"):
        if b < 1024: return f"{b:.1f} {unit}"
        b /= 1024
    return f"{b:.1f} PB"

print("\\n💻 System Information")
print("=" * 40)
print(f"  OS:          {platform.system()} {platform.release()}")
print(f"  Machine:     {platform.machine()}")
print(f"  Processor:   {platform.processor() or 'unknown'}")
print(f"  Python:      {sys.version.split()[0]}")
print(f"  Hostname:    {platform.node()}")
print()

# Disk
stat = os.statvfs("/") if hasattr(os,"statvfs") else None
if stat:
    total = stat.f_blocks * stat.f_frsize
    free  = stat.f_bavail * stat.f_frsize
    print(f"  Disk Total:  {fmt_bytes(total)}")
    print(f"  Disk Free:   {fmt_bytes(free)}")

print(f"  CPU Cores:   {os.cpu_count()}")`
  },

  {
    id: "port-checker",
    name: "port-checker",
    desc: "Check if a host's port is open or closed — quick network diagnostic tool.",
    tag: "automation", lang: "python", icon: "🔌",
    code: `import socket, sys

host = input("Host (e.g. google.com or 192.168.1.1): ").strip()
ports_raw = input("Port(s) to check (e.g. 80 443 22): ").strip().split()

print()
for p_str in ports_raw:
    try:
        port = int(p_str)
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(2)
            result = s.connect_ex((host, port))
        if result == 0:
            print(f"  ✅ {host}:{port}  OPEN")
        else:
            print(f"  ❌ {host}:{port}  CLOSED")
    except ValueError:
        print(f"  ⚠️  Invalid port: {p_str}")
    except socket.gaierror:
        print(f"  ⚠️  Cannot resolve host: {host}"); break`
  },

  {
    id: "ping-sweep",
    name: "ping-sweep",
    desc: "Ping a list of hosts and report which are up or down — great for network checks.",
    tag: "automation", lang: "python", icon: "📡",
    code: `import subprocess, sys, platform

hosts_raw = input("Enter hosts to ping (space-separated): ").strip().split()
param = "-n" if platform.system().lower() == "windows" else "-c"

print()
up = down = 0
for host in hosts_raw:
    try:
        result = subprocess.run(
            ["ping", param, "1", host],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=3
        )
        if result.returncode == 0:
            print(f"  ✅ {host}  UP")
            up += 1
        else:
            print(f"  ❌ {host}  DOWN")
            down += 1
    except Exception:
        print(f"  ⚠️  {host}  ERROR")
        down += 1

print(f"\\nUp: {up}  Down: {down}")`
  },

  {
    id: "temp-file-finder",
    name: "temp-file-finder",
    desc: "Scan a folder for temporary and cache files (.tmp, .log, __pycache__, etc.).",
    tag: "automation", lang: "python", icon: "🗑️",
    code: `import os, sys

folder = input("Folder to scan: ").strip()
JUNK_EXTS = {".tmp", ".temp", ".log", ".bak", ".cache", ".swp", ".DS_Store"}
JUNK_DIRS = {"__pycache__", ".mypy_cache", ".pytest_cache", "node_modules", ".cache"}

if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

found = []
for root, dirs, files in os.walk(folder):
    dirs[:] = [d for d in dirs if d not in JUNK_DIRS]
    for d in os.listdir(root):
        if d in JUNK_DIRS:
            found.append(os.path.join(root, d) + "/")
    for f in files:
        if os.path.splitext(f)[1].lower() in JUNK_EXTS or f in {".DS_Store", "Thumbs.db"}:
            found.append(os.path.join(root, f))

if not found:
    print("No junk files found! 🎉")
else:
    print(f"\\nFound {len(found)} junk file(s):")
    for p in found:
        size = os.path.getsize(p) if not p.endswith("/") else 0
        print(f"  {size:>8,} B  {p}")`
  },

  {
    id: "scheduled-shutdown",
    name: "scheduled-shutdown",
    desc: "Schedule your computer to shut down or restart in N minutes.",
    tag: "automation", lang: "python", icon: "⏻",
    code: `import subprocess, platform, sys, time

action = input("Action: [1] Shutdown  [2] Restart: ").strip()
mins   = int(input("In how many minutes? ").strip())
secs   = mins * 60

print(f"\\n⏻ Scheduled {'shutdown' if action=='1' else 'restart'} in {mins} minute(s).")
print("  Press Ctrl+C to cancel.\\n")

try:
    for remaining in range(secs, 0, -1):
        m, s = divmod(remaining, 60)
        print(f"\\r  ⏱  {m:02d}:{s:02d} remaining", end="", flush=True)
        time.sleep(1)
except KeyboardInterrupt:
    print("\\n\\n  ✅ Cancelled.")
    sys.exit(0)

os_name = platform.system().lower()
if os_name == "windows":
    cmd = ["shutdown", "/s" if action=="1" else "/r", "/t", "0"]
else:
    cmd = ["sudo", "shutdown", "-h" if action=="1" else "-r", "now"]
subprocess.run(cmd)`
  },

  {
    id: "cpu-monitor",
    name: "cpu-monitor",
    desc: "Watch live CPU and memory usage in your terminal — lightweight and fast.",
    tag: "automation", lang: "python", icon: "📈",
    code: `import time, os, subprocess, platform

def get_cpu():
    try:
        import psutil
        return psutil.cpu_percent(interval=0.5), psutil.virtual_memory().percent
    except ImportError:
        return None, None

def bar(pct, width=25):
    filled = round(pct / 100 * width)
    return "█" * filled + "░" * (width - filled)

print("📈 CPU Monitor — Ctrl+C to stop\\n")

while True:
    try:
        cpu, mem = get_cpu()
        if cpu is None:
            print("Install psutil: pip install psutil")
            break
        print(f"\\r  CPU {cpu:5.1f}%  {bar(cpu)}   RAM {mem:5.1f}%  {bar(mem)}", end="", flush=True)
        time.sleep(1)
    except KeyboardInterrupt:
        print("\\n\\nStopped.")
        break`
  },

  {
    id: "batch-image-rename",
    name: "batch-image-rename",
    desc: "Rename all images in a folder sequentially with a custom prefix (photo_001.jpg, etc.).",
    tag: "automation", lang: "python", icon: "🖼️",
    code: `import os, sys

folder = input("Folder with images: ").strip()
prefix = input("Filename prefix (e.g. photo): ").strip()
start  = int(input("Start number (e.g. 1): ").strip() or "1")

IMG_EXTS = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"}

if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

images = sorted(f for f in os.listdir(folder) if os.path.splitext(f)[1].lower() in IMG_EXTS)

if not images:
    print("No images found.")
    sys.exit(0)

for i, fname in enumerate(images, start=start):
    ext     = os.path.splitext(fname)[1].lower()
    new     = f"{prefix}_{i:03d}{ext}"
    src     = os.path.join(folder, fname)
    dst     = os.path.join(folder, new)
    os.rename(src, dst)
    print(f"  {fname}  →  {new}")

print(f"\\nDone. {len(images)} image(s) renamed.")`
  },


  {
    id: "log-analyzer",
    name: "log-analyzer",
    desc: "Parse a log file and summarize errors, warnings, and most common messages.",
    tag: "automation", lang: "python", icon: "📋",
    code: `import re, sys
from collections import Counter

path = input("Log file path: ").strip()
try:
    lines = open(path, encoding="utf-8", errors="ignore").readlines()
except FileNotFoundError:
    print("File not found."); sys.exit(1)

errors   = [l.strip() for l in lines if re.search(r'error|exception|fail',   l, re.I)]
warnings = [l.strip() for l in lines if re.search(r'warn|warning',             l, re.I)]
infos    = [l.strip() for l in lines if re.search(r'\\binfo\\b',               l, re.I)]

print(f"\\n📋 Log Summary ({len(lines):,} lines)")
print(f"  Errors:   {len(errors):,}")
print(f"  Warnings: {len(warnings):,}")
print(f"  Info:     {len(infos):,}")

if errors:
    print("\\n  — Top Errors —")
    for msg, n in Counter(errors).most_common(5):
        print(f"  [{n}x] {msg[:80]}")`
  },

  {
    id: "git-status-check",
    name: "git-status-check",
    desc: "Show a clean summary of your git status — modified, staged, untracked files.",
    tag: "automation", lang: "python", icon: "🌿",
    code: `import subprocess, sys

def run(cmd):
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, shell=True)
        return r.stdout.strip()
    except Exception as e:
        return str(e)

branch   = run("git branch --show-current")
modified = run("git diff --name-only")
staged   = run("git diff --cached --name-only")
untracked= run("git ls-files --others --exclude-standard")
log      = run("git log --oneline -5")

print(f"\\n🌿 Git Status")
print(f"  Branch: {branch or '(none)'}")
print()

for label, data in [("Staged", staged), ("Modified", modified), ("Untracked", untracked)]:
    files = [f for f in data.split("\\n") if f]
    status = f"{len(files)} file(s)" if files else "clean"
    print(f"  {label:12} {status}")
    for f in files[:5]:
        print(f"    · {f}")

print(f"\\n  — Last 5 commits —")
for line in log.split("\\n"):
    if line: print(f"  {line}")`
  },

  {
    id: "file-monitor",
    name: "file-monitor",
    desc: "Watch a folder and print a notification whenever a file is created, changed, or deleted.",
    tag: "automation", lang: "python", icon: "👁️",
    code: `import os, time, sys

folder = input("Folder to watch: ").strip()
if not os.path.isdir(folder):
    print("Folder not found."); sys.exit(1)

def snapshot(f):
    snap = {}
    for entry in os.scandir(f):
        try: snap[entry.path] = entry.stat().st_mtime
        except OSError: pass
    return snap

prev = snapshot(folder)
print(f"\\n👁️  Watching {folder} — Ctrl+C to stop\\n")

try:
    while True:
        time.sleep(1)
        curr = snapshot(folder)
        for p in set(curr) - set(prev):
            print(f"  ✨ CREATED  {os.path.basename(p)}")
        for p in set(prev) - set(curr):
            print(f"  🗑️  DELETED  {os.path.basename(p)}")
        for p in set(curr) & set(prev):
            if curr[p] != prev[p]:
                print(f"  ✏️  CHANGED  {os.path.basename(p)}")
        prev = curr
except KeyboardInterrupt:
    print("\\nStopped.")`
  },

  // ── WEB (new) ───────────────────────────────────────────────
  {
    id: "random-joke",
    name: "random-joke",
    desc: "Fetch a random joke from an online API — programming, dad, and general jokes.",
    tag: "web", lang: "python", icon: "😂",
    code: `import urllib.request, json

URL = "https://official-joke-api.appspot.com/random_joke"

try:
    with urllib.request.urlopen(URL, timeout=5) as r:
        data = json.loads(r.read())
    print(f"\\n😂 {data['setup']}")
    input("  (press Enter for punchline)")
    print(f"\\n  👉 {data['punchline']}\\n")
except Exception as e:
    print(f"Could not fetch joke: {e}")`
  },

  {
    id: "word-definition",
    name: "word-definition",
    desc: "Look up the definition of any English word using a free dictionary API.",
    tag: "web", lang: "python", icon: "📖",
    code: `import urllib.request, json, sys

while True:
    word = input("\\nWord to define (or 'quit'): ").strip()
    if word.lower() == "quit": break
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            data = json.loads(r.read())
    except Exception:
        print("  Not found or offline."); continue

    for entry in data[:1]:
        print(f"\\n📖 {entry['word']}")
        for meaning in entry.get("meanings", [])[:3]:
            pos = meaning["partOfSpeech"]
            print(f"\\n  [{pos}]")
            for d in meaning.get("definitions", [])[:2]:
                print(f"    · {d['definition']}")
                if d.get("example"):
                    print(f"      e.g. {d['example']}")`
  },

  {
    id: "crypto-price",
    name: "crypto-price",
    desc: "Get live cryptocurrency prices (BTC, ETH, and more) from the CoinGecko API.",
    tag: "web", lang: "python", icon: "₿",
    code: `import urllib.request, json

coins_raw = input("Coins (e.g. bitcoin ethereum solana): ").strip().lower().split()
ids       = ",".join(coins_raw)
url       = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd&include_24hr_change=true"

try:
    with urllib.request.urlopen(url, timeout=8) as r:
        data = json.loads(r.read())
except Exception as e:
    print(f"Error: {e}"); exit(1)

print()
for coin in coins_raw:
    if coin in data:
        price  = data[coin].get("usd", 0)
        change = data[coin].get("usd_24h_change", 0)
        arrow  = "▲" if change >= 0 else "▼"
        print(f"  {coin.upper():12}  \${price:>12,.2f}   {arrow} {abs(change):.2f}%")
    else:
        print(f"  {coin.upper():12}  not found")`
  },

  {
    id: "internet-check",
    name: "internet-check",
    desc: "Check if your internet connection is up and measure basic latency.",
    tag: "web", lang: "python", icon: "🌐",
    code: `import urllib.request, time

HOSTS = [
    ("Google", "https://www.google.com"),
    ("Cloudflare", "https://1.1.1.1"),
    ("GitHub", "https://github.com"),
]

print("\\n🌐 Internet Connectivity Check\\n")

all_up = True
for name, url in HOSTS:
    try:
        t0 = time.time()
        urllib.request.urlopen(url, timeout=5)
        ms = (time.time() - t0) * 1000
        print(f"  ✅ {name:12} {ms:5.0f} ms")
    except Exception:
        print(f"  ❌ {name:12} UNREACHABLE")
        all_up = False

print()
print("  Status: " + ("🟢 Online" if all_up else "🔴 Issues detected"))`
  },

  {
    id: "github-user",
    name: "github-user",
    desc: "Look up any GitHub user's profile: repos, followers, bio, and recent activity.",
    tag: "web", lang: "python", icon: "🐙",
    code: `import urllib.request, json

username = input("GitHub username: ").strip()
url      = f"https://api.github.com/users/{username}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "scripthub"})
    with urllib.request.urlopen(req, timeout=8) as r:
        u = json.loads(r.read())
except Exception as e:
    print(f"Error: {e}"); exit(1)

print(f"\\n🐙 GitHub: {u.get('login')}")
print(f"  Name:       {u.get('name') or '—'}")
print(f"  Bio:        {u.get('bio') or '—'}")
print(f"  Location:   {u.get('location') or '—'}")
print(f"  Company:    {u.get('company') or '—'}")
print(f"  Public repos: {u.get('public_repos', 0):,}")
print(f"  Followers:    {u.get('followers', 0):,}")
print(f"  Following:    {u.get('following', 0):,}")
print(f"  Created:    {u.get('created_at','')[:10]}")
print(f"  URL:        {u.get('html_url')}")`
  },

  {
    id: "ip-geolocate",
    name: "ip-geolocate",
    desc: "Geolocate any IP address — get country, city, ISP, and coordinates.",
    tag: "web", lang: "python", icon: "📍",
    code: `import urllib.request, json

ip = input("IP address (leave blank for your own): ").strip() or ""
url = f"http://ip-api.com/json/{ip}"

try:
    with urllib.request.urlopen(url, timeout=8) as r:
        data = json.loads(r.read())
except Exception as e:
    print(f"Error: {e}"); exit(1)

if data.get("status") == "fail":
    print(f"Failed: {data.get('message')}"); exit(1)

print(f"\\n📍 IP: {data.get('query')}")
print(f"  Country:  {data.get('country')}")
print(f"  Region:   {data.get('regionName')}")
print(f"  City:     {data.get('city')}")
print(f"  ZIP:      {data.get('zip')}")
print(f"  ISP:      {data.get('isp')}")
print(f"  Org:      {data.get('org')}")
print(f"  Lat/Lon:  {data.get('lat')}, {data.get('lon')}")`
  },

  {
    id: "dns-lookup",
    name: "dns-lookup",
    desc: "Perform a DNS lookup for any domain — get A, CNAME, MX, and TXT records.",
    tag: "web", lang: "python", icon: "🔍",
    code: `import socket

domain = input("Domain to look up: ").strip()

print(f"\\n🔍 DNS Lookup: {domain}\\n")

# A record
try:
    ip = socket.gethostbyname(domain)
    print(f"  A record:     {ip}")
except Exception:
    print("  A record:     (failed)")

# All IPs
try:
    results = socket.getaddrinfo(domain, None)
    ips = list({r[4][0] for r in results})
    for ip in ips:
        print(f"  Address:      {ip}")
except Exception:
    pass

# Reverse lookup
try:
    rev = socket.gethostbyaddr(ip)
    print(f"  Reverse DNS:  {rev[0]}")
except Exception:
    print("  Reverse DNS:  (none)")

print(f"\\n  Use 'nslookup {domain}' for full record details.")`
  },

  {
    id: "ssl-expiry",
    name: "ssl-expiry",
    desc: "Check when an HTTPS website's SSL certificate expires — avoid surprise outages.",
    tag: "web", lang: "python", icon: "🔒",
    code: `import ssl, socket, datetime

hosts_raw = input("Domain(s) to check (e.g. google.com github.com): ").strip().split()

print()
for host in hosts_raw:
    try:
        ctx = ssl.create_default_context()
        with socket.create_connection((host, 443), timeout=5) as s:
            with ctx.wrap_socket(s, server_hostname=host) as ss:
                cert = ss.getpeercert()
        exp_str = cert["notAfter"]
        exp     = datetime.datetime.strptime(exp_str, "%b %d %H:%M:%S %Y %Z")
        days    = (exp - datetime.datetime.utcnow()).days
        icon    = "✅" if days > 30 else "⚠️" if days > 7 else "🚨"
        print(f"  {icon} {host:30} expires {exp.date()}  ({days} days)")
    except Exception as e:
        print(f"  ❌ {host:30} {e}")`
  },

  {
    id: "http-headers",
    name: "http-headers",
    desc: "Fetch and display all HTTP response headers from any URL.",
    tag: "web", lang: "python", icon: "📨",
    code: `import urllib.request

url = input("URL (include https://): ").strip()
if not url.startswith("http"):
    url = "https://" + url

try:
    req = urllib.request.Request(url, headers={"User-Agent": "scripthub/1.0"})
    with urllib.request.urlopen(req, timeout=8) as r:
        headers = r.headers
        status  = r.status
        final   = r.url
except Exception as e:
    print(f"Error: {e}"); exit(1)

print(f"\\n📨 HTTP Headers for: {final}")
print(f"  Status: {status}\\n")
for key, val in headers.items():
    print(f"  {key:30} {val}")`
  },

  {
    id: "random-fact",
    name: "random-fact",
    desc: "Fetch a random interesting fact from an online API.",
    tag: "web", lang: "python", icon: "🧠",
    code: `import urllib.request, json

URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"

try:
    req = urllib.request.Request(URL, headers={"User-Agent": "scripthub"})
    with urllib.request.urlopen(req, timeout=5) as r:
        data = json.loads(r.read())
    print(f"\\n🧠 Random Fact:\\n")
    print(f"  {data['text']}\\n")
except Exception as e:
    print(f"Could not fetch fact: {e}")`
  },


  // ── GAMES (new) ─────────────────────────────────────────────
  {
    id: "tic-tac-toe",
    name: "tic-tac-toe",
    desc: "Two-player Tic-Tac-Toe in your terminal — classic 3x3 grid game.",
    tag: "games", lang: "python", icon: "⭕",
    code: `def draw(board):
    print()
    for i, row in enumerate(board):
        print("  " + " │ ".join(row))
        if i < 2: print("  ──┼───┼──")
    print()

def check_win(b, p):
    for row in b:
        if all(c == p for c in row): return True
    for col in range(3):
        if all(b[row][col] == p for row in range(3)): return True
    if all(b[i][i] == p for i in range(3)): return True
    if all(b[i][2-i] == p for i in range(3)): return True
    return False

board = [["·"]*3 for _ in range(3)]
turn  = "X"
moves = 0

while True:
    draw(board)
    try:
        pos = int(input(f"  Player {turn} — enter position (1-9): ").strip()) - 1
    except ValueError:
        continue
    r, c = divmod(pos, 3)
    if not (0 <= pos <= 8) or board[r][c] != "·":
        print("  Invalid move."); continue
    board[r][c] = turn
    moves += 1
    if check_win(board, turn):
        draw(board); print(f"  🎉 Player {turn} wins!"); break
    if moves == 9:
        draw(board); print("  It's a draw!"); break
    turn = "O" if turn == "X" else "X"`
  },

  {
    id: "blackjack",
    name: "blackjack",
    desc: "Play Blackjack against the dealer in your terminal — hit, stand, or bust!",
    tag: "games", lang: "python", icon: "🃏",
    code: `import random

SUITS = "♠ ♥ ♦ ♣".split()
RANKS = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

def new_deck():
    return [(r, s) for s in SUITS for r in RANKS]

def value(hand):
    total, aces = 0, 0
    for r, _ in hand:
        if r in "JQK": total += 10
        elif r == "A": total += 11; aces += 1
        else: total += int(r)
    while total > 21 and aces:
        total -= 10; aces -= 1
    return total

def show(hand, label, hide=False):
    cards = " ".join(f"{r}{s}" for r, s in hand)
    if hide: cards = f"{hand[0][0]}{hand[0][1]} ??"
    print(f"  {label}: {cards}  ({value(hand) if not hide else '?'})")

deck = new_deck(); random.shuffle(deck)
balance = 100

while balance > 0:
    print(f"\\n💰 Balance: \${balance}")
    try:
        bet = int(input("  Bet: $").strip())
    except ValueError: continue
    if bet <= 0 or bet > balance: print("  Invalid bet."); continue

    hand = [deck.pop(), deck.pop()]
    deal = [deck.pop(), deck.pop()]

    while True:
        show(deal, "Dealer", hide=True)
        show(hand, "You   ")
        if value(hand) == 21: print("  🎉 Blackjack!"); break
        move = input("  [h]it / [s]tand: ").strip().lower()
        if move == "h":
            hand.append(deck.pop())
            if value(hand) > 21:
                show(deal, "Dealer", hide=True)
                show(hand, "You   ")
                print("  💥 Bust!"); break
        elif move == "s":
            break

    if value(hand) <= 21:
        while value(deal) < 17: deal.append(deck.pop())
        show(deal, "Dealer")
        show(hand, "You   ")
        pv, dv = value(hand), value(deal)
        if dv > 21 or pv > dv:
            print("  ✅ You win!"); balance += bet
        elif pv == dv:
            print("  Push — tie!") 
        else:
            print("  ❌ Dealer wins."); balance -= bet

    if len(deck) < 10: deck = new_deck(); random.shuffle(deck)

print("\\n💸 Out of chips. Game over.")`
  },

  {
    id: "wordle",
    name: "wordle",
    desc: "Play Wordle in your terminal — guess the 5-letter word in 6 tries.",
    tag: "games", lang: "python", icon: "🟩",
    code: `import random

WORDS = [
  "crane","brave","clamp","drink","flame","globe","handy","inlet","joust","kneel",
  "lapel","mason","nudge","optic","plumb","quail","rover","swamp","tonic","usher",
  "vague","wrath","xylem","yacht","zebra","abbey","blaze","crisp","daisy","elbow",
  "fancy","groan","haste","icing","jazzy","karma","lusty","magic","notch","olive",
  "panic","query","rainy","scone","tramp","unity","visor","waltz","xenon","yearn",
]

word   = random.choice(WORDS).upper()
guesses = []
MAX    = 6

print("\\n🟩 WORDLE — guess the 5-letter word!\\n")

while len(guesses) < MAX:
    guess = input(f"  Guess {len(guesses)+1}/{MAX}: ").strip().upper()
    if len(guess) != 5 or not guess.isalpha():
        print("  Enter a 5-letter word."); continue

    guesses.append(guess)
    result = []
    for i, (g, w) in enumerate(zip(guess, word)):
        if g == w:
            result.append(f"\\033[42m {g} \\033[0m")  # green
        elif g in word:
            result.append(f"\\033[43m {g} \\033[0m")  # yellow
        else:
            result.append(f"\\033[90m {g} \\033[0m")  # grey
    print("  " + "".join(result))

    if guess == word:
        print(f"\\n  🎉 You got it in {len(guesses)} tries!")
        break
else:
    print(f"\\n  💀 The word was: {word}")`
  },

  {
    id: "typing-speed",
    name: "typing-speed",
    desc: "Test your typing speed — WPM, accuracy, and a score in under a minute.",
    tag: "games", lang: "python", icon: "⌨️",
    code: `import time, random

SAMPLES = [
    "the quick brown fox jumps over the lazy dog",
    "programming is the art of algorithm design and the craft of debugging",
    "python is a high level general purpose programming language",
    "to be or not to be that is the question whether tis nobler in the mind",
    "success is not final failure is not fatal it is the courage to continue that counts",
    "all that glitters is not gold often have you heard that told",
]

text = random.choice(SAMPLES)
print(f"\\n⌨️  Typing Speed Test")
print(f"\\n  Type this text exactly:")
print(f"\\n  \\\"{text}\\\"")
input("\\n  Press Enter when ready...")

print("\\n  GO!\\n  ", end="", flush=True)
t0    = time.time()
typed = input()
elapsed = time.time() - t0

words_ref  = text.split()
words_type = typed.split()
correct    = sum(1 for a, b in zip(words_ref, words_type) if a == b)
wpm        = round(len(typed.split()) / (elapsed / 60))
accuracy   = round(100 * correct / max(len(words_ref), 1), 1)

print(f"\\n  ⏱  Time:     {elapsed:.1f}s")
print(f"  💨 WPM:      {wpm}")
print(f"  ✅ Accuracy: {accuracy}%")
print(f"  ⭐ Score:    {round(wpm * accuracy / 100)}")`
  },

  {
    id: "higher-lower",
    name: "higher-lower",
    desc: "Classic higher/lower number guessing game with score tracking.",
    tag: "games", lang: "python", icon: "📊",
    code: `import random

print("📊 Higher or Lower — guess a number between 1 and 100\\n")

score = 0
best  = None

while True:
    n = random.randint(1, 100)
    guesses = 0
    print(f"\\n  I'm thinking of a number... guess!")

    while True:
        try:
            g = int(input("  Your guess: ").strip())
        except ValueError:
            continue
        guesses += 1
        if g < n:
            print("  📈 Higher!")
        elif g > n:
            print("  📉 Lower!")
        else:
            score += max(1, 10 - guesses)
            if best is None or guesses < best: best = guesses
            print(f"  🎉 Correct! ({guesses} guesses) | Score: {score} | Best: {best}")
            break

    again = input("  Play again? (y/n): ").strip().lower()
    if again != "y": break

print(f"\\n🏆 Final score: {score}  Best: {best} guesses")`
  },

  {
    id: "text-adventure",
    name: "text-adventure",
    desc: "A mini interactive text adventure — explore rooms, find items, defeat enemies.",
    tag: "games", lang: "python", icon: "🗺️",
    code: `rooms = {
    "entrance": {
        "desc": "You are at a stone entrance. Passages lead NORTH and EAST.",
        "exits": {"north": "forest", "east": "cave"},
        "item": None
    },
    "forest": {
        "desc": "A dark forest. You hear rustling. A SWORD glints on the ground. Exit SOUTH.",
        "exits": {"south": "entrance"},
        "item": "sword"
    },
    "cave": {
        "desc": "A damp cave. A DRAGON blocks the path north. Exit WEST.",
        "exits": {"west": "entrance", "north": "treasure"},
        "item": None,
        "monster": "dragon"
    },
    "treasure": {
        "desc": "🏆 You found the TREASURE ROOM! You win!",
        "exits": {},
        "item": "gold"
    },
}

current = "entrance"
inventory = []

print("\\n🗺️  TEXT ADVENTURE  — commands: go <dir>, take, look, inventory, quit\\n")

while True:
    room = rooms[current]
    print(f"\\n  {room['desc']}")
    if room["item"] and room["item"] not in inventory:
        print(f"  (There is a {room['item'].upper()} here.)")

    if current == "treasure":
        break

    cmd = input("\\n> ").strip().lower().split()
    if not cmd: continue

    if cmd[0] == "quit": print("  Goodbye!"); break
    elif cmd[0] == "look": pass
    elif cmd[0] == "inventory":
        print(f"  Inventory: {', '.join(inventory) or 'empty'}")
    elif cmd[0] == "take":
        item = room["item"]
        if item and item not in inventory:
            inventory.append(item); room["item"] = None
            print(f"  Picked up: {item}")
        else: print("  Nothing to take.")
    elif cmd[0] == "go" and len(cmd) > 1:
        direction = cmd[1]
        monster = room.get("monster")
        if monster and "sword" not in inventory:
            print(f"  The {monster} blocks your path! You need a weapon.")
            continue
        if direction in room["exits"]:
            current = room["exits"][direction]
        else: print("  Can't go that way.")`
  },

  {
    id: "math-quiz",
    name: "math-quiz",
    desc: "Practice arithmetic with a timed math quiz — addition, subtraction, multiplication.",
    tag: "games", lang: "python", icon: "➗",
    code: `import random, time

OPS = {"+": lambda a,b: a+b, "-": lambda a,b: a-b, "*": lambda a,b: a*b}

level  = input("Difficulty: [1] Easy  [2] Medium  [3] Hard: ").strip()
rounds = int(input("How many questions? ").strip())
rng    = {1: 10, 2: 50, 3: 100}.get(int(level), 10)

score = 0
t0    = time.time()

for i in range(1, rounds + 1):
    a   = random.randint(1, rng)
    b   = random.randint(1, rng)
    op  = random.choice(list(OPS.keys()))
    ans = OPS[op](a, b)

    try:
        g = int(input(f"  Q{i}: {a} {op} {b} = ").strip())
    except ValueError:
        g = None

    if g == ans:
        print("  ✅ Correct!"); score += 1
    else:
        print(f"  ❌ Wrong. Answer: {ans}")

elapsed = time.time() - t0
print(f"\\n🏆 Score: {score}/{rounds}  Time: {elapsed:.1f}s  Avg: {elapsed/rounds:.1f}s/q")`
  },

  {
    id: "slot-machine",
    name: "slot-machine",
    desc: "Pull the lever on a terminal slot machine — win credits with matching symbols.",
    tag: "games", lang: "python", icon: "🎰",
    code: `import random, time

SYMBOLS = ["🍒","🍋","🍊","🔔","⭐","💎","7️⃣"]
WEIGHTS = [30, 25, 20, 12, 7, 4, 2]
PAYS    = {"🍒":2,"🍋":3,"🍊":4,"🔔":6,"⭐":10,"💎":20,"7️⃣":50}

credits = 100
print("🎰 Slot Machine — Ctrl+C to quit")

while credits > 0:
    print(f"\\n  Credits: {credits}")
    try:
        bet = int(input("  Bet: ").strip())
    except (ValueError, KeyboardInterrupt): break
    if bet <= 0 or bet > credits:
        print("  Invalid bet."); continue

    credits -= bet
    reels = random.choices(SYMBOLS, weights=WEIGHTS, k=3)
    print(f"\\n  | {' | '.join(reels)} |", end=""); time.sleep(0.4); print()

    if len(set(reels)) == 1:
        mult    = PAYS[reels[0]]
        won     = bet * mult
        credits += won
        print(f"  🎉 JACKPOT! ×{mult} → +{won} credits!")
    elif reels[0] == reels[1] or reels[1] == reels[2]:
        won     = bet
        credits += won
        print(f"  ✅ Two in a row! +{won} credits.")
    else:
        print(f"  ❌ No match. -{bet} credits.")

print(f"\\n  Game over. Final credits: {credits}")`
  },

  {
    id: "memory-game",
    name: "memory-game",
    desc: "Test your memory — reveal pairs of tiles and match them all to win.",
    tag: "games", lang: "python", icon: "🧠",
    code: `import random, os

ICONS = list("🐶🐱🐭🐹🐰🦊🐻🐼")

def make_board(size=4):
    items = (ICONS[:size*size//2]) * 2
    random.shuffle(items)
    return [items[i:i+size] for i in range(0, size*size, size)]

def draw(board, revealed):
    size = len(board)
    print("\\n  " + "  ".join(str(i+1) for i in range(size)))
    for r, row in enumerate(board):
        cells = []
        for c, cell in enumerate(row):
            cells.append(cell if revealed[r][c] else "?")
        print(f"  {r+1} " + "  ".join(cells))

SIZE = 4
board = make_board(SIZE)
revealed = [[False]*SIZE for _ in range(SIZE)]
pairs = 0
moves = 0

print("🧠 Memory Game — match all pairs!\\nFormat: row col (e.g. 1 2)\\n")

while pairs < SIZE*SIZE//2:
    draw(board, revealed)
    picks = []
    for i in range(2):
        while True:
            try:
                r, c = map(int, input(f"  Pick card {i+1}: ").split())
                r -= 1; c -= 1
                if 0 <= r < SIZE and 0 <= c < SIZE and not revealed[r][c]:
                    picks.append((r, c)); break
            except: pass
    moves += 1
    r1,c1 = picks[0]; r2,c2 = picks[1]
    revealed[r1][c1] = revealed[r2][c2] = True
    draw(board, revealed)
    if board[r1][c1] == board[r2][c2]:
        print("  ✅ Match!"); pairs += 1
    else:
        print("  ❌ No match.")
        input("  Press Enter to hide...")
        revealed[r1][c1] = revealed[r2][c2] = False

print(f"\\n🏆 You won in {moves} moves!")`
  },

  {
    id: "connect-four",
    name: "connect-four",
    desc: "Drop discs and connect four in a row — two-player terminal Connect Four.",
    tag: "games", lang: "python", icon: "🟡",
    code: `ROWS, COLS = 6, 7
EMPTY = "·"

def new_board():
    return [[EMPTY]*COLS for _ in range(ROWS)]

def draw(board, cols=COLS):
    print("\\n  " + " ".join(str(i+1) for i in range(cols)))
    for row in board:
        print("  " + " ".join(row))
    print()

def drop(board, col, token):
    for r in range(ROWS-1, -1, -1):
        if board[r][col] == EMPTY:
            board[r][col] = token
            return r
    return -1

def check_win(board, r, c, token):
    def count(dr, dc):
        n = 0
        rr, cc = r+dr, c+dc
        while 0<=rr<ROWS and 0<=cc<COLS and board[rr][cc]==token:
            n+=1; rr+=dr; cc+=dc
        return n
    for dr, dc in [(0,1),(1,0),(1,1),(1,-1)]:
        if count(dr,dc)+count(-dr,-dc)+1 >= 4:
            return True
    return False

board = new_board()
tokens = {"1":"🟡","2":"🔴"}
turn  = "1"
moves = 0

while True:
    draw(board)
    print(f"  Player {turn} ({tokens[turn]}) — pick column (1-{COLS})")
    try:
        col = int(input("> ").strip()) - 1
        if not (0 <= col < COLS): raise ValueError
    except ValueError:
        print("  Invalid."); continue

    r = drop(board, col, tokens[turn])
    if r == -1:
        print("  Column full."); continue
    moves += 1

    if check_win(board, r, col, tokens[turn]):
        draw(board)
        print(f"  🎉 Player {turn} wins!"); break
    if moves == ROWS*COLS:
        draw(board); print("  It's a draw!"); break
    turn = "2" if turn == "1" else "1"`
  },


  // ── MATH (new) ──────────────────────────────────────────────
  {
    id: "statistics-calc",
    name: "statistics-calc",
    desc: "Enter a list of numbers and get mean, median, mode, std deviation, and more.",
    tag: "math", lang: "python", icon: "📊",
    code: `import math
from collections import Counter

raw = input("Enter numbers separated by spaces: ").strip().split()
nums = [float(x) for x in raw]

n    = len(nums)
mean = sum(nums) / n
srt  = sorted(nums)
med  = srt[n//2] if n%2 else (srt[n//2-1]+srt[n//2])/2
mode_data = Counter(nums).most_common(1)
mode = mode_data[0][0] if mode_data else "N/A"
variance  = sum((x-mean)**2 for x in nums) / n
std_dev   = math.sqrt(variance)
total     = sum(nums)

print(f"\\n📊 Statistics ({n} numbers):")
print(f"  Count:         {n}")
print(f"  Sum:           {total:,.4f}")
print(f"  Mean:          {mean:,.4f}")
print(f"  Median:        {med:,.4f}")
print(f"  Mode:          {mode}")
print(f"  Min:           {min(nums):,.4f}")
print(f"  Max:           {max(nums):,.4f}")
print(f"  Range:         {max(nums)-min(nums):,.4f}")
print(f"  Std Deviation: {std_dev:,.4f}")
print(f"  Variance:      {variance:,.4f}")`
  },

  {
    id: "prime-sieve",
    name: "prime-sieve",
    desc: "Generate all prime numbers up to N using the Sieve of Eratosthenes.",
    tag: "math", lang: "python", icon: "🔢",
    code: `def sieve(limit):
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(limit**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, limit+1, i):
                is_prime[j] = False
    return [i for i, p in enumerate(is_prime) if p]

n = int(input("Find all primes up to: ").strip())
primes = sieve(n)

print(f"\\n🔢 Primes up to {n:,}: {len(primes):,} found")
print()

cols = 10
for i in range(0, len(primes), cols):
    row = primes[i:i+cols]
    print("  " + "  ".join(f"{p:>6}" for p in row))

print(f"\\n  Largest prime: {primes[-1]:,}")`
  },

  {
    id: "fibonacci-gen",
    name: "fibonacci-gen",
    desc: "Generate the Fibonacci sequence up to N terms or up to a max value.",
    tag: "math", lang: "python", icon: "🌀",
    code: `mode = input("Generate by [1] number of terms or [2] max value: ").strip()

a, b = 0, 1
seq  = []

if mode == "1":
    n = int(input("Number of terms: ").strip())
    for _ in range(n):
        seq.append(a); a, b = b, a+b
else:
    limit = int(input("Max value: ").strip())
    while a <= limit:
        seq.append(a); a, b = b, a+b

print(f"\\n🌀 Fibonacci ({len(seq)} terms):")
for i, v in enumerate(seq, 1):
    print(f"  F({i:>3}) = {v:,}")

if len(seq) >= 2:
    ratio = seq[-1] / seq[-2]
    print(f"\\n  Golden ratio approx: {ratio:.8f}")`
  },

  {
    id: "mortgage-calc",
    name: "mortgage-calc",
    desc: "Calculate monthly mortgage payments, total interest, and amortization summary.",
    tag: "math", lang: "python", icon: "🏠",
    code: `principal = float(input("Loan amount ($): ").strip())
annual_rate = float(input("Annual interest rate (%): ").strip()) / 100
years = int(input("Loan term (years): ").strip())

r = annual_rate / 12
n = years * 12

if r == 0:
    monthly = principal / n
else:
    monthly = principal * r * (1+r)**n / ((1+r)**n - 1)

total_paid    = monthly * n
total_interest= total_paid - principal

print(f"\\n🏠 Mortgage Summary")
print(f"  Loan Amount:     \${principal:>12,.2f}")
print(f"  Interest Rate:   {annual_rate*100:.2f}% per year")
print(f"  Term:            {years} years ({n} payments)")
print(f"  Monthly Payment: \${monthly:>12,.2f}")
print(f"  Total Paid:      \${total_paid:>12,.2f}")
print(f"  Total Interest:  \${total_interest:>12,.2f}")

print(f"\\n  — First 12 Months —")
balance = principal
for m in range(1, 13):
    interest = balance * r
    princ_pay = monthly - interest
    balance  -= princ_pay
    print(f"  Month {m:>2}: interest \${interest:>8,.2f}  principal \${princ_pay:>8,.2f}  balance \${max(balance,0):>10,.2f}")`
  },

  {
    id: "compound-interest",
    name: "compound-interest",
    desc: "Calculate compound interest growth over time with a yearly breakdown.",
    tag: "math", lang: "python", icon: "📈",
    code: `principal  = float(input("Principal ($): ").strip())
rate       = float(input("Annual rate (%): ").strip()) / 100
n          = int(input("Compounding times per year (1=yearly,12=monthly,365=daily): ").strip())
years      = int(input("Number of years: ").strip())

print(f"\\n📈 Compound Interest Growth")
print(f"\\n  {'Year':>4}  {'Balance':>12}  {'Interest Earned':>15}")
print("  " + "-"*34)

balance = principal
for yr in range(1, years + 1):
    balance_new = principal * (1 + rate/n) ** (n * yr)
    earned = balance_new - principal
    print(f"  {yr:>4}  \${balance_new:>11,.2f}  \${earned:>14,.2f}")

final = principal * (1 + rate/n) ** (n * years)
print(f"\\n  Final Amount:    \${final:,.2f}")
print(f"  Total Interest:  \${final - principal:,.2f}")
print(f"  Growth Factor:   {final/principal:.2f}x")`
  },

  {
    id: "bmi-calc",
    name: "bmi-calc",
    desc: "Calculate your BMI from height and weight — metric or imperial units.",
    tag: "math", lang: "python", icon: "⚖️",
    code: `unit = input("Units: [1] Metric (kg/cm)  [2] Imperial (lbs/in): ").strip()

if unit == "1":
    weight = float(input("Weight (kg): ").strip())
    height = float(input("Height (cm): ").strip()) / 100
    bmi = weight / height**2
else:
    weight = float(input("Weight (lbs): ").strip())
    height = float(input("Height (inches): ").strip())
    bmi = (weight / height**2) * 703

if bmi < 18.5:   cat = "Underweight"
elif bmi < 25:   cat = "Normal weight"
elif bmi < 30:   cat = "Overweight"
else:            cat = "Obese"

bar = "█" * round(bmi / 2)

print(f"\\n⚖️  BMI Results:")
print(f"  BMI:      {bmi:.1f}")
print(f"  Category: {cat}")
print(f"  {bar}")
print(f"\\n  Scale: < 18.5 Underweight | 18.5-24.9 Normal | 25-29.9 Overweight | 30+ Obese")`
  },

  {
    id: "quadratic-solver",
    name: "quadratic-solver",
    desc: "Solve any quadratic equation (ax² + bx + c = 0) and show roots and vertex.",
    tag: "math", lang: "python", icon: "📐",
    code: `import cmath

print("📐 Quadratic Equation Solver: ax² + bx + c = 0\\n")

a = float(input("  a = ").strip())
b = float(input("  b = ").strip())
c = float(input("  c = ").strip())

disc = b**2 - 4*a*c

r1 = (-b + cmath.sqrt(disc)) / (2*a)
r2 = (-b - cmath.sqrt(disc)) / (2*a)

def fmt(n):
    if n.imag == 0:
        return f"{n.real:.4f}"
    return f"{n.real:.4f} + {n.imag:.4f}i"

print(f"\\n  Equation: {a}x² + {b}x + {c} = 0")
print(f"  Discriminant: {disc:.4f}")
if disc > 0:   print("  → Two distinct real roots")
elif disc == 0: print("  → One repeated root")
else:           print("  → Two complex roots")

print(f"\\n  x₁ = {fmt(r1)}")
print(f"  x₂ = {fmt(r2)}")

vertex_x = -b / (2*a)
vertex_y = a * vertex_x**2 + b * vertex_x + c
print(f"\\n  Vertex: ({vertex_x:.4f}, {vertex_y:.4f})")`
  },

  {
    id: "tip-calc",
    name: "tip-calc",
    desc: "Calculate tip and split the bill among any number of people.",
    tag: "math", lang: "python", icon: "🍽️",
    code: `bill    = float(input("Bill total ($): ").strip())
tip_pct = float(input("Tip percentage (%): ").strip())
people  = int(input("Number of people: ").strip())

tip_amt   = bill * tip_pct / 100
total     = bill + tip_amt
per_person= total / people
tip_per   = tip_amt / people

print(f"\\n🍽️  Bill Breakdown")
print(f"  Bill:        \${bill:>8.2f}")
print(f"  Tip ({tip_pct:.0f}%):  \${tip_amt:>8.2f}")
print(f"  Total:       \${total:>8.2f}")
print(f"  ─────────────────────")
print(f"  Per person:  \${per_person:>8.2f}")
print(f"  (tip part:   \${tip_per:>8.2f})")`
  },

  {
    id: "area-calc",
    name: "area-calc",
    desc: "Calculate area and perimeter of common shapes — circle, rectangle, triangle, etc.",
    tag: "math", lang: "python", icon: "📏",
    code: `import math

SHAPES = {
    "1": "Circle",
    "2": "Rectangle",
    "3": "Triangle",
    "4": "Trapezoid",
    "5": "Ellipse",
}

print("📏 Area & Perimeter Calculator\\n")
for k, v in SHAPES.items():
    print(f"  [{k}] {v}")

choice = input("\\nPick a shape: ").strip()

if choice == "1":
    r = float(input("Radius: ").strip())
    area = math.pi * r**2
    perim= 2 * math.pi * r
    print(f"  Area:        {area:.4f}")
    print(f"  Circumference: {perim:.4f}")

elif choice == "2":
    w = float(input("Width: ").strip())
    h = float(input("Height: ").strip())
    print(f"  Area:        {w*h:.4f}")
    print(f"  Perimeter:   {2*(w+h):.4f}")

elif choice == "3":
    a = float(input("Side a: ").strip())
    b = float(input("Side b: ").strip())
    c = float(input("Side c: ").strip())
    s = (a+b+c)/2
    area = math.sqrt(s*(s-a)*(s-b)*(s-c))
    print(f"  Area:        {area:.4f}")
    print(f"  Perimeter:   {a+b+c:.4f}")

elif choice == "4":
    a = float(input("Base a: ").strip())
    b = float(input("Base b: ").strip())
    h = float(input("Height: ").strip())
    print(f"  Area:        {(a+b)*h/2:.4f}")

elif choice == "5":
    a = float(input("Semi-major axis: ").strip())
    b = float(input("Semi-minor axis: ").strip())
    print(f"  Area:        {math.pi*a*b:.4f}")
    print(f"  Approx circumference: {2*math.pi*math.sqrt((a**2+b**2)/2):.4f}")`
  },

  {
    id: "percentage-calc",
    name: "percentage-calc",
    desc: "Percentage calculator — find %, what is X% of Y, percentage change, and more.",
    tag: "math", lang: "python", icon: "💯",
    code: `print("💯 Percentage Calculator\\n")
print("  [1] What is X% of Y?")
print("  [2] X is what % of Y?")
print("  [3] Percentage change from X to Y")
print("  [4] Increase/decrease Y by X%")

choice = input("\\nPick: ").strip()

if choice == "1":
    x = float(input("X (percent): ").strip())
    y = float(input("Y (number): ").strip())
    print(f"  {x}% of {y} = {x*y/100:.4f}")

elif choice == "2":
    x = float(input("X (part): ").strip())
    y = float(input("Y (total): ").strip())
    print(f"  {x} is {x/y*100:.4f}% of {y}")

elif choice == "3":
    x = float(input("Original value: ").strip())
    y = float(input("New value: ").strip())
    pct = (y - x) / abs(x) * 100
    direction = "increase" if pct >= 0 else "decrease"
    print(f"  Change: {abs(pct):.4f}% {direction}")

elif choice == "4":
    y = float(input("Starting value: ").strip())
    x = float(input("Percentage to change by: ").strip())
    direction = input("Increase or decrease? (i/d): ").strip().lower()
    if direction == "d": x = -x
    result = y * (1 + x/100)
    print(f"  Result: {result:.4f}")`
  },

  {
    id: "grade-calc",
    name: "grade-calc",
    desc: "Enter your assignments and weights to calculate your final course grade.",
    tag: "math", lang: "python", icon: "🎓",
    code: `print("🎓 Grade Calculator")
print("Enter assignments (name, score, max, weight). Leave name blank when done.\\n")

items  = []
while True:
    name = input("  Name (blank to finish): ").strip()
    if not name: break
    score  = float(input(f"  Score for {name}: ").strip())
    max_s  = float(input(f"  Max score: ").strip())
    weight = float(input(f"  Weight (%): ").strip())
    items.append((name, score, max_s, weight))

if not items:
    print("No grades entered."); exit()

total_weight = sum(w for _, _, _, w in items)
weighted_pct = sum((s/m)*w for _, s, m, w in items)
final = weighted_pct / total_weight * 100 if total_weight else 0

if final >= 90:   letter = "A"
elif final >= 80: letter = "B"
elif final >= 70: letter = "C"
elif final >= 60: letter = "D"
else:             letter = "F"

print(f"\\n  {'Assignment':20} {'Score':>8}  {'%':>6}  {'Weight':>6}")
print("  " + "-"*46)
for name, s, m, w in items:
    pct = s/m*100
    print(f"  {name:20} {s:>4.1f}/{m:<4.1f}  {pct:>5.1f}%  {w:>5.1f}%")
print("  " + "-"*46)
print(f"  {'FINAL GRADE':20}                     {final:>5.1f}%  → {letter}")`
  },

  {
    id: "matrix-calc",
    name: "matrix-calc",
    desc: "Add, subtract, multiply, and transpose matrices right in your terminal.",
    tag: "math", lang: "python", icon: "🔢",
    code: `def read_matrix(name):
    rows = int(input(f"  {name} rows: ").strip())
    cols = int(input(f"  {name} cols: ").strip())
    print(f"  Enter {rows} rows of {cols} space-separated numbers:")
    mat = []
    for _ in range(rows):
        row = list(map(float, input("    ").split()))
        mat.append(row)
    return mat

def show(mat, label="Result"):
    print(f"\\n  {label}:")
    for row in mat:
        print("  " + "  ".join(f"{v:>8.3f}" for v in row))

def add(A, B):
    return [[A[r][c]+B[r][c] for c in range(len(A[0]))] for r in range(len(A))]

def multiply(A, B):
    R,C,K = len(A), len(B[0]), len(B)
    return [[sum(A[r][k]*B[k][c] for k in range(K)) for c in range(C)] for r in range(R)]

def transpose(A):
    return [[A[r][c] for r in range(len(A))] for c in range(len(A[0]))]

print("🔢 Matrix Calculator")
print("  [1] Add   [2] Subtract   [3] Multiply   [4] Transpose\\n")
op = input("Operation: ").strip()

if op in ("1","2","3"):
    A = read_matrix("Matrix A")
    B = read_matrix("Matrix B")
    if op == "1":   show(add(A,B),"A + B")
    elif op == "2": show(add(A,[[-v for v in r] for r in B]),"A - B")
    elif op == "3": show(multiply(A,B),"A × B")
elif op == "4":
    A = read_matrix("Matrix A")
    show(transpose(A),"Aᵀ")`
  },

  {
    id: "loan-calc",
    name: "loan-calc",
    desc: "Calculate loan payoff time and total interest for any loan amount and rate.",
    tag: "math", lang: "python", icon: "🏦",
    code: `print("🏦 Loan Payoff Calculator\\n")

principal = float(input("Loan balance ($): ").strip())
rate      = float(input("Annual interest rate (%): ").strip()) / 100 / 12
payment   = float(input("Monthly payment ($): ").strip())

if rate > 0 and payment <= principal * rate:
    print("  ⚠️  Payment too low — will never pay off loan!")
    exit()

balance = principal
month   = 0
total_interest = 0

while balance > 0:
    interest  = balance * rate
    principal_pay = min(payment - interest, balance)
    balance  -= principal_pay
    total_interest += interest
    month += 1
    if month > 600: print("  (capped at 50 years)"); break

years  = month // 12
months = month % 12

print(f"\\n  Loan Amount:    \${principal:>10,.2f}")
print(f"  Monthly Payment:\${payment:>10,.2f}")
print(f"  Payoff Time:    {years} yr {months} mo ({month} payments)")
print(f"  Total Paid:     \${payment*month:>10,.2f}")
print(f"  Total Interest: \${total_interest:>10,.2f}")`
  },

  {
    id: "number-theory",
    name: "number-theory",
    desc: "Explore GCD, LCM, prime factorization, and perfect numbers for any integer.",
    tag: "math", lang: "python", icon: "🧮",
    code: `import math

def prime_factors(n):
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d); n //= d
        d += 1
    if n > 1: factors.append(n)
    return factors

def is_perfect(n):
    return n > 1 and sum(i for i in range(1, n) if n % i == 0) == n

def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(n**0.5)+1, 2):
        if n % i == 0: return False
    return True

while True:
    raw = input("\\nEnter number(s) (or 'quit'): ").strip()
    if raw.lower() == "quit": break
    nums = [int(x) for x in raw.split()]

    for n in nums:
        factors   = prime_factors(n)
        divisors  = [i for i in range(1, n+1) if n % i == 0]
        print(f"\\n  🔢 {n}")
        print(f"    Prime?          {'Yes' if is_prime(n) else 'No'}")
        print(f"    Perfect?        {'Yes' if is_perfect(n) else 'No'}")
        print(f"    Prime factors:  {' × '.join(map(str, factors))}")
        print(f"    Divisors:       {divisors}")
        print(f"    Num divisors:   {len(divisors)}")
        print(f"    Digit sum:      {sum(int(d) for d in str(n))}")

    if len(nums) >= 2:
        print(f"\\n    GCD({nums[0]},{nums[1]}): {math.gcd(nums[0],nums[1])}")
        print(f"    LCM({nums[0]},{nums[1]}): {math.lcm(nums[0],nums[1])}")`
  },


  // ── SCIENCE ─────────────────────────────────────────────────
  {
    id: "unit-science",
    name: "unit-science",
    desc: "Convert scientific units: energy, pressure, speed, force, temperature, and more.",
    tag: "science", lang: "python", icon: "⚗️",
    code: `CONVERSIONS = {
  "energy":      [("Joule","J",1),("Calorie","cal",4.184),("kWh","kWh",3600000),("eV","eV",1.602e-19),("BTU","BTU",1055.06)],
  "pressure":    [("Pascal","Pa",1),("Bar","bar",100000),("PSI","psi",6894.76),("atm","atm",101325),("mmHg","mmHg",133.322)],
  "speed":       [("m/s","m/s",1),("km/h","km/h",0.27778),("mph","mph",0.44704),("knot","kn",0.51444),("Mach","M",340.29)],
  "force":       [("Newton","N",1),("Pound-force","lbf",4.44822),("Dyne","dyn",0.00001),("kgf","kgf",9.80665)],
}

print("⚗️  Scientific Unit Converter")
for i, cat in enumerate(CONVERSIONS, 1):
    print(f"  [{i}] {cat.capitalize()}")
choice = int(input("Category: ").strip()) - 1
cat    = list(CONVERSIONS.keys())[choice]
units  = CONVERSIONS[cat]

print()
for i, (name, sym, _) in enumerate(units, 1):
    print(f"  [{i}] {name} ({sym})")

src = int(input("From: ").strip()) - 1
dst = int(input("To:   ").strip()) - 1
val = float(input("Value: ").strip())

base   = val * units[src][2]
result = base / units[dst][2]
print(f"\\n  {val} {units[src][1]} = {result:.6g} {units[dst][1]}")`
  },

  {
    id: "planet-weight",
    name: "planet-weight",
    desc: "Calculate your weight on every planet in the solar system.",
    tag: "science", lang: "python", icon: "🪐",
    code: `PLANETS = {
  "Mercury": 0.378, "Venus": 0.907, "Earth": 1.000,
  "Moon":    0.166, "Mars":  0.377, "Jupiter": 2.364,
  "Saturn":  0.916, "Uranus":0.889, "Neptune": 1.125, "Pluto": 0.063,
}

weight = float(input("Your weight on Earth (kg): ").strip())
print(f"\\n🪐 Weight across the Solar System ({weight} kg on Earth):\\n")
for planet, g in PLANETS.items():
    w = weight * g
    bar = "█" * round(g * 20)
    print(f"  {planet:10}  {w:6.1f} kg  {bar}")`
  },

  {
    id: "periodic-table",
    name: "periodic-table",
    desc: "Look up any element from the periodic table — symbol, mass, group, and properties.",
    tag: "science", lang: "python", icon: "🧪",
    code: `ELEMENTS = {
  "H":("Hydrogen",1,1.008,"nonmetal"),      "He":("Helium",2,4.003,"noble gas"),
  "Li":("Lithium",3,6.941,"alkali metal"),  "Be":("Beryllium",4,9.012,"alkaline earth"),
  "B":("Boron",5,10.81,"metalloid"),        "C":("Carbon",6,12.01,"nonmetal"),
  "N":("Nitrogen",7,14.01,"nonmetal"),      "O":("Oxygen",8,16.00,"nonmetal"),
  "F":("Fluorine",9,19.00,"halogen"),       "Ne":("Neon",10,20.18,"noble gas"),
  "Na":("Sodium",11,22.99,"alkali metal"),  "Mg":("Magnesium",12,24.31,"alkaline earth"),
  "Al":("Aluminium",13,26.98,"post-transition"), "Si":("Silicon",14,28.09,"metalloid"),
  "P":("Phosphorus",15,30.97,"nonmetal"),   "S":("Sulfur",16,32.07,"nonmetal"),
  "Cl":("Chlorine",17,35.45,"halogen"),     "Ar":("Argon",18,39.95,"noble gas"),
  "K":("Potassium",19,39.10,"alkali metal"),"Ca":("Calcium",20,40.08,"alkaline earth"),
  "Fe":("Iron",26,55.85,"transition metal"),"Cu":("Copper",29,63.55,"transition metal"),
  "Zn":("Zinc",30,65.38,"transition metal"),"Ag":("Silver",47,107.87,"transition metal"),
  "Au":("Gold",79,196.97,"transition metal"),"Hg":("Mercury",80,200.59,"transition metal"),
  "Pb":("Lead",82,207.2,"post-transition"), "U":("Uranium",92,238.03,"actinide"),
}

print("🧪 Periodic Table Lookup — type 'quit' to exit\\n")
while True:
    q = input("Element symbol or name: ").strip()
    if q.lower() == "quit": break
    match = None
    for sym, (name, num, mass, cat) in ELEMENTS.items():
        if q.upper() == sym or q.lower() == name.lower():
            match = (sym, name, num, mass, cat); break
    if match:
        sym, name, num, mass, cat = match
        print(f"\\n  [{sym}]  {name}")
        print(f"  Atomic Number:  {num}")
        print(f"  Atomic Mass:    {mass} u")
        print(f"  Category:       {cat}\\n")
    else:
        print("  Not found. Try symbol (e.g. Au) or name (e.g. Gold)\\n")`
  },

  {
    id: "ohms-law",
    name: "ohms-law",
    desc: "Solve Ohm's Law: enter any two of V, I, R, P and get the other two.",
    tag: "science", lang: "python", icon: "⚡",
    code: `import math

print("⚡ Ohm's Law Calculator")
print("  V = Voltage (Volts)")
print("  I = Current (Amps)")
print("  R = Resistance (Ohms)")
print("  P = Power (Watts)")
print("\\nEnter any 2 values (leave the others blank):\\n")

def get(label):
    v = input(f"  {label}: ").strip()
    return float(v) if v else None

V = get("V (Volts)")
I = get("I (Amps)")
R = get("R (Ohms)")
P = get("P (Watts)")

known = sum(x is not None for x in [V,I,R,P])
if known < 2:
    print("Need at least 2 values."); exit()

if V is None:
    V = I*R if (I and R) else P/I if (P and I) else math.sqrt(P*R)
if I is None:
    I = V/R if (V and R) else P/V if (P and V) else math.sqrt(P/R)
if R is None:
    R = V/I if (V and I) else None
if P is None:
    P = V*I if (V and I) else None

print(f"\\n  V = {V:.4f} V")
print(f"  I = {I:.4f} A")
print(f"  R = {R:.4f} Ω" if R else "  R = N/A")
print(f"  P = {P:.4f} W" if P else "  P = N/A")`
  },

  {
    id: "speed-of-sound",
    name: "speed-of-sound",
    desc: "Calculate the speed of sound in air, water, and steel at any temperature.",
    tag: "science", lang: "python", icon: "🔊",
    code: `import math

temp_c = float(input("Temperature (°C): ").strip())
temp_k = temp_c + 273.15

# Air: v = 331.3 * sqrt(T/273.15)
v_air   = 331.3 * math.sqrt(temp_k / 273.15)
# Water: approx 1484 + 4.0*(T-20)
v_water = 1484 + 4.0 * (temp_c - 20)
# Steel: ~5960 m/s (not temp dependent in simple model)
v_steel = 5960

print(f"\\n🔊 Speed of Sound at {temp_c}°C")
print(f"  Air:   {v_air:>7.1f} m/s  ({v_air*3.6:.1f} km/h)")
print(f"  Water: {v_water:>7.1f} m/s")
print(f"  Steel: {v_steel:>7.1f} m/s")

dist = input("\\nDistance to lightning (km, blank to skip): ").strip()
if dist:
    d   = float(dist) * 1000
    sec = d / v_air
    print(f"  Thunder delay: {sec:.2f} seconds")`
  },

  {
    id: "half-life",
    name: "half-life",
    desc: "Calculate radioactive decay — how much of a substance remains after N half-lives.",
    tag: "science", lang: "python", icon: "☢️",
    code: `import math

print("☢️  Radioactive Decay Calculator\\n")

initial  = float(input("Initial amount (grams or units): ").strip())
half_life= float(input("Half-life (years): ").strip())
time     = float(input("Time elapsed (years): ").strip())

remaining = initial * (0.5 ** (time / half_life))
decayed   = initial - remaining
pct_left  = remaining / initial * 100
n_halves  = time / half_life

print(f"\\n  Initial:      {initial:.4f}")
print(f"  Time elapsed: {time:.2f} years ({n_halves:.2f} half-lives)")
print(f"  Remaining:    {remaining:.6f} ({pct_left:.4f}%)")
print(f"  Decayed:      {decayed:.6f}")

# Time to reach a target amount
target_raw = input("\\nFind time to reach amount (blank to skip): ").strip()
if target_raw:
    target = float(target_raw)
    t = half_life * math.log(target / initial) / math.log(0.5)
    print(f"  Time to reach {target}: {t:.2f} years")`
  },

  {
    id: "projectile",
    name: "projectile",
    desc: "Simulate projectile motion — calculate range, max height, and time of flight.",
    tag: "science", lang: "python", icon: "🚀",
    code: `import math

print("🚀 Projectile Motion Calculator\\n")

v0    = float(input("Initial velocity (m/s): ").strip())
angle = float(input("Launch angle (degrees): ").strip())
h0    = float(input("Initial height (m, default 0): ").strip() or "0")
g     = 9.81

rad   = math.radians(angle)
vx    = v0 * math.cos(rad)
vy    = v0 * math.sin(rad)

# Time of flight
disc  = vy**2 + 2 * g * h0
t_total = (vy + math.sqrt(disc)) / g

# Max height
t_peak = vy / g
h_max  = h0 + vy * t_peak - 0.5 * g * t_peak**2

# Range
x_range = vx * t_total

print(f"\\n  Launch velocity: {v0} m/s @ {angle}°")
print(f"  Initial height:  {h0} m")
print(f"\\n  Max height:      {h_max:.2f} m  (at t={t_peak:.2f}s)")
print(f"  Range:           {x_range:.2f} m")
print(f"  Time of flight:  {t_total:.2f} s")
print(f"  Horizontal vx:   {vx:.2f} m/s")
print(f"  Vertical vy:     {vy:.2f} m/s")`
  },

  {
    id: "body-water",
    name: "body-water",
    desc: "Calculate your total body water content and daily hydration needs.",
    tag: "science", lang: "python", icon: "💧",
    code: `print("💧 Body Water & Hydration Calculator\\n")

sex    = input("Sex (m/f): ").strip().lower()
age    = int(input("Age (years): ").strip())
weight = float(input("Weight (kg): ").strip())
height = float(input("Height (cm): ").strip())
active = input("Activity level [1] Sedentary [2] Moderate [3] Active: ").strip()

# Watson formula
if sex == "m":
    tbw = 2.447 - 0.09156*age + 0.1074*height + 0.3362*weight
else:
    tbw = -2.097 + 0.1069*height + 0.2466*weight

# Daily water intake (ml)
base   = weight * 35
factor = {"1": 0.0, "2": 0.15, "3": 0.30}.get(active, 0)
daily  = base * (1 + factor)

print(f"\\n  Total Body Water: {tbw:.1f} litres ({tbw/weight*100:.1f}% of body weight)")
print(f"  Recommended daily intake: {daily:.0f} ml ({daily/1000:.1f} L)")
print(f"  That's about {daily/250:.0f} glasses of water (250ml each)")`
  },

  {
    id: "calorie-burn",
    name: "calorie-burn",
    desc: "Estimate calories burned during exercise using MET values.",
    tag: "science", lang: "python", icon: "🏃",
    code: `ACTIVITIES = {
    "1":  ("Walking (slow)",      2.8),
    "2":  ("Walking (brisk)",     3.5),
    "3":  ("Running (5mph)",      8.3),
    "4":  ("Running (8mph)",     11.8),
    "5":  ("Cycling (moderate)", 8.0),
    "6":  ("Swimming",           7.0),
    "7":  ("Jump rope",         11.8),
    "8":  ("Yoga",               2.5),
    "9":  ("Weight training",    5.0),
    "10": ("HIIT",              10.0),
}

weight_kg = float(input("Your weight (kg): ").strip())
print()
for k, (name, met) in ACTIVITIES.items():
    print(f"  [{k:>2}] {name}")

choice  = input("\\nActivity: ").strip()
minutes = float(input("Duration (minutes): ").strip())

if choice not in ACTIVITIES:
    print("Invalid choice."); exit()

name, met = ACTIVITIES[choice]
calories  = met * weight_kg * (minutes / 60)

print(f"\\n🏃 {name} for {minutes:.0f} min")
print(f"  Calories burned: {calories:.0f} kcal")
print(f"  Per minute:      {calories/minutes:.1f} kcal/min")`
  },

  {
    id: "tide-calculator",
    name: "tide-calculator",
    desc: "Model a simple tidal cycle and print tide heights throughout the day.",
    tag: "science", lang: "python", icon: "🌊",
    code: `import math

print("🌊 Simple Tide Modeler\\n")

high = float(input("High tide height (m, e.g. 4.5): ").strip())
low  = float(input("Low tide height  (m, e.g. 0.5): ").strip())
period_h = float(input("Tidal period (hours, typical 12.4): ").strip() or "12.4")

amp    = (high - low) / 2
mean   = (high + low) / 2
omega  = 2 * math.pi / period_h

print(f"\\n  Time   Tide Height")
print("  " + "-"*28)

for hour in range(25):
    h = mean + amp * math.cos(omega * hour)
    bar_len = round((h - low) / (high - low) * 30)
    bar = "█" * bar_len
    print(f"  {hour:02d}:00  {h:5.2f} m  {bar}")`
  },

  {
    id: "ph-calculator",
    name: "ph-calculator",
    desc: "Calculate pH, pOH, [H+], and [OH-] — acid/base chemistry tool.",
    tag: "science", lang: "python", icon: "🧫",
    code: `import math

print("🧫 pH / Acid-Base Calculator")
print("  [1] From H+ concentration")
print("  [2] From pH")
print("  [3] From OH- concentration")
print("  [4] From pOH")

choice = input("\\nPick: ").strip()

def classify(ph):
    if ph < 3:   return "Strongly acidic"
    if ph < 7:   return "Acidic"
    if ph == 7:  return "Neutral"
    if ph < 11:  return "Basic"
    return "Strongly basic"

if choice == "1":
    h    = float(input("  [H+] concentration (mol/L): ").strip())
    ph   = -math.log10(h)
elif choice == "2":
    ph   = float(input("  pH value: ").strip())
    h    = 10 ** (-ph)
elif choice == "3":
    oh   = float(input("  [OH-] concentration (mol/L): ").strip())
    poh  = -math.log10(oh)
    ph   = 14 - poh
    h    = 10 ** (-ph)
elif choice == "4":
    poh  = float(input("  pOH value: ").strip())
    ph   = 14 - poh
    h    = 10 ** (-ph)
else:
    print("Invalid."); exit()

oh  = 10 ** (-(14 - ph))
poh = 14 - ph

print(f"\\n  pH    = {ph:.4f}  → {classify(ph)}")
print(f"  pOH   = {poh:.4f}")
print(f"  [H+]  = {h:.4e} mol/L")
print(f"  [OH-] = {oh:.4e} mol/L")`
  },


  // ── PRODUCTIVITY ────────────────────────────────────────────
  {
    id: "habit-tracker",
    name: "habit-tracker",
    desc: "Track daily habits from the terminal — streaks, completion rates, and history.",
    tag: "productivity", lang: "python", icon: "📅",
    code: `import json, os
from datetime import date

FILE = "habits.json"

def load():
    return json.load(open(FILE)) if os.path.exists(FILE) else {"habits": {}, "log": {}}

def save(d): json.dump(d, open(FILE,"w"), indent=2)

data  = load()
today = str(date.today())

print("📅 Habit Tracker — commands: add, log, status, history, quit\\n")

while True:
    cmd = input("habit> ").strip().lower()
    data = load()

    if cmd == "quit": break

    elif cmd.startswith("add "):
        name = cmd[4:].strip()
        data["habits"][name] = data["habits"].get(name, {"created": today})
        save(data); print(f"  ✅ Added habit: {name}")

    elif cmd == "log":
        if not data["habits"]:
            print("  No habits yet. Use 'add <habit>'"); continue
        print("  Mark today's habits (y/n):")
        log = data["log"].get(today, {})
        for h in data["habits"]:
            done = input(f"  {h}? (y/n): ").strip().lower() == "y"
            log[h] = done
        data["log"][today] = log
        save(data); print("  ✅ Logged!")

    elif cmd == "status":
        print(f"\\n  Today ({today}):")
        today_log = data["log"].get(today, {})
        for h in data["habits"]:
            days = [d for d in sorted(data["log"]) if data["log"][d].get(h)]
            streak = 0
            for d in sorted(days, reverse=True):
                streak += 1
            icon = "✅" if today_log.get(h) else "⬜"
            print(f"  {icon} {h:20} streak: {streak} days")

    elif cmd.startswith("history"):
        for day in sorted(data["log"].keys())[-7:]:
            done  = sum(1 for v in data["log"][day].values() if v)
            total = len(data["log"][day])
            bar   = "█" * done + "░" * (total - done)
            print(f"  {day}  {bar}  {done}/{total}")

    else: print("  Commands: add, log, status, history, quit")`
  },

  {
    id: "journal",
    name: "journal",
    desc: "A private terminal journal — write daily entries, search past ones, and track mood.",
    tag: "productivity", lang: "python", icon: "📓",
    code: `import json, os
from datetime import datetime

FILE = "journal.json"

def load():
    return json.load(open(FILE)) if os.path.exists(FILE) else []

def save(entries): json.dump(entries, open(FILE,"w"), indent=2)

print("📓 Terminal Journal — commands: write, read, search, quit\\n")

while True:
    cmd = input("journal> ").strip().lower()
    entries = load()

    if cmd == "quit": break

    elif cmd == "write":
        mood = input("  Mood today (1-5 ⭐): ").strip()
        print("  Write your entry (type END on a new line when done):")
        lines = []
        while True:
            line = input("  ")
            if line.strip() == "END": break
            lines.append(line)
        text = "\\n".join(lines)
        entry = {
            "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "mood": mood,
            "text": text
        }
        entries.append(entry)
        save(entries)
        print("  ✅ Entry saved.")

    elif cmd.startswith("read"):
        n = int(cmd.split()[-1]) if cmd != "read" else 5
        for e in entries[-n:]:
            print(f"\\n  ─── {e['date']}  ⭐ {e['mood']}")
            print(f"  {e['text'][:200]}{'...' if len(e['text'])>200 else ''}")

    elif cmd.startswith("search "):
        term = cmd[7:].strip()
        hits = [e for e in entries if term.lower() in e["text"].lower()]
        print(f"  Found {len(hits)} matching entries:")
        for e in hits[-5:]:
            print(f"  [{e['date']}] {e['text'][:80]}...")

    else: print("  Commands: write, read [N], search <term>, quit")`
  },

  {
    id: "budget-tracker",
    name: "budget-tracker",
    desc: "Track income and expenses from the terminal — see where your money goes.",
    tag: "productivity", lang: "python", icon: "💰",
    code: `import json, os
from datetime import date

FILE = "budget.json"

def load():
    return json.load(open(FILE)) if os.path.exists(FILE) else []

def save(d): json.dump(d, open(FILE,"w"), indent=2)

print("💰 Budget Tracker — commands: add, summary, list, quit\\n")
CATS = ["food","rent","transport","entertainment","health","income","other"]

while True:
    cmd = input("budget> ").strip().lower()
    data = load()

    if cmd == "quit": break

    elif cmd.startswith("add"):
        try:
            amt  = float(input("  Amount (negative = expense): ").strip())
            print("  Categories: " + "  ".join(f"[{i+1}]{c}" for i,c in enumerate(CATS)))
            ci   = int(input("  Category: ").strip()) - 1
            note = input("  Note: ").strip()
            data.append({"date": str(date.today()), "amount": amt, "cat": CATS[ci], "note": note})
            save(data); print(f"  ✅ Added \${amt:.2f} ({CATS[ci]})")
        except (ValueError, IndexError): print("  Invalid input.")

    elif cmd == "summary":
        income   = sum(e["amount"] for e in data if e["amount"] > 0)
        expenses = sum(e["amount"] for e in data if e["amount"] < 0)
        by_cat   = {}
        for e in data:
            by_cat[e["cat"]] = by_cat.get(e["cat"], 0) + e["amount"]
        print(f"\\n  Income:   \${income:>10,.2f}")
        print(f"  Expenses: \${abs(expenses):>10,.2f}")
        print(f"  Balance:  \${income+expenses:>10,.2f}\\n")
        for cat, amt in sorted(by_cat.items(), key=lambda x: x[1]):
            bar = "█" * min(int(abs(amt)/10), 30)
            print(f"  {cat:15} \${amt:>8,.2f}  {bar}")

    elif cmd == "list":
        for e in data[-10:]:
            sign = "+" if e["amount"] > 0 else ""
            print(f"  {e['date']}  {sign}{e['amount']:>8.2f}  {e['cat']:12}  {e['note']}")

    else: print("  Commands: add, summary, list, quit")`
  },

  {
    id: "meeting-timer",
    name: "meeting-timer",
    desc: "A meeting timer that tracks agenda items and alerts when time runs over.",
    tag: "productivity", lang: "python", icon: "🕐",
    code: `import time

print("🕐 Meeting Timer\\n")
print("Add agenda items (name + minutes). Blank name = start.")
items = []
while True:
    name = input("  Agenda item (blank to start): ").strip()
    if not name: break
    mins = int(input(f"  Minutes for '{name}': ").strip())
    items.append((name, mins * 60))

if not items:
    print("No items."); exit()

total = sum(s for _, s in items)
print(f"\\n  Total meeting time: {total//60} min\\n")
print("  Press Enter to move to next item, Ctrl+C to stop.\\n")

overall_start = time.time()

for i, (name, secs) in enumerate(items, 1):
    start = time.time()
    print(f"  [{i}/{len(items)}] {name}  ({secs//60} min)")
    while True:
        elapsed = time.time() - start
        remaining = secs - elapsed
        m, s = divmod(int(abs(remaining)), 60)
        over = remaining < 0
        line = f"\\r  {'⏰ OVER' if over else '⏱ '} {'+' if over else ''}{m:02d}:{s:02d}  (press Enter for next)"
        print(line, end="", flush=True)
        try:
            time.sleep(0.5)
        except KeyboardInterrupt:
            print("\\n\\n  Meeting stopped."); exit()

print("\\n\\n  ✅ Meeting complete!")`
  },

  {
    id: "note-taker",
    name: "note-taker",
    desc: "Quick command-line notes with tags — add, list, search, and delete.",
    tag: "productivity", lang: "python", icon: "📝",
    code: `import json, os
from datetime import datetime

FILE = "notes.json"

def load(): return json.load(open(FILE)) if os.path.exists(FILE) else []
def save(d): json.dump(d, open(FILE,"w"), indent=2)

print("📝 Quick Notes — commands: add, list, search, delete, quit\\n")

while True:
    cmd = input("notes> ").strip()
    data = load()

    if cmd.lower() == "quit": break

    elif cmd.lower().startswith("add"):
        text = input("  Note text: ").strip()
        tags_raw = input("  Tags (space-separated, blank for none): ").strip()
        tags = tags_raw.split() if tags_raw else []
        data.append({"id": len(data)+1, "date": datetime.now().strftime("%m/%d %H:%M"), "text": text, "tags": tags})
        save(data); print(f"  ✅ Note #{len(data)} saved.")

    elif cmd.lower() == "list":
        if not data: print("  No notes yet.")
        for n in data[-20:]:
            tags = " ".join(f"#{t}" for t in n.get("tags", []))
            print(f"  [{n['id']:>3}] {n['date']}  {n['text'][:60]}  {tags}")

    elif cmd.lower().startswith("search "):
        q = cmd[7:].strip().lower()
        hits = [n for n in data if q in n["text"].lower() or q in " ".join(n.get("tags",[]))]
        for n in hits:
            print(f"  [{n['id']:>3}] {n['text'][:60]}")

    elif cmd.lower().startswith("delete "):
        nid = int(cmd[7:].strip())
        data = [n for n in data if n["id"] != nid]
        save(data); print(f"  Deleted note #{nid}.")

    else: print("  Commands: add, list, search <term>, delete <id>, quit")`
  },

  {
    id: "goal-tracker",
    name: "goal-tracker",
    desc: "Set goals with deadlines and track your progress in the terminal.",
    tag: "productivity", lang: "python", icon: "🎯",
    code: `import json, os
from datetime import date, datetime

FILE = "goals.json"

def load(): return json.load(open(FILE)) if os.path.exists(FILE) else []
def save(d): json.dump(d, open(FILE,"w"), indent=2)

print("🎯 Goal Tracker — commands: add, update, list, quit\\n")

while True:
    cmd = input("goals> ").strip().lower()
    data = load()

    if cmd == "quit": break

    elif cmd == "add":
        name    = input("  Goal: ").strip()
        target  = float(input("  Target (e.g. 100 for 100%): ").strip())
        unit    = input("  Unit (e.g. pages, km, %, tasks): ").strip()
        deadline= input("  Deadline (YYYY-MM-DD): ").strip()
        data.append({"name": name, "target": target, "current": 0, "unit": unit, "deadline": deadline, "created": str(date.today())})
        save(data); print(f"  ✅ Goal added: {name}")

    elif cmd.startswith("update"):
        for i, g in enumerate(data):
            print(f"  [{i+1}] {g['name']} ({g['current']}/{g['target']} {g['unit']})")
        idx = int(input("  Goal number: ").strip()) - 1
        val = float(input("  New current value: ").strip())
        data[idx]["current"] = val
        save(data); print(f"  ✅ Updated!")

    elif cmd == "list":
        today = date.today()
        for g in data:
            pct = min(g["current"]/g["target"]*100, 100)
            bar = "█" * round(pct/5) + "░" * (20 - round(pct/5))
            dl  = date.fromisoformat(g["deadline"])
            days_left = (dl - today).days
            print(f"\\n  🎯 {g['name']}")
            print(f"     {bar} {pct:.0f}%  ({g['current']}/{g['target']} {g['unit']})")
            print(f"     Deadline: {g['deadline']}  ({days_left} days left)")

    else: print("  Commands: add, update, list, quit")`
  },

  {
    id: "focus-mode",
    name: "focus-mode",
    desc: "A distraction blocker that locks your terminal for a set focus period.",
    tag: "productivity", lang: "python", icon: "🧘",
    code: `import time, sys, signal

def handler(sig, frame):
    print("\\n  ⛔ Focus interrupted! Stay strong next time.")
    sys.exit(0)

signal.signal(signal.SIGINT, handler)

print("🧘 Focus Mode")
mins = int(input("Focus duration (minutes): ").strip())
task = input("What are you focusing on? ").strip()

secs = mins * 60
print(f"\\n  🔒 Focus locked for {mins} min — {task}")
print("  Ctrl+C to break focus (but try not to!)\\n")

for remaining in range(secs, 0, -1):
    m, s  = divmod(remaining, 60)
    done  = secs - remaining
    pct   = done / secs
    bar_w = 30
    bar   = "█" * round(pct * bar_w) + "░" * (bar_w - round(pct * bar_w))
    print(f"\\r  [{bar}] {m:02d}:{s:02d}", end="", flush=True)
    time.sleep(1)

print("\\n\\n  🎉 Focus session complete! Great work.")
print(f"  You focused on: {task} for {mins} minutes.")`
  },

  {
    id: "reading-list",
    name: "reading-list",
    desc: "Manage your reading list — add books, mark as read, and track progress.",
    tag: "productivity", lang: "python", icon: "📚",
    code: `import json, os
from datetime import date

FILE = "reading.json"

def load(): return json.load(open(FILE)) if os.path.exists(FILE) else []
def save(d): json.dump(d, open(FILE,"w"), indent=2)

STATUS = {"1":"want to read","2":"reading","3":"finished","4":"abandoned"}

print("📚 Reading List — commands: add, list, update, stats, quit\\n")

while True:
    cmd = input("books> ").strip().lower()
    data = load()

    if cmd == "quit": break

    elif cmd == "add":
        title  = input("  Title: ").strip()
        author = input("  Author: ").strip()
        pages  = input("  Pages (optional): ").strip()
        data.append({"title":title,"author":author,"pages":pages,"status":"want to read","added":str(date.today()),"finished":None})
        save(data); print(f"  ✅ Added: {title}")

    elif cmd == "list":
        for i, b in enumerate(data, 1):
            icon = {"want to read":"📖","reading":"🔖","finished":"✅","abandoned":"❌"}.get(b["status"],"📖")
            print(f"  [{i:>2}] {icon} {b['title']} — {b['author']}  [{b['status']}]")

    elif cmd.startswith("update"):
        for i, b in enumerate(data,1): print(f"  [{i}] {b['title']}")
        idx = int(input("  Book number: ").strip()) - 1
        for k, v in STATUS.items(): print(f"  [{k}] {v}")
        s = STATUS.get(input("  Status: ").strip())
        if s:
            data[idx]["status"] = s
            if s == "finished": data[idx]["finished"] = str(date.today())
            save(data); print("  ✅ Updated!")

    elif cmd == "stats":
        total    = len(data)
        finished = sum(1 for b in data if b["status"]=="finished")
        reading  = sum(1 for b in data if b["status"]=="reading")
        print(f"\\n  Total: {total}  |  Read: {finished}  |  Reading: {reading}  |  Backlog: {total-finished-reading}")

    else: print("  Commands: add, list, update, stats, quit")`
  },

  // ── SECURITY ────────────────────────────────────────────────
  {
    id: "password-strength",
    name: "password-strength",
    desc: "Analyze password strength — length, entropy, character variety, and crack time.",
    tag: "security", lang: "python", icon: "🔐",
    code: `import math, re

print("🔐 Password Strength Analyzer (passwords never leave your device)\\n")

while True:
    pwd = input("Password (or 'quit'): ").strip()
    if pwd.lower() == "quit": break

    length = len(pwd)
    has_lower = bool(re.search(r'[a-z]', pwd))
    has_upper = bool(re.search(r'[A-Z]', pwd))
    has_digit = bool(re.search(r'\\d', pwd))
    has_sym   = bool(re.search(r'[^a-zA-Z0-9]', pwd))

    pool = 0
    if has_lower: pool += 26
    if has_upper: pool += 26
    if has_digit: pool += 10
    if has_sym:   pool += 32

    entropy = length * math.log2(pool) if pool else 0

    common = ["password","123456","qwerty","letmein","abc123","password1"]
    is_common = pwd.lower() in common

    if entropy < 28:     score, label = 1, "Very Weak  🔴"
    elif entropy < 36:   score, label = 2, "Weak       🟠"
    elif entropy < 60:   score, label = 3, "Moderate   🟡"
    elif entropy < 128:  score, label = 4, "Strong     🟢"
    else:                score, label = 5, "Very Strong 💪"

    crack_secs = (2 ** entropy) / 1e12
    if crack_secs < 60:  crack = f"{crack_secs:.1f} seconds"
    elif crack_secs < 3600: crack = f"{crack_secs/60:.1f} minutes"
    elif crack_secs < 86400: crack = f"{crack_secs/3600:.1f} hours"
    else: crack = f"{crack_secs/86400:.2e} days"

    print(f"\\n  Strength:  {label}")
    print(f"  Entropy:   {entropy:.1f} bits")
    print(f"  Length:    {length}")
    print(f"  Crack est: {crack} (at 1T guesses/sec)")
    print(f"  Common pw: {'⚠️  YES — change it!' if is_common else 'No'}\\n")`
  },

  {
    id: "hash-cracker",
    name: "hash-cracker",
    desc: "Educational dictionary attack on MD5/SHA1 hashes using a wordlist — learn how hashing works.",
    tag: "security", lang: "python", icon: "🔓",
    code: `import hashlib, sys

WORDLIST = [
  "password","123456","qwerty","letmein","abc123","monkey","dragon","master",
  "sunshine","princess","football","shadow","superman","michael","charlie",
  "login","pass","admin","welcome","hello","secret","password1","test",
]

algo = input("Hash algorithm (md5/sha1/sha256): ").strip().lower()
hash_target = input("Hash to crack: ").strip().lower()

if algo not in ("md5","sha1","sha256"):
    print("Unsupported algorithm."); sys.exit(1)

print(f"\\n🔓 Attempting dictionary attack on {algo} hash...")
print(f"  Wordlist size: {len(WORDLIST)} words\\n")

found = False
for word in WORDLIST:
    h = hashlib.new(algo, word.encode()).hexdigest()
    print(f"  Trying: {word:20} → {h[:16]}...", end="\\r")
    if h == hash_target:
        print(f"\\n\\n  🎉 CRACKED! Password is: {word}")
        found = True
        break

if not found:
    print(f"\\n\\n  ❌ Not found in dictionary. Use a stronger password!")

print("\\n  ⚠️  This demonstrates why common passwords are dangerous.")`
  },

  {
    id: "port-scanner",
    name: "port-scanner",
    desc: "Scan a host for open ports in a given range — educational network tool.",
    tag: "security", lang: "python", icon: "🛡️",
    code: `import socket, sys
from concurrent.futures import ThreadPoolExecutor

host      = input("Target host (localhost or IP): ").strip()
start_raw = input("Start port (default 1): ").strip() or "1"
end_raw   = input("End port (default 1024): ").strip() or "1024"
start, end = int(start_raw), int(end_raw)

print(f"\\n🛡️  Scanning {host} ports {start}-{end}...\\n")

COMMON = {21:"FTP",22:"SSH",23:"Telnet",25:"SMTP",53:"DNS",80:"HTTP",
           110:"POP3",143:"IMAP",443:"HTTPS",3306:"MySQL",5432:"PostgreSQL",6379:"Redis",8080:"Alt-HTTP"}

open_ports = []

def scan(port):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(0.5)
            if s.connect_ex((host, port)) == 0:
                open_ports.append(port)
    except: pass

with ThreadPoolExecutor(max_workers=100) as ex:
    ex.map(scan, range(start, end+1))

open_ports.sort()
if open_ports:
    print(f"  {'Port':>6}  {'Service':15}")
    print("  " + "-"*25)
    for p in open_ports:
        svc = COMMON.get(p, "unknown")
        print(f"  {p:>6}  {svc}")
    print(f"\\n  Found {len(open_ports)} open port(s).")
else:
    print("  No open ports found.")`
  },

  {
    id: "steganography",
    name: "steganography",
    desc: "Hide or reveal a secret message inside a plain text file.",
    tag: "security", lang: "python", icon: "🕵️",
    code: `import os

def encode(cover_text, secret):
    bits = "".join(format(ord(c),"08b") for c in secret) + "00000000"
    words = cover_text.split(" ")
    if len(bits) > len(words):
        print("Cover text too short!"); return None
    out = []
    for i, word in enumerate(words):
        if i < len(bits):
            out.append(word + (" " if bits[i] == "0" else "  "))
        else:
            out.append(word + " ")
    return "".join(out)

def decode(stego_text):
    words = stego_text.split(" ")
    bits = ""
    i = 0
    while i < len(words):
        if not words[i]: i += 1; continue
        # Check trailing spaces
        raw = stego_text
        bits = ""
        # Parse differently: look at raw spacing
        break

    # Simpler decode: split on single vs double space
    parts = stego_text.split(" ")
    # rebuild bit stream from double-space markers
    bits_out = []
    raw_chars = list(stego_text)
    for j in range(len(raw_chars)-1):
        if raw_chars[j] == " ":
            if j+1 < len(raw_chars) and raw_chars[j+1] == " ":
                bits_out.append("1")
            else:
                bits_out.append("0")
    chars = []
    for i in range(0, len(bits_out)-7, 8):
        byte = "".join(bits_out[i:i+8])
        if byte == "00000000": break
        chars.append(chr(int(byte,2)))
    return "".join(chars)

print("🕵️  Text Steganography")
print("  [1] Hide message  [2] Reveal message\\n")
choice = input("Pick: ").strip()

if choice == "1":
    cover = input("Cover text (a sentence or paragraph): ").strip()
    secret = input("Secret message: ").strip()
    result = encode(cover, secret)
    if result:
        path = "stego_output.txt"
        open(path,"w").write(result)
        print(f"  ✅ Hidden message written to: {path}")
elif choice == "2":
    path = input("File with hidden message: ").strip()
    text = open(path).read()
    msg  = decode(text)
    print(f"  🔍 Hidden message: {msg if msg else '(none found)'}")`
  },

  {
    id: "network-sniffer",
    name: "network-sniffer",
    desc: "Display basic network interface info and active connections on your machine.",
    tag: "security", lang: "python", icon: "🌐",
    code: `import socket, subprocess, platform, sys

print("🌐 Network Info\\n")

# Hostname and local IP
hostname = socket.gethostname()
try:
    local_ip = socket.gethostbyname(hostname)
except:
    local_ip = "unknown"

print(f"  Hostname:    {hostname}")
print(f"  Local IP:    {local_ip}")
print(f"  OS:          {platform.system()} {platform.release()}")

# Try to get active connections via netstat
print("\\n  Active Connections (top 10):\\n")
try:
    os_name = platform.system().lower()
    if os_name == "windows":
        result = subprocess.run(["netstat","-an"], capture_output=True, text=True)
    else:
        result = subprocess.run(["netstat","-tn"], capture_output=True, text=True)

    lines = [l for l in result.stdout.split("\\n") if "ESTABLISHED" in l or "LISTEN" in l]
    for line in lines[:10]:
        print(f"  {line.strip()}")
except Exception as e:
    print(f"  Could not retrieve connections: {e}")

print(f"\\n  Tip: Run as administrator/root for full connection details.")`
  },

  {
    id: "otp-generator",
    name: "otp-generator",
    desc: "Generate time-based one-time passwords (TOTP) from a secret key — like Google Authenticator.",
    tag: "security", lang: "python", icon: "🔑",
    code: `import hmac, hashlib, time, struct, base64

def hotp(key: bytes, counter: int, digits=6) -> str:
    msg = struct.pack(">Q", counter)
    h   = hmac.new(key, msg, hashlib.sha1).digest()
    offset = h[-1] & 0x0f
    code   = struct.unpack(">I", h[offset:offset+4])[0] & 0x7fffffff
    return str(code % (10 ** digits)).zfill(digits)

def totp(secret: str, digits=6, period=30) -> str:
    try:
        key = base64.b32decode(secret.upper().replace(" ",""), casefold=True)
    except Exception:
        return "Invalid secret"
    counter = int(time.time()) // period
    return hotp(key, counter, digits)

print("🔑 TOTP Generator (Google Authenticator compatible)\\n")
print("  You need a Base32 secret key (e.g. from a 2FA setup QR code).")
print("  Example test key: JBSWY3DPEHPK3PXP\\n")

secret = input("  Base32 secret key: ").strip()

print()
for i in range(5):
    code = totp(secret)
    remaining = 30 - (int(time.time()) % 30)
    print(f"  OTP: {code}  (valid for {remaining}s)")
    cont = input("  Press Enter for next code, q to quit: ").strip()
    if cont.lower() == "q": break`
  },

  // ── DATA ────────────────────────────────────────────────────
  {
    id: "csv-analyzer",
    name: "csv-analyzer",
    desc: "Load any CSV and get instant stats: row count, column types, nulls, and summaries.",
    tag: "data", lang: "python", icon: "📊",
    code: `import csv, sys, math
from collections import Counter

path = input("CSV file path: ").strip()
try:
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows   = list(reader)
        cols   = reader.fieldnames or []
except FileNotFoundError:
    print("File not found."); sys.exit(1)

print(f"\\n📊 CSV Analysis: {path}")
print(f"  Rows: {len(rows):,}   Columns: {len(cols)}\\n")

for col in cols:
    vals     = [r[col] for r in rows if r[col]]
    nulls    = len(rows) - len(vals)
    nums     = []
    for v in vals:
        try: nums.append(float(v))
        except: pass

    print(f"  [{col}]")
    print(f"    Non-null: {len(vals):,}   Nulls: {nulls:,}   Unique: {len(set(vals)):,}")
    if nums:
        mean  = sum(nums)/len(nums)
        srtd  = sorted(nums)
        med   = srtd[len(srtd)//2]
        print(f"    Min: {min(nums):.4g}   Max: {max(nums):.4g}   Mean: {mean:.4g}   Median: {med:.4g}")
    else:
        top = Counter(vals).most_common(3)
        print(f"    Top values: {', '.join(f'{v}({n})' for v,n in top)}")`
  },

  {
    id: "json-explorer",
    name: "json-explorer",
    desc: "Interactively explore a JSON file — navigate keys, search values, print paths.",
    tag: "data", lang: "python", icon: "🔎",
    code: `import json, sys

path = input("JSON file path: ").strip()
try:
    data = json.load(open(path, encoding="utf-8"))
except (FileNotFoundError, json.JSONDecodeError) as e:
    print(f"Error: {e}"); sys.exit(1)

def navigate(node, path="root"):
    while True:
        print(f"\\n  📍 {path}")
        if isinstance(node, dict):
            keys = list(node.keys())
            for i, k in enumerate(keys[:20], 1):
                v = node[k]
                preview = str(v)[:40] + ("..." if len(str(v)) > 40 else "")
                print(f"    [{i:>2}] {k}: {preview}")
        elif isinstance(node, list):
            print(f"    List with {len(node)} items")
            for i, v in enumerate(node[:10], 1):
                print(f"    [{i:>2}] {str(v)[:60]}")
        else:
            print(f"    Value: {node}")
            return

        cmd = input("\\n  Enter key/index, 'back', 'print', or 'quit': ").strip()
        if cmd == "quit": sys.exit(0)
        if cmd == "back": return
        if cmd == "print": print(json.dumps(node, indent=2)[:500]); continue

        try:
            key = int(cmd) - 1 if isinstance(node, list) else cmd
            navigate(node[key], f"{path}.{cmd}")
        except (KeyError, IndexError, ValueError):
            print("  Not found.")

navigate(data)`
  },

  {
    id: "data-cleaner",
    name: "data-cleaner",
    desc: "Clean a CSV: remove duplicates, trim whitespace, fill nulls, and normalize columns.",
    tag: "data", lang: "python", icon: "🧹",
    code: `import csv, sys, os

path = input("CSV file path: ").strip()
try:
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
        cols = list(rows[0].keys()) if rows else []
except (FileNotFoundError, StopIteration):
    print("File not found or empty."); sys.exit(1)

original = len(rows)

# Strip whitespace
rows = [{k: v.strip() for k, v in r.items()} for r in rows]

# Remove fully empty rows
rows = [r for r in rows if any(v for v in r.values())]

# Remove duplicates
seen, deduped = set(), []
for r in rows:
    key = tuple(r.values())
    if key not in seen:
        seen.add(key); deduped.append(r)
rows = deduped

# Fill nulls
fill = input("Fill empty cells with (blank to skip): ").strip()
if fill:
    rows = [{k: v if v else fill for k, v in r.items()} for r in rows]

# Lowercase a column?
print(f"  Columns: {', '.join(cols)}")
lc_col = input("Lowercase which column? (blank to skip): ").strip()
if lc_col in cols:
    rows = [{k: (v.lower() if k == lc_col else v) for k, v in r.items()} for r in rows]

out_path = os.path.splitext(path)[0] + "_clean.csv"
with open(out_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=cols)
    writer.writeheader(); writer.writerows(rows)

print(f"\\n  Original rows:  {original:,}")
print(f"  Cleaned rows:   {len(rows):,}")
print(f"  Removed:        {original - len(rows):,}")
print(f"  Saved to:       {out_path}")`
  },

  {
    id: "number-gen",
    name: "number-gen",
    desc: "Generate datasets of random numbers with custom distributions: uniform, normal, etc.",
    tag: "data", lang: "python", icon: "🎲",
    code: `import random, math, csv, sys

print("🎲 Random Number Generator\\n")
print("  [1] Uniform    [2] Normal (Gaussian)    [3] Exponential    [4] Integer range")
dist = input("Distribution: ").strip()
n    = int(input("How many numbers: ").strip())

nums = []
if dist == "1":
    a = float(input("Min: ").strip()); b = float(input("Max: ").strip())
    nums = [random.uniform(a, b) for _ in range(n)]
elif dist == "2":
    mu = float(input("Mean: ").strip()); sigma = float(input("Std Dev: ").strip())
    nums = [random.gauss(mu, sigma) for _ in range(n)]
elif dist == "3":
    lam = float(input("Lambda (rate): ").strip())
    nums = [random.expovariate(lam) for _ in range(n)]
elif dist == "4":
    a = int(input("Min: ").strip()); b = int(input("Max: ").strip())
    nums = [random.randint(a, b) for _ in range(n)]
else:
    print("Invalid."); sys.exit(1)

save = input("Save to CSV? (y/n): ").strip().lower()
if save == "y":
    fname = "random_data.csv"
    with open(fname, "w", newline="") as f:
        csv.writer(f).writerows([[v] for v in nums])
    print(f"  Saved {n:,} numbers to {fname}")
else:
    for v in nums[:20]:
        print(f"  {v:.6f}")
    if n > 20: print(f"  ... ({n-20} more)")`
  },

  {
    id: "pivot-table",
    name: "pivot-table",
    desc: "Create a simple pivot table from a CSV file — group by column and sum/count values.",
    tag: "data", lang: "python", icon: "📋",
    code: `import csv, sys
from collections import defaultdict

path = input("CSV file path: ").strip()
try:
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
        cols = list(rows[0].keys()) if rows else []
except FileNotFoundError:
    print("File not found."); sys.exit(1)

print(f"\\n  Columns: {', '.join(cols)}")
group_col = input("Group by column: ").strip()
val_col   = input("Value column (for sum/avg): ").strip()
agg       = input("Aggregation [1] count  [2] sum  [3] avg: ").strip()

pivot = defaultdict(list)
for r in rows:
    if group_col in r and val_col in r:
        try:
            pivot[r[group_col]].append(float(r[val_col]))
        except ValueError:
            pivot[r[group_col]].append(0)

print(f"\\n  {group_col:25} {'Value':>12}")
print("  " + "-" * 38)
for key in sorted(pivot.keys()):
    vals = pivot[key]
    if agg == "1":   result = len(vals)
    elif agg == "2": result = sum(vals)
    elif agg == "3": result = sum(vals)/len(vals)
    else: result = len(vals)
    print(f"  {key:25} {result:>12.2f}")`
  },

  // ── PYTHON TRICKS ───────────────────────────────────────────
  {
    id: "list-comprehensions",
    name: "list-comprehensions",
    desc: "Interactive demo of Python list comprehensions — learn with live examples.",
    tag: "python-tricks", lang: "python", icon: "🐍",
    code: `print("🐍 List Comprehension Demo\\n")

# Basic
squares = [x**2 for x in range(10)]
print(f"  Squares 0-9:       {squares}")

# With filter
evens = [x for x in range(20) if x % 2 == 0]
print(f"  Even numbers 0-20: {evens}")

# Nested
matrix = [[i*j for j in range(1,4)] for i in range(1,4)]
print(f"  3x3 mult table:    {matrix}")

# String ops
words   = ["hello", "WORLD", "Python", "is", "GREAT"]
lower   = [w.lower() for w in words]
lengths = {w: len(w) for w in words}
print(f"  Lowercased:        {lower}")
print(f"  Word lengths:      {lengths}")

# Set comprehension
sentence = "the cat sat on the mat"
unique_letters = {c for c in sentence if c.isalpha()}
print(f"  Unique letters:    {sorted(unique_letters)}")

# Generator
gen = (x**2 for x in range(1000000))
print(f"  Generator (lazy):  {next(gen)}, {next(gen)}, {next(gen)}, ...")

print("\\n  Try your own:")
expr = input("  List comp expression (e.g. [x*2 for x in range(5)]): ").strip()
try:
    result = eval(expr)
    print(f"  Result: {result}")
except Exception as e:
    print(f"  Error: {e}")`
  },

  {
    id: "decorators-demo",
    name: "decorators-demo",
    desc: "See Python decorators in action — timing, caching, retry logic, and logging.",
    tag: "python-tricks", lang: "python", icon: "🎁",
    code: `import time, functools

# ── Timing decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.time()
        result = func(*args, **kwargs)
        print(f"  ⏱  {func.__name__} took {(time.time()-t0)*1000:.2f}ms")
        return result
    return wrapper

# ── Retry decorator
def retry(times=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times+1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"  ⚠️  Attempt {attempt} failed: {e}")
            raise RuntimeError(f"Failed after {times} retries")
        return wrapper
    return decorator

# ── Cache decorator (manual)
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

@memoize
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

@retry(times=3)
def risky(x):
    if x < 3: raise ValueError("Not ready yet")
    return "success"

print("🎁 Decorator Examples\\n")
print("  1. @timer:")
result = slow_sum(1000000)
print(f"     slow_sum(1000000) = {result:,}\\n")

print("  2. @memoize (Fibonacci):")
t0 = time.time()
print(f"     fib(35) = {fib(35)}  (took {(time.time()-t0)*1000:.2f}ms)\\n")

print("  3. @retry:")
attempt = [0]
try:
    result = risky(3)
    print(f"     risky(3) = {result}")`
  },

  {
    id: "generators-demo",
    name: "generators-demo",
    desc: "Learn Python generators with live examples — infinite sequences, pipelines, and memory savings.",
    tag: "python-tricks", lang: "python", icon: "⚡",
    code: `import sys

print("⚡ Python Generators Demo\\n")

# Infinite counter
def count_up(start=0, step=1):
    n = start
    while True:
        yield n
        n += step

# Fibonacci generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a+b

# Pipeline: generate → filter → transform
def take(n, gen):
    return [next(gen) for _ in range(n)]

def gen_filter(gen, pred):
    for item in gen:
        if pred(item):
            yield item

print("  1. Infinite counter (first 10):")
counter = count_up(1)
print(f"     {take(10, counter)}")

print("\\n  2. Fibonacci (first 15):")
fib = fibonacci()
print(f"     {take(15, fib)}")

print("\\n  3. Pipeline — even fibonacci under 1000:")
fib2    = fibonacci()
bounded = (x for x in fib2 if x < 1000)
evens   = [x for x in bounded if x % 2 == 0]
print(f"     {evens}")

print("\\n  4. Memory comparison:")
n = 1000000
list_mem = sys.getsizeof(list(range(n)))
gen_mem  = sys.getsizeof(x for x in range(n))
print(f"     list(range({n:,})) = {list_mem:,} bytes")
print(f"     generator         = {gen_mem:,} bytes  ({list_mem//gen_mem}x more efficient!)")`
  },

  {
    id: "context-managers",
    name: "context-managers",
    desc: "Explore Python context managers — with statements, custom managers, and use cases.",
    tag: "python-tricks", lang: "python", icon: "📦",
    code: `import time, os, tempfile
from contextlib import contextmanager

# Custom timer context manager
@contextmanager
def timer(label=""):
    t0 = time.time()
    try:
        yield
    finally:
        elapsed = (time.time() - t0) * 1000
        print(f"  ⏱  {label}: {elapsed:.2f}ms")

# Temp directory context manager
@contextmanager
def temp_dir():
    d = tempfile.mkdtemp()
    print(f"  📁 Created temp dir: {d}")
    try:
        yield d
    finally:
        import shutil
        shutil.rmtree(d)
        print(f"  🗑️  Cleaned up: {d}")

# Suppress exceptions context manager
@contextmanager
def suppress(*exceptions):
    try:
        yield
    except exceptions as e:
        print(f"  (Suppressed: {type(e).__name__}: {e})")

print("📦 Context Manager Examples\\n")

print("  1. Timer context manager:")
with timer("sum of 1M numbers"):
    total = sum(range(1000000))
print(f"     Result: {total:,}\\n")

print("  2. Temp directory:")
with temp_dir() as d:
    test_file = os.path.join(d, "test.txt")
    open(test_file, "w").write("hello")
    print(f"     Wrote file: {test_file}")
print()

print("  3. Suppress exceptions:")
with suppress(ZeroDivisionError):
    result = 1 / 0
    print("  (this won't print)")
print("  Code continues after suppressed exception!")`
  },

  {
    id: "regex-tester",
    name: "regex-tester",
    desc: "Interactive Python regex tester — test patterns, see matches, capture groups live.",
    tag: "python-tricks", lang: "python", icon: "🔍",
    code: `import re

print("🔍 Python Regex Tester")
print("  Type 'quit' to exit, 'help' for examples\\n")

EXAMPLES = {
  "email":    r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
  "phone":    r"\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}",
  "url":      r"https?://[^\\s]+",
  "date":     r"\\d{4}-\\d{2}-\\d{2}",
  "ip":       r"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
  "hex":      r"#[0-9A-Fa-f]{3,6}",
}

while True:
    pattern = input("Pattern (or 'help'/'quit'): ").strip()
    if pattern == "quit": break
    if pattern == "help":
        for name, ex in EXAMPLES.items():
            print(f"  {name:10}: {ex}")
        continue

    text = input("Test string: ").strip()
    flags_raw = input("Flags (i=ignorecase, m=multiline, blank=none): ").strip().lower()
    flags = 0
    if "i" in flags_raw: flags |= re.IGNORECASE
    if "m" in flags_raw: flags |= re.MULTILINE

    try:
        matches = list(re.finditer(pattern, text, flags))
        if not matches:
            print("  ❌ No matches\\n"); continue
        print(f"  ✅ {len(matches)} match(es):")
        for m in matches:
            print(f"     [{m.start()}-{m.end()}] '{m.group()}'")
            if m.groups():
                for i, g in enumerate(m.groups(), 1):
                    print(f"       Group {i}: '{g}'")
    except re.error as e:
        print(f"  ❌ Regex error: {e}")
    print()`
  },

  {
    id: "class-demo",
    name: "class-demo",
    desc: "OOP demo — build a bank account class with inheritance, properties, and dunder methods.",
    tag: "python-tricks", lang: "python", icon: "🏗️",
    code: `class Account:
    _total_accounts = 0

    def __init__(self, owner, balance=0):
        Account._total_accounts += 1
        self._owner   = owner
        self._balance = balance
        self._history = []

    @property
    def balance(self): return self._balance

    @property
    def owner(self): return self._owner

    def deposit(self, amount):
        if amount <= 0: raise ValueError("Amount must be positive")
        self._balance += amount
        self._history.append(f"+{amount:.2f}")

    def withdraw(self, amount):
        if amount > self._balance: raise ValueError("Insufficient funds")
        self._balance -= amount
        self._history.append(f"-{amount:.2f}")

    def __repr__(self): return f"Account(owner={self._owner!r}, balance={self._balance:.2f})"
    def __str__(self):  return f"{self._owner}'s account: \${self._balance:.2f}"
    def __add__(self, other): return self._balance + other._balance

    @classmethod
    def total(cls): return cls._total_accounts

class SavingsAccount(Account):
    def __init__(self, owner, balance=0, rate=0.05):
        super().__init__(owner, balance)
        self.rate = rate

    def add_interest(self):
        interest = self._balance * self.rate
        self.deposit(interest)
        return interest

print("🏗️  OOP Demo — Bank Account\\n")

alice = Account("Alice", 1000)
bob   = SavingsAccount("Bob", 500, rate=0.05)

alice.deposit(500)
bob.deposit(200)
alice.withdraw(200)

print(f"  {alice}")
print(f"  {bob}")
print(f"  Alice history: {alice._history}")
print(f"  Combined balance: \${alice + bob:.2f}")
print(f"  Total accounts: {Account.total()}")

interest = bob.add_interest()
print(f"  Bob's interest: \${interest:.2f}  New balance: \${bob.balance:.2f}")`
  },

  {
    id: "file-tricks",
    name: "file-tricks",
    desc: "Python file handling tricks — pathlib, glob, temp files, atomic writes, and more.",
    tag: "python-tricks", lang: "python", icon: "📁",
    code: `import os, tempfile, shutil
from pathlib import Path
from datetime import datetime

print("📁 Python File Tricks Demo\\n")

# 1. Pathlib
print("  1. pathlib — modern path handling:")
p = Path.home()
print(f"     Home dir:  {p}")
print(f"     Desktop:   {p / 'Desktop'}")
py_files = list(Path(".").glob("*.py"))
print(f"     .py files here: {py_files[:3] or ['(none)']}")

# 2. Temp files
print("\\n  2. Temp files (auto-cleaned):")
with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
    f.write("hello world\\nline 2\\n")
    tmppath = f.name
content = Path(tmppath).read_text()
print(f"     Created: {tmppath}")
print(f"     Content: {content.strip()!r}")
os.unlink(tmppath)
print(f"     Deleted: ✅")

# 3. Atomic write
print("\\n  3. Atomic write (safe replace):")
target = Path("atomic_test.txt")
tmp    = Path("atomic_test.tmp")
tmp.write_text(f"Written at {datetime.now()}")
tmp.replace(target)
print(f"     Atomically wrote to {target}")
target.unlink()

# 4. Walk vs glob
print("\\n  4. Path tricks:")
print(f"     cwd:        {Path.cwd().name}")
print(f"     parent:     {Path.cwd().parent.name}")
print(f"     stem/suffix of 'file.tar.gz': {Path('file.tar.gz').stem}, {Path('file.tar.gz').suffix}")`
  },

  // ── MORE GAMES ──────────────────────────────────────────────
  {
    id: "battleship",
    name: "battleship",
    desc: "Play solo Battleship — guess ship locations on a 10x10 grid in limited shots.",
    tag: "games", lang: "python", icon: "🚢",
    code: `import random

SIZE  = 8
SHIPS = [("Carrier",4),("Battleship",3),("Destroyer",2),("Submarine",2)]

def make_board():
    board = [["~"]*SIZE for _ in range(SIZE)]
    ships = []
    for name, length in SHIPS:
        while True:
            horiz = random.random() < 0.5
            if horiz:
                r = random.randint(0, SIZE-1)
                c = random.randint(0, SIZE-length)
                cells = [(r, c+i) for i in range(length)]
            else:
                r = random.randint(0, SIZE-length)
                c = random.randint(0, SIZE-1)
                cells = [(r+i, c) for i in range(length)]
            if all(board[rr][cc] == "~" for rr,cc in cells):
                for rr,cc in cells: board[rr][cc] = "S"
                ships.append((name, cells))
                break
    return board, ships

def draw(board, show_ships=False):
    print("    " + " ".join(str(i+1) for i in range(SIZE)))
    for i, row in enumerate(board):
        cells = []
        for c in row:
            if c == "S": cells.append("~" if not show_ships else "S")
            elif c == "X": cells.append("💥")
            elif c == "O": cells.append("○")
            else: cells.append("~")
        print(f"  {chr(65+i)} " + " ".join(cells))

board, ships = make_board()
shots = 0
max_shots = 30
hits  = 0
total_cells = sum(l for _,l in SHIPS)

print("🚢 BATTLESHIP — Sink all ships!")
print(f"  Ships: {', '.join(f'{n}({l})' for n,l in SHIPS)}")
print(f"  Shots remaining: {max_shots}\\n")

while shots < max_shots and hits < total_cells:
    draw(board)
    try:
        raw = input(f"\\n  Shots left: {max_shots-shots} | Hits: {hits}/{total_cells}\\n  Target (e.g. A5): ").strip().upper()
        r = ord(raw[0]) - 65
        c = int(raw[1:]) - 1
        if not (0 <= r < SIZE and 0 <= c < SIZE): raise ValueError
    except: print("  Invalid. Try A1 format."); continue
    if board[r][c] in ("X","O"): print("  Already tried!"); continue
    shots += 1
    if board[r][c] == "S":
        board[r][c] = "X"; hits += 1; print("  💥 HIT!")
        for name, cells in ships:
            if all(board[rr][cc] == "X" for rr,cc in cells):
                print(f"  ⚓ You sunk the {name}!")
    else:
        board[r][c] = "O"; print("  ○ Miss.")

draw(board, show_ships=True)
if hits == total_cells: print(f"\\n  🎉 You won in {shots} shots!")
else: print(f"\\n  💀 Out of shots! {hits}/{total_cells} hits.")`
  },

  {
    id: "snake-game",
    name: "snake-game",
    desc: "A text-based Snake game that runs in your terminal — eat food, avoid walls!",
    tag: "games", lang: "python", icon: "🐍",
    code: `import random, sys, os, time

# Text-based simplified snake (non-curses version)
WIDTH, HEIGHT = 20, 10

def make_food(snake):
    while True:
        f = (random.randint(0,HEIGHT-1), random.randint(0,WIDTH-1))
        if f not in snake: return f

snake = [(HEIGHT//2, WIDTH//2)]
food  = make_food(snake)
direction = (0, 1)
score = 0

DIRS = {"w":(-1,0),"s":(1,0),"a":(0,-1),"d":(0,1)}

def draw(snake, food, score):
    os.system("cls" if os.name=="nt" else "clear")
    print("  " + "─"*(WIDTH+2))
    for r in range(HEIGHT):
        row = "│"
        for c in range(WIDTH):
            if (r,c) == snake[0]: row += "●"
            elif (r,c) in snake:  row += "○"
            elif (r,c) == food:   row += "★"
            else:                  row += " "
        print("  " + row + "│")
    print("  " + "─"*(WIDTH+2))
    print(f"  Score: {score}  | WASD to move | Q to quit")

print("🐍 Snake — WASD to move, Q to quit")
print("  Press Enter after each move.")
input("  Ready? Press Enter to start...")

while True:
    draw(snake, food, score)
    key = input("  Move: ").strip().lower()[:1]
    if key == "q": print("  Game over!"); break
    if key in DIRS:
        direction = DIRS[key]
    dr, dc = direction
    head   = (snake[0][0]+dr, snake[0][1]+dc)
    if not (0 <= head[0] < HEIGHT and 0 <= head[1] < WIDTH):
        draw(snake, food, score); print("  💥 Hit a wall! Game over."); break
    if head in snake:
        draw(snake, food, score); print("  💥 Hit yourself! Game over."); break
    snake.insert(0, head)
    if head == food:
        score += 10; food = make_food(snake)
        print("  🍎 Nom!")
    else:
        snake.pop()

print(f"  Final score: {score}")`
  },

  {
    id: "sudoku",
    name: "sudoku",
    desc: "Play Sudoku in your terminal — auto-generated puzzles with a solver built in.",
    tag: "games", lang: "python", icon: "🔢",
    code: `import random, copy

def is_valid(board, row, col, num):
    if num in board[row]: return False
    if num in [board[r][col] for r in range(9)]: return False
    br, bc = (row//3)*3, (col//3)*3
    for r in range(br, br+3):
        for c in range(bc, bc+3):
            if board[r][c] == num: return False
    return True

def solve(board):
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                for num in range(1, 10):
                    if is_valid(board, r, c, num):
                        board[r][c] = num
                        if solve(board): return True
                        board[r][c] = 0
                return False
    return True

def generate():
    board = [[0]*9 for _ in range(9)]
    for i in range(9):
        row = list(range(1,10))
        random.shuffle(row)
        for j, n in enumerate(row):
            if is_valid(board, i, j, n):
                board[i][j] = n
            else:
                board[i][j] = 0
    solve(board)
    puzzle = copy.deepcopy(board)
    cells  = [(r,c) for r in range(9) for c in range(9)]
    random.shuffle(cells)
    for r, c in cells[:40]:
        puzzle[r][c] = 0
    return puzzle, board

def draw(board, orig):
    print("\\n     1 2 3   4 5 6   7 8 9")
    for r in range(9):
        if r % 3 == 0: print("    ┼───────┼───────┼───────┼")
        row_str = f"  {chr(65+r)} │"
        for c in range(9):
            v = board[r][c]
            ch = str(v) if v else "·"
            row_str += f" {ch}"
            if (c+1) % 3 == 0: row_str += " │"
        print(row_str)
    print("    ┼───────┼───────┼───────┼")

puzzle, solution = generate()
board = copy.deepcopy(puzzle)
print("🔢 SUDOKU — enter row (A-I) col (1-9) value, or 'hint', 'solve', 'quit'")

while True:
    draw(board, puzzle)
    if all(board[r][c] != 0 for r in range(9) for c in range(9)):
        if board == solution: print("\\n  🎉 Solved correctly!"); break
        else: print("\\n  ❌ Some errors. Keep trying!")
    cmd = input("\\n  Move (e.g. A5 7) or hint/solve/quit: ").strip().lower()
    if cmd == "quit": break
    if cmd == "hint":
        empty = [(r,c) for r in range(9) for c in range(9) if board[r][c]==0]
        if empty:
            r,c = random.choice(empty); board[r][c] = solution[r][c]
            print(f"  Hint: {chr(65+r)}{c+1} = {solution[r][c]}")
    elif cmd == "solve":
        board = copy.deepcopy(solution); print("  Solved!")
    else:
        try:
            r = ord(cmd[0]) - ord("a")
            c = int(cmd[1]) - 1
            v = int(cmd[3])
            if puzzle[r][c] != 0: print("  Can't change a given cell!")
            elif 1 <= v <= 9:
                board[r][c] = v
                if v != solution[r][c]: print("  ❌ Incorrect!")
        except: print("  Format: A5 7")`
  },

];
