#!/usr/bin/env bash

OPTIMIZED_SVG=./assets/dist/car.svg
if [ -f "$OPTIMIZED_SVG" ]; then
    echo "PASS (optimize): $OPTIMIZED_SVG exists."
else
    echo "FAILED (optimize): $OPTIMIZED_SVG does not exist."
    exit 1
fi

NOT_OPTIMIZED_FILE_SIZE=$(stat -f%z ./assets/src/instagram.svg)
OPTIMIZED_FILE_SIZE=$(stat -f%z ./assets/dist/instagram.svg)
if [[ "$NOT_OPTIMIZED_FILE_SIZE" -gt "$OPTIMIZED_FILE_SIZE" ]]; then
    echo "PASS (optimize): optimized file is smaller than original."
else
    echo "FAILED (optimize): optimized file is not smaller than original."
    exit 1
fi