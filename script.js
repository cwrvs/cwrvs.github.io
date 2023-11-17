function calculateLoan() {
    var amount = parseFloat(document.getElementById('amount').value) || 0;
    var interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    var loanTerm = parseInt(document.getElementById('loanTerm').value, 10);
    var extraPayment = parseFloat(document.getElementById('extraPayment').value) || 0;
    var monthlyInterestRate = (interestRate / 100) / 12;

    function calculatePayment(term) {
        return amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -term));
    }

    var standardPayment = calculatePayment(loanTerm);
    var totalInterestWithoutExtra = standardPayment * loanTerm - amount;

    var currentBalance = amount;
    var totalInterestPaidWithExtra = 0;
    var month = 0;
    while (currentBalance > 0) {
        var interestForThisMonth = currentBalance * monthlyInterestRate;
        var principalForThisMonth = Math.min(standardPayment - interestForThisMonth + extraPayment, currentBalance);
        currentBalance -= principalForThisMonth;
        totalInterestPaidWithExtra += interestForThisMonth;
        month++;
        if (month >= loanTerm) break;
    }

    var effectiveInterestRate = (extraPayment > 0) ? (totalInterestPaidWithExtra / amount) / (month / 12) * 100 : interestRate;
    var interestSaved = totalInterestWithoutExtra - totalInterestPaidWithExtra;

    var adjacentTerms = [84, 96, 120, 144, 180, 204, 240];
    var currentTermIndex = adjacentTerms.indexOf(loanTerm);
    var nextTerm = adjacentTerms[currentTermIndex + 1] || loanTerm;
    var prevTerm = adjacentTerms[currentTermIndex - 1] || loanTerm;

    var nextTermPayment = calculatePayment(nextTerm);
    var prevTermPayment = calculatePayment(prevTerm);
    var nextTermTotalInterest = nextTermPayment * nextTerm - amount;
    var prevTermTotalInterest = prevTermPayment * prevTerm - amount;

    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class='result-highlight'>
            <h3>Extra Payment and Effective Interest Rate:</h3>
            <p>Extra Monthly Payment: ${extraPayment.toFixed(2)}</p>
            <p>Effective Interest Rate: ${effectiveInterestRate.toFixed(2)}%</p>
            <p>Interest Saved by Extra Payments: ${interestSaved.toFixed(2)}</p>
        </div>
        <div class='result-section'>
            <h3>Selected Term (${loanTerm} months):</h3>
            <p>Monthly Payment: ${standardPayment.toFixed(2)}</p>
            <p>Total Interest: ${totalInterestWithoutExtra.toFixed(2)}</p>
        </div>
        <div class='result-section'>
            <h3>Next Term (${nextTerm} months):</h3>
            <p>Monthly Payment: ${nextTermPayment.toFixed(2)} (${(nextTermPayment - standardPayment).toFixed(2)} difference)</p>
            <p>Total Interest: ${nextTermTotalInterest.toFixed(2)} (${(nextTermTotalInterest - totalInterestWithoutExtra).toFixed(2)} difference)</p>
        </div>
        <div class='result-section'>
            <h3>Previous Term (${prevTerm} months):</h3>
            <p>Monthly Payment: ${prevTermPayment.toFixed(2)} (${(prevTermPayment - standardPayment).toFixed(2)} difference)</p>
            <p>Total Interest: ${prevTermTotalInterest.toFixed(2)} (${(prevTermTotalInterest - totalInterestWithoutExtra).toFixed(2)} difference)</p>
        </div>`;
}

window.onload = function() {
    var select = document.getElementById('loanTerm');
    var terms = [84, 96, 120, 144, 180, 204, 240];
    terms.forEach(term => {
        var opt = document.createElement('option');
        opt.value = term;
        opt.innerHTML = term + ' months';
        select.appendChild(opt);
    });
};
