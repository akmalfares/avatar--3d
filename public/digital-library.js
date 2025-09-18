// Digital Library System for Coptic Orthodox Website
class CopticDigitalLibrary {
    constructor() {
        this.books = new Map();
        this.categories = new Map();
        this.authors = new Map();
        this.currentView = 'grid';
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.favorites = new Set();
        this.readingProgress = new Map();
        this.bookmarks = new Map();
        this.initializeLibrary();
    }

    initializeLibrary() {
        this.setupCategories();
        this.setupAuthors();
        this.setupBooks();
        this.loadUserData();
    }

    setupCategories() {
        const categories = [
            {
                id: 'history',
                name: 'التاريخ الكنسي',
                description: 'كتب تاريخ الكنيسة القبطية والمسيحية',
                icon: 'fas fa-scroll',
                color: '#d4af37',
                count: 0
            },
            {
                id: 'theology',
                name: 'اللاهوت والعقيدة',
                description: 'كتب اللاهوت والعقائد الأرثوذكسية',
                icon: 'fas fa-cross',
                color: '#4299e1',
                count: 0
            },
            {
                id: 'saints',
                name: 'سير القديسين',
                description: 'حياة وسير القديسين والشهداء',
                icon: 'fas fa-user-friends',
                color: '#48bb78',
                count: 0
            },
            {
                id: 'prayers',
                name: 'الصلوات والطقوس',
                description: 'كتب الصلوات والطقوس الكنسية',
                icon: 'fas fa-praying-hands',
                color: '#ed8936',
                count: 0
            },
            {
                id: 'spiritual',
                name: 'الروحانيات',
                description: 'كتب الحياة الروحية والنسك',
                icon: 'fas fa-dove',
                color: '#9f7aea',
                count: 0
            },
            {
                id: 'bible_study',
                name: 'دراسات كتابية',
                description: 'تفاسير وشروحات الكتاب المقدس',
                icon: 'fas fa-book-open',
                color: '#f56565',
                count: 0
            }
        ];

        categories.forEach(category => {
            this.categories.set(category.id, category);
        });
    }

    setupAuthors() {
        const authors = [
            {
                id: 'anba_isidoros',
                name: 'الأنبا إيسيذوروس',
                title: 'مطران الجيزة',
                bio: 'أحد أبرز المؤرخين في الكنيسة القبطية الأرثوذكسية',
                avatar: '👨‍💼',
                books: []
            },
            {
                id: 'anba_bishoy',
                name: 'الأنبا بيشوي',
                title: 'مطران دمياط',
                bio: 'عالم لاهوت ومؤلف العديد من الكتب العقائدية',
                avatar: '👨‍💼',
                books: []
            },
            {
                id: 'st_athanasius',
                name: 'القديس أثناسيوس',
                title: 'البابا العشرون',
                bio: 'عمود الدين وحامي الإيمان الأرثوذكسي',
                avatar: '⛪',
                books: []
            },
            {
                id: 'anba_rafael',
                name: 'الأنبا رافائيل',
                title: 'أسقف عام وسط القاهرة',
                bio: 'كاتب ومؤلف في مجال الروحانيات والعقيدة',
                avatar: '👨‍💼',
                books: []
            }
        ];

        authors.forEach(author => {
            this.authors.set(author.id, author);
        });
    }

