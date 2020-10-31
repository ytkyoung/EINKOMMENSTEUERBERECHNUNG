/* eslint-disable no-console */
const form = document.getElementById('form');
const zvE = document.getElementById('zvE');
const veranlagung = document.getElementById('veranlagung');
const jahr = document.getElementById('jahr');
const einkommensteuer = document.getElementById('einkommensteuer');
const soliAusgabe = document.getElementById('solidaritaetszuschlag');
const kirchenSteuer = document.getElementById('kirchen-steuer');
const kirchenSteuerAusgabe = document.getElementById('kirchensteuer');
const gesamtbelastung = document.getElementById('gesamtbelastung');
const chiffre = document.getElementById('chiffre');

const yeah2020 = {
  id: 2020,
  untergrenze: 9408,
  grenze1: 14532,
  grenze2: 57051,
  obergrenze: 270500,
  y1: 981.87,
  z1: 212.02,
  z2: 2397,
  z3: 972.79,
  f4: 8963.74,
  f5: 17078,
};

const yeah2019 = {
  id: 2019,
  untergrenze: 9168,
  grenze1: 14254,
  grenze2: 55960,
  obergrenze: 270500,
  y1: 980.14,
  z1: 216.16,
  z2: 2397,
  z3: 948.49,
  f4: 8780.9,
  f5: 16740.68,
};

const yeah2018 = {
  id: 2018,
  untergrenze: 9000,
  grenze1: 13996,
  grenze2: 54949,
  obergrenze: 260532,
  y1: 997.8,
  z1: 220.13,
  z2: 2397,
  z3: 948.49,
  f4: 8621.75,
  f5: 16437.7,
};

function checkInput() {
  const krasseVar = [];
  const veranlagungValue = veranlagung.value;
  const jahrValue = jahr.value;
  krasseVar.push(jahrValue);
  // replace tauscht nur die erste Stelle aus -> regex
  const zvEValue = parseInt(zvE.value.replace(/\./g, ''));
  console.log(zvEValue);

  const personenAnzahl = Number(veranlagungValue);
  const kirchenSteuerValue = Number(kirchenSteuer.value);
  console.log(`Anno ${jahrValue}`);
  console.log(`${kirchenSteuerValue} Amen 🙏`);

  switch (jahrValue) {
    case '2020':
      createYear(
        personenAnzahl,
        kirchenSteuerValue,
        yeah2020.untergrenze,
        yeah2020.grenze1,
        yeah2020.grenze2,
        yeah2020.obergrenze,
        yeah2020.y1,
        yeah2020.z1,
        yeah2020.z2,
        yeah2020.z3,
        yeah2020.f4,
        yeah2020.f5
      );
      break;
    case '2019':
      createYear(
        personenAnzahl,
        kirchenSteuerValue,
        yeah2019.untergrenze,
        yeah2019.grenze1,
        yeah2019.grenze2,
        yeah2019.obergrenze,
        yeah2019.y1,
        yeah2019.z1,
        yeah2019.z2,
        yeah2019.z3,
        yeah2019.f4,
        yeah2019.f5
      );
      break;
    case '2018':
      createYear(
        personenAnzahl,
        kirchenSteuerValue,
        yeah2018.untergrenze,
        yeah2018.grenze1,
        yeah2018.grenze2,
        yeah2018.obergrenze,
        yeah2018.y1,
        yeah2018.z1,
        yeah2018.z2,
        yeah2018.z3,
        yeah2018.f4,
        yeah2018.f5
      );
      break;

    default:
      console.log('o_O');
  }
}

function kraAng() {
  const codeAnzeige = [];
  const jahrValue = jahr.value;
  const veranlagungValue = veranlagung.value;
  const kirchenSteuerVal = kirchenSteuer.value;

  codeAnzeige.push(veranlagungValue);
  codeAnzeige.push(jahrValue);
  codeAnzeige.push(kirchenSteuerVal);
  chiffre.innerText = codeAnzeige.join('');

  console.log(codeAnzeige);
}

