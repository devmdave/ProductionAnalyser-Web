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
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        body.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark');
            if (isDark) {
                body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        });
    }

    // Sidebar toggle functionality for all devices
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (menuToggle && sidebar && overlay) {
        console.log('Menu toggle elements found');
        menuToggle.addEventListener('click', () => {
            console.log('Menu toggle clicked');
            console.log('Sidebar classes before toggle:', sidebar.classList.value);
            sidebar.classList.toggle('-translate-x-full');
            console.log('Sidebar classes after toggle:', sidebar.classList.value);
            overlay.classList.toggle('hidden');
            menuToggle.classList.add('hidden');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
            menuToggle.classList.remove('hidden');
        });
    } else {
        console.log('Menu toggle elements not found:', { menuToggle, sidebar, overlay });
    }
});
