#!/usr/bin/env python3

import json
import os
import sys
import webbrowser
from pathlib import Path


class MuavesPortfolio:
    def __init__(self):
        if getattr(sys, 'frozen', False):
            self.base_dir = Path(sys.executable).parent
        else:
            self.base_dir = Path(__file__).parent
        
        self.data_file = self.base_dir / 'portfolio_data.json'
        self.load_data()
    
    def load_data(self):
        try:
            with open(self.data_file, 'r', encoding='utf-8') as f:
                self.data = json.load(f)
        except FileNotFoundError:
            print(f"Error: portfolio_data.json not found in {self.base_dir}")
            sys.exit(1)
        except json.JSONDecodeError:
            print("Error: Invalid JSON in portfolio_data.json")
            sys.exit(1)
    
    def show_help(self):
        print("\n" + "="*60)
        print(f"  {self.data['name']} Portfolio CLI - v{self.data['version']}")
        print("="*60)
        print("\nAvailable Commands:")
        print("  muaves              Show this help message")
        print("  muaves -oA          Show About Me")
        print("  muaves -oP          Show Projects")
        print("  muaves -oH          Show Help (this message)")
        print("  muaves -OW          Open website in browser")
        print("  muaves -H:l         Show and open links")
        print("  muaves --version    Show version")
        print("  muaves --v          Show version")
        print("\n" + "="*60 + "\n")
    
    def show_about(self):
        print("\n" + "="*60)
        print("  ABOUT ME")
        print("="*60)
        print(f"\n{self.data['about']}\n")
        print("="*60 + "\n")
    
    def show_projects(self):
        print("\n" + "="*60)
        print("  MY PROJECTS")
        print("="*60 + "\n")
        
        for i, project in enumerate(self.data['projects'], 1):
            print(f"[{i}] {project['name']}")
            print(f"    {project['description']}")
            print(f"    Tech Stack: {project['tech']}")
            print(f"    Status: {project['status']}")
            print()
        
        print("="*60 + "\n")
    
    def show_version(self):
        print(f"\n{self.data['name']} Portfolio CLI v{self.data['version']}\n")
    
    def open_website(self):
        url = self.data['website']
        print(f"\nOpening {url} in your browser...")
        try:
            webbrowser.open(url)
            print("✓ Website opened successfully!\n")
        except Exception as e:
            print(f"✗ Error opening browser: {e}\n")
    
    def show_links(self):
        print("\n" + "="*60)
        print("  MY LINKS")
        print("="*60 + "\n")
        
        for i, link in enumerate(self.data['links'], 1):
            print(f"  {i}. {link['name']}")
            print(f"     {link['url']}")
            print()
        
        print("="*60)
        
        try:
            choice = input("\nEnter number to open link (or press Enter to cancel): ").strip()
            
            if choice == "":
                print("Cancelled.\n")
                return
            
            choice_num = int(choice)
            
            if 1 <= choice_num <= len(self.data['links']):
                selected_link = self.data['links'][choice_num - 1]
                print(f"\nOpening {selected_link['name']}...")
                webbrowser.open(selected_link['url'])
                print("✓ Link opened successfully!\n")
            else:
                print(f"✗ Invalid number. Please choose between 1 and {len(self.data['links'])}.\n")
        
        except ValueError:
            print("✗ Invalid input. Please enter a number.\n")
        except Exception as e:
            print(f"✗ Error: {e}\n")
    
    def handle_command(self, args):
        if len(args) == 0:
            self.show_help()
            return
        
        arg = args[0].lower()
        
        if arg == '-oa':
            self.show_about()
        elif arg == '-op':
            self.show_projects()
        elif arg == '-oh':
            self.show_help()
        elif arg == '-ow':
            self.open_website()
        elif arg == '-h:l':
            self.show_links()
        elif arg == '--version' or arg == '--v':
            self.show_version()
        else:
            print(f"\n✗ Unknown command: {args[0]}")
            print("  Type 'muaves' or 'muaves -oH' for help\n")


def main():
    portfolio = MuavesPortfolio()
    args = sys.argv[1:]
    portfolio.handle_command(args)


if __name__ == "__main__":
    main()
