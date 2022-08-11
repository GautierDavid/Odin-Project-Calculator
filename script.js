const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const numberButtons = document.querySelectorAll('[data-type="number"]');
const deleteButton = document.querySelector('[data-type="delete"]');
const resetButton = document.querySelector('[data-type="reset"]');
const operationPara = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');

numberButtons.forEach(button => button.addEventListener('click', displayNumber))
operatorButtons.forEach(button => button.addEventListener('click', displayOperator))
deleteButton.addEventListener('click', deleteNumber)
resetButton.addEventListener('click', reset)

let operator1 = '';
let operator2 = '';
let num1 = '';
let num2 = '';
let result = '';
let needToReset = false


function deleteNumber() {
    let display = resultDisplay.innerHTML;
    if(display.length <= 1) resultDisplay.innerHTML = "0";
    // supprime le dernier charactères de l'affichage
    else resultDisplay.innerHTML = display.slice(0, display.length-1);
    
    setNumber(resultDisplay.innerHTML)
}

function displayNumber(e) {
    // si vrai appel la fonction reset 
    // dans le cas où un chiffre est cliqué après une opération se terminant par un égal
    if(needToReset) reset();
    // reset at the start
    if(resultDisplay.innerHTML === '0') resultDisplay.innerHTML = '';
    // reset si on a le premier operateur et que num2 est vide
    else if (operator1 !== "" && num2 === "") resultDisplay.innerHTML = '';

    // gère l'affichage
    resultDisplay.innerHTML += e.currentTarget.innerHTML;
    // appel fonction setNumber pour attribuer les valeurs
    setNumber(resultDisplay.innerHTML)
}

function setNumber(num) {
    // s'il n'y a pas de premier operator
    if(operator1 === "") {
        // num1 égal ce qui est affiché dans la div result
        num1 = num;
    } else {
        // s'il y a un premier operator num2 égal ce qui est affiché dans la div result
        num2 = num;
    }
}


function displayOperator(e) {
    needToReset = false;
    // in case the user click on = for the first operator
    if(num2 === "" && e.currentTarget.innerHTML === "=") return
    // si clique sur operateur sans avoir rentré de chiffres
    if(num1 === "") return

    // si num1 different vide et operator1 est vide OU num2 vide
    if((operator1 === "" && num1 !== "") || num2 === "") {
        // => operator1 égale bouton sur lequel on a cliqué
        operator1 = e.currentTarget.innerHTML;
        operationPara.innerHTML = `${num1} ${operator1}`;
    // si num2 différent vide
    } else if(num2 !== "") {
        // => operator2 égale bouton sur lequel on a cliqué
        operator2 = e.currentTarget.innerHTML;
        // appel la fonction pour préparer le calcul
        setOperator();
    }
}


function setOperator() {
    // si essaye de diviser par 0
    if(operator1 === '/' && (num1 === "0" || num2 === "0")) {
        // message d'erreur
        alert('You can\'t divide by 0!');
        // sort de la fonction
        return
    } 

    // appel la fonction pour obtenir le résultat de l'opération
    let result = operate(operator1, num1, num2);

    // if result is a decimal, round to two decimals
    if(result % 1 !== 0) result = result.toFixed(2);
    if(operator2 === '=') {
        operationPara.innerHTML =  `${num1} ${operator1} ${num2} ${operator2}`
        num1 = result;
        operator1 = '';

        // pour gérer les conditions du reset
        needToReset = true;
    } else {
        operator1 = operator2;
        num1 = result;
        operationPara.innerHTML = `${num1} ${operator1}`
    }

    console.log(operator2)
    num2 = '';
    resultDisplay.innerHTML = num1;
}


function operate(operator, num1, num2) {
    // translate string to number 
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}


function reset() {
    operator1 = '';
    operator2 = '';
    num1 = '';
    num2 = '';
    operationPara.innerHTML = ''
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


