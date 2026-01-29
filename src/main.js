import './style.css';
import products from './products.mjs';

/** PSEUDOKOD TO DO
 * PRODUKTINFO
 * x  10 produkter (produktnamn, pris, rating, kategori, adress till bild)
 * x  sortera produkter med tillhörande info - anv. ARRAY, OBJECT
 * x  skriva ut produkter + info html i js
 * x  visa produkt och info i webläsaren - anv. FOR-LOOP
 *    (varje produkt ska ha (minst) två bilder - som det går att växla mellan)
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
 * x  visa rating under produkt med ikoner
 *
 * VARUKORG
 * x  visa inlagda produkter (antal) i varukrog
 * x  visa rätt pris för produkt
 * x  i varukorg - justera antal produkter
 * x  visa priset - totalsumman vid justering
 * x  ikon papperskorg om jag vill ta bort en hel produkt alt. tömma allt
 * x  varukorgssammanfattning som visar endast de munkar som har beställts (skild från beställningsformuläret)
 * x  visuell feedback när varukorgens totalsumma uppdateras t.ex. färg-skiftning
 *
 * KUNDFORMULÄR
 * x  validera input - regEx
 * x  felmeddelande vid fel input
 * x  formuläret ska vara korrekt ifyllt för att skickas iväg
 *    skicka-knapp
 *    när man tryckt på beställ-knappen --> bekräftelse-ruta med info om beställningen och leveranstid
 *    rensa formulär-knapp
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

// ----------------------------------------------------------------------
// ---------------------- mainNav: ToggleMenu ---------------------------
// ----------------------------------------------------------------------

const menuButton = document.querySelector('#menuBtn');
const mainMenu = document.querySelector('#mainNav');
const navLinks = document.querySelectorAll('#mainNav a');

menuButton.addEventListener('click', toggleMenu);
navLinks.forEach((link) => {
  link.addEventListener('click', closeToggleMenu);
});
mainMenu.addEventListener('click', closeToggleMenu);

function toggleMenu() {
  mainMenu.classList.toggle('open');
}

function closeToggleMenu() {
  mainMenu.classList.remove('open');
}

// ----------------------------------------------------------------------
// ---------------- CartBtn scrolla till varukorg -----------------------
// ----------------------------------------------------------------------

const cartBtn = document.querySelector('#cartBtn');

if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    document.querySelector('#cart').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

// ----------------------------------------------------------------------
// ------------------------- FilternNav ---------------------------------
// ----------------------------------------------------------------------

const filterBtn = document.querySelector('#filterBtn');
const filterNav = document.querySelector('#filterNav');

filterBtn.addEventListener('click', filterOptions);

function filterOptions() {
  filterNav.classList.toggle('open');
}

// ----------------------------------------------------------------------
// -------------------------- FilterBtn ---------------------------------
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
//-------------- Filtrering av produkter i kategori ---------------------
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// ------------------------- SortBtn ------------------------------------
// ----------------------------------------------------------------------

const sortByNameBtn = document.querySelector('#sortByNameBtn');
const sortByPriceBtn = document.querySelector('#sortByPriceBtn');
const sortByRatingBtn = document.querySelector('#sortByRatingBtn');

sortByNameBtn.addEventListener('click', sortByName);
sortByPriceBtn.addEventListener('click', sortByPrice);
sortByRatingBtn.addEventListener('click', sortByRating);

function sortByRating() {
  filteredProducts.sort(
    (product1, product2) => product2.rating - product1.rating,
  );
  printProducts();
}

function sortByPrice() {
  filteredProducts.sort(
    (product1, product2) => product1.price - product2.price,
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

// ----------------------------------------------------------------------
// --------------------------- Varukorg ---------------------------------
// ----------------------------------------------------------------------

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

    // ----------------------------------------------------------------------
    // ------------------------------- img ----------------------------------
    // ----------------------------------------------------------------------

    let imgHtml = '';
    if (currentProduct.img !== '') {
      imgHtml = `<figure class="product-image"><img src="${currentProduct.img.src}" 
      width="${currentProduct.img.width}" 
      height="${currentProduct.img.height}" 
      alt="${currentProduct.img.alt}"
      loading="lazy" 
      ></figure>`;
    }

    html += `
    <article>
   ${imgHtml}
   <div class="productCard">
      <h3>${currentProduct.name}</h3>
      <div class="metadata">
        <p>Pris: ${currentProduct.price} kr</p>
        <p class="productRating">${renderRating(currentProduct.rating)}</p>
      </div>
      <p>${currentProduct.category}</p>
      <div class="productAddSubtract">
      <button class="subtract" data-id="${currentProduct.id}">-</button>
      <input type="number" min="1" value="1" id="amount-${currentProduct.id}" >  
      <button class="add" data-id="${currentProduct.id}">+</button>
      <button class="buy material-symbols-outlined" data-id="${currentProduct.id}" aria-label="button-add-product-to-shopping-cart">add_shopping_cart</button>
      </div></div>
      </article>
  `;
  }

  // ----------------------------------------------------------------------
  // ------------------------ Stjärn-rating -------------------------------
  // ----------------------------------------------------------------------

  function renderRating(rating, maxRating = 5) {
    let stars = '';
    for (let i = 1; i <= maxRating; i++) {
      stars += i <= rating ? '★' : '☆';
    }
    return stars;
  }

  //id="amount-${currentProduct.id}" <--- detta är ett sk dynamiskt ID
  productListing.innerHTML = html;

  // ----------------------------------------------------------------------
  // ----------------------- Produkt BuyBtn -------------------------------
  // ----------------------------------------------------------------------

  const buyButtons = document.querySelectorAll('#products button.buy');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductsToCart);
  });

  // ----------------------------------------------------------------------
  // ----------- input +/- x-produkter addBtn & subtractBtn  --------------
  // ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// ---------- Varukorg - lägg till specifik produkter med Id ------------
// ----------------------------------------------------------------------

function addProductsToCart(e) {
  const clickedBtnId = Number(e.target.dataset.id); //OBS konvertera om string till number pga ID=number - så det matchar produktarrayen

  const product = products.find((product) => product.id === clickedBtnId);
  //e=parameter som visar att det är event. data-id i html currentProduct.name
  // console.log(e.target.dataset.id);  --> dataset.id (ta ej med bindestrecket), kan också skriva: name, price osv. få ut info, .target visar att varje köpknapp har en specifik produktkoppling i konsolen

  if (product == undefined) {
    return;
  } //om den ej hittar produkt - avbryt

  // ----------------------------------------------------------------------
  // -------------- visa x-produkter kunden vill beställa -----------------
  // ----------------------------------------------------------------------

  const inputField = document.querySelector(`#amount-${clickedBtnId}`);
  let amount = Number(inputField.value);
  if (amount < 0) {
    return;
  }

  inputField.value = 0; //efter tryckt på köp --> inputvärde = 0

  // ----------------------------------------------------------------------
  //---------------- kolla om produkten finns i varukorgen ----------------
  // ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// ----------------- räkna ut totalsumma i varukorgen -------------------
// ----------------------------------------------------------------------

const cartTotalHtml = document.querySelector('#cartTotal');

function updateCartTotals() {
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    cartTotal += productSum;
  }

  cartTotalHtml.innerHTML = `Summa: ${cartTotal} kr`;

  const totalSumNav = document.querySelector('#total-sum');
  if (totalSumNav) {
    totalSumNav.textContent = `${cartTotal} kr`;
  }

  // ----------------------------------------------------------------------
  // -------------- animering för att visa prisuppdatering ----------------
  // ----------------------------------------------------------------------

  highlightCartTotalChange();
}

function highlightCartTotalChange() {
  cartTotalHtml.classList.add('highlight-price');

  setTimeout(removeCartTotalHighlight, 1000 * 2);
}

function removeCartTotalHighlight() {
  cartTotalHtml.classList.remove('highlight-price');
}

// ----------------------------------------------------------------------
// -- skriva ut produkt, kategori, pris, för varje produkt i varukorg ---
// ----------------------------------------------------------------------

const shoppingCartSection = document.querySelector('#shoppingCart');
function printCart() {
  shoppingCartSection.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;

    shoppingCartSection.innerHTML += `
    <article class="cartProducts">
    <div>
     ${cart[i].name} ${cart[i].category}:
     ${cart[i].amount} 
     </div>
     <div>
     <button data-id="${cart[i].id}" class="material-symbols-outlined subtract-cart-product">remove</button>
     <button data-id="${cart[i].id}" class="material-symbols-outlined add-cart-product">add</button>
     <button data-id="${i}" class="material-symbols-outlined delete-product">delete</button>
      <span class="cartProductSum">${productSum} kr</span>
      </div>
      </article>
    `;
  }

  // ----------------------------------------------------------------------
  // --------------- delete-knapp efter produkt i varukorg ----------------
  // ----------------------------------------------------------------------

  const deleteButtons = document.querySelectorAll('button.delete-product');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', deleteProductFromCart);
  });

  // ----------------------------------------------------------------------
  // ----------------------- +/- knappar i varukorg -----------------------
  // ----------------------------------------------------------------------

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
  if (product.amount <= 1) {
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

// ----------------------------------------------------------------------
// --------------------- nav-ikoner-fixerade offset ---------------------
// ----------------------------------------------------------------------

const fixedNavIcon = document.querySelector('.fixedNavIcon');
const navOffset = fixedNavIcon.offsetTop;

window.addEventListener('scroll', () => {
  if (window.scrollY >= navOffset) {
    fixedNavIcon.classList.add('fixed');
  } else {
    fixedNavIcon.classList.remove('fixed');
  }
});

// ----------------------------------------------------------------------
// ---------------------- felmeddelande och regEx -----------------------
// ----------------------------------------------------------------------

const nameRegEx =
  /^(?=.{2,}$)[A-Za-zÅÄÖåäö]+(?:[-][A-Za-zÅÄÖåäö]+)*(?:\.[A-Za-zÅÄÖåäö]+)?$/;
const postCodeRegEx = /^\d{3}\s?\d{2}$/;
const mobileRegEx = /^07\d{8}$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const swedishPNRegEx = /^\d{8}-?\d{4}$/;

//const orderForm = document.querySelector('#order-form');*/
const firstName = document.querySelector('#firstname');
const surName = document.querySelector('#surname');
const address = document.querySelector('#address');
const postCodeArea = document.querySelector('#postcode-area');
const postCode = document.querySelector('#postcode');
const telephoneNumber = document.querySelector('#telephonenumber');
const email = document.querySelector('#email');
const personalNumber = document.querySelector('#personal-number');

