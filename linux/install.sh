#!/bin/bash
set -euo pipefail

echo "=================================="
echo "  Muaves Portfolio CLI Installer"
echo "=================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v python3 >/dev/null 2>&1; then
    echo "Error: Python 3 is required but was not found in PATH." >&2
    exit 1
fi

if ! python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 6) else 1)'; then
    echo "Error: Python 3.6 or newer is required." >&2
    exit 1
fi

echo "Where would you like to install muaves?"
echo ""
echo "1) ~/.local/bin (recommended - no sudo needed)"
echo "2) /usr/local/bin (system-wide - requires sudo)"
echo "3) Just set up for current directory (no install)"
echo ""
read -p "Choose (1-3): " choice

case $choice in
    1)
        INSTALL_DIR="$HOME/.local/bin"
        mkdir -p "$INSTALL_DIR"
        
        install -m 755 "$SCRIPT_DIR/muaves" "$INSTALL_DIR/muaves"
        install -m 644 "$SCRIPT_DIR/muaves.py" "$INSTALL_DIR/muaves.py"
        install -m 644 "$SCRIPT_DIR/portfolio_data.json" "$INSTALL_DIR/portfolio_data.json"
        
        echo ""
        echo "✓ Installed to $INSTALL_DIR"
        echo ""
        
        if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
            echo "⚠ NOTE: $HOME/.local/bin is not in your PATH"
            echo ""
            echo "Add this line to your ~/.bashrc or ~/.zshrc:"
            echo ""
            echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
            echo ""
            echo "Then run: source ~/.bashrc   (or source ~/.zshrc)"
            echo ""
        else
            echo "✓ Ready to use! Just type: muaves"
        fi
        ;;
        
    2)
        INSTALL_DIR="/usr/local/bin"
        
        echo ""
        echo "Installing to $INSTALL_DIR (requires sudo)..."
        
        sudo install -m 755 "$SCRIPT_DIR/muaves" "$INSTALL_DIR/muaves"
        sudo install -m 644 "$SCRIPT_DIR/muaves.py" "$INSTALL_DIR/muaves.py"
        sudo install -m 644 "$SCRIPT_DIR/portfolio_data.json" "$INSTALL_DIR/portfolio_data.json"
        
        echo ""
        echo "✓ Installed system-wide!"
        echo "✓ Ready to use! Just type: muaves"
        echo ""
        ;;
        
    3)
        chmod +x "$SCRIPT_DIR/muaves"
        
        echo ""
        echo "✓ Set up for current directory"
        echo ""
        echo "Usage: ./muaves [command]"
        echo ""
        echo "Examples:"
        echo "  ./muaves"
        echo "  ./muaves -oA"
        echo "  ./muaves -oP"
        echo ""
        ;;
        
    *)
        echo ""
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo "=================================="
echo "  Installation Complete!"
echo "=================================="
