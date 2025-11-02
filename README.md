# Tic‑Tac‑Toe Code Smells Kata (TypeScript)

This repository contains a deliberately messy implementation of tic‑tac‑toe alongside a refactored version.  The goal was to identify simple code smells—duplicated logic, magic constants and long methods—and address them while preserving the original API expected by the lab tests.

## Key Improvements

- **Centralised constants** – `EMPTY_CELL` and `BOARD_DIMENSION` live in `constants.ts` so there are no scattered `' '` and hard‑coded board sizes.
- **Single responsibility** – a new `Board` class encapsulates grid storage and win detection.  It exposes `place`, `at`, `isFull` and `getWinner`, which makes the game engine easier to reason about.
- **Simpler Game logic** – `Game.play()` delegates pre‑move checks to helper methods (`ensureValidMove`, `isFirstMoveIllegal`, `isSamePlayerTwice`) and defers win logic to `Board`.  This eliminates the duplicate row checks in the original code.
- **Row, column and diagonal wins** – the board now checks all lines for a winner using a reusable helper instead of hand‑checking three rows.

## Running Tests

From the project root run:

```bash
npm ci
npm test
```

This will compile the TypeScript (if needed) and run the Jest test suite provided by the lab.  All tests should pass with the refactored code.
