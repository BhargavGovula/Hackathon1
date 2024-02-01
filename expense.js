const categoryOptions = {
    bills: ["Rent", "Internet", "Insurance","Water","Electric","Phone","Gas"],
    essentials: ["Groceries", "Healthcare", "Education","Investments","Maintainance","Transport"],
    wants: ["Entertainment", "Dining Out", "Shopping","Trips","Selfcare"]
};

const expenses = [];

function updateCategories() {
    const selectedType = document.getElementById('expense-type').value;
    const categorySelect = document.getElementById('expense-category');
    categorySelect.innerHTML = '';

    categoryOptions[selectedType].forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase().replace(/\s+/g, '_');
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function addExpense() {
    const type = document.getElementById('expense-type').value;
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    if (isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    expenses.push({ type, description, amount, category });

    updateExpenseList();
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenses');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.type} - ${expense.description}: Rs${expense.amount.toFixed(2)} (${expense.category})`;
        expenseList.appendChild(listItem);
    });
}
updateCategories();
