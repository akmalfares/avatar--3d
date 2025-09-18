// Global Variables
let currentUser = null;
let chatMessages = [];
let currentRoom = 'general';
let avatarData = null;
let cameraStream = null;

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const cameraBtn = document.getElementById('cameraBtn');
const generateAvatarBtn = document.getElementById('generateAvatar');
const downloadAvatarBtn = document.getElementById('downloadAvatar');
const previewContainer = document.getElementById('previewContainer');
const tourModal = document.getElementById('tourModal');
const cameraModal = document.getElementById('cameraModal');
const cameraVideo = document.getElementById('cameraVideo');
const cameraCanvas = document.getElementById('cameraCanvas');
const captureBtn = document.getElementById('captureBtn');
const chatMessages_el = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const qaSearch = document.getElementById('qaSearch');
const qaList = document.getElementById('qaList');
const booksGrid = document.getElementById('booksGrid');
const gamesGrid = document.getElementById('gamesGrid');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ JavaScript شغال!");
    initializeNavigation();
    initializeAvatarSystem();
    initializeChatSystem();
    initializeVirtualTours();
    initializeBooksSection();
    initializeQASection();
    initializeGamesSection();
    loadInitialContent();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Avatar System Functions
function initializeAvatarSystem() {
    if (!uploadArea || !imageInput) return;

    // File upload handling
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#d4af37';
        uploadArea.style.background = '#fffbf0';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#cbd5e0';
        uploadArea.style.background = 'white';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#cbd5e0';
        uploadArea.style.background = 'white';
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleImageUpload(files[0]);
        }
    });

    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });

    // Camera functionality
    if (cameraBtn) {
        cameraBtn.addEventListener('click', openCamera);
    }

    if (captureBtn) {
        captureBtn.addEventListener('click', capturePhoto);
    }

    // Avatar generation
    if (generateAvatarBtn) {
        generateAvatarBtn.addEventListener('click', generateAvatar);
    }

    if (downloadAvatarBtn) {
        downloadAvatarBtn.addEventListener('click', downloadAvatar);
    }
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        displayImagePreview(e.target.result);
        generateAvatarBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

function displayImagePreview(imageSrc) {
    previewContainer.innerHTML = `
        <img src="${imageSrc}" alt="Preview" style="max-width: 100%; max-height: 300px; border-radius: 10px;">
    `;
}

function openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                cameraStream = stream;
                cameraVideo.srcObject = stream;
                cameraModal.style.display = 'block';
            })
            .catch(function(error) {
                console.error('Error accessing camera:', error);
                alert('لا يمكن الوصول إلى الكاميرا. تأكد من منح الإذن للموقع.');
            });
    } else {
        alert('الكاميرا غير مدعومة في هذا المتصفح.');
    }
}

function capturePhoto() {
    const canvas = cameraCanvas;
    const video = cameraVideo;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/png');
    displayImagePreview(imageData);
    generateAvatarBtn.disabled = false;
    
    closeCameraModal();
}

function closeCameraModal() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    cameraModal.style.display = 'none';
}

function generateAvatar() {
    // Simulate avatar generation process
    generateAvatarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإنشاء...';
    generateAvatarBtn.disabled = true;
    
    setTimeout(() => {
        // Create a simple 3D avatar representation
        const avatarHtml = `
            <div style="text-align: center;">
                <div style="width: 200px; height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                    <i class="fas fa-user"></i>
                </div>
                <p style="color: #2d3748; font-weight: 600;">تم إنشاء Avatar بنجاح!</p>
                <p style="color: #718096; font-size: 0.9rem;">يمكنك الآن تحميل Avatar الخاص بك</p>
            </div>
        `;
        
        previewContainer.innerHTML = avatarHtml;
        generateAvatarBtn.innerHTML = '<i class="fas fa-magic"></i> إنشاء Avatar';
        generateAvatarBtn.disabled = false;
        downloadAvatarBtn.disabled = false;
        
        avatarData = {
            type: '3d-avatar',
            timestamp: new Date().toISOString()
        };
    }, 3000);
}

