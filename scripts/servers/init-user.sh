#!/bin/bash
set -euo pipefail

echo "Adding [chunky] user ..."

useradd --create-home --shell "/bin/bash" --groups sudo chunky
HOME="$(eval echo ~chunky)"
mkdir --parents "${HOME}/.ssh"
cp /root/.ssh/authorized_keys "${HOME}/.ssh"
chmod 0700 "${HOME}/.ssh"
chmod 0600 "${HOME}/.ssh/authorized_keys"
chown --recursive chunky:chunky "${HOME}/.ssh"

echo "User [chunky] added."