const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const numberButtons = document.querySelectorAll('[data-type="number"]');
const deleteButton = document.querySelector('[data-type="delete"]');
const resetButton = document.querySelector('[data-type="reset"]');
const operationPara = document.querySelector('.operation');
const resultDisplay = document.querySelector('.result');

numberButtons.forEach(button => button.addEventListener('click', displayNumber))
operatorButtons.forEach(button => button.addEventListener('click', displayOperator))
deleteButton.addEventListener('click', displayOperator)
resetButton.addEventListener('click', reset)

let operator1 = '';
let operator2 = '';
let num1 = '';
let num2 = '';
let result = '';
let needToReset = false;



function displayNumber(e) {
    if(resultDisplay.innerHTML === '0') resultDisplay.innerHTML = '';

    if(operationPara.innerHTML !== "" && needToReset === true) {
        resultDisplay.innerHTML = '';
        needToReset = false;
    }

    resultDisplay.innerHTML += e.currentTarget.innerHTML;
}


function reset() {
    operator1 = '';
    operator2 = '';
    num1 = '';
    num2 = '';
    result = '';
    needToReset = false;

    operationPara.innerHTML = ''
    resultDisplay.innerHTML = 0;
}


function displayOperator(e) {
    if(operator1 !== '') {
        setOperator(e.currentTarget.innerHTML)
    } else {
        if(result !== '') {
            num1 = result;
            operator1 = e.currentTarget.innerHTML;
            operationPara.innerHTML = `${num1} ${operator1}`
            needToReset = true;
        } else {
            operator1 = e.currentTarget.innerHTML;
            num1 = resultDisplay.innerHTML;
            operationPara.innerHTML = `${num1} ${operator1}`
            needToReset = true;
        }
    }    
}


function setOperator(operator) {
    num2 = resultDisplay.innerHTML;
    operator2 = operator;
    
    if(operator1 === '/' && (num1 === "0" || num2 === "0")) {
        alert('You can\'t divide by 0!');
        reset();
    } else {
        let result = operate(operator1, num1, num2)

        if(operator2 === '=') {
            operationPara.innerHTML =  `${num1} ${operator1} ${num2} ${operator2}`
        } else {
            operator1 = operator2;
            num1 = result;
            operationPara.innerHTML = `${num1} ${operator1}`
        }

        
        operator2 = '';
        resultDisplay.innerHTML = result;

        needToReset = true;
    }
    
}


function operate(operator, num1, num2) {
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


