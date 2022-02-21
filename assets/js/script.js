// Click start quiz
//  timer sets to 75 and counts down from 1 until it reaches 0
//  first question appears on screen
//      fill <h1> with questions
//      hide <p>
//      create ordered list with choices and append to <h1>
// When a choice is selected
//  check to see if it is correct
//      if true
//          see correct message
//      if false
//          see wrong message
//          deduct 10 seconds from time
//   if time remaining >0
//      move to next question
//  if time remaining <= 0
//      all done appears on screen
// All Done page
//  fill <h1> with All Done!
//  show final score
//  Form to enter initials
//  submit button to save score
// When score is submitted
//      show high scores page

// Questions
var questions = [
  {
    title:
      "String values must be enclosed within _______ when being assigned to variable.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
  {
    title: "Commonly used data types do NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "Arrays in JavaScript can be used to store ________.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "The condition in an if / else statement is enclosed within _______.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis",
  },
];
var scoreIdCounter = 0;
var score = 0;
var questionIndex = 0;
var timerEl = document.getElementById("countdown");
var startTimerEl = document.getElementById("start");
var timeLeft = "";
var timeInterval = "";
var titleEl = document.getElementById("title");
var questionEl = document.getElementById("question");
var instructionsEl = document.getElementById("instructions");
var introContentEl = document.getElementById("intro-content");
var quizContentEl = document.getElementById("quiz-content");
var choiceListEl = document.createElement("ol");
var finalScore = "";

// Array to hold scores for saving
let allScores = JSON.parse(localStorage.getItem("all-scores")) || [];

// Countdown function
function countdown() {
  timeLeft = 75;
  timeInterval = setInterval(function () {
    if (timeLeft < 0) {
      clearInterval(timeInterval);
      allDone();
      timerEl.textContent = "Time: 0";
    } else {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--;
    }
  }, 1000);
  render(questionIndex);
}

// Render questions and choices to page:
function render(questionIndex) {
  // Clear page content
  introContentEl.style.display = "none";
  quizContentEl.innerHTML = "";
  choiceListEl.innerHTML = "";

  for (var i = 0; i < questions.length; i++) {
    let quizQuestion = questions[questionIndex].title;
    var quizChoices = questions[questionIndex].choices;
    questionEl.innerHTML = quizQuestion;
  }

  quizChoices.forEach(function (newItem) {
    var choiceEl = document.createElement("li");
    choiceEl.setAttribute("class", "choices");
    choiceEl.textContent = newItem;
    quizContentEl.appendChild(choiceListEl);
    choiceListEl.appendChild(choiceEl);
    choiceEl.addEventListener("click", checkAnswer);
  });
}

// Check answer
function checkAnswer(event) {
  var selectedChoice = event.target;

  if (selectedChoice.matches("li")) {
    var feedback = document.createElement("div");
    feedback.setAttribute("id", "feedback");
    // Correct condition
    if (selectedChoice.textContent == questions[questionIndex].answer) {
      score++;
      feedback.textContent = "Correct!";
      // Incorrect condition
    } else {
      // Deduct 10 seconds from timer
      timeLeft = timeLeft - 10;
      feedback.textContent = "Wrong!";
    }
  }
  // Question Index tracks the number of questions user has completed
  questionIndex++;

  if (questionIndex >= questions.length) {
    clearInterval(timeInterval);
    timerEl.textContent = "Time: " + timeLeft;
    allDone();
  } else {
    render(questionIndex);
  }
  quizContentEl.appendChild(feedback);
}

// Inital form
var initialsFormHandler = function (event) {
  event.preventDefault();
  var initialsInput = document.getElementById("initials-form").value;

  // Check if initials are empty
  if (initialsInput === "") {
    alert("You need to add your initials to save your score!");
    return false;
  } else {
    var finalScoreObj = {
      initials: initialsInput,
      score: finalScore,
    };

    allScores.push(finalScoreObj);
  }

  saveScores();

  // Link to high scores page
  window.location.replace("./high-scores.html");
};

// Show final page
var allDone = function () {
  introContentEl.style.display = "none";
  questionEl.style.display = "none";
  quizContentEl.innerHTML = "";

  // Heading
  var finalTitle = document.createElement("h1");
  finalTitle.textContent = "All done!";
  quizContentEl.appendChild(finalTitle);

  // Paragraph
  var finalP = document.createElement("p");
  finalP.setAttribute("class", "all-done");

  // Calculate score with time left
  if (timeLeft <= 0) {
    finalScore = 0;
  } else {
    finalScore = timeLeft;
  }
  finalP.textContent = "Your final score is: " + finalScore;

  quizContentEl.appendChild(finalP);

  // Label for input
  var inputLabel = document.createElement("label");
  inputLabel.setAttribute("class", "all-done");
  inputLabel.textContent = "Enter your initials: ";
  quizContentEl.appendChild(inputLabel);

  // Input initials
  var formEl = document.createElement("input");
  formEl.setAttribute("type", "text");
  formEl.setAttribute("id", "initials-form");
  formEl.setAttribute("placeholder", "");

  quizContentEl.appendChild(formEl);

  // Submit button
  var submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("id", "submit");
  submit.setAttribute("class", "btn");
  submit.textContent = "Submit";

  quizContentEl.appendChild(submit);

  var submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", initialsFormHandler);
};

var saveScores = function () {
  localStorage.setItem("all-scores", JSON.stringify(allScores));
};

startTimerEl.addEventListener("click", countdown);
