document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const terminalLog = document.getElementById('terminal-log');

    // Set initial theme
    document.body.classList.add(localStorage.getItem('theme') || 'light');
    themeSelect.value = localStorage.getItem('theme') || 'light';

    // Theme switcher
    themeSelect.addEventListener('change', () => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(themeSelect.value);
        localStorage.setItem('theme', themeSelect.value);
        log('Theme changed to ' + themeSelect.value);
    });

    // Logging function
    function log(message) {
        const p = document.createElement('p');
        p.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        terminalLog.appendChild(p);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    // Initial log message
    log('Production Analyser initialized.');

    // Example of updating a parameter
    function updateParameter(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            log(`Parameter ${id} updated to ${value}`);
        } else {
            log(`Element with id ${id} not found.`);
        }
    }

    // Simulate live data updates
    setInterval(() => {
        updateParameter('oee-value', (Math.random() * 100).toFixed(2) + '%');
        updateParameter('shift-a-prod-value', Math.floor(Math.random() * 5000));
        updateParameter('shift-b-prod-value', Math.floor(Math.random() * 4800));
        updateParameter('downtime-value', (Math.random() * 5).toFixed(2) + ' hours');
    }, 5000);
});