function downloadAvatar() {
    if (!avatarData) return;
    
    // Create a download link for the avatar
    const link = document.createElement('a');
    link.download = 'coptic-avatar-3d.png';
    link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    link.click();
    
    showNotification('تم تحميل Avatar بنجاح!', 'success');
}

// Virtual Tours Functions
function initializeVirtualTours() {
    // Add click handlers for tour cards
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', () => {
            const tourType = card.dataset.tour;
            openVirtualTour(tourType);
        });
    });
}

function openVirtualTour(tourType) {
    const tourTitle = document.getElementById('tourTitle');
    const tourViewer = document.getElementById('tourViewer');
    
    let title = '';
    let content = '';
    
    switch(tourType) {
        case 'hanging-church':
            title = 'كنيسة السيدة العذراء المعلقة';
            content = createHangingChurchTour();
            break;
        case 'st-anthony':
            title = 'دير الأنبا أنطونيوس';
            content = createStAnthonyTour();
            break;
        case 'abu-serga':
            title = 'كنيسة أبو سرجة';
            content = createAbuSergaTour();
            break;
        default:
            title = 'الزيارة الافتراضية';
            content = '<p>جاري تحميل المحتوى...</p>';
    }
    
    tourTitle.textContent = title;
    tourViewer.innerHTML = content;
    tourModal.style.display = 'block';
}

function createHangingChurchTour() {
    return `
        <div style="text-align: center; padding: 2rem;">
            <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">كنيسة السيدة العذراء المعلقة</h3>
                <p>إحدى أقدم الكنائس في مصر والشرق الأوسط</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: #f7fafc; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-history" style="font-size: 2rem; color: #d4af37; margin-bottom: 1rem;"></i>
                    <h4>التاريخ</h4>
                    <p>تعود للقرن الثالث الميلادي</p>
                </div>
                <div style="background: #f7fafc; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: #d4af37; margin-bottom: 1rem;"></i>
                    <h4>الموقع</h4>
                    <p>مصر القديمة - القاهرة</p>
                </div>
                <div style="background: #f7fafc; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-star" style="font-size: 2rem; color: #d4af37; margin-bottom: 1rem;"></i>
                    <h4>الأهمية</h4>
                    <p>مقر البطريركية لفترات طويلة</p>
                </div>
            </div>
            
            <div style="background: #fffbf0; padding: 2rem; border-radius: 15px; border: 2px solid #d4af37;">
                <h4 style="color: #d4af37; margin-bottom: 1rem;">جولة افتراضية 360°</h4>
                <div style="width: 100%; height: 300px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <i class="fas fa-vr-cardboard" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <p>انقر واسحب للتنقل في الكنيسة</p>
                        <p style="font-size: 0.9rem; opacity: 0.8;">تجربة تفاعلية كاملة</p>
                    </div>
                </div>
                <button onclick="startInteractiveTour('hanging-church')" style="background: #d4af37; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-play"></i> ابدأ الجولة التفاعلية
                </button>
            </div>
        </div>
    `;
}

function createStAnthonyTour() {
    return `
        <div style="text-align: center; padding: 2rem;">
            <div style="background: linear-gradient(45deg, #48bb78, #38a169); color: white; padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">دير الأنبا أنطونيوس</h3>
                <p>أقدم دير في العالم - أبو الرهبنة</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: #f0fff4; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-mountain" style="font-size: 2rem; color: #48bb78; margin-bottom: 1rem;"></i>
                    <h4>الموقع</h4>
                    <p>الصحراء الشرقية - البحر الأحمر</p>
                </div>
                <div style="background: #f0fff4; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-user-friends" style="font-size: 2rem; color: #48bb78; margin-bottom: 1rem;"></i>
                    <h4>المؤسس</h4>
                    <p>القديس الأنبا أنطونيوس</p>
                </div>
                <div style="background: #f0fff4; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-calendar" style="font-size: 2rem; color: #48bb78; margin-bottom: 1rem;"></i>
                    <h4>التأسيس</h4>
                    <p>القرن الرابع الميلادي</p>
                </div>
            </div>
            
            <div style="background: #f0fff4; padding: 2rem; border-radius: 15px; border: 2px solid #48bb78;">
                <h4 style="color: #48bb78; margin-bottom: 1rem;">استكشف الدير</h4>
                <div style="width: 100%; height: 300px; background: linear-gradient(45deg, #48bb78, #38a169); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <i class="fas fa-church" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <p>جولة شاملة في أقدم دير في العالم</p>
                        <p style="font-size: 0.9rem; opacity: 0.8;">اكتشف تاريخ الرهبنة المسيحية</p>
                    </div>
                </div>
                <button onclick="startInteractiveTour('st-anthony')" style="background: #48bb78; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-play"></i> ابدأ الزيارة
                </button>
            </div>
        </div>
    `;
}

