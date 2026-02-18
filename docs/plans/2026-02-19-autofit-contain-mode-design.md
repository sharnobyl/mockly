# Auto-fit Image in Contain Mode

## Problem

When "contain" fit mode is selected, the image container still uses a fixed aspect ratio (16:9, 4:3, 1:1, or 9:16). This forces the container to a predetermined size, creating awkward whitespace between the image and the text content of the card.

## Solution

When "contain" mode is active, the image container auto-fits to the uploaded image's natural dimensions. The aspect ratio selector becomes irrelevant in contain mode.

## Design Details

### Image Container Behavior

**Contain mode:**
- Load the image to determine its natural width/height
- Container width = card width - inset x 2 (unchanged)
- Container height = (natural image height / natural image width) x container width
- Card grows to accommodate the natural image height

**Cover mode:** (unchanged)
- Uses the selected aspect ratio from the buttons
- Supports zoom and drag positioning

### UI Changes

- When "contain" is selected, the aspect ratio buttons show as disabled/grayed out OR display an "Auto" indicator
- The aspect ratio selector remains functional for "cover" mode

### Technical Implementation

1. When an image is uploaded and `imgFit === 'contain'`:
   - Create an Image object to read `naturalWidth` and `naturalHeight`
   - Calculate container height dynamically: `slotH = (slotW * naturalHeight) / naturalWidth`
   - This replaces the current fixed ratio calculation

2. Store the natural dimensions when the image is loaded (in `handleCardImage`)

3. Update `liveUpdate()` to use natural dimensions when in contain mode

## What Stays the Same

- Cover mode behavior (zoom controls, drag positioning)
- The inset/margin controls
- All other card styling
- Fixed aspect ratios for cover mode
