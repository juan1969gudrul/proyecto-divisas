import "./style.css";
import accounts from "./accounts.js";
document.querySelector("#app").innerHTML = `
    <nav>
      <p class="welcome">Log in to get started</p>
      <img src="logo.png" alt="Logo" class="logo" />
      <form class="login" >
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
        />
        <!-- In practice, use type="password" -->
        <input
          type="text"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>
    <main class="app">
      <!-- BALANCE -->
      <div class="balance">
        <div>
          <p class="balance__label">Current balance</p>
          <p class="balance__date">
            As of <span class="date">05/03/2037</span>
          </p>
        </div>
        <p class="balance__value">0000€</p>
      </div>
      <!-- MOVEMENTS -->
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000€</div>
        </div>
        <div class="movements__row">
          <div class="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">-378€</div>
        </div>
      </div>
      <!-- SUMMARY -->
      <div class="summary">
        <p class="summary__label">In</p>
        <p class="summary__value summary__value--in">0000€</p>
        <p class="summary__label">Out</p>
        <p class="summary__value summary__value--out">0000€</p>
        <p class="summary__label">Interest</p>
        <p class="summary__value summary__value--interest">0000€</p>
        <button class="btn--sort">&downarrow; SORT</button>
      </div>
      <!-- OPERATION: TRANSFERS -->
      <div class="operation operation--transfer">
        <h2>Transfer money</h2>
        <form class="form form--transfer">
          <input type="text" class="form__input form__input--to" />
          <input type="number" class="form__input form__input--amount" />
          <button class="form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div>
      <!-- OPERATION: LOAN -->
      <div class="operation operation--loan">
        <h2>Request loan</h2>
        <form class="form form--loan">
          <input type="number" class="form__input form__input--loan-amount" />
          <button class="form__btn form__btn--loan">&rarr;</button>
          <label class="form__label form__label--loan">Amount</label>
        </form>
      </div>
      <!-- OPERATION: CLOSE -->
      <div class="operation operation--close">
        <h2>Close account</h2>
        <form class="form form--close">
          <input type="text" class="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
          />
          <button class="form__btn form__btn--close">&rarr;</button>
          <label class="form__label">Confirm user</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div>
      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
    </main>
`;
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
// creamos el campo username para todas las cuentas de usuarios
// usamos forEach para modificar el array original, en otro caso map
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner // Juan Sanchez
      .toLowerCase() //  juan sanchez
      .split(" ") // ['juan', 'sanchez']
      .map((name) => name[0]) // ['j', 's']
      .join(""); // js
  });
};
createUsernames(accounts);
let currentAccount;

const formatDate = function(date) {
  const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Hoy';
  if (daysPassed === 1) return 'Ayer';
  if (daysPassed <= 7) return `Hace ${daysPassed} días`;

  return new Intl.DateTimeFormat('es-ES').format(date);
};

