let balance = 10000;
let correctPin = "1234";
function deposit() {

    let amount = Number(document.getElementById("amount").value);
    if (amount % 100 != 0) {
        document.getElementById("message").innerHTML =
            "Amount must be multiple of 100";
        return;
    }
    let pin = prompt("Enter PIN");
    if (pin == correctPin) {
        balance = balance + amount;
        document.getElementById("balance").innerHTML =
            "Current Balance: Rs. " + balance;

        document.getElementById("message").innerHTML =
            "Deposit Successful";
    }
    else {
        document.getElementById("message").innerHTML =
            "Incorrect PIN";
    }
}
function withdraw() {
    let amount = Number(document.getElementById("amount").value);

    if (amount % 100 != 0) {
        document.getElementById("message").innerHTML =
            "Amount must be multiple of 100";
        return;
    }
    let pin = prompt("Enter PIN");
    if (pin == correctPin) {
        if (amount > balance) {
            document.getElementById("message").innerHTML =
                "Insufficient Balance";
        }
        else {
            balance = balance - amount;
            document.getElementById("balance").innerHTML =
                "Current Balance: Rs. " + balance;

            document.getElementById("message").innerHTML =
                "Withdraw Successful";
        }
    }
    else {
        document.getElementById("message").innerHTML =
            "Incorrect PIN";
    }
}