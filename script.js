document.addEventListener("DOMContentLoaded", function () {
    var expenseForm = document.getElementById("expense-form");
    var expenseList = document.getElementById("expense-list");
    var totalAmount = document.getElementById("total-amount");
    var filterCategory = document.getElementById("filter-category");

    var expenses = [];

    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = document.getElementById("expense-name").value;
        var amount = parseFloat(document.getElementById("expense-amount").value);
        var category = document.getElementById("expense-category").value;
        var date = document.getElementById("expense-date").value;

        var expense = {
            id: Date.now(),
            name: name,
            amount: amount,
            category: category,
            date: date
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalAmount();

        expenseForm.reset();
    });

    expenseList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            var id = parseInt(e.target.dataset.id);
            expenses = expenses.filter(function (expense) {
                return expense.id !== id;
            });

            displayExpenses(expenses);
            updateTotalAmount();
        }

        if (e.target.classList.contains("edit-btn")) {
            var id = parseInt(e.target.dataset.id);
            var expense = expenses.find(function (expense) {
                return expense.id === id;
            });

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            expenses = expenses.filter(function (expense) {
                return expense.id !== id;
            });

            displayExpenses(expenses);
            updateTotalAmount();
        }
    });

    filterCategory.addEventListener("change", function (e) {
        var category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            var filteredExpenses = expenses.filter(function (expense) {
                return expense.category === category;
            });
            displayExpenses(filteredExpenses);
        }
    });

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(function (expense) {
            var row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        var total = expenses.reduce(function (sum, expense) {
            return sum + expense.amount;
        }, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});
