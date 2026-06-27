/*
  CLUE QUEST - SIMPLE MOBILE CLUE GAME
  ------------------------------------------------------------
  Edit the GAME object below to customize your game.

  question: what the player sees
  answers: accepted correct answers. Add variations here.
  success: message shown after the correct answer
  hint: optional hint shown when the player taps "Get hint"

  This version runs completely in the browser and can be hosted for free
  on GitHub Pages, Netlify, or Firebase Hosting.
*/

const GAME = {
  title: "Clue Quest",
  intro: "Welcome to Clue Quest. Answer each question correctly to unlock the next clue.",
  completionMessage: "You solved every clue. Game complete!",
  clues: [
    {
      question: "Clue 1: I have keys but no locks. I have space but no room. What am I?",
      answers: ["keyboard", "a keyboard", "computer keyboard"],
      success: "Correct. Your next clue is unlocked.",
      hint: "You probably touch one every day."
    },
    {
      question: "Clue 2: What has a face and two hands but no arms or legs?",
      answers: ["clock", "a clock", "watch", "a watch"],
      success: "Nice. Keep going.",
      hint: "It tells you something important."
    },
    {
      question: "Clue 3: What gets wetter as it dries?",
      answers: ["towel", "a towel"],
      success: "Exactly. Next clue coming up.",
      hint: "You use it after a shower."
    },
    {
      question: "Clue 4: What can travel around the world while staying in one corner?",
      answers: ["stamp", "a stamp", "postage stamp"],
      success: "Correct. Final clue unlocked.",
      hint: "It is often attached to mail."
    },
    {
      question: "Final Clue: What word becomes shorter when you add two letters to it?",
      answers: ["short", "the word short"],
      success: "That is it!",
      hint: "Think literally, not physically."
    }
  ]
};

const STORAGE_KEY = "clueQuestProgressV1";

const gameTitle = document.getElementById("gameTitle");
const chatWindow = document.getElementById("chatWindow");
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const hintButton = document.getElementById("hintButton");
const skipButton = document.getElementById("skipButton");
const resetButton = document.getElementById("resetButton");
const stepLabel = document.getElementById("stepLabel");
const percentLabel = document.getElementById("percentLabel");
const progressFill = document.getElementById("progressFill");

let currentStep = Number(localStorage.getItem(STORAGE_KEY) || 0);
let currentHintShown = false;

gameTitle.textContent = GAME.title;

function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ");
}

function addMessage(text, type = "game") {
  const bubble = document.createElement("div");
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateProgress() {
  const total = GAME.clues.length;
  const completed = Math.min(currentStep, total);
  const percent = Math.round((completed / total) * 100);

  if (currentStep >= total) {
    stepLabel.textContent = "Complete";
  } else {
    stepLabel.textContent = `Step ${currentStep + 1} of ${total}`;
  }

  percentLabel.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function showCurrentClue() {
  updateProgress();
  currentHintShown = false;

  if (currentStep >= GAME.clues.length) {
    addMessage(GAME.completionMessage, "system");
    answerForm.classList.add("hidden");
    hintButton.classList.add("hidden");
    skipButton.classList.add("hidden");
    return;
  }

  const clue = GAME.clues[currentStep];
  addMessage(clue.question, "game");
  answerInput.focus();
}

function startGame() {
  chatWindow.innerHTML = "";
  addMessage(GAME.intro, "system");
  showCurrentClue();
}

function advanceStep() {
  currentStep += 1;
  localStorage.setItem(STORAGE_KEY, currentStep);
  showCurrentClue();
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userAnswer = answerInput.value;
  if (!userAnswer.trim()) return;

  addMessage(userAnswer, "user");
  answerInput.value = "";

  const clue = GAME.clues[currentStep];
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  const acceptedAnswers = clue.answers.map(normalizeAnswer);

  if (acceptedAnswers.includes(normalizedUserAnswer)) {
    addMessage(clue.success || "Correct.", "game");
    setTimeout(advanceStep, 600);
  } else {
    addMessage("Not quite. Try again.", "game");
  }
});

hintButton.addEventListener("click", () => {
  if (currentStep >= GAME.clues.length) return;
  const clue = GAME.clues[currentStep];

  if (currentHintShown) {
    addMessage("Hint already shown for this clue.", "system");
    return;
  }

  addMessage(clue.hint || "No hint for this one.", "system");
  currentHintShown = true;
});

skipButton.addEventListener("click", () => {
  const confirmed = confirm("Host skip: reveal this clue and move to the next one?");
  if (!confirmed) return;

  const clue = GAME.clues[currentStep];
  addMessage(`Host skip used. Accepted answer: ${clue.answers[0]}`, "system");
  advanceStep();
});

resetButton.addEventListener("click", () => {
  const confirmed = confirm("Reset this game on this phone?");
  if (!confirmed) return;

  currentStep = 0;
  localStorage.removeItem(STORAGE_KEY);
  answerForm.classList.remove("hidden");
  hintButton.classList.remove("hidden");
  skipButton.classList.remove("hidden");
  startGame();
});

startGame();
