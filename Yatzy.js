const grids = document.querySelectorAll('grid-item');
const labels = ["1-s", "2-s", "3-s", "4-s", "5-s", "6-s",
                "One pair", "Two pairs", "Three same",
                "Four same", "Full house", "Small straight",
                "Large straight", "Chance", "Yatzy"];
const inputBoxes = [];

for (let i = 0; i < labels.length; i++) {
    let input = document.createElement('input');
    input.id = 'input' + i;
    inputBoxes[i] = input;
    grids[1].appendChild(input);
}