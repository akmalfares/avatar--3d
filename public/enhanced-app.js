// الكنيسة القبطية الأرثوذكسية - JavaScript المحدث والمدمج

// متغيرات عامة
let currentSection = 'home';
let currentCamera = 'user';
let cameraStream = null;
let uploadedImage = null;
let avatarData = null;

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ تم تحميل الموقع بنجاح!');
    
    // تهيئة الأقسام
    initializeSections();
    
    // تهيئة نظام Avatar
    initializeAvatarSystem();
    
    // تهيئة الزيارات الافتراضية
    initializeVirtualTours();
    
    // تهيئة الألعاب
    initializeGames();
    
    // تهيئة المكتبة الرقمية
    if (typeof initializeDigitalLibrary === 'function') {
        initializeDigitalLibrary();
    }
    
    // تهيئة نظام الأسئلة والأجوبة
    if (typeof initializeQASystem === 'function') {
        initializeQASystem();
    }
    
    // إضافة مستمعي الأحداث
    addEventListeners();
    
    // عرض رسالة ترحيب
    showWelcomeMessage();
});

// تهيئة الأقسام
function initializeSections() {
    // إخفاء جميع الأقسام عدا الرئيسية
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.classList.remove('active');
        }
    });
    
    // تفعيل القسم الرئيسي
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
}

// عرض قسم معين
function showSection(sectionId) {
    console.log(`🔄 التنقل إلى قسم: ${sectionId}`);
    
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // عرض القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // تحديث عنوان الصفحة
        updatePageTitle(sectionId);
        
        // تنفيذ إجراءات خاصة بكل قسم
        handleSectionSpecificActions(sectionId);
    } else {
        console.error(`❌ لم يتم العثور على القسم: ${sectionId}`);
        showNotification('عذراً، هذا القسم غير متاح حالياً', 'error');
    }
}

// تحديث عنوان الصفحة
function updatePageTitle(sectionId) {
    const titles = {
        'home': 'الكنيسة القبطية الأرثوذكسية - الصفحة الرئيسية',
        'virtual-tours': 'الزيارات الافتراضية',
        'avatar': 'إنشاء Avatar',
        'library': 'المكتبة الرقمية',
        'tests': 'الأسئلة والأجوبة',
        'games': 'الألعاب التفاعلية',
        'schedule': 'مواعيد الكنيسة',
        'church-today': 'الكنيسة اليوم',
        'faith-tests': 'الاختبارات الإيمانية',
        'biographies': 'سير القديسين'
    };
    
    document.title = titles[sectionId] || 'الكنيسة القبطية الأرثوذكسية';
}

// تنفيذ إجراءات خاصة بكل قسم
function handleSectionSpecificActions(sectionId) {
    switch(sectionId) {
        case 'avatar':
            resetAvatarSystem();
            break;
        case 'games':
            loadGames('all');
            break;
        case 'library':
            if (typeof loadLibraryContent === 'function') {
                loadLibraryContent();
            }
            break;
        case 'tests':
            if (typeof loadQAContent === 'function') {
                loadQAContent();
            }
            break;
    }
}

// تهيئة نظام Avatar
function initializeAvatarSystem() {
    console.log('🤖 تهيئة نظام Avatar...');
    
    // عناصر رفع الصور
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const cameraBtn = document.getElementById('cameraBtn');
    const generateBtn = document.getElementById('generateAvatar');
    const customizeBtn = document.getElementById('customizeAvatar');
    const downloadBtn = document.getElementById('downloadAvatar');
    
    if (!uploadArea || !imageInput) {
        console.error('❌ عناصر Avatar غير موجودة');
        return;
    }
    
    // إعداد منطقة رفع الصور
    setupImageUpload(uploadArea, imageInput);
    
    // إعداد الكاميرا
    if (cameraBtn) {
        cameraBtn.addEventListener('click', openCameraModal);
    }
    
    // إعداد أزرار التحكم
    if (generateBtn) {
        generateBtn.addEventListener('click', generateAvatar);
    }
    
    if (customizeBtn) {
        customizeBtn.addEventListener('click', customizeAvatar);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadAvatar);
    }
}

