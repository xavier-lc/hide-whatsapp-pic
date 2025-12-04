#!/bin/bash

# Script to create placeholder icons for the browser extension
# This creates simple colored PNG files as placeholders

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Create icons directory if it doesn't exist
mkdir -p icons

# Create 16x16 icon
convert -size 16x16 xc:'#667eea' -fill white -pointsize 10 -gravity center -annotate +0+0 'H' icons/icon16.png

# Create 48x48 icon
convert -size 48x48 xc:'#667eea' -fill white -pointsize 32 -gravity center -annotate +0+0 'H' icons/icon48.png

# Create 128x128 icon
convert -size 128x128 xc:'#667eea' -fill white -pointsize 96 -gravity center -annotate +0+0 'H' icons/icon128.png

echo "Icons created successfully!"
