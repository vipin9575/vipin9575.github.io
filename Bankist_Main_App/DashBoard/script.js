const displayBalance = document.querySelector("#actual_balance");
const depositForm = document.getElementById("depositForm");
const withdrawForm = document.getElementById("withdrawForm");
const guestName = document.getElementById("accountHolder");
const dislayAccNo = document.getElementById("account_number");
const displayTotalDeposit = document.getElementById("total_deposit");
const displayTotalWithdraw = document.getElementById("total_withdraw");
let bal = 0;

// Retriveing the respective data
let data = JSON.parse(localStorage.getItem("userData")).filter(
  (item) => item.username === localStorage.getItem("username")
)[0];

guestName.textContent = data.name;
dislayAccNo.textContent = data.account;

const handleDeposit = (event) => {
  event.preventDefault();

  let depositAmount = parseFloat(
    document.getElementById("deposit_amount").value
  );

  if (!isNaN(depositAmount) && depositAmount > 0) {
    let balance = parseFloat(displayBalance.textContent);
    balance += depositAmount;
    displayBalance.textContent = balance.toFixed(2);

    const accountType = document.getElementById("depositType").value;
    const description = document.getElementById("deposit_description").value;

    bal += balance;

    // Create transaction object
    const transaction = createTransaction(
      depositAmount,
      accountType,
      description,
      "Deposit"
    );

    bal = 0;
    addTransactionToTable(transaction);

    // display total deposit
    let depositBalance = parseFloat(displayTotalDeposit.textContent);
    depositBalance += depositAmount;
    displayTotalDeposit.textContent = depositBalance;

    showMessage("Deposited", depositAmount, description);
    depositForm.reset();
  } else {
    alert("Please enter a valid deposit amount.");
  }
};

function handleWithdrawal(event) {
  event.preventDefault();
  let withdrawAmount = parseFloat(
    document.getElementById("withdraw_amount").value
  );
  if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
    let balance = parseFloat(displayBalance.textContent);
    if (balance >= withdrawAmount) {
      balance -= withdrawAmount;
      displayBalance.textContent = balance.toFixed(2);
    } else {
      alert("Insufficient balance for withdrawal!");
      return; // Stop further execution
    }

    const accountType = document.getElementById("withdrawType").value;
    const description = document.getElementById("withdraw_description").value;

    bal += balance;

    // Create transaction object
    const transaction = createTransaction(
      withdrawAmount,
      accountType,
      description,
      "Withdrawal"
    );

    bal = 0;

    // display total withdraw
    let withdrawBalance = parseFloat(displayTotalWithdraw.textContent);
    withdrawBalance += withdrawAmount;
    displayTotalWithdraw.textContent = withdrawBalance;

    addTransactionToTable(transaction);
    showMessage("Withdrew", withdrawAmount, description);
    withdrawForm.reset();
  } else {
    alert("Please enter a valid withdrawal amount.");
  }
}

function showMessage(type, amount, description) {
  let message = `${type} rupees ${amount}`;
  if (description !== "") {
    message += " for " + description;
  }
  alert(message);
}

depositForm.addEventListener("submit", handleDeposit);
withdrawForm.addEventListener("submit", handleWithdrawal);

// Function to create a transaction object
function createTransaction(amount, accountType, description, type) {
  const serialNo =
    document.getElementById("transactionTableBody").getElementsByTagName("tr")
      .length + 1;
  const date = new Date().toLocaleDateString();

  return {
    serialNo: serialNo,
    date: date,
    description: description,
    amount: amount,
    type: accountType,
    creditDebit: type === "Deposit" ? "Credit" : "Debit",
    balance: bal, // Update balance for the transaction
  };
}

// Function to add a transaction to the table
function addTransactionToTable(transaction) {
  const tableBody = document.getElementById("transactionTableBody");

  if (transaction.balance > 0) {
    const row = `
            <tr>
                <td>${transaction.serialNo}</td>
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type}</td>
                <td>${transaction.creditDebit}</td>
                <td>${transaction.balance}</td>
            </tr>`;

    tableBody.innerHTML += row;
  }
}

const redirect = function () {
  window.location.href = "../Login/index.html";
};

// Get the eye icon element to toggle the display
const eyeIcon = document.getElementById("toggleBalance");

eyeIcon.addEventListener("click", function () {
  if (displayBalance.style.visibility === "visible") {
    displayBalance.style.visibility = "hidden";
  } else {
    displayBalance.style.visibility = "visible";
  }
});
