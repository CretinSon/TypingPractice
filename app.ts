// app.ts
let startTime: number | null = null;
let timerInterval: any = null;
const sampleTexts = [
  "สวัสดีครับ นี่คือโปรแกรมฝึกพิมพ์สัมผัส",
  "การพิมพ์สัมผัสเป็นทักษะที่สำคัญในยุคดิจิทัล",
  "ฝึกพิมพ์บ่อย ๆ จะช่วยให้คุณเก่งขึ้น",
];

const sampleTextEl = document.getElementById("sample-text")!;
const inputBoxEl = document.getElementById("input-box") as HTMLTextAreaElement;
const timerEl = document.getElementById("timer")!;
const wpmEl = document.getElementById("wpm")!;
const startBtnEl = document.getElementById("start-btn")!;

startBtnEl.addEventListener("click", startGame);

function startGame() {
  resetGame();
  const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  sampleTextEl.textContent = randomText;
  inputBoxEl.disabled = false;
  inputBoxEl.focus();
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);

  inputBoxEl.addEventListener("input", checkInput);
}

function checkInput() {
  const inputText = inputBoxEl.value;
  const sampleText = sampleTextEl.textContent || "";

  if (inputText === sampleText) {
    clearInterval(timerInterval);
    calculateWPM();
    inputBoxEl.disabled = true;
  }
}

function updateTimer() {
  if (startTime) {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = elapsedTime.toString();
  }
}

function calculateWPM() {
  const elapsedTime = Math.floor((Date.now() - startTime!) / 1000);
  const wordCount = (sampleTextEl.textContent || "").split(" ").length;
  const wpm = Math.round((wordCount / elapsedTime) * 60);
  wpmEl.textContent = wpm.toString();
}

function resetGame() {
  inputBoxEl.value = "";
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  clearInterval(timerInterval);
  startTime = null;
}
