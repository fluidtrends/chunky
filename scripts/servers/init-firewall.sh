#!/bin/bash
set -euo pipefail

echo "Setting up firewall ..."

sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow 13022/tcp
sudo ufw deny 22/tcp
sudo ufw allow 30303
sudo ufw allow 13000/tcp
sudo ufw allow 12000/udp
sudo ufw enable
sudo ufw status numbered

echo "Firewall ready."