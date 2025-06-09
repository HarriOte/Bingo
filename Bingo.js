const container = document.getElementById("container");
const letters = ["B", "I", "N", "G", "O"];
let arpanumerot = [];
let UIcontainer;
let gridContainer;
let riviB, riviI, riviN, riviG, riviO;
let uusiNumero;
let intervalID = null;


//boolean logiikka joka säätää automaatioita
// pitää TÄYSIN AUTOMAATIO käynnissä.
  let running = false;
//klikki on KIERROSNUMERO.
  let klikki = 0;
//merkitsee automaattisesti jos tulee OSUMA 
  let merkitsee = false;
//käynnistää pelin (ANIMAATIO)
  let pyörii = false;
// jos virhe enemmän kuin 0, voittoteksti ei ilmesty.
  let virhe = 0;

//tyhjentää kaiken aikaisemman pelatun
function uusipeli(){
  running = false;
  merkitsee = false;
  pyörii = false;
  klikki = null;
  uusiNumero= [];
  arpanumerot = [];
  numero.textContent = "Kierros: 0";

  document.getElementById("vuoronumero").innerText = "";
  document.getElementById("vasenreuna").innerHTML = "";
  document.querySelectorAll('#voittoteksti, #virheviesti').forEach(poista => poista.remove());
  UIcontainer.remove();
  gridContainer.remove();

  cUI();
  numerojärjestys();
  cGrid();
  napinväri();
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
function arvoyksi() {
  const numero = document.getElementById("numero");
  klikki++;
  numero.textContent = `Kierros: ${klikki}`;
  
  // Jos arvottu 75 kertaa.
  if (arpanumerot.length >= 64) {
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
    // console.log("Arvottu numero:", uusiNumero);
    document.getElementById("vuoronumero").innerText = kirjain +" "+ uusiNumero;
    lisäävasemmalle();

  // Tarkistaa onko numero osuma ja merkitsee sen
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      if (!merkitsee) { 
        return;
      }
      const value = parseInt(cell.textContent);
      if (value === uusiNumero) {
        cell.classList.add("osuma");
        Bingo();
      }
    });
}



function Bingo() {
  // Jos rivillä on tyhjä kenttä = bingoa ei ole.
    // Tarkistaa vaakarivit vasemmalta.
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
        break;
      } else {
          voittoilmoitus();
          running = false;
          pyörii = false;
          return true;
        }
    }
  }

  // Tarkistaa pystyrivit ylhäältä alaspäin.
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

// Teksti joka ilmestyy jos oikeasti bingo (käytetään Bingo funktiossa)
function voittoilmoitus() {
  const h1 = document.createElement('h5');
  h1.textContent = 'BINGO!';
  h1.id = 'voittoteksti';
  document.body.prepend(h1);
}

//pysäyttää kaiken paikoilleen
function STOP() {
  running = false;
  pyörii = false;
  napinväri();
}

//käynnistää automaatio funktion ja auttaa pysäyttämään sen.
function käynnistäautomaatio() {
  pyörii = false;
  if (running) return;
  running = true;
  merkitsee = true;
  automaatio();
  napinväri();
}
// toistaa itsensä 100ms välein jos running = true
function automaatio() {   
  if (!running) return;
  arvoyksi();
  setTimeout(automaatio, 100);
}

//käynnistää aunimaatio funktion ja auttaa pysäyttämään sen.
function käynnistäanimaatio(){
  if (pyörii) return;
  if (running) return;
  pyörii = true;
  merkitsee = false;
  animaatio();
  napinväri();
  arvoyksi();
}
 
function animaatio(){
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
      if (!pyörii) return;
    arvoyksi();
  }, parseInt(nopeus.value));
}



//lisää arvotut numerot vasempaan reunaan.
function lisäävasemmalle() {
  const alkuperäinen = document.getElementById("vuoronumero").innerHTML;
  const animaatioDiv = document.getElementById("vasenreuna");

  const uusidiv = document.createElement("div");
  uusidiv.classList.add("uusinnumero");
  uusidiv.innerHTML = alkuperäinen;
  animaatioDiv.appendChild(uusidiv);
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
  h1.textContent = `Koitatko huijata? ${virheelliset.join(", ")} ei olla vielä arvottu!`;
  STOP();
    } 
    return virheelliset;
}


//vaihtaa nappien värit kun peli käynnissä (pyörii)
function napinväri() {
  const aloita = document.getElementById("nappi1");
  const automaatio = document.getElementById("nappi3");
  const stopnappi = document.getElementById("nappi4");

  automaatio.style.backgroundColor = running ? "rgb(137, 145, 153)" : "";
  aloita.style.backgroundColor = pyörii ? "rgb(137, 145, 153)" : "";
  stopnappi.style.backgroundColor = (pyörii | running) ?  "rgb(51, 250, 68)" : "";
}