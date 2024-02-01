
        let balance = 0;
        const transactions = [];
        let pieChart;
    
        function updateBalance() {
            document.getElementById('balance').innerText = `Balance: ₹${balance.toFixed(2)}`;
        }
    
        function addTransaction() {
            const description = document.getElementById('transaction-description').value;
            const amount = parseFloat(document.getElementById('transaction-amount').value);
            const type = document.getElementById('transaction-type').value;
    
            if (isNaN(amount)) {
                alert('Please enter only numbers.');
                return;
            }
    
            if (type === 'expense') {
                balance -= amount;
                transactions.push({ description, amount: -amount });
            } else {
                balance += amount;
                transactions.push({ description, amount });
            }
    
            updateBalance();
            updateTransactionList();
            updatePieChart();
    
            // Clear input fields
            document.getElementById('transaction-description').value = '';
            document.getElementById('transaction-amount').value = '';
        }
    
        function updateTransactionList() {
            const transactionList = document.getElementById('transaction-list');
            transactionList.innerHTML = '';
    
            transactions.forEach(transaction => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${transaction.description}</strong>: ₹${transaction.amount.toFixed(2)}`;
                transactionList.appendChild(listItem);
            });
        }
    
        function updatePieChart() {
            const pieChartCanvas = document.getElementById('pie-chart');
            const ctx = pieChartCanvas.getContext('2d');
    
            if (pieChart) {
                pieChart.destroy();
            }
    
            const totalIncomes = transactions.reduce((total, transaction) => (transaction.amount > 0 ? total + transaction.amount : total), 0);
            const totalExpenses = transactions.reduce((total, transaction) => (transaction.amount < 0 ? total + transaction.amount : total), 0);
    
            const data = {
                labels: ['Incomes', 'Expenses'],
                datasets: [{
                    data: [Math.max(totalIncomes, 0), Math.abs(Math.min(totalExpenses, 0))],
                    backgroundColor: ['#2ecc71', '#e74c3c'], // Green for incomes, Red for expenses
                }]
            };
    
            pieChart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            });
        }