// Euro-Anzeige im Inputfeld
function checkZvE() {
  if (zvE.value === 'Eine Zahl wäre nicht schlecht') {
    zvE.value = '0';
  }
  const zvEValue = parseInt(zvE.value.replace(/\./g, ''));
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Eur' })
    .format(zvEValue)
    // .replace('€', '')
    .trim();

  zvE.value = inEuro;
}
// Wert in Euro
function toEuro(x) {
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Eur' }).format(x);
  return inEuro;
}

function outOfFocus() {
  const testN = zvE.value;
  console.log(testN);
  if (testN === '') {
    zvE.value = 'Bitte einen Betrag eingeben';
  } else if (testN.match(/^\d+$/) && testN !== '0') {
    console.log('only numbers');
    checkZvE();
  } else if (testN === '0') {
    zvE.value = 'Was ist Null geteilt durch Null?';
  } else {
    zvE.value = 'Eine Zahl wäre nicht schlecht';
  }
}

function createYear(teiler, prozent, untergrenze, grenze1, grenze2, obergrenze, y1, z1, z2, z3, f4, f5) {
  let ESt = 0;
  const zvEValue = parseInt(zvE.value.replace(/\./g, '')) / teiler;
  console.log(`${zvEValue} mal ${teiler}`);
  const y = (zvEValue - untergrenze) / 10000;
  const z = (zvEValue - grenze1) / 10000;
  if (zvEValue <= untergrenze) {
    console.log('kleiner als 9408');
    ESt = 0;
  } else if (zvEValue >= untergrenze + 1 && zvEValue <= grenze1) {
    console.log('2. Fall');
    ESt = (y1 * y + 1400) * y;
  } else if (zvEValue >= grenze1 + 1 && zvEValue <= grenze2) {
    console.log('3. Fall');
    ESt = (z1 * z + z2) * z + z3;
  } else if (zvEValue >= grenze2 + 1 && zvEValue <= obergrenze) {
    console.log('4. Fall');
    ESt = 0.42 * zvEValue - f4;
  } else if (zvEValue >= obergrenze + 1) {
    console.log('5. Fall');
    ESt = 0.45 * zvEValue - f5;
  }

  zeigeErgebnisse(ESt, teiler, prozent);
}

function zeigeErgebnisse(EStPara, teilerPara, prozentPara) {
  const EStErgebnis = Math.floor(EStPara) * teilerPara;
  einkommensteuer.innerText = toEuro(EStErgebnis);
  console.log(`EStErgebnis ${EStErgebnis}`);
  let soli2 = EStErgebnis;
  const milderungszone = Math.floor(EStErgebnis - 972 * teilerPara) * 0.2;
  console.log(`Milderungszonenwert ${milderungszone}`);
  const soliZuschlag = EStErgebnis * 0.055;

  let theRealSoli = 0;
  if (soli2 <= 972 * teilerPara) {
    console.log('kleiner als 987');
    soli2 = 0;
  } else if (milderungszone >= soliZuschlag) {
    theRealSoli = soliZuschlag;
    console.log(`${theRealSoli} Han Soli 🔦🗡`);
    console.log('Milderungszone groesser als Soli');
  } else if (milderungszone <= soli2) {
    console.log('Milderungszone kleiner als Soli');
    theRealSoli = milderungszone;
  }

  soliAusgabe.innerText = toEuro(theRealSoli);
  console.log(`${prozentPara} Prozent`);
  const kirchenSteuerErgebnis = EStErgebnis * prozentPara;
  console.log(`${kirchenSteuerErgebnis} kirchenSteuer ⛪️`);
  kirchenSteuerAusgabe.innerText = toEuro(kirchenSteuerErgebnis);
  const resultSumme = EStErgebnis + theRealSoli + kirchenSteuerErgebnis;
  console.log(`${resultSumme} Gesamtbelastung 😬😵`);
  gesamtbelastung.innerText = toEuro(resultSumme);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.clear();

  checkZvE();
  checkInput();
  kraAng();
});

function geheAufLos() {
  document.getElementById('form').reset();
  zvE.innerText = '0,00 €';
  einkommensteuer.innerText = '0,00 €';
  soliAusgabe.innerText = '0,00 €';
  kirchenSteuerAusgabe.innerText = '0,00 €';
  gesamtbelastung.innerText = '0,00 €';
  chiffre.innerText = '000';
  console.clear();
}