// إعداد رفع الصور
function setupImageUpload(uploadArea, imageInput) {
    // النقر لاختيار الصورة
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });
    
    // تغيير الصورة
    imageInput.addEventListener('change', handleImageSelect);
    
    // السحب والإفلات
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
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleImageFile(files[0]);
        }
    });
}

// معالجة اختيار الصورة
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
    } else {
        showNotification('يرجى اختيار ملف صورة صالح', 'error');
    }
}

// معالجة ملف الصورة
function handleImageFile(file) {
    console.log('📷 معالجة الصورة:', file.name);
    
    // التحقق من حجم الصورة (أقل من 10 ميجا)
    if (file.size > 10 * 1024 * 1024) {
        showNotification('حجم الصورة كبير جداً. يرجى اختيار صورة أصغر من 10 ميجا', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        displayImagePreview(uploadedImage);
        enableAvatarControls();
        showNotification('تم رفع الصورة بنجاح!', 'success');
    };
    
    reader.onerror = () => {
        showNotification('حدث خطأ في قراءة الصورة', 'error');
    };
    
    reader.readAsDataURL(file);
}

// عرض معاينة الصورة
function displayImagePreview(imageSrc) {
    const previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) return;
    
    previewContainer.innerHTML = `
        <img src="${imageSrc}" alt="معاينة الصورة" style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 15px;
        ">
        <div style="
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 0.8rem;
        ">
            جاهز للتحويل
        </div>
    `;
}

// تفعيل أزرار التحكم في Avatar
function enableAvatarControls() {
    const generateBtn = document.getElementById('generateAvatar');
    const customizeBtn = document.getElementById('customizeAvatar');
    
    if (generateBtn) {
        generateBtn.disabled = false;
    }
    
    if (customizeBtn) {
        customizeBtn.disabled = false;
    }
}

// إنشاء Avatar
function generateAvatar() {
    if (!uploadedImage) {
        showNotification('يرجى رفع صورة أولاً', 'error');
        return;
    }
    
    console.log('🎨 بدء إنشاء Avatar...');
    showAvatarProgress();
    
    // محاكاة عملية إنشاء Avatar
    simulateAvatarGeneration();
}

// عرض تقدم إنشاء Avatar
function showAvatarProgress() {
    const progressElement = document.getElementById('avatarProgress');
    if (!progressElement) return;
    
    progressElement.style.display = 'block';
    
    const progressFill = progressElement.querySelector('.progress-fill');
    const progressText = progressElement.querySelector('p');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressText) {
            if (progress < 30) {
                progressText.textContent = 'تحليل الصورة...';
            } else if (progress < 60) {
                progressText.textContent = 'إنشاء النموذج ثلاثي الأبعاد...';
            } else if (progress < 90) {
                progressText.textContent = 'تطبيق التفاصيل...';
            } else {
                progressText.textContent = 'اللمسات الأخيرة...';
            }
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                completeAvatarGeneration();
            }, 500);
        }
    }, 200);
}

// إكمال إنشاء Avatar
function completeAvatarGeneration() {
    const progressElement = document.getElementById('avatarProgress');
    if (progressElement) {
        progressElement.style.display = 'none';
    }
    
    // عرض Avatar المكتمل
    displayGeneratedAvatar();
    
    // تفعيل أزرار التحكم الإضافية
    const downloadBtn = document.getElementById('downloadAvatar');
    if (downloadBtn) {
        downloadBtn.disabled = false;
    }
    
    showNotification('تم إنشاء Avatar بنجاح!', 'success');
}

// عرض Avatar المُنشأ
function displayGeneratedAvatar() {
    const previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) return;
    
    // محاكاة Avatar ثلاثي الأبعاد
    previewContainer.innerHTML = `
        <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        ">
            <div style="
                width: 150px;
                height: 150px;
                background: url('${uploadedImage}') center/cover;
                border-radius: 50%;
                border: 4px solid white;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: avatarPulse 2s ease-in-out infinite;
            "></div>
            <div style="
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255,255,255,0.9);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                color: #333;
            ">
                Avatar جاهز!
            </div>
        </div>
        <style>
            @keyframes avatarPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        </style>
    `;
    
    avatarData = {
        originalImage: uploadedImage,
        generatedAt: new Date().toISOString(),
        style: '3D Realistic'
    };
}

