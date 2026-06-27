# Clue Quest

A simple, free, mobile-friendly clue game. Players answer a question correctly to unlock the next clue.

## What this includes

- `index.html` - webpage structure
- `style.css` - mobile-friendly chat-style design
- `script.js` - game logic and editable clue list

## How to customize the game

Open `script.js` and edit the `GAME` object near the top.

Each clue has this format:

```js
{
  question: "Clue text shown to the player",
  answers: ["accepted answer", "another accepted answer"],
  success: "Message after a correct answer",
  hint: "Optional hint"
}
```

## How to test locally

Open `index.html` in a browser.

## How to deploy free with GitHub Pages

1. Create a free GitHub account if you do not have one.
2. Create a new repository, for example `clue-quest`.
3. Upload `index.html`, `style.css`, and `script.js` to the repository.
4. Go to **Settings > Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/root` folder.
7. Save.
8. GitHub will give you a public link.

## Important note

This is a simple static web app. It is perfect for casual games, parties, scavenger hunts, and prototypes. Since the answers are stored in the JavaScript file, a very technical player could inspect the code and find them. For stronger answer protection, use a backend option like Firebase later.
