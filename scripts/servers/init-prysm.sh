#!/bin/bash
set -euo pipefail

cd ~        
sudo apt install curl
curl -LO https://github.com/prysmaticlabs/prysm/releases/download/v1.4.3/beacon-chain-v1.4.3-linux-amd64
curl -LO https://github.com/prysmaticlabs/prysm/releases/download/v1.4.3/validator-v1.4.3-linux-amd64

mv beacon-chain-v1.4.3-linux-amd64 beacon-chain
mv validator-v1.4.3-linux-amd64 validator

chmod +x beacon-chain
chmod +x validator

sudo cp beacon-chain /usr/local/bin
sudo cp validator /usr/local/bin

cd ~
sudo rm beacon-chain && sudo rm validator

sudo useradd --no-create-home --shell /bin/false prysmbeacon
sudo mkdir -p /var/lib/prysm/beacon
sudo chown -R prysmbeacon:prysmbeacon /var/lib/prysm/beacon
sudo chmod 700 /var/lib/prysm/beacon

sudo useradd --no-create-home --shell /bin/false prysmvalidator
sudo mkdir -p /var/lib/prysm/validator
sudo chown -R prysmvalidator:prysmvalidator /var/lib/prysm/validator
sudo chmod 700 /var/lib/prysm/validator