// محاكاة عملية إنشاء Avatar
function simulateAvatarGeneration() {
    // هنا يمكن إضافة استدعاء API حقيقي لإنشاء Avatar
    // مثل استخدام Ready Player Me أو أي خدمة أخرى
    
    setTimeout(() => {
        completeAvatarGeneration();
    }, 3000);
}

// تخصيص Avatar
function customizeAvatar() {
    if (!avatarData) {
        showNotification('يرجى إنشاء Avatar أولاً', 'error');
        return;
    }
    
    // فتح نافذة التخصيص
    showCustomizationModal();
}

// عرض نافذة التخصيص
function showCustomizationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="width: 600px; height: 500px;">
            <div class="modal-header">
                <h3>تخصيص Avatar</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%;">
                    <div>
                        <h4 style="margin-bottom: 15px;">خيارات التخصيص</h4>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div>
                                <label>نمط الشعر:</label>
                                <select style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd;">
                                    <option>قصير</option>
                                    <option>متوسط</option>
                                    <option>طويل</option>
                                </select>
                            </div>
                            <div>
                                <label>لون العينين:</label>
                                <select style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd;">
                                    <option>بني</option>
                                    <option>أسود</option>
                                    <option>أزرق</option>
                                    <option>أخضر</option>
                                </select>
                            </div>
                            <div>
                                <label>نوع الملابس:</label>
                                <select style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd;">
                                    <option>رسمي</option>
                                    <option>كاجوال</option>
                                    <option>رياضي</option>
                                </select>
                            </div>
                            <button class="btn btn-primary" style="margin-top: 20px;" onclick="applyCustomization()">
                                تطبيق التغييرات
                            </button>
                        </div>
                    </div>
                    <div style="background: #f5f5f5; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <div style="text-align: center; color: #666;">
                            <i class="fas fa-user-circle" style="font-size: 4rem; margin-bottom: 10px;"></i>
                            <p>معاينة التخصيص</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// تطبيق التخصيص
function applyCustomization() {
    showNotification('تم تطبيق التخصيص بنجاح!', 'success');
    document.querySelector('.modal').remove();
}

// تحميل Avatar
function downloadAvatar() {
    if (!avatarData) {
        showNotification('لا يوجد Avatar للتحميل', 'error');
        return;
    }
    
    // محاكاة تحميل Avatar
    showNotification('جاري تحضير Avatar للتحميل...', 'info');
    
    setTimeout(() => {
        // إنشاء رابط تحميل وهمي
        const link = document.createElement('a');
        link.href = avatarData.originalImage;
        link.download = `coptic-avatar-${Date.now()}.png`;
        link.click();
        
        showNotification('تم تحميل Avatar بنجاح!', 'success');
    }, 1500);
}

// فتح نافذة الكاميرا
function openCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (!modal) {
        console.error('❌ نافذة الكاميرا غير موجودة');
        return;
    }
    
    modal.style.display = 'flex';
    startCamera();
}

// إغلاق نافذة الكاميرا
function closeCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
        modal.style.display = 'none';
    }
    stopCamera();
}

// تشغيل الكاميرا
async function startCamera() {
    const video = document.getElementById('cameraVideo');
    if (!video) return;
    
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentCamera }
        });
        video.srcObject = cameraStream;
        
        // إعداد أزرار التحكم
        setupCameraControls();
        
    } catch (error) {
        console.error('❌ خطأ في تشغيل الكاميرا:', error);
        showNotification('لا يمكن الوصول للكاميرا. تأكد من إعطاء الإذن', 'error');
    }
}

// إيقاف الكاميرا
function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
}

