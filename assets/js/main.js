/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
// reReReFactored
console.log("let's go!");

// Formular
const form = document.getElementById('form');
const zvE = document.getElementById('zvE');
const veranlagung = document.getElementById('veranlagung');
const jahr = document.getElementById('jahr');

// Anzeige Ergebnis
const einkommensteuer = document.getElementById('einkommensteuer');
const soliAusgabe = document.getElementById('solidaritaetszuschlag');
const kirchenSteuer = document.getElementById('kirchen-steuer');
const kirchenSteuerAusgabe = document.getElementById('kirchensteuer');
const gesamtbelastung = document.getElementById('gesamtbelastung');
const chiffre = document.getElementById('chiffre');
const btn = document.querySelector('#btn-reset');

// Jahre
const yeah = [
  {
    id: 2020,
    range: { untergrenze: 9408, grenze1: 14532, grenze2: 57051, obergrenze: 270500 },
    y1: 981.87,
    zWert: { z1: 212.02, z2: 2397, z3: 972.79 },
    fWert: { f4: 8963.74, f5: 17078 },
  },
  {
    id: 2019,
    range: { untergrenze: 9168, grenze1: 14254, grenze2: 55960, obergrenze: 270500 },
    y1: 980.14,
    zWert: { z1: 216.16, z2: 2397, z3: 948.49 },
    fWert: { f4: 8780.9, f5: 16740.68 },
  },
  {
    id: 2018,
    range: { untergrenze: 9000, grenze1: 13996, grenze2: 54949, obergrenze: 260532 },
    y1: 997.8,
    zWert: { z1: 220.13, z2: 2397, z3: 948.49 },
    fWert: { f4: 8621.75, f5: 16437.7 },
  },
];

// zum Spass einmal einen Loop .... vielleicht nützlich bei einer weiteren RefactoringRunde
const loopYeah = function (yeahPara) {
  for (let i = 0; i < yeah.length; i++) {
    console.log('........................................................................');
    console.log('🥳🎡🎢');
    console.log(yeahPara[i].id);
    console.log(yeahPara[i].range);
    console.log(yeahPara[i].y1);
    console.log(yeahPara[i].zWert);
    console.log(yeahPara[i].fWert);
    console.log('........................................................................');
  }
};
console.log(loopYeah(yeah));
// loopend....
const init = function () {
  btn.addEventListener('click', reset);
  zvE.addEventListener('focusout', outOfFocus);
  form.addEventListener('submit', send);
};

// Input Checker -> is Number?
// prüft =>
// ''
// Number
// 0
// Buchstaben
// Komma

const outOfFocus = function () {
  let result;
  const testN = zvE.value;
  console.clear();
  if (testN === '') {
    zvE.value = 'Bitte einen Betrag eingeben';
    console.log('Bitte einen Betrag eingeben');
    result = false;
  } else if (testN.match(/^\d+$/) && testN !== '0') {
    console.log(`Yes, eine number ${zvE.value.match(/^\d+$/)}`);
    result = true;
    checkZvE();
  } else if (testN === '0') {
    zvE.value = 'Was ist Null geteilt durch Null?';
    console.log(zvE.value);
    result = false;
  } else if (testN.match(/([A-Z]+)/gi)) {
    zvE.value = 'Eine Zahl wäre nicht schlecht';
    console.log(zvE.value);
    result = false;
  } else if (testN.match(/^[0-9]+(,[0-9]{1,})?$/gi)) {
    console.log('Zahl mit Komma');
    result = true;
    checkZvE();
  }
  if (result === true) {
    console.log(`Yoda: ${result} das Ergebnis ist, isNumber ${result} sein`);
  } else {
    console.log(`Yoda: ${result} das Ergebnis ist, isNumber ${result} sein, eine Zahl wir benötigen`);
  }
  return result;
};

// Euro-Anzeige im Inputfeld
const checkZvE = function () {
  const zvEValue = parseInt(zvE.value.replace(/\./g, ''));
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Eur' })
    .format(zvEValue)
    // .replace('€', '')
    .trim();

  zvE.value = inEuro;
  console.log('YEHA TEST CHECK');
  console.log(inEuro);
  console.clear();
};

