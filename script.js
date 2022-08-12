const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const numberButtons = document.querySelectorAll('[data-type="number"]');
const deleteButton = document.querySelector('[data-type="delete"]');
const resetButton = document.querySelector('[data-type="reset"]');
const operationDisplay = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');


numberButtons.forEach(button => button.addEventListener('click', displayNumber))
operatorButtons.forEach(button => button.addEventListener('click', displayOperator))
deleteButton.addEventListener('click', deleteNumber)
resetButton.addEventListener('click', reset)


let firstOperator = '';
let secondOperator = '';
let firstNumber = '';
let secondNumber = '';
let result = '';
let needToReset = false



function displayNumber(e) {
    // empêche de mettre plusieurs virgules dans le même nombre
    if(/[.]/.test(resultDisplay.innerHTML) && e.currentTarget.innerHTML === ".") return
    // si vrai appel la fonction reset 
    // dans le cas où un chiffre est cliqué après une opération se terminant par un égal
    if(needToReset) reset();
    // reset at the start
    if(resultDisplay.innerHTML === '0') resultDisplay.innerHTML = '';
    // reset si on a le premier operateur et que secondNumber est vide
    else if (firstOperator !== "" && secondNumber === "") resultDisplay.innerHTML = '';

    // si le premier nombre est un . 
    if(resultDisplay.innerHTML === '' && e.currentTarget.innerHTML === '.') resultDisplay.innerHTML = "0"+e.currentTarget.innerHTML;
    else resultDisplay.innerHTML += e.currentTarget.innerHTML;
    // appel fonction setNumber pour attribuer les valeurs
    setNumber(resultDisplay.innerHTML)
}

function setNumber(num) {
    // s'il n'y a pas de premier operator
    if(firstOperator === "") {
        // firstNumber égal ce qui est affiché dans la div result
        firstNumber = num;
    } else {
        // s'il y a un premier operator secondNumber égal ce qui est affiché dans la div result
        secondNumber = num;
    }
}



function displayOperator(e) {
    needToReset = false;
    // in case the user click on = for the first operator
    if(secondNumber === "" && e.currentTarget.innerHTML === "=") return
    // si clique sur operateur sans avoir rentré de chiffres
    if(firstNumber === "") return

    // si firstNumber different vide et firstOperator est vide OU secondNumber vide
    if((firstOperator === "" && firstNumber !== "") || secondNumber === "") {
        // => firstOperator égale bouton sur lequel on a cliqué
        firstOperator = e.currentTarget.innerHTML;
        operationDisplay.innerHTML = `${firstNumber} ${firstOperator}`;
    // si secondNumber différent vide
    } else if(secondNumber !== "") {
        // => secondOperator égale bouton sur lequel on a cliqué
        secondOperator = e.currentTarget.innerHTML;
        // appel la fonction pour préparer le calcul
        setOperator();
    }
}

function setOperator() {
    // si essaye de diviser par 0
    if(firstOperator === '/' && (firstNumber === "0" || secondNumber === "0")) {
        // message d'erreur
        alert('You can\'t divide by 0!');
        // sort de la fonction
        return
    } 

    // appel la fonction pour obtenir le résultat de l'opération
    let result = operate(firstOperator, firstNumber, secondNumber);

    // if result is a decimal, round to two decimals
    if(result % 1 !== 0) result = result.toFixed(2);
    if(secondOperator === '=') {
        operationDisplay.innerHTML =  `${firstNumber} ${firstOperator} ${secondNumber} ${secondOperator}`
        firstNumber = result;
        firstOperator = '';

        // pour gérer les conditions du reset
        needToReset = true;
    } else {
        firstOperator = secondOperator;
        firstNumber = result;
        operationDisplay.innerHTML = `${firstNumber} ${firstOperator}`
    }

    console.log(secondOperator)
    secondNumber = '';
    resultDisplay.innerHTML = firstNumber;
}



function operate(operator, firstNumber, secondNumber) {
    // translate string to number 
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch(operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "x":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}



function deleteNumber() {
    let display = resultDisplay.innerHTML;
    if(display.length <= 1) resultDisplay.innerHTML = "0";
    // supprime le dernier charactères de l'affichage
    else resultDisplay.innerHTML = display.slice(0, display.length-1);
    
    setNumber(resultDisplay.innerHTML)
}

function reset() {
    firstOperator = '';
    secondOperator = '';
    firstNumber = '';
    secondNumber = '';
    operationDisplay.innerHTML = ''
    resultDisplay.innerHTML = 0;

    needToReset = false
}



const add = function(a, b) {
	return a + b
};

const subtract = function(a, b) {
	return a - b
};

const multiply = function(a, b) {
  return  a *  b;
};

const divide = function(a, b) {
    return a / b; 
}


