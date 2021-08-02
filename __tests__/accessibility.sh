#!/usr/bin/env bash

SVG_WITH_TITLE=./assets/dist/car.svg
SVG_WITHOUT_TITLE=./assets/dist/instagram.svg
if grep -q 'aria-label="nice car aria" role="img"><title>nice car</title>' "$SVG_WITH_TITLE"; then
  echo "PASS (accessibility): title and aria label."
else
  echo "FAILED (accessibility): missing title and/or aria label."
  exit 1
fi

if grep -q 'aria-label="instagram" role="img"><title>instagram</title>' "$SVG_WITHOUT_TITLE"; then
  echo "PASS (accessibility): title tag was created."
else
  echo "FAILED (accessibility): no title tag."
  exit 1
fi