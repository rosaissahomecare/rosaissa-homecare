/**
 * ROSA ISSA HOME CARE - MENU MOBILE MODERNO
 * Abertura, fechamento suave, acessibilidade e trava de scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnMenuMob = document.querySelector('#bnt-menu-mob');
    const menuMobile = document.querySelector('#menu-mobile');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .btn-mobile-whatsapp');
    const body = document.body;

    if (!btnMenuMob || !menuMobile) return;

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        const isOpen = menuMobile.classList.contains('abrir');
        
        btnMenuMob.classList.toggle('ativo');
        menuMobile.classList.toggle('abrir');
        body.classList.toggle('no-overflow');

        // Acessibilidade ARIA
        btnMenuMob.setAttribute('aria-expanded', !isOpen);
        menuMobile.setAttribute('aria-hidden', isOpen);
    };

    // Função para fechar o menu
    const closeMenu = () => {
        btnMenuMob.classList.remove('ativo');
        menuMobile.classList.remove('abrir');
        body.classList.remove('no-overflow');
        btnMenuMob.setAttribute('aria-expanded', 'false');
        menuMobile.setAttribute('aria-hidden', 'true');
    };

    // Evento de clique no botão hambúrguer
    btnMenuMob.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fechar ao clicar em qualquer item de navegação do menu mobile
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fechar ao pressionar a tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuMobile.classList.contains('abrir')) {
            closeMenu();
        }
    });

    // Fechar ao redimensionar a tela para desktop (> 920px)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 920 && menuMobile.classList.contains('abrir')) {
            closeMenu();
        }
    });
});