function createAbuSergaTour() {
    return `
        <div style="text-align: center; padding: 2rem;">
            <div style="background: linear-gradient(45deg, #ed8936, #dd6b20); color: white; padding: 2rem; border-radius: 15px; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">كنيسة أبو سرجة</h3>
                <p>مكان إقامة العائلة المقدسة في مصر</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background: #fffaf0; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-baby" style="font-size: 2rem; color: #ed8936; margin-bottom: 1rem;"></i>
                    <h4>العائلة المقدسة</h4>
                    <p>مكان إقامة السيد المسيح</p>
                </div>
                <div style="background: #fffaf0; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-home" style="font-size: 2rem; color: #ed8936; margin-bottom: 1rem;"></i>
                    <h4>المغارة</h4>
                    <p>المغارة التي أقامت فيها العائلة</p>
                </div>
                <div style="background: #fffaf0; padding: 1.5rem; border-radius: 10px;">
                    <i class="fas fa-cross" style="font-size: 2rem; color: #ed8936; margin-bottom: 1rem;"></i>
                    <h4>القداسة</h4>
                    <p>من أقدس الأماكن المسيحية</p>
                </div>
            </div>
            
            <div style="background: #fffaf0; padding: 2rem; border-radius: 15px; border: 2px solid #ed8936;">
                <h4 style="color: #ed8936; margin-bottom: 1rem;">زيارة مقدسة</h4>
                <div style="width: 100%; height: 300px; background: linear-gradient(45deg, #ed8936, #dd6b20); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 1rem;">
                    <div style="text-align: center;">
                        <i class="fas fa-praying-hands" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <p>اكتشف المكان المقدس</p>
                        <p style="font-size: 0.9rem; opacity: 0.8;">على خطى العائلة المقدسة</p>
                    </div>
                </div>
                <button onclick="startInteractiveTour('abu-serga')" style="background: #ed8936; color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-play"></i> ابدأ الزيارة المقدسة
                </button>
            </div>
        </div>
    `;
}

function startInteractiveTour(tourType) {
    // Simulate starting an interactive 360° tour
    showNotification('جاري تحميل الجولة التفاعلية...', 'info');
    
    setTimeout(() => {
        showNotification('تم تحميل الجولة بنجاح! استخدم الماوس للتنقل.', 'success');
    }, 2000);
}

function closeTourModal() {
    tourModal.style.display = 'none';
}

