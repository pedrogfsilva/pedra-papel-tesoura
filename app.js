let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const pedra_div = document.getElementById("pedra");
const papel_div = document.getElementById("papel");
const tesoura_div = document.getElementById("tesoura");

let winStatus = 0;
let loseStatus = 0;
let drawStatus = 0;

function makePost(winStatus, loseStatus, drawStatus) {
  let body = {
    winStatus: winStatus,
    loseStatus: loseStatus,
    drawStatus: drawStatus,
  };

  let post = JSON.stringify(body);

  const url = "/";
  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(post);

  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log("Post successfully created!");
    }
  };
}

function getComputerChoice() {
  const choices = ["pedra", "papel", "tesoura"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(userChoice, computerChoice) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${userChoice} ${smallUserWord} venceu ${computerChoice} ${smallCompWord}. Você venceu!`;
  userChoice_div.classList.add("green-glow");
  setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);

  winStatus = 1;
  loseStatus = 0;
  drawStatus = 0;
  
  makePost(winStatus, loseStatus, drawStatus);
  console.log(winStatus, loseStatus, drawStatus);
}

function lose(userChoice, computerChoice) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${userChoice} ${smallUserWord} perdeu para ${computerChoice} ${smallCompWord}. Você perdeu!`;
  userChoice_div.classList.add("red-glow");
  setTimeout(() => userChoice_div.classList.remove("red-glow"), 300);

  winStatus = 0;
  loseStatus = 1;
  drawStatus = 0;

  makePost(winStatus, loseStatus, drawStatus);
}

function draw(userChoice, computerChoice) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  result_p.innerHTML = `${userChoice} ${smallUserWord} é igual a ${computerChoice} ${smallCompWord}. Empate!`;
  userChoice_div.classList.add("blue-glow");
  setTimeout(() => userChoice_div.classList.remove("blue-glow"), 300);

  winStatus = 0;
  loseStatus = 0;
  drawStatus = 1;

  makePost(winStatus, loseStatus, drawStatus);
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "pedratesoura":
    case "papelpedra":
    case "tesourapapel":
      win(userChoice, computerChoice);
      break;
    case "pedrapapel":
    case "papeltesoura":
    case "tesourapedra":
      lose(userChoice, computerChoice);
      break;
    case "pedrapedra":
    case "papelpapel":
    case "tesouratesoura":
      draw(userChoice, computerChoice);
      break;
  }
}

function main() {
  pedra_div.addEventListener("click", function () {
    game("pedra");
  });

  papel_div.addEventListener("click", function () {
    game("papel");
  });

  tesoura_div.addEventListener("click", function () {
    game("tesoura");
  });
}

main();