postCode.addEventListener('focusout', validatePostCodeField);
telephoneNumber.addEventListener('focusout', validateTelephoneNumberField);
email.addEventListener('focusout', validateEmailField);
personalNumber.addEventListener('focusout', validatePersonalNumberField);

function validatePostCodeField() {
  const inputFieldValue = postCode.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidPostCode = postCodeRegEx.test(inputFieldValue);
  const postCodeError = postCode.parentElement.querySelector('.error');

  if (isValidPostCode) {
    postCodeError.classList.add('hidden');
  } else {
    postCodeError.classList.remove('hidden');
  }
  return isValidPostCode;
}

function validateTelephoneNumberField() {
  const inputFieldValue = telephoneNumber.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidTelephoneNumber = mobileRegEx.test(inputFieldValue);
  const telephoneNumberError =
    telephoneNumber.parentElement.querySelector('.error');

  if (isValidTelephoneNumber) {
    telephoneNumberError.classList.add('hidden');
  } else {
    telephoneNumberError.classList.remove('hidden');
  }
  return isValidTelephoneNumber;
}

function validateEmailField() {
  const inputFieldValue = email.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidEmail = emailRegEx.test(inputFieldValue);
  const emailError = email.parentElement.querySelector('.error');

  if (isValidEmail) {
    emailError.classList.add('hidden');
  } else {
    emailError.classList.remove('hidden');
  }
  return isValidEmail;
}

