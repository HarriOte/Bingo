const container = document.getElementById("container");
let arpanumerot = [];
let UIcontainer;
let gridContainer;
let gridArray = [];
let riviB, riviI, riviN, riviG, riviO;
let uusiNumero;


function uusipeli(){
  uusiNumero= [];
  klikki = null;
  arpanumerot = [];
  document.getElementById("vuoronumero").innerText = "";
  UIcontainer.remove();
  gridContainer.remove();
  gridArray = [];
  cUI();
  numerojärjestys();
  cGrid();
}

function init() {
  cUI();
  numerojärjestys();
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

function pelilauta(määrä, min, max) {
  const set = new Set();

  while (set.size < määrä) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(num);
  }

  return Array.from(set);
}



function numerojärjestys() {
  riviB = pelilauta(5, 1, 15);
  riviI = pelilauta(5, 16, 30);
  riviN = pelilauta(5, 31, 45);
  riviG = pelilauta(5, 46, 60);
  riviO = pelilauta(5, 61, 75);

  function järjestä() {
    riviB.sort((a, b) => a - b);
    riviI.sort((a, b) => a - b);
    riviN.sort((a, b) => a - b);
    riviG.sort((a, b) => a - b);
    riviO.sort((a, b) => a - b);
  }

  järjestä();
}

function cGrid() {
  const columns = [riviB, riviI, riviN, riviG, riviO];
  const letters = ["B", "I", "N", "G", "O"];


   

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // asettaa solulle ID
      const cellID = `${letters[col]}${row + 1}`;
      cell.id = cellID;

      const cellText = document.createElement("p");
      cellText.classList.add("cellText");


      const value = columns[col][row];
      cellText.textContent = value;

      cell.appendChild(cellText);

      cell.addEventListener("click", () => {
        cell.classList.add("osuma");
      });

      gridContainer.appendChild(cell);

      
    }
  }
}



//tässä lasketaan tuleeko osuma numeroon.
  let klikki = 0;
  let merkitsee = true;

function arvoyksi() {
   numero = document.getElementById("numero");
   klikki = klikki + 1;
  numero.textContent = `Kierros: ${klikki}`;
  // Jos arvottu 75 kertaa.
  if (arpanumerot.length >= 75) {
  running = false;
  pyörii = false;
  
    alert("Kaikki numerot on jo arvottu!");
    return;
  }
  // arpoo numeron ja tarkistaa ettei sitä ole jo arvottu.
  do {
    uusiNumero = Math.floor(Math.random() * 75) + 1;
   kirjaimenlisäys();
  } while (arpanumerot.includes(uusiNumero));

  arpanumerot.push(uusiNumero);
  console.log("Arvottu numero:", uusiNumero);
   document.getElementById("vuoronumero").innerText = kirjain +" "+ uusiNumero;

  // Tarkistaa onko numero osuma ja merkitsee sen
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    if (!merkitsee) return; 
    const value = parseInt(cell.textContent);
    if (value === uusiNumero) {
      cell.classList.add("osuma"); // Visually mark hit
      Bingo();
    }
  });

  // Return value for animation use, if needed
  return uusiNumero;
}

function Bingo() {
  const letters = ["B", "I", "N", "G", "O"];

  // Tarkistaa vaakarivit vasemmalta
  for (let row = 1; row <= 5; row++) {
    let rowBingo = true;
    for (let col = 0; col < 5; col++) {
      const cell = document.getElementById(`${letters[col]}${row}`);
      if (!cell.classList.contains("osuma")) {
        rowBingo = false;
        break;
      }
    }
    if (rowBingo) {
      console.log(`BINGO!`);
      voittoilmoitus();
      running = false;
      pyörii = false;
      return true;
    }
  }

  // Tarkistaa pystyrivitu ylhäältä alaspäin.
  for (let col = 0; col < 5; col++) {
    let colBingo = true;
    for (let row = 1; row <= 5; row++) {
      const cell = document.getElementById(`${letters[col]}${row}`);
      if (!cell.classList.contains("osuma")) {
        colBingo = false;
        break;
      }
    }
    if (colBingo) {
      console.log(`BINGO`);
       voittoilmoitus();
      running = false;
      pyörii = false;
      return true;
    }
  }

  return false;
}

function voittoilmoitus() {
    const h1 = document.createElement('h5');
    h1.textContent = 'OLET WINRAR!';
    document.body.prepend(h1);
}

function manuaalinen() {
  running = false;
  merkitsee = false;
  console.log("Automation stopped:", running);
}

document.addEventListener('click', () => {
  Bingo();
    // // Check if the current fake cursor is clicking the button
    // if (currentFakeCursor && activeButton && checkCollision(currentFakeCursor, activeButton)) {
    //     activeButton.click();
    //      // Trigger button click
    //     console.log("Button clicked with the current fake cursor.");
        
    // }
    //     // If no new cursor was added, check if the click was with the wrong cursor
    //     if (!(currentFakeCursor && activeButton && checkCollision(currentFakeCursor, activeButton))) {
    //         console.log("Game over: clicked with the wrong cursor.");
    //         endGame();
    //     }
    }
);


function käynnistäautomaatio(){
  running = true;
  pyörii = false;
  merkitsee = true;
  uusipeli();
  automaatio();
}

let running = true;
function automaatio() {
  if (!running) return;
  arvoyksi();
  setTimeout(automaatio, 100);
}


function käynnistäanimaatio(){
  merkitsee = false;
  animaatio();
}

let pyörii = true;
function animaatio() {
   if (!pyörii) return;
   arvoyksi();
   document.getElementById("vuoronumero").innerText = uusiNumero;
   setTimeout(animaatio, 1000);
}

function kirjaimenlisäys() {
 
  
  console.log("kirjaimenlisäys " + uusiNumero);

  if (uusiNumero < 16) {
    kirjain = "B";
    console.log("B");
  } else if (uusiNumero < 31) {
    kirjain = "I";
    console.log("I");
  } else if (uusiNumero < 46) {
    kirjain = "N";
    console.log("N");
  } else if (uusiNumero < 61) {
    kirjain = "G";
    console.log("G");
  } else {
    kirjain = "O";
    console.log("O");
  }
}