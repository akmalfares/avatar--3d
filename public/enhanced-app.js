// Enhanced Coptic Orthodox Website - Main Application
class CopticWebsiteApp {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.userPreferences = this.loadUserPreferences();
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.initializeNavigation();
        this.initializeVirtualTours();
        this.initializeAvatarSystem();
        this.initializeGames();
        this.setupResponsiveDesign();
        this.loadUserData();
        
        // Initialize subsystems
        if (typeof CopticChatSystem !== 'undefined') {
            window.copticChat = new CopticChatSystem();
        }
        
        console.log('🏛️ موقع الكنيسة القبطية الأرثوذكسية جاهز!');
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('DOMContentLoaded', () => {
            this.showSection('home');
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.showSection(section);
                this.updateActiveNavLink(link);
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Update URL without page reload
            history.pushState({ section: sectionId }, '', `#${sectionId}`);
            
            // Initialize section-specific functionality
            this.initializeSectionContent(sectionId);
            
            // Update page title
            this.updatePageTitle(sectionId);
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updatePageTitle(sectionId) {
        const titles = {
            'home': 'الكنيسة القبطية الأرثوذكسية - الرئيسية',
            'virtual-tours': 'الزيارات الافتراضية - الكنيسة القبطية',
            'library': 'المكتبة الرقمية - الكنيسة القبطية',
            'qa': 'أسئلة وأجوبة - الكنيسة القبطية',
            'avatar': 'إنشاء Avatar - الكنيسة القبطية',
            'chat': 'المحادثات - الكنيسة القبطية',
            'games': 'الألعاب التفاعلية - الكنيسة القبطية'
        };
        
        document.title = titles[sectionId] || 'الكنيسة القبطية الأرثوذكسية';
    }

    initializeSectionContent(sectionId) {
        switch (sectionId) {
            case 'library':
                if (window.copticLibrary) {
                    window.copticLibrary.renderLibraryInterface();
                }
                break;
            case 'qa':
                if (window.copticQA) {
                    window.copticQA.renderQAInterface();
                }
                break;
            case 'chat':
                if (window.copticChat) {
                    window.copticChat.renderChatInterface();
                }
                break;
            case 'games':
                this.initializeGamesSection();
                break;
            case 'avatar':
                this.initializeAvatarSection();
                break;
            case 'virtual-tours':
                this.initializeVirtualToursSection();
                break;
        }
    }

    // Virtual Tours System
    initializeVirtualTours() {
        this.virtualTours = {
            'hanging-church': {
                title: 'كنيسة السيدة العذراء المعلقة',
                description: 'أقدم كنيسة معلقة في مصر القديمة',
                url: 'https://www.360cities.net/image/hanging-church-3-cairo',
                type: '360cities',
                duration: '15-20 دقيقة',
                highlights: [
                    'الهيكل الرئيسي والمذبح',
                    'الأيقونات التاريخية',
                    'المنبر الرخامي',
                    'الأعمدة الأثرية'
                ]
            },
            'st-anthony': {
                title: 'دير الأنبا أنطونيوس',
                description: 'أقدم دير في العالم - أبو الرهبان',
                url: 'https://stantony.net/virtual-tour/',
                type: 'custom',
                duration: '25-30 دقيقة',
                highlights: [
                    'كنيسة الأنبا أنطونيوس',
                    'مغارة القديس',
                    'المتحف الأثري',
                    'حديقة الدير'
                ]
            },
            'abu-serga': {
                title: 'كنيسة أبو سرجة',
                description: 'مكان إقامة العائلة المقدسة',
                url: '#',
                type: 'images',
                duration: '10-15 دقيقة',
                highlights: [
                    'المغارة المقدسة',
                    'بئر العائلة المقدسة',
                    'الكنيسة العلوية',
                    'الأيقونات النادرة'
                ]
            }
        };
    }

    openVirtualTour(tourId) {
        const tour = this.virtualTours[tourId];
        if (!tour) return;

        const modal = document.getElementById('tourModal');
        const title = document.getElementById('tourTitle');
        const viewer = document.getElementById('tourViewer');

        title.textContent = tour.title;
        modal.style.display = 'flex';

        // Show loading
        viewer.innerHTML = `
            <div class="tour-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>جاري تحميل ${tour.title}...</p>
            </div>
        `;

        // Load tour content based on type
        setTimeout(() => {
            this.loadTourContent(viewer, tour);
        }, 1000);
    }

    loadTourContent(viewer, tour) {
        switch (tour.type) {
            case '360cities':
                viewer.innerHTML = `
                    <div class="tour-360">
                        <iframe src="${tour.url}" 
                                width="100%" 
                                height="100%" 
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                    </div>
                    <div class="tour-info">
                        <h4>${tour.title}</h4>
                        <p>${tour.description}</p>
                        <div class="tour-highlights">
                            <h5>أهم المعالم:</h5>
                            <ul>
                                ${tour.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                break;
            case 'custom':
                viewer.innerHTML = `
                    <div class="tour-custom">
                        <iframe src="${tour.url}" 
                                width="100%" 
                                height="100%" 
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                    </div>
                `;
                break;
            case 'images':
                viewer.innerHTML = `
                    <div class="tour-gallery">
                        <div class="gallery-main">
                            <img src="/api/placeholder/800/600" alt="${tour.title}" id="mainImage">
                        </div>
                        <div class="gallery-thumbnails">
                            ${tour.highlights.map((highlight, index) => `
                                <div class="thumbnail" onclick="copticApp.changeTourImage(${index})">
                                    <img src="/api/placeholder/150/100" alt="${highlight}">
                                    <span>${highlight}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
        }
    }

    changeTourImage(index) {
        const mainImage = document.getElementById('mainImage');
        if (mainImage) {
            mainImage.src = `/api/placeholder/800/600?random=${index}`;
        }
    }

    closeTourModal() {
        const modal = document.getElementById('tourModal');
        modal.style.display = 'none';
    }

    // Avatar System
    initializeAvatarSystem() {
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');
        const cameraBtn = document.getElementById('cameraBtn');
        const generateBtn = document.getElementById('generateAvatar');
        const downloadBtn = document.getElementById('downloadAvatar');

        if (uploadArea && imageInput) {
            // Drag and drop functionality
            uploadArea.addEventListener('click', () => imageInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleImageUpload(files[0]);
                }
            });

            imageInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleImageUpload(e.target.files[0]);
                }
            });
        }

        if (cameraBtn) {
            cameraBtn.addEventListener('click', () => this.openCamera());
        }

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateAvatar());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadAvatar());
        }
    }

    handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('يرجى اختيار ملف صورة صالح', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.displayImagePreview(e.target.result);
            this.enableAvatarGeneration();
        };
        reader.readAsDataURL(file);
    }

    displayImagePreview(imageSrc) {
        const previewContainer = document.getElementById('previewContainer');
        if (previewContainer) {
            previewContainer.innerHTML = `
                <div class="image-preview">
                    <img src="${imageSrc}" alt="صورة المعاينة" id="previewImage">
                    <div class="preview-overlay">
                        <i class="fas fa-check-circle"></i>
                        <p>جاهز لإنشاء Avatar</p>
                    </div>
                </div>
            `;
        }
    }

    enableAvatarGeneration() {
        const generateBtn = document.getElementById('generateAvatar');
        const customizeBtn = document.getElementById('customizeAvatar');
        
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.classList.add('enabled');
        }
        
        if (customizeBtn) {
            customizeBtn.disabled = false;
        }
    }

    openCamera() {
        const modal = document.getElementById('cameraModal');
        const video = document.getElementById('cameraVideo');
        
        modal.style.display = 'flex';
        
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                this.currentStream = stream;
            })
            .catch(err => {
                console.error('خطأ في الوصول للكاميرا:', err);
                this.showNotification('لا يمكن الوصول للكاميرا', 'error');
                this.closeCameraModal();
            });
    }

    closeCameraModal() {
        const modal = document.getElementById('cameraModal');
        modal.style.display = 'none';
        
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
        }
    }

    capturePhoto() {
        const video = document.getElementById('cameraVideo');
        const canvas = document.getElementById('cameraCanvas');
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/png');
        this.displayImagePreview(imageData);
        this.enableAvatarGeneration();
        this.closeCameraModal();
    }

    generateAvatar() {
        const progressContainer = document.getElementById('avatarProgress');
        const generateBtn = document.getElementById('generateAvatar');
        
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإنشاء...';
        }
        
        // Simulate avatar generation process
        this.simulateAvatarGeneration();
    }

    simulateAvatarGeneration() {
        const steps = [
            'تحليل الصورة...',
            'إنشاء النموذج ثلاثي الأبعاد...',
            'تطبيق التحسينات...',
            'إضافة التفاصيل...',
            'اكتمل الإنشاء!'
        ];
        
        let currentStep = 0;
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('#avatarProgress p');
        
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                const progress = ((currentStep + 1) / steps.length) * 100;
                if (progressFill) {
                    progressFill.style.width = `${progress}%`;
                }
                if (progressText) {
                    progressText.textContent = steps[currentStep];
                }
                currentStep++;
            } else {
                clearInterval(interval);
                this.completeAvatarGeneration();
            }
        }, 1500);
    }

    completeAvatarGeneration() {
        const previewContainer = document.getElementById('previewContainer');
        const progressContainer = document.getElementById('avatarProgress');
        const generateBtn = document.getElementById('generateAvatar');
        const downloadBtn = document.getElementById('downloadAvatar');
        
        if (previewContainer) {
            previewContainer.innerHTML = `
                <div class="avatar-result">
                    <div class="avatar-3d">
                        <div class="avatar-model">
                            <i class="fas fa-user-astronaut"></i>
                        </div>
                        <div class="avatar-controls-3d">
                            <button class="control-btn" onclick="copticApp.rotateAvatar('left')">
                                <i class="fas fa-undo"></i>
                            </button>
                            <button class="control-btn" onclick="copticApp.rotateAvatar('right')">
                                <i class="fas fa-redo"></i>
                            </button>
                        </div>
                    </div>
                    <div class="avatar-info">
                        <h4>تم إنشاء Avatar بنجاح!</h4>
                        <p>يمكنك الآن تخصيصه أو تحميله</p>
                    </div>
                </div>
            `;
        }
        
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
        
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-sync"></i> إعادة الإنشاء';
        }
        
        if (downloadBtn) {
            downloadBtn.disabled = false;
        }
        
        this.showNotification('تم إنشاء Avatar بنجاح!', 'success');
    }

    rotateAvatar(direction) {
        const avatarModel = document.querySelector('.avatar-model');
        if (avatarModel) {
            const currentRotation = avatarModel.style.transform || 'rotateY(0deg)';
            const currentAngle = parseInt(currentRotation.match(/rotateY\((-?\d+)deg\)/)?.[1] || 0);
            const newAngle = direction === 'left' ? currentAngle - 45 : currentAngle + 45;
            avatarModel.style.transform = `rotateY(${newAngle}deg)`;
        }
    }

    downloadAvatar() {
        // Simulate download
        this.showNotification('جاري تحضير التحميل...', 'info');
        
        setTimeout(() => {
            // Create a dummy download
            const link = document.createElement('a');
            link.href = '/api/placeholder/512/512';
            link.download = 'my-avatar.png';
            link.click();
            
            this.showNotification('تم تحميل Avatar بنجاح!', 'success');
        }, 2000);
    }

    // Games System
    initializeGames() {
        this.games = {
            apostolic: [
                {
                    id: 'mark-journey',
                    title: 'رحلة القديس مرقس',
                    description: 'تابع رحلة القديس مرقس في نشر المسيحية',
                    type: 'adventure',
                    difficulty: 'سهل',
                    duration: '15 دقيقة'
                }
            ],
            persecution: [
                {
                    id: 'martyrs-courage',
                    title: 'شجاعة الشهداء',
                    description: 'اختبر قوة إيمان الشهداء في مواجهة الاضطهاد',
                    type: 'story',
                    difficulty: 'متوسط',
                    duration: '20 دقيقة'
                }
            ],
            golden: [
                {
                    id: 'desert-fathers',
                    title: 'آباء البرية',
                    description: 'تعلم من حكمة آباء البرية وتعاليمهم',
                    type: 'wisdom',
                    difficulty: 'متقدم',
                    duration: '25 دقيقة'
                }
            ]
        };
    }

    initializeGamesSection() {
        const eraButtons = document.querySelectorAll('.era-btn');
        const gamesGrid = document.getElementById('gamesGrid');
        
        eraButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                eraButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const era = btn.dataset.era;
                this.displayGames(era);
            });
        });
        
        // Display all games initially
        this.displayGames('all');
    }

    displayGames(era) {
        const gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;
        
        let gamesToShow = [];
        
        if (era === 'all') {
            Object.values(this.games).forEach(eraGames => {
                gamesToShow = gamesToShow.concat(eraGames);
            });
        } else if (this.games[era]) {
            gamesToShow = this.games[era];
        }
        
        if (gamesToShow.length === 0) {
            gamesGrid.innerHTML = `
                <div class="no-games">
                    <i class="fas fa-gamepad"></i>
                    <h3>قريباً...</h3>
                    <p>ألعاب هذا العصر قيد التطوير</p>
                </div>
            `;
            return;
        }
        
        gamesGrid.innerHTML = gamesToShow.map(game => `
            <div class="game-card" onclick="copticApp.playGame('${game.id}')">
                <div class="game-icon">
                    <i class="fas fa-${this.getGameIcon(game.type)}"></i>
                </div>
                <div class="game-content">
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                    <div class="game-meta">
                        <span class="game-type">${game.type}</span>
                        <span class="game-difficulty">${game.difficulty}</span>
                        <span class="game-duration">${game.duration}</span>
                    </div>
                </div>
                <div class="game-play-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        `).join('');
    }

    getGameIcon(type) {
        const icons = {
            adventure: 'map',
            story: 'book-open',
            wisdom: 'lightbulb',
            puzzle: 'puzzle-piece',
            quiz: 'question-circle'
        };
        return icons[type] || 'gamepad';
    }

    playGame(gameId) {
        this.showNotification('جاري تحميل اللعبة...', 'info');
        
        // Simulate game loading
        setTimeout(() => {
            this.showNotification('اللعبة قيد التطوير - قريباً!', 'info');
        }, 1500);
    }

    // Utility Functions
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Stop camera stream if active
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
        }
    }

    handleResize() {
        // Handle responsive design adjustments
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            this.adjustForMobile();
        } else {
            // Desktop-specific adjustments
            this.adjustForDesktop();
        }
    }

    adjustForMobile() {
        // Mobile optimizations
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }

    adjustForDesktop() {
        // Desktop optimizations
        const hamburger = document.querySelector('.hamburger');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
        }
    }

    setupResponsiveDesign() {
        // Initial responsive setup
        this.handleResize();
        
        // Add touch support for mobile
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#4299e1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-weight: 600;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('coptic_website_preferences');
        return saved ? JSON.parse(saved) : {
            theme: 'light',
            language: 'ar',
            notifications: true,
            autoplay: true
        };
    }

    saveUserPreferences() {
        localStorage.setItem('coptic_website_preferences', JSON.stringify(this.userPreferences));
    }

    loadUserData() {
        // Load user-specific data
        const userData = localStorage.getItem('coptic_website_user_data');
        if (userData) {
            this.userData = JSON.parse(userData);
        } else {
            this.userData = {
                visitCount: 0,
                lastVisit: null,
                completedTours: [],
                createdAvatars: 0,
                gameProgress: {}
            };
        }
        
        this.userData.visitCount++;
        this.userData.lastVisit = new Date().toISOString();
        this.saveUserData();
    }

    saveUserData() {
        localStorage.setItem('coptic_website_user_data', JSON.stringify(this.userData));
    }

    // API Integration placeholder
    async callAPI(endpoint, data = null) {
        try {
            const options = {
                method: data ? 'POST' : 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await fetch(`/api/${endpoint}`, options);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

// Global functions for HTML onclick events
function showSection(sectionId) {
    if (window.copticApp) {
        window.copticApp.showSection(sectionId);
    }
}

function openVirtualTour(tourId) {
    if (window.copticApp) {
        window.copticApp.openVirtualTour(tourId);
    }
}

function closeTourModal() {
    if (window.copticApp) {
        window.copticApp.closeTourModal();
    }
}

function closeCameraModal() {
    if (window.copticApp) {
        window.copticApp.closeCameraModal();
    }
}

function toggleMobileMenu() {
    if (window.copticApp) {
        window.copticApp.toggleMobileMenu();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.copticApp = new CopticWebsiteApp();
    
    // Setup camera capture button
    const captureBtn = document.getElementById('captureBtn');
    if (captureBtn) {
        captureBtn.addEventListener('click', () => {
            window.copticApp.capturePhoto();
        });
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.section) {
            window.copticApp.showSection(e.state.section);
        }
    });
});

console.log('🚀 Enhanced Coptic Website Application loaded successfully!');
