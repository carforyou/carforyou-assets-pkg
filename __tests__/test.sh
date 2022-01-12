#!/usr/bin/env bash

set -e
npm run build
echo "Stay tuned... tests are running!"

chmod +x pkg/index.js
./pkg/index.js clean
./pkg/index.js build

# Optimize
chmod +x ./__tests__/optimize.sh
./__tests__/optimize.sh

# Accessibility
chmod +x ./__tests__/accessibility.sh
./__tests__/accessibility.sh

# Generate components
OPTIMIZED_COMPONENT=./assets/dist/car.tsx
if [ -f "$OPTIMIZED_COMPONENT" ]; then
    echo "PASS (components): $OPTIMIZED_COMPONENT exists."
else
    echo "FAILED (components): $OPTIMIZED_COMPONENT does not exist."
    exit 1
fi

# Generate index files
chmod +x ./__tests__/createIndexFiles.sh
./__tests__/createIndexFiles.sh

# Clean directory
./pkg/index.js clean
DIR=./assets/dist
if [ -d "$DIR" ]; then
    echo "FAILED (clean): directory $DIR still exists."
    exit 1
else
    echo "PASS (clean): $DIR does not exist."
fi
