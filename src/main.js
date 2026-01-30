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
 * x  skicka-knapp
 *    när man tryckt på beställ-knappen --> bekräftelse-ruta med info om beställningen och leveranstid
 *    rensa formulär-knapp
 *
 *    SPECIALREGLER
 * x  mån innan kl.10 = 10% rabatt på beställningssumman - visas med en rad "Måndagsrabatt: 10% på hela beställningen"
 *    fre - se uppgiftsbeskrivning
 * x  > 800 kr - se uppgiftsbeskrivning
 *    >= 10 munkar/produkter - se uppgiftsbeskrivning
 * x  >= 15 munkar/produkter - se uppgiftsbeskrivning
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
// ----------------- Räkna ut totalsumma i varukorgen -------------------
// ----------------------------------------------------------------------

const cartTotalHtml = document.querySelector('#cartTotal');

function updateCartTotals() {
  let cartTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    cartTotal += productSum;
  }

  cartTotalHtml.innerHTML = `Summa: ${cartTotal} kr`;

  // ----------------------------------------------------------------------
  // -------------- animering för att visa prisuppdatering ----------------
  // ----------------------------------------------------------------------

  highlightCartTotalChange();

  function highlightCartTotalChange() {
    cartTotalHtml.classList.add('highlight-price');

    setTimeout(removeCartTotalHighlight, 1000 * 2);
  }

  function removeCartTotalHighlight() {
    cartTotalHtml.classList.remove('highlight-price');
  }
  // ----------------------------------------------------------------------
  // ------------------------- Specialregler ------------------------------
  // ----------------------------------------------------------------------

  /*
På måndagar innan kl. 10 ges 10 % rabatt på hela beställningssumman. 
Detta visas i varukorgssammanställningen som en rad med texten 
"Måndagsrabatt: 10 % på hela beställningen".
*/

  const date = new Date(2026, 1, 26, 8, 0); //töm Date(2026, 0, 26, 8, 0) innan inlämning
  let cartSum = cartTotal;

  /* samma sak, skrivet på annat vis
if (date.getDay() === 1) {
  if (date.getHours() < 10) {
  }
  console.log('måndag OCH innan kl.10');
}*/

  const MONDAY = 1;
  if (date.getDay() === MONDAY && date.getHours() < 10) {
    cartSum *= 0.9; // 100-10% = 90% (10%rabatt)

    document.querySelector('#discount').innerHTML =
      'Måndagsrabatt: 10 % på hela beställningen';
    document.querySelector('#cartSum').innerHTML = `Totalsumma: ${cartSum} kr`;
  } else {
    document.querySelector('#discount').innerHTML = '';
  }

  /*
Om kunden har beställt för totalt mer än 800 kr 
ska det inte gå att välja faktura som betalsätt.
*/
  const invoiceOption = document.querySelector('.invoice');
  const invoiceLabel = document.querySelector('.invoice-option');

  if (cartSum > 800) {
    if (invoiceOption) invoiceOption.style.display = 'none';
    if (invoiceLabel) invoiceLabel.style.display = 'none';
  } else {
    if (invoiceOption) invoiceOption.style.display = '';
    if (invoiceLabel) invoiceLabel.style.display = '';
  }

  /*
Om kunden beställer totalt mer än 15 munkar så blir frakten gratis. 
I annat fall är fraktsumman 25 kr plus 10% av totalbeloppet i varukorgen.
(i detta fall om man beställer mer än 15 produkter (ej specifikt munk)
*/

  let orderProductCount = 0;
  for (let i = 0; i < cart.length; i++) {
    orderProductCount += cart[i].amount;
  }

  function calculateShipping() {
    if (orderProductCount > 15) {
      shippingCost = 0;
    } else {
      shippingCost = Math.round((25 + 0.1 * cartSum) * 100) / 100;
    }
  }
  calculateShipping();
  document.querySelector('#shippingCost').innerHTML =
    `Fraktkostnad: ${shippingCost} kr`;

  /*
Om kunden har beställt minst 10 munkar av samma sort, 
ska munkpriset för just denna munksort rabatteras med 10 %
*/
  let totalDiscountedSum = 0;
  for (let i = 0; i < cart.length; i++) {
    const sameProduct = cart[i].amount;
    const productSum = cart[i].price * sameProduct;
    let discountedProductSum = productSum;

    if (sameProduct >= 10) {
      discountedProductSum = Math.round(productSum * 0.9);
      // 10% rabatt
    }
    totalDiscountedSum += discountedProductSum; // Summera alla produkter, rabatterade eller ej
  }
  // Uppdatera totalsumman i DOM
  const totalDiscountedEl = document.querySelector('#totalDiscountedSum');

  if (totalDiscountedEl) {
    totalDiscountedEl.innerHTML = `Totalt pris efter rabatter (ex. frakt): ${totalDiscountedSum} kr`;
  } else {
    totalDiscountedEl.innerHTML = ''; // rensa om ingen rabatt dragits
  }

  // -------------- totalt pris efter rabatt i fixed-nav ------------------
  // ----------------------------------------------------------------------

  // 2DO !!! denna visar INTE uppdaterad rabattTOTAL (förutom måndag) - MÅSTE ÄNDRAS
  document.querySelector('#total-sum').innerHTML = `${cartSum} kr`;
}

