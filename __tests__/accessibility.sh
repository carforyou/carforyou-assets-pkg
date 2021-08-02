#!/usr/bin/env bash

SVG_WITH_TITLE=./assets/dist/car.svg
SVG_WITHOUT_TITLE=./assets/dist/instagram.svg
if grep -q 'aria-labelledby="carTitle" role="img"><title id="carTitle">nice car</title>' "$SVG_WITH_TITLE"; then
  echo "PASS (accessibility): contains id and aria label."
else
  echo "FAILED (accessibility): missing id and aria label."
  exit 1
fi

if grep -q 'aria-labelledby="instagramTitle" role="img"><title id="instagramTitle">instagram</title>' "$SVG_WITHOUT_TITLE"; then
  echo "PASS (accessibility): title tag was created."
else
  echo "FAILED (accessibility): no title tag."
  exit 1
fi