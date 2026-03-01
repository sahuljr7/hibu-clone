# Particle Visibility Debugging Guide

## Task: 4.2 Debug if particles are not appearing
**Requirements:** 5.1

## Overview
This guide helps debug why particles may not be appearing on the `/industries` page in dark theme.

## Expected Behavior
- **Dark Theme**: Particles should be visible and animated
- **Light Theme**: Fluid gradient background should be visible (no particles)

## Debugging Steps

### 1. Verify Dark Theme is Active

Open browser DevTools (F12) and run in console:
```javascript
document.documentElement.classList.contains('dark')
```
**Expected Result:** `true` in dark theme, `false` in light theme

### 2. Inspect Canvas Element

In DevTools Elements tab, find the canvas element:
```html
<canvas class="absolute inset-0 hidden dark:block"></canvas>
```

**Check:**
- ✅ Canvas element exists
- ✅ Has class `hidden dark:block`
- ✅ Has class `absolute inset-0`

### 3. Check Computed Styles

Select the canvas element in DevTools and check Computed tab:

**In Dark Theme:**
- `display` should be `block` (not `none`)
- `position` should be `absolute`
- `width` and `height` should match viewport dimensions
- `z-index` should be `auto` (parent has `-z-10`)

**In Light Theme:**
- `display` should be `none`

### 4. Verify Parent Container Z-Index

Find the parent div with `aria-hidden="true"`:
```html
<div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
```

**Check:**
- ✅ Has class `-z-10` (behind content)
- ✅ Has class `fixed inset-0` (full viewport)
- ✅ Has class `pointer-events-none` (doesn't block interactions)

### 5. Check Browser Console for Errors

Open Console tab in DevTools and look for:
- ❌ Canvas context errors
- ❌ JavaScript errors
- ❌ Resource loading errors

**Common Errors:**
- "Cannot read property 'getContext' of null" → Canvas ref not set
- "Failed to execute 'getContext'" → Canvas API issue

### 6. Verify Canvas Dimensions

In Console, run:
```javascript
const canvas = document.querySelector('canvas');
console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
console.log('Canvas style:', canvas.style.width, 'x', canvas.style.height);
```

**Expected Result:**
- `canvas.width` and `canvas.height` should be > 0
- Style dimensions should match viewport

### 7. Check Particle Rendering

In Console, verify particles are being drawn:
```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log('Canvas context:', ctx);
console.log('Canvas has content:', ctx.getImageData(0, 0, 1, 1).data.some(v => v > 0));
```

### 8. Verify Theme Detection in Component

The component checks theme like this:
```typescript
const isDark = document.documentElement.classList.contains('dark')
if (!isDark) {
  ctx.clearRect(0, 0, w, h) // Clears canvas in light theme
  return
}
```

If particles aren't rendering, the theme detection might be failing.

### 9. Check for CSS Conflicts

Look for any CSS that might override the canvas visibility:
```css
/* These would hide the canvas */
canvas { display: none !important; }
.dark canvas { visibility: hidden; }
```

Search in DevTools Styles tab for any overriding rules.

### 10. Verify Reduced Motion Preference

In Console:
```javascript
window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

**Expected Result:** `false` (particles should render)

If `true`, particles are intentionally disabled for accessibility.

## Common Issues and Solutions

### Issue: Canvas is `display: none` in dark theme

**Cause:** Tailwind's `hidden` class is not being overridden by `dark:block`

**Solution:** Check that:
1. Tailwind's dark mode is configured correctly in `tailwind.config.js`
2. The `dark` class is on the `<html>` element
3. No CSS is overriding with `!important`

### Issue: Canvas dimensions are 0x0

**Cause:** Canvas resize logic hasn't run yet

**Solution:** Wait for component to mount and useEffect to execute

### Issue: Particles render but are invisible

**Cause:** Alpha values too low or colors don't contrast with background

**Solution:** Check particle colors in code:
```typescript
const dotAlpha = 0.16 + intensity * 0.12
ctx.fillStyle = `rgba(240, 245, 255, ${dotAlpha})` // Near-white dots
```

### Issue: Canvas exists but nothing is drawn

**Cause:** Animation loop not running or theme detection failing

**Solution:** 
1. Check `requestAnimationFrame` is being called
2. Verify `isDark` is `true`
3. Check particles array has items

## Test Results

### ✅ Passing Checks
- [ ] Dark theme class is present on `<html>`
- [ ] Canvas element exists with correct classes
- [ ] Canvas is `display: block` in dark theme
- [ ] Canvas dimensions are set correctly
- [ ] No console errors
- [ ] Z-index stacking is correct
- [ ] Parent container has `-z-10`
- [ ] Reduced motion is not enabled

### ❌ Failing Checks
- [ ] (List any failing checks here)

## Implementation Analysis

The `DynamicBackground` component implementation is **correct**:

1. ✅ Canvas has `hidden dark:block` classes
2. ✅ Theme detection uses `document.documentElement.classList.contains('dark')`
3. ✅ Particles only render when `isDark === true`
4. ✅ Z-index is `-z-10` (behind content)
5. ✅ Pointer events are disabled
6. ✅ Canvas dimensions are set dynamically
7. ✅ Respects `prefers-reduced-motion`

## Conclusion

Based on code review, the implementation is correct. If particles are not appearing:

1. **Most Likely:** Theme is not actually in dark mode (check `<html>` class)
2. **Possible:** Browser doesn't support `backdrop-filter` or canvas API
3. **Possible:** Reduced motion preference is enabled
4. **Unlikely:** CSS conflict or z-index issue

## Next Steps

1. Run the debug test suite: `npm test -- dynamic-background.debug.test.tsx`
2. Manually verify each debugging step above in browser
3. If all checks pass but particles still don't appear, investigate:
   - Browser compatibility
   - Performance throttling
   - Canvas API availability
