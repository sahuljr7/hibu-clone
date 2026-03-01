# Manual Testing Guide - Task 4.1: DynamicBackground on Industries Page

## Overview
This guide provides step-by-step instructions to manually verify that the DynamicBackground component works correctly on the `/industries` page according to Requirements 5.1 and 5.2.

## Prerequisites
- Development server running (`npm run dev`)
- Browser with DevTools (Chrome, Firefox, or Edge recommended)

## Test Procedure

### Test 1: Dark Theme - Particles Visible (Requirement 5.1)

1. **Navigate to Industries Page**
   - Open browser to `http://localhost:3000/industries`

2. **Enable Dark Theme**
   - Look for theme toggle in the navigation
   - Click to switch to dark theme
   - OR use browser DevTools:
     - Open DevTools (F12)
     - In Console, run: `document.documentElement.classList.add('dark')`

3. **Verify Particles Are Visible**
   - You should see animated white/light particles moving across the background
   - Particles should have subtle purple connecting lines between them
   - Animation should be smooth (30+ FPS)

4. **Inspect Canvas Element**
   - Open DevTools Elements tab
   - Find the `<canvas>` element inside the DynamicBackground component
   - Verify it has classes: `absolute inset-0 hidden dark:block`
   - Verify the canvas is visible (not display: none)

5. **Verify Fluid Gradient is Hidden**
   - In Elements tab, find the element with class `dynamic-fluid-bg`
   - Verify it has class `dark:hidden`
   - Verify it is not visible in dark theme

### Test 2: Light Theme - Particles Hidden (Requirement 5.2)

1. **Switch to Light Theme**
   - Click theme toggle to switch to light theme
   - OR use browser DevTools:
     - In Console, run: `document.documentElement.classList.remove('dark')`

2. **Verify Particles Are Hidden**
   - Particles should NOT be visible
   - You should see a fluid gradient background instead
   - The gradient should have soft, flowing colors (blue/purple tones)

3. **Inspect Canvas Element**
   - Open DevTools Elements tab
   - Find the `<canvas>` element
   - Verify it still has class `hidden` (which hides it in light theme)
   - Verify the canvas is NOT visible (display: none or equivalent)

4. **Verify Fluid Gradient is Visible**
   - In Elements tab, find the element with class `dynamic-fluid-bg`
   - Verify it is visible in light theme
   - The gradient should be animating subtly based on scroll

### Test 3: Theme Switching

1. **Toggle Between Themes Multiple Times**
   - Switch from light to dark: Particles should appear
   - Switch from dark to light: Particles should disappear, gradient appears
   - Repeat 3-4 times to ensure smooth transitions

2. **Verify No Visual Glitches**
   - No flickering during theme switch
   - Smooth transition between particle and gradient backgrounds
   - No layout shifts or content jumps

### Test 4: Performance Check

1. **Open Performance Monitor**
   - In DevTools, go to Performance tab
   - OR use Chrome's FPS meter:
     - Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
     - Type "Show frames per second"
     - Enable FPS meter

2. **Verify Frame Rate in Dark Theme**
   - With particles visible, check FPS
   - Should maintain 30+ FPS consistently
   - Scroll the page - FPS should remain stable

3. **Verify No Performance Impact in Light Theme**
   - Switch to light theme
   - Verify FPS remains high
   - Particles should not be rendering (canvas cleared)

### Test 5: Accessibility

1. **Verify Background Doesn't Block Interactions**
   - Try clicking on page content (text, buttons, links)
   - All interactive elements should work normally
   - Background should not interfere with user interactions

2. **Check ARIA Attributes**
   - In Elements tab, find the DynamicBackground container
   - Verify it has `aria-hidden="true"`
   - Verify it has `pointer-events-none` class

3. **Test with Reduced Motion**
   - Enable reduced motion in OS settings:
     - **macOS**: System Preferences > Accessibility > Display > Reduce motion
     - **Windows**: Settings > Ease of Access > Display > Show animations
   - Refresh the page
   - Particles should still render but with minimal/no animation

## Expected Results Summary

| Theme | Particles Visible | Fluid Gradient Visible | Canvas Class |
|-------|------------------|----------------------|--------------|
| Dark  | ✅ Yes           | ❌ No                | `dark:block` |
| Light | ❌ No            | ✅ Yes               | `hidden`     |

## Common Issues and Troubleshooting

### Issue: Particles not appearing in dark theme
- **Check**: Is the `dark` class present on `<html>` element?
- **Check**: Is the canvas element present in the DOM?
- **Check**: Are there any console errors?
- **Fix**: Verify theme provider is working correctly

### Issue: Particles visible in light theme
- **Check**: Is the canvas properly hidden with `hidden` class?
- **Check**: Is Tailwind CSS properly configured for dark mode?
- **Fix**: Verify Tailwind dark mode configuration

### Issue: Poor performance / low FPS
- **Check**: How many particles are rendering? (Should be 24-64)
- **Check**: Is device pixel ratio too high?
- **Fix**: Component automatically adjusts particle count based on viewport

### Issue: Theme switching doesn't work
- **Check**: Is next-themes properly configured?
- **Check**: Are theme classes updating on `<html>` element?
- **Fix**: Verify ThemeProvider is wrapping the app

## Automated Tests

The automated unit tests cover:
- ✅ Canvas visibility in dark theme (Requirement 5.1)
- ✅ Canvas hidden in light theme (Requirement 5.2)
- ✅ Fluid gradient visibility toggle
- ✅ Z-index layering
- ✅ Pointer events
- ✅ Theme switching behavior
- ✅ Reduced motion support

Run tests with:
```bash
npm test -- dynamic-background.test.tsx
```

## Sign-off

- [ ] Dark theme shows particles (Requirement 5.1)
- [ ] Light theme hides particles (Requirement 5.2)
- [ ] Theme switching works smoothly
- [ ] Performance is acceptable (30+ FPS)
- [ ] No interaction blocking
- [ ] Accessibility attributes present
- [ ] Automated tests pass

**Tester Name**: _________________
**Date**: _________________
**Browser/Version**: _________________
**Notes**: _________________
