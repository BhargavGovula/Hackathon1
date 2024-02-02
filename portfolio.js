var username = localStorage.getItem('username');
document.getElementById('displayun').innerText = "welcome " + username;
var fdTotal = 0;
var rdTotal = 0;
var mfTotal = 0;

function showInvestmentDetails() {
    var investmentType = document.getElementById("investmentType").value;
    var detailsDivs = document.getElementsByClassName("investmentDetails");

    for (var i = 0; i < detailsDivs.length; i++) {
        detailsDivs[i].style.display = "none";
    }

    var specificDetailsDiv = document.getElementById(investmentType + "Details");
    specificDetailsDiv.style.display = "block";
}

function calculateMaturityAmount(type, amount, details) {
    var maturityAmount = 0;

    switch (type) {
        case "fixedDeposit":
            var interestRate = parseFloat(details.interestRate);
            var tenure = parseInt(details.tenure);
            maturityAmount = amount + (amount * interestRate * tenure) / 1200;
            fdTotal += maturityAmount;
            break;
        case "recurringDeposit":
            var rdInterestRate = parseFloat(details.interestRate);
            var rdTenure = parseInt(details.tenure);
            maturityAmount = amount * rdTenure + (amount * (rdTenure + 1) * rdInterestRate) / 2400;
            rdTotal += maturityAmount;
            break;
        case "mutualFund":
            var nav = parseFloat(details.nav);
            var units = parseInt(details.units);
            var rateOfReturn = parseFloat(details.rateOfReturn);
            maturityAmount = (nav * units) * (1 + rateOfReturn / 100);
            mfTotal += maturityAmount;
            break;
        default:
            break;
    }

    return maturityAmount.toFixed(2);
}

function addInvestment() {
    var type = document.getElementById("investmentType").value;
    var name = document.getElementById("investmentName").value;
    var amount = parseFloat(document.getElementById("investmentAmount").value);
    var details = getSpecificDetails(type);

    var maturityAmount = calculateMaturityAmount(type, amount, details);

    var table = document.getElementById("investmentList");
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    cell1.innerHTML = type;
    cell2.innerHTML = name;
    cell3.innerHTML = amount;
    cell4.innerHTML = JSON.stringify(details);
    cell5.innerHTML = maturityAmount;

    updateTotals();

    // Clear the form fields
    document.getElementById("investmentForm").reset();
}

function updateTotals() {
    document.getElementById("fdTotal").textContent = "Fixed Deposit Total: Rs " + fdTotal.toFixed(2);
    document.getElementById("rdTotal").textContent = "Recurring Deposit Total: Rs " + rdTotal.toFixed(2);
    document.getElementById("mfTotal").textContent = "Mutual Fund Total: Rs " + mfTotal.toFixed(2);
}

function getSpecificDetails(type) {
    var details = {};

    switch (type) {
        case "fixedDeposit":
            details.interestRate = document.getElementById("fdInterestRate").value;
            details.tenure = document.getElementById("fdTenure").value;
            break;
        case "recurringDeposit":
            details.interestRate = document.getElementById("rdInterestRate").value;
            details.tenure = document.getElementById("rdTenure").value;
            break;
        case "mutualFund":
            details.nav = document.getElementById("mfNAV").value;
            details.units = document.getElementById("mfUnits").value;
            details.rateOfReturn = document.getElementById("mfRateOfReturn").value;
            break;
        default:
            break;
    }

    return details;
}