// Chat System Functions
function initializeChatSystem() {
    if (!chatMessages_el || !messageInput || !sendBtn) return;

    // Initialize with sample messages
    loadSampleMessages();

    // Room switching
    document.querySelectorAll('.room-item').forEach(room => {
        room.addEventListener('click', () => {
            document.querySelectorAll('.room-item').forEach(r => r.classList.remove('active'));
            room.classList.add('active');
            currentRoom = room.dataset.room;
            loadRoomMessages(currentRoom);
        });
    });

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function loadSampleMessages() {
    const sampleMessages = [
        {
            user: 'أبونا يوحنا',
            message: 'مرحباً بكم جميعاً في المحادثة العامة',
            time: '10:30',
            type: 'priest'
        },
        {
            user: 'مريم',
            message: 'شكراً لكم على هذا الموقع الرائع',
            time: '10:32',
            type: 'user'
        },
        {
            user: 'يوسف',
            message: 'هل يمكن إضافة المزيد من الكتب؟',
            time: '10:35',
            type: 'user'
        }
    ];

    chatMessages = sampleMessages;
    displayMessages();
}

function loadRoomMessages(room) {
    // Simulate loading different messages for different rooms
    chatMessages_el.innerHTML = '<div style="text-align: center; padding: 2rem; color: #718096;">جاري تحميل الرسائل...</div>';
    
    setTimeout(() => {
        displayMessages();
    }, 500);
}

function displayMessages() {
    chatMessages_el.innerHTML = '';
    
    chatMessages.forEach(msg => {
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.8rem; margin-bottom: 1rem; padding: 0.8rem; background: ${msg.type === 'priest' ? '#f0fff4' : '#f7fafc'}; border-radius: 10px;">
                <div style="width: 40px; height: 40px; background: ${msg.type === 'priest' ? '#48bb78' : '#4299e1'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; flex-shrink: 0;">
                    ${msg.user.charAt(0)}
                </div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                        <span style="font-weight: 600; color: #2d3748;">${msg.user}</span>
                        <span style="font-size: 0.8rem; color: #718096;">${msg.time}</span>
                    </div>
                    <p style="color: #4a5568; margin: 0;">${msg.message}</p>
                </div>
            </div>
        `;
        chatMessages_el.appendChild(messageEl);
    });
    
    chatMessages_el.scrollTop = chatMessages_el.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    const newMessage = {
        user: 'أنت',
        message: message,
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        type: 'user'
    };
    
    chatMessages.push(newMessage);
    messageInput.value = '';
    displayMessages();
    
    // Simulate response
    setTimeout(() => {
        const responses = [
            'شكراً لك على مشاركتك',
            'نقطة ممتازة!',
            'الله يبارك حياتك',
            'هذا سؤال مهم جداً'
        ];
        
        const response = {
            user: 'المشرف',
            message: responses[Math.floor(Math.random() * responses.length)],
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            type: 'priest'
        };
        
        chatMessages.push(response);
        displayMessages();
    }, 1000);
}

// Books Section Functions
function initializeBooksSection() {
    if (!booksGrid) return;

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            loadBooks(category);
        });
    });

    // Load initial books
    loadBooks('history');
}

function loadBooks(category) {
    const books = {
        history: [
            { title: 'تاريخ الكنيسة القبطية', author: 'الأنبا إيسيذوروس', description: 'تاريخ شامل للكنيسة القبطية من البداية حتى اليوم' },
            { title: 'الكنيسة في عصر الشهداء', author: 'الأنبا يوأنس', description: 'قصص الشهداء والاضطهادات في العصور الأولى' },
            { title: 'البطاركة الأقباط', author: 'د. رءوف حبيب', description: 'سير البطاركة عبر التاريخ' }
        ],
        theology: [
            { title: 'اللاهوت المقارن', author: 'الأنبا بيشوي', description: 'دراسة مقارنة في اللاهوت الأرثوذكسي' },
            { title: 'الإيمان الأرثوذكسي', author: 'الأنبا رافائيل', description: 'أسس الإيمان الأرثوذكسي' },
            { title: 'سر التجسد', author: 'القديس أثناسيوس', description: 'شرح عقيدة التجسد الإلهي' }
        ],
        saints: [
            { title: 'سيرة القديس الأنبا أنطونيوس', author: 'القديس أثناسيوس', description: 'حياة أبو الرهبان' },
            { title: 'الشهيدة دميانة', author: 'الأنبا مكاريوس', description: 'قصة الشهيدة دميانة والأربعين عذراء' },
            { title: 'القديس مارمرقس', author: 'الأنبا مرقس', description: 'حياة كاروز الديار المصرية' }
        ],
        prayers: [
            { title: 'الأجبية المقدسة', author: 'الكنيسة القبطية', description: 'صلوات السواعي المقدسة' },
            { title: 'القداس الإلهي', author: 'الكنيسة القبطية', description: 'نصوص القداس الإلهي' },
            { title: 'صلوات الأسرار', author: 'الكنيسة القبطية', description: 'صلوات الأسرار السبعة' }
        ]
    };

    const categoryBooks = books[category] || books.history;
    
    booksGrid.innerHTML = '';
    categoryBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div style="background: white; border-radius: 15px; padding: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="width: 60px; height: 80px; background: linear-gradient(45deg, #d4af37, #f7d794); border-radius: 5px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="fas fa-book"></i>
                </div>
                <h4 style="color: #2d3748; margin-bottom: 0.5rem; text-align: center;">${book.title}</h4>
                <p style="color: #d4af37; font-weight: 600; text-align: center; margin-bottom: 0.5rem;">${book.author}</p>
                <p style="color: #718096; font-size: 0.9rem; text-align: center; margin-bottom: 1rem;">${book.description}</p>
                <button onclick="openBook('${book.title}')" style="width: 100%; background: #d4af37; color: white; border: none; padding: 0.8rem; border-radius: 25px; cursor: pointer; font-weight: 600; transition: background 0.3s ease;" onmouseover="this.style.background='#b8941f'" onmouseout="this.style.background='#d4af37'">
                    <i class="fas fa-book-open"></i> اقرأ الكتاب
                </button>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
}

function openBook(title) {
    showNotification(`جاري فتح كتاب: ${title}`, 'info');
    // Here you would implement the book reading functionality
}

// Q&A Section Functions
function initializeQASection() {
    if (!qaList || !qaSearch) return;

    // Search functionality
    qaSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterQA(searchTerm);
    });

    // Category filtering
    document.querySelectorAll('.qa-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.qa-category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            loadQA(category);
        });
    });

    // Load initial Q&A
    loadQA('all');
}

function loadQA(category) {
    const qaData = [
        {
            question: 'ما هي أسس الإيمان الأرثوذكسي؟',
            answer: 'الإيمان الأرثوذكسي يقوم على الكتاب المقدس والتقليد الرسولي وقرارات المجامع المسكونية السبعة.',
            category: 'faith'
        },
        {
            question: 'كيف نصوم الصوم الكبير؟',
            answer: 'الصوم الكبير يستمر 55 يوماً، ونمتنع فيه عن المنتجات الحيوانية ونركز على الصلاة والتوبة.',
            category: 'fasting'
        },
        {
            question: 'ما هي الأسرار السبعة؟',
            answer: 'المعمودية، الميرون، الإفخارستيا، التوبة، مسحة المرضى، الكهنوت، والزواج.',
            category: 'sacraments'
        },
        {
            question: 'كيف نصلي الأجبية؟',
            answer: 'الأجبية تحتوي على سبع صلوات يومية، تبدأ بصلاة باكر وتنتهي بصلاة النوم.',
            category: 'prayers'
        },
        {
            question: 'من هو القديس الأنبا أنطونيوس؟',
            answer: 'هو أبو الرهبان، عاش في القرن الثالث والرابع الميلادي، وأسس الحياة الرهبانية.',
            category: 'faith'
        }
    ];

    const filteredQA = category === 'all' ? qaData : qaData.filter(item => item.category === category);
    displayQA(filteredQA);
}

function displayQA(qaData) {
    qaList.innerHTML = '';
    
    qaData.forEach((item, index) => {
        const qaItem = document.createElement('div');
        qaItem.className = 'qa-item';
        qaItem.innerHTML = `
            <div style="background: white; border-radius: 15px; margin-bottom: 1rem; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                <div onclick="toggleQA(${index})" style="padding: 1.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: #f7fafc; border-bottom: 1px solid #e2e8f0;">
                    <h4 style="color: #2d3748; margin: 0; flex: 1;">${item.question}</h4>
                    <i class="fas fa-chevron-down" id="icon-${index}" style="color: #d4af37; transition: transform 0.3s ease;"></i>
                </div>
                <div id="answer-${index}" style="padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                    <div style="padding: 1.5rem 0;">
                        <p style="color: #4a5568; line-height: 1.6; margin: 0;">${item.answer}</p>
                    </div>
                </div>
            </div>
        `;
        qaList.appendChild(qaItem);
    });
}

function toggleQA(index) {
    const answer = document.getElementById(`answer-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    
    if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.padding = '0 1.5rem';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = '0px';
        answer.style.padding = '0 1.5rem';
        icon.style.transform = 'rotate(0deg)';
    }
}

function filterQA(searchTerm) {
    // This would filter the Q&A based on search term
    // For now, just show a message
    if (searchTerm.length > 2) {
        showNotification(`البحث عن: ${searchTerm}`, 'info');
    }
}

// Games Section Functions
function initializeGamesSection() {
    if (!gamesGrid) return;

    // Era selection
    document.querySelectorAll('.era-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.era-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const era = btn.dataset.era;
            loadGames(era);
        });
    });

    // Load initial games
    loadGames('apostolic');
}

