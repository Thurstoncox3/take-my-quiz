var startButton = document.getElementById("start-btn");
var finButton = document.getElementById("fin-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var timeEl = document.querySelector("#timer");
var mainEl = document.getElementById("main");
var score = 0;
var timeLeft = 45;
var highScoresList = document.getElementById("highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var answer = true

console.log(score)
console.log(highScores);

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener("click", function () {
    setTime();
    startGame();
});
var setTime = function () {

    var timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = timeLeft + " Seconds Left in Quiz!";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            startButton.classList.remove("hide");
            alert("Times up!");
        } 
    }, 1000);
}
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log("Start")
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide")

    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
console.log(setNextQuestion)
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        console.log(score)
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }  
    if (selectedButton.dataset = correct) {
        score += 14;
    } else if (selectedButton.dataset != correct) {
        score -= 14;
         timeLeft -= 5;
    }
}
console.log(selectAnswer)
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}
console.log(questions)
var questions = [
    {
        question: "Which animal is venomous? ",
        answers: [
            { text: "Platypus", correct: true },
            { text: "Anaconda", correct: false },
        ]
    },
    {
        question: "What is a string? ",
        answers: [
            { text: "words set in quotes", correct: true },
            { text: "numbers", correct: false },
        ]
    },
    {
        question: "Whcih is a variable? ",
        answers: [
            { text: "Var", correct: true },
            { text: "text", correct: false },
        ]
    },
    {
        question: "Who is our Professor? ",
        answers: [
            { text: "Anthony", correct: true },
            { text: "Anaconda", correct: false },
        ]
    },
    {
        question: "Who is your TA? ",
        answers: [
            { text: "Sasha", correct: true },
            { text: "Fernando", correct: false },
        ]
    },
    {
        question: "What is a Web API? ",
        answers: [
            { text: "An application programming interface", correct: true },
            { text: "An app for your puppy", correct: false },
        ]
    },
    {
        question: "HTML DOM is...? ",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Fast n Furious (Family)", correct: false },
        ]
    }
]