    setupBooks() {
        const books = [
            // History Books
            {
                id: 'coptic_history_1',
                title: 'تاريخ الكنيسة القبطية الأرثوذكسية',
                author: 'anba_isidoros',
                category: 'history',
                description: 'دراسة شاملة لتاريخ الكنيسة القبطية من التأسيس حتى العصر الحديث',
                pages: 450,
                publishYear: 2018,
                language: 'العربية',
                isbn: '978-977-123-456-7',
                cover: 'linear-gradient(135deg, #d4af37, #f7d794)',
                rating: 4.8,
                downloads: 1250,
                tags: ['تاريخ', 'كنيسة قبطية', 'مصر'],
                content: 'هذا الكتاب يتناول تاريخ الكنيسة القبطية الأرثوذكسية منذ تأسيسها على يد القديس مرقس الرسول...',
                chapters: [
                    'تأسيس الكنيسة على يد القديس مرقس',
                    'عصر الاضطهاد والشهداء',
                    'العصر الذهبي والآباء',
                    'الفتح الإسلامي والتكيف',
                    'الكنيسة في العصر الحديث'
                ]
            },
            {
                id: 'martyrs_era',
                title: 'الكنيسة في عصر الشهداء',
                author: 'anba_isidoros',
                category: 'history',
                description: 'قصص الشهداء والاضطهادات في العصور الأولى للمسيحية',
                pages: 320,
                publishYear: 2020,
                language: 'العربية',
                isbn: '978-977-123-457-8',
                cover: 'linear-gradient(135deg, #e53e3e, #fc8181)',
                rating: 4.7,
                downloads: 980,
                tags: ['شهداء', 'اضطهاد', 'تاريخ مسيحي'],
                content: 'يروي هذا الكتاب قصص الشهداء العظام الذين ضحوا بحياتهم من أجل الإيمان...',
                chapters: [
                    'الاضطهاد الروماني الأول',
                    'شهداء الإسكندرية',
                    'الشهيدة دميانة والأربعين عذراء',
                    'القديس مينا العجايبي',
                    'تأثير الشهادة على الكنيسة'
                ]
            },
            // Theology Books
            {
                id: 'orthodox_faith',
                title: 'الإيمان الأرثوذكسي',
                author: 'anba_rafael',
                category: 'theology',
                description: 'شرح مفصل لأسس الإيمان الأرثوذكسي والعقائد المسيحية',
                pages: 380,
                publishYear: 2019,
                language: 'العربية',
                isbn: '978-977-123-458-9',
                cover: 'linear-gradient(135deg, #4299e1, #63b3ed)',
                rating: 4.9,
                downloads: 1450,
                tags: ['عقيدة', 'إيمان', 'أرثوذكسية'],
                content: 'يتناول هذا الكتاب أسس الإيمان الأرثوذكسي وتطور العقيدة المسيحية...',
                chapters: [
                    'قانون الإيمان النيقاوي',
                    'سر التجسد الإلهي',
                    'الثالوث القدوس',
                    'الكنيسة والأسرار',
                    'القيامة والحياة الأبدية'
                ]
            },
            {
                id: 'comparative_theology',
                title: 'اللاهوت المقارن',
                author: 'anba_bishoy',
                category: 'theology',
                description: 'دراسة مقارنة في اللاهوت الأرثوذكسي والطوائف الأخرى',
                pages: 520,
                publishYear: 2017,
                language: 'العربية',
                isbn: '978-977-123-459-0',
                cover: 'linear-gradient(135deg, #805ad5, #b794f6)',
                rating: 4.6,
                downloads: 890,
                tags: ['لاهوت', 'مقارن', 'طوائف'],
                content: 'دراسة علمية مقارنة بين اللاهوت الأرثوذكسي والطوائف المسيحية الأخرى...',
                chapters: [
                    'أصول اللاهوت الأرثوذكسي',
                    'الخلافات العقائدية التاريخية',
                    'مجمع خلقدونية والانفصال',
                    'الحوار المسكوني المعاصر',
                    'نحو وحدة مسيحية'
                ]
            },
            // Saints Books
            {
                id: 'st_anthony_life',
                title: 'سيرة القديس الأنبا أنطونيوس',
                author: 'st_athanasius',
                category: 'saints',
                description: 'حياة أبو الرهبان ومؤسس الحياة الرهبانية',
                pages: 280,
                publishYear: 356,
                language: 'العربية',
                isbn: '978-977-123-460-6',
                cover: 'linear-gradient(135deg, #48bb78, #68d391)',
                rating: 4.9,
                downloads: 2100,
                tags: ['قديسين', 'رهبنة', 'أنبا أنطونيوس'],
                content: 'سيرة القديس الأنبا أنطونيوس كما كتبها القديس أثناسيوس الرسولي...',
                chapters: [
                    'النشأة والدعوة',
                    'بداية الحياة النسكية',
                    'محاربة الشياطين',
                    'تأسيس الرهبنة',
                    'تعاليمه الروحية'
                ]
            },
            {
                id: 'st_demiana',
                title: 'الشهيدة دميانة والأربعين عذراء',
                author: 'anba_isidoros',
                category: 'saints',
                description: 'قصة الشهيدة دميانة ورفيقاتها الأربعين عذراء',
                pages: 180,
                publishYear: 2021,
                language: 'العربية',
                isbn: '978-977-123-461-7',
                cover: 'linear-gradient(135deg, #f093fb, #f5576c)',
                rating: 4.8,
                downloads: 1320,
                tags: ['شهيدة', 'دميانة', 'عذارى'],
                content: 'قصة الشهيدة دميانة ابنة الوالي مرقس والأربعين عذراء اللواتي استشهدن معها...',
                chapters: [
                    'حياة دميانة المبكرة',
                    'تكريس الحياة لله',
                    'الاضطهاد والمحاكمة',
                    'الاستشهاد المجيد',
                    'إكرام الكنيسة للشهيدة'
                ]
            },
            // Prayer Books
            {
                id: 'agpeya',
                title: 'الأجبية المقدسة',
                author: 'church_tradition',
                category: 'prayers',
                description: 'كتاب الصلوات السبع اليومية في الكنيسة القبطية',
                pages: 420,
                publishYear: 2022,
                language: 'العربية والقبطية',
                isbn: '978-977-123-462-8',
                cover: 'linear-gradient(135deg, #ed8936, #f6ad55)',
                rating: 5.0,
                downloads: 3200,
                tags: ['صلوات', 'أجبية', 'طقوس'],
                content: 'الأجبية المقدسة تحتوي على الصلوات السبع اليومية التي تصليها الكنيسة...',
                chapters: [
                    'صلاة باكر',
                    'صلاة الساعة الثالثة',
                    'صلاة الساعة السادسة',
                    'صلاة الساعة التاسعة',
                    'صلاة الغروب',
                    'صلاة النوم',
                    'صلاة نصف الليل'
                ]
            },
            // Spiritual Books
            {
                id: 'spiritual_life',
                title: 'الحياة الروحية',
                author: 'anba_rafael',
                category: 'spiritual',
                description: 'دليل للحياة الروحية والنمو في الإيمان',
                pages: 350,
                publishYear: 2020,
                language: 'العربية',
                isbn: '978-977-123-463-9',
                cover: 'linear-gradient(135deg, #9f7aea, #d6bcfa)',
                rating: 4.7,
                downloads: 1680,
                tags: ['روحانيات', 'حياة روحية', 'نمو'],
                content: 'دليل شامل للحياة الروحية وكيفية النمو في الإيمان والقداسة...',
                chapters: [
                    'أساسيات الحياة الروحية',
                    'الصلاة والتأمل',
                    'الصوم والنسك',
                    'قراءة الكتاب المقدس',
                    'الخدمة والعطاء'
                ]
            }
        ];

        books.forEach(book => {
            this.books.set(book.id, book);
            // Update category count
            const category = this.categories.get(book.category);
            if (category) {
                category.count++;
            }
            // Add book to author
            const author = this.authors.get(book.author);
            if (author) {
                author.books.push(book.id);
            }
        });
    }

