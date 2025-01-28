// Gestion du menu mobile
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('#mobile-menu a');

// Gestion des sections
const navLinks = document.querySelectorAll('.nav-link');

// Fonction pour afficher une section
function showSection(sectionId) {
    // Cacher toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Écouteurs d'événements pour la navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
        
        // Mise à jour de l'URL
        history.pushState({}, '', `#${sectionId}`);
        
        // Fermer le menu mobile si ouvert
        if (mobileMenu.classList.contains('block')) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
    });
});

// Gestion du menu burger
burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('block');
});

// Fermer le menu mobile quand on clique sur un lien
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('block');
        mobileMenu.classList.add('hidden');
    });
});

// Gérer le chargement initial en fonction de l'URL
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'accueil';
    showSection(hash);
});
