// VARIABLES
let bankBalance = 10000;
let pin = 0080;

let showBalance = false;
let currentAction = "";

// ELEMENTS
const balance = document.getElementById("balance");
const eyeIcon = document.getElementById("eyeIcon");
const amountSection = document.getElementById("amountSection");
const amountInput = document.getElementById("amount");
const message = document.getElementById("message");

// SHOW / HIDE BALANCE
eyeIcon.addEventListener("click", function () {

  if (showBalance === false) {

    balance.innerText = "₹" + bankBalance;

    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");

    showBalance = true;

  } else {

    balance.innerText = "******";

    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");

    showBalance = false;
  }

});


// WITHDRAW BUTTON
document.getElementById("withdrawBtn")
.addEventListener("click", function () {

  amountSection.classList.remove("hidden");

  currentAction = "withdraw";

});


// DEPOSIT BUTTON
document.getElementById("depositBtn")
.addEventListener("click", function () {

  amountSection.classList.remove("hidden");

  currentAction = "deposit";

});


// SUBMIT BUTTON
document.getElementById("submitBtn")
.addEventListener("click", function () {

  let amount = Number(amountInput.value);

  // VALIDATION
  if (amount <= 0) {
    message.innerText = "Enter valid amount";
    return;
  }

  // MULTIPLE OF 100
  if (amount % 100 !== 0) {
    message.innerText = "Amount must be multiple of 100";
    return;
  }

  // PIN
  let enteredPin = prompt("Enter PIN");

  if (Number(enteredPin) !== pin) {
    message.innerText = "Incorrect PIN";
    return;
  }

  // WITHDRAW
  if (currentAction === "withdraw") {

    if (amount > bankBalance) {
      message.innerText = "Insufficient balance";
      return;
    }

    bankBalance -= amount;

    message.innerText = "Withdrawal successful";
  }

  // DEPOSIT
  else if (currentAction === "deposit") {

    bankBalance += amount;

    message.innerText = "Deposit successful";
  }

  // UPDATE BALANCE IF VISIBLE
  if (showBalance) {
    balance.innerText = "₹" + bankBalance;
  }

  amountInput.value = "";

});