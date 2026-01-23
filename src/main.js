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
 * x  visa inlagda produkter (antal) i varukrog
 * x  visa rätt pris för produkt
 *    i varukorg - justera antal produkter
 * x  visa priset - totalsumman vid justering
 *    ikon papperskorg om jag vill ta bort en hel produkt alt. tömma allt
 * x  varukorgssammanfattning som visar endast de munkar som har beställts (skild från beställningsformuläret)
 *    när man tryckt på beställ-knappen --> bekräftelse-ruta med info om beställningen och leveranstid
 * x  visuell feedback när varukorgens totalsumma uppdateras t.ex. färg-skiftning
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

let filteredProducts = Array.from(products); //kopia av arrayen ovan. let --> kan ändras vilket behövs vid filtrering
const productListing = document.querySelector('#products');

// ---------------------- mainNav: ToggleMenu --------------------------

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

// ---------------- CartBtn scrolla till varukorg ----------------------

const cartBtn = document.querySelector('#cartBtn');

if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    document.querySelector('#cart').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

// ------------------------- FilternNav --------------------------------

const filterBtn = document.querySelector('#filterBtn');
const filterNav = document.querySelector('#filterNav');

filterBtn.addEventListener('click', filterOptions);

function filterOptions() {
  filterNav.classList.toggle('open');
}

// -------------------------- FilterBtn --------------------------------

const donutsFilterBtn = document.querySelector('#donutsFilterBtn');
const icecreamFilterBtn = document.querySelector('#icecreamFilterBtn');
const milkshakeFilterBtn = document.querySelector('#milkshakeFilterBtn');
const allproductsFilterBtn = document.querySelector('#allproductsFilterBtn');

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

//-------------- Filtrering av produkter i kategori --------------------

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

// ------------------------- SortBtn -----------------------------------

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

// --------------------------- Varukorg --------------------------------

const cart = []; // Array för produkter i varukorg
// For-loop för att skriva ut de valda (i) produkterna
// anv när: vet hur mång ggr koden ska köras. loopar igenom en array med index.

// ------- For-loop för att visa filtrering/produkter/i kategori -------

function printProducts() {
  productListing.innerHTML = ''; //detta för att inte allt ska läggas till utan endast det filtrerade

  let html = '';

  for (let i = 0; i < filteredProducts.length; i++) {
    // let i=0 --> räknare som heter i, i < filteredProducts.length --> villkoret: loop körs så länge i < antalet element i arrayen (filteredProducts.length = antal produkter i array). När i EJ < length --> loop stannar, i++ --> i ökas med 1, gå vidare till nästa varv till alla produkter gåtts igenom.
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

  // ----------------------- Produkt BuyBtn ------------------------------

  const buyButtons = document.querySelectorAll('#products button.buy');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductsToCart);
  });

  // ----------- input +/- x-produkter addBtn & subtractBtn  -------------

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

// ---------- Varukorg - lägg till specifik produkter med Id -----------

function addProductsToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id); //OBS konvertera om string till number pga ID=number - så det matchar produktarrayen

  const product = products.find((product) => product.id === clickedBtnId);
  //e=parameter som visar att det är event. data-id i html currentProduct.name
  // console.log(e.target.dataset.id);  --> dataset.id (ta ej med bindestrecket), kan också skriva: name, price osv. få ut info, .target visar att varje köpknapp har en specifik produktkoppling i konsolen

  if (product == undefined) {
    return;
  } //om den ej hittar produkt - avbryt

  // -------------- visa x-produkter kunden vill beställa ----------------

  const inputField = document.querySelector(`#amount-${clickedBtnId}`);
  let amount = Number(inputField.value);
  if (amount < 0) {
    return;
  }

  inputField.value = 1; //efter tryckt på köp --> inputvärde = 0

  //---------------- kolla om produkten finns i varukorgen ---------------

  const index = cart.findIndex((product) => product.id == clickedBtnId);
  if (index == -1) {
    product.amount = amount;
    cart.push(product);
  } else {
    product.amount += amount;
  }

  printCart();
  updateCartTotals();
}

// ----------------- räkna ut totalsumma i varukorgen ------------------

const cartTotalHtml = document.querySelector('#cartTotal');
function updateCartTotals() {
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    cartTotal += productSum;
  }

  cartTotalHtml.innerHTML = `Summa: ${cartTotal} kr`;

  // -------------- animering för att visa prisuppdatering ---------------

  highlightCartTotalChange();
}

function highlightCartTotalChange() {
  cartTotalHtml.classList.add('highlight-price');

  setTimeout(removeCartTotalHighlight, 1000 * 2);
}

function removeCartTotalHighlight() {
  cartTotalHtml.classList.remove('highlight-price');
}

// -- skriva ut produkt, kategori, pris, för varje produkt i varukorg --

const shoppingCartSection = document.querySelector('#shoppingCart');
function printCart() {
  shoppingCartSection.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;

    shoppingCartSection.innerHTML += `
    <article>
     ${cart[i].name} ${cart[i].category}:
     <button data-id="${cart[i].id}" class="subtract-cart-product">-</button>
     ${cart[i].amount} 
     <button data-id="${cart[i].id}" class="add-cart-product">+</button>
     ${productSum}kr
     <button data-id="${i}" class="delete-product">Radera</button>
    </article>
    `;
  }

  // --------------- delete-knapp efter produkt i varukorg ---------------

  const deleteButtons = document.querySelectorAll('button.delete-product');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', deleteProductFromCart);
  });

  // ----------------------- +/- knappar i varukorg -----------------------

  const cartSubtractButtons = document.querySelectorAll(
    'button.subtract-cart-product',
  );
  cartSubtractButtons.forEach((btn) => {
    btn.addEventListener('click', subtractProductFromCart);
  });

  const cartAddButtons = document.querySelectorAll('button.add-cart-product');
  cartAddButtons.forEach((btn) => {
    btn.addEventListener('click', addProductFromCart);
  });
}

function subtractProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);
  const product = cart.find((product) => product.id === rowId);
  if (product.amount <= 0) {
    return;
  }
  product.amount -= 1;

  printCart();
  updateCartTotals();
}

function addProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);
  const product = cart.find((product) => product.id === rowId);

  product.amount += 1;

  printCart();
  updateCartTotals();
}

function deleteProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);

  cart.splice(rowId, 1);

  printCart();
  updateCartTotals();
}

printProducts();
