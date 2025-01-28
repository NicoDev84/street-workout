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

// Gestion des exercices
const exerciseFilters = document.querySelectorAll('.exercise-filter');
const exerciseCards = document.querySelectorAll('.exercise-card');
const exerciseDetails = document.querySelectorAll('.exercise-details');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

// Filtrage des exercices
function filterExercises(level) {
    exerciseCards.forEach(card => {
        if (level === 'all' || card.dataset.level === level) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Gestion des filtres
exerciseFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Retirer la classe active de tous les filtres
        exerciseFilters.forEach(f => f.classList.remove('bg-blue-600'));
        exerciseFilters.forEach(f => f.classList.add('bg-gray-700'));
        
        // Ajouter la classe active au filtre sélectionné
        filter.classList.remove('bg-gray-700');
        filter.classList.add('bg-blue-600');
        
        // Filtrer les exercices
        filterExercises(filter.dataset.level);
    });
});

// Gestion de la modal
function openModal(exerciseId) {
    const exercise = exercises[exerciseId];
    if (!exercise) return;

    modalContent.innerHTML = `
        <div class="p-6">
            <h2 class="text-2xl font-bold text-white mb-4">${exercise.name}</h2>
            <div class="mb-6">
                <img src="${exercise.image}" alt="${exercise.name}" class="w-full h-64 object-cover rounded-lg mb-4">
                <span class="inline-block ${exercise.levelClass} text-white px-3 py-1 rounded-full text-sm mb-4">${exercise.level}</span>
            </div>
            <div class="space-y-4">
                <div>
                    <h3 class="text-xl font-bold text-white mb-2">Description</h3>
                    <p class="text-gray-300">${exercise.description}</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-white mb-2">Technique</h3>
                    <ul class="list-disc list-inside text-gray-300">
                        ${exercise.technique.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-white mb-2">Muscles travaillés</h3>
                    <div class="flex flex-wrap gap-2">
                        ${exercise.muscles.map(muscle => 
                            `<span class="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">${muscle}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
}

// Fermer la modal avec le bouton ou en cliquant en dehors
modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Base de données des exercices
const exercises = {
    'pushups': {
        name: 'Push-ups',
        level: 'Débutant',
        levelClass: 'bg-blue-600',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
        description: 'Les pompes sont un exercice fondamental pour développer la force du haut du corps et la stabilité du tronc.',
        technique: [
            'Placez vos mains légèrement plus larges que les épaules',
            'Gardez le corps droit comme une planche',
            'Descendez en pliant les coudes à 90 degrés',
            'Poussez pour revenir à la position initiale'
        ],
        muscles: ['Pectoraux', 'Triceps', 'Épaules', 'Core']
    },
    'pullups': {
        name: 'Pull-ups',
        level: 'Intermédiaire',
        levelClass: 'bg-yellow-600',
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
        description: 'Les tractions sont l\'un des meilleurs exercices pour développer la force du dos et des bras.',
        technique: [
            'Saisissez la barre avec une prise pronation',
            'Partez bras tendus, épaules engagées',
            'Tirez jusqu\'à ce que votre menton dépasse la barre',
            'Descendez de manière contrôlée'
        ],
        muscles: ['Dos', 'Biceps', 'Avant-bras', 'Core']
    },
    'muscleup': {
        name: 'Muscle Up',
        level: 'Avancé',
        levelClass: 'bg-red-600',
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
        description: 'Le muscle up est un mouvement avancé qui combine une traction explosive avec une transition vers un dip.',
        technique: [
            'Commencez par une prise faux grip',
            'Effectuez une traction explosive',
            'Basculez les poignets au-dessus de la barre',
            'Terminez avec un dip'
        ],
        muscles: ['Dos', 'Pectoraux', 'Triceps', 'Épaules', 'Core']
    }
};

