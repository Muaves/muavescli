#!/usr/bin/env python3

import json
import sys
import webbrowser
import urllib.request 
from pathlib import Path

class MuavesPortfolio:
    def __init__(self):
        if getattr(sys, 'frozen', False):
            self.base_dir = Path(sys.executable).parent
        else:
            self.base_dir = Path(__file__).parent
        
        self.api_url = "https://muaves-portfolio-api.onrender.com/"
        self.load_data()
    
    def load_data(self):
        print(f"Connecting to API: {self.api_url}...")
        try:
            with urllib.request.urlopen(self.api_url, timeout=15) as response:
                if response.status == 200:
                    self.data = json.loads(response.read().decode('utf-8'))
                else:
                    print(f"Error: Server returned status {response.status}")
                    sys.exit(1)
        except Exception as e:
            print("Error: Could not reach the API. Check your internet connection.")
            print(f"Details: {e}")
            sys.exit(1)
    
    def show_help(self):
        print("\n" + "="*60)
        name = self.data.get('name', 'Muaves')
        version = self.data.get('version', '1.0.4')
        print(f"  {name} Portfolio CLI - v{version}")
        print("="*60)
        print("\nAvailable Commands:")
        print("  muaves              Show this help message")
        print("  muaves -oA          Show About Me")
        print("  muaves -oP          Show Projects")
        print("  muaves -oH          Show Help (this message)")
        print("  muaves -OW          Open website in browser")
        print("  muaves -H:l         Show and open links")
        print("  muaves --version    Show version")
        print("\n" + "="*60 + "\n")
    
    def show_about(self):
        print("\n" + "="*60)
        print("  ABOUT ME")
        print("="*60)
        print(f"\n{self.data.get('about', 'No info provided.')}\n")
        print("="*60 + "\n")
    
    def show_projects(self):
        print("\n" + "="*60)
        print("  MY PROJECTS")
        print("="*60 + "\n")
        
        for i, project in enumerate(self.data.get('projects', []), 1):
            print(f"[{i}] {project.get('name')}")
            print(f"    {project.get('description')}")
            print(f"    Tech Stack: {project.get('tech')}")
            print(f"    Status: {project.get('status')}")
            print()
        
        print("="*60 + "\n")

    def open_website(self):
        url = self.data.get('website')
        if url:
            print(f"\nOpening {url}...")
            webbrowser.open(url)
        else:
            print("No website URL found in API data.")

    def handle_command(self, args):
        if len(args) == 0:
            self.show_help()
            return
        
        arg = args[0].lower()
        if arg == '-oa': self.show_about()
        elif arg == '-op': self.show_projects()
        elif arg == '-oh': self.show_help()
        elif arg == '-ow': self.open_website()
        elif arg in ['--version', '--v']: print(f"v{self.data.get('version')}")
        else:
            print(f"\nUnknown command: {args[0]}")

def main():
    portfolio = MuavesPortfolio()
    args = sys.argv[1:]
    portfolio.handle_command(args)

if __name__ == "__main__":
    main()
