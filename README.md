# Auto-Captive-Portal Wrapper v1.2.0

The point of this project is to make logging in to a captive portal as easy as a single command.

```bash
# Runs the login script then selects VPN option 3
captive-login -c 3
```

## Breakdown

This project is broken up into two different scripts.

### Auto-Captive-Portal [Node.js]

The first is the Node.js script. This file is the single-function origin of this project. Its sole purpose is to log in to a captive-portal, using the information entered into the .env file.

### ACL Wrapper [Bash]

The second is the Auto-Captive-Portal (or Login) Wrapper bash script used to manage the dance of VPN processes with minimal leakage (to be improved).

## Setup

1. Clone this repository
   > `git clone https://github.com/TheRealFakeAdmin/auto-captive-portal.git`
2. Navigate to the cloned directory
   > `cd auto-captive-portal`
3. Set the run script to executable
   > `sudo chmod +x ./run`
4. Create a symbolic link to use as a terminal command
   > `ln -s "${PWD}/run" /usr/local/bin/captive-login` 
