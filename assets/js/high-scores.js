// Defined variables
var scoresList = document.getElementById("scoresOl");
var clear = document.getElementById("clear-scores");
var back = document.getElementById("go-back");

// Retrieve local storage
var loadScores = function () {
  var savedScores = localStorage.getItem("all-scores");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedScores) {
    return false;
  }
  // else, load up saved scores

  // parse into array of objects
  savedScores = JSON.parse(savedScores);

  // loop through savedScores array
  for (var i = 0; i < savedScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.setAttribute("class", "scores");
    createLi.textContent =
      savedScores[i].initials + " - " + savedScores[i].score;
    scoresList.appendChild(createLi);
  }
};

// Clear scores
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Go back to home page
back.addEventListener("click", function () {
  window.location.replace("./index.html");
});

loadScores();
