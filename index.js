class Calculator {
    constructor(previosOperandTextElement, currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.previosOperandTextElement = previosOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        console.log(this.operation);
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    displayNumber(number) {
        const decimalDigit = number.toString().split('.')[1]
        const integerDigit = parseFloat(number.toString().split('.')[0]);
        let integerDisplay;
        if (isNaN(integerDigit)) {
            integerDisplay = '';
        } else {
            integerDisplay =
                integerDigit.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit.toString()}`
        } else {
            return integerDisplay;
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previosOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        console.log("chap");
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})