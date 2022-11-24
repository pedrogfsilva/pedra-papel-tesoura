let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const pedra_div = document.getElementById("pedra");
const papel_div = document.getElementById("papel");
const tesoura_div = document.getElementById("tesoura");


function getComputerChoice(){
    const choices = ["pedra", "papel", "tesoura"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function win(userChoice, computerChoice){
    
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${userChoice} ${smallUserWord} venceu ${computerChoice} ${smallCompWord}. Você venceu!`;
    userChoice_div.classList.add('green-glow')
    setTimeout(() =>  userChoice_div.classList.remove('green-glow'), 300);

}

function lose(userChoice, computerChoice){
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${userChoice} ${smallUserWord} perdeu para ${computerChoice} ${smallCompWord}. Você perdeu!`;
    userChoice_div.classList.add('red-glow')
    setTimeout(() =>  userChoice_div.classList.remove('red-glow'), 300);

}

function draw(userChoice, computerChoice){
    
    const smallUserWord = "user".fontsize(3).sub();
    const smallCompWord = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${userChoice} ${smallUserWord} é igual a ${computerChoice} ${smallCompWord}. Empate!`;
    userChoice_div.classList.add('gray-glow')
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 300);
    
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice){
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


function main(){

pedra_div.addEventListener('click', function(){
    game("pedra");
})

papel_div.addEventListener('click', function(){
    game("papel");
})

tesoura_div.addEventListener('click', function(){
    game("tesoura");
})
}

main();