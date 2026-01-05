# MFA Brute Force Lab
## Objective: Bypass 2FA using response manipulation.

### Step 1: Enumeration
I started by scanning the target application and identifying the login endpoint.

```bash
# Example command
nmap -p 80,443 -A 10.10.10.1