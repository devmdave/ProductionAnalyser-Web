document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;
    const themeIcon = themeToggleButton.querySelector('i');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const overlay = document.querySelector('.overlay');

    // --- THEME SWITCHER --- //
    function setIcon() {
        if (body.classList.contains('dark')) {
            themeIcon.setAttribute('data-feather', 'sun');
        } else {
            themeIcon.setAttribute('data-feather', 'moon');
        }
        feather.replace();
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark');
        body.classList.toggle('light');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
        setIcon();
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme);
    setIcon();

    // --- SIDEBAR LOGIC --- //
    function toggleSidebar() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        }
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // --- SIDEBAR NAVIGATION (UNCHANGED) --- //
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

    const sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') !== '#') {
            e.preventDefault();
            window.location.href = link.getAttribute('href');
        }
    });

    setActiveSidebarLink();

    // --- CHART RENDERING (UNCHANGED) --- //
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
        const cycleTimes = getTableData('cycle-time-table', 2);
        if (cycleTimes.length === 0) return;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: cycleTimes.map((_, i) => i + 1),
                datasets: [{ label: 'Cycle Time (seconds)', data: cycleTimes, backgroundColor: '#2575fc' }]
            },
            options: { scales: { x: { title: { display: true, text: 'Part' } }, y: { title: { display: true, text: 'Cycle Time (s)' } } } }
        });
    }

    function renderTipDressChart() {
        const ctx = document.getElementById('tip-dress-chart')?.getContext('2d');
        if (!ctx) return;
        const tipLifeCycles = getTableData('tip-dress-table', 2);
        if (tipLifeCycles.length === 0) return;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: tipLifeCycles.map((_, i) => `Dress ${i + 1}`),
                datasets: [{ label: 'Tip Life (Cycles)', data: tipLifeCycles, borderColor: '#6a11cb', tension: 0.1 }]
            },
            options: { scales: { x: { title: { display: true, text: 'Dress Count' } }, y: { title: { display: true, text: 'Cycles' } } } }
        });
    }

    renderCycleTimeChart();
    renderTipDressChart();
});