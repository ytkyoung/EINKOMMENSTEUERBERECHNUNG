const form = document.getElementById('form');
const zvE = document.getElementById('zvE');
const veranlagung = document.getElementById('veranlagung');

const jahr = document.getElementById('jahr');
const kirchenSteuer = document.getElementById('kirchen-steuer');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //   console.log('From has submitted');
  console.clear();
  checkZvE();
  checkInput();
});

function checkInput() {
  const zvEValue = zvE.value.trim();
  const veranlagungValue = veranlagung.value.trim();
  const jahrValue = jahr.value.trim();
  const kirchenSteuerValue = kirchenSteuer.value.trim();
  console.log(zvEValue);
}

function checkZvE() {
  const zvEValue = +zvE.value.trim();
  const inEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(zvEValue);
  document.getElementById('zvE').value = inEuro;
  console.log(inEuro);
}
