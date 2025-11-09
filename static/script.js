document.addEventListener('DOMContentLoaded', function() {
    // Function to create and update dashboard cards from /dashboard-data endpoint
    async function updateParameters() {
        try {
            const response = await fetch('/dashboard-data');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const container = document.getElementById('dashboard-cards');
            if (!container) return;

            // Clear existing cards
            container.innerHTML = '';

            // Define card configurations
            const cardConfigs = {
                cycleTime: { label: 'Cycle Time', unit: 's', decimals: 2 },
                faultDelay: { label: 'Fault Delay', unit: 's', decimals: 2 },
                tipDress: { label: 'Tip Dress', unit: '%', decimals: 1 },
                efficiency: { label: 'Efficiency', unit: '%', decimals: 1 },
                downtime: { label: 'Downtime', unit: 'min', decimals: 1 },
                outputRate: { label: 'Output Rate', unit: 'units/h', decimals: 0 },
                qualityScore: { label: 'Quality Score', unit: '/100', decimals: 1 },
                energyConsumption: { label: 'Energy Consumption', unit: 'kWh', decimals: 1 }
            };

            // Create cards for each key in data
            for (const [key, value] of Object.entries(data)) {
                if (cardConfigs[key] && value !== undefined) {
                    const config = cardConfigs[key];
                    const card = document.createElement('div');
                    card.className = 'flex flex-col gap-2 rounded-xl bg-[#2D3748] p-6 transition-all hover:bg-[#3b4754]';
                    card.id = key;
                    card.innerHTML = `
                        <p class="text-white/70 text-base font-medium leading-normal">
                        ${config.label}
                        </p>
                        <p class="text-white tracking-light text-4xl font-bold leading-tight">
                            ${value.toFixed(config.decimals)} ${config.unit}
                        </p>
                        <p class="flex items-center gap-1 text-[#E53E3E] text-sm font-medium leading-normal">
                            <span class="material-symbols-outlined text-base">
                                arrow_upward
                            </span
                            <span>+0.1s vs avg</span>
                        </p>
                    `;
                    container.appendChild(card);
                }
            }
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


{/* <div class="text-lg font-semibold text-gray-900 dark:text-white">${config.label}</div>
<div class="text-2xl font-bold text-gray-900 dark:text-white mt-2"><span>${value.toFixed(config.decimals)}</span> ${config.unit}</div> */}