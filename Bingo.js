const container = document.getElementById("container");
let UIcontainer;
let gridContainer;
let gridArray = [];

function init() {
  cUI();
  cGrid();
}
init();

function cUI() {
  UIcontainer = document.createElement("div");
  UIcontainer.classList.add("UIContainer");

  gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");

  container.append(UIcontainer, gridContainer);
}

function cGrid() {
  for (i = 0; i < 25; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = i;

    let cellText = document.createElement("p");
    cellText.classList.add("cellText");

    gridContainer.append(cell);
  }
}
