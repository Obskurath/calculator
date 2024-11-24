const screenElement = document.querySelector(".screen");

// Add number to screen
const addNumberToScreen = (value) => {
  if (screenElement.textContent.length >= 11) {
    return
  } 
  if (value === ".") {
    if (screenElement.textContent.includes(".")) {
        return
    }
  }
  if (screenElement.textContent === "0" && value !== ".") {
    screenElement.textContent = value;
  } else {
    screenElement.textContent += value;
  }
};

// Clear screen
const clearScreen = () => {
  screenElement.textContent = 0;
};

// Operations
const performOperation = () => {
    try {
      let expression = screenElement.textContent;
  
    // Handle percentage (if exists)
      if (expression.includes('%')) {
        let parts = expression.split('%');
        let base = parseFloat(parts[0]);
        let percentageOf = parseFloat(parts[1]);
        if (!isNaN(base) && !isNaN(percentageOf)) {
          let result = (base / 100) * percentageOf;
          expression = result.toString(); // Replace the expression with the percentage result
        } else {
          throw new Error("Invalid percentage expression");
        }
      }
  
    // Evaluate the expression
      let result = eval(expression.replace("x", "*").replace("÷", "/"));
  
    // Limit the result to 12 characters
      if (result.toString().length > 12) {
        if (result % 1 !== 0) {
          // Round long decimal numbers
          result = parseFloat(result.toPrecision(12));
        } else {
          // Convert long integers to scientific notation
          result = result.toExponential(6);
        }
      }
  
    // Display the result on the screen
      screenElement.textContent = result;
    } catch (error) {
    screenElement.textContent = "ERROR"; // Error handling
    }
  };
// Iteration buttons
const iterateButtons = () => {
  document.querySelectorAll(".button").forEach((button) => {
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

// Handle keyboard input
const handleKeyboardInput = (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    addNumberToScreen(key);
  } else if (key === "Enter" || key === "=") {
    performOperation(key);
  } else if (
    key === "*" ||
    key === "-" ||
    key === "/" ||
    key === "." ||
    key === "+"
  ) {
    addNumberToScreen(key);
  } else if (key === "Escape" || key === "C") {
    clearScreen(key);
  }
};

document.addEventListener("keydown", handleKeyboardInput);

iterateButtons();
