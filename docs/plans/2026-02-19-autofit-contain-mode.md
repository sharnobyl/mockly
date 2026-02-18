# Auto-fit Contain Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** When contain mode is selected, the image container auto-fits to the uploaded image's natural aspect ratio instead of forcing a fixed aspect ratio.

**Architecture:** Store natural image dimensions on upload, then in `liveUpdate()` calculate container height dynamically using the image's aspect ratio when contain mode is active. Gray out aspect ratio buttons when contain mode is selected.

**Tech Stack:** Vanilla JavaScript, DOM manipulation, Image API for natural dimensions

---

## Task 1: Store Natural Image Dimensions on Upload

**Files:**
- Modify: `index.html:1034-1041` (add new state variables)
- Modify: `index.html:1912-1922` (handleCardImage function)

**Step 1: Add state variables for natural dimensions**

Add after line 1041 (after `imgZoom` declaration):

```javascript
let imgNaturalW    = 0;  // natural width of uploaded image
let imgNaturalH    = 0;  // natural height of uploaded image
```

**Step 2: Load image and capture natural dimensions in handleCardImage**

Replace the `handleCardImage` function (lines 1912-1922) with:

```javascript
function handleCardImage(e){
  const file=e.target.files[0]; if(!file) return;
  const r=new FileReader();
  r.onload=ev=>{
    cardImgDataURL=ev.target.result;

    // Load image to get natural dimensions
    const img = new Image();
    img.onload = () => {
      imgNaturalW = img.naturalWidth;
      imgNaturalH = img.naturalHeight;
      liveUpdate();
    };
    img.src = cardImgDataURL;

    const b=document.getElementById('card-img-btn');
    b.textContent='✓ '+file.name; b.classList.add('has-file');
  };
  r.readAsDataURL(file);
}
```

**Step 3: Verify in browser**

Open `index.html` in browser, upload an image, check console for no errors.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: store natural image dimensions on upload"
```

---

## Task 2: Use Natural Dimensions for Contain Mode Height Calculation

**Files:**
- Modify: `index.html:1634-1638` (image height calculation in liveUpdate)

**Step 1: Update height calculation to use natural dimensions in contain mode**

Replace lines 1634-1638:

```javascript
  // Compute image height from card width & ratio
  const cardW = card.offsetWidth || sizes.width;
  const ratio  = ratioNum(imgRatio);

  const slotW   = cardW - inset * 2;
  const slotH   = Math.round(slotW / ratio);
```

With:

```javascript
  // Compute image height based on fit mode
  const cardW = card.offsetWidth || sizes.width;
  const slotW   = cardW - inset * 2;

  let slotH;
  if (imgFit === 'contain' && imgNaturalW > 0 && imgNaturalH > 0) {
    // Use natural aspect ratio for contain mode
    slotH = Math.round((slotW * imgNaturalH) / imgNaturalW);
  } else {
    // Use selected aspect ratio for cover mode
    const ratio = ratioNum(imgRatio);
    slotH = Math.round(slotW / ratio);
  }
```

**Step 2: Verify in browser**

1. Open `index.html` in browser
2. Upload an image with a non-standard aspect ratio (e.g., a tall portrait photo)
3. Select "Cover" mode - should use selected aspect ratio (16:9, etc.)
4. Select "Contain" mode - should auto-fit to image's natural aspect ratio
5. Verify no whitespace between image and text in contain mode

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: auto-fit image height in contain mode"
```

---

## Task 3: Gray Out Aspect Ratio Buttons in Contain Mode

**Files:**
- Modify: `index.html:297-304` (CSS for aspect-opt)
- Modify: `index.html:1621-1631` (liveUpdate - show/hide zoom controls area)

**Step 1: Add CSS for disabled aspect ratio buttons**

Add after line 304 (after `.aspect-opt:hover, .aspect-opt.active` rule):

```css
.aspect-opt.disabled {
  opacity: 0.35;
  pointer-events: none;
}
```

**Step 2: Add logic to disable aspect ratio buttons in contain mode**

Add after line 1623 (after zoom controls visibility logic):

```javascript
  // Disable aspect ratio buttons in contain mode
  const usingNaturalRatio = imgFit === 'contain' && imgNaturalW > 0 && imgNaturalH > 0;
  document.querySelectorAll('.aspect-opt').forEach(btn => {
    btn.classList.toggle('disabled', usingNaturalRatio);
  });
```

**Step 3: Verify in browser**

1. Open `index.html` in browser
2. Upload an image
3. Select "Cover" mode - aspect ratio buttons should be clickable
4. Select "Contain" mode - aspect ratio buttons should be grayed out and unclickable

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: disable aspect ratio buttons in contain mode"
```

---

## Task 4: Persist Natural Dimensions in State

**Files:**
- Modify: `index.html:1978-2010` (saveState function)
- Modify: `index.html:2013-2086` (restoreState function)

**Step 1: Add natural dimensions to saved state**

In `saveState` function, add to the `images` object (around line 2003):

```javascript
    images: {
      avatar: avatarDataURL,
      cardImg: cardImgDataURL,
      position: imgPosition,
      ratio: imgRatio,
      fit: imgFit,
      offsetX: imgOffsetX,
      offsetY: imgOffsetY,
      zoom: imgZoom,
      naturalW: imgNaturalW,
      naturalH: imgNaturalH
    },
```

**Step 2: Restore natural dimensions in restoreState**

In `restoreState`, add after line 2062 (after `imgZoom` restoration):

```javascript
      imgNaturalW = state.images.naturalW ?? 0;
      imgNaturalH = state.images.naturalH ?? 0;
```

**Step 3: Verify in browser**

1. Open `index.html` in browser
2. Upload an image, select contain mode
3. Refresh the page
4. Verify the image still displays with correct natural aspect ratio
5. Check localStorage in DevTools to confirm naturalW/naturalH are saved

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: persist natural image dimensions in localStorage"
```

---

## Task 5: Final Testing and Edge Cases

**Files:**
- None (testing only)

**Step 1: Test edge cases**

Test these scenarios in the browser:

1. **No image uploaded, contain mode selected** - should show placeholder, no errors
2. **Switch from cover to contain** - should immediately adjust to natural ratio
3. **Switch from contain to cover** - should revert to selected aspect ratio
4. **Upload new image while in contain mode** - should update to new image's ratio
5. **Reset button** - should clear everything including natural dimensions
6. **Mobile layout** - verify contain mode works on mobile

**Step 2: Verify no console errors**

Open DevTools console, perform all actions, confirm no JavaScript errors.

**Step 3: Final commit (if any fixes needed)**

```bash
git add index.html
git commit -m "fix: edge case handling for contain mode"
```

---

## Summary

This implementation adds auto-fitting image containers in contain mode by:
1. Capturing natural dimensions when images are uploaded
2. Using natural aspect ratio for height calculation in contain mode
3. Visually disabling aspect ratio buttons when they're not applicable
4. Persisting natural dimensions for page refresh
