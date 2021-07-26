#!/usr/bin/env bash

set -e
npm run build
./pkg/dist-node/index.bin.js clean

./pkg/dist-node/index.bin.js optimize

OPTIMIZED_SVG=./assets/dist/car.svg
if [ -f "$OPTIMIZED_SVG" ]; then
    echo "PASS (optimize): $OPTIMIZED_SVG exists."
else
    echo "FAILED (optimize): $OPTIMIZED_SVG does not exist."
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