// إعداد أزرار التحكم في الكاميرا
function setupCameraControls() {
    const switchBtn = document.getElementById('switchCameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    
    if (switchBtn) {
        switchBtn.onclick = switchCamera;
    }
    
    if (captureBtn) {
        captureBtn.onclick = capturePhoto;
    }
}

// تبديل الكاميرا
async function switchCamera() {
    currentCamera = currentCamera === 'user' ? 'environment' : 'user';
    stopCamera();
    await startCamera();
}

// التقاط الصورة
function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    
    if (!video || !canvas) return;
    
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // رسم الصورة على الكانفاس
    context.drawImage(video, 0, 0);
    
    // تحويل إلى Base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // استخدام الصورة الملتقطة
    uploadedImage = imageData;
    displayImagePreview(imageData);
    enableAvatarControls();
    
    // إغلاق نافذة الكاميرا
    closeCameraModal();
    
    // التنقل إلى قسم Avatar
    showSection('avatar');
    
    showNotification('تم التقاط الصورة بنجاح!', 'success');
}

// إعادة تعيين نظام Avatar
function resetAvatarSystem() {
    uploadedImage = null;
    avatarData = null;
    
    // إعادة تعيين المعاينة
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
        previewContainer.innerHTML = `
            <div class="avatar-placeholder">
                <i class="fas fa-user-circle"></i>
                <p>معاينة Avatar</p>
                <span>سيظهر هنا بعد رفع الصورة</span>
            </div>
        `;
    }
    
    // تعطيل الأزرار
    const buttons = ['generateAvatar', 'customizeAvatar', 'downloadAvatar'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) btn.disabled = true;
    });
    
    // إخفاء شريط التقدم
    const progressElement = document.getElementById('avatarProgress');
    if (progressElement) {
        progressElement.style.display = 'none';
    }
}

// تهيئة الزيارات الافتراضية
function initializeVirtualTours() {
    console.log('🏛️ تهيئة الزيارات الافتراضية...');
    
    // إعداد البيانات
    const tours = {
        'hanging-church': {
            title: 'كنيسة السيدة العذراء المعلقة',
            url: 'https://www.360cities.net/image/hanging-church-3-cairo',
            description: 'جولة افتراضية في أقدم كنائس مصر القديمة'
        },
        'st-anthony': {
            title: 'دير الأنبا أنطونيوس',
            url: 'https://stantony.net/virtual-tour/',
            description: 'اكتشف أقدم دير في العالم'
        },
        'abu-serga': {
            title: 'كنيسة أبو سرجة',
            url: 'https://www.copticmuseum.gov.eg/virtual-tour/abu-serga',
            description: 'المكان الذي استراحت فيه العائلة المقدسة'
        }
    };
    
    // حفظ البيانات للاستخدام لاحقاً
    window.virtualTours = tours;
}

// فتح الزيارة الافتراضية
function openVirtualTour(tourId) {
    console.log(`🎯 فتح الزيارة الافتراضية: ${tourId}`);
    
    const tours = window.virtualTours;
    if (!tours || !tours[tourId]) {
        showNotification('عذراً، هذه الزيارة غير متاحة حالياً', 'error');
        return;
    }
    
    const tour = tours[tourId];
    const modal = document.getElementById('tourModal');
    
    if (!modal) {
        console.error('❌ نافذة الزيارة الافتراضية غير موجودة');
        return;
    }
    
    // تحديث عنوان النافذة
    const titleElement = document.getElementById('tourTitle');
    if (titleElement) {
        titleElement.textContent = tour.title;
    }
    
    // تحديث محتوى الزيارة
    const viewer = document.getElementById('tourViewer');
    if (viewer) {
        viewer.innerHTML = `
            <div class="tour-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>جاري تحميل الزيارة الافتراضية...</p>
            </div>
        `;
        
        // تحميل الزيارة الافتراضية
        setTimeout(() => {
            loadVirtualTourContent(viewer, tour);
        }, 1000);
    }
    
    // عرض النافذة
    modal.style.display = 'flex';
    
    // إعداد أزرار التحكم
    setupTourControls();
}

