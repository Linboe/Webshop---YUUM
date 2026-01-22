import './style.css';
import products from './products.mjs';

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
 * x  justera antal produkter, plus minus  - anv. EVENT
 * x  köp-knapp --> lägger produkter i varukorgen
 *
 * RATING
 *    visa rating under produkt med ikoner
 *
 * VARUKORG
 *    visa inlagda produkter (antal) i varukrog
 *    visa rätt pris för produkt
 *    i varukorg - justera antal produkter
 *    visa priset - totalsumman vid justering
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
 *    om ej beställning inom 15 min ska beställningsformuläret tömmas/rensas och kunden ska meddelas att för långsamt - anv. timer?
 *    Extra/frivilligt - se uppgiftsbeskrivning
 */

// ------------------ ARRAY-OBJECT --------------------
// ---------- samlad info för varje produkt  ----------

let filteredProducts = Array.from(products); //kopia av arrayen ovan. let --> kan ändras vilket behövs vid filtrering
const productListing = document.querySelector('#products');

// ------------- mainNav: TOGGLE-MENU ---------------
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

// ------------ CartBtn scroll to cart --------------
const cartBtn = document.querySelector('#cartBtn');

if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    document.querySelector('#cart').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

// ------------------ FilternNav ---------------------
const filterBtn = document.querySelector('#filterBtn');
const filterNav = document.querySelector('#filterNav');

filterBtn.addEventListener('click', filterOptions);

function filterOptions() {
  filterNav.classList.toggle('open');
}

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
  filteredProducts = products.filter((product) => product.category === 'Donut');
  printProducts();
}

function filterProductsListByIcecreamCategory() {
  filteredProducts = products.filter(
    (product) => product.category === 'Icecream',
  );
  printProducts();
}

function filterProductsListByMilkshakeCategory() {
  filteredProducts = products.filter(
    (product) => product.category === 'Milkshake',
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

// SHOPPING-CART
const cart = [];

//------ skriver ut produkterna. anv. FOR-LOOP ------
//For-loop anv när vet hur mång ggr koden ska köras. loopar igenom en array med index. Index anv vid fler aarrayer, för att hämta rätt element/ändra/ta bort specifikt element t.ex. visa produkt 1, 2 samt veta ordning
//HTML (först loopa de igenom produkterna MEN efter filtrering/kategori ändrade till filterdProducts) ------

function printProducts() {
  productListing.innerHTML = ''; //detta för att inte allt ska läggas till utan endast det filtrerade

  let html = '';

  for (let i = 0; i < filteredProducts.length; i++) {
    //filteredProducts.lengt --> se let array i toppen. for --> startar loop, let i=0 --> räknare som heter i, i < filteredProducts.length --> villkoret: loop körs så länge i < antalet element i arrayen (filteredProducts.length = antal produkter i array). När i EJ < length --> loop stannar, i++ --> i ökas med 1, gå vidare till nästa varv till alla produkter gåtts igenom
    const currentProduct = filteredProducts[i];

    html += `
    <article>
      <h3>${currentProduct.name}</h3>
      <div class="metadata">
        <p>Pris: ${currentProduct.price} kr</p>
        <p>Rating: ${currentProduct.rating}/5</p>
      </div>
      <p>${currentProduct.category}</p>
      <button class="subtract" data-id="${currentProduct.id}">-</button>
      <input type="number" min="1" value="1" id="amount-${currentProduct.id}" >  
      <button class="add" data-id="${currentProduct.id}">+</button>
      <button class="buy" data-id="${currentProduct.id}" aria-label="button-shopping-cart">Köp</button>
    </article>
  `;
  }
  //id="amount-${currentProduct.id}" <--- detta är ett sk dynamiskt ID
  productListing.innerHTML = html;

  // ----------------- SHOPPING-CART --------------------

  const buyButtons = document.querySelectorAll('#products button.buy');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductsToCart);
  });

  // --------- input add and subtract products ----------
  const addButtons = document.querySelectorAll('#products button.add');
  addButtons.forEach((btn) => {
    btn.addEventListener('click', addProducts);
  });

  const subtractButtons = document.querySelectorAll(
    '#products button.subtract',
  );
  subtractButtons.forEach((btn) => {
    btn.addEventListener('click', subtractProducts);
  });

  function addProducts(e) {
    const clickedBtnId = e.target.dataset.id;
    const input = document.querySelector(`#amount-${clickedBtnId}`);
    input.value = Number(input.value) + 1;
  }

  function subtractProducts(e) {
    const clickedBtnId = e.target.dataset.id;
    const input = document.querySelector(`#amount-${clickedBtnId}`);

    let amount = Number(input.value) - 1; //
    if (amount < 1) {
      amount = 1;
    }

    input.value = amount;
  }
}

// ----------------- SHOPPING-CART --------------------
function addProductsToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id); //OBS konvertera om string till number pga ID=number - så det matchar produktarrayen

  const product = products.find((product) => product.id === clickedBtnId);
  //e=parameter som visar att det är event. data-id i html currentProduct.name
  // console.log(e.target.dataset.id);  --> dataset.id (ta ej med bindestrecket), kan också skriva: name, price osv. få ut info, .target visar att varje köpknapp har en specifik produktkoppling i konsolen

  if (product == undefined) {
    return;
  } //om den ej hittar produkt - avbryt

  // -------- antal produkter kunden vill beställa -------
  const inputField = document.querySelector(`#amount-${clickedBtnId}`);
  let amount = Number(inputField.value);
  if (amount < 0) {
    return;
  }

  inputField.value = 1; //efter tryckt på köp --> inputvärde = 0

  //------- kolla om produkten finns i varukorgen --------
  const index = cart.findIndex((product) => product.id == clickedBtnId);
  if (index == -1) {
    product.amount = amount;
    cart.push(product);
  } else {
    product.amount += amount;
  }

  //------- justera antal produkter i varukorgen --------

  printCart();
  updateCartTotals();
}

const cartTotalHtml = document.querySelector('#cartTotal');
function updateCartTotals() {
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    cartTotal += productSum;
  }

  cartTotalHtml.innerHTML = `SUMMA: ${cartTotal} kr`;

  console.log(cartTotalHtml.innerHTML); //totalpriset skrivs ut i konsolen men inte på sidan
}

const shoppingCartSection = document.querySelector('#shoppingCart');
function printCart() {
  shoppingCartSection.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    shoppingCartSection.innerHTML += `
    <p> ${cart[i].name} ${cart[i].category}: ${cart[i].amount} st</p>
    `;
  }
}

printProducts();
