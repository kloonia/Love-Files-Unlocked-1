// =======================
// THE SECRET BETWEEN US
// =======================

// 25 QUESTIONS

const questions = [

"What's your favorite memory of us?",

"What was your first impression of me?",

"What do you admire most about me?",

"What is one thing that always makes you smile?",

"What is your biggest dream right now?",

"What is your biggest fear?",

"If we could travel anywhere together, where would you go?",

"What moment made you fall in love with me?",

"What is one thing you never want to lose?",

"What makes you feel loved?",

"What is your love language?",

"What habit of mine do you secretly like?",

"What habit of mine annoys you the most?",

"What is your ideal future relationship?",

"What is your favorite date we've ever had?",

"What is something you've never told me?",

"What is your biggest relationship lesson?",

"What is one thing we should improve together?",

"What would you do if we had one perfect day together?",

"What song reminds you of us?",

"What makes a relationship last forever?",

"What is your favorite thing about our relationship?",

"What is one promise you want us to keep?",

"Describe our relationship in one word.",

"What does true love mean to you?"

];

// =======================
// VARIABLES
// =======================

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

// =======================
// ELEMENTS
// =======================

const coverScreen = document.getElementById("cover-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");

const progressBar = document.getElementById("progress-bar");
const timerDisplay = document.getElementById("timer");
const questionCounter = document.getElementById("question-counter");

const finalScore = document.getElementById("final-score");
const compatibilityResult = document.getElementById("compatibility-result");
const finalMessage = document.getElementById("final-message");

// AUDIO

const clickSound = document.getElementById("click-sound");
const finishSound = document.getElementById("finish-sound");

// =======================
// START GAME
// =======================

startBtn.addEventListener("click", () => {

    coverScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    loadQuestion();

});

// =======================
// LOAD QUESTION
// =======================

function loadQuestion() {

    clearInterval(timerInterval);

    questionText.textContent =
        questions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    answerInput.value =
        localStorage.getItem(
            `answer-${currentQuestion}`
        ) || "";

    timeLeft = 10;

    timerDisplay.textContent = timeLeft;

    startTimer();

}

// =======================
// TIMER
// =======================

function startTimer() {

    timerInterval = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            nextQuestion();

        }

    }, 1000);

}

// =======================
// SAVE ANSWER
// =======================

answerInput.addEventListener("input", () => {

    localStorage.setItem(
        `answer-${currentQuestion}`,
        answerInput.value
    );

});

// =======================
// NEXT BUTTON
// =======================

nextBtn.addEventListener("click", () => {

    nextQuestion();

});

// =======================
// NEXT QUESTION
// =======================

function nextQuestion() {

    clickSound.play();

    const answer =
        answerInput.value.trim();

    // Simple scoring

    if (answer.length > 15) {

        score++;

    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showResult();

    } else {

        loadQuestion();

    }

}

// =======================
// RESULT
// =======================

function showResult() {

    clearInterval(timerInterval);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finishSound.play();

    finalScore.innerHTML =
        `Compatibility Score: ${score}/25`;

    let title = "";
    let message = "";

    if (score <= 6) {

        title = "👀 Stranger";

        message =
            "You still have a lot to learn about each other.";

    }

    else if (score <= 12) {

        title = "😊 Close Friends";

        message =
            "You know each other quite well, but there's more to discover.";

    }

    else if (score <= 19) {

        title = "❤️ Soulmate";

        message =
            "Your connection is strong and meaningful.";

    }

    else {

        title = "🔥 Twin Flame";

        message =
            "Your bond is rare and incredibly deep.";

    }

    compatibilityResult.innerHTML =
        title;

    finalMessage.innerHTML =
        message;

    progressBar.style.width = "100%";

}

// =======================
// RESTART
// =======================

function restartQuiz() {

    localStorage.clear();

    currentQuestion = 0;
    score = 0;

    resultScreen.classList.add("hidden");

    coverScreen.classList.remove("hidden");

}