function calculateLoan() {
    var amount = parseFloat(document.getElementById('amount').value) || 0;
    var interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    var loanTermIndex = parseInt(document.getElementById('loanTerm').value, 10);
    var extraPayment = parseFloat(document.getElementById('extraPayment').value) || 0;
    var monthlyInterestRate = (interestRate / 100) / 12;
    var terms = [60, 72, 84, 96, 120, 144, 180, 204, 240];
    var loanTerm = terms[loanTermIndex];

    function calculatePayment(term) {
        if (interestRate === 0) {
            return amount / term;
        }
        return amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -term));
    }

    if (loanTerm <= 0 || amount <= 0) {
        return;
    }

    var standardPayment = calculatePayment(loanTerm);
    var totalPaymentWithExtra = standardPayment + extraPayment;
    var totalInterestWithoutExtra = standardPayment * loanTerm - amount;

    var currentBalance = amount;
    var totalInterestPaidWithExtra = 0;
    var monthsWithExtra = 0;
    while (currentBalance > 0) {
        var interestForThisMonth = currentBalance * monthlyInterestRate;
        var principalForThisMonth = Math.min(standardPayment - interestForThisMonth + extraPayment, currentBalance);
        currentBalance -= principalForThisMonth;
        totalInterestPaidWithExtra += interestForThisMonth;
        monthsWithExtra++;
        if (monthsWithExtra >= loanTerm) break;
    }

    var effectiveInterestRate = (extraPayment > 0) ? (totalInterestPaidWithExtra / amount) / (monthsWithExtra / 12) * 100 : interestRate;
    var interestSaved = totalInterestWithoutExtra - totalInterestPaidWithExtra;
    var monthsReduced = loanTerm - monthsWithExtra;

    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class='result-highlight'>
            <h3>Loan Payment Details:</h3>
            <p>Base Monthly Payment (Principal + Interest): ${standardPayment.toFixed(2)}</p>
            <p>Additional Principal Payment: ${extraPayment.toFixed(2)}</p>
            <p>Total Monthly Payment: ${totalPaymentWithExtra.toFixed(2)}</p>
            <p>Effective Interest Rate: ${effectiveInterestRate.toFixed(2)}%</p>
            <p>Interest Saved: ${interestSaved.toFixed(2)}</p>
            <p>Loan will be paid off in ${monthsWithExtra} months, ${monthsReduced} months sooner than the original term.</p>
        </div>
    `;
}

window.onload = function() {
    var loanTermSlider = document.getElementById('loanTerm');
    var extraPaymentSlider = document.getElementById('extraPayment');
    loanTermSlider.oninput = function() {
        var terms = [60, 72, 84, 96, 120, 144, 180, 204, 240];
        var termValue = terms[this.value];
        document.getElementById('loanTermDisplay').textContent = termValue + ' months';
        calculateLoan();
    };
    extraPaymentSlider.oninput = function() {
        document.getElementById('extraPaymentDisplay').textContent = '$' + this.value;
        calculateLoan();
    };
    loanTermSlider.oninput(); // Initialize
    extraPaymentSlider.oninput(); // Initialize
};
