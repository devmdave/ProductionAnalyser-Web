document.addEventListener('DOMContentLoaded', function() {
    // Function to update parameters from /dashboard-data endpoint
    async function updateParameters() {
        try {
            const response = await fetch('/dashboard-data');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const cycleTimeEl = document.getElementById('cycle-time');
            const faultDelayEl = document.getElementById('fault-delay');
            const tipDressEl = document.getElementById('tip-dress');
            const efficiencyEl = document.getElementById('efficiency');
            const downtimeEl = document.getElementById('downtime');
            const outputRateEl = document.getElementById('output-rate');
            const qualityScoreEl = document.getElementById('quality-score');
            const energyConsumptionEl = document.getElementById('energy-consumption');

            if (cycleTimeEl && data.cycleTime !== undefined) cycleTimeEl.querySelector('span').textContent = data.cycleTime.toFixed(2);
            if (faultDelayEl && data.faultDelay !== undefined) faultDelayEl.querySelector('span').textContent = data.faultDelay.toFixed(2);
            if (tipDressEl && data.tipDress !== undefined) tipDressEl.querySelector('span').textContent = data.tipDress.toFixed(1);
            if (efficiencyEl && data.efficiency !== undefined) efficiencyEl.querySelector('span').textContent = data.efficiency.toFixed(1);
            if (downtimeEl && data.downtime !== undefined) downtimeEl.querySelector('span').textContent = data.downtime.toFixed(1);
            if (outputRateEl && data.outputRate !== undefined) outputRateEl.querySelector('span').textContent = data.outputRate.toFixed(0);
            if (qualityScoreEl && data.qualityScore !== undefined) qualityScoreEl.querySelector('span').textContent = data.qualityScore.toFixed(1);
            if (energyConsumptionEl && data.energyConsumption !== undefined) energyConsumptionEl.querySelector('span').textContent = data.energyConsumption.toFixed(1);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }

    try {
        // Initial update
        updateParameters();
        // Update parameters every 1.5 seconds
        setInterval(updateParameters, 1500);
    } catch (error) {
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
        //Get the input element where user enters the threshold
        const input = document.getElementById('cycle-input');
        // Parse the value entered into a number
        const threshold = parseFloat(input.value);
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
                        else if (!isNaN(numValue) && numValue >= threshold && !isNaN(threshold)) {
                            cell.classList.add('bg-yellow-500/60', 'text-yellow-900', 'font-bold');
                        }
                    }
                });

                if (maxCell) {
                    maxCell.classList.add('bg-red-500/60', 'text-red-900', 'font-bold');
                }
            }
        });
    }

    highlightMaxInColumns(); // Initial call

    // CycleTime page specific: Highlight values above threshold
    const highlightBtn = document.getElementById('highlight-btn');
    highlightBtn.addEventListener('click', (e) => {
        // Prevent default form submission (in case inside a form)
        e.preventDefault();
        highlightMaxInColumns();
    })

});
