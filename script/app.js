

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestion(){
    const totalQuestion = quiz.length;

    for(let i=0; i<totalQuestion; i++){
        availableQuestion.push(quiz[i])
    }
}

function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter+1) + " of " + quiz.length;
    currentQuestion = questionCounter;
    questionText.innerHTML = availableQuestion[currentQuestion].q;
    optionLen = availableQuestion[currentQuestion].options.length;
    optionContainer.innerHTML = "";
    for(let i=0; i<optionLen; i++){
        const option = document.createElement('div');
        option.innerHTML = availableQuestion[currentQuestion].options[i];
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
}

function getResult(element){
    let id = element.textContent;
    let correctAnswer = availableQuestion[questionCounter].answer;
    console.log(correctAnswer);

    if(id == correctAnswer){
        element.classList.add("correct");
        correctAnswers++;

    }
    else {
        element.classList.add("wrong");
    }
    attempt++;
    questionCounter++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function next(){
    if(questionCounter === quiz.length){
        console.log("Quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");

    resultBox.classList.remove("hide");
    quizResult();
}
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

function startQuiz(){

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");

    setAvailableQuestion();

    getNewQuestion();

    answersIndicator();
}