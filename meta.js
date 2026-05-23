const FEATURED_IDS = ["file-organizer","weather","hangman","password-gen","sysmon","trivia-quiz"];

// IDs of recently-added scripts — shown with a "✦ new" badge on cards
// Update this list whenever you push a new batch of scripts
const SCRIPT_NEW = [
  "ip-geolocate","port-scanner","morse-code","caesar-cipher","matrix-screensaver",
  "pomodoro-timer","expense-tracker","ascii-art","word-counter","network-speed-test"
];

const SCRIPT_META = {

  "bulk-rename": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python bulk-rename.py"},
      {t:"in", v:"Folder path: /Downloads"},
      {t:"in", v:"Find (text or regex): IMG_"},
      {t:"in", v:"Replace with: photo_"},
      {t:"out",v:"  IMG_001.jpg  →  photo_001.jpg"},
      {t:"out",v:"  IMG_002.jpg  →  photo_002.jpg"},
      {t:"out",v:"  IMG_003.png  →  photo_003.png"},
      {t:"out",v:""},
      {t:"out",v:"Done. 3 file(s) renamed."},
    ]
  },

  "img-crush": {
    difficulty:"intermediate", requires:["Pillow"], version:"1.1",
    demo:[
      {t:"cmd",v:"python img-crush.py"},
      {t:"in", v:"Folder with images: /photos"},
      {t:"in", v:"Quality (1-95, recommended 75): 75"},
      {t:"in", v:"Max width in px (leave blank to keep): 1920"},
      {t:"out",v:"  ✓ vacation.jpg"},
      {t:"out",v:"  ✓ portrait.png"},
      {t:"out",v:"  ✓ sunset.jpg"},
      {t:"out",v:""},
      {t:"out",v:"Done. 3 image(s) saved to /compressed/"},
    ]
  },

  "csv-to-json": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python csv-to-json.py"},
      {t:"in", v:"CSV file path: users.csv"},
      {t:"out",v:"Done! 42 row(s) saved to: users.json"},
    ]
  },

  "json-to-csv": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python json-to-csv.py"},
      {t:"in", v:"JSON file path: data.json"},
      {t:"out",v:"Done! 128 row(s) saved to: data.csv"},
    ]
  },

  "duplicate-finder": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python duplicate-finder.py"},
      {t:"in", v:"Folder to scan: /Downloads"},
      {t:"out",v:""},
      {t:"out",v:"Scanning..."},
      {t:"out",v:"Found 2 group(s) of duplicates:"},
      {t:"out",v:""},
      {t:"out",v:"  DUPLICATE GROUP:"},
      {t:"out",v:"    /Downloads/resume.pdf"},
      {t:"out",v:"    /Downloads/resume_copy.pdf"},
    ]
  },

  "folder-size": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python folder-size.py"},
      {t:"in", v:"Folder path: /home/user"},
      {t:"out",v:""},
      {t:"out",v:"Folder                                   Size"},
      {t:"out",v:"----------------------------------------------------"},
      {t:"out",v:"  Downloads                            4.2 GB"},
      {t:"out",v:"  Videos                               2.1 GB"},
      {t:"out",v:"  Documents                          512.3 MB"},
      {t:"out",v:"  Pictures                           203.7 MB"},
    ]
  },

  "pdf-merger": {
    difficulty:"intermediate", requires:["pypdf"], version:"1.0",
    demo:[
      {t:"cmd",v:"python pdf-merger.py"},
      {t:"in", v:"File 1: chapter1.pdf"},
      {t:"in", v:"File 2: chapter2.pdf"},
      {t:"in", v:"File 3: chapter3.pdf"},
      {t:"in", v:"File 4: (blank — done)"},
      {t:"in", v:"Output filename: book.pdf"},
      {t:"out",v:""},
      {t:"out",v:"✓ Merged 3 files into: book.pdf"},
    ]
  },

  "text-search": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python text-search.py"},
      {t:"in", v:"Folder to search: /projects"},
      {t:"in", v:"Search for: TODO"},
      {t:"out",v:""},
      {t:"out",v:"📄 /projects/app.py"},
      {t:"out",v:"   line 14: # TODO: add error handling"},
      {t:"out",v:"📄 /projects/utils.py"},
      {t:"out",v:"   line 3:  # TODO: refactor this"},
      {t:"out",v:""},
      {t:"out",v:"Found 2 match(es) for 'TODO'."},
    ]
  },

  "sysmon": {
    difficulty:"intermediate", requires:["psutil"], version:"1.2",
    demo:[
      {t:"cmd",v:"python sysmon.py"},
      {t:"out",v:"sysmon — press Ctrl+C to stop"},
      {t:"out",v:""},
      {t:"out",v:"===================================="},
      {t:"out",v:"  SYSMON"},
      {t:"out",v:"===================================="},
      {t:"out",v:"  CPU     23.4%  ████"},
      {t:"out",v:"  RAM     61.2%  ████████████"},
      {t:"out",v:"  DISK    44.8%  █████████"},
      {t:"out",v:""},
      {t:"out",v:"  RAM used: 9842 MB / 16384 MB"},
      {t:"out",v:"  Disk free: 278 GB"},
    ]
  },

  "remind-me": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python remind-me.py"},
      {t:"in", v:"Reminder message: Take a break!"},
      {t:"in", v:"Remind me in how many minutes? 25"},
      {t:"out",v:""},
      {t:"out",v:"OK! Reminding you in 25 minute(s)."},
      {t:"out",v:""},
      {t:"out",v:"[25 min later...]"},
      {t:"out",v:"Reminder sent!"},
    ]
  },

  "password-gen": {
    difficulty:"beginner", requires:[], version:"1.1",
    demo:[
      {t:"cmd",v:"python password-gen.py"},
      {t:"in", v:"Password length (e.g. 20): 20"},
      {t:"in", v:"Include symbols? (y/n): y"},
      {t:"in", v:"How many passwords? 3"},
      {t:"out",v:""},
      {t:"out",v:"  K#9mP@vX2!qRs&dL7nYw"},
      {t:"out",v:"  j$5tBz@Qm8!Wp*kNr3Lx"},
      {t:"out",v:"  F!2cVq#Xn9@Yw&Kb5mPs"},
      {t:"out",v:""},
      {t:"out",v:"3 password(s) generated."},
    ]
  },

  "countdown-timer": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python countdown-timer.py"},
      {t:"in", v:"Timer duration in minutes: 1"},
      {t:"out",v:""},
      {t:"out",v:"Timer started for 1 minute(s). Ctrl+C to cancel."},
      {t:"out",v:""},
      {t:"out",v:"  ⏱  01:00 remaining"},
      {t:"out",v:"  ⏱  00:30 remaining"},
      {t:"out",v:"  ✅ Time's up!"},
    ]
  },

  "net-scan": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python net-scan.py"},
      {t:"in", v:"Subnet to scan (e.g. 192.168.1): 192.168.1"},
      {t:"out",v:""},
      {t:"out",v:"Scanning 192.168.1.0/24 ..."},
      {t:"out",v:""},
      {t:"out",v:"  192.168.1.1        router.local"},
      {t:"out",v:"  192.168.1.42       my-macbook.local"},
      {t:"out",v:"  192.168.1.105      (unknown)"},
      {t:"out",v:""},
      {t:"out",v:"Found 3 device(s) online."},
    ]
  },

  "weather": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python weather.py"},
      {t:"in", v:"Enter city name: New York"},
      {t:"out",v:""},
      {t:"out",v:"🌍 New York, United States"},
      {t:"out",v:"  Partly cloudy"},
      {t:"out",v:"  🌡  18°C / 64°F  (feels like 16°C)"},
      {t:"out",v:"  💧 Humidity: 62%"},
      {t:"out",v:"  💨 Wind: 14 km/h"},
    ]
  },

  "qr-gen": {
    difficulty:"intermediate", requires:["qrcode","Pillow"], version:"1.0",
    demo:[
      {t:"cmd",v:"python qr-gen.py"},
      {t:"in", v:"Text or URL to encode: https://github.com"},
      {t:"in", v:"Output filename (e.g. qr.png): github_qr.png"},
      {t:"out",v:""},
      {t:"out",v:"✓ QR code saved to: github_qr.png"},
    ]
  },

  "ip-info": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python ip-info.py"},
      {t:"out",v:""},
      {t:"out",v:"🌐 Your Public IP Info"},
      {t:"out",v:"  IP:       203.0.113.42"},
      {t:"out",v:"  City:     Chicago"},
      {t:"out",v:"  Region:   Illinois"},
      {t:"out",v:"  Country:  US"},
      {t:"out",v:"  ISP:      AS7922 Comcast Cable"},
      {t:"out",v:"  Timezone: America/Chicago"},
    ]
  },

  "stopwatch": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python stopwatch.py"},
      {t:"out",v:"  ⏱  00:00.0  (Enter = lap, q + Enter = quit)"},
      {t:"in", v:"(Enter)"},
      {t:"out",v:"  🏁 Lap 1: 00:12.4"},
      {t:"in", v:"(Enter)"},
      {t:"out",v:"  🏁 Lap 2: 00:28.7"},
      {t:"in", v:"q"},
      {t:"out",v:""},
      {t:"out",v:"Total: 00:28.7"},
    ]
  },

  "unit-converter": {
    difficulty:"beginner", requires:[], version:"1.1",
    demo:[
      {t:"cmd",v:"python unit-converter.py"},
      {t:"out",v:"  Categories: [1] Length  [2] Weight  [3] Temperature  [4] Speed"},
      {t:"in", v:"  Choose: 3"},
      {t:"out",v:"  [1] C→F  [2] F→C  [3] C→K  [4] K→C"},
      {t:"in", v:"  Choose: 1"},
      {t:"in", v:"  Value: 100"},
      {t:"out",v:"  = 212.0000 °F"},
    ]
  },

  "clipboard-saver": {
    difficulty:"intermediate", requires:["pyperclip"], version:"1.0",
    demo:[
      {t:"cmd",v:"python clipboard-saver.py"},
      {t:"out",v:"Monitoring clipboard. Saving to clipboard_log.txt. Ctrl+C to stop."},
      {t:"out",v:""},
      {t:"out",v:"  ✓ Saved (34 chars)"},
      {t:"out",v:"  ✓ Saved (112 chars)"},
      {t:"out",v:"  ✓ Saved (8 chars)"},
      {t:"out",v:""},
      {t:"out",v:"Stopped."},
    ]
  },

  "auto-backup": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python auto-backup.py"},
      {t:"in", v:"Folder to back up: /projects/myapp"},
      {t:"in", v:"Backup destination folder: /backups"},
      {t:"out",v:""},
      {t:"out",v:"Backing up to: /backups/myapp_backup_2025-05-14_10-32-01"},
      {t:"out",v:"✓ Backup complete!"},
    ]
  },

  "file-organizer": {
    difficulty:"beginner", requires:[], version:"1.2",
    demo:[
      {t:"cmd",v:"python file-organizer.py"},
      {t:"in", v:"Folder to organize: /Downloads"},
      {t:"out",v:"  resume.pdf  →  Documents/"},
      {t:"out",v:"  photo.jpg  →  Images/"},
      {t:"out",v:"  song.mp3  →  Audio/"},
      {t:"out",v:"  setup.zip  →  Archives/"},
      {t:"out",v:"  script.py  →  Code/"},
      {t:"out",v:""},
      {t:"out",v:"✓ Organized 5 file(s)."},
    ]
  },

  "screenshot-taker": {
    difficulty:"intermediate", requires:["pyautogui"], version:"1.0",
    demo:[
      {t:"cmd",v:"python screenshot-taker.py"},
      {t:"in", v:"Save screenshots to folder: /screenshots"},
      {t:"in", v:"Take screenshot every how many seconds? 5"},
      {t:"in", v:"How many screenshots total? (0 = infinite): 3"},
      {t:"out",v:""},
      {t:"out",v:"Taking screenshot every 5s. Ctrl+C to stop."},
      {t:"out",v:""},
      {t:"out",v:"  ✓ screenshot_20250514_103201.png"},
      {t:"out",v:"  ✓ screenshot_20250514_103206.png"},
      {t:"out",v:"  ✓ screenshot_20250514_103211.png"},
      {t:"out",v:""},
      {t:"out",v:"Done. 3 screenshot(s) saved."},
    ]
  },

  "email-sender": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python email-sender.py"},
      {t:"in", v:"Your Gmail address: you@gmail.com"},
      {t:"in", v:"App password: ****************"},
      {t:"in", v:"Recipient email: friend@email.com"},
      {t:"in", v:"Subject: Hello from terminal!"},
      {t:"in", v:"Message: Hey, sent this from the terminal!"},
      {t:"in", v:"END"},
      {t:"out",v:""},
      {t:"out",v:"✓ Email sent!"},
    ]
  },

  "rename-by-date": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python rename-by-date.py"},
      {t:"in", v:"Folder path: /photos"},
      {t:"in", v:"Filename prefix (e.g. photo): photo"},
      {t:"out",v:"  IMG_4821.jpg  →  photo_20250101_143022.jpg"},
      {t:"out",v:"  IMG_4822.jpg  →  photo_20250101_143145.jpg"},
      {t:"out",v:"  IMG_4823.jpg  →  photo_20250102_091233.jpg"},
      {t:"out",v:""},
      {t:"out",v:"Done. 3 file(s) renamed."},
    ]
  },

  "website-monitor": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python website-monitor.py"},
      {t:"in", v:"Website URL: https://mysite.com"},
      {t:"in", v:"Check every how many seconds? 60"},
      {t:"out",v:""},
      {t:"out",v:"Monitoring https://mysite.com every 60s."},
      {t:"out",v:""},
      {t:"out",v:"  [10:00:00] ✓ Up"},
      {t:"out",v:"  [10:01:00] ✓ Up"},
      {t:"out",v:"  [10:02:00] ❌ https://mysite.com is DOWN!"},
      {t:"out",v:"  [10:03:00] ✅ https://mysite.com is BACK UP!"},
    ]
  },

  "webpage-to-pdf": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python webpage-to-pdf.py"},
      {t:"in", v:"URL to download: https://example.com"},
      {t:"in", v:"Output filename (leave blank for auto):"},
      {t:"out",v:""},
      {t:"out",v:"✓ Saved 1,256 bytes to: page_20250514_103500.html"},
    ]
  },

  "broken-link-checker": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python broken-link-checker.py"},
      {t:"in", v:"  URL: https://github.com"},
      {t:"in", v:"  URL: https://notarealsite99.xyz"},
      {t:"in", v:"  URL: https://google.com"},
      {t:"in", v:"  URL: (blank — done)"},
      {t:"out",v:""},
      {t:"out",v:"  ✅ 200  https://github.com"},
      {t:"out",v:"  ❌ ERR  https://notarealsite99.xyz"},
      {t:"out",v:"  ✅ 200  https://google.com"},
    ]
  },

  "json-formatter": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python json-formatter.py"},
      {t:"in", v:'Paste your JSON: {"name":"Alice","age":30}'},
      {t:"out",v:""},
      {t:"out",v:'{'},
      {t:"out",v:'  "name": "Alice",'},
      {t:"out",v:'  "age": 30'},
      {t:"out",v:'}'},
    ]
  },

  "url-shortener": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python url-shortener.py"},
      {t:"in", v:"URL to shorten: https://github.com/CrazyCoderX0135/scripthub"},
      {t:"out",v:""},
      {t:"out",v:"✓ Shortened URL: https://tinyurl.com/ycx8mz4p"},
    ]
  },

  "number-guesser": {
    difficulty:"beginner", requires:[], version:"1.1",
    demo:[
      {t:"cmd",v:"python number-guesser.py"},
      {t:"in", v:"Difficulty: [1] Easy  [2] Medium  [3] Hard: 2"},
      {t:"out",v:""},
      {t:"out",v:"Guess a number between 1 and 100."},
      {t:"out",v:""},
      {t:"in", v:"  Your guess: 50"},
      {t:"out",v:"  📈 Too low!"},
      {t:"in", v:"  Your guess: 75"},
      {t:"out",v:"  📉 Too high!"},
      {t:"in", v:"  Your guess: 63"},
      {t:"out",v:"  🎉 Correct! It was 63. You got it in 3 guess(es)."},
    ]
  },

  "hangman": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python hangman.py"},
      {t:"out",v:"  +---+"},
      {t:"out",v:"  |   |"},
      {t:"out",v:"      |"},
      {t:"out",v:"      |"},
      {t:"out",v:"========="},
      {t:"out",v:""},
      {t:"out",v:"  Word: _ _ _ _ _ _"},
      {t:"in", v:"  Guess a letter: p"},
      {t:"out",v:"  Word: p _ _ _ _ _"},
      {t:"in", v:"  Guess a letter: y"},
      {t:"out",v:"  Word: p y _ _ _ _"},
      {t:"out",v:""},
      {t:"out",v:"  🎉 You won!"},
    ]
  },

  "rock-paper-scissors": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python rock-paper-scissors.py"},
      {t:"out",v:"Rock Paper Scissors — type 'quit' to stop"},
      {t:"out",v:""},
      {t:"in", v:"Your move: rock"},
      {t:"out",v:"  Computer: scissors"},
      {t:"out",v:"  You win! 🎉"},
      {t:"out",v:"  Score → You: 1  Computer: 0  Ties: 0"},
      {t:"in", v:"Your move: paper"},
      {t:"out",v:"  Computer: paper"},
      {t:"out",v:"  Tie!"},
      {t:"out",v:"  Score → You: 1  Computer: 0  Ties: 1"},
    ]
  },

  "trivia-quiz": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python trivia-quiz.py"},
      {t:"out",v:""},
      {t:"out",v:"🧠 Trivia Quiz — 10 questions"},
      {t:"out",v:""},
      {t:"out",v:"Q1: What is the capital of France?"},
      {t:"out",v:"  1. Berlin  2. Paris  3. Madrid  4. London"},
      {t:"in", v:"Your answer (number): 2"},
      {t:"out",v:"  ✅ Correct!"},
      {t:"out",v:""},
      {t:"out",v:"..."},
      {t:"out",v:""},
      {t:"out",v:"🏆 Final Score: 8/10"},
    ]
  },

  "word-scramble": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python word-scramble.py"},
      {t:"out",v:"  Round 1 | ⏱ 12s | Scrambled: NOTHPY"},
      {t:"in", v:"  Your answer: python"},
      {t:"out",v:"  ✅ Correct! +1"},
      {t:"out",v:""},
      {t:"out",v:"  Round 2 | ⏱ 11s | Scrambled: LABEDISAT"},
      {t:"in", v:"  Your answer: database"},
      {t:"out",v:"  ✅ Correct! +1"},
      {t:"out",v:""},
      {t:"out",v:"🏆 Final score: 5/7"},
    ]
  },

  // ── FILE TOOLS ──────────────────────────────────────────────
  "word-counter": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python word-counter.py"},
      {t:"in", v:"Text file path: essay.txt"},
      {t:"out",v:""},
      {t:"out",v:"📄 essay.txt"},
      {t:"out",v:"  Words:       1,247"},
      {t:"out",v:"  Lines:       84"},
      {t:"out",v:"  Characters:  7,431 (6,012 without spaces)"},
      {t:"out",v:"  Sentences:   62"},
    ]
  },

  "find-large-files": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python find-large-files.py"},
      {t:"in", v:"Folder to scan: /home/user"},
      {t:"in", v:"Minimum size in MB: 100"},
      {t:"out",v:""},
      {t:"out",v:"      Size  Path"},
      {t:"out",v:"  4,096.0 MB  /home/user/Videos/movie.mkv"},
      {t:"out",v:"    512.3 MB  /home/user/Downloads/ubuntu.iso"},
      {t:"out",v:"    200.1 MB  /home/user/backup.zip"},
      {t:"out",v:""},
      {t:"out",v:"Found 3 file(s)."},
    ]
  },

  "file-hasher": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python file-hasher.py"},
      {t:"in", v:"File path: ubuntu.iso"},
      {t:"in", v:"Hash algorithm (md5 / sha1 / sha256): sha256"},
      {t:"out",v:""},
      {t:"out",v:"  SHA256: a8e9935e45a1a03c8d7c81c1e..."},
      {t:"in", v:"Paste a hash to compare (blank to skip): a8e9935e45a1a03c8d7c81c1e..."},
      {t:"out",v:"  ✅ Match!"},
    ]
  },

  "batch-lowercase": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python batch-lowercase.py"},
      {t:"in", v:"Folder path: /photos"},
      {t:"out",v:"  IMG_001.JPG  →  img_001.jpg"},
      {t:"out",v:"  Photo_A.PNG  →  photo_a.png"},
      {t:"out",v:"  NOTES.TXT  →  notes.txt"},
      {t:"out",v:""},
      {t:"out",v:"Done. 3 file(s) renamed."},
    ]
  },

  "extension-counter": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python extension-counter.py"},
      {t:"in", v:"Folder to scan: /projects"},
      {t:"in", v:"Include subfolders? (y/n): y"},
      {t:"out",v:""},
      {t:"out",v:"Extension             Count"},
      {t:"out",v:"----------------------------"},
      {t:"out",v:"  .py                    42"},
      {t:"out",v:"  .json                  18"},
      {t:"out",v:"  .html                   9"},
      {t:"out",v:"  .css                    4"},
      {t:"out",v:""},
      {t:"out",v:"Total files: 73"},
    ]
  },

  "find-old-files": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python find-old-files.py"},
      {t:"in", v:"Folder to scan: /Downloads"},
      {t:"in", v:"Older than how many days? 180"},
      {t:"out",v:""},
      {t:"out",v:"   365 days  /Downloads/old_resume.pdf"},
      {t:"out",v:"   210 days  /Downloads/setup_2023.exe"},
      {t:"out",v:"   188 days  /Downloads/notes_old.txt"},
      {t:"out",v:""},
      {t:"out",v:"Found 3 old file(s)."},
    ]
  },

  "line-counter": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python line-counter.py"},
      {t:"in", v:"Project folder: /myapp"},
      {t:"in", v:"File extensions (e.g. .py .js .html, blank=all): .py .js"},
      {t:"out",v:""},
      {t:"out",v:"Extension         Lines"},
      {t:"out",v:"-------------------------"},
      {t:"out",v:"  .py             2,341"},
      {t:"out",v:"  .js               891"},
      {t:"out",v:""},
      {t:"out",v:"  TOTAL           3,232"},
    ]
  },

  "file-encryptor": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python file-encryptor.py"},
      {t:"in", v:"Encrypt or Decrypt? (e/d): e"},
      {t:"in", v:"File path: secret.txt"},
      {t:"in", v:"Password: mypassword123"},
      {t:"out",v:""},
      {t:"out",v:"✅ Encrypted: secret.txt.enc"},
    ]
  },

  "empty-folder-finder": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python empty-folder-finder.py"},
      {t:"in", v:"Root folder to scan: /projects"},
      {t:"out",v:""},
      {t:"out",v:"Found 3 empty folder(s):"},
      {t:"out",v:"  /projects/old/temp"},
      {t:"out",v:"  /projects/build/cache"},
      {t:"out",v:"  /projects/test/__old"},
      {t:"in", v:"Delete all? (yes/no): yes"},
      {t:"out",v:"Deleted 3 folder(s)."},
    ]
  },

  "txt-splitter": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python txt-splitter.py"},
      {t:"in", v:"Text file path: bigfile.txt"},
      {t:"in", v:"Lines per chunk: 1000"},
      {t:"out",v:""},
      {t:"out",v:"Splitting 4,231 lines into 5 file(s)..."},
      {t:"out",v:"  ✓ bigfile_part001.txt (1,000 lines)"},
      {t:"out",v:"  ✓ bigfile_part002.txt (1,000 lines)"},
      {t:"out",v:"  ✓ bigfile_part003.txt (1,000 lines)"},
      {t:"out",v:"  ✓ bigfile_part004.txt (1,000 lines)"},
      {t:"out",v:"  ✓ bigfile_part005.txt (231 lines)"},
      {t:"out",v:"Done."},
    ]
  },

  // ── UTILITIES ────────────────────────────────────────────────
  "dice-roller": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python dice-roller.py"},
      {t:"out",v:"🎲 Dice Roller — type 'quit' to exit"},
      {t:"in", v:"Roll: 2d6"},
      {t:"out",v:"  [4 + 6] = 10"},
      {t:"in", v:"Roll: 1d20"},
      {t:"out",v:"  [17] = 17"},
      {t:"in", v:"Roll: 3d8+5"},
      {t:"out",v:"  [3 + 7 + 5] +5 = 20"},
    ]
  },

  "todo-cli": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python todo-cli.py"},
      {t:"out",v:"📋 Todo CLI  |  Commands: add, list, done, delete, clear, quit"},
      {t:"in", v:"todo> add buy groceries"},
      {t:"out",v:"  Added: buy groceries"},
      {t:"in", v:"todo> add finish project"},
      {t:"out",v:"  Added: finish project"},
      {t:"in", v:"todo> list"},
      {t:"out",v:"  [1] ⬜ buy groceries"},
      {t:"out",v:"  [2] ⬜ finish project"},
      {t:"in", v:"todo> done 1"},
      {t:"out",v:"  ✅ Done: buy groceries"},
    ]
  },

  "pomodoro": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python pomodoro.py"},
      {t:"in", v:"Work minutes (default 25): 25"},
      {t:"in", v:"Break minutes (default 5): 5"},
      {t:"in", v:"How many Pomodoros? 3"},
      {t:"out",v:""},
      {t:"out",v:"─── Pomodoro 1/3 ───"},
      {t:"out",v:"  🍅 Work block (25 min)"},
      {t:"out",v:"  ⏱  24:59 remaining"},
      {t:"out",v:"  ..."},
      {t:"out",v:"  ✅ Work block (25 min) complete!"},
    ]
  },

  "binary-converter": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python binary-converter.py"},
      {t:"in", v:"From (bin/dec/hex/oct): dec"},
      {t:"in", v:"Value: 42"},
      {t:"out",v:"  Binary:      0b101010"},
      {t:"out",v:"  Octal:       0o52"},
      {t:"out",v:"  Decimal:     42"},
      {t:"out",v:"  Hexadecimal: 0x2A"},
    ]
  },

  "caesar-cipher": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python caesar-cipher.py"},
      {t:"in", v:"Encode or Decode? (e/d/quit): e"},
      {t:"in", v:"Text: Hello World"},
      {t:"in", v:"Shift (1-25): 13"},
      {t:"out",v:"  Result: Uryyb Jbeyq"},
      {t:"in", v:"Encode or Decode? (e/d/quit): d"},
      {t:"in", v:"Text: Uryyb Jbeyq"},
      {t:"in", v:"Shift (1-25): 13"},
      {t:"out",v:"  Result: Hello World"},
    ]
  },

  "uuid-generator": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python uuid-generator.py"},
      {t:"in", v:"Version (1/4 — recommended: 4): 4"},
      {t:"in", v:"How many UUIDs? 3"},
      {t:"out",v:""},
      {t:"out",v:"  550e8400-e29b-41d4-a716-446655440000"},
      {t:"out",v:"  6ba7b810-9dad-11d1-80b4-00c04fd430c8"},
      {t:"out",v:"  7c9e6679-7425-40de-944b-e07fc1f90ae7"},
      {t:"out",v:""},
      {t:"out",v:"Generated 3 UUID(s)."},
    ]
  },

  "word-frequency": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python word-frequency.py"},
      {t:"in", v:"Text file path: article.txt"},
      {t:"in", v:"Show top N words (e.g. 20): 5"},
      {t:"out",v:""},
      {t:"out",v:"Word                  Count  Bar"},
      {t:"out",v:"--------------------------------------------------"},
      {t:"out",v:"  python               42  ██████████"},
      {t:"out",v:"  data                 31  ████████"},
      {t:"out",v:"  code                 28  ███████"},
    ]
  },

  "ascii-banner": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python ascii-banner.py"},
      {t:"in", v:"Text (A-Z only): HI"},
      {t:"out",v:""},
      {t:"out",v:"  o   o  ooooo"},
      {t:"out",v:"  o   o    o  "},
      {t:"out",v:"  oooo o    o  "},
      {t:"out",v:"  o   o    o  "},
      {t:"out",v:"  o   o  ooooo"},
    ]
  },

  "age-calculator": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python age-calculator.py"},
      {t:"in", v:"Enter your birthday (YYYY-MM-DD): 1995-07-20"},
      {t:"out",v:""},
      {t:"out",v:"🎂 You are:"},
      {t:"out",v:"  29 years, 9 months old"},
      {t:"out",v:"  10,893 days"},
      {t:"out",v:"  261,432 hours"},
      {t:"out",v:"  15,685,920 minutes"},
      {t:"out",v:""},
      {t:"out",v:"  🎁 Next birthday in 109 day(s)!"},
    ]
  },

  "anagram-checker": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python anagram-checker.py"},
      {t:"in", v:"Word / phrase 1 (or 'quit'): listen"},
      {t:"in", v:"Word / phrase 2: silent"},
      {t:"out",v:"  ✅ Yes! 'listen' and 'silent' are anagrams."},
      {t:"in", v:"Word / phrase 1 (or 'quit'): hello"},
      {t:"in", v:"Word / phrase 2: world"},
      {t:"out",v:"  ❌ Not anagrams. Different letters: d, h, r, w"},
    ]
  },

  "morse-code": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python morse-code.py"},
      {t:"in", v:"Encode (e) or Decode (d) or quit: e"},
      {t:"in", v:"Input: SOS"},
      {t:"out",v:"  Morse: ... --- ..."},
      {t:"in", v:"Encode (e) or Decode (d) or quit: d"},
      {t:"in", v:"Input: .... . .-.. .-.. ---"},
      {t:"out",v:"  Text: HELLO"},
    ]
  },

  "coin-flipper": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python coin-flipper.py"},
      {t:"in", v:"How many flips? 100"},
      {t:"out",v:""},
      {t:"out",v:"🪙 Results of 100 flips:"},
      {t:"out",v:"  Heads     53 (53.0%)  ████████████████"},
      {t:"out",v:"  Tails     47 (47.0%)  ██████████████"},
    ]
  },

  "random-quote": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python random-quote.py"},
      {t:"out",v:""},
      {t:"out",v:"💬 The only way to do great work is to love what you do."},
      {t:"out",v:"     — Steve Jobs"},
    ]
  },

  "text-stats": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python text-stats.py"},
      {t:"out",v:"📊 Text Stats — paste text, type END on a new line when done:"},
      {t:"in", v:"The quick brown fox jumps over the lazy dog."},
      {t:"in", v:"END"},
      {t:"out",v:""},
      {t:"out",v:"  Words:         9"},
      {t:"out",v:"  Sentences:     1"},
      {t:"out",v:"  Avg words/sent:9.0"},
      {t:"out",v:"  Reading time:  ~1 min"},
      {t:"out",v:"  Readability:   72.4/100 — Easy (6th-7th grade)"},
    ]
  },

  // ── AUTOMATION ───────────────────────────────────────────────
  "system-info": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python system-info.py"},
      {t:"out",v:""},
      {t:"out",v:"💻 System Information"},
      {t:"out",v:"========================================"},
      {t:"out",v:"  OS:          Linux 6.1.0"},
      {t:"out",v:"  Machine:     x86_64"},
      {t:"out",v:"  Python:      3.11.5"},
      {t:"out",v:"  Hostname:    my-laptop"},
      {t:"out",v:""},
      {t:"out",v:"  Disk Total:  512.0 GB"},
      {t:"out",v:"  Disk Free:   234.7 GB"},
      {t:"out",v:"  CPU Cores:   8"},
    ]
  },

  "port-checker": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python port-checker.py"},
      {t:"in", v:"Host (e.g. google.com or 192.168.1.1): google.com"},
      {t:"in", v:"Port(s) to check (e.g. 80 443 22): 80 443 22"},
      {t:"out",v:""},
      {t:"out",v:"  ✅ google.com:80   OPEN"},
      {t:"out",v:"  ✅ google.com:443  OPEN"},
      {t:"out",v:"  ❌ google.com:22   CLOSED"},
    ]
  },

  "ping-sweep": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python ping-sweep.py"},
      {t:"in", v:"Enter hosts to ping (space-separated): google.com github.com badhost.xyz"},
      {t:"out",v:""},
      {t:"out",v:"  ✅ google.com  UP"},
      {t:"out",v:"  ✅ github.com  UP"},
      {t:"out",v:"  ❌ badhost.xyz  DOWN"},
      {t:"out",v:""},
      {t:"out",v:"Up: 2  Down: 1"},
    ]
  },

  "temp-file-finder": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python temp-file-finder.py"},
      {t:"in", v:"Folder to scan: /projects"},
      {t:"out",v:""},
      {t:"out",v:"Found 4 junk file(s):"},
      {t:"out",v:"       0 B  /projects/__pycache__/"},
      {t:"out",v:"    1024 B  /projects/debug.log"},
      {t:"out",v:"     512 B  /projects/tmp_output.tmp"},
    ]
  },

  "scheduled-shutdown": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python scheduled-shutdown.py"},
      {t:"in", v:"Action: [1] Shutdown  [2] Restart: 1"},
      {t:"in", v:"In how many minutes? 30"},
      {t:"out",v:""},
      {t:"out",v:"⏻ Scheduled shutdown in 30 minute(s)."},
      {t:"out",v:"  Press Ctrl+C to cancel."},
      {t:"out",v:""},
      {t:"out",v:"  ⏱  29:59 remaining"},
    ]
  },

  "cpu-monitor": {
    difficulty:"intermediate", requires:["psutil"], version:"1.0",
    demo:[
      {t:"cmd",v:"python cpu-monitor.py"},
      {t:"out",v:"📈 CPU Monitor — Ctrl+C to stop"},
      {t:"out",v:""},
      {t:"out",v:"  CPU  23.4%  ██████░░░░░░░░░░░░░░░░░░░   RAM  61.2%  ███████████████░░░░░░░░░░"},
      {t:"out",v:"  CPU  25.1%  ██████░░░░░░░░░░░░░░░░░░░   RAM  61.8%  ███████████████░░░░░░░░░░"},
    ]
  },

  "batch-image-rename": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python batch-image-rename.py"},
      {t:"in", v:"Folder with images: /photos"},
      {t:"in", v:"Filename prefix (e.g. photo): vacation"},
      {t:"in", v:"Start number (e.g. 1): 1"},
      {t:"out",v:"  IMG_4821.jpg  →  vacation_001.jpg"},
      {t:"out",v:"  IMG_4822.jpg  →  vacation_002.jpg"},
      {t:"out",v:"  IMG_4823.png  →  vacation_003.png"},
      {t:"out",v:""},
      {t:"out",v:"Done. 3 image(s) renamed."},
    ]
  },

  "log-analyzer": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python log-analyzer.py"},
      {t:"in", v:"Log file path: app.log"},
      {t:"out",v:""},
      {t:"out",v:"📋 Log Summary (4,231 lines)"},
      {t:"out",v:"  Errors:   14"},
      {t:"out",v:"  Warnings: 38"},
      {t:"out",v:"  Info:     127"},
      {t:"out",v:""},
      {t:"out",v:"  — Top Errors —"},
      {t:"out",v:"  [5x] ERROR: Connection timeout"},
      {t:"out",v:"  [3x] ERROR: NullPointerException at line 42"},
    ]
  },

  "git-status-check": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python git-status-check.py"},
      {t:"out",v:""},
      {t:"out",v:"🌿 Git Status"},
      {t:"out",v:"  Branch: main"},
      {t:"out",v:""},
      {t:"out",v:"  Staged       2 file(s)"},
      {t:"out",v:"    · scripts.js"},
      {t:"out",v:"    · style.css"},
      {t:"out",v:"  Modified     1 file(s)"},
      {t:"out",v:"  Untracked    clean"},
    ]
  },

  "file-monitor": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python file-monitor.py"},
      {t:"in", v:"Folder to watch: /projects"},
      {t:"out",v:""},
      {t:"out",v:"👁️  Watching /projects — Ctrl+C to stop"},
      {t:"out",v:""},
      {t:"out",v:"  ✨ CREATED  new_script.py"},
      {t:"out",v:"  ✏️  CHANGED  app.js"},
      {t:"out",v:"  🗑️  DELETED  old_notes.txt"},
    ]
  },

  // ── WEB ──────────────────────────────────────────────────────
  "random-joke": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python random-joke.py"},
      {t:"out",v:""},
      {t:"out",v:"😂 Why do programmers prefer dark mode?"},
      {t:"in", v:"(press Enter for punchline)"},
      {t:"out",v:""},
      {t:"out",v:"  👉 Because light attracts bugs!"},
    ]
  },

  "word-definition": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python word-definition.py"},
      {t:"in", v:"Word to define (or 'quit'): serendipity"},
      {t:"out",v:""},
      {t:"out",v:"📖 serendipity"},
      {t:"out",v:""},
      {t:"out",v:"  [noun]"},
      {t:"out",v:"    · The occurrence of events by chance in a happy way."},
      {t:"out",v:"      e.g. A fortunate stroke of serendipity."},
    ]
  },

  "crypto-price": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python crypto-price.py"},
      {t:"in", v:"Coins (e.g. bitcoin ethereum solana): bitcoin ethereum"},
      {t:"out",v:""},
      {t:"out",v:"  BITCOIN        $67,432.10   ▲ 2.41%"},
      {t:"out",v:"  ETHEREUM        $3,521.88   ▼ 0.83%"},
    ]
  },

  "internet-check": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python internet-check.py"},
      {t:"out",v:""},
      {t:"out",v:"🌐 Internet Connectivity Check"},
      {t:"out",v:""},
      {t:"out",v:"  ✅ Google          42 ms"},
      {t:"out",v:"  ✅ Cloudflare      18 ms"},
      {t:"out",v:"  ✅ GitHub          91 ms"},
      {t:"out",v:""},
      {t:"out",v:"  Status: 🟢 Online"},
    ]
  },

  "github-user": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python github-user.py"},
      {t:"in", v:"GitHub username: torvalds"},
      {t:"out",v:""},
      {t:"out",v:"🐙 GitHub: torvalds"},
      {t:"out",v:"  Name:       Linus Torvalds"},
      {t:"out",v:"  Location:   Portland, OR"},
      {t:"out",v:"  Public repos: 8"},
      {t:"out",v:"  Followers:    214,000"},
    ]
  },

  "ip-geolocate": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python ip-geolocate.py"},
      {t:"in", v:"IP address (leave blank for your own): 8.8.8.8"},
      {t:"out",v:""},
      {t:"out",v:"📍 IP: 8.8.8.8"},
      {t:"out",v:"  Country:  United States"},
      {t:"out",v:"  Region:   California"},
      {t:"out",v:"  City:     Mountain View"},
      {t:"out",v:"  ISP:      Google LLC"},
      {t:"out",v:"  Lat/Lon:  37.422, -122.084"},
    ]
  },

  "dns-lookup": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python dns-lookup.py"},
      {t:"in", v:"Domain to look up: github.com"},
      {t:"out",v:""},
      {t:"out",v:"🔍 DNS Lookup: github.com"},
      {t:"out",v:""},
      {t:"out",v:"  A record:     140.82.121.4"},
      {t:"out",v:"  Address:      140.82.121.4"},
      {t:"out",v:"  Reverse DNS:  lb-140-82-121-4-fra.github.com"},
    ]
  },

  "ssl-expiry": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python ssl-expiry.py"},
      {t:"in", v:"Domain(s) to check (e.g. google.com github.com): google.com github.com mysite.com"},
      {t:"out",v:""},
      {t:"out",v:"  ✅ google.com                   expires 2025-10-28  (167 days)"},
      {t:"out",v:"  ✅ github.com                   expires 2025-09-14  (123 days)"},
      {t:"out",v:"  🚨 mysite.com                   expires 2025-05-20  (5 days)"},
    ]
  },

  "http-headers": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python http-headers.py"},
      {t:"in", v:"URL (include https://): https://github.com"},
      {t:"out",v:""},
      {t:"out",v:"📨 HTTP Headers for: https://github.com"},
      {t:"out",v:"  Status: 200"},
      {t:"out",v:""},
      {t:"out",v:"  Content-Type                   text/html; charset=utf-8"},
      {t:"out",v:"  X-Frame-Options                deny"},
      {t:"out",v:"  Strict-Transport-Security      max-age=31536000"},
    ]
  },

  "random-fact": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python random-fact.py"},
      {t:"out",v:""},
      {t:"out",v:"🧠 Random Fact:"},
      {t:"out",v:""},
      {t:"out",v:"  A group of flamingos is called a flamboyance."},
    ]
  },

  // ── GAMES ────────────────────────────────────────────────────
  "tic-tac-toe": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python tic-tac-toe.py"},
      {t:"out",v:""},
      {t:"out",v:"  · │ · │ ·"},
      {t:"out",v:"  ──┼───┼──"},
      {t:"out",v:"  · │ · │ ·"},
      {t:"out",v:"  ──┼───┼──"},
      {t:"out",v:"  · │ · │ ·"},
      {t:"in", v:"  Player X — enter position (1-9): 5"},
      {t:"out",v:""},
      {t:"out",v:"  🎉 Player X wins!"},
    ]
  },

  "blackjack": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python blackjack.py"},
      {t:"out",v:"💰 Balance: $100"},
      {t:"in", v:"  Bet: $20"},
      {t:"out",v:"  Dealer: K♠ ??  (?)"},
      {t:"out",v:"  You   : 7♥ 9♦  (16)"},
      {t:"in", v:"  [h]it / [s]tand: h"},
      {t:"out",v:"  You   : 7♥ 9♦ 5♠  (21)"},
      {t:"out",v:"  Dealer: K♠ 6♣  (16)"},
      {t:"out",v:"  ✅ You win!"},
    ]
  },

  "wordle": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python wordle.py"},
      {t:"out",v:"🟩 WORDLE — guess the 5-letter word!"},
      {t:"in", v:"  Guess 1/6: crane"},
      {t:"out",v:"   C   R   A   N   E "},
      {t:"in", v:"  Guess 2/6: brave"},
      {t:"out",v:"   B   R   A   V   E "},
      {t:"in", v:"  Guess 3/6: grace"},
      {t:"out",v:"  🎉 You got it in 3 tries!"},
    ]
  },

  "typing-speed": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python typing-speed.py"},
      {t:"out",v:"⌨️  Typing Speed Test"},
      {t:"out",v:""},
      {t:"out",v:"  Type this text exactly:"},
      {t:"out",v:"  \"python is a high level general purpose programming language\""},
      {t:"in", v:"  Press Enter when ready..."},
      {t:"out",v:"  GO!"},
      {t:"in", v:"python is a high level general purpose programming language"},
      {t:"out",v:"  ⏱  Time:     14.2s"},
      {t:"out",v:"  💨 WPM:      61"},
      {t:"out",v:"  ✅ Accuracy: 100.0%"},
    ]
  },

  "higher-lower": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python higher-lower.py"},
      {t:"out",v:"📊 Higher or Lower — guess a number between 1 and 100"},
      {t:"in", v:"  Your guess: 50"},
      {t:"out",v:"  📈 Higher!"},
      {t:"in", v:"  Your guess: 75"},
      {t:"out",v:"  📉 Lower!"},
      {t:"in", v:"  Your guess: 62"},
      {t:"out",v:"  🎉 Correct! (3 guesses) | Score: 7 | Best: 3"},
    ]
  },

  "text-adventure": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python text-adventure.py"},
      {t:"out",v:"🗺️  TEXT ADVENTURE  — commands: go <dir>, take, look, inventory, quit"},
      {t:"out",v:"  You are at a stone entrance. Passages lead NORTH and EAST."},
      {t:"in", v:"> go north"},
      {t:"out",v:"  A dark forest. A SWORD glints on the ground. Exit SOUTH."},
      {t:"in", v:"> take"},
      {t:"out",v:"  Picked up: sword"},
      {t:"in", v:"> go south"},
      {t:"in", v:"> go east"},
      {t:"out",v:"  A damp cave. A DRAGON blocks the path north."},
      {t:"in", v:"> go north"},
      {t:"out",v:"  🏆 You found the TREASURE ROOM! You win!"},
    ]
  },

  "math-quiz": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python math-quiz.py"},
      {t:"in", v:"Difficulty: [1] Easy  [2] Medium  [3] Hard: 2"},
      {t:"in", v:"How many questions? 5"},
      {t:"out",v:"  Q1: 34 + 18 = "},
      {t:"in", v:"52"},
      {t:"out",v:"  ✅ Correct!"},
      {t:"out",v:"  Q2: 67 * 4 = "},
      {t:"in", v:"268"},
      {t:"out",v:"  ✅ Correct!"},
      {t:"out",v:""},
      {t:"out",v:"🏆 Score: 4/5  Time: 18.3s  Avg: 3.7s/q"},
    ]
  },

  "slot-machine": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python slot-machine.py"},
      {t:"out",v:"🎰 Slot Machine — Ctrl+C to quit"},
      {t:"out",v:"  Credits: 100"},
      {t:"in", v:"  Bet: 10"},
      {t:"out",v:""},
      {t:"out",v:"  | 🍒 | ⭐ | 🍋 |"},
      {t:"out",v:"  ❌ No match. -10 credits."},
      {t:"out",v:"  Credits: 90"},
      {t:"in", v:"  Bet: 10"},
      {t:"out",v:"  | 💎 | 💎 | 💎 |"},
      {t:"out",v:"  🎉 JACKPOT! ×20 → +200 credits!"},
    ]
  },

  "memory-game": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python memory-game.py"},
      {t:"out",v:"🧠 Memory Game — match all pairs!"},
      {t:"out",v:""},
      {t:"out",v:"    1  2  3  4"},
      {t:"out",v:"  1 ?  ?  ?  ?"},
      {t:"out",v:"  2 ?  ?  ?  ?"},
      {t:"in", v:"  Pick card 1: 1 1"},
      {t:"in", v:"  Pick card 2: 2 3"},
      {t:"out",v:"  ✅ Match!"},
    ]
  },

  "connect-four": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python connect-four.py"},
      {t:"out",v:"  1 2 3 4 5 6 7"},
      {t:"out",v:"  · · · · · · ·"},
      {t:"out",v:"  · · · · · · ·"},
      {t:"out",v:"  · · · · · · ·"},
      {t:"in", v:"> 4"},
      {t:"out",v:"  Player 2 (🔴) — pick column (1-7)"},
      {t:"in", v:"> 4"},
      {t:"out",v:"  🎉 Player 1 wins!"},
    ]
  },

  // ── MATH ─────────────────────────────────────────────────────
  "statistics-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python statistics-calc.py"},
      {t:"in", v:"Enter numbers separated by spaces: 4 7 13 2 7 9 1"},
      {t:"out",v:""},
      {t:"out",v:"📊 Statistics (7 numbers):"},
      {t:"out",v:"  Count:         7"},
      {t:"out",v:"  Sum:           43.0000"},
      {t:"out",v:"  Mean:          6.1429"},
      {t:"out",v:"  Median:        7.0000"},
      {t:"out",v:"  Mode:          7.0"},
      {t:"out",v:"  Std Deviation: 3.7859"},
    ]
  },

  "prime-sieve": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python prime-sieve.py"},
      {t:"in", v:"Find all primes up to: 50"},
      {t:"out",v:""},
      {t:"out",v:"🔢 Primes up to 50: 15 found"},
      {t:"out",v:""},
      {t:"out",v:"      2       3       5       7      11      13      17      19      23      29"},
      {t:"out",v:"     31      37      41      43      47"},
      {t:"out",v:""},
      {t:"out",v:"  Largest prime: 47"},
    ]
  },

  "fibonacci-gen": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python fibonacci-gen.py"},
      {t:"in", v:"Generate by [1] number of terms or [2] max value: 1"},
      {t:"in", v:"Number of terms: 8"},
      {t:"out",v:""},
      {t:"out",v:"🌀 Fibonacci (8 terms):"},
      {t:"out",v:"  F(  1) = 0"},
      {t:"out",v:"  F(  2) = 1"},
      {t:"out",v:"  F(  3) = 1"},
      {t:"out",v:"  F(  4) = 2"},
      {t:"out",v:"  ..."},
      {t:"out",v:"  F(  8) = 13"},
      {t:"out",v:""},
      {t:"out",v:"  Golden ratio approx: 1.61538462"},
    ]
  },

  "mortgage-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python mortgage-calc.py"},
      {t:"in", v:"Loan amount ($): 300000"},
      {t:"in", v:"Annual interest rate (%): 6.5"},
      {t:"in", v:"Loan term (years): 30"},
      {t:"out",v:""},
      {t:"out",v:"🏠 Mortgage Summary"},
      {t:"out",v:"  Loan Amount:     $   300,000.00"},
      {t:"out",v:"  Interest Rate:   6.50% per year"},
      {t:"out",v:"  Monthly Payment: $     1,896.20"},
      {t:"out",v:"  Total Interest:  $   382,633.00"},
    ]
  },

  "compound-interest": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python compound-interest.py"},
      {t:"in", v:"Principal ($): 10000"},
      {t:"in", v:"Annual rate (%): 7"},
      {t:"in", v:"Compounding times per year: 12"},
      {t:"in", v:"Number of years: 5"},
      {t:"out",v:""},
      {t:"out",v:"  Year     Balance     Interest Earned"},
      {t:"out",v:"  -----------------------------------"},
      {t:"out",v:"     1  $10,722.90         $722.90"},
      {t:"out",v:"     5  $14,176.25       $4,176.25"},
      {t:"out",v:""},
      {t:"out",v:"  Growth Factor:   1.42x"},
    ]
  },

  "bmi-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python bmi-calc.py"},
      {t:"in", v:"Units: [1] Metric (kg/cm)  [2] Imperial (lbs/in): 1"},
      {t:"in", v:"Weight (kg): 75"},
      {t:"in", v:"Height (cm): 178"},
      {t:"out",v:""},
      {t:"out",v:"⚖️  BMI Results:"},
      {t:"out",v:"  BMI:      23.7"},
      {t:"out",v:"  Category: Normal weight"},
    ]
  },

  "quadratic-solver": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python quadratic-solver.py"},
      {t:"out",v:"📐 Quadratic Equation Solver: ax² + bx + c = 0"},
      {t:"in", v:"  a = 1"},
      {t:"in", v:"  b = -5"},
      {t:"in", v:"  c = 6"},
      {t:"out",v:""},
      {t:"out",v:"  Equation: 1.0x² + -5.0x + 6.0 = 0"},
      {t:"out",v:"  Discriminant: 1.0000"},
      {t:"out",v:"  → Two distinct real roots"},
      {t:"out",v:"  x₁ = 3.0000"},
      {t:"out",v:"  x₂ = 2.0000"},
    ]
  },

  "tip-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python tip-calc.py"},
      {t:"in", v:"Bill total ($): 84.50"},
      {t:"in", v:"Tip percentage (%): 20"},
      {t:"in", v:"Number of people: 4"},
      {t:"out",v:""},
      {t:"out",v:"🍽️  Bill Breakdown"},
      {t:"out",v:"  Bill:          $84.50"},
      {t:"out",v:"  Tip (20%):     $16.90"},
      {t:"out",v:"  Total:        $101.40"},
      {t:"out",v:"  ─────────────────────"},
      {t:"out",v:"  Per person:    $25.35"},
    ]
  },

  "area-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python area-calc.py"},
      {t:"out",v:"📏 Area & Perimeter Calculator"},
      {t:"out",v:"  [1] Circle  [2] Rectangle  [3] Triangle  ..."},
      {t:"in", v:"Pick a shape: 1"},
      {t:"in", v:"Radius: 5"},
      {t:"out",v:"  Area:          78.5398"},
      {t:"out",v:"  Circumference: 31.4159"},
    ]
  },

  "percentage-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python percentage-calc.py"},
      {t:"out",v:"💯 Percentage Calculator"},
      {t:"out",v:"  [1] What is X% of Y?  [2] X is what % of Y?  ..."},
      {t:"in", v:"Pick: 3"},
      {t:"in", v:"Original value: 80"},
      {t:"in", v:"New value: 100"},
      {t:"out",v:"  Change: 25.0000% increase"},
    ]
  },

  "grade-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python grade-calc.py"},
      {t:"in", v:"  Name (blank to finish): Midterm"},
      {t:"in", v:"  Score for Midterm: 85"},
      {t:"in", v:"  Max score: 100"},
      {t:"in", v:"  Weight (%): 40"},
      {t:"in", v:"  Name (blank to finish): Final"},
      {t:"in", v:"  Score for Final: 92"},
      {t:"in", v:"  Max score: 100"},
      {t:"in", v:"  Weight (%): 60"},
      {t:"in", v:"  Name (blank to finish): "},
      {t:"out",v:"  FINAL GRADE                              89.2%  → B"},
    ]
  },

  "matrix-calc": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python matrix-calc.py"},
      {t:"out",v:"🔢 Matrix Calculator"},
      {t:"out",v:"  [1] Add  [2] Subtract  [3] Multiply  [4] Transpose"},
      {t:"in", v:"Operation: 4"},
      {t:"in", v:"  Matrix A rows: 2"},
      {t:"in", v:"  Matrix A cols: 3"},
      {t:"in", v:"    1 2 3"},
      {t:"in", v:"    4 5 6"},
      {t:"out",v:"  Aᵀ:"},
      {t:"out",v:"     1.000     4.000"},
      {t:"out",v:"     2.000     5.000"},
      {t:"out",v:"     3.000     6.000"},
    ]
  },

  "loan-calc": {
    difficulty:"beginner", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python loan-calc.py"},
      {t:"in", v:"Loan balance ($): 10000"},
      {t:"in", v:"Annual interest rate (%): 5"},
      {t:"in", v:"Monthly payment ($): 200"},
      {t:"out",v:""},
      {t:"out",v:"  Loan Amount:    $  10,000.00"},
      {t:"out",v:"  Monthly Payment:$     200.00"},
      {t:"out",v:"  Payoff Time:    4 yr 9 mo (57 payments)"},
      {t:"out",v:"  Total Interest: $   1,349.12"},
    ]
  },

  "number-theory": {
    difficulty:"intermediate", requires:[], version:"1.0",
    demo:[
      {t:"cmd",v:"python number-theory.py"},
      {t:"in", v:"Enter number(s) (or 'quit'): 28 12"},
      {t:"out",v:""},
      {t:"out",v:"  🔢 28"},
      {t:"out",v:"    Prime?          No"},
      {t:"out",v:"    Perfect?        Yes"},
      {t:"out",v:"    Prime factors:  2 × 2 × 7"},
      {t:"out",v:"    Divisors:       [1, 2, 4, 7, 14, 28]"},
      {t:"out",v:""},
      {t:"out",v:"    GCD(28,12): 4"},
      {t:"out",v:"    LCM(28,12): 84"},
    ]
  },

  // ── SCIENCE ──────────────────────────────────────────────────
  "unit-science":    { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python unit-science.py"},{t:"in",v:"Category: 2"},{t:"in",v:"From: 1"},{t:"in",v:"To: 3"},{t:"in",v:"Value: 101325"},{t:"out",v:""},{t:"out",v:"  101325 Pa = 1 atm"}] },
  "planet-weight":   { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python planet-weight.py"},{t:"in",v:"Your weight on Earth (kg): 70"},{t:"out",v:""},{t:"out",v:"  Mercury    26.5 kg  █████"},{t:"out",v:"  Mars       26.4 kg  █████"},{t:"out",v:"  Earth      70.0 kg  ████████████████████"},{t:"out",v:"  Jupiter   165.5 kg  ██████████████████████████████"}] },
  "periodic-table":  { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python periodic-table.py"},{t:"in",v:"Element symbol or name: Au"},{t:"out",v:""},{t:"out",v:"  [Au]  Gold"},{t:"out",v:"  Atomic Number:  79"},{t:"out",v:"  Atomic Mass:    196.97 u"},{t:"out",v:"  Category:       transition metal"}] },
  "ohms-law":        { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python ohms-law.py"},{t:"in",v:"  V (Volts): 12"},{t:"in",v:"  I (Amps): "},{t:"in",v:"  R (Ohms): 4"},{t:"in",v:"  P (Watts): "},{t:"out",v:""},{t:"out",v:"  V = 12.0000 V"},{t:"out",v:"  I = 3.0000 A"},{t:"out",v:"  R = 4.0000 Ω"},{t:"out",v:"  P = 36.0000 W"}] },
  "speed-of-sound":  { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python speed-of-sound.py"},{t:"in",v:"Temperature (°C): 20"},{t:"out",v:""},{t:"out",v:"🔊 Speed of Sound at 20°C"},{t:"out",v:"  Air:     343.2 m/s  (1235.5 km/h)"},{t:"out",v:"  Water: 1,484.0 m/s"},{t:"out",v:"  Steel: 5,960.0 m/s"}] },
  "half-life":       { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python half-life.py"},{t:"in",v:"Initial amount (grams or units): 100"},{t:"in",v:"Half-life (years): 5730"},{t:"in",v:"Time elapsed (years): 11460"},{t:"out",v:""},{t:"out",v:"  Remaining:    25.000000 (25.0000%)"},{t:"out",v:"  Decayed:      75.000000"}] },
  "projectile":      { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python projectile.py"},{t:"in",v:"Initial velocity (m/s): 50"},{t:"in",v:"Launch angle (degrees): 45"},{t:"in",v:"Initial height (m, default 0): 0"},{t:"out",v:""},{t:"out",v:"  Max height:      63.76 m  (at t=3.61s)"},{t:"out",v:"  Range:           254.84 m"},{t:"out",v:"  Time of flight:  7.22 s"}] },
  "body-water":      { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python body-water.py"},{t:"in",v:"Sex (m/f): m"},{t:"in",v:"Age (years): 30"},{t:"in",v:"Weight (kg): 80"},{t:"in",v:"Height (cm): 178"},{t:"in",v:"Activity level [1] [2] [3]: 2"},{t:"out",v:""},{t:"out",v:"  Total Body Water: 44.8 litres (56.0% of body weight)"},{t:"out",v:"  Recommended daily intake: 3220 ml (3.2 L)"}] },
  "calorie-burn":    { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python calorie-burn.py"},{t:"in",v:"Your weight (kg): 75"},{t:"in",v:"Activity: 3"},{t:"in",v:"Duration (minutes): 30"},{t:"out",v:""},{t:"out",v:"🏃 Running (5mph) for 30 min"},{t:"out",v:"  Calories burned: 311 kcal"},{t:"out",v:"  Per minute:      10.4 kcal/min"}] },
  "tide-calculator": { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python tide-calculator.py"},{t:"in",v:"High tide height (m, e.g. 4.5): 4.5"},{t:"in",v:"Low tide height  (m, e.g. 0.5): 0.5"},{t:"in",v:"Tidal period (hours, typical 12.4): 12.4"},{t:"out",v:""},{t:"out",v:"  00:00   4.50 m  ██████████████████████████████"},{t:"out",v:"  06:00   2.50 m  ███████████████"},{t:"out",v:"  12:00   0.50 m  ███"}] },
  "ph-calculator":   { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python ph-calculator.py"},{t:"in",v:"Pick: 1"},{t:"in",v:"  [H+] concentration (mol/L): 0.001"},{t:"out",v:""},{t:"out",v:"  pH    = 3.0000  → Acidic"},{t:"out",v:"  pOH   = 11.0000"},{t:"out",v:"  [H+]  = 1.0000e-03 mol/L"},{t:"out",v:"  [OH-] = 1.0000e-11 mol/L"}] },

  // ── PRODUCTIVITY ─────────────────────────────────────────────
  "habit-tracker":   { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python habit-tracker.py"},{t:"in",v:"habit> add exercise"},{t:"out",v:"  ✅ Added habit: exercise"},{t:"in",v:"habit> log"},{t:"in",v:"  exercise? (y/n): y"},{t:"in",v:"habit> status"},{t:"out",v:"  ✅ exercise            streak: 3 days"}] },
  "journal":         { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python journal.py"},{t:"in",v:"journal> write"},{t:"in",v:"  Mood today (1-5 ⭐): 4"},{t:"in",v:"  Had a productive day coding..."},{t:"in",v:"  END"},{t:"out",v:"  ✅ Entry saved."},{t:"in",v:"journal> read 1"},{t:"out",v:"  ─── 2025-05-21 10:30  ⭐ 4"},{t:"out",v:"  Had a productive day coding..."}] },
  "budget-tracker":  { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python budget-tracker.py"},{t:"in",v:"budget> add"},{t:"in",v:"  Amount (negative = expense): -45.00"},{t:"in",v:"  Category: 1"},{t:"in",v:"  Note: groceries"},{t:"in",v:"budget> summary"},{t:"out",v:"  Expenses:  $    45.00"},{t:"out",v:"  food             $   -45.00  ███████"}] },
  "meeting-timer":   { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python meeting-timer.py"},{t:"in",v:"  Agenda item: Intro"},{t:"in",v:"  Minutes for 'Intro': 5"},{t:"in",v:"  Agenda item: Review"},{t:"in",v:"  Minutes for 'Review': 20"},{t:"in",v:"  Agenda item (blank to start): "},{t:"out",v:"  [1/2] Intro  (5 min)"},{t:"out",v:"  ⏱  04:59"}] },
  "note-taker":      { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python note-taker.py"},{t:"in",v:"notes> add"},{t:"in",v:"  Note text: buy coffee"},{t:"in",v:"  Tags: shopping"},{t:"in",v:"notes> list"},{t:"out",v:"  [  1] 05/21 10:31  buy coffee  #shopping"},{t:"in",v:"notes> search shopping"},{t:"out",v:"  [  1] buy coffee"}] },
  "goal-tracker":    { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python goal-tracker.py"},{t:"in",v:"goals> add"},{t:"in",v:"  Goal: Run a 5k"},{t:"in",v:"  Target (e.g. 100 for 100%): 5"},{t:"in",v:"  Unit: km run"},{t:"in",v:"  Deadline (YYYY-MM-DD): 2025-08-01"},{t:"out",v:"  🎯 Run a 5k"},{t:"out",v:"     █████░░░░░░░░░░░░░░░ 25%  (1.25/5 km run)"}] },
  "focus-mode":      { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python focus-mode.py"},{t:"in",v:"Focus duration (minutes): 25"},{t:"in",v:"What are you focusing on? Deep work"},{t:"out",v:""},{t:"out",v:"  🔒 Focus locked for 25 min — Deep work"},{t:"out",v:"  [██████████░░░░░░░░░░░░░░░░░░░░] 24:01"}] },
  "reading-list":    { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python reading-list.py"},{t:"in",v:"books> add"},{t:"in",v:"  Title: The Pragmatic Programmer"},{t:"in",v:"  Author: Hunt & Thomas"},{t:"in",v:"books> list"},{t:"out",v:"  [ 1] 📖 The Pragmatic Programmer — Hunt & Thomas  [want to read]"},{t:"in",v:"books> stats"},{t:"out",v:"  Total: 1  |  Read: 0  |  Reading: 0  |  Backlog: 1"}] },

  // ── SECURITY ─────────────────────────────────────────────────
  "password-strength": { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python password-strength.py"},{t:"in",v:"Password (or 'quit'): correct-horse-battery-staple"},{t:"out",v:""},{t:"out",v:"  Strength:  Very Strong 💪"},{t:"out",v:"  Entropy:   149.6 bits"},{t:"out",v:"  Crack est: 1.10e+29 days"},{t:"out",v:"  Common pw: No"}] },
  "hash-cracker":      { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python hash-cracker.py"},{t:"in",v:"Hash algorithm (md5/sha1/sha256): md5"},{t:"in",v:"Hash to crack: 5f4dcc3b5aa765d61d8327deb882cf99"},{t:"out",v:""},{t:"out",v:"  🎉 CRACKED! Password is: password"},{t:"out",v:""},{t:"out",v:"  ⚠️  This demonstrates why common passwords are dangerous."}] },
  "port-scanner":      { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python port-scanner.py"},{t:"in",v:"Target host (localhost or IP): localhost"},{t:"in",v:"Start port (default 1): 1"},{t:"in",v:"End port (default 1024): 1024"},{t:"out",v:""},{t:"out",v:"  Port  Service"},{t:"out",v:"  ─────────────────────────"},{t:"out",v:"    22  SSH"},{t:"out",v:"    80  HTTP"},{t:"out",v:"   443  HTTPS"},{t:"out",v:""},{t:"out",v:"  Found 3 open port(s)."}] },
  "steganography":     { difficulty:"advanced",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python steganography.py"},{t:"in",v:"Pick: 1"},{t:"in",v:"Cover text: The quick brown fox jumps over the lazy dog today"},{t:"in",v:"Secret message: HELLO"},{t:"out",v:"  ✅ Hidden message written to: stego_output.txt"}] },
  "network-sniffer":   { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python network-sniffer.py"},{t:"out",v:""},{t:"out",v:"🌐 Network Info"},{t:"out",v:""},{t:"out",v:"  Hostname:    my-laptop"},{t:"out",v:"  Local IP:    192.168.1.42"},{t:"out",v:"  OS:          Linux 6.1.0"},{t:"out",v:""},{t:"out",v:"  Active Connections (top 10):"}] },
  "otp-generator":     { difficulty:"advanced",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python otp-generator.py"},{t:"in",v:"  Base32 secret key: JBSWY3DPEHPK3PXP"},{t:"out",v:""},{t:"out",v:"  OTP: 457821  (valid for 14s)"}] },

  // ── DATA ─────────────────────────────────────────────────────
  "csv-analyzer": { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python csv-analyzer.py"},{t:"in",v:"CSV file path: users.csv"},{t:"out",v:""},{t:"out",v:"  Rows: 1,234   Columns: 4"},{t:"out",v:""},{t:"out",v:"  [name]"},{t:"out",v:"    Non-null: 1,234   Nulls: 0   Unique: 1,229"},{t:"out",v:"  [age]"},{t:"out",v:"    Min: 18   Max: 92   Mean: 38.2   Median: 36"}] },
  "json-explorer":{ difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python json-explorer.py"},{t:"in",v:"JSON file path: data.json"},{t:"out",v:""},{t:"out",v:"  📍 root"},{t:"out",v:"    [ 1] users: [{'name': 'Alice'...}"},{t:"out",v:"    [ 2] count: 42"},{t:"in",v:"  Enter key/index: 1"},{t:"out",v:"  📍 root.users"}] },
  "data-cleaner": { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python data-cleaner.py"},{t:"in",v:"CSV file path: messy.csv"},{t:"in",v:"Fill empty cells with: N/A"},{t:"in",v:"Lowercase which column? email"},{t:"out",v:""},{t:"out",v:"  Original rows:  500"},{t:"out",v:"  Cleaned rows:   483"},{t:"out",v:"  Removed:        17"},{t:"out",v:"  Saved to:       messy_clean.csv"}] },
  "number-gen":   { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python number-gen.py"},{t:"in",v:"Distribution: 2"},{t:"in",v:"How many numbers: 5"},{t:"in",v:"Mean: 100"},{t:"in",v:"Std Dev: 15"},{t:"in",v:"Save to CSV? (y/n): n"},{t:"out",v:"  108.234513"},{t:"out",v:"  92.441021"},{t:"out",v:"  115.882344"}] },
  "pivot-table":  { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python pivot-table.py"},{t:"in",v:"CSV file path: sales.csv"},{t:"in",v:"Group by column: region"},{t:"in",v:"Value column (for sum/avg): revenue"},{t:"in",v:"Aggregation [1] count  [2] sum  [3] avg: 2"},{t:"out",v:""},{t:"out",v:"  region                      Value"},{t:"out",v:"  ──────────────────────────────────"},{t:"out",v:"  East                     45231.00"},{t:"out",v:"  North                    38102.00"},{t:"out",v:"  South                    29445.00"}] },

  // ── PYTHON TRICKS ────────────────────────────────────────────
  "list-comprehensions": { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python list-comprehensions.py"},{t:"out",v:"  Squares 0-9:       [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]"},{t:"out",v:"  Even numbers 0-20: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"},{t:"in",v:"  List comp expression: [x**3 for x in range(5)]"},{t:"out",v:"  Result: [0, 1, 8, 27, 64]"}] },
  "decorators-demo":     { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python decorators-demo.py"},{t:"out",v:"  1. @timer:"},{t:"out",v:"  ⏱  slow_sum took 42.31ms"},{t:"out",v:"     slow_sum(1000000) = 499,999,500,000"},{t:"out",v:"  2. @memoize (Fibonacci):"},{t:"out",v:"     fib(35) = 9227465  (took 0.12ms)"}] },
  "generators-demo":     { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python generators-demo.py"},{t:"out",v:"  1. Infinite counter (first 10):"},{t:"out",v:"     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"},{t:"out",v:"  4. Memory comparison:"},{t:"out",v:"     list(range(1,000,000)) = 8,448,728 bytes"},{t:"out",v:"     generator              =       112 bytes  (75435x more efficient!)"}] },
  "context-managers":    { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python context-managers.py"},{t:"out",v:"  1. Timer context manager:"},{t:"out",v:"  ⏱  sum of 1M numbers: 38.42ms"},{t:"out",v:"     Result: 499,999,500,000"},{t:"out",v:"  2. Temp directory:"},{t:"out",v:"  📁 Created temp dir: /tmp/tmpXXXXXX"},{t:"out",v:"  🗑️  Cleaned up: /tmp/tmpXXXXXX"}] },
  "regex-tester":        { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python regex-tester.py"},{t:"in",v:"Pattern (or 'help'/'quit'): \\d+"},{t:"in",v:"Test string: I have 3 cats and 12 dogs"},{t:"in",v:"Flags: "},{t:"out",v:"  ✅ 2 match(es):"},{t:"out",v:"     [7-8] '3'"},{t:"out",v:"     [19-21] '12'"}] },
  "class-demo":          { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python class-demo.py"},{t:"out",v:"  Alice's account: $1,300.00"},{t:"out",v:"  Bob's account: $700.00"},{t:"out",v:"  Alice history: ['+500.00', '-200.00']"},{t:"out",v:"  Combined balance: $2000.00"},{t:"out",v:"  Bob's interest: $35.00  New balance: $735.00"}] },
  "file-tricks":         { difficulty:"beginner",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python file-tricks.py"},{t:"out",v:"  1. pathlib — modern path handling:"},{t:"out",v:"     Home dir:  /home/user"},{t:"out",v:"  2. Temp files (auto-cleaned):"},{t:"out",v:"     Created: /tmp/tmp123abc.txt"},{t:"out",v:"     Deleted: ✅"},{t:"out",v:"  3. Atomic write: ✅"}] },

  // ── MORE GAMES ───────────────────────────────────────────────
  "battleship": { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python battleship.py"},{t:"out",v:"  🚢 BATTLESHIP — Sink all ships!"},{t:"out",v:"    1 2 3 4 5 6 7 8"},{t:"out",v:"  A ~ ~ ~ ~ ~ ~ ~ ~"},{t:"in",v:"  Target (e.g. A5): D4"},{t:"out",v:"  💥 HIT!"},{t:"out",v:"  ⚓ You sunk the Destroyer!"}] },
  "snake-game": { difficulty:"intermediate", requires:[], version:"1.0", demo:[{t:"cmd",v:"python snake-game.py"},{t:"out",v:"  ──────────────────────"},{t:"out",v:"  │     ★              │"},{t:"out",v:"  │         ●○○        │"},{t:"out",v:"  ──────────────────────"},{t:"in",v:"  Move: w"},{t:"out",v:"  Score: 30"}] },
  "sudoku":     { difficulty:"advanced",     requires:[], version:"1.0", demo:[{t:"cmd",v:"python sudoku.py"},{t:"out",v:"  🔢 SUDOKU"},{t:"out",v:"     1 2 3   4 5 6   7 8 9"},{t:"out",v:"    ┼───────┼───────┼───────┼"},{t:"out",v:"  A │ 5 3 · │ · 7 · │ · · · │"},{t:"in",v:"  Move: A4 6"},{t:"out",v:"  ✅"}] },

};
