const screenElement = document.querySelector(".screen");

// add number to screen 
const addNumberToScreen = (value) => {
    if(screenElement.textContent == 0) {
        screenElement.textContent = value;
    } else {
        screenElement.textContent += value;
    }
};

// delete screen
const clearScreen = () => {
    screenElement.textContent = 0;
};

// Operations
const performOperation = () => {
    try {
        screenElement.textContent = eval(screenElement.textContent.replace("x", "*"));
    } catch (error) {
        screenElement.textContent = "ERROR";
    }
};

// Iteration buttons
const iterateButtons = () => {
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (value === "C") {
                clearScreen();
            } else if (value === "=") {
                performOperation();
            } else {
                addNumberToScreen(value);
            }
        });
    });
};

iterateButtons()