function loadGames(era) {
    const games = {
        apostolic: [
            {
                title: 'رحلة مار مرقس',
                description: 'تابع رحلة القديس مرقس في نشر المسيحية',
                icon: 'fas fa-route',
                difficulty: 'سهل'
            }
        ],
        persecution: [
            {
                title: 'عصر الشهداء',
                description: 'عش تجربة المسيحيين في عصر الاضطهاد',
                icon: 'fas fa-shield-alt',
                difficulty: 'متوسط'
            }
        ],
        golden: [
            {
                title: 'بناء الأديرة',
                description: 'ساعد في بناء أول الأديرة المسيحية',
                icon: 'fas fa-building',
                difficulty: 'متقدم'
            }
        ],
        islamic: [
            {
                title: 'الحفاظ على التراث',
                description: 'احم التراث القبطي عبر العصور',
                icon: 'fas fa-scroll',
                difficulty: 'متوسط'
            }
        ],
        modern: [
            {
                title: 'الكنيسة اليوم',
                description: 'تعرف على دور الكنيسة في العصر الحديث',
                icon: 'fas fa-globe',
                difficulty: 'سهل'
            }
        ]
    };

    const eraGames = games[era] || [];
    
    gamesGrid.innerHTML = '';
    
    if (eraGames.length === 0) {
        gamesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #718096;">
                <i class="fas fa-gamepad" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>قريباً</h3>
                <p>ألعاب هذا العصر قيد التطوير</p>
            </div>
        `;
        return;
    }
    
    eraGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div style="background: white; border-radius: 15px; padding: 2rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer; text-align: center;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                    <i class="${game.icon}"></i>
                </div>
                <h4 style="color: #2d3748; margin-bottom: 1rem;">${game.title}</h4>
                <p style="color: #718096; margin-bottom: 1rem; line-height: 1.5;">${game.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <span style="background: #e2e8f0; color: #4a5568; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">${game.difficulty}</span>
                    <div style="color: #d4af37;">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                </div>
                <button onclick="startGame('${game.title}')" style="width: 100%; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 1rem; border-radius: 25px; cursor: pointer; font-weight: 600; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-play"></i> ابدأ اللعبة
                </button>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

function startGame(gameTitle) {
    showNotification(`جاري تحميل لعبة: ${gameTitle}`, 'info');
    // Here you would implement the game launching functionality
}

// Utility Functions
function loadInitialContent() {
    // Simulate loading content
    setTimeout(() => {
        showNotification('مرحباً بك في الموقع التفاعلي للكنيسة القبطية الأرثوذكسية!', 'success');
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === tourModal) {
        closeTourModal();
    }
    if (e.target === cameraModal) {
        closeCameraModal();
    }
});

// Handle escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (tourModal.style.display === 'block') {
            closeTourModal();
        }
        if (cameraModal.style.display === 'block') {
            closeCameraModal();
        }
    }
});

console.log('🎉 الموقع التفاعلي للكنيسة القبطية الأرثوذكسية جاهز!');
