const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

// Checks if a mathematical operation is active
function isOperatorPressed() {
    if(isOperator(display.textContent)) {
        return true;
    } else {
        return false;
    }
}

// Checks if an input is a mathematical operation
function isOperator(value) {
    if(value.includes("+") || value.includes("-") || value.includes("*") || value.includes("/")) {
        return true;
    } else {
        return false;
    }
}

// Enable/disable of all inputs
function toggleButton(a, bool) {
    if(typeof bool == "boolean") {
        buttons.forEach(function(button) {
            //button == "all"
            if(a == "all") {
                console.log("all")
                button.disabled = bool;
            } //button == "."
            else if(a == "." && button.textContent == ".") {
                button.disabled = bool;
            } //button == "="
            else if(a == "=" && button.textContent == "=") {
                button.disabled = bool;
            } //button == "operator"
            else if(a == "operator" && isOperator(button.textContent)) {
                button.disabled = bool;
            } else if (a == "number" && /^\d+$/.test(button.textContent) == true) {
                button.disabled = bool;
            } else if (a == "C" && button.textContent == "C") {
                button.disabled = bool;
            }
        });
    }
}

function calculate() {
    //Add
    if(display.textContent.includes("+")) {
        let a = Number(display.textContent.split("+")[0]);
        let b = Number(display.textContent.split("+")[1]);
        let c = a + b;
       
        display.textContent = String(c); 
    }
    //Minus
    else if(display.textContent.includes("-")) {
        let a = Number(display.textContent.split("-")[0]);
        let b = Number(display.textContent.split("-")[1]);
        let c = a - b;
       
        display.textContent = String(c); 
    }
    //Times
    else if(display.textContent.includes("*")) {
        let a = Number(display.textContent.split("*")[0]);
        let b = Number(display.textContent.split("*")[1]);
        let c = a * b;
       
        display.textContent = String(c); 
    }
    // Division
    else  if(display.textContent.includes("/")) {
        let a = Number(display.textContent.split("/")[0]);
        let b = Number(display.textContent.split("/")[1]);
        let c;
        if(b == 0) {
            c = "Divide by zero error";
        } else {
            c = a / b;
        }
       
        display.textContent = String(c); 
     
    }

    //Enable buttons
    toggleButton("all", false);

    //Disable . if applicable
    if((display.textContent.split(".").length >= 2 && isOperator(display.textContent) == false) || (display.textContent.split(".").length >= 3 && isOperator(display.textContent) == true)) {
        toggleButton(".", true);
    } else {
        toggleButton(".", false);
    }
}


function buttonPress(value) {
    //Remove initial 0 if present
    if(display.textContent == "0" || display.textContent == "Divide by zero error") {
        display.textContent = "";
    }
    
    //Clear
    if(value == "C") {
        display.textContent = "0";
        return;
    }

    //If an operator is pressed, disabled those buttons
    if(isOperator(value)) {
        toggleButton("operator", true);
    }

    //If a . is pressed, disable all non number buttons
    else if(value == ".") {
        toggleButton("all", true);
        toggleButton("number", false);
    }    

    //If a number is pressed, enable all buttons if no operations are active
    if(/^\d+$/.test(value) == true && isOperator(display.textContent) == false) {
        toggleButton("all", false);
    }

    // Enable = if value isn't . and operator is true
    if(/^\d+$/.test(value) == true && isOperator(display.textContent) == true) {
        toggleButton("=", false);
    } else {
        toggleButton("=", true);
    }

    // Eval "="
    if(value == "=") {
        calculate();
        return;
    }

    display.textContent += value;
    
    //Disable . if more . than operators
    if((display.textContent.split(".").length >= 2 && isOperator(display.textContent) == false) || (display.textContent.split(".").length >= 3 && isOperator(display.textContent) == true)) {
        toggleButton(".", true);
    } else {
        toggleButton(".", false);
    }

    //Clear always active
    toggleButton("C", false);

}

buttons.forEach(function(button) {
    button.addEventListener('click', () => {
        buttonPress(button.textContent);
    })
})
