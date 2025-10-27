document.addEventListener('DOMContentLoaded', function() {
    // Function to generate random data for parameters
    function updateParameters() {
        document.getElementById('cycle-time').querySelector('span').textContent = (Math.random() * 10 + 5).toFixed(2);
        document.getElementById('fault-delay').querySelector('span').textContent = (Math.random() * 5).toFixed(2);
        document.getElementById('tip-dress').querySelector('span').textContent = (Math.random() * 100).toFixed(1);
        document.getElementById('efficiency').querySelector('span').textContent = (Math.random() * 20 + 80).toFixed(1);
        document.getElementById('downtime').querySelector('span').textContent = (Math.random() * 10).toFixed(1);
        document.getElementById('output-rate').querySelector('span').textContent = (Math.random() * 50 + 100).toFixed(0);
        document.getElementById('quality-score').querySelector('span').textContent = (Math.random() * 10 + 90).toFixed(1);
        document.getElementById('energy-consumption').querySelector('span').textContent = (Math.random() * 20 + 50).toFixed(1);
    }

    // Update parameters every 2 seconds
    setInterval(updateParameters, 3000);

    // Initial update
    updateParameters();
});