    loadUserData() {
        // Load user favorites and reading progress from localStorage
        const savedFavorites = localStorage.getItem('coptic_library_favorites');
        if (savedFavorites) {
            this.favorites = new Set(JSON.parse(savedFavorites));
        }

        const savedProgress = localStorage.getItem('coptic_library_progress');
        if (savedProgress) {
            this.readingProgress = new Map(JSON.parse(savedProgress));
        }

        const savedBookmarks = localStorage.getItem('coptic_library_bookmarks');
        if (savedBookmarks) {
            this.bookmarks = new Map(JSON.parse(savedBookmarks));
        }
    }

    saveUserData() {
        localStorage.setItem('coptic_library_favorites', JSON.stringify([...this.favorites]));
        localStorage.setItem('coptic_library_progress', JSON.stringify([...this.readingProgress]));
        localStorage.setItem('coptic_library_bookmarks', JSON.stringify([...this.bookmarks]));
    }

    // Render Functions
    renderLibraryInterface() {
        const libraryContainer = document.getElementById('libraryContainer');
        if (!libraryContainer) return;

        libraryContainer.innerHTML = `
            <div class="digital-library" style="background: #f7fafc; min-height: 100vh; padding: 2rem 0;">
                <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
                    <!-- Library Header -->
                    <div class="library-header" style="text-align: center; margin-bottom: 3rem;">
                        <h1 style="color: #2d3748; margin-bottom: 1rem; font-size: 2.5rem;">
                            <i class="fas fa-book" style="color: #d4af37; margin-left: 1rem;"></i>
                            المكتبة الرقمية القبطية
                        </h1>
                        <p style="color: #718096; font-size: 1.2rem; max-width: 600px; margin: 0 auto;">
                            مجموعة شاملة من الكتب والمراجع الأرثوذكسية للدراسة والبحث الروحي
                        </p>
                    </div>

                    <!-- Search and Filters -->
                    <div class="library-controls" style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                        <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 1rem; align-items: center;">
                            <div style="position: relative;">
                                <input type="text" 
                                       id="librarySearch" 
                                       placeholder="ابحث في المكتبة..." 
                                       style="width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid #e2e8f0; border-radius: 25px; font-size: 1rem;"
                                       oninput="copticLibrary.handleSearch(this.value)">
                                <i class="fas fa-search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #718096;"></i>
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button onclick="copticLibrary.setView('grid')" 
                                        class="view-btn ${this.currentView === 'grid' ? 'active' : ''}"
                                        style="padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; background: ${this.currentView === 'grid' ? '#4299e1' : 'white'}; color: ${this.currentView === 'grid' ? 'white' : '#4a5568'}; cursor: pointer;">
                                    <i class="fas fa-th"></i>
                                </button>
                                <button onclick="copticLibrary.setView('list')" 
                                        class="view-btn ${this.currentView === 'list' ? 'active' : ''}"
                                        style="padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; background: ${this.currentView === 'list' ? '#4299e1' : 'white'}; color: ${this.currentView === 'list' ? 'white' : '#4a5568'}; cursor: pointer;">
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                            <select id="categoryFilter" 
                                    onchange="copticLibrary.filterByCategory(this.value)"
                                    style="padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; background: white; cursor: pointer;">
                                <option value="all">جميع الفئات</option>
                                ${this.renderCategoryOptions()}
                            </select>
                        </div>
                    </div>

                    <!-- Categories Overview -->
                    <div class="categories-overview" style="margin-bottom: 3rem;">
                        <h3 style="color: #2d3748; margin-bottom: 1.5rem;">تصفح حسب الفئة</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                            ${this.renderCategoriesGrid()}
                        </div>
                    </div>

                    <!-- Books Display -->
                    <div class="books-section">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                            <h3 style="color: #2d3748; margin: 0;">
                                ${this.currentCategory === 'all' ? 'جميع الكتب' : this.categories.get(this.currentCategory)?.name || 'الكتب'}
                                <span style="color: #718096; font-weight: normal;">(${this.getFilteredBooks().length} كتاب)</span>
                            </h3>
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <span style="color: #718096; font-size: 0.9rem;">ترتيب حسب:</span>
                                <select onchange="copticLibrary.sortBooks(this.value)" style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 5px;">
                                    <option value="title">العنوان</option>
                                    <option value="author">المؤلف</option>
                                    <option value="rating">التقييم</option>
                                    <option value="downloads">التحميلات</option>
                                    <option value="year">سنة النشر</option>
                                </select>
                            </div>
                        </div>
                        <div id="booksGrid" class="books-grid">
                            ${this.renderBooks()}
                        </div>
                    </div>

                    <!-- Reading Statistics -->
                    <div class="reading-stats" style="margin-top: 3rem; background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="color: #2d3748; margin-bottom: 1.5rem;">إحصائيات القراءة</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                            ${this.renderReadingStats()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachLibraryEventListeners();
    }

    renderCategoryOptions() {
        let optionsHtml = '';
        this.categories.forEach(category => {
            optionsHtml += `<option value="${category.id}">${category.name}</option>`;
        });
        return optionsHtml;
    }

    renderCategoriesGrid() {
        let categoriesHtml = '';
        this.categories.forEach(category => {
            categoriesHtml += `
                <div class="category-card" 
                     onclick="copticLibrary.filterByCategory('${category.id}')"
                     style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; text-align: center;"
                     onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.15)'"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0,0,0,0.1)'">
                    <div style="width: 60px; height: 60px; background: ${category.color}; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                        <i class="${category.icon}"></i>
                    </div>
                    <h4 style="color: #2d3748; margin-bottom: 0.5rem;">${category.name}</h4>
                    <p style="color: #718096; font-size: 0.9rem; margin-bottom: 1rem;">${category.description}</p>
                    <span style="background: ${category.color}; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">
                        ${category.count} كتاب
                    </span>
                </div>
            `;
        });
        return categoriesHtml;
    }

    renderBooks() {
        const filteredBooks = this.getFilteredBooks();
        
        if (filteredBooks.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem; color: #718096;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>لا توجد كتب مطابقة للبحث</h3>
                    <p>جرب تغيير كلمات البحث أو الفئة</p>
                </div>
            `;
        }

        if (this.currentView === 'grid') {
            return this.renderBooksGrid(filteredBooks);
        } else {
            return this.renderBooksList(filteredBooks);
        }
    }

    renderBooksGrid(books) {
        let booksHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">';
        
        books.forEach(book => {
            const author = this.authors.get(book.author);
            const isFavorite = this.favorites.has(book.id);
            const progress = this.readingProgress.get(book.id) || 0;
            
            booksHtml += `
                <div class="book-card" style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;"
                     onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.15)'"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0,0,0,0.1)'"
                     onclick="copticLibrary.openBook('${book.id}')">
                    
                    <!-- Book Cover -->
                    <div style="height: 200px; background: ${book.cover}; position: relative; display: flex; align-items: center; justify-content: center;">
                        <div style="text-align: center; color: white;">
                            <i class="fas fa-book" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.8;"></i>
                            <h4 style="margin: 0; font-size: 1.1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${book.title}</h4>
                        </div>
                        
                        <!-- Favorite Button -->
                        <button onclick="event.stopPropagation(); copticLibrary.toggleFavorite('${book.id}')" 
                                style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s ease;"
                                onmouseover="this.style.transform='scale(1.1)'"
                                onmouseout="this.style.transform='scale(1)'">
                            <i class="fas fa-heart" style="color: ${isFavorite ? '#e53e3e' : '#718096'};"></i>
                        </button>
                        
                        <!-- Progress Bar -->
                        ${progress > 0 ? `
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: rgba(255,255,255,0.3);">
                                <div style="height: 100%; background: #48bb78; width: ${progress}%; transition: width 0.3s ease;"></div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Book Info -->
                    <div style="padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div style="flex: 1;">
                                <h3 style="color: #2d3748; margin: 0 0 0.5rem 0; font-size: 1.1rem; line-height: 1.3;">${book.title}</h3>
                                <p style="color: #4299e1; margin: 0; font-weight: 600; font-size: 0.9rem;">${author?.name || 'مؤلف غير معروف'}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.3rem; margin-right: 1rem;">
                                <i class="fas fa-star" style="color: #d4af37; font-size: 0.8rem;"></i>
                                <span style="color: #718096; font-size: 0.8rem; font-weight: 600;">${book.rating}</span>
                            </div>
                        </div>
                        
                        <p style="color: #718096; font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                            ${book.description}
                        </p>
                        
                        <!-- Book Meta -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.8rem; color: #718096;">
                            <span><i class="fas fa-file-alt" style="margin-left: 0.3rem;"></i>${book.pages} صفحة</span>
                            <span><i class="fas fa-download" style="margin-left: 0.3rem;"></i>${book.downloads}</span>
                            <span><i class="fas fa-calendar" style="margin-left: 0.3rem;"></i>${book.publishYear}</span>
                        </div>
                        
                        <!-- Tags -->
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                            ${book.tags.slice(0, 3).map(tag => `
                                <span style="background: #f7fafc; color: #4a5568; padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.7rem;">${tag}</span>
                            `).join('')}
                        </div>
                        
                        <!-- Action Buttons -->
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="event.stopPropagation(); copticLibrary.readBook('${book.id}')" 
                                    style="flex: 1; background: #4299e1; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background 0.3s ease;"
                                    onmouseover="this.style.background='#3182ce'"
                                    onmouseout="this.style.background='#4299e1'">
                                <i class="fas fa-book-open" style="margin-left: 0.5rem;"></i>قراءة
                            </button>
                            <button onclick="event.stopPropagation(); copticLibrary.downloadBook('${book.id}')" 
                                    style="background: #48bb78; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; transition: background 0.3s ease;"
                                    onmouseover="this.style.background='#38a169'"
                                    onmouseout="this.style.background='#48bb78'"
                                    title="تحميل">
                                <i class="fas fa-download"></i>
                            </button>
                            <button onclick="event.stopPropagation(); copticLibrary.shareBook('${book.id}')" 
                                    style="background: #ed8936; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer; transition: background 0.3s ease;"
                                    onmouseover="this.style.background='#dd6b20'"
                                    onmouseout="this.style.background='#ed8936'"
                                    title="مشاركة">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        booksHtml += '</div>';
        return booksHtml;
    }

    renderBooksList(books) {
        let booksHtml = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
        
        books.forEach(book => {
            const author = this.authors.get(book.author);
            const isFavorite = this.favorites.has(book.id);
            const progress = this.readingProgress.get(book.id) || 0;
            
            booksHtml += `
                <div class="book-list-item" style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: flex; gap: 1.5rem; align-items: center; cursor: pointer; transition: transform 0.3s ease;"
                     onmouseover="this.style.transform='translateX(5px)'"
                     onmouseout="this.style.transform='translateX(0)'"
                     onclick="copticLibrary.openBook('${book.id}')">
                    
                    <!-- Book Cover Thumbnail -->
                    <div style="width: 80px; height: 100px; background: ${book.cover}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
                        <i class="fas fa-book" style="font-size: 1.5rem; opacity: 0.8;"></i>
                    </div>
                    
                    <!-- Book Info -->
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <h3 style="color: #2d3748; margin: 0; font-size: 1.2rem;">${book.title}</h3>
                            <button onclick="event.stopPropagation(); copticLibrary.toggleFavorite('${book.id}')" 
                                    style="background: none; border: none; cursor: pointer; padding: 0.5rem;">
                                <i class="fas fa-heart" style="color: ${isFavorite ? '#e53e3e' : '#718096'};"></i>
                            </button>
                        </div>
                        
                        <p style="color: #4299e1; margin: 0 0 0.5rem 0; font-weight: 600;">${author?.name || 'مؤلف غير معروف'}</p>
                        <p style="color: #718096; margin: 0 0 1rem 0; line-height: 1.4;">${book.description}</p>
                        
                        <div style="display: flex; gap: 2rem; align-items: center; font-size: 0.9rem; color: #718096;">
                            <span><i class="fas fa-file-alt" style="margin-left: 0.3rem;"></i>${book.pages} صفحة</span>
                            <span><i class="fas fa-star" style="margin-left: 0.3rem; color: #d4af37;"></i>${book.rating}</span>
                            <span><i class="fas fa-download" style="margin-left: 0.3rem;"></i>${book.downloads}</span>
                            <span><i class="fas fa-calendar" style="margin-left: 0.3rem;"></i>${book.publishYear}</span>
                        </div>
                        
                        ${progress > 0 ? `
                            <div style="margin-top: 1rem;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                                    <span style="font-size: 0.8rem; color: #718096;">تقدم القراءة</span>
                                    <span style="font-size: 0.8rem; color: #48bb78; font-weight: 600;">${progress}%</span>
                                </div>
                                <div style="height: 4px; background: #e2e8f0; border-radius: 2px;">
                                    <div style="height: 100%; background: #48bb78; width: ${progress}%; border-radius: 2px; transition: width 0.3s ease;"></div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Action Buttons -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;">
                        <button onclick="event.stopPropagation(); copticLibrary.readBook('${book.id}')" 
                                style="background: #4299e1; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600; white-space: nowrap;">
                            <i class="fas fa-book-open" style="margin-left: 0.5rem;"></i>قراءة
                        </button>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="event.stopPropagation(); copticLibrary.downloadBook('${book.id}')" 
                                    style="background: #48bb78; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;" title="تحميل">
                                <i class="fas fa-download"></i>
                            </button>
                            <button onclick="event.stopPropagation(); copticLibrary.shareBook('${book.id}')" 
                                    style="background: #ed8936; color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;" title="مشاركة">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        booksHtml += '</div>';
        return booksHtml;
    }

    renderReadingStats() {
        const totalBooks = this.books.size;
        const readBooks = this.readingProgress.size;
        const favoriteBooks = this.favorites.size;
        const completedBooks = Array.from(this.readingProgress.values()).filter(progress => progress === 100).length;

        return `
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #4299e1; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="fas fa-book"></i>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 0.5rem 0;">إجمالي الكتب</h4>
                <p style="color: #4299e1; font-size: 2rem; font-weight: 700; margin: 0;">${totalBooks}</p>
            </div>
            
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #48bb78; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="fas fa-book-open"></i>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 0.5rem 0;">قيد القراءة</h4>
                <p style="color: #48bb78; font-size: 2rem; font-weight: 700; margin: 0;">${readBooks}</p>
            </div>
            
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #e53e3e; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="fas fa-heart"></i>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 0.5rem 0;">المفضلة</h4>
                <p style="color: #e53e3e; font-size: 2rem; font-weight: 700; margin: 0;">${favoriteBooks}</p>
            </div>
            
            <div style="text-align: center;">
                <div style="width: 60px; height: 60px; background: #d4af37; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 0.5rem 0;">مكتملة</h4>
                <p style="color: #d4af37; font-size: 2rem; font-weight: 700; margin: 0;">${completedBooks}</p>
            </div>
        `;
    }

    // Event Handlers and Functions
    attachLibraryEventListeners() {
        // Search functionality is handled by oninput in the HTML
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.updateBooksDisplay();
    }

    filterByCategory(categoryId) {
        this.currentCategory = categoryId;
        document.getElementById('categoryFilter').value = categoryId;
        this.updateBooksDisplay();
    }

    setView(view) {
        this.currentView = view;
        this.updateBooksDisplay();
        
        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'white';
            btn.style.color = '#4a5568';
        });
        
        const activeBtn = document.querySelector(`[onclick="copticLibrary.setView('${view}')"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.style.background = '#4299e1';
            activeBtn.style.color = 'white';
        }
    }

    sortBooks(criteria) {
        // This would implement sorting logic
        console.log('Sorting by:', criteria);
        this.updateBooksDisplay();
    }

    getFilteredBooks() {
        let filteredBooks = Array.from(this.books.values());

        // Filter by category
        if (this.currentCategory !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.category === this.currentCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(this.searchQuery) ||
                book.description.toLowerCase().includes(this.searchQuery) ||
                book.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)) ||
                this.authors.get(book.author)?.name.toLowerCase().includes(this.searchQuery)
            );
        }

        return filteredBooks;
    }

    updateBooksDisplay() {
        const booksGrid = document.getElementById('booksGrid');
        if (booksGrid) {
            booksGrid.innerHTML = this.renderBooks();
        }
    }

    // Book Actions
    openBook(bookId) {
        const book = this.books.get(bookId);
        if (!book) return;

        // Create book reader modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 15px; max-width: 800px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;">
                <!-- Modal Header -->
                <div style="padding: 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; color: #2d3748;">${book.title}</h3>
                    <button onclick="document.body.removeChild(this.closest('.book-modal'))" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #718096;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <!-- Book Content -->
                <div style="flex: 1; overflow-y: auto; padding: 2rem;">
                    <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
                        <div style="width: 120px; height: 150px; background: ${book.cover}; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
                            <i class="fas fa-book" style="font-size: 2rem; opacity: 0.8;"></i>
                        </div>
                        <div style="flex: 1;">
                            <h2 style="color: #2d3748; margin: 0 0 0.5rem 0;">${book.title}</h2>
                            <p style="color: #4299e1; margin: 0 0 1rem 0; font-weight: 600;">${this.authors.get(book.author)?.name}</p>
                            <p style="color: #718096; line-height: 1.6; margin-bottom: 1rem;">${book.description}</p>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                                <div><strong>الصفحات:</strong> ${book.pages}</div>
                                <div><strong>التقييم:</strong> ⭐ ${book.rating}</div>
                                <div><strong>النشر:</strong> ${book.publishYear}</div>
                                <div><strong>اللغة:</strong> ${book.language}</div>
                            </div>
                            
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                ${book.tags.map(tag => `<span style="background: #f7fafc; color: #4a5568; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Table of Contents -->
                    <div style="margin-bottom: 2rem;">
                        <h4 style="color: #2d3748; margin-bottom: 1rem;">فهرس المحتويات</h4>
                        <div style="background: #f7fafc; padding: 1.5rem; border-radius: 10px;">
                            ${book.chapters.map((chapter, index) => `
                                <div style="padding: 0.8rem 0; border-bottom: 1px solid #e2e8f0; cursor: pointer; transition: color 0.3s ease;" 
                                     onmouseover="this.style.color='#4299e1'" 
                                     onmouseout="this.style.color='#2d3748'"
                                     onclick="copticLibrary.goToChapter('${bookId}', ${index})">
                                    <span style="color: #718096; margin-left: 1rem;">${index + 1}.</span>
                                    ${chapter}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Book Preview -->
                    <div>
                        <h4 style="color: #2d3748; margin-bottom: 1rem;">معاينة الكتاب</h4>
                        <div style="background: #f7fafc; padding: 2rem; border-radius: 10px; line-height: 1.8; color: #4a5568;">
                            ${book.content}
                        </div>
                    </div>
                </div>
                
                <!-- Modal Footer -->
                <div style="padding: 1.5rem; border-top: 1px solid #e2e8f0; display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="copticLibrary.toggleFavorite('${bookId}'); this.innerHTML='<i class=\\"fas fa-heart\\"></i> ${this.favorites.has(bookId) ? 'إزالة من' : 'إضافة إلى'} المفضلة'" 
                            style="background: #e53e3e; color: white; border: none; padding: 1rem 1.5rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-heart"></i> ${this.favorites.has(bookId) ? 'إزالة من' : 'إضافة إلى'} المفضلة
                    </button>
                    <button onclick="copticLibrary.downloadBook('${bookId}')" 
                            style="background: #48bb78; color: white; border: none; padding: 1rem 1.5rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-download"></i> تحميل
                    </button>
                    <button onclick="copticLibrary.readBook('${bookId}')" 
                            style="background: #4299e1; color: white; border: none; padding: 1rem 1.5rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-book-open"></i> بدء القراءة
                    </button>
                </div>
            </div>
        `;

        modal.className = 'book-modal';
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    readBook(bookId) {
        const book = this.books.get(bookId);
        if (!book) return;

        // Simulate starting to read
        if (!this.readingProgress.has(bookId)) {
            this.readingProgress.set(bookId, 5); // Start with 5% progress
        }

        this.saveUserData();
        this.showNotification(`بدأت قراءة: ${book.title}`, 'success');
        
        // Close any open modals
        const modal = document.querySelector('.book-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        
        // Update display
        this.updateBooksDisplay();
    }

    downloadBook(bookId) {
        const book = this.books.get(bookId);
        if (!book) return;

        // Simulate download
        this.showNotification(`جاري تحميل: ${book.title}`, 'info');
        
        setTimeout(() => {
            this.showNotification(`تم تحميل الكتاب بنجاح!`, 'success');
            // Update download count
            book.downloads++;
            this.updateBooksDisplay();
        }, 2000);
    }

    shareBook(bookId) {
        const book = this.books.get(bookId);
        if (!book) return;

        // Create share options
        const shareText = `اقرأ كتاب "${book.title}" في المكتبة الرقمية القبطية`;
        
        if (navigator.share) {
            navigator.share({
                title: book.title,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('تم نسخ رابط الكتاب!', 'success');
            });
        }
    }

    toggleFavorite(bookId) {
        if (this.favorites.has(bookId)) {
            this.favorites.delete(bookId);
            this.showNotification('تم إزالة الكتاب من المفضلة', 'info');
        } else {
            this.favorites.add(bookId);
            this.showNotification('تم إضافة الكتاب إلى المفضلة', 'success');
        }
        
        this.saveUserData();
        this.updateBooksDisplay();
    }

    goToChapter(bookId, chapterIndex) {
        const book = this.books.get(bookId);
        if (!book) return;

        // Simulate going to chapter
        const progress = Math.min(100, (chapterIndex + 1) * (100 / book.chapters.length));
        this.readingProgress.set(bookId, Math.round(progress));
        this.saveUserData();
        
        this.showNotification(`انتقلت إلى: ${book.chapters[chapterIndex]}`, 'info');
    }

    showNotification(message, type = 'info') {
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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize global library system
window.copticLibrary = new CopticDigitalLibrary();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('libraryContainer')) {
        copticLibrary.renderLibraryInterface();
    }
});

console.log('📚 المكتبة الرقمية القبطية جاهزة!');
