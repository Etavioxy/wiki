#!/bin/bash
# A shell script to generate multiple files by calling a.py

# Loop from $1 to $2
for i in $(seq $1 $2)
do
  node randstr.js > ../assets/$i.md
done