btnLogin.addEventListener("click", function (e) {
  // evitar que el formulario se envíe
  e.preventDefault();
  // recojo el username y el pin y los comparo con los datos de las cuentas
  const inputUsername = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);
  currentAccount = accounts.find(
    (account) => account.username === inputUsername
  );
  // .find((account) => account.pin === inputPin);
  // lo anterior no funciona porque account ya es un array
  if (currentAccount && currentAccount.pin === inputPin) {
    // MÁS CONCISO:  if (account?.pin === inputPin) {
    // si el usuario y el pin son correctos
    // mensaje de bienvenida y que se vea la aplicación
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    // limpiar formulario
    inputLoginUsername.value = inputLoginPin.value = "";
    // cargar los datos (movimientos de la cuenta)
    updateUI(currentAccount);
  } else {
    console.log("login incorrecto");
  }
});
const updateUI = function (account) {
  // const {movements} = account.movements
  // mostrar los movimientos de la cuenta
  displayMovements(account.movements);
  // mostrar el balance de la cuenta
  displayBalance(account.movements);
  // mostrar el total de los movimientos de la cuenta
  // ingresos y gastos
  displaySummary(account.movements);
};
const displayMovements = function (movements) {
  // vaciamos el HTML
  containerMovements.innerHTML = "";
  // recorremos el array de movimientos
  movements.forEach((mov, i) => {
    // creamos el html para cada movimiento y lo guardamos en una variable
    const type = mov.amount > 0 ? "deposit" : "withdrawal";
    
    const date = formatDate(mov.date);

    // creamos el HTML
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${
      type === "withdrawal" ? "withdrawal" : "deposit"
    }</div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${mov.amount.toFixed(2)}€</div>
      </div>
    `;
    // insertamos el HTML en el DOM
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
const displayBalance = function (movements) {
  // calculamos suma de ingresos y retiradas de efectivo
  const balance = movements.reduce((total, movement) => total + movement.amount, 0);
  // actualizamos el DOM:
  labelBalance.textContent = `${balance.toFixed(2)} €`;

  // Actualizar la fecha del balance
  labelDate.textContent = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());
};
const displaySummary = function (movements) {
  const sumIn = movements
    .filter((movement) => movement.amount > 0)
    .reduce((total, movement) => total + movement.amount, 0);
  labelSumIn.textContent = `${sumIn.toFixed(2)} €`;
  
  const sumOut = movements
    .filter((movement) => movement.amount < 0)
    .reduce((total, movement) => total + movement.amount, 0);
  labelSumOut.textContent = `${Math.abs(sumOut).toFixed(2)} €`;
};

// Implementar transferencias
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Limpiar campos del formulario
  inputTransferAmount.value = inputTransferTo.value = '';

  // Validaciones
  if (
    amount > 0 && // Validar que la cantidad sea positiva
    receiverAccount && // Validar que la cuenta destino exista
    currentAccount.movements.reduce((acc, mov) => acc + mov.amount, 0) >= amount && // Validar saldo suficiente
    receiverAccount?.username !== currentAccount.username // Validar que no sea transferencia a sí mismo
  ) {
    // Realizar la transferencia
    currentAccount.movements.push({ amount: -amount, date: new Date() });
    receiverAccount.movements.push({ amount: amount, date: new Date() });

    // Actualizar UI
    updateUI(currentAccount);
  } else {
    // Mostrar mensaje de error según el caso
    if (amount <= 0) {
      alert('La cantidad debe ser positiva');
    } else if (!receiverAccount) {
      alert('La cuenta destino no existe');
    } else if (currentAccount.movements.reduce((acc, mov) => acc + mov.amount, 0) < amount) {
      alert('No tienes suficiente saldo');
    } else if (receiverAccount.username === currentAccount.username) {
      alert('No puedes transferir dinero a tu propia cuenta');
    }
  }
});

// Implementar solicitud de préstamo
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  const currentBalance = currentAccount.movements.reduce((acc, mov) => acc + mov.amount, 0);
  const maxLoanAmount = currentBalance * 2; // 200% del balance actual

  // Limpiar campo del formulario
  inputLoanAmount.value = '';

  // Validaciones
  if (amount <= 0) {
    alert('La cantidad solicitada debe ser positiva');
    return;
  }

  if (amount > maxLoanAmount) {
    alert(`El préstamo máximo permitido es de ${maxLoanAmount.toFixed(2)}€ (200% de tu balance actual)`);
    return;
  }

  // Aprobar y procesar el préstamo
  currentAccount.movements.push({ amount: amount, date: new Date() });

  // Actualizar UI
  updateUI(currentAccount);
  alert('Préstamo aprobado y depositado en tu cuenta');
});

// Implementar cierre de cuenta
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  // Verificar credenciales
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Encontrar el índice de la cuenta en el array de cuentas
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Eliminar la cuenta del array
    accounts.splice(index, 1);

    // Ocultar UI y limpiar campos
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername.value = inputClosePin.value = '';
  }
});
