#!/bin/bash

echo "=================================="
echo "  Muaves Portfolio CLI Installer"
echo "=================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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
        
        cp "$SCRIPT_DIR/muaves" "$INSTALL_DIR/"
        cp "$SCRIPT_DIR/muaves.py" "$INSTALL_DIR/"
        cp "$SCRIPT_DIR/portfolio_data.json" "$INSTALL_DIR/"
        
        chmod +x "$INSTALL_DIR/muaves"
        
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
        
        sudo cp "$SCRIPT_DIR/muaves" "$INSTALL_DIR/"
        sudo cp "$SCRIPT_DIR/muaves.py" "$INSTALL_DIR/"
        sudo cp "$SCRIPT_DIR/portfolio_data.json" "$INSTALL_DIR/"
        sudo chmod +x "$INSTALL_DIR/muaves"
        
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
