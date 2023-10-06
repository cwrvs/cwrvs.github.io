// Function to simulate rolling a 6-sided die and return the result.
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to roll two dice, update the simulated dice, and display the result.
function rollDice() {
    const die1Element = document.getElementById('die1');
    const die2Element = document.getElementById('die2');

    // Roll two dice
    const roll1 = rollDie();
    const roll2 = rollDie();

    // Update the simulated dice
    updateSimulatedDie(die1Element, roll1);
    updateSimulatedDie(die2Element, roll2);

    // Calculate the total roll
    const totalRoll = roll1 + roll2;

    // Display the result message
    displayResult(totalRoll);
}

// Function to update the simulated die with dots based on the roll.
function updateSimulatedDie(dieElement, roll) {
    // Clear the die
    dieElement.innerHTML = '';

    // Define dot positions for each face of a 6-sided die
    const dotPositions = [
        [],
        [4],
        [0, 8],
        [0, 4, 8],
        [0, 2, 6, 8],
        [0, 2, 4, 6, 8],
        [0, 2, 3, 5, 6, 8],
    ];

    // Create dots based on the roll
    dotPositions[roll].forEach((position) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        // Position the dot based on the position index
        switch (position) {
            case 0:
                dot.style.top = '12px';
                dot.style.left = '12px';
                break;
            case 2:
                dot.style.top = '12px';
                dot.style.left = '38px';
                break;
            case 3:
                dot.style.top = '25px';
                dot.style.left = '12px';
                break;
            case 5:
                dot.style.top = '25px';
                dot.style.left = '38px';
                break;
            case 6:
                dot.style.top = '38px';
                dot.style.left = '12px';
                break;
            case 8:
                dot.style.top = '38px';
                dot.style.left = '38px';
                break;
            default:
                break;
        }
        // Append the dot to the die
        dieElement.appendChild(dot);
    });
}

// Function to display the result message
function displayResult(totalRoll) {
    const outcomeMessageElement = document.getElementById('outcomeMessage');
    outcomeMessageElement.textContent = `You rolled a total of ${totalRoll}`;
}

// Attach a click event listener to the button to roll the dice
document.getElementById('rollButton').addEventListener('click', rollDice);
