let transactions = [];
    let dailyTotals = [0, 0, 0, 0, 0, 0, 0]; // Monday to Sunday

    // DOM Elements
    const incomeEl = document.getElementById('total-income');
    const expensesEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');
    const columns = document.querySelectorAll('.column');

    // Add Transaction
    document.getElementById('transaction-form').addEventListener('submit', function(e) {
      e.preventDefault();

      const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value.trim();
      const date = document.getElementById('date').value;

      if (!amount || amount <= 0 || !category || !date) {
        alert('Please enter valid transaction details.');
        return;
      }

      const dayIndex = new Date(date).getDay();
      transactions.push({ type, amount, category, date, dayIndex });

      updateDashboard();
      updateColumnChart();
      document.getElementById('transaction-form').reset();
    });

    // Update Dashboard
    function updateDashboard() {
      const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const balance = income - expenses;

      incomeEl.textContent = `$${income.toFixed(2)}`;
      expensesEl.textContent = `$${expenses.toFixed(2)}`;
      balanceEl.textContent = `$${balance.toFixed(2)}`;
    }

    // Update Weekly Column Chart
    function updateColumnChart() {
      dailyTotals = [0, 0, 0, 0, 0, 0, 0]; // Reset

      transactions.forEach(t => {
        dailyTotals[t.dayIndex] += t.type === 'expense' ? t.amount : 0;
      });

      columns.forEach((column, index) => {
        const value = dailyTotals[index];
        const bar = column.querySelector('.bar');
        const valueEl = column.querySelector('.value');

        bar.style.height = `${Math.min(value / 10, 400)}px`;
        valueEl.textContent = `$${value}`;

        if (value > 0) {
          bar.style.backgroundColor = '#dc3545'; // Red for expenses
        } else {
          bar.style.backgroundColor = '#28a745'; // Green for income
        }
      });
    }

    // Initialize the chart and dashboard
    function init() {
      transactions = [];

      updateDashboard();
      updateColumnChart();
    }

    init();