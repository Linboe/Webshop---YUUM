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

/**
 * PRODUKTINFO
 * x  10 produkter (produktnamn, pris, rating, kategori, adress till bild)
 * x  sortera produkter med tillhörande info - anv. ARRAY, OBJECT
 * x  skriva ut produkter + info html i js
 * x  visa produkt och info i webläsaren - anv. LOOP
 *
 * KATEGORIER
 * x  skapa 3 kategorier
 * x  filtrerna produkter på kategorier (se inspelning 14/1)
 *
 * SORTERING
 *    sortera produkter efter pris (nr), rating (nr), namn (string)
 *
 * JUSTERA ANTAL PRODUKTER
 *    justera antal produkter, plus minus  - anv. EVENT
 *    visa priset - totalsumman vid justering
 *
 * RATING
 *    visa rating under produkt
 */

// ------------------ ARRAY-OBJECT --------------------
// ---------- samlad info för varje produkt  ----------

const products = [
  {
    name: 'Chocolate',
    images: 'img.jpg',
    price: 20,
    rating: 4,
    category: 'donut',
  },
  {
    name: 'Vanilla',
    images: 'img.jpg',
    price: 20,
    rating: 4,
    category: 'donut',
  },
  {
    name: 'Blueberry',
    images: 'img.jpg',
    price: 28,
    rating: 5,
    category: 'donut',
  },
  {
    name: 'Honey Swirl',
    images: 'img.jpg',
    price: 38,
    rating: 5,
    category: 'icecream',
  },
  {
    name: 'Breezy melon',
    images: 'img.jpg',
    price: 38,
    rating: 3,
    category: 'icecream',
  },
  {
    name: 'Salty liquorice',
    images: 'img.jpg',
    price: 46,
    rating: 4,
    category: 'icecream',
  },
  {
    name: 'Marsmallow',
    images: 'img.jpg',
    price: 50,
    rating: 2,
    category: 'milkshake',
  },
  {
    name: 'Strawberry',
    images: 'img.jpg',
    price: 50,
    rating: 4,
    category: 'milkshake',
  },
  {
    name: 'Cocos',
    images: 'img.jpg',
    price: 58,
    rating: 5,
    category: 'milkshake',
  },
  {
    name: 'Mango',
    images: 'img.jpg',
    price: 50,
    rating: 5,
    category: 'milkshake',
  },
]; //--- !! --- wait...vrf har behövdes detta tomma object? --- !! ---

let filteredProducts = Array.from(products);
const productListing = document.querySelector('#products');

//--------------------------------------------------
// -------------- FILTER BUTTONS -- ----------------
//--------------------------------------------------

const donutsFilterBtn = document.querySelector('#donutsFilterBtn');
const icecreamFilterBtn = document.querySelector('#icecreamFilterBtn');
const milkshakeFilterBtn = document.querySelector('#milkshakeFilterBtn');
const allproductsFilterBtn = document.querySelector('#allproductsFilterBtn');

//------ lägg till click - EVENT på knapparna ------

donutsFilterBtn.addEventListener('click', filterProductsListByDonutCategory);
icecreamFilterBtn.addEventListener(
  'click',
  filterProductsListByIcecreamCategory
);
milkshakeFilterBtn.addEventListener(
  'click',
  filterProductsListByMilkshakeCategory
);
allproductsFilterBtn.addEventListener('click', allProducts);

//------- FILTRERING av produkter i kategori -------

function allProducts() {
  filteredProducts = Array.from(products);
  printProducts();
}

function filterProductsListByDonutCategory() {
  filteredProducts = products.filter((product) => product.category === 'donut');
  printProducts();
}

function filterProductsListByIcecreamCategory() {
  filteredProducts = products.filter(
    (product) => product.category === 'icecream'
  );
  printProducts();
}

function filterProductsListByMilkshakeCategory() {
  filteredProducts = products.filter(
    (product) => product.category === 'milkshake'
  );
  printProducts();
}

//------ skriver ut produkterna. anv. FOR-LOOP ------
//HTML (först loopa de igenom produkterna MEN efter filtrering/kategori ändrade till filterdProducts) ------

function printProducts() {
  productListing.innerHTML = '';

  for (let i = 0; i < filteredProducts.length; i++) {
    //filteredProducts.lengt --> se let array i toppen. for --> startar loop, let i=0 --> räknare som heter i, i < filteredProducts.length --> villkoret: loop körs så länge i < antalet element i arrayen (filteredProducts.length = antal produkter i array). När i EJ < length --> loop stannar, i++ --> i ökas med 1, gå vidare till nästa varv till alla produkter gåtts igenom
    const currentProduct = filteredProducts[i];

    const html = `
    <article>
      <h2>${currentProduct.name}</h2>
      <div class="metadata">
        <p>Pris: ${currentProduct.price} kr</p>
        <p>Rating: ${currentProduct.rating}/5</p>
      </div>
        <p class="metadata">${currentProduct.category}</p>
    </article>
  `;

    productListing.innerHTML += html;
  }
}

// i HTML, skriv ut kr och /5 i rating här pga annars påverkar det hur jag behöver skriva funktionerna i t.ex. sortering (t.ex. ist nr för kr till string)

printProducts();

// ----------- JUSTERA ANTALET PRODUKTER -------------
// ----------------- anv.event -----------------------

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