function validatePersonalNumberField() {
  const inputFieldValue = personalNumber.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidPersonalNumber = swedishPNRegEx.test(inputFieldValue);
  const personalNumberError =
    personalNumber.parentElement.querySelector('.error');

  if (isValidPersonalNumber) {
    personalNumberError.classList.add('hidden');
  } else {
    personalNumberError.classList.remove('hidden');
  }
  return isValidPersonalNumber;
}

// ----------------------------------------------------------------------
//  felmed. för-/efternamn/adress/postort (slippa upprepning av funktion)
// ----------------------------------------------------------------------
/* ISTÄLLET för:
firstName.addEventListener('focusout', validateFirstNameField);
surName.addEventListener('focusout', validateSurNameField);
address.addEventListener('focusout', validateAddressField);
postCodeArea.addEventListener('focusout', validatePostCodeAreaField);

+ sen funktionerna likt ovan*/

firstName.addEventListener('focusout', () => validateNameField(firstName));
surName.addEventListener('focusout', () => validateNameField(surName));
address.addEventListener('focusout', () => validateNameField(address));
postCodeArea.addEventListener('focusout', () =>
  validateNameField(postCodeArea),
);

function validateNameField(inputField) {
  const inputValue = inputField.value;
  const errorSpan = inputField.parentElement.querySelector('.error');

  if (inputValue.length === 0) {
    errorSpan.classList.add('hidden');
    return false;
  }

  const isValid = nameRegEx.test(inputValue);

  if (isValid) {
    errorSpan.classList.add('hidden');
  } else {
    errorSpan.classList.remove('hidden');
  }

  return isValid;
}

// ----------------------------------------------------------------------
// ------------ checka så alla input-fält är korrekt ifyllda ------------
// ------------------- när man trycker på skicka ------------------------

const orderBtn = document.querySelector('#order-btn');
const formError = document.querySelector('#form-error');
const form = orderBtn.closest('form'); //ny

form.addEventListener('input', updateSendBtn);

orderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkFormFieldValidity(true); // ny (true), innan tomt
});

function checkFormFieldValidity(submit = false) {
  formError.classList.add('hidden');

  const firstNameOK = validateNameField(firstName);
  const surNameOK = validateNameField(surName);
  const addressOK = validateNameField(address);
  const postCodeAreaOK = validateNameField(postCodeArea);
  const postCodeOK = validatePostCodeField();
  const telephoneNumberOK = validateTelephoneNumberField();
  const emailOK = validateEmailField();
  const personalNumberOK = validatePersonalNumberField();

  const allValid =
    firstNameOK &&
    surNameOK &&
    addressOK &&
    postCodeAreaOK &&
    postCodeOK &&
    telephoneNumberOK &&
    emailOK &&
    personalNumberOK;

  if (!allValid && submit) {
    //visar felmed. om submit=true
    formError.classList.remove('hidden');
  }
  if (allValid && submit) {
    //skickar form om submit=true
    orderBtn.closest('form').submit();
    formError.classList.add('hidden');
  }

  return allValid; //retunerar true/false så knapp kan uppdateras i realtid
}

function updateSendBtn() {
  const allValid = checkFormFieldValidity(false);
  orderBtn.classList.toggle('ready', allValid);
}

printProducts();
