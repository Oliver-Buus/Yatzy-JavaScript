const labels = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s",
                "One pair", "Two pairs", "Three same",
                "Four same", "Full house", "Small straight",
                "Large straight", "Chance", "Yatzy"];
const inputBoxes = [];

let gridDice = document.getElementById('grid-dice');
let gridPoints = document.getElementById('grid-points');



for (let i = 0; i < labels.length; i++) {
    let label = document.createElement('label');
    label.textContent = labels[i];
    gridPoints.appendChild(label);
    let input = document.createElement('input');
    input.id = 'input' + i;
    inputBoxes[i] = input;
    gridPoints.appendChild(input);
}