const dice = []
const labels = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s",
                "One pair", "Two pairs", "Three same",
                "Four same", "Full house", "Small straight",
                "Large straight", "Chance", "Yatzy"];
const inputBoxes = [];

let gridDice = document.getElementById('grid-dice');
let gridPoints = document.getElementById('grid-points');

// Indsætter 5 billeder af terninger i gridDice
for (let i = 0; i < 5; i++) {
    let img = document.createElement('img');
    img.className = 'dice';
    img.id = 'die' + i;
    img.src = "dice/dice-six-faces-one.png";
    gridDice.appendChild(img);
}



// Indsætter labels og inputs på gridPoints
for (let i = 0; i < labels.length; i++) {
    let label = document.createElement('label');
    label.textContent = labels[i];
    gridPoints.appendChild(label);

    let input = document.createElement('input');
    input.id = 'input' + i;
    inputBoxes[i] = input;
    gridPoints.appendChild(input);
}