// ----------------------------------------------------------------------
// -- Skriva ut produkt, kategori, pris, för varje produkt i varukorg ---
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
  /*
Om kunden inte har lagt beställningen inom 15 minuter så 
ska beställningsformuläret tömmas/rensas och kunden 
ska meddelas att denne är för långsam.
*/

  //RABATTERNA SKA OCSKSÅ TÖMMAS
  const toSlowMsg = document.querySelector('#toSlowMsg');
  const SLOWNESS_TIMER_MINUTES = 15; //ändra till 15 min (0.1 för test)
  // caps endast variabel som en "inställning"=bestämt
  const shippingCostHtml = document.querySelector('#shippingCost');

  setTimeout(clearOrder, 1000 * 60 * SLOWNESS_TIMER_MINUTES);

  function clearOrder() {
    console.log('15 minuter har gått. clearOrder körs nu.');

    const shoppingCartSection = document.querySelector('#shoppingCart');

    if (shoppingCartSection) {
      shoppingCartSection.innerHTML = '';
    }

    cart.length = 0;
    cartTotal = 0;
    cartTotalHtml.innerHTML = 'Summa: 0kr';

    if (shippingCostHtml) {
      shippingCostHtml.innerHTML = 'Fraktkostnad: 0 kr';
    }

    if (toSlowMsg) {
      toSlowMsg.innerHTML =
        'Formuläret har tömts eftersom beställningen inte slutfördes inom 15 minuter.';
    }
  }

  /*
På fredagar efter kl. 15 och fram till natten mellan söndag och måndag kl. 03.00 
tillkommer ett helgpåslag på 15 % på alla munkar. 
Detta ska inte framgå för kunden att munkarna är dyrare, 
utan priset ska bara vara högre i "utskriften" av munkarna.
*/

  const date = new Date(2016, 4, 30, 17); // för helg new Date(2016, 0, 30, 17)
  const FRIDAY = 5;
  const SATURDAY = 6;
  const SUNDAY = 0;
  const cartTotalHtml = document.querySelector('#cartTotal');
  let totalWeekendPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    const productSum = cart[i].price * cart[i].amount;
    let weekendPrice = productSum;

    if (
      (date.getDay() === FRIDAY && date.getHours() >= 15) ||
      date.getDay() === SATURDAY ||
      (date.getDay() === SUNDAY && date.getHours() <= 3)
    ) {
      weekendPrice *= 1.15;
      weekendPrice = Math.round(weekendPrice);

      const span = document.querySelectorAll('.cartProductSum')[i];
      if (span) {
        span.textContent = `${weekendPrice} kr`;
      }
      totalWeekendPrice += weekendPrice;
    }

    // OBS 2DO cartTotal skrivs inte över (endast i console) - checka ID
    if (cartTotal) {
      cartTotal.innerHTML = `Summa: ${totalWeekendPrice} kr`;
    }

    console.log(`Total varukorg med helgpåslag: ${totalWeekendPrice} kr`);
  }

  // ----------------------------------------------------------------------
  // --------------- Delete-knapp efter produkt i varukorg ----------------
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
// --------------------- Nav-ikoner-fixerade offset ---------------------
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
// ----------------------- Felmeddelande - regEx ------------------------
// ----------------------------------------------------------------------

