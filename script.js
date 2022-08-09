const operate = function(operator, num1, num2) {
    switch(operator) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "x":
            multiply(num1, num2);
            break;
        case "+":
            add(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
        case "+":
            add(num1, num2);
            break;
    }
}


const add = function(a, b) {
	return a + b
};

const subtract = function(a, b) {
	return a - b
};

const sum = function(...args) {
    return args == "" ? 0 : args[0].reduce((a, b) => Number(a) + Number(b));
};

const multiply = function(...args) {
  return args[0].reduce((a, b) =>  a *  b);
};

const divide = function(...args) {
    return args[0].reduce((a, b) => a / b); 
}

const power = function(a, b) {
	return Math.pow(a, b)
};

const factorial = function(num) {
	if (num === 0 || num === 1) {
    return 1
  } else {
    for(let i = num - 1; i >= 1; i--) {
      num *= i;
    }
  }
  return num
};