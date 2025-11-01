document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.remove('light');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Sidebar Toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', () => {
        sidebar.style.width = sidebar.style.width === '80px' ? '250px' : '80px';
    });

    // Sidebar Navigation
    function setActiveSidebarLink() {
        const path = window.location.pathname;
        const menu = document.getElementById('sidebar-menu');
        const links = menu.querySelectorAll('a');

        links.forEach(link => {
            const li = link.parentElement;
            if (link.getAttribute('href') === path) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }

    // Handle navigation clicks
    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') !== '#') {
            e.preventDefault();
            window.location.href = link.getAttribute('href');
        }
    });

    // Set the active link on page load
    setActiveSidebarLink();

    // Generic function to extract data from an HTML table
    function getTableData(tableId, dataColumnIndex) {
        const table = document.getElementById(tableId);
        if (!table) return [];
        const rows = table.querySelectorAll('tbody tr');
        const data = [];
        rows.forEach(row => {
            const cell = row.cells[dataColumnIndex];
            if (cell) {
                data.push(parseFloat(cell.textContent));
            }
        });
        return data;
    }
    
    function renderCycleTimeChart() {
        const ctx = document.getElementById('cycle-time-chart')?.getContext('2d');
        if (!ctx) return;

        const cycleTimes = getTableData('cycle-time-table', 2); // 2 is the index of 'Cycle_Time_Sec'
        if (cycleTimes.length === 0) return;

        // Create a histogram
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: cycleTimes.map((_, i) => i + 1),
                datasets: [{
                    label: 'Cycle Time (seconds)',
                    data: cycleTimes,
                    backgroundColor: '#2575fc'
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Part' } },
                    y: { title: { display: true, text: 'Cycle Time (s)' } }
                }
            }
        });
    }

    function renderTipDressChart() {
        const ctx = document.getElementById('tip-dress-chart')?.getContext('2d');
        if (!ctx) return;

        const tipLifeCycles = getTableData('tip-dress-table', 2); // 2 is the index of 'Tip_Life_Cycles'
        if (tipLifeCycles.length === 0) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: tipLifeCycles.map((_, i) => `Dress ${i + 1}`),
                datasets: [{
                    label: 'Tip Life (Cycles)',
                    data: tipLifeCycles,
                    borderColor: '#6a11cb',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Dress Count' } },
                    y: { title: { display: true, text: 'Cycles' } }
                }
            }
        });
    }

    // Render charts on the appropriate pages
    renderCycleTimeChart();
    renderTipDressChart();
});