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

/** PSEUDOKOD TO DO
 * PRODUKTINFO
 * x  10 produkter (produktnamn, pris, rating, kategori, adress till bild)
 * x  sortera produkter med tillhörande info - anv. ARRAY, OBJECT
 * x  skriva ut produkter + info html i js
 * x  visa produkt och info i webläsaren - anv. FOR-LOOP
 *    varje produkt ska ha (minst) två bilder - som det går att växla mellan
 *
 * KATEGORIER
 * x  skapa 3 kategorier
 * x  filtrerna produkter på kategorier (se inspelning 14/1)
 *
 * SORTERING
 * x  sortera produkter efter pris (nr), rating (nr), namn (string)
 *
 * JUSTERA ANTAL PRODUKTER
 *    justera antal produkter, plus minus  - anv. EVENT
 *    visa priset - totalsumman vid justering
 *
 * RATING
 *    visa rating under produkt med ikoner
 *
 * VARUKROG
 *    lägga in produkter (antal) i varukrog
 *    visa rätt pris/summa
 *    i varukorg - justera antal produkter
 *      priset anpassas
 *    ikon papperskord om jag vill ta bort en hel produkt alt. tömma allt
 *    varukorgssammanfattning som visar endast de munkar som har beställts (skild från beställningsformuläret)
 *    när man tryckt på beställ-knappen --> bekräftelse-ruta med info om beställningen och leveranstid
 *    visuell feedback när varukorgens totalsumma uppdateras t.ex. färg-skiftning
 *
 *    SPECIALREGLER
 *    mån innan kl.10 = 10% rabatt på beställningssumman - visas med en rad "Måndagsrabatt: 10% på hela beställningen"
 *    fre - se uppgiftsbeskrivning
 *    > 800 kr - se uppgiftsbeskrivning
 *    >= 10 munkar/produkter - se uppgiftsbeskrivning
 *    >= 15 munkar/produkter - se uppgiftsbeskrivning
 *    om ej beställning inom 15 min ska beställningsforumläret tömmas/rensas och kunden ska meddelas att för långsamt - anv. timer?
 *    Extra/frivilligt - se uppgiftsbeskrivning
 */

// --------------- NAV: TOGGLE-MENU -----------------
// ---------------- open and close ------------------
const menuButton = document.querySelector('#menuBtn');
const mainMenu = document.querySelector('#mainNav');
const navLinks = document.querySelectorAll('#mainNav a');

menuButton.addEventListener('click', toggleMenu);
navLinks.forEach((link) => {
  link.addEventListener('click', closeToggleMenu);
});
mainNav.addEventListener('click', closeToggleMenu);

function toggleMenu() {
  mainMenu.classList.toggle('open');
}

function closeToggleMenu() {
  mainMenu.classList.remove('open');
}

// ------------------ ARRAY-OBJECT --------------------
// ---------- samlad info för varje produkt  ----------

const products = [
  {
    name: 'Chocolate',
    images: 'img.jpg',
    price: 60,
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
    name: 'Breezy Melon',
    images: 'img.jpg',
    price: 38,
    rating: 3,
    category: 'icecream',
  },
  {
    name: 'Salty Liquorice',
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
];

let filteredProducts = Array.from(products); //kopia av arrayen ovan. let --> kan ändras vilket behövs vid filtrering
const productListing = document.querySelector('#products');

// -------------- FILTER BUTTONS -------------------
//--------------------------------------------------

const donutsFilterBtn = document.querySelector('#donutsFilterBtn');
const icecreamFilterBtn = document.querySelector('#icecreamFilterBtn');
const milkshakeFilterBtn = document.querySelector('#milkshakeFilterBtn');
const allproductsFilterBtn = document.querySelector('#allproductsFilterBtn');

//------- lägg till click - EVENT på filterBtn -------

donutsFilterBtn.addEventListener('click', filterProductsListByDonutCategory);
icecreamFilterBtn.addEventListener(
  'click',
  filterProductsListByIcecreamCategory,
);
milkshakeFilterBtn.addEventListener(
  'click',
  filterProductsListByMilkshakeCategory,
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
    (product) => product.category === 'icecream',
  );
  printProducts();
}

function filterProductsListByMilkshakeCategory() {
  filteredProducts = products.filter(
    (product) => product.category === 'milkshake',
  );
  printProducts();
}

// ---------------- SORT BUTTONS -------------------
//--------------------------------------------------
const sortByNameBtn = document.querySelector('#sortByNameBtn');
const sortByPriceBtn = document.querySelector('#sortByPriceBtn');
const sortByRatingBtn = document.querySelector('#sortByRatingBtn');

sortByNameBtn.addEventListener('click', sortByName);
sortByPriceBtn.addEventListener('click', sortByPrice);
sortByRatingBtn.addEventListener('click', sortByRating);

function sortByRating() {
  filteredProducts.sort(
    (product1, product2) => product1.rating < product2.rating,
  );
  printProducts();
}

function sortByPrice() {
  filteredProducts.sort(
    (product1, product2) => product1.price > product2.price,
  );

  printProducts();
}

function sortByName() {
  filteredProducts.sort((product1, product2) => {
    const product1Name = product1.name.toUpperCase();
    const product2Name = product2.name.toUpperCase();
    if (product1Name < product2Name) {
      return -1;
    }
    if (product1Name > product2Name) {
      return 1;
    }

    return 0;
  });

  printProducts();
}

//------ skriver ut produkterna. anv. FOR-LOOP ------
//For-loop anv när vet hur mång ggr koden ska köras. loopar igenom en array med index. Index anv vid fler aarrayer, för att hämta rätt element/ändra/ta bort specifikt element t.ex. visa produkt 1, 2 samt veta ordning
//HTML (först loopa de igenom produkterna MEN efter filtrering/kategori ändrade till filterdProducts) ------

function printProducts() {
  productListing.innerHTML = ''; //detta för att inte allt ska läggas till utan endast det filtrerade

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
        <p>${currentProduct.category}</p>
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
