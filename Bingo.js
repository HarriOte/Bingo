const container = document.getElementById("container");
let arpanumerot = [];
let UIcontainer;
let gridContainer;
let gridArray = [];
let riviB, riviI, riviN, riviG, riviO;
let uusiNumero;


function uusipeli(){
    running = false;
  merkitsee = false;
  pyörii = false;

  const d1 = document.getElementById('voittoteksti');
    if (d1) {
      d1.remove();
    }
      const d2 = document.getElementById('virheviesti');
    if (d2) {
      d2.remove();
    }

  uusiNumero= [];
  klikki = null;
  arpanumerot = [];
  numero.textContent = "Kierros: 0";
  document.getElementById("vuoronumero").innerText = "";
  document.getElementById("vasenreuna").innerHTML = "";

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
  let merkitsee = false;

function arvoyksi() {
   numero = document.getElementById("numero");
   klikki = klikki + 1;
  numero.textContent = `Kierros: ${klikki}`;
  
  // Jos arvottu 75 kertaa.
  if (arpanumerot.length >= 64  ) {
  running = false;
  pyörii = false;
  
    alert("Ei voittoa tällä kertaa!");
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
   lisäävasemmalle();

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
      if (virhe> 0) {
        break; // only exits the row-checking loop
      } else {
        console.log(`BINGO!`);
        voittoilmoitus();
        running = false;
        pyörii = false;
        return true;
      }
    }
  }

  // Tarkistaa pystyrivit ylhäältä alaspäin
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
      if (virhe> 0) {
        break;
      } else {
        console.log(`BINGO`);
        voittoilmoitus();
        running = false;
        pyörii = false;
        return true;
      }
    }
  }

  return false;
}
 //jokainen klikki tarkistaa nämä
document.addEventListener('click', () => {
  Bingo();
  tarkistaVirheellisetOsumat();
    }
);

function voittoilmoitus() {
    const h1 = document.createElement('h5');
    h1.textContent = 'BINGO!';
    h1.id = 'voittoteksti';
    document.body.prepend(h1);
}

function manuaalinen() {
  running = false;
  merkitsee = false;
  pyörii = false;
  console.log("Automation stopped:", running);
}

function käynnistäautomaatio() {
  running = true;
  pyörii = true;
  merkitsee = true;
  automaatio();
}


function automaatio() {
  if (!running) return;
  arvoyksi();
  setTimeout(automaatio, 100);
}


function käynnistäanimaatio(){
  arvoyksi();
  merkitsee = false;
  pyörii = true;
  animaatio();
}


function lisäävasemmalle() {
  const alkuperäinen = document.getElementById("vuoronumero").innerHTML;
  const animaatioDiv = document.getElementById("vasenreuna");

  const uusidiv = document.createElement("div");
  uusidiv.classList.add("uusinnumero");
  uusidiv.innerHTML = alkuperäinen;
  animaatioDiv.appendChild(uusidiv);
  }


let pyörii = true;
let intervalID = null;


function animaatio() {
  const nopeus = document.getElementById("nopeus");

  // tyhjentää aikaisemman ajan
  if (intervalID) {
    clearInterval(intervalID);
  }

  // Ottaa slider.value ajan ja ajastin alkaa siitä (uudelleen)
  intervalID = setInterval(() => {
    if (!pyörii) {
      clearInterval(intervalID);
      return;
    }
    arvoyksi();
  }, parseInt(nopeus.value));
}

// päivättää tekstin slider.valuesta
sekuntti.textContent = 'Arvonnan nopeus ' + (nopeus.value / 1000) + ' sekunttia';
document.getElementById("nopeus").addEventListener('input', () => {
sekuntti.textContent = 'Arvonnan nopeus ' + (nopeus.value / 1000) + ' sekunttia';
  if (pyörii) {
    animaatio();
  }
});


//lisää aakkosen numeron eteen
function kirjaimenlisäys() {
  if (uusiNumero < 16) {
    kirjain = "B";
  } else if (uusiNumero < 31) {
    kirjain = "I";
  } else if (uusiNumero < 46) {
    kirjain = "N";
  } else if (uusiNumero < 61) {
    kirjain = "G";
  } else {
    kirjain = "O";
  }
}

virhe = 0;
function tarkistaVirheellisetOsumat() {
  const osumaCells = document.querySelectorAll('.cell.osuma');
  const vasenreunaDivs = document.querySelectorAll('#vasenreuna .uusinnumero');

  const vasenreunaNumerot = Array.from(vasenreunaDivs).map(div => {
    const parts = div.textContent.trim().split(' ');
    return parseInt(parts[1]);
  });

  let virheelliset = [];
  osumaCells.forEach(cell => {
    const cellValue = parseInt(cell.textContent);
    if (!vasenreunaNumerot.includes(cellValue)) {
      virheelliset.push(cellValue);
    }
  });

  if (virheelliset.length > 0) {
   
  virhe = 1;
  console.warn("Virheelliset osumat (ei löydy vasenreunasta):", virheelliset);
  let h1 = document.getElementById('virheviesti');

  if (!h1) {
    //luo ainoastaan jos on olemassa
    h1 = document.createElement('h4');
    h1.id = 'virheviesti';
    document.body.prepend(h1);
  }

  // teksti joka ilmestyy jos klikkaa väärin
  h1.textContent = `Koitatko huijata ${virheelliset.join(", ")} ei olla vielä arvottu!`;
    } else {
      console.log("ei virheitä");
    }

    return virheelliset;
}