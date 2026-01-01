let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function updateScore() {
  document.querySelector(
    ".score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const moves = ["rock ✊", "paper ✋", "scissors ✌️"];
  return moves[Math.floor(Math.random() * moves.length)];
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  const outcomes = {
    "rock ✊": {
      "rock ✊": "Tie 🤝",
      "paper ✋": "You lose 😑",
      "scissors ✌️": "You win 🔥",
    },
    "paper ✋": {
      "rock ✊": "You win 🔥",
      "paper ✋": "Tie 🤝",
      "scissors ✌️": "You lose 😑",
    },
    "scissors ✌️": {
      "rock ✊": "You lose 😑",
      "paper ✋": "You win 🔥",
      "scissors ✌️": "Tie 🤝",
    },
  };

  result = outcomes[playerMove][computerMove];

  if (result === "You win 🔥") score.wins++;
  else if (result === "You lose 😑") score.losses++;
  else score.ties++;

  localStorage.setItem("score", JSON.stringify(score));
  updateScore();

  document.querySelector(".result").innerHTML = result;
  document.querySelector(
    ".moves"
  ).innerHTML = `Your move - ${playerMove}<br>Computer move - ${computerMove}`;

  document
    .querySelectorAll(".result, .moves")
    .forEach((el) => el.classList.add("show"));
}

document.getElementById("rock").onclick = () => playGame("rock ✊");
document.getElementById("paper").onclick = () => playGame("paper ✋");
document.getElementById("scissors").onclick = () => playGame("scissors ✌️");

document.getElementById("resetScore").onclick = () => {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem("score");
  updateScore();
};

updateScore();
