const dice = [];
const diceImages = ['dice/dice-one.png', 'dice/dice-two.png',
                    'dice/dice-three.png', 'dice/dice-four.png',
                    'dice/dice-five.png', 'dice/dice-six.png'];
const labels = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s",
                "One pair", "Two pairs", "Three same",
                "Four same", "Full house", "Small straight",
                "Large straight", "Chance", "Yatzy"];
const inputBoxes = [];
let diceValues = new Array(5).fill(0);

let gridDice = document.getElementById('grid-dice');
let diceDiv = document.getElementById('dice');
let gridPoints = document.getElementById('grid-points');

gridPoints.addEventListener('click', event => {
    calculateBonus();
})


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
    diceValues.splice(0, diceValues.length); // Nulstiller værdierne

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
        if (die.style.filter != 'brightness(0.75)') {
            // Der skal være check på at terningen ikke bliver "holdt"
            let randomNumber = Math.floor(Math.random() * 6);
            die.src = diceImages[randomNumber];
        }
    }
}


for (let die of dice) {
    die.addEventListener('click', event => {
        if (die.style.filter == 'brightness(0.75)') {
            die.style.filter = '';
        } else if (rolls != 0) {
            die.style.filter = 'brightness(0.75)';
        }
    })
}

let button = document.createElement('button');
button.className = 'button';
let rolls = 0;
button.textContent = 'Roll\n' + rolls;
button.addEventListener('click', event => {
        rollDice();
        calculateDiceValues();
        // Placeholders til alle inputs
        for (let i = 0; i < 6; i++) {
            inputBoxes[i].placeholder = sameValuePointsHandlerPreShow(i + 1);
        }
        inputBoxes[6].placeholder = onePairHandler();
        inputBoxes[7].placeholder = twoPairHandler();
        inputBoxes[8].placeholder = threeSameHandler();
        inputBoxes[9].placeholder = fourSameHandler();
        inputBoxes[10].placeholder = fullHouseHandler();
        inputBoxes[11].placeholder = smallStraightHandler();
        inputBoxes[12].placeholder = largeStraightHandler();
        inputBoxes[13].placeholder = chancePointsHandler();
        inputBoxes[14].placeholder = yatzyPointsHandler();

        if (rolls == 2) {
            button.disabled = true;
        }

    rolls++;
    button.textContent = 'Roll\n' + rolls;
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
        createInput('sumAndBonusInput', 'sumInput', labelInputDivElement, '15');
        createLabel('sumAndBonusLabel', 'Bonus:', labelInputDivElement);
        createInput('sumAndBonusInput', 'bonusInput', labelInputDivElement, '16');
    }

    if (i == labels.length - 1) {
        createLabel('totalLabel', 'Total:', labelInputDivElement);
        createInput('totalInput', 'totalInput', labelInputDivElement, 17);
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
function calculateBonus() {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        let value = parseInt(inputBoxes[i].value);
        if (!isNaN(value)) {
            sum += value;
        }
    }

    let bonus = sum >= 63 ? 50 : 0;
    document.getElementById('sumInput').value = sum;
    document.getElementById('bonusInput').value = bonus;
}


// Returnerer total sum at alle point-felterne
let total = 0;
for (let inputBox of inputBoxes) {
    if (!isNaN(inputBox.value))
    total += inputBox.value;
}

// Tæller antallet af samme slags på terningerne
function frequency() {
    let frequency = new Array(7).fill(0);

    for (let value of diceValues) {
        frequency[value]++;
    }
    return frequency;
}

function sameValuePointsHandlerPreShow(amount) {
        let sameValuePoint = 0;
        let freq = frequency();
                sameValuePoint = amount * freq[amount];
        return sameValuePoint;
        }
    

// Note til points - Måske flytte return statement en gang ned.
function sameValuePointsHandler(amount) {
return function() {

    let sameValuePoint = 0;
    let freq = frequency();
    sameValuePoint = amount * freq[amount];

    return sameValuePoint;
    }
}
for (let i = 0; i < 6; i++) {
    inputBoxes[i].addEventListener('click', sameValuePointsHandler(i + 1));
}

// ONE PAIR POINTS
function onePairHandler() {
     let pairPoint = 0;
     let freq = frequency();
     for (let i = 1; i < freq.length; i++) {
        if (freq[i] >= 2) {
           pairPoint = i * 2;
        }
    }
    return pairPoint;
}
inputBoxes[6].addEventListener('click', onePairHandler);

// TWO PAIR POINTS
function twoPairHandler() {
    let twoPairsPoint = 0;
    let freq = frequency();
    let pairs = 0;
    for (let i = 1; i < freq.length; i++) {
        if (freq[i] >= 2) {
            twoPairsPoint += i * 2;
            pairs++;
        }
    }
    if (pairs < 2) {
        twoPairsPoint = 0;
    }
    return twoPairsPoint;
}
inputBoxes[7].addEventListener('click', twoPairHandler);


function threeSameHandler() {
    let threeSamePoint = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
        if (freq[i] >= 3) {
            threeSamePoint = i * 3;
        }
    }

    return threeSamePoint;
}
inputBoxes[8].addEventListener('click', threeSameHandler);

