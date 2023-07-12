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
let decimalToggle = false;

function detect() {

    if (this.innerText === "=") {
        displayValue += this.innerText;
        inputField.placeholder = displayValue;
        decimalToggle = false;
        disassemble();

    } else if (this.innerText === "C") {

        displayValue = "";
        inputField.placeholder = 0;
        decimalToggle = false;
    
    } else if (this.innerText === "+/-") {
        console.log(displayValue);
        displayValue = inputField.placeholder * -1;
        inputField.placeholder = displayValue;
        
        

    } else if (this.innerText === ".") {
        console.log(displayValue);
        decimalToggle = true;
    }
    
    else {

        if (decimalToggle === false) {
            console.log(displayValue);
            displayValue += this.innerText;
            inputField.placeholder = displayValue;
            
        } else {
            console.log("0."+this.innerText);
            displayValue += "." + this.innerText;
            inputField.placeholder = displayValue;
            decimalToggle = false;
        }
        
    }

        
}

function disassemble() {

    console.log("This is " + displayValue);

    const operatorsList = ["/","*","-","+","=","."];
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



function handleDecimal(disassembleList){

    let decimalNumList = [];
    let decimalFlag = false;

    console.log('This is to handle decimals' + disassembleList);
    for (const value of disassembleList) {
        if (value === '.') {
            console.log("hooo!");
            decimalFlag = true;
        } else {

            if (decimalFlag === true) {
                decimalNumList[decimalNumList.length-1] = 
                (parseFloat(decimalNumList[decimalNumList.length-1]) + parseFloat("0." + value)).toString();
                decimalFlag = false;
    
            } else {
                decimalNumList.push(value);
                console.log('The type of this is ' + typeof(value))
            }

        }
        
    }

    return decimalNumList;

}





function calculate(disassembleList) {

    const decimalList = handleDecimal(disassembleList);

    const operatorsList = ["/","*","-","+"];
    console.log("This is what I got" + decimalList);
    let total = 0;
    let operator = "";
    
    for (const number of decimalList) {

        //if there's no operator and it's a number then make it parseInt and add it to total
        if (Number.isInteger(parseInt(number))){

            if (operator === "") {
                total = parseFloat(number);
            }
            else if (operator === "+") {
                total += parseFloat(number);
            }
            else if (operator === "-") {
                total -= parseFloat(number);
            }
            else if (operator === "*") {
                total *= parseFloat(number);
            }
            else if (operator === "/") {
                total /= parseFloat(number);
            }

            
        }
        else if (operatorsList.includes(number)) {
            operator = number;
        } 
    }

    if (total.toString().length > 10) {
        let rounded  = total.toFixed(10);
        inputField.placeholder = rounded;
    } else {
        inputField.placeholder = total;
    }

    displayValue = total;
    
}




