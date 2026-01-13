import './style.css';

/** FÖR ATT LÖSA UPPGIFTEN
 * Logik & programflöde
 * Kommentarer och självdokumenterande kod
 * Hög kodkvalitet, konventioner
 * Conditionals (if-satser)
 * Event
 * DOM-manipulation
 * Funktioner
 * Variabler
 * Aritmetik
 * Objekt
 * Arrayer
 * Timers
 * Loopar
 * Datum
 */

/** 10 PRODUKTER, max 3 KATEGORIER
 * Produktnamn
 * Pris
 * Rating
 * Kategori
 * Adress till bild/namn på produktbild
 */

/**
 * justera antal produkter, plus minus  - EVENT
 * visa priset - totalsumman
 * visa rating under produkt
 *
 */

/*OBJECT - samlad info för varje produkt */
//let choc = ;
//let glaze = ;

let donuts = [
  {
    name: 'Karamellchoklad',
    images: [],
    price: 18,
    rating: 1,
    category: 'sweet',
  },
  {
    name: 'Jordgubbsdröm',
    images: [],
    price: 28,
    rating: 1,
    category: 'sweet',
  },
];

/* EVENT - för att justera antalet produkter */
const minus = document.querySelector('#subtract');
const plus = document.querySelector('#addera');
const currentCount = document.querySelector('#currentCount');

minus.addEventListener('click', subtract);
plus.addEventListener('click', addera);

function subtract() {
  currentCount.value -= 1;
}

function addera() {
  currentCount.value = Number(currentCount.value) + 1; //typkonventering - gör om string till nummer
}
