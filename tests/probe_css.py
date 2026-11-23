import subprocess
import time
import urllib.request
import re

print("Starting next dev on port 3005...")
proc = subprocess.Popen(
    ["cmd.exe", "/c", "npx", "next", "dev", "--port", "3005"],
    cwd=r"C:\Users\RAMYA KUDELLI\.gemini\antigravity\scratch\LAUNCH_AI\frontend"
)
time.sleep(6)

try:
    url = "http://localhost:3005/dashboard"
    print(f"Fetching {url}...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=10) as response:
        html = response.read().decode("utf-8")
        print("HTML length:", len(html))
        
        # Look for CSS link or style tags
        css_links = re.findall(r'<link[^>]*rel=["\']stylesheet["\'][^>]*>', html)
        print("Found CSS links:", css_links)
        
        style_tags = re.findall(r'<style[^>]*>.*?</style>', html, re.DOTALL)
        print(f"Found {len(style_tags)} style tags")
        
        for link in css_links:
            href_m = re.search(r'href=["\']([^"\']+)["\']', link)
            if href_m:
                css_path = href_m.group(1)
                full_css_url = f"http://localhost:3005{css_path}"
                print(f"Requesting CSS: {full_css_url}")
                try:
                    with urllib.request.urlopen(full_css_url, timeout=5) as css_res:
                        content = css_res.read().decode("utf-8")
                        print(f"CSS Status: {css_res.status}, Length: {len(content)}, Preview: {content[:80]}")
                except Exception as ex:
                    print(f"Failed to fetch CSS: {ex}")
finally:
    print("Terminating test process...")
    subprocess.call(["taskkill", "/F", "/T", "/PID", str(proc.pid)], stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
