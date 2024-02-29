const dice = [];
const diceImages = ['dice/dice-six-faces-one.png', 'dice/dice-six-faces-two.png',
                    'dice/dice-six-faces-three.png', 'dice/dice-six-faces-four.png',
                    'dice/dice-six-faces-five.png', 'dice/dice-six-faces-six.png'];
const labels = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s",
                "One pair", "Two pairs", "Three same",
                "Four same", "Full house", "Small straight",
                "Large straight", "Chance", "Yatzy"];
const inputBoxes = [];

let gridDice = document.getElementById('grid-dice');
let diceDiv = document.getElementById('dice');
let gridPoints = document.getElementById('grid-points');

// Indsætter 5 billeder af terninger i gridDice
for (let i = 0; i < 5; i++) {
    let img = document.createElement('img');
    dice[i] = img;
    img.className = 'dice';
    img.id = 'die' + i;
    img.src = "dice/dice-six-faces-one.png";
    diceDiv.appendChild(img);
}

// Funktion der ruller med terningerne.
function rollDice() {
    for (let die of dice) {
        // Der skal være check på at terningen ikke bliver "holdt"
        let randomNumber = Math.floor(Math.random() * 6);
        die.src = diceImages[randomNumber];
    }
}

for (let die of dice) {
    die.addEventListener('click', event => {
        if (die.style.filter == 'brightness(0.75)') {
            die.style.filter = '';
        } else {
            die.style.filter = 'brightness(0.75)';
        }
    })
}

let button = document.createElement('button');
button.textContent = 'Roll';
button.addEventListener('click', event => {
    rollDice();
});
gridDice.appendChild(button);


// Indsætter labels og inputs på gridPoints
for (let i = 0; i < labels.length; i++) {
    let labInpDiv = document.createElement('div');
    labInpDiv.className = 'labInpDiv';
    let label = document.createElement('label');
    label.className = 'labels';
    label.textContent = labels[i];
    labInpDiv.appendChild(label);

    let input = document.createElement('input');
    input.id = 'input' + i;
    input.className = 'inputs';
    inputBoxes[i] = input;
    labInpDiv.appendChild(input);
    gridPoints.appendChild(labInpDiv);
}