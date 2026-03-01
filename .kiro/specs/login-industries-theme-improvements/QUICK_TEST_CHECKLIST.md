# Quick Test Checklist - Task 8

Use this checklist for rapid verification of all requirements.

## Automated Tests

```bash
npm test
```

- [ ] All tests pass with no errors

---

## Login Page (`/login`)

### Light Theme
- [ ] Particles visible and smooth
- [ ] Card border clearly visible
- [ ] Hover: blur + glow + scale effect
- [ ] Text readable (WCAG AA)

### Dark Theme
- [ ] Particles hidden
- [ ] Card border clearly visible
- [ ] Hover: blur + glow + scale effect
- [ ] Text readable (WCAG AA)

### Theme Switching
- [ ] Instant update (no refresh)
- [ ] Particles appear/disappear correctly

---

## Industries Page (`/industries`)

### Dark Theme
- [ ] Particles visible and smooth
- [ ] Matches `/resources` and `/company`
- [ ] Scroll interaction works

### Light Theme
- [ ] Particles hidden
- [ ] Fluid gradient visible

---

## Responsive (Quick Check)

- [ ] 375px mobile: Works correctly
- [ ] 768px tablet: Works correctly
- [ ] 1920px desktop: Works correctly

---

## Browser Testing

- [ ] Chrome: All effects work
- [ ] Firefox: All effects work
- [ ] Safari: All effects work (backdrop-filter may vary)

---

## Performance

Open Chrome DevTools > Performance:
- [ ] Record 10 seconds on `/login` light theme
- [ ] FPS stays above 30 (ideally 60)
- [ ] Record 10 seconds on `/industries` dark theme
- [ ] FPS stays above 30 during scroll

---

## Accessibility

- [ ] Tab through login form (keyboard nav works)
- [ ] Particles don't block interactions
- [ ] Enable reduced motion: Particles disabled/subtle

---

## Final Verification

- [ ] No console errors
- [ ] No console warnings
- [ ] All 7 requirements validated
- [ ] Ready for production

---

**Status:** [ ] PASS [ ] FAIL

**Issues Found:** ___________________________

**Tested By:** ___________________________

**Date:** ___________________________
