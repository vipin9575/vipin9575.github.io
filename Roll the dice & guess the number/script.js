'use strict';

// Define Ids and Classes
const message1 = document.querySelector(".message_1")
const rollDice = document.querySelector(".dice-sub")
const btn_1 = document.querySelector("#first");
const btn_2 = document.querySelector("#second");
const btn_3 = document.querySelector("#third");
const btn_4 = document.querySelector("#forth");
const btn_5 = document.querySelector("#fifth");
const btn_6 = document.querySelector("#sixth");
const result = document.querySelector("#result__1");
const changeVar = document.querySelector("#SVV")
const showScore = document.querySelector("#S_core")



const dice = Math.trunc(Math.random() * 6) + 1; // To get the number from 1 to 6

setTimeout(function () {
    message1.classList.add('hidden')
    message1.classList.remove('hidden')

    let counter = 5;

    const gameStart = function () {
         counter--;

        if( counter >= 0){
            message1.innerHTML = `The dice will change in ${counter} seconds!`
        }
     
    }
    setInterval(gameStart,1000)

       
    
    const rolling = function () {
        // Dice Roll
        rollDice.setAttribute("src", `Face${dice}.png`)
        

        // Guess message
        if(Number(changeVar.innerHTML) === dice){
            result.innerHTML = 'Your Guess was right!'
            showScore.innerHTML = 10;
        }else{
            result.innerHTML = 'Your Guess was wrong!'
        }
    }
    setTimeout(rolling, 5000);


}, 3000)


// Select variable through button
btn_1.addEventListener("click", () => changeVar.innerHTML = 1)
btn_2.addEventListener("click", () => changeVar.innerHTML = 2)
btn_3.addEventListener("click", () => changeVar.innerHTML = 3)
btn_4.addEventListener("click", () => changeVar.innerHTML = 4)
btn_5.addEventListener("click", () => changeVar.innerHTML = 5)
btn_6.addEventListener("click", () => changeVar.innerHTML = 6)