const nameRegEx =
  /^(?=.{2,}$)[A-Za-zÅÄÖåäö]+(?:[-][A-Za-zÅÄÖåäö]+)*(?:\.[A-Za-zÅÄÖåäö]+)?$/;
const postCodeRegEx = /^\d{3}\s?\d{2}$/;
const mobileRegEx = /^07\d{8}$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const swedishPNRegEx = /^\d{8}-?\d{4}$/;

const orderBtn = document.querySelector('#order-btn');
const orderForm = document.querySelector('#order-form');
const firstName = document.querySelector('#firstname');
const surName = document.querySelector('#surname');
const address = document.querySelector('#address');
const postCodeArea = document.querySelector('#postcode-area');
const postCode = document.querySelector('#postcode');
const telephoneNumber = document.querySelector('#telephonenumber');
const email = document.querySelector('#email');
const personalNumber = document.querySelector('#personal-number');

firstName.addEventListener('focusout', validateFirstNameField);
surName.addEventListener('focusout', validateSurNameField);
address.addEventListener('focusout', validateAddressField);
postCodeArea.addEventListener('focusout', validatePostCodeAreaField);
postCode.addEventListener('focusout', validatePostCodeField);
telephoneNumber.addEventListener('focusout', validateTelephoneNumberField);
email.addEventListener('focusout', validateEmailField);
personalNumber.addEventListener('focusout', validatePersonalNumberField);

function validateFirstNameField() {
  const inputFieldValue = firstName.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidFirstName = nameRegEx.test(inputFieldValue);
  const firstNameError = firstName.parentElement.querySelector('.error');

  if (isValidFirstName) {
    firstNameError.classList.add('hidden');
  } else {
    firstNameError.classList.remove('hidden');
  }
  return isValidFirstName;
}

function validateSurNameField() {
  const inputFieldValue = surName.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidSurName = nameRegEx.test(inputFieldValue);
  const surNameError = surName.parentElement.querySelector('.error');

  if (isValidSurName) {
    surNameError.classList.add('hidden');
  } else {
    surNameError.classList.remove('hidden');
  }
  return isValidSurName;
}

function validateAddressField() {
  const inputFieldValue = address.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidAddress = nameRegEx.test(inputFieldValue);
  const addressError = address.parentElement.querySelector('.error');

  if (isValidAddress) {
    addressError.classList.add('hidden');
  } else {
    addressError.classList.remove('hidden');
  }
  return isValidAddress;
}

function validatePostCodeAreaField() {
  const inputFieldValue = postCodeArea.value;

  if (inputFieldValue.length === 0) {
    return false;
  }

  const isValidPostCodeArea = nameRegEx.test(inputFieldValue);
  const postCodeAreaError = postCodeArea.parentElement.querySelector('.error');

  if (isValidPostCodeArea) {
    postCodeAreaError.classList.add('hidden');
  } else {
    postCodeAreaError.classList.remove('hidden');
  }
  return isValidPostCodeArea;
}

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
// ------------ Formvalidering och orderBtn färgändring -----------------
// ----------------------------------------------------------------------

function checkFormFieldValidity() {
  orderBtn.setAttribute('disabled', '');
  orderBtn.classList.remove('ready');

  const firstNameOK = validateFirstNameField();
  const surNameOK = validateSurNameField();
  const addressOK = validateAddressField();
  const postCodeAreaOK = validatePostCodeAreaField();
  const postCodeOK = validatePostCodeField();
  const telephoneNumberOK = validateTelephoneNumberField();
  const emailOK = validateEmailField();
  const personalNumberOK = validatePersonalNumberField();

  if (!firstNameOK) {
    return;
  }

  if (!surNameOK) {
    return;
  }

  if (!addressOK) {
    return;
  }

  if (!postCodeOK) {
    return;
  }

  if (!postCodeAreaOK) {
    return;
  }

  if (!telephoneNumberOK) {
    return;
  }

  if (!emailOK) {
    return;
  }

  if (!personalNumberOK) {
    return;
  }

  orderBtn.removeAttribute('disabled');
  orderBtn.classList.add('ready');
}
export function initform() {
  orderForm.addEventListener('focusout', checkFormFieldValidity);
}
initform();

printProducts();
