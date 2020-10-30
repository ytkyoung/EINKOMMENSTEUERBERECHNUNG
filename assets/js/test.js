const zvE = document.getElementById('zvE');
console.log(zvE.value);
console.log(typeof zvE.value);
console.log(zvE.value.replace(/\./g, ''));
const zvEValue = parseInt(zvE.value.replace(/\./g, ''));
// const zvEValue = parseInt(zvE.value.replace('.', ''));
console.log(zvEValue);
