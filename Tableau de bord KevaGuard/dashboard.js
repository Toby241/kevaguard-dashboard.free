document.addEventListener('DOMContentLoaded', () => {

    // (FR) Sélection des éléments du DOM
    // (PT) Seleção de elementos do DOM
    const mainContent = document.getElementById('main-content');
    const mainHeaderTitle = document.getElementById('main-header-title');
    const dashboardToggles = document.getElementById('dashboard-nav-toggles');
    const navLinks = document.querySelectorAll('aside nav a');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const sidebarToggleIcon = document.getElementById('sidebar-toggle-icon');
    const logoText = document.getElementById('sidebar-logo-text');
    const navTexts = document.querySelectorAll('.sidebar-nav-text');
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const toastClose = document.getElementById('toast-close');
    const settingsBtn = document.getElementById('settings-menu-btn');
    const settingsMenu = document.getElementById('settings-menu');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalBackdrop = document.getElementById('roulage-modal-backdrop');
    const modal = document.getElementById('roulage-modal');
    const step1 = document.getElementById('form-step-1');
    const step2 = document.getElementById('form-step-2');
    const step1NextBtn = document.getElementById('form-step-1-next');
    const step2PrevBtn = document.getElementById('form-step-2-prev');
    const roulageForm = document.getElementById('roulage-form');
    const kpiMainFilters = document.getElementById('kpi-main-filters');
    const kpiMainValue = document.getElementById('kpi-main-value');
    const kpiMainPercent = document.getElementById('kpi-main-percent');
    const mainChartFilters = document.getElementById('main-chart-filters');
    const mainChartLine = document.getElementById('main-chart-line');
    const mainChartFill = document.getElementById('main-chart-fill');
    const chartTooltip = document.getElementById('chart-tooltip');
    const tooltipDate = document.getElementById('tooltip-date');
    const tooltipValue = document.getElementById('tooltip-value');
    const seeAllSpeciesBtn = document.getElementById('see-all-species');
    const openAacModalBtn = document.getElementById('open-aac-modal-btn');
    const aacModal = document.getElementById('aac-modal');
    const aacModalBackdrop = document.getElementById('aac-modal-backdrop');
    const closeAacModalBtn = document.getElementById('close-aac-modal-btn');
    const closeAacModalBtnFooter = document.getElementById('close-aac-modal-btn-footer');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const docElement = document.documentElement;

    // (FR) État global de l'application
    // (PT) Estado global da aplicação
    let isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    let currentPage = 'dashboard';
    let currentChartData = { values: [], labels: [] }; // (FR) Données actuelles du graphique / (PT) Dados atuais do gráfico

    // =================================================================================
    // (FR) FONCTIONS UTILITAIRES
    // (PT) FUNÇÕES UTILITÁRIAS
    // =================================================================================

    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.remove('hidden', 'translate-x-full');
        toast.classList.add('translate-x-0');
        setTimeout(hideToast, 4000);
    }

    function hideToast() {
        toast.classList.add('translate-x-full');
        toast.classList.remove('translate-x-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }

    // =================================================================================
    // (FR) LOGIQUE DE L'INTERFACE UTILISATEUR (UI)
    // (PT) LÓGICA DA INTERFACE DO USUÁRIO (UI)
    // =================================================================================

    // (FR) Gère l'état (ouvert/fermé) de la barre latérale
    // (PT) Gerencia o estado (aberto/fechado) da barra lateral
    function setSidebarState(collapsed) {
        isSidebarCollapsed = collapsed;
        localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
        const targetWidth = collapsed ? '5rem' : '15rem';
        const targetIcon = collapsed ? 'chevron_right' : 'chevron_left';

        const tl = gsap.timeline();
        if (collapsed) {
            tl.to([navTexts, logoText], { opacity: 0, duration: 0.2, ease: "power2.in", onComplete: () => gsap.set([navTexts, logoText], { display: 'none' }) });
            tl.to(sidebar, { width: targetWidth, duration: 0.4, ease: "power3.inOut" }, "-=0.1");
        } else {
            tl.to(sidebar, { width: targetWidth, duration: 0.4, ease: "power3.inOut" });
            tl.set([navTexts, logoText], { display: 'inline' });
            tl.to([navTexts, logoText], { opacity: 1, duration: 0.2, ease: "power2.out", delay: 0.1 });
        }
        tl.to(mainContent, { marginLeft: targetWidth, duration: 0.4, ease: "power3.inOut" }, "<");
        sidebarToggleIcon.textContent = targetIcon;
    }

    // (FR) Gère la navigation entre les différentes sections de la page
    // (PT) Gerencia a navegação entre as diferentes seções da página
    function navigateToPage(pageId) {
        if (pageId === currentPage) return;

        const newPage = document.getElementById(`page-${pageId}`);
        if (!newPage) return;

        const oldPage = document.getElementById(`page-${currentPage}`);
        currentPage = pageId;

        const pageTitles = {
            dashboard: 'Tableau de Bord', suivie: 'Suivi d\'Exploitation', transport: 'Suivi de Transport',
            concessions: 'Concessions', inventaire: 'Inventaire Forestier', coupes: 'Registre des Coupes',
            documents: 'Documents Légaux', statistiques: 'Statistiques & Rapports', especies: 'Liste Complète de Essências'
        };
        mainHeaderTitle.textContent = pageTitles[pageId] || 'Dashboard';

        document.querySelectorAll('aside nav a').forEach(l => l.classList.remove('nav-active'));
        const activeLink = document.querySelector(`aside nav a[href="#${pageId}"]`);
        if (activeLink) activeLink.classList.add('nav-active');

        gsap.timeline({ onComplete: () => { if (oldPage) oldPage.style.display = 'none'; } })
            .to(oldPage, { opacity: 0, duration: 0.3, ease: "power2.in" })
            .set(newPage, { display: 'block', opacity: 0 })
            .to(newPage, { opacity: 1, duration: 0.3, ease: "power2.out" })
            .from(newPage.querySelectorAll(':scope > div, :scope > .grid > div'), { duration: 0.5, y: 20, stagger: 0.05, ease: "power2.out" }, "-=0.2");
    }

    // (FR) Gère le thème clair/sombre
    // (PT) Gerencia o tema claro/escuro
    function applyTheme(isDark) {
        themeToggleIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
        docElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // =================================================================================
    // (FR) LOGIQUE DES DONNÉES ET DES COMPOSANTS
    // (PT) LÓGICA DE DADOS E COMPONENTES
    // =================================================================================

    // --- (FR) KPI Principal ---
    // --- (PT) KPI Principal ---
    function updateMainKpi(data) {
        const { value, change, periodText } = data;
        gsap.to(kpiMainValue, { duration: 0.5, innerText: value, roundProps: "innerText", ease: "power2.out" });
        kpiMainPercent.innerHTML = `${change > 0 ? '+' : ''}${change.toFixed(1)}% <span class="text-gray-700 dark:text-gray-300 font-normal">vs. ${periodText} prec.</span>`;
        kpiMainPercent.className = `font-medium ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`;
    }
    
    async function fetchKpiData(period) {
        // (FR) TODO: Implémentez votre appel API ici.
        // (PT) TODO: Implemente sua chamada de API aqui.
        console.log(`(FR) Récupération des données KPI pour: ${period} / (PT) Buscando dados de KPI para: ${period}`);
        // (FR) Exemple de données de retour de l'API
        // (PT) Exemplo de dados de retorno da API
        const mockData = { value: Math.floor(Math.random() * 2000) + 4000, change: (Math.random() - 0.5) * 20, periodText: period };
        updateMainKpi(mockData);
    }

    // --- (FR) Graphique de Performance ---
    // --- (PT) Gráfico de Performance ---
    function generateSvgPath(dataPoints, viewboxHeight = 40, maxValue = 300) {
        if (!dataPoints || dataPoints.length === 0) return "M 0 40";
        const stepX = dataPoints.length > 1 ? 100 / (dataPoints.length - 1) : 0;
        let path = `M 0 ${(viewboxHeight - (dataPoints[0] / maxValue * viewboxHeight)).toFixed(1)}`;
        dataPoints.forEach((point, index) => {
            if (index > 0) {
                path += ` L ${(index * stepX).toFixed(1)} ${(viewboxHeight - (point / maxValue * viewboxHeight)).toFixed(1)}`;
            }
        });
        return path;
    }

    function updatePerformanceChart(data) {
        currentChartData = data; // (FR) Mettre à jour les données globales pour le tooltip / (PT) Atualiza os dados globais para o tooltip
        const { values, labels } = data;
        const linePath = generateSvgPath(values);
        const fillPath = `${linePath} V 40 H 0 Z`;

        gsap.to(mainChartLine, { duration: 0.7, attr: { d: linePath }, ease: "elastic.out(1, 0.75)" });
        gsap.to(mainChartFill, { duration: 0.7, attr: { d: fillPath }, ease: "elastic.out(1, 0.75)" });

        const labelsXContainer = document.getElementById('main-chart-labels-x');
        let labelsToShow = labels;
        if (labels.length > 12) { // (FR) Éviter la surcharge des étiquettes / (PT) Evitar sobrecarga de labels
            const skip = Math.ceil(labels.length / 10);
            labelsToShow = labels.filter((_, i) => i % skip === 0);
        }
        labelsXContainer.innerHTML = labelsToShow.map(label => `<span>${label}</span>`).join('');
        labelsXContainer.style.justifyContent = labelsToShow.length > 1 ? 'space-between' : 'center';
    }

    async function fetchChartData(period) {
        // (FR) TODO: Implémentez votre appel API pour obtenir les données du graphique.
        // (PT) TODO: Implemente sua chamada de API para obter os dados do gráfico.
        console.log(`(FR) Récupération des données du graphique pour: ${period} / (PT) Buscando dados do gráfico para: ${period}`);
        // (FR) Exemple de données de retour de l'API
        // (PT) Exemplo de dados de retorno da API
        const numPoints = { day: 1, week: 7, month: 30, 'half-year': 180, year: 365 }[period] || 30;
        const mockData = {
            values: Array.from({ length: numPoints }, () => Math.floor(Math.random() * 250) + 50),
            labels: Array.from({ length: numPoints }, (_, i) => `Label ${i + 1}`)
        };
        updatePerformanceChart(mockData);
    }
    
    // --- (FR) Modal "Nouveau Roulage" ---
    // --- (PT) Modal "Novo Roulage" ---
    function updateChargeInfo() {
        const checkedLogs = document.querySelectorAll('#log-selection-list input[type="checkbox"]:checked');
        let totalTroncs = checkedLogs.length;
        let totalVolume = 0;
        
        checkedLogs.forEach(cb => {
            totalVolume += parseFloat(cb.dataset.volume || 0);
        });

        document.getElementById('charge-troncs').value = totalTroncs;
        document.getElementById('charge-volume').value = totalVolume.toFixed(2);
    }


    // =================================================================================
    // (FR) INITIALISATION ET ÉCOUTEURS D'ÉVÉNEMENTS
    // (PT) INICIALIZAÇÃO E EVENT LISTENERS
    // =================================================================================
    
    function initialize() {
        // (FR) Initialise la barre latérale
        // (PT) Inicializa a barra lateral
        gsap.set(sidebar, { width: isSidebarCollapsed ? '5rem' : '15rem' });
        gsap.set(mainContent, { marginLeft: isSidebarCollapsed ? '5rem' : '15rem' });
        gsap.set([navTexts, logoText], { opacity: isSidebarCollapsed ? 0 : 1, display: isSidebarCollapsed ? 'none' : 'inline' });
        sidebarToggleIcon.textContent = isSidebarCollapsed ? 'chevron_right' : 'chevron_left';

        // (FR) Initialise le thème
        // (PT) Inicializa o tema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        applyTheme(storedTheme ? storedTheme === 'dark' : prefersDark);
        
        // (FR) Animation d'entrée de la page
        // (PT) Animação de entrada da página
        gsap.from("#page-dashboard .grid > div", { duration: 0.7, opacity: 0, y: 30, stagger: 0.1, ease: "power2.out", delay: 0.2 });

        // (FR) Charge les données initiales pour le tableau de bord
        // (PT) Carrega os dados iniciais para o dashboard
        fetchKpiData('month');
        fetchChartData('month');
    }

    // (FR) Écouteurs d'événements généraux
    // (PT) Event listeners gerais
    sidebarToggleBtn.addEventListener('click', () => setSidebarState(!isSidebarCollapsed));
    themeToggleBtn.addEventListener('click', () => applyTheme(!docElement.classList.contains('dark')));
    toastClose.addEventListener('click', hideToast);
    navLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); navigateToPage(link.getAttribute('href').substring(1)); }); });
    seeAllSpeciesBtn.addEventListener('click', (e) => { e.preventDefault(); navigateToPage('especies'); });
    if (dashboardToggles) { dashboardToggles.querySelectorAll('button').forEach(button => { button.addEventListener('click', () => navigateToPage(button.dataset.targetPage)); }); }

    // (FR) Écouteur pour le menu des paramètres
    // (PT) Event listener para o menu de configurações
    const menuTimeline = gsap.timeline({ paused: true, reversed: true })
        .to(settingsMenu, { duration: 0.3, opacity: 1, y: 0, ease: "power2.out", onStart: () => settingsMenu.classList.remove('hidden') })
        .eventCallback("onReverseComplete", () => settingsMenu.classList.add('hidden'));
    
    settingsBtn.addEventListener('click', (e) => { e.stopPropagation(); menuTimeline.reversed() ? menuTimeline.play() : menuTimeline.reverse(); });
    document.addEventListener('click', (e) => { if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) { menuTimeline.reverse(); } });

    // (FR) Écouteurs pour les filtres
    // (PT) Event listeners para os filtros
    kpiMainFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            kpiMainFilters.querySelectorAll('button').forEach(btn => btn.classList.remove('bg-white/90', 'text-blue-700', 'font-medium', 'shadow'));
            e.target.classList.add('bg-white/90', 'text-blue-700', 'font-medium', 'shadow');
            fetchKpiData(e.target.dataset.period);
        }
    });

    mainChartFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            mainChartFilters.querySelectorAll('button').forEach(btn => btn.classList.remove('bg-blue-600', 'text-white', 'font-medium'));
            e.target.classList.add('bg-blue-600', 'text-white', 'font-medium');
            fetchChartData(e.target.dataset.period);
        }
    });
    
    // (FR) Écouteurs pour le tooltip du graphique
    // (PT) Event listeners para o tooltip do gráfico
    document.getElementById('main-chart-svg-wrapper').addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const index = Math.min(Math.round(percent * (currentChartData.values.length - 1)), currentChartData.values.length - 1);
        
        if (index >= 0 && currentChartData.labels[index] && currentChartData.values[index] !== undefined) {
            tooltipDate.textContent = currentChartData.labels[index];
            tooltipValue.textContent = `${currentChartData.values[index]} m³`;
            gsap.set(chartTooltip, { display: 'block', x: e.clientX + 15, y: e.clientY + 15 });
        }
    });
    document.getElementById('main-chart-svg-wrapper').addEventListener('mouseleave', () => gsap.set(chartTooltip, { display: 'none' }));

    // (FR) Écouteurs pour les modaux
    // (PT) Event listeners para os modais
    openModalBtn.addEventListener('click', () => { modal.classList.remove('hidden'); modalBackdrop.classList.remove('hidden'); });
    closeModalBtn.addEventListener('click', () => { modal.classList.add('hidden'); modalBackdrop.classList.add('hidden'); });
    modalBackdrop.addEventListener('click', () => { modal.classList.add('hidden'); modalBackdrop.classList.add('hidden'); });
    
    step1NextBtn.addEventListener('click', () => { step1.classList.add('hidden'); step2.classList.remove('hidden'); });
    step2PrevBtn.addEventListener('click', () => { step2.classList.add('hidden'); step1.classList.remove('hidden'); });
    document.getElementById('log-selection-list').addEventListener('change', updateChargeInfo);
    roulageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.classList.add('hidden');
        modalBackdrop.classList.add('hidden');
        showToast('Bon de Roulage créé avec succès !');
        // (FR) TODO: Envoyer les données du formulaire à l'API
        // (PT) TODO: Enviar os dados do formulário para a API
    });
    
    openAacModalBtn.addEventListener('click', () => { aacModal.classList.remove('hidden'); aacModalBackdrop.classList.remove('hidden'); gsap.to([aacModal, aacModalBackdrop], { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }); });
    const closeAacModal = () => gsap.to([aacModal, aacModalBackdrop], { opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in', onComplete: () => { aacModal.classList.add('hidden'); aacModalBackdrop.classList.add('hidden'); } });
    closeAacModalBtn.addEventListener('click', closeAacModal);
    closeAacModalBtnFooter.addEventListener('click', closeAacModal);
    aacModalBackdrop.addEventListener('click', closeAacModal);

    // (FR) Démarrer l'application
    // (PT) Iniciar a aplicação
    initialize();
});