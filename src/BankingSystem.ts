// 🏦 Create a banking system where users can create accounts, deposit, withdraw, and check their balance.
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.

enum TransactionType {
  Deposit,
  Withdraw,
}

type Transaction = {
  accountNo: number;
  amount: number;
  type: TransactionType;
};

type BankAccount = {
  accountNo: number;
  firstname: string;
  lastname: string;
  balance: number;
  isActive: boolean;
  transactions: Transaction[];
};

let accounts: BankAccount[] = [];

// 1. Crear cuenta bancaria
function createAccount(accountNo: number, firstname: string, lastname: string, initialDeposit: number, isActive: boolean = true): BankAccount {
  let newAccount: BankAccount = {
    accountNo,
    firstname,
    lastname,
    balance: initialDeposit,
    isActive,
    transactions: [],
  };

  accounts.push(newAccount);
  return newAccount;
}

// 2. Procesar transacciones
function processTransaction(accountNo: number, amount: number, transactionType: TransactionType): string {
  let account = accounts.find((acc: BankAccount) => acc.accountNo === accountNo);

  if (!account) {
    return "Account not found";
  }

  if (!account.isActive) {
    return "Account is not active";
  }

  if (transactionType === TransactionType.Withdraw) {
    if (account.balance < amount) {
      return "Insufficient funds for withdrawal";
    }
    account.balance -= amount;
  } else if (transactionType === TransactionType.Deposit) {
    account.balance += amount;
  }

  let transaction: Transaction = { accountNo, amount, type: transactionType };
  account.transactions.push(transaction);

  return `${amount} ${transactionType === TransactionType.Deposit ? "deposited" : "withdrawn"} into account number ${accountNo}`;
}

// 3. Obtener saldo
function getBalance(accountNo: number): number | string {
  let account = accounts.find((acc: BankAccount) => acc.accountNo === accountNo);
  return account ? account.balance : "Account not found";
}

// 4. Obtener historial de transacciones
function getTransactionHistory(accountNo: number): Transaction[] | string {
  let account = accounts.find((acc: BankAccount) => acc.accountNo === accountNo);
  return account ? account.transactions : "Account not found";
}

// 5. Verificar si la cuenta está activa
function checkActiveStatus(accountNo: number): boolean | string {
  let account = accounts.find((acc: BankAccount) => acc.accountNo === accountNo);
  return account ? account.isActive : "Account not found";
}

// 6. Cerrar cuenta
function closeAccount(accountNo: number): string {
  let accountIndex = accounts.findIndex((acc: BankAccount) => acc.accountNo === accountNo);

  if (accountIndex === -1) {
    return "Account not found";
  }

  accounts.splice(accountIndex, 1);
  return `Account number ${accountNo} closed`;
}

// Test cases (students should add more)
console.log(createAccount(1, "John", "Smith", 100)) // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
console.log(processTransaction(1, 50, TransactionType.Deposit)) // "50 deposited into account number 1"
console.log(processTransaction(1, 20, TransactionType.Withdraw)) // "20 withdrawn from account number 1"
console.log(processTransaction(1, 500, TransactionType.Withdraw)) // "Insufficient funds for withdrawal"
console.log(getBalance(1)) // 130
console.log(getTransactionHistory(1)) // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
console.log(checkActiveStatus(1)) // true
console.log(closeAccount(1)) // "Account number 1 closed"