function fourSameHandler() {
    let fourSamePoint = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
        if (freq[i] >= 4) {
            fourSamePoint = i * 4;
        }
    }

    return fourSamePoint;
}
inputBoxes[9].addEventListener('click', fourSameHandler);

function fullHouseHandler() {
    let fullHousePoint = 0;
    let freq = frequency();
    let two = 0;
    let three = 0;
    for (let i = 1; i < freq.length; i++) {
        if (freq[i] == 2) {
            fullHousePoint += i * freq[i];
            two++;
        } else if (freq[i] == 3) {
            fullHousePoint += i * freq[i];
            three++;
        }
    }
    if (two !== 1 || three !== 1) {
        fullHousePoint = 0;
    }

    return fullHousePoint;
}
inputBoxes[10].addEventListener('click', fullHouseHandler);

function smallStraightHandler() {
    let smallStraightPoint = 0;
    let freq = frequency();
    if (freq[1] >= 1 && freq[2] >= 1 && freq[3] >= 1 && freq[4] >= 1 && freq[5] >= 1) {
        smallStraightPoint = 15;
    }

    return smallStraightPoint;
}
inputBoxes[11].addEventListener('click', smallStraightHandler);

function largeStraightHandler() {
    let largeStraightPoint = 0;
    let freq = frequency();
    if (freq[2] >= 1 && freq[3] >= 1 && freq[4] >= 1 && freq[5] >= 1 && freq[6] >= 1) {
        largeStraightPoint = 20;
    }

    return largeStraightPoint;
}
inputBoxes[12].addEventListener('click', largeStraightHandler);

function chancePointsHandler() {
    let chancePoint = 0;
    for (let value of diceValues) {
        chancePoint += value;
    }

    return chancePoint;
}
inputBoxes[13].addEventListener('click', chancePointsHandler);

function yatzyPointsHandler() {
    let yatzyPoint = 0;
    let freq = frequency();
    for (let i = 1; i < freq.length; i++) {
        if (freq[i] == 5) {
            yatzyPoint = 50;
        }
    }

    return yatzyPoint;
}
inputBoxes[14].addEventListener('click', yatzyPointsHandler);



let inputs = document.getElementsByClassName('inputs');
let functions = [sameValuePointsHandlerPreShow.bind(null, 1), sameValuePointsHandlerPreShow.bind(null, 2),
    sameValuePointsHandlerPreShow.bind(null, 3), sameValuePointsHandlerPreShow.bind(null, 4),
    sameValuePointsHandlerPreShow.bind(null, 5), sameValuePointsHandlerPreShow.bind(null, 6),
    onePairHandler, twoPairHandler, threeSameHandler, fourSameHandler,
    fullHouseHandler, smallStraightHandler, largeStraightHandler, chancePointsHandler, yatzyPointsHandler];

for (let i = 0; i < inputs.length;i++) {
    inputs[i].addEventListener('click', function handler() {
        if (rolls != 0) {
            let number = functions[i]();
            inputs[i].value = number;
            inputs[i].removeEventListener('click', handler);
        }

        rolls = 0;
        button.textContent = 'Roll\n' + rolls;
        button.disabled = false;
        for (let die of dice) {
            die.style.filter = 'brightness(1)';
        }

    })
}