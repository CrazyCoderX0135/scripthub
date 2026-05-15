const FEATURED_IDS = ["file-organizer","weather","hangman","password-gen","sysmon","trivia-quiz"];

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

};
