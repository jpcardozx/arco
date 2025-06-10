# ESLint Automated Fixes

This directory contains scripts to help fix ESLint warnings in the project automatically.

## Scripts Overview

1. **run-all-fixes.js** - Master script that runs all fixes in the correct order
2. **fix-react-jsx.js** - Adds React imports to files using JSX to fix "React is not defined" errors
3. **fix-unused-imports.js** - Removes unused imports and variables
4. **fix-import-order.js** - Fixes import order according to project rules
5. **analyze-hooks-deps.js** - Analyzes and reports React Hooks dependency issues (doesn't fix automatically)

## How to Use

### Option 1: Run All Fixes

To run all automated fixes at once, use:

```bash
node eslint-fix-scripts/run-all-fixes.js
```

This will:

1. Add React imports where needed
2. Remove unused imports and variables
3. Fix import order issues
4. Run general ESLint fixes
5. Report remaining issues

### Option 2: Run Individual Fixes

If you prefer to run fixes individually:

```bash
# Fix React/JSX not defined issues
node eslint-fix-scripts/fix-react-jsx.js

# Fix unused imports and variables
node eslint-fix-scripts/fix-unused-imports.js

# Fix import order
node eslint-fix-scripts/fix-import-order.js

# Analyze React Hooks dependency issues (doesn't fix automatically)
node eslint-fix-scripts/analyze-hooks-deps.js
```

## Remaining Issues

After running the automated fixes, there may be some remaining issues that require manual intervention:

1. **React Hooks Dependency Warnings**:

   - Issues with missing dependencies in useEffect, useMemo, etc.
   - These need careful review as automatic fixes might break functionality

2. **TypeScript Undefined References**:
   - Some type references might remain undefined
   - You may need to add appropriate type definitions or imports

## Best Practices

1. **Commit your changes** before running these scripts
2. Run the scripts one by one if you want to review changes between steps
3. After running automated fixes, manually review critical files
4. For React Hooks dependency warnings, carefully analyze each case as blindly adding dependencies can cause side effects

## Examples of Manual Fixes

### React Hooks Dependencies

```jsx
// Before
useEffect(() => {
  fetchData(userId);
}, []); // Missing dependency: userId

// After
useEffect(() => {
  fetchData(userId);
}, [userId]); // Added userId to dependency array
```

### Unused Imports

```jsx
// Before
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// If Button is not used, after fixing:
import React, { useState, useEffect } from 'react';
```
