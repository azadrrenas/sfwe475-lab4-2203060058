# Data UX and Accessibility Notes

## Strand 1 - Prediction & States
1. **Prediction:** First 800 milliseconds will show "Loading tasks..." on the screen.
2. **Why Empty and Error need to be separate states:** Empty means there are no tasks yet, but error means something broke while loading them.

## Strand 2 - Form Validation
- **Why disabled button is not a substitute for Zod validation:** Users can easily turn on a disabled button using browser developer tools, so we still need Zod to check the data.

## Strand 3 - Accessibility
- **Keyboard Pass Results:** The whole form and all buttons work perfectly using only the keyboard.