# Lemur Doku

**Lemur Doku** is a kid friendly, browser based puzzle game inspired by Sudoku. Instead of numbers, players solve each puzzle using colorful lemur characters.

The game was created by **The Giant Lemur Foundation** to make logic puzzles approachable for children while connecting play with a larger message about education and opportunity.

**Website:** [GiantLemur.com](https://giantlemur.com)

---

## About the Game

Lemur Doku teaches the core logic of Sudoku through visual characters rather than numbers.

Players select a lemur and place it into an empty square while following simple rules:

1. A lemur cannot appear more than once in the same row.
2. A lemur cannot appear more than once in the same column.
3. On applicable levels, a lemur cannot appear more than once in the same region.

The early levels introduce these concepts gradually so children can learn through play rather than having to understand traditional Sudoku before starting.

---

## Levels

| Level | Board | Rules | Purpose |
|---|---:|---|---|
| **1** | 4 × 4 | Rows, columns, 2 × 2 regions | Guided introduction |
| **2** | 5 × 5 | Rows and columns | Develop pattern recognition |
| **3** | 6 × 6 | Rows, columns, 2 × 3 regions | Intermediate logic |
| **4** | 9 × 9 | Classic Sudoku rules | Full challenge |

---

## Features

• Nine original lemur characters  
• Progressive puzzle difficulty  
• Step by step tutorial for new players  
• Touch, mouse, and keyboard friendly controls  
• Positive feedback and encouragement  
• Hints and puzzle reset  
• Responsive phone, tablet, and desktop layout  
• Level completion celebration video  
• Giant Lemur Foundation educational message  
• No external game hosting required  
• No iframe required  
• Vanilla HTML, CSS, and JavaScript  

---

## Project Structure

```text
lemur-doku/
  index.html

  css/
    game.css

  js/
    game.js
    levels.js
    tutorial.js

  images/
    lemur-1.webp
    lemur-2.webp
    lemur-3.webp
    lemur-4.webp
    lemur-5.webp
    lemur-6.webp
    lemur-7.webp
    lemur-8.webp
    lemur-9.webp

  video/
    level-clear.mp4

  wordpress/
    lemur-doku.php

  docs/
    WORDPRESS_AI_INSTRUCTIONS.txt
    TESTING_CHECKLIST.txt

  README.md
```

---

## Running Locally

Lemur Doku does not require a build system or JavaScript framework.

### Simple method

Clone or download the repository and open:

```text
index.html
```

in a modern web browser.

### Local web server

Running through a local web server is recommended during development.

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## Game Architecture

The project intentionally separates game logic from content and presentation.

### `index.html`

Contains the primary game interface and loads the required assets.

### `css/game.css`

Controls:

• Game board layout  
• Responsive behavior  
• Lemur tray  
• Buttons and controls  
• Tutorial panels  
• Victory modal  
• Accessibility states  
• Jungle themed presentation  

### `js/game.js`

Contains the core game engine:

• Board rendering  
• Lemur selection  
• Cell placement  
• Move validation  
• Hint system  
• Reset behavior  
• Win detection  
• Level switching  
• Player feedback  
• Celebration flow  

### `js/levels.js`

Contains puzzle definitions and solutions.

Keeping levels separate from the game engine makes it easier to add additional puzzles later.

### `js/tutorial.js`

Controls the guided learning experience for beginning players.

---

# Adding New Levels

New puzzles should be defined inside:

```text
js/levels.js
```

A level should define:

```javascript
{
  name: "Level Name",
  size: 4,
  puzzle: [],
  solution: [],
  regionRows: 2,
  regionColumns: 2
}
```

The puzzle and solution arrays should contain valid Lemur Doku boards.

Future versions can support multiple puzzles for each board size.

---

# WordPress

Lemur Doku is designed to run directly on **GiantLemur.com** without relying on an external game host.

The intended production page is:

```text
https://giantlemur.com/lemur-doku/
```

## WordPress Goals

The WordPress implementation should:

1. Host all assets locally.
2. Load the Lemur Doku CSS and JavaScript.
3. Load lemur images from the WordPress installation.
4. Load the celebration video locally.
5. Avoid external game hosting.
6. Avoid iframes.
7. Preserve the responsive design.
8. Preserve all tutorial functionality.

---

## WordPress Shortcode

The WordPress implementation is designed to support:

```text
[lemur_doku]
```

The shortcode can be placed into the page where the game should appear.

The WordPress integration code is located in:

```text
wordpress/lemur-doku.php
```

See:

```text
docs/WORDPRESS_AI_INSTRUCTIONS.txt
```

for additional deployment instructions.

---

# Educational Design

Lemur Doku is intended to teach problem solving without making the experience feel like a lesson.

The design emphasizes:

### Pattern Recognition

Children learn to identify which lemur is missing from a row, column, or region.

### Logical Reasoning

Players learn that some possibilities can be eliminated based on what is already on the board.

### Progressive Difficulty

Players begin with four characters instead of immediately encountering a traditional 9 × 9 Sudoku board.

### Positive Feedback

Incorrect moves should be treated as part of learning.

Examples include:

```text
Try another spot.

Almost there!

Take another look at this row.

Good thinking!

Nice deduction!

Great spotting!
```

The game should never make a child feel that experimentation is failure.

---

# Accessibility

Lemur Doku should remain usable by as many players as possible.

Development should preserve:

• Keyboard accessible controls  
• Large touch targets  
• Descriptive image labels  
• Strong text contrast  
• Visual states that do not depend exclusively on color  
• Responsive layouts  
• Reduced motion support where practical  

---

# Design Direction

The visual design uses a warm jungle theme built around:

```text
Deep Green
#2e7d32

Warm Gold
#fbc02d
```

The lemur artwork should remain the visual focus of the game.

UI elements should use:

• Rounded corners  
• Friendly typography  
• Clear spacing  
• Large buttons  
• Simple navigation  
• Minimal visual clutter  

---

# Level Completion

Completing a puzzle should feel rewarding.

The level completion experience includes:

1. A celebration animation or modal.
2. The supplied celebration video.
3. A congratulatory message.
4. An option to replay.
5. An option to continue to the next level.

The completion screen also introduces the mission of The Giant Lemur Foundation:

> **Every child deserves a bright future. Learn how you can help kids access education in Africa at GiantLemur.com.**

The educational message should remain secondary to the game experience and should not repeatedly interrupt gameplay.

---

# Giant Lemur Foundation

Lemur Doku was developed by **The Giant Lemur Foundation**.

The Foundation works to help create educational opportunities for children who otherwise may not have access to them.

Learn more:

**https://giantlemur.com**

Consider a donation to help a child attend school who otherwise would not be able to attend.

---

# Testing

Before releasing changes, test:

```text
[ ] 4x4 level
[ ] 5x5 level
[ ] 6x6 level
[ ] 9x9 level

[ ] Lemur selection
[ ] Valid moves
[ ] Invalid moves
[ ] Row completion
[ ] Column completion
[ ] Region validation
[ ] Hint behavior
[ ] Reset
[ ] Tutorial
[ ] Level progression
[ ] Victory detection
[ ] Celebration video

[ ] Desktop browser
[ ] Mobile browser
[ ] Tablet layout
[ ] Touch input
[ ] Keyboard input

[ ] No horizontal scrolling
[ ] No broken images
[ ] No JavaScript console errors
[ ] GiantLemur.com links work
[ ] Donation link works
```

---

# Development Principles

When contributing to Lemur Doku:

1. **Keep it simple.** Children should understand what to do almost immediately.
2. **Teach through interaction.** Avoid long instruction screens.
3. **Keep it encouraging.** Mistakes are part of solving the puzzle.
4. **Protect performance.** Avoid unnecessary frameworks and dependencies.
5. **Design mobile first.** Touch interaction is a primary use case.
6. **Keep game logic separate from puzzle data.**
7. **Keep all production assets locally hosted.**
8. **Do not introduce an iframe dependency.**
9. **Preserve accessibility.**
10. **Make it fun.**

---

# Future Ideas

Potential future enhancements include:

• Additional puzzle packs  
• Daily Lemur Doku puzzle  
• Difficulty selection  
• Player achievements  
• Stars for completing puzzles  
• Puzzle completion streaks  
• Sound effects  
• Optional jungle ambience  
• Lemur character names and personalities  
• Lemur facts between levels  
• Madagascar geography and wildlife content  
• Classroom mode  
• Printable puzzles  
• Teacher resources  
• Saved player progress  
• Accessibility settings  
• Multiple puzzles per difficulty  
• Puzzle generator  

---

# Contributing

Contributions that improve the educational value, accessibility, performance, puzzle quality, or overall player experience are welcome.

When submitting changes, please avoid introducing external dependencies unless they provide a substantial benefit.

---

# Credits

**Concept and Development**  
The Giant Lemur Foundation

**Website**  
[https://giantlemur.com](https://giantlemur.com)

---

## Mission

**Play. Think. Learn. Help another child learn.**