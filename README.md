# Muaves Portfolio CLI v1.0.4
![Issues](https://img.shields.io/github/issues/Muaves/muavescli?style=for-the-badge&color=800f2f)
![Commits](https://img.shields.io/github/commits-since/Muaves/muavescli/v1.0.4?style=for-the-badge&color=a4133c&label=COMMITS)
![Size](https://img.shields.io/github/repo-size/Muaves/muavescli?style=for-the-badge&color=c9184a&label=SIZE)
![Last Commit](https://img.shields.io/github/last-commit/Muaves/muavescli?style=for-the-badge&color=ff4d6d)

A command-line interface to showcase your portfolio with style! 🚀

## Quick Start

### Windows

1. Extract the ZIP file
2. Open Command Prompt or PowerShell
3. Navigate to the `windows` folder
4. Run: `muaves.bat`

To use from anywhere, run `install.bat` and follow the instructions.

### Linux/Mac

1. Extract the ZIP file
2. Open Terminal
3. Navigate to the `linux` folder
4. Run: `./muaves`

To use from anywhere, run `./install.sh` and follow the instructions.

## Available Commands

```
muaves              Show help message
muaves -oA          Show About Me
muaves -oP          Show Projects
muaves -oH          Show Help
muaves -OW          Open website in browser
muaves -H:l         Show and select links
muaves --version    Show version
muaves --v          Show version
```

## File Structure

```
muaves-portfolio/
├── windows/
│   ├── muaves.bat          # Windows launcher
│   ├── muaves.py           # Main script
│   ├── portfolio_data.json # Portfolio data
│   └── install.bat         # Installation helper
├── linux/
│   ├── muaves              # Linux/Mac launcher
│   ├── muaves.py           # Main script
│   ├── portfolio_data.json # Portfolio data
│   └── install.sh          # Installation helper
├── LICENSE                 # License information
└── README.md               # This file
```

## Requirements

- Python 3.6 or higher
- No external dependencies (uses only Python standard library)

## Troubleshooting
A known error that if you download it twice or more times it becomes useless!
So here you go how to solve it:

### Step 1: Delete the Files
Depending on where you installed it, you need to remove the copied files:

### For Linux/macOS (Option 1 - Local):
Open your terminal and run:
'rm ~/.local/bin/muaves ~/.local/bin/muaves.py ~/.local/bin/portfolio_data.json'

### For Linux (Option 2 - System-wide):
Run:
'sudo rm /usr/local/bin/muaves /usr/local/bin/muaves.py /usr/local/bin/portfolio_data.json'

### For Windows:
Simply delete the folder where you extracted the ZIP file. The Windows installer (install.bat) doesn't copy files elsewhere; it just tells the system where that specific folder is.

## License

You are free to use this work for personal or commercial purposes, but you may not modify, adapt, or create derivative works based on it.

See LICENSE file for details.

## Version

Current version: 1.0.6

---

Made by Muaves
