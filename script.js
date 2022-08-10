const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const numberButtons = document.querySelectorAll('[data-type="number"]');
const operationPara = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');


numberButtons.forEach(button => button.addEventListener('click', displayNumber))
operatorButtons.forEach(button => button.addEventListener('click', displayOperator))

let operator = '';
let num1 = '';
let num2 = '';
let needToReset = false;

function displayNumber(e) {
    if(resultDisplay.innerHTML === '0') resultDisplay.innerHTML = '';

    if(operationPara.innerHTML !== "" && needToReset === true) {
        resultDisplay.innerHTML = '';
        needToReset = false;
    }

    resultDisplay.innerHTML += e.currentTarget.innerHTML;
}

function displayOperator(e) {
    operator = e.currentTarget.innerHTML;
    num1 = resultDisplay.innerHTML;
    operationPara.innerHTML = `${num1} ${operator}`
    needToReset = true;
}








const operate = function(operator, num1, num2) {
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


const add = function(a, b) {
	return a + b
};

const subtract = function(a, b) {
	return a - b
};

const multiply = function(...args) {
  return args[0].reduce((a, b) =>  a *  b);
};

const divide = function(...args) {
    return args[0].reduce((a, b) => a / b); 
}


