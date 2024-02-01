document.addEventListener("DOMContentLoaded", function() {
    handleInvestmentTypeChange();
});

function handleInvestmentTypeChange() {
    const investmentType = document.getElementById('investment-type').value;
    const investmentWayContainer = document.getElementById('investment-way-container');

    if (investmentType === 'mutual-funds') {
        investmentWayContainer.style.display = 'block';
    } else {
        investmentWayContainer.style.display = 'none';
    }
}

function planInvestment() {
    const investmentType = document.getElementById('investment-type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const tenureYears = parseFloat(document.getElementById('tenure').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100; // Convert percentage to decimal
    const tenureMonths = parseFloat(document.getElementById('tenure-months').value);

    if (isNaN(amount) || isNaN(tenureYears) || isNaN(interestRate) || isNaN(tenureMonths)) {
        alert('Please enter valid amounts and tenure.');
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    switch (investmentType) {
        case 'fixed-deposit':
            const fdMaturityAmount = amount * Math.pow((1 + interestRate / 12), tenureYears * 12);
            resultDiv.innerHTML = `<p>Your fixed deposit will mature to: Rs ${fdMaturityAmount.toFixed(2)}</p>`;
            break;

        case 'recurring-deposit':
            const rdMaturityAmount = amount * tenureMonths * (1 + tenureMonths) / 2 * (1 + interestRate / 12);
            resultDiv.innerHTML = `<p>Your recurring deposit will mature to: Rs ${rdMaturityAmount.toFixed(2)}</p>`;
            break;

        case 'mutual-funds':
            const investmentWay = document.getElementById('investment-way').value;
            let mfMaturityAmount;

            if (investmentWay === 'sip') {
                mfMaturityAmount = amount * ((Math.pow((1 + interestRate), tenureMonths) - 1) / interestRate) * (1 + interestRate);
            } else {
                mfMaturityAmount = amount * Math.pow((1 + interestRate), tenureMonths);
            }

            resultDiv.innerHTML = `<p>Your mutual funds investment will grow to: Rs ${mfMaturityAmount.toFixed(2)}</p>`;
            break;
        default:
            alert('Invalid investment type selected.');
            break;
    }
}