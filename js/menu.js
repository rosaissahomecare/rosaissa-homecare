/**
 * ROSA ISSA HOME CARE - INTERAÇÕES DE SCROLL E NAVEGAÇÃO
 * Efeito de cabeçalho dinâmico, Scrollspy Desktop & Mobile, Voltar ao Topo e Scroll Suave
 */

document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('#header');
    const btnTopo = document.querySelector('#btn-topo');
    const desktopLinks = document.querySelectorAll('.menu-desktop .nav-link');
    const mobilePills = document.querySelectorAll('.mobile-horizontal-nav .mob-pill');
    const drawerLinks = document.querySelectorAll('.mobile-drawer-links .mobile-nav-link');
    const sections = document.querySelectorAll('main section[id], main #hero');

    // 1. Controle do Scroll no Header, Barra Mobile e Botão Topo
    const handleScroll = () => {
        const scrollTop = window.scrollY;

        // Cabeçalho dinâmico com blur e sombra
        if (scrollTop > 20) {
            navBar.classList.add('rolar');
            document.body.classList.add('has-scrolled');
        } else {
            navBar.classList.remove('rolar');
            document.body.classList.remove('has-scrolled');
        }

        // Visibilidade do botão Voltar ao Topo
        if (btnTopo) {
            if (scrollTop > 350) {
                btnTopo.classList.add('visivel');
            } else {
                btnTopo.classList.remove('visivel');
            }
        }

        // 2. Scrollspy Dinâmico (Desktop & Barra Horizontal Mobile)
        let currentSectionId = 'hero';
        const offsetThreshold = window.innerWidth <= 920 ? 140 : 110;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offsetThreshold;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || 'hero';
            }
        });

        // Atualizar links desktop
        desktopLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (
                (currentSectionId === 'hero' && (href === '#' || href === '#hero')) ||
                (href === `#${currentSectionId}`)
            ) {
                link.classList.add('active');
            }
        });

        // Atualizar pílulas horizontais mobile
        mobilePills.forEach(pill => {
            pill.classList.remove('active');
            const target = pill.getAttribute('data-target');
            const href = pill.getAttribute('href');
            if (
                (currentSectionId === 'hero' && (target === 'hero' || href === '#')) ||
                (target === currentSectionId || href === `#${currentSectionId}`)
            ) {
                pill.classList.add('active');
                
                // Centralizar a pílula ativa suavemente na rolagem horizontal
                if (window.innerWidth <= 920 && pill.parentElement) {
                    pill.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest'
                    });
                }
            }
        });

        // Atualizar links na gaveta mobile
        drawerLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (
                (currentSectionId === 'hero' && (href === '#' || href === '#hero')) ||
                (href === `#${currentSectionId}`)
            ) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executar uma vez no carregamento inicial

    // 3. Clique no botão Voltar ao Topo
    if (btnTopo) {
        btnTopo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Scroll suave compensando a altura do cabeçalho fixo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#hero') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const isMobile = window.innerWidth <= 920;
                const headerOffset = isMobile ? 120 : 85;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});