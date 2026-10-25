"""
Tibia Data Studio - Automatic Launcher
Starts the backend server and opens the default browser automatically.
"""

import os
import sys
import threading
import time
import webbrowser

# Ensures full UTF-8 support in Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

# Ensure base directory is correct
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from app import app, auto_load_data

def open_browser(port):
    time.sleep(1.2)
    url = f"http://localhost:{port}"
    print(f"[Tibia Data Studio] Opening browser at: {url}")
    webbrowser.open(url)

if __name__ == "__main__":
    auto_load_data()
    port = 8080
    
    # Start browser launcher in background
    threading.Thread(target=open_browser, args=(port,), daemon=True).start()
    
    print("=" * 65)
    print("   ⚔️  TIBIA DATA STUDIO - UNIFIED DATA EDITOR")
    print(f"   🌐  Dashboard available at: http://localhost:{port}")
    print("   🛡️  Automated versioned backup system ACTIVE")
    print("=" * 65)
    print("Press CTRL + C to stop the editor.\n")
    
    app.run(host="127.0.0.1", port=port, debug=False)
