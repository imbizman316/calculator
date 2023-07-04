//let's get the input field
const inputField = document.querySelector('.inputfield');
//let's get the number keys
const numKeys = document.querySelectorAll('.numkey');
//let's add event listener to all number keys.
numKeys.forEach(function(numKey) {
    numKey.addEventListener('click',detect);
})
//let's set the value for display
let displayValue = "";

function detect() {

    if (this.innerText === "=") {
        displayValue += this.innerText;
        inputField.placeholder = displayValue;
        disassemble();
    } else if (this.innerText === "C") {

        displayValue = "";
        inputField.placeholder = 0;

    } else {

        displayValue += this.innerText;
        inputField.placeholder = displayValue;
    }

        
}

function disassemble() {

    const operatorsList = ["/","*","-","+","="];
    let disasembleValue = displayValue.split("");
    let temp = "";
    let disassembleList = [];

    //I will iterate the displayValue.
    for (const value of disasembleValue) {
        if (Number.isInteger(parseInt(value))) {
            temp += value;
        }
        else if (operatorsList.includes(value)) {
            disassembleList.push(temp);
            disassembleList.push(value);
            temp = "";
        }
    }
    
    calculate(disassembleList);

}

function calculate(disassembleList) {

    const operatorsList = ["/","*","-","+"];
    console.log(disassembleList);
    let total = 0;
    let operator = "";
    
    for (const number of disassembleList) {

        //if there's no operator and it's a number then make it parseInt and add it to total
        if (Number.isInteger(parseInt(number))){

            if (operator === "") {
                total = parseInt(number);
            }
            else if (operator === "+") {
                total += parseInt(number);
            }
            else if (operator === "-") {
                total -= parseInt(number);
            }
            else if (operator === "*") {
                total *= parseInt(number);
            }
            else if (operator === "/") {
                total /= parseInt(number);
            }

            
        }
        else if (operatorsList.includes(number)) {
            operator = number;
        } 
    }

    inputField.placeholder = total;
    displayValue = "";
}




