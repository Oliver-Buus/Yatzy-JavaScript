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
        if (die.style.filter == 'brightness(0.75)') {
            die.style.filter = '';
        } else {
            die.style.filter = 'brightness(0.75)';
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

// Tæller antallet af samme slags på terningerne
function frequency() {
    let frequency = [7];
    for (let diceValues of dice) {
        frequency[value]++;
    }
    return frequency;
}

// Note til points - Måske flytte return statement en gang ned.

function onePairPoints() {
    inputBoxes[6].addEventListener('click', event => {
            let pairPoint = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
        if (frequency[i] >= 2) {
            pairPoint = i * 2;
        }
    }
    return pairPoint;
    })
}

function twoPairsPoints() {
    inputBoxes[7].addEventListener('click', event => {
            let twoPairsPoint = 0;
    let freq = frequency();
    let pairs = 0;
    for (let i = 1; i < freq.length; i++) {
        if (frequency[i] >= 2) {
            pairPoint += i * 2;
            pairs++;
        }
    }
    if (pairs >= 2) {
        pairPoint;
    }
    return pairPoint;
    })
}

function threeSamePoints() {
    inputBoxes[8].addEventListener('click', event => {
            let threeSamePoint = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
        if (frequency[i] >= 3) {
            threeSamePoint = i * 3;
        }
    }
    return threeSamePoint;
    })
}

function fourSamePoints() {
    inputBoxes[9].addEventListener('click', event => {
            let fourSamePoint = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
        if (frequency[i] >= 4) {
            fourSamePoint = i * 4;
        }
    }
    return fourSamePoint;
    })
}

function fullHousePoints() {
    inputBoxes[10].addEventListener('click', event => {
            let fullHousePoint = 0;
    let freq = frequency();
    let two = 0;
    let three = 0;
    for (let i = 1; i < freq.length; i++) {
        if (frequency[i] == 2) {
            fullHousePoint += i * freq[i];
            two++;
        } else if (frequency[i] == 3) {
            fullHousePoint += i * freq[i];
            three++;
        }
    }
    if (two !== 1 || three !== 1) {
        fullHousePoint = 0;
    }
    return fullHousePoint;
    })
}

function smallStraightPoints() {
    inputBoxes[11].addEventListener('click', event => {
            let smallStraightPoint = 0;
    let freq = frequency();
    if (freq[1] >= 1 && freq[2] >= 1 && freq[3] >= 1 && freq[4] >= 1 && freq[5] >= 1) {
        smallStraightPoint = 15;
    }
    return smallStraightPoint;
    })
}

function largeStraightPoints() {
    inputBoxes[12].addEventListener('click', event => {
            let largeStraightPoint = 0;
    let freq = frequency();
    if (freq[2] >= 1 && freq[3] >= 1 && freq[4] >= 1 && freq[5] >= 1 && freq[6] >= 1) {
        largeStraightPoint = 20;
    }
    return largeStraightPoint;
    })
}

function chancePoints() {
    inputBoxes[13].addEventListener('click', event => {
            let chancePoint = 0;
    for (let diceValues of dice) {
        chancePoint += diceValues;
    }
    return chancePoint;
    })
}

function yatzyPoints() {
    const isYatzy = dice.every((value) => value === dice[0]);
    const yatzy = isYatzy ? 50 : 0;
}