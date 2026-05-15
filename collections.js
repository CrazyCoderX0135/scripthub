const COLLECTIONS = [
  {
    id: "no-install",
    name: "No Install Needed",
    icon: "⚡",
    desc: "Just copy, save, and run — no pip install required. Perfect for getting started fast.",
    color: "green",
    ids: [
      "bulk-rename","csv-to-json","json-to-csv","folder-size","text-search",
      "remind-me","password-gen","countdown-timer","net-scan","weather",
      "ip-info","unit-converter","auto-backup","file-organizer","rename-by-date",
      "website-monitor","webpage-to-pdf","broken-link-checker","json-formatter",
      "url-shortener","number-guesser","hangman","rock-paper-scissors",
      "trivia-quiz","stopwatch","email-sender"
    ]
  },
  {
    id: "games",
    name: "Games Pack",
    icon: "🎮",
    desc: "Fun terminal games to play or show off. All run straight from the command line.",
    color: "yellow",
    ids: ["number-guesser","hangman","rock-paper-scissors","trivia-quiz","word-scramble"]
  },
  {
    id: "file-wizards",
    name: "File Wizards",
    icon: "🗂️",
    desc: "Powerful scripts for renaming, organizing, converting, and managing your files.",
    color: "blue",
    ids: ["bulk-rename","img-crush","csv-to-json","json-to-csv","duplicate-finder","folder-size","pdf-merger","text-search","file-organizer","rename-by-date"]
  },
  {
    id: "system-toolkit",
    name: "System Toolkit",
    icon: "🔧",
    desc: "Monitor your system, scan your network, and keep tabs on your machine.",
    color: "red",
    ids: ["sysmon","net-scan","ip-info","website-monitor","auto-backup","screenshot-taker"]
  },
  {
    id: "web-tools",
    name: "Web Tools",
    icon: "🌐",
    desc: "Scripts for working with the web — checking links, fetching pages, formatting data.",
    color: "blue",
    ids: ["webpage-to-pdf","broken-link-checker","json-formatter","url-shortener","weather","ip-info","qr-gen"]
  },
  {
    id: "starter-pack",
    name: "Beginner Starter Pack",
    icon: "🚀",
    desc: "The best scripts to try first. Easy to run, easy to understand, and actually useful.",
    color: "green",
    ids: ["file-organizer","password-gen","weather","number-guesser","countdown-timer","ip-info","json-formatter","bulk-rename"]
  },
  {
    id: "productivity",
    name: "Time & Productivity",
    icon: "⏰",
    desc: "Timers, reminders, backups, and automation scripts to keep you on track.",
    color: "yellow",
    ids: ["remind-me","countdown-timer","stopwatch","auto-backup","screenshot-taker","website-monitor","email-sender","clipboard-saver"]
  },
  {
    id: "privacy",
    name: "Privacy & Security",
    icon: "🔒",
    desc: "Generate strong passwords, save your clipboard history, and keep your data yours.",
    color: "red",
    ids: ["password-gen","clipboard-saver","duplicate-finder","auto-backup","text-search"]
  }
];
