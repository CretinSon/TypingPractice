// รายการคำตัวอย่างภาษาไทย
const testSamples = [
    "สุนัขจิ้งจอกสีส้มกระโดดข้ามสุนัขตัวขี้เกียจ",
    "การเดินทางพันลี้ต้องเริ่มต้นด้วยก้าวแรก",
    "เราจะรู้คุณค่าของน้ำก็ต่อเมื่อต้องการดื่ม",
    "ทองที่แวววาวไม่ใช่ทองคำเสมอไป",
    "ฉันคิด ดังนั้นฉันจึงมีอยู่",
    "โอกาสอยู่ในมือของคนกล้า"
];

// สุ่มเลือกข้อความตัวอย่าง
function getRandomSample() {
    const randomIndex = Math.floor(Math.random() * testSamples.length);
    return testSamples[randomIndex];
}

const testTextElement = document.getElementById("testText");
let testText = getRandomSample(); // เรียกใช้การสุ่มคำตัวอย่างครั้งแรก
testTextElement.textContent = testText;

const inputArea = document.getElementById("inputArea");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

let startTime;
let timerInterval;
let timeLimit = 60;  // กำหนดเวลา 1 นาที (60 วินาที)

function startTest() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    inputArea.disabled = false;
    inputArea.focus();
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = timeElapsed;

    if (timeElapsed >= timeLimit) {
        clearInterval(timerInterval); // หยุดจับเวลาเมื่อครบ 1 นาที
        inputArea.disabled = true;
        calculateResults(); // คำนวณผลลัพธ์เมื่อหมดเวลา
    }
}

function calculateResults() {
    const inputText = inputArea.value.trim();
    const inputWords = inputText.split(/\s+/).length;
    const wpm = Math.round((inputWords / timeLimit) * 60); // คำนวณ WPM โดยใช้เวลา 1 นาที

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < inputText.length; i++) {
        if (inputText[i] === testText[i]) {
            correctChars++;
        }
    }
    const accuracy = Math.round((correctChars / testText.length) * 100);

    // Update the display
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

inputArea.addEventListener("input", () => {
    if (!startTime) {
        startTest();
    }
    calculateResults();
});

restartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    testText = getRandomSample(); // สุ่มข้อความใหม่เมื่อกดรีสตาร์ท
    testTextElement.textContent = testText; // แสดงข้อความใหม่
    inputArea.value = "";
    timerDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
    inputArea.disabled = true;
    startTime = null;
});
