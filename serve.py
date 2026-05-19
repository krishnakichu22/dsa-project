#!/usr/bin/env python3
"""
DSA Zero to Hero — local server
Usage:   python3 serve.py
Then open the URL it prints (default http://localhost:8000).

Why a server? The app loads pattern modules on demand via <script>.
Browsers block that when opening index.html as a file:// path.
A tiny static server fixes it. No dependencies — pure standard library.
"""
import http.server, socketserver, os, sys, webbrowser

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # never cache during local study; always serve fresh files
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
    def log_message(self, *args):
        pass  # quiet console

with socketserver.ThreadingTCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}"

    # allow fast restart after Ctrl+C
    httpd.allow_reuse_address = True

    print("=" * 48)
    print("  DSA Zero to Hero is running")
    print(f"  Open:  {url}")
    print("  Stop:  Ctrl+C")
    print("=" * 48)

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever(poll_interval=0.5)
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.shutdown()
        httpd.server_close()
        print("Stopped. See you next session.")
