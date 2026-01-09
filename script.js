let currentTest = 0;
let currentQuestion = 0;
let answers = [];

function startTest(testIndex) {
    currentTest = testIndex;
    currentQuestion = 0;
    answers = [];
    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    const q = tests[currentTest][currentQuestion];
    document.getElementById("questionText").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        optionsDiv.innerHTML += `
            <div class="option">
                <input type="radio" name="option" value="${i}"
                ${answers[currentQuestion] == i ? "checked" : ""}>
                ${opt}
            </div>`;
    });

    document.querySelector(".finish").classList.toggle(
        "hidden",
        currentQuestion !== tests[currentTest].length - 1
    );
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestion < tests[currentTest].length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function saveAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        answers[currentQuestion] = parseInt(selected.value);
    }
}

function finishTest() {
    saveAnswer();
    let correct = 0;
    tests[currentTest].forEach((q, i) => {
        if (answers[i] === q.correct) correct++;
    });

    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    if (correct === tests[currentTest].length) {
        document.getElementById("resultText").innerText =
            "🎉 Urime! Keni kaluar testin.";
        document.getElementById("nextTestBtn").classList.remove("hidden");
    } else {
        document.getElementById("resultText").innerText =
            "❌ Keni dështuar. Provoni sërish.";
        document.getElementById("retryBtn").classList.remove("hidden");
    }
}

function retryTest() {
    document.getElementById("result").classList.add("hidden");
    startTest(currentTest);
}

function nextTest() {
    document.getElementById("result").classList.add("hidden");
    startTest(currentTest + 1);
}
