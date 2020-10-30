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
      jahr2020(personenAnzahl, kirchenSteuerValue);
      break;
    case '2019':
      jahr2019(personenAnzahl, kirchenSteuerValue);
      break;
    case '2018':
      jahr2018(personenAnzahl, kirchenSteuerValue);
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
  const zvEValue = parseInt(zvE.value.replace(/\./g, ''));
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Eur' })
    .format(zvEValue)
    // .replace('€', '')
    .trim();

  document.getElementById('zvE').value = inEuro;
}
// Wert in Euro
function toEuro(x) {
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Eur' }).format(x);
  return inEuro;
}

function jahr2020(teiler, prozent) {
  let ESt = 0;
  const zvEValue = parseInt(zvE.value.replace(/\./g, '')) / teiler;
  console.log(`${zvEValue} mal ${teiler}`);
  const y = (zvEValue - 9408) / 10000;
  const z = (zvEValue - 14532) / 10000;
  if (zvEValue <= 9408) {
    console.log('kleiner als 9408');
    ESt = 0;
  } else if (zvEValue >= 9409 && zvEValue <= 14532) {
    console.log('2. Fall');
    ESt = (981.87 * y + 1400) * y;
  } else if (zvEValue >= 14533 && zvEValue <= 57051) {
    console.log('3. Fall');
    ESt = (212.02 * z + 2397) * z + 972.79;
  } else if (zvEValue >= 57052 && zvEValue <= 270500) {
    console.log('4. Fall');
    ESt = 0.42 * zvEValue - 8963.74;
  } else if (zvEValue >= 270500) {
    console.log('5. Fall');
    ESt = 0.45 * zvEValue - 17078.74;
  }

  zeigeErgebnisse(ESt, teiler, prozent);
}

function jahr2019(teiler, prozent) {
  let ESt = 0;
  const zvEValue = parseInt(zvE.value.replace(/\./g, '')) / teiler;
  console.log(typeof zvEValue);
  console.log(`${zvEValue} mal ${teiler}`);
  const y = (zvEValue - 9168) / 10000;
  const z = (zvEValue - 14254) / 10000;
  if (zvEValue <= 9168) {
    console.log('kleiner als 9168');
    ESt = 0;
  } else if (zvEValue >= 9169 && zvEValue <= 14254) {
    console.log('2. Fall');

    ESt = (980.14 * y + 1400) * y;
  } else if (zvEValue >= 14255 && zvEValue <= 55960) {
    console.log('3. Fall');

    ESt = (216.16 * z + 2397) * z + 965.58;
  } else if (zvEValue >= 55961 && zvEValue <= 265326) {
    console.log('4. Fall');
    ESt = 0.42 * zvEValue - 8780.9;
  } else if (zvEValue >= 270500) {
    console.log('5. Fall');
    ESt = 0.45 * zvEValue - 16740.68;
  }

  zeigeErgebnisse(ESt, teiler, prozent);
}

function jahr2018(teiler, prozent) {
  let ESt = 0;
  const zvEValue = parseInt(zvE.value.replace(/\./g, '')) / teiler;
  console.log(typeof zvEValue);
  console.log(`${zvEValue} mal ${teiler}`);
  const y = (zvEValue - 9000) / 10000;
  const z = (zvEValue - 13996) / 10000;
  if (zvEValue <= 9000) {
    console.log('kleiner als 9000');
    ESt = 0;
  } else if (zvEValue >= 9001 && zvEValue <= 13996) {
    console.log('2. Fall');
    ESt = (997.8 * y + 1400) * y;
  } else if (zvEValue >= 13997 && zvEValue <= 54949) {
    console.log('3. Fall');
    ESt = (220.13 * z + 2397) * z + 948.49;
  } else if (zvEValue >= 54950 && zvEValue <= 260532) {
    console.log('4. Fall');
    ESt = 0.42 * zvEValue - 8621.75;
  } else if (zvEValue >= 260533) {
    console.log('5. Fall');
    ESt = 0.45 * zvEValue - 16437.7;
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
}
