#!/usr/bin/env bash

INDEX_FILE_TSX=./assets/dist/bodyTypes/index.js
INDEX_FILE_SVG=./assets/dist/badges/index.js
if [ -f "$INDEX_FILE_TSX" -a -f "$INDEX_FILE_SVG" ]; then
    echo "PASS (index): index files do exist."
else
    echo "FAILED (index): index files do not exist."
    exit 1
fi

if grep -q "export { default as agvs } from './agvs.svg';" "$INDEX_FILE_SVG"; then
  echo "PASS (index-svg): contains the svg files."
else
  echo "FAILED (index-svg): index file does not contain the svg files."
  exit 1
fi

if grep -q "export { default as cabriolet } from './cabriolet.tsx';" "$INDEX_FILE_TSX"; then
  echo "PASS (index-tsx): contains the tsx files."
else
  echo "FAILED (index-tsx): index file does not contain the tsx files."
  exit 1
fi