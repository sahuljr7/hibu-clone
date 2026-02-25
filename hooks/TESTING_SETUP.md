# Testing Setup for Hibu One Landing Page

## Required Dependencies

To run the property-based tests for the reduced motion hook, you need to install the following dependencies:

```bash
pnpm add -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom fast-check @types/jest ts-node
```

## Configuration Files

The following configuration files have been created:

- `jest.config.js` - Jest configuration for Next.js
- `jest.setup.js` - Jest setup file for testing-library/jest-dom

## Running Tests

### Run all tests
```bash
pnpm test
```

### Run property-based tests only
```bash
pnpm test use-reduced-motion.pbt.test
```

### Run with coverage
```bash
pnpm test --coverage
```

## Test Files

- `hooks/use-reduced-motion.test.ts` - Unit tests for the reduced motion hook
- `hooks/use-reduced-motion.pbt.test.ts` - Property-based tests for the reduced motion hook

## Property-Based Test Details

The property-based tests validate **Property 3: Motion Preference Respect** which ensures:

1. The hook returns the correct value for any initial motion preference state
2. The hook updates to reflect any sequence of preference changes
3. Event listeners are properly cleaned up on unmount
4. The correct media query string is always used
5. Rapid preference changes are handled correctly without race conditions

Each property test runs 100 iterations with randomly generated test cases using fast-check.
