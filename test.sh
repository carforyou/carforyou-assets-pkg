#!/usr/bin/env bash

set -e
npm run build
echo "Stay tuned... tests are running!"

./pkg/dist-node/index.bin.js clean

./pkg/dist-node/index.bin.js build
OPTIMIZED_SVG=./assets/dist/car.svg
if [ -f "$OPTIMIZED_SVG" ]; then
    echo "PASS (optimize): $OPTIMIZED_SVG exists."
else
    echo "FAILED (optimize): $OPTIMIZED_SVG does not exist."
    exit 1
fi

OPTIMIZED_COMPONENT=./assets/dist/car.tsx
if [ -f "$OPTIMIZED_COMPONENT" ]; then
    echo "PASS (components): $OPTIMIZED_COMPONENT exists."
else
    echo "FAILED (components): $OPTIMIZED_COMPONENT does not exist."
    exit 1
fi

INDEX_FILE_TSX=./assets/dist/bodyTypes/index.js
INDEX_FILE_SVG=./assets/dist/badges/index.js
if [ -f "$INDEX_FILE_TSX" -a -f "$INDEX_FILE_SVG" ]; then
    echo "PASS (index): index files do exist exists."
else
    echo "FAILED (index): index files do not exist."
    exit 1
fi

./pkg/dist-node/index.bin.js clean
DIR=./assets/dist
if [ -d "$DIR" ]; then
    echo "FAILED (clean): directory $DIR still exists."
    exit 1
else
    echo "PASS (clean): $DIR does not exist."
fi