// Base de données des programmes
const programs = {
    'debutant': {
        name: 'Programme Fondation',
        level: 'Débutant',
        price: '29€/mois',
        description: 'Idéal pour débuter dans le street workout de manière progressive et sûre. Ce programme vous permettra d\'acquérir les bases essentielles et de développer votre force de manière durable.',
        includes: [
            'Évaluation initiale de votre niveau',
            'Programme d\'entraînement personnalisé',
            'Vidéos explicatives pour chaque exercice',
            'Suivi des progrès mensuel',
            'Support par email sous 24h',
            'Accès à notre communauté privée'
        ],
        schedule: [
            'Semaine 1-4: Fondamentaux et technique',
            'Semaine 5-8: Développement de la force',
            'Semaine 9-12: Introduction aux figures basiques'
        ],
        bonus: [
            'Guide nutritionnel de base',
            'Accès aux tutoriels vidéo',
            'Programme de mobilité'
        ]
    },
    'intermediaire': {
        name: 'Programme Performance',
        level: 'Intermédiaire',
        price: '49€/mois',
        description: 'Conçu pour ceux qui maîtrisent déjà les bases et souhaitent passer à l\'étape supérieure. Ce programme vous aidera à développer des compétences avancées et à perfectionner votre technique.',
        includes: [
            'Évaluation approfondie de vos capacités',
            'Programme personnalisé avancé',
            'Suivi hebdomadaire des progrès',
            'Support prioritaire par email et téléphone',
            'Accès aux workshops en ligne mensuels',
            'Plan nutritionnel personnalisé'
        ],
        schedule: [
            'Semaine 1-4: Renforcement avancé',
            'Semaine 5-8: Figures dynamiques',
            'Semaine 9-12: Combinaisons complexes'
        ],
        bonus: [
            'Plan nutritionnel détaillé',
            'Séances de Q&R en direct',
            'Analyse vidéo de votre technique'
        ]
    },
    'elite': {
        name: 'Programme Elite',
        level: 'Elite',
        price: '89€/mois',
        description: 'Notre programme le plus complet pour les athlètes déterminés à atteindre l\'excellence. Coaching personnalisé et suivi quotidien pour des résultats exceptionnels.',
        includes: [
            'Évaluation complète et définition d\'objectifs',
            'Programme sur mesure avec ajustements hebdomadaires',
            'Sessions privées mensuelles en visio',
            'Suivi quotidien de vos progrès',
            'Support prioritaire 24/7',
            'Accès VIP à tous nos workshops'
        ],
        schedule: [
            'Planning personnalisé selon vos objectifs',
            'Sessions techniques avancées',
            'Préparation aux compétitions'
        ],
        bonus: [
            'Plan nutritionnel expert',
            'Accès illimité aux workshops',
            'Analyse biomécanique',
            'Support mental et motivation'
        ]
    }
};

// Gestion de la modal des programmes
const programModal = document.getElementById('program-modal');
const programModalContent = document.getElementById('program-modal-content');
const programModalClose = document.getElementById('program-modal-close');

function showProgramDetails(programId) {
    const program = programs[programId];
    if (!program) return;

    programModalContent.innerHTML = `
        <div class="space-y-6">
            <div class="border-b border-gray-700 pb-6">
                <h2 class="text-3xl font-bold text-white mb-2">${program.name}</h2>
                <div class="flex items-center gap-4">
                    <span class="text-2xl font-bold text-white">${program.price}</span>
                    <span class="bg-${programId === 'debutant' ? 'blue' : programId === 'intermediaire' ? 'yellow' : 'red'}-600 text-white px-3 py-1 rounded-full text-sm">${program.level}</span>
                </div>
            </div>
            
            <div>
                <p class="text-gray-300 text-lg leading-relaxed">${program.description}</p>
            </div>

            <div>
                <h3 class="text-xl font-bold text-white mb-4">Ce qui est inclus :</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${program.includes.map(item => `
                        <li class="flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1"></i>
                            <span class="text-gray-300">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-bold text-white mb-4">Planning du programme :</h3>
                <ul class="space-y-3">
                    ${program.schedule.map(item => `
                        <li class="flex items-start">
                            <i class="fas fa-calendar text-blue-500 mr-2 mt-1"></i>
                            <span class="text-gray-300">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-bold text-white mb-4">Bonus inclus :</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${program.bonus.map(item => `
                        <li class="flex items-start">
                            <i class="fas fa-gift text-purple-500 mr-2 mt-1"></i>
                            <span class="text-gray-300">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="pt-6 border-t border-gray-700">
                <button class="w-full bg-${programId === 'debutant' ? 'blue' : programId === 'intermediaire' ? 'yellow' : 'red'}-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-${programId === 'debutant' ? 'blue' : programId === 'intermediaire' ? 'yellow' : 'red'}-700 transition-colors">
                    Commencer maintenant
                </button>
            </div>
        </div>
    `;
    programModal.classList.remove('hidden');
}

function closeProgramModal() {
    programModal.classList.add('hidden');
}

// Event listeners pour la modal des programmes
programModalClose?.addEventListener('click', closeProgramModal);
programModal?.addEventListener('click', (e) => {
    if (e.target === programModal) {
        closeProgramModal();
    }
});
