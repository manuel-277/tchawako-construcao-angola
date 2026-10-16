// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// ============================================
// HEADER SCROLL
// ============================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MENU MOBILE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// NAVEGAÇÃO ATIVA AO SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ANIMAÇÕES AO SCROLL (REVEAL)
// ============================================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 80) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// CONTADORES ANIMADOS
// ============================================
const contadores = document.querySelectorAll('.numero, .stat-number');
let contadoresAnimados = false;

const animarContadores = () => {
    if (contadoresAnimados) return;
    const contadoresSection = document.querySelector('.contadores');
    if (!contadoresSection) return;
    
    const sectionTop = contadoresSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        contadoresAnimados = true;
        contadores.forEach(contador => {
            const target = parseInt(contador.getAttribute('data-target'));
            if (!target) return;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    contador.textContent = Math.floor(current) + (contador.classList.contains('stat-number') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    contador.textContent = target + (contador.classList.contains('stat-number') ? '+' : '');
                }
            };
            updateCounter();
        });
    }
};
window.addEventListener('scroll', animarContadores);

// ============================================
// PARTÍCULAS NO HERO
// ============================================
const particlesContainer = document.getElementById('particles');
const criarParticulas = () => {
    if (!particlesContainer) return;
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 80 + 30;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
        particlesContainer.appendChild(particle);
    }
};
criarParticulas();

// ============================================
// FILTROS DO PORTFÓLIO
// ============================================
const filtroBtns = document.querySelectorAll('.filtro-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filtroBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => { item.style.display = 'none'; }, 300);
            }
        });
    });
});

// ============================================
// LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
function openLightbox(element) {
    const img = element.querySelector('img');
    const categoria = element.querySelector('.categoria')?.textContent || 'Obra';
    const titulo = element.querySelector('h3')?.textContent || 'Título';
    const descricao = element.querySelector('p')?.textContent || 'Descrição';

    document.getElementById('lightboxImage').style.backgroundImage = `url(${img.src})`;
    document.getElementById('lightboxCategoria').textContent = categoria;
    document.getElementById('lightboxTitulo').textContent = titulo;
    document.getElementById('lightboxDescricao').textContent = descricao;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// ============================================
// FORMULÁRIO
// ============================================
const formOrcamento = document.getElementById('formOrcamento');
if (formOrcamento) {
    formOrcamento.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = formOrcamento.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!';
            btn.style.background = '#25D366';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                formOrcamento.reset();
                alert('Obrigado pelo seu contacto! Entraremos em contacto consigo brevemente.');
            }, 2000);
        }, 1500);
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS ÂNCORA
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}