#!/bin/bash
echo -e "\n[+] `date` -> Tests $0 starting."

# exit as soon as something breaks
set -e

for f in `/usr/bin/find tests/* -type f `; do
  ${f}
  if [ $? -ne 0 ]; then
    exit 1
  fi
done

# the exit val from this script determines success / fail for this repo
# but if anything specific broke, the script should have already
# exited before getting to this point

exit 0
