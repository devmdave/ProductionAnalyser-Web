document.addEventListener('DOMContentLoaded', function() {
    // Function to generate random data for parameters
    function updateParameters() {
        const cycleTimeEl = document.getElementById('cycle-time');
        const faultDelayEl = document.getElementById('fault-delay');
        const tipDressEl = document.getElementById('tip-dress');
        const efficiencyEl = document.getElementById('efficiency');
        const downtimeEl = document.getElementById('downtime');
        const outputRateEl = document.getElementById('output-rate');
        const qualityScoreEl = document.getElementById('quality-score');
        const energyConsumptionEl = document.getElementById('energy-consumption');

        if (cycleTimeEl) cycleTimeEl.querySelector('span').textContent = (Math.random() * 10 + 5).toFixed(2);
        if (faultDelayEl) faultDelayEl.querySelector('span').textContent = (Math.random() * 5).toFixed(2);
        if (tipDressEl) tipDressEl.querySelector('span').textContent = (Math.random() * 100).toFixed(1);
        if (efficiencyEl) efficiencyEl.querySelector('span').textContent = (Math.random() * 20 + 80).toFixed(1);
        if (downtimeEl) downtimeEl.querySelector('span').textContent = (Math.random() * 10).toFixed(1);
        if (outputRateEl) outputRateEl.querySelector('span').textContent = (Math.random() * 50 + 100).toFixed(0);
        if (qualityScoreEl) qualityScoreEl.querySelector('span').textContent = (Math.random() * 10 + 90).toFixed(1);
        if (energyConsumptionEl) energyConsumptionEl.querySelector('span').textContent = (Math.random() * 20 + 50).toFixed(1);
    }

    try {
        // Initial update
         // Update parameters every 2 seconds
        setInterval(updateParameters, 3000);
        updateParameters();
    }catch (error) {
        console.error('Error updating parameters:', error);
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        });
    }

    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Theme toggle for mobile
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const sunIconMobile = document.getElementById('sun-icon-mobile');
    const moonIconMobile = document.getElementById('moon-icon-mobile');

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                sunIconMobile.classList.add('hidden');
                moonIconMobile.classList.remove('hidden');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                sunIconMobile.classList.remove('hidden');
                moonIconMobile.classList.add('hidden');
            }
        });
    }

    // Function to highlight maximum values in table columns
    function highlightMaxInColumns() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const tbody = table.querySelector('tbody');
            if (!tbody) return;

            const rows = tbody.querySelectorAll('tr');
            if (rows.length === 0) return;

            const numCols = rows[0].querySelectorAll('td').length;

            for (let colIndex = 0; colIndex < numCols; colIndex++) {
                let maxValue = -Infinity;
                let maxCell = null;

                rows.forEach(row => {
                    const cell = row.querySelectorAll('td')[colIndex];
                    if (cell) {
                        const text = cell.textContent.trim();
                        const numValue = parseFloat(text);
                        if (!isNaN(numValue) && numValue > maxValue) {
                            maxValue = numValue;
                            maxCell = cell;
                        }
                    }
                });

                if (maxCell) {
                    maxCell.classList.add('bg-red-500/40', 'text-red-900', 'font-bold', 'rounded');
                }
            }
        });
    }

    // Highlight max values after data updates
    setInterval(highlightMaxInColumns, 3000);
    highlightMaxInColumns(); // Initial call
});