const checkInput = function () {
  const veranlagungValue = veranlagung.value;
  const jahrValue = jahr.value;
  const zvEValue = parseInt(zvE.value.replace(/\./g, ''));
  const personenAnzahl = Number(veranlagungValue);
  const kirchenSteuerValue = Number(kirchenSteuer.value);

  console.log('CHECK INPUT');
  console.log('------------------------------------------------');
  console.log('Welches Jahr?');
  console.log(`Anno ${jahrValue}`);
  console.log('------------------------------------------------');
  console.log('Wieviele Personen');
  console.log(personenAnzahl);

  console.log('---------------------------------------------');
  console.log('Zu versteuerndes Einkommen');
  console.log(zvEValue);
  console.log('---------------------------------------------');
  console.log('Kirchensteuer?');
  console.log(kirchenSteuerValue ? `ja ${kirchenSteuerValue}%` : `nein ${kirchenSteuerValue}%`);
  console.log('Amen 🙏');
  console.log('---------------------------------------------');

  auswahl(jahrValue, personenAnzahl, kirchenSteuerValue);
  kraAng();
  document.querySelector('.form-control').style.background = '#e8e8e8';
};

const auswahl = function (jahrPara, personPara, kirchenSteuerPara) {
  console.log('ICH KOMME AUS DER FUNCTION checkInput');
  console.log('ich bin die function auswahl');
  console.log(`${jahrPara} ich bin jahrPara aus checkInput`);
  console.log(`${personPara} ich bin personPara aus checkInput`);
  console.log(`${kirchenSteuerPara} ich bin kirchenSteuerPara aus checkInput`);
  console.log('------------------------------------------------');
  console.log('Object in yeah, index 0 vom Objekt === jahr');
  console.log(yeah[0].id === Number(jahrPara));
  const testVar = [jahrPara, personPara, kirchenSteuerPara];
  console.log(testVar);
  if (jahrPara === '2020') {
    console.log(`das Jahr ${jahrPara} wurde ausgewählt`);
    createYear(yeah[0], personPara, kirchenSteuerPara);
  } else if (jahrPara === '2019') {
    createYear(yeah[1], personPara, kirchenSteuerPara);
    console.log(`das Jahr ${jahrPara} wurde ausgewählt`);
  } else if (jahrPara === '2018') {
    createYear(yeah[2], personPara, kirchenSteuerPara);
    console.log(`das Jahr ${jahrPara} wurde ausgewählt`);
  }
  console.log('------------------------------------------------');
  return testFunc(testVar);
};

const createYear = function (einkommenJahre, teiler, prozent) {
  console.log('......................................................');
  console.log(einkommenJahre.id);
  console.log('ObjektWerte');
  console.log(einkommenJahre.range);
  console.log(einkommenJahre.y1);
  console.log(einkommenJahre.zWert);
  console.log(einkommenJahre.fWert);
  console.log('teiler');
  console.log(teiler);
  console.log('ProzentWert');
  console.log(prozent);
  console.log('......................................................');
  let ESt = 0;
  const zvEValue = parseInt(zvE.value.replace(/\./g, '')) / teiler;
  console.log(`berechnet wird ${zvEValue} mal ${teiler}`);
  const y = (zvEValue - einkommenJahre.range.untergrenze) / 10000;
  const z = (zvEValue - einkommenJahre.range.grenze1) / 10000;
  // console.log(y);
  // console.log(z);
  if (zvEValue <= einkommenJahre.range.untergrenze) {
    console.log(`kleiner als ${einkommenJahre.range.untergrenze}`);
    ESt = 0;
  } else if (zvEValue >= einkommenJahre.range.untergrenze + 1 && zvEValue <= einkommenJahre.range.grenze1) {
    console.log('2. Fall');
    ESt = (einkommenJahre.y1 * y + 1400) * y;
  } else if (zvEValue >= einkommenJahre.range.grenze1 + 1 && zvEValue <= einkommenJahre.range.grenze2) {
    console.log('3. Fall');
    ESt = (einkommenJahre.zWert.z1 * z + einkommenJahre.zWert.z2) * z + einkommenJahre.zWert.z3;
  } else if (zvEValue >= einkommenJahre.range.grenze2 + 1 && zvEValue <= einkommenJahre.range.obergrenze) {
    console.log('4. Fall');
    ESt = 0.42 * zvEValue - einkommenJahre.fWert.f4;
  } else if (zvEValue >= einkommenJahre.range.obergrenze + 1) {
    console.log('5. Fall!');
    ESt = 0.45 * zvEValue - einkommenJahre.fWert.f5;
  }
  zeigeErgebnisse(ESt, teiler, prozent);
};

const toEuro = function (x) {
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'Eur' }).format(x);
  return inEuro;
};

const zeigeErgebnisse = function zeigeErgebnisse(EStPara, teilerPara, prozentPara) {
  const EStErgebnis = Math.floor(EStPara) * teilerPara;
  einkommensteuer.innerText = toEuro(EStErgebnis);
  console.log(`EStErgebnis ${EStErgebnis} Euro`);
  let soli2 = EStErgebnis;
  const milderungszone = Math.floor(EStErgebnis - 972 * teilerPara) * 0.2;
  console.log(`Milderungszonenwert ${milderungszone}`);
  const soliZuschlag = EStErgebnis * 0.055;

  // Berechnung Milderungszone
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
  console.log(`${kirchenSteuerErgebnis} Euro kirchenSteuer ⛪️`);
  kirchenSteuerAusgabe.innerText = toEuro(kirchenSteuerErgebnis);
  const resultSumme = EStErgebnis + theRealSoli + kirchenSteuerErgebnis;
  console.log(`${resultSumme} Euro Gesamtbelastung 😬😵`);
  gesamtbelastung.innerText = toEuro(resultSumme);
};

// Anzeige Chiffre
const kraAng = function () {
  const codeAnzeige = [];
  const jahrValue = jahr.value;
  const veranlagungValue = veranlagung.value;
  const kirchenSteuerVal = kirchenSteuer.value;

  codeAnzeige.push(veranlagungValue);
  codeAnzeige.push(jahrValue);
  codeAnzeige.push(kirchenSteuerVal);
  chiffre.innerText = codeAnzeige.join('');

  console.log(codeAnzeige);
};

const testFunc = function (yearPara) {
  console.log('-------------------------------------------------------------------');
  console.log(
    `ich bin DIE TESTFUNCTION ${yearPara} komme aus der function auswahl, und bin hier nur so da, also,... so zu Testzwecken... hänge hier rum 👾`
  );
};

const reset = function (ev) {
  ev.preventDefault();
  console.clear();
  document.querySelector('.form-control').style.background = '#bbbfca';
  document.getElementById('form').reset();
  const aufNullTest = allesAufNull();
  if (aufNullTest === true) {
    console.log('Es wurde alles zurückgesetzt!');
  }
};

const allesAufNull = function () {
  zvE.innerText = '0,00 €';
  einkommensteuer.innerText = '0,00 €';
  soliAusgabe.innerText = '0,00 €';
  kirchenSteuerAusgabe.innerText = '0,00 €';
  gesamtbelastung.innerText = '0,00 €';
  chiffre.innerText = '000';
  console.log('Zurück auf Los 🎩');
  return true;
};

const send = function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  checkZvE();
  checkInput();
};

// Blink Blink Blink
const clickHandler = function () {
  // console.log('clicked!');
  gesamtbelastung.classList.add('blink_me');
};

const ausDerZone = function () {
  // console.log('out of box');
  gesamtbelastung.classList.remove('blink_me');
  document.querySelector('#berechnen').removeEventListener('click', ausDerZone);
};

const bindEvents = function () {
  document.querySelector('#berechnen').addEventListener('click', clickHandler);
  document.querySelector('#berechnen').addEventListener('mouseout', ausDerZone);
};

bindEvents();

document.addEventListener('DOMContentLoaded', init);