// تحميل محتوى الزيارة الافتراضية
function loadVirtualTourContent(viewer, tour) {
    if (tour.url.includes('360cities.net')) {
        // للزيارات من 360cities
        viewer.innerHTML = `
            <iframe 
                src="${tour.url}" 
                width="100%" 
                height="100%" 
                frameborder="0" 
                allowfullscreen
                style="border-radius: 15px;"
            ></iframe>
        `;
    } else {
        // للزيارات الأخرى
        viewer.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
                padding: 40px;
            ">
                <i class="fas fa-church" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.8;"></i>
                <h3 style="margin-bottom: 15px;">${tour.title}</h3>
                <p style="margin-bottom: 30px; opacity: 0.9;">${tour.description}</p>
                <button class="btn btn-primary" onclick="window.open('${tour.url}', '_blank')" style="
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-external-link-alt" style="margin-left: 8px;"></i>
                    زيارة الموقع الرسمي
                </button>
            </div>
        `;
    }
}

// إعداد أزرار التحكم في الزيارة
function setupTourControls() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const infoBtn = document.getElementById('infoBtn');
    
    if (fullscreenBtn) {
        fullscreenBtn.onclick = toggleFullscreen;
    }
    
    if (infoBtn) {
        infoBtn.onclick = showTourInfo;
    }
}

// تبديل ملء الشاشة
function toggleFullscreen() {
    const modal = document.getElementById('tourModal');
    if (!modal) return;
    
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => {
            console.error('خطأ في ملء الشاشة:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// عرض معلومات الزيارة
function showTourInfo() {
    showNotification('معلومات إضافية عن الزيارة الافتراضية', 'info');
}

// إغلاق نافذة الزيارة الافتراضية
function closeTourModal() {
    const modal = document.getElementById('tourModal');
    if (modal) {
        modal.style.display = 'none';
        
        // إيقاف أي محتوى قيد التشغيل
        const viewer = document.getElementById('tourViewer');
        if (viewer) {
            viewer.innerHTML = `
                <div class="tour-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>جاري تحميل الزيارة الافتراضية...</p>
                </div>
            `;
        }
    }
}

// تهيئة الألعاب
function initializeGames() {
    console.log('🎮 تهيئة الألعاب...');
    
    // بيانات الألعاب
    const games = {
        apostolic: [
            {
                id: 'mark-journey',
                title: 'رحلة القديس مرقس',
                description: 'تتبع رحلة القديس مرقس في نشر المسيحية بمصر',
                icon: 'fas fa-map',
                difficulty: 'سهل',
                duration: '15 دقيقة'
            },
            {
                id: 'apostles-quiz',
                title: 'اختبار الرسل',
                description: 'اختبر معرفتك بحياة وتعاليم الرسل',
                icon: 'fas fa-question-circle',
                difficulty: 'متوسط',
                duration: '10 دقائق'
            }
        ],
        persecution: [
            {
                id: 'martyrs-memory',
                title: 'ذاكرة الشهداء',
                description: 'لعبة ذاكرة لتعلم أسماء وقصص الشهداء',
                icon: 'fas fa-heart',
                difficulty: 'متوسط',
                duration: '20 دقيقة'
            },
            {
                id: 'persecution-timeline',
                title: 'خط زمني الاضطهاد',
                description: 'رتب أحداث عصر الاضطهاد الروماني',
                icon: 'fas fa-clock',
                difficulty: 'صعب',
                duration: '25 دقيقة'
            }
        ],
        golden: [
            {
                id: 'fathers-wisdom',
                title: 'حكمة الآباء',
                description: 'اكتشف تعاليم آباء الكنيسة العظماء',
                icon: 'fas fa-book-open',
                difficulty: 'متوسط',
                duration: '18 دقيقة'
            }
        ],
        islamic: [
            {
                id: 'coexistence-story',
                title: 'قصة التعايش',
                description: 'تعلم عن فترات التعايش والتحديات',
                icon: 'fas fa-handshake',
                difficulty: 'متوسط',
                duration: '22 دقيقة'
            }
        ],
        modern: [
            {
                id: 'modern-saints',
                title: 'قديسو العصر الحديث',
                description: 'تعرف على قديسي القرن العشرين',
                icon: 'fas fa-star',
                difficulty: 'سهل',
                duration: '12 دقيقة'
            }
        ]
    };
    
    // حفظ البيانات
    window.gamesData = games;
    
    // إعداد مستمعي الأحداث للعصور
    const eraButtons = document.querySelectorAll('.era-btn');
    eraButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة التفعيل من جميع الأزرار
            eraButtons.forEach(b => b.classList.remove('active'));
            // تفعيل الزر المحدد
            btn.classList.add('active');
            // تحميل الألعاب
            const era = btn.getAttribute('data-era');
            loadGames(era);
        });
    });
}

// تحميل الألعاب حسب العصر
function loadGames(era) {
    console.log(`🎯 تحميل ألعاب العصر: ${era}`);
    
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;
    
    const games = window.gamesData;
    if (!games) return;
    
    let allGames = [];
    
    if (era === 'all') {
        // جمع جميع الألعاب
        Object.values(games).forEach(eraGames => {
            allGames = allGames.concat(eraGames);
        });
    } else if (games[era]) {
        allGames = games[era];
    }
    
    // عرض الألعاب
    gamesGrid.innerHTML = allGames.map(game => `
        <div class="game-card" onclick="startGame('${game.id}')">
            <div class="game-icon">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <div class="game-meta">
                    <span><i class="fas fa-signal"></i> ${game.difficulty}</span>
                    <span><i class="fas fa-clock"></i> ${game.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // إضافة رسوم متحركة
    const gameCards = gamesGrid.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// بدء لعبة
function startGame(gameId) {
    console.log(`🎮 بدء اللعبة: ${gameId}`);
    showNotification(`جاري تحميل لعبة ${gameId}...`, 'info');
    
    // محاكاة تحميل اللعبة
    setTimeout(() => {
        showGameModal(gameId);
    }, 1000);
}

// عرض نافذة اللعبة
function showGameModal(gameId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="width: 90vw; height: 80vh;">
            <div class="modal-header">
                <h3>🎮 ${gameId}</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-align: center;
                ">
                    <i class="fas fa-gamepad" style="font-size: 4rem; margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 15px;">اللعبة قيد التطوير</h3>
                    <p style="margin-bottom: 30px;">سيتم إضافة هذه اللعبة قريباً</p>
                    <button class="btn btn-primary" onclick="this.closest('.modal').remove()">
                        العودة للألعاب
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// إضافة مستمعي الأحداث
function addEventListeners() {
    // مستمع النقر خارج النوافذ المنبثقة لإغلاقها
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // مستمع مفاتيح الاختصار
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // إغلاق النوافذ المنبثقة
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // مستمع تغيير حجم النافذة
    window.addEventListener('resize', () => {
        // تحديث التخطيط عند تغيير حجم النافذة
        updateLayoutOnResize();
    });
}

// تحديث التخطيط عند تغيير حجم النافذة
function updateLayoutOnResize() {
    // يمكن إضافة منطق تحديث التخطيط هنا
    console.log('📱 تحديث التخطيط للحجم الجديد');
}

// عرض رسالة ترحيب
function showWelcomeMessage() {
    setTimeout(() => {
        showNotification('مرحباً بك في موقع الكنيسة القبطية الأرثوذكسية التفاعلي!', 'success');
    }, 1000);
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // إضافة للصفحة
    document.body.appendChild(notification);
    
    // إزالة تلقائية بعد 4 ثوان
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 4000);
    
    // إزالة عند النقر
    notification.addEventListener('click', () => {
        notification.remove();
    });
    
    // إضافة الرسوم المتحركة
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
}

// الحصول على لون الإشعار
function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || colors.info;
}

// الحصول على أيقونة الإشعار
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// تصدير الوظائف للاستخدام العام
window.showSection = showSection;
window.openVirtualTour = openVirtualTour;
window.closeTourModal = closeTourModal;
window.openCameraModal = openCameraModal;
window.closeCameraModal = closeCameraModal;
window.generateAvatar = generateAvatar;
window.customizeAvatar = customizeAvatar;
window.downloadAvatar = downloadAvatar;
window.startGame = startGame;
window.showNotification = showNotification;
window.applyCustomization = applyCustomization;

console.log('✅ تم تحميل جميع وظائف الموقع بنجاح!');
