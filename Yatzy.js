const dice = [];
const diceImages = ['dice/dice-one.png', 'dice/dice-two.png',
                    'dice/dice-three.png', 'dice/dice-four.png',
                    'dice/dice-five.png', 'dice/dice-six.png'];
const labels = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s",
                "One pair", "Two pairs", "Three same",
                "Four same", "Full house", "Small straight",
                "Large straight", "Chance", "Yatzy"];
const inputBoxes = [];
let diceValues = [];

let gridDice = document.getElementById('grid-dice');
let diceDiv = document.getElementById('dice');
let gridPoints = document.getElementById('grid-points');


// Indsætter 5 billeder af terninger i gridDice
for (let i = 0; i < 5; i++) {
    let img = document.createElement('img');
    dice[i] = img;
    img.className = 'dice';
    img.id = 'die' + i;
    img.src = "dice/dice-one.png";
    diceDiv.appendChild(img);
}

// Finder værdien af hver die og indsætter den i et array.
function calculateDiceValues() {
    for (let die of dice) {
        let src = die.src;
        switch (true) {
            case src.includes('one'):
                diceValues.push(1);
                break;
            case src.includes('two'):
                diceValues.push(2);
                break;
            case src.includes('three'):
                diceValues.push(3);
                break;
            case src.includes('four'):
                diceValues.push(4);
                break;
            case src.includes('five'):
                diceValues.push(5);
                break;
            case src.includes('six'):
                diceValues.push(6);
                break;
        }
    }
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
        if (die.style.filter == 'brightness(0.80)') {
            die.style.filter = '';
        } else {
            die.style.filter = 'brightness(0.70)';
        }
    })
}

let button = document.createElement('button');
button.textContent = 'Roll';
let rolls = 0;
button.addEventListener('click', event => {
    if (rolls < 3) {
        rollDice();
        calculateDiceValues();

        for(let dieValue of diceValues) {
            console.log(dieValue);
        }
        if (rolls == 2) {
            button.disabled = true;
        }
    }
    rolls++;
});

gridDice.appendChild(button);


// Indsætter labels og inputs på gridPoints
for (let i = 0; i < labels.length; i++) {
    let labelInputDivElement = document.createElement('div');
    labelInputDivElement.className = 'labelInputDivElement';

    createLabel('labels', labels[i], labelInputDivElement);
    createInput('inputs', 'input' + i, labelInputDivElement, i);

    if (i == 5) {
        createLabel('sumAndBonusLabel', 'Sum:', labelInputDivElement);
        createInput('sumAndBonusInput', 'sumInput', labelInputDivElement, 15);
        createLabel('sumAndBonusLabel', 'Bonus:', labelInputDivElement);
        createInput('sumAndBonusInput', 'bonusInput', labelInputDivElement, 16);
    }

    gridPoints.appendChild(labelInputDivElement);
}

// Funktion til at lave labels
function createLabel(className, textContent, parent) {
    let labelElement = document.createElement('label');
    labelElement.className = className;
    labelElement.textContent = textContent;
    parent.appendChild(labelElement);
}

// Funktion til at lave inputs
function createInput(className, id, parent, index) {
    let inputElement = document.createElement('input');
    inputElement.className = className;
    inputElement.id = id;
    inputElement.readOnly = true;
    inputBoxes[index] = inputElement;
    parent.appendChild(inputElement);
}

// Returnerer summen af de 6 første pointfelter til BONUS
for (let i = 0; i < 6; i++) {
    let sum = 0;
    sum += inputBoxes[i];
    if (sum >= 63) {
        let bonusBox = 50;
    }
}

// Returnerer total sum at alle point-felterne
let total = 0;
for (let inputBox of inputBoxes) {
    total += inputBox;
}
