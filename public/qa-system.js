// Interactive Q&A System for Coptic Orthodox Website
class CopticQASystem {
    constructor() {
        this.questions = new Map();
        this.categories = new Map();
        this.experts = new Map();
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'recent';
        this.userQuestions = new Map();
        this.favorites = new Set();
        this.initializeSystem();
    }

    initializeSystem() {
        this.setupCategories();
        this.setupExperts();
        this.setupQuestions();
        this.loadUserData();
    }

    setupCategories() {
        const categories = [
            {
                id: 'faith',
                name: 'الإيمان والعقيدة',
                description: 'أسئلة حول العقائد الأرثوذكسية والإيمان المسيحي',
                icon: 'fas fa-cross',
                color: '#4299e1',
                count: 0
            },
            {
                id: 'prayers',
                name: 'الصلوات والطقوس',
                description: 'أسئلة حول الصلوات والطقوس الكنسية',
                icon: 'fas fa-praying-hands',
                color: '#ed8936',
                count: 0
            },
            {
                id: 'fasting',
                name: 'الصوم والنسك',
                description: 'أسئلة حول الأصوام والحياة النسكية',
                icon: 'fas fa-moon',
                color: '#9f7aea',
                count: 0
            },
            {
                id: 'sacraments',
                name: 'الأسرار الكنسية',
                description: 'أسئلة حول الأسرار السبعة في الكنيسة',
                icon: 'fas fa-dove',
                color: '#48bb78',
                count: 0
            },
            {
                id: 'bible',
                name: 'الكتاب المقدس',
                description: 'أسئلة حول تفسير وفهم الكتاب المقدس',
                icon: 'fas fa-book-open',
                color: '#d4af37',
                count: 0
            },
            {
                id: 'saints',
                name: 'القديسين والشهداء',
                description: 'أسئلة حول سير القديسين والشهداء',
                icon: 'fas fa-user-friends',
                color: '#f56565',
                count: 0
            },
            {
                id: 'family',
                name: 'الحياة الأسرية',
                description: 'أسئلة حول الزواج والأسرة المسيحية',
                icon: 'fas fa-home',
                color: '#38b2ac',
                count: 0
            },
            {
                id: 'youth',
                name: 'الشباب والخدمة',
                description: 'أسئلة خاصة بالشباب والخدمة الكنسية',
                icon: 'fas fa-users',
                color: '#805ad5',
                count: 0
            }
        ];

        categories.forEach(category => {
            this.categories.set(category.id, category);
        });
    }

    setupExperts() {
        const experts = [
            {
                id: 'anba_rafael',
                name: 'الأنبا رافائيل',
                title: 'أسقف عام وسط القاهرة',
                specialties: ['faith', 'prayers', 'sacraments'],
                avatar: '👨‍💼',
                bio: 'أسقف عام وسط القاهرة، متخصص في اللاهوت والروحانيات',
                answersCount: 156,
                rating: 4.9
            },
            {
                id: 'anba_bishoy',
                name: 'الأنبا بيشوي',
                title: 'مطران دمياط',
                specialties: ['faith', 'bible', 'sacraments'],
                avatar: '👨‍💼',
                bio: 'مطران دمياط، عالم لاهوت ومؤلف',
                answersCount: 203,
                rating: 4.8
            },
            {
                id: 'fr_yohanna',
                name: 'أبونا يوحنا',
                title: 'كاهن كنيسة العذراء',
                specialties: ['prayers', 'fasting', 'family'],
                avatar: '👨‍💼',
                bio: 'كاهن خبير في الطقوس والحياة الروحية',
                answersCount: 89,
                rating: 4.7
            },
            {
                id: 'fr_antonios',
                name: 'أبونا أنطونيوس',
                title: 'كاهن خدمة الشباب',
                specialties: ['youth', 'family', 'saints'],
                avatar: '👨‍💼',
                bio: 'كاهن متخصص في خدمة الشباب والأسرة',
                answersCount: 67,
                rating: 4.6
            }
        ];

        experts.forEach(expert => {
            this.experts.set(expert.id, expert);
        });
    }

    setupQuestions() {
        const questions = [
            {
                id: 'q1',
                question: 'ما هي أسس الإيمان الأرثوذكسي؟',
                category: 'faith',
                askedBy: 'مريم أحمد',
                askedDate: new Date(Date.now() - 86400000 * 2),
                views: 245,
                likes: 18,
                isAnswered: true,
                isFeatured: true,
                tags: ['إيمان', 'عقيدة', 'أرثوذكسية'],
                answer: {
                    expertId: 'anba_bishoy',
                    content: 'الإيمان الأرثوذكسي يقوم على ثلاثة أسس رئيسية:\n\n1. **الكتاب المقدس**: كلمة الله المكتوبة بعهديها القديم والجديد\n2. **التقليد الرسولي**: التعاليم التي تسلمناها من الرسل والآباء\n3. **قرارات المجامع المسكونية**: خاصة المجامع السبعة الأولى\n\nهذه الأسس الثلاثة تشكل معاً أساس إيماننا الأرثوذكسي القويم.',
                    answeredDate: new Date(Date.now() - 86400000),
                    likes: 32,
                    isVerified: true
                }
            },
            {
                id: 'q2',
                question: 'كيف نصوم الصوم الكبير بطريقة صحيحة؟',
                category: 'fasting',
                askedBy: 'يوسف مرقس',
                askedDate: new Date(Date.now() - 86400000 * 5),
                views: 189,
                likes: 15,
                isAnswered: true,
                tags: ['صوم', 'صوم كبير', 'نسك'],
                answer: {
                    expertId: 'fr_yohanna',
                    content: 'الصوم الكبير له ثلاثة جوانب أساسية:\n\n**1. الصوم الجسدي:**\n- الامتناع عن المنتجات الحيوانية\n- تقليل كمية الطعام\n- تأخير وقت الإفطار\n\n**2. الصوم الروحي:**\n- زيادة الصلوات والتسابيح\n- قراءة الكتاب المقدس والكتب الروحية\n- التوبة والاعتراف\n\n**3. الصوم الاجتماعي:**\n- العطاء والصدقة\n- خدمة المحتاجين\n- المصالحة مع الآخرين\n\nالهدف هو تطهير النفس والجسد للاستعداد لعيد القيامة المجيد.',
                    answeredDate: new Date(Date.now() - 86400000 * 3),
                    likes: 28,
                    isVerified: true
                }
            },
            {
                id: 'q3',
                question: 'ما هي الأسرار السبعة في الكنيسة القبطية؟',
                category: 'sacraments',
                askedBy: 'مارثا جرجس',
                askedDate: new Date(Date.now() - 86400000 * 7),
                views: 312,
                likes: 25,
                isAnswered: true,
                tags: ['أسرار', 'كنيسة', 'طقوس'],
                answer: {
                    expertId: 'anba_rafael',
                    content: 'الأسرار السبعة في الكنيسة القبطية الأرثوذكسية هي:\n\n1. **المعمودية**: ولادة جديدة في المسيح\n2. **الميرون**: ختم الروح القدس\n3. **الإفخارستيا**: التناول من جسد ودم المسيح\n4. **التوبة**: الاعتراف ونيل الحل والغفران\n5. **مسحة المرضى**: للشفاء الروحي والجسدي\n6. **الكهنوت**: سيامة الخدام\n7. **الزواج**: اقتران الرجل والمرأة في المسيح\n\nكل سر له طقوسه وصلواته الخاصة، ويمنح نعمة إلهية خاصة.',
                    answeredDate: new Date(Date.now() - 86400000 * 5),
                    likes: 41,
                    isVerified: true
                }
            },
            {
                id: 'q4',
                question: 'كيف نفهم سر التجسد الإلهي؟',
                category: 'faith',
                askedBy: 'جرجس سمير',
                askedDate: new Date(Date.now() - 86400000 * 10),
                views: 156,
                likes: 12,
                isAnswered: true,
                tags: ['تجسد', 'لاهوت', 'ناسوت'],
                answer: {
                    expertId: 'anba_bishoy',
                    content: 'سر التجسد هو أعظم أسرار الإيمان المسيحي:\n\n**المعنى**: الله الكلمة اتخذ جسداً بشرياً من العذراء مريم\n\n**الهدف**:\n- خلاص البشرية من الخطية\n- المصالحة بين الله والإنسان\n- إعطاء الحياة الأبدية\n\n**الطبيعة**: المسيح له طبيعة واحدة من طبيعتين (لاهوت وناسوت) بغير اختلاط ولا امتزاج ولا تغيير\n\n**النتيجة**: "صار إنساناً ليجعلنا آلهة بالنعمة" كما يقول القديس أثناسيوس',
                    answeredDate: new Date(Date.now() - 86400000 * 8),
                    likes: 35,
                    isVerified: true
                }
            },
            {
                id: 'q5',
                question: 'ما هي أهمية صلاة الأجبية؟',
                category: 'prayers',
                askedBy: 'مينا فايز',
                askedDate: new Date(Date.now() - 86400000 * 3),
                views: 98,
                likes: 8,
                isAnswered: true,
                tags: ['أجبية', 'صلوات', 'سواعي'],
                answer: {
                    expertId: 'fr_yohanna',
                    content: 'الأجبية (صلوات السواعي) لها أهمية عظيمة:\n\n**الهدف الروحي**:\n- تقديس الوقت لله\n- الصلاة المستمرة كما أوصى الرب\n- التأمل في أعمال الله\n\n**السواعي السبع**:\n1. باكر - بداية اليوم مع الله\n2. الثالثة - تذكار حلول الروح القدس\n3. السادسة - تذكار صلب المسيح\n4. التاسعة - تذكار موت المسيح\n5. الغروب - شكر الله على اليوم\n6. النوم - تسليم النفس لله\n7. نصف الليل - السهر مع المسيح\n\n**الفائدة**: تنظيم الحياة الروحية وربط القلب بالله طوال اليوم',
                    answeredDate: new Date(Date.now() - 86400000),
                    likes: 19,
                    isVerified: true
                }
            },
            {
                id: 'q6',
                question: 'كيف نربي أطفالنا تربية مسيحية؟',
                category: 'family',
                askedBy: 'أم مريم',
                askedDate: new Date(Date.now() - 86400000 * 6),
                views: 203,
                likes: 22,
                isAnswered: true,
                tags: ['تربية', 'أطفال', 'أسرة'],
                answer: {
                    expertId: 'fr_antonios',
                    content: 'التربية المسيحية للأطفال تحتاج إلى:\n\n**1. القدوة الحية**:\n- عيش الإيمان أمام الأطفال\n- الصلاة العائلية المنتظمة\n- المحبة والتسامح في البيت\n\n**2. التعليم التدريجي**:\n- قصص الكتاب المقدس\n- سير القديسين\n- تعليم الصلوات البسيطة\n\n**3. الممارسة العملية**:\n- الذهاب للكنيسة معاً\n- المشاركة في الخدمة\n- العطاء والصدقة\n\n**4. الحب والحزم**:\n- التأديب بمحبة\n- وضع حدود واضحة\n- التشجيع والمكافأة\n\nالهدف هو تكوين شخصية مسيحية متوازنة',
                    answeredDate: new Date(Date.now() - 86400000 * 4),
                    likes: 31,
                    isVerified: true
                }
            },
            // Unanswered questions
            {
                id: 'q7',
                question: 'ما هو الفرق بين الكنيسة القبطية والكنائس الأخرى؟',
                category: 'faith',
                askedBy: 'بولس عادل',
                askedDate: new Date(Date.now() - 86400000),
                views: 45,
                likes: 3,
                isAnswered: false,
                tags: ['كنيسة قبطية', 'طوائف', 'اختلافات']
            },
            {
                id: 'q8',
                question: 'كيف نتعامل مع الشكوك الإيمانية؟',
                category: 'faith',
                askedBy: 'سارة يوسف',
                askedDate: new Date(Date.now() - 86400000 * 2),
                views: 67,
                likes: 5,
                isAnswered: false,
                tags: ['شكوك', 'إيمان', 'روحانيات']
            }
        ];

        questions.forEach(question => {
            this.questions.set(question.id, question);
            // Update category count
            const category = this.categories.get(question.category);
            if (category) {
                category.count++;
            }
        });
    }

    loadUserData() {
        const savedFavorites = localStorage.getItem('coptic_qa_favorites');
        if (savedFavorites) {
            this.favorites = new Set(JSON.parse(savedFavorites));
        }

        const savedUserQuestions = localStorage.getItem('coptic_qa_user_questions');
        if (savedUserQuestions) {
            this.userQuestions = new Map(JSON.parse(savedUserQuestions));
        }
    }

    saveUserData() {
        localStorage.setItem('coptic_qa_favorites', JSON.stringify([...this.favorites]));
        localStorage.setItem('coptic_qa_user_questions', JSON.stringify([...this.userQuestions]));
    }

    // Render Functions
    renderQAInterface() {
        const qaContainer = document.getElementById('qaContainer');
        if (!qaContainer) return;

        qaContainer.innerHTML = `
            <div class="qa-system" style="background: #f7fafc; min-height: 100vh; padding: 2rem 0;">
                <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
                    <!-- Q&A Header -->
                    <div class="qa-header" style="text-align: center; margin-bottom: 3rem;">
                        <h1 style="color: #2d3748; margin-bottom: 1rem; font-size: 2.5rem;">
                            <i class="fas fa-question-circle" style="color: #4299e1; margin-left: 1rem;"></i>
                            الأسئلة والأجوبة
                        </h1>
                        <p style="color: #718096; font-size: 1.2rem; max-width: 600px; margin: 0 auto 2rem;">
                            اطرح أسئلتك الروحية واحصل على إجابات من خبراء الكنيسة القبطية الأرثوذكسية
                        </p>
                        <button onclick="copticQA.showAskQuestionModal()" 
                                style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: transform 0.3s ease; box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);"
                                onmouseover="this.style.transform='translateY(-2px)'"
                                onmouseout="this.style.transform='translateY(0)'">
                            <i class="fas fa-plus" style="margin-left: 0.5rem;"></i>اطرح سؤالاً جديداً
                        </button>
                    </div>

                    <!-- Search and Filters -->
                    <div class="qa-controls" style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                        <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
                            <div style="position: relative;">
                                <input type="text" 
                                       id="qaSearch" 
                                       placeholder="ابحث في الأسئلة والأجوبة..." 
                                       style="width: 100%; padding: 1rem 1rem 1rem 3rem; border: 2px solid #e2e8f0; border-radius: 25px; font-size: 1rem;"
                                       oninput="copticQA.handleSearch(this.value)">
                                <i class="fas fa-search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #718096;"></i>
                            </div>
                            <select id="categoryFilter" 
                                    onchange="copticQA.filterByCategory(this.value)"
                                    style="padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; background: white; cursor: pointer;">
                                <option value="all">جميع الفئات</option>
                                ${this.renderCategoryOptions()}
                            </select>
                            <select id="sortFilter" 
                                    onchange="copticQA.sortQuestions(this.value)"
                                    style="padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; background: white; cursor: pointer;">
                                <option value="recent">الأحدث</option>
                                <option value="popular">الأكثر شعبية</option>
                                <option value="unanswered">غير مجاب</option>
                                <option value="answered">مجاب</option>
                            </select>
                        </div>

                        <!-- Quick Stats -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                            ${this.renderQuickStats()}
                        </div>
                    </div>

                    <!-- Categories Grid -->
                    <div class="categories-section" style="margin-bottom: 3rem;">
                        <h3 style="color: #2d3748; margin-bottom: 1.5rem;">تصفح حسب الموضوع</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                            ${this.renderCategoriesGrid()}
                        </div>
                    </div>

                    <!-- Featured Questions -->
                    ${this.renderFeaturedQuestions()}

                    <!-- Questions List -->
                    <div class="questions-section">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                            <h3 style="color: #2d3748; margin: 0;">
                                ${this.currentCategory === 'all' ? 'جميع الأسئلة' : this.categories.get(this.currentCategory)?.name || 'الأسئلة'}
                                <span style="color: #718096; font-weight: normal;">(${this.getFilteredQuestions().length} سؤال)</span>
                            </h3>
                        </div>
                        <div id="questionsList">
                            ${this.renderQuestions()}
                        </div>
                    </div>

                    <!-- Experts Section -->
                    <div class="experts-section" style="margin-top: 3rem; background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h3 style="color: #2d3748; margin-bottom: 1.5rem;">خبراء الإجابة</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                            ${this.renderExperts()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachQAEventListeners();
    }

    renderCategoryOptions() {
        let optionsHtml = '';
        this.categories.forEach(category => {
            optionsHtml += `<option value="${category.id}">${category.name}</option>`;
        });
        return optionsHtml;
    }

    renderQuickStats() {
        const totalQuestions = this.questions.size;
        const answeredQuestions = Array.from(this.questions.values()).filter(q => q.isAnswered).length;
        const unansweredQuestions = totalQuestions - answeredQuestions;
        const totalViews = Array.from(this.questions.values()).reduce((sum, q) => sum + q.views, 0);

        return `
            <div style="text-align: center; padding: 1rem; background: #f7fafc; border-radius: 10px;">
                <div style="color: #4299e1; font-size: 1.5rem; font-weight: 700;">${totalQuestions}</div>
                <div style="color: #718096; font-size: 0.9rem;">إجمالي الأسئلة</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: #f0fff4; border-radius: 10px;">
                <div style="color: #48bb78; font-size: 1.5rem; font-weight: 700;">${answeredQuestions}</div>
                <div style="color: #718096; font-size: 0.9rem;">أسئلة مجابة</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: #fffaf0; border-radius: 10px;">
                <div style="color: #ed8936; font-size: 1.5rem; font-weight: 700;">${unansweredQuestions}</div>
                <div style="color: #718096; font-size: 0.9rem;">في انتظار الإجابة</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: #fef5e7; border-radius: 10px;">
                <div style="color: #d4af37; font-size: 1.5rem; font-weight: 700;">${totalViews}</div>
                <div style="color: #718096; font-size: 0.9rem;">إجمالي المشاهدات</div>
            </div>
        `;
    }

    renderCategoriesGrid() {
        let categoriesHtml = '';
        this.categories.forEach(category => {
            categoriesHtml += `
                <div class="category-card" 
                     onclick="copticQA.filterByCategory('${category.id}')"
                     style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; border-left: 4px solid ${category.color};"
                     onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'"
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0,0,0,0.1)'">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="width: 50px; height: 50px; background: ${category.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                            <i class="${category.icon}"></i>
                        </div>
                        <div style="flex: 1;">
                            <h4 style="color: #2d3748; margin: 0 0 0.3rem 0;">${category.name}</h4>
                            <span style="color: ${category.color}; font-weight: 600; font-size: 0.9rem;">${category.count} سؤال</span>
                        </div>
                    </div>
                    <p style="color: #718096; font-size: 0.9rem; margin: 0; line-height: 1.4;">${category.description}</p>
                </div>
            `;
        });
        return categoriesHtml;
    }

    renderFeaturedQuestions() {
        const featuredQuestions = Array.from(this.questions.values()).filter(q => q.isFeatured && q.isAnswered);
        
        if (featuredQuestions.length === 0) return '';

        return `
            <div class="featured-section" style="margin-bottom: 3rem;">
                <h3 style="color: #2d3748; margin-bottom: 1.5rem;">
                    <i class="fas fa-star" style="color: #d4af37; margin-left: 0.5rem;"></i>
                    أسئلة مميزة
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
                    ${featuredQuestions.slice(0, 3).map(question => this.renderFeaturedQuestionCard(question)).join('')}
                </div>
            </div>
        `;
    }

    renderFeaturedQuestionCard(question) {
        const expert = this.experts.get(question.answer.expertId);
        const category = this.categories.get(question.category);

        return `
            <div class="featured-question" 
                 onclick="copticQA.openQuestion('${question.id}')"
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 15px; cursor: pointer; transition: transform 0.3s ease; position: relative; overflow: hidden;"
                 onmouseover="this.style.transform='translateY(-5px)'"
                 onmouseout="this.style.transform='translateY(0)'">
                
                <div style="position: absolute; top: 1rem; right: 1rem;">
                    <i class="fas fa-star" style="color: #ffd700; font-size: 1.2rem;"></i>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <span style="background: rgba(255,255,255,0.2); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">
                        ${category.name}
                    </span>
                </div>
                
                <h4 style="color: white; margin: 0 0 1rem 0; line-height: 1.4; font-size: 1.1rem;">${question.question}</h4>
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        ${expert.avatar}
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">${expert.name}</div>
                        <div style="opacity: 0.8; font-size: 0.8rem;">${expert.title}</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; opacity: 0.9;">
                    <span><i class="fas fa-eye" style="margin-left: 0.3rem;"></i>${question.views}</span>
                    <span><i class="fas fa-heart" style="margin-left: 0.3rem;"></i>${question.likes}</span>
                    <span><i class="fas fa-clock" style="margin-left: 0.3rem;"></i>${this.formatDate(question.askedDate)}</span>
                </div>
            </div>
        `;
    }

    renderQuestions() {
        const filteredQuestions = this.getFilteredQuestions();
        
        if (filteredQuestions.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem; color: #718096;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>لا توجد أسئلة مطابقة للبحث</h3>
                    <p>جرب تغيير كلمات البحث أو الفئة</p>
                </div>
            `;
        }

        return filteredQuestions.map(question => this.renderQuestionCard(question)).join('');
    }

    renderQuestionCard(question) {
        const category = this.categories.get(question.category);
        const isFavorite = this.favorites.has(question.id);
        
        return `
            <div class="question-card" style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 1.5rem; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;"
                 onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'"
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0,0,0,0.1)'"
                 onclick="copticQA.openQuestion('${question.id}')">
                
                <!-- Question Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                            <span style="background: ${category.color}; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">
                                ${category.name}
                            </span>
                            ${question.isAnswered ? 
                                '<span style="background: #48bb78; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;"><i class="fas fa-check"></i> مجاب</span>' : 
                                '<span style="background: #ed8936; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;"><i class="fas fa-clock"></i> في الانتظار</span>'
                            }
                            ${question.isFeatured ? '<i class="fas fa-star" style="color: #d4af37;"></i>' : ''}
                        </div>
                        <h3 style="color: #2d3748; margin: 0; line-height: 1.4; font-size: 1.2rem;">${question.question}</h3>
                    </div>
                    <button onclick="event.stopPropagation(); copticQA.toggleFavorite('${question.id}')" 
                            style="background: none; border: none; cursor: pointer; padding: 0.5rem; color: ${isFavorite ? '#e53e3e' : '#718096'}; transition: color 0.3s ease;">
                        <i class="fas fa-heart" style="font-size: 1.2rem;"></i>
                    </button>
                </div>
                
                <!-- Question Meta -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; color: #718096; font-size: 0.9rem;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span><i class="fas fa-user" style="margin-left: 0.3rem;"></i>${question.askedBy}</span>
                        <span><i class="fas fa-calendar" style="margin-left: 0.3rem;"></i>${this.formatDate(question.askedDate)}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <span><i class="fas fa-eye" style="margin-left: 0.3rem;"></i>${question.views}</span>
                        <span><i class="fas fa-heart" style="margin-left: 0.3rem;"></i>${question.likes}</span>
                    </div>
                </div>
                
                <!-- Tags -->
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    ${question.tags.map(tag => `
                        <span style="background: #f7fafc; color: #4a5568; padding: 0.2rem 0.6rem; border-radius: 10px; font-size: 0.8rem;">${tag}</span>
                    `).join('')}
                </div>
                
                <!-- Answer Preview -->
                ${question.isAnswered ? `
                    <div style="background: #f0fff4; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #48bb78;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                            <div style="width: 40px; height: 40px; background: #48bb78; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                                ${this.experts.get(question.answer.expertId).avatar}
                            </div>
                            <div>
                                <div style="font-weight: 600; color: #2d3748;">${this.experts.get(question.answer.expertId).name}</div>
                                <div style="color: #718096; font-size: 0.9rem;">${this.experts.get(question.answer.expertId).title}</div>
                            </div>
                            ${question.answer.isVerified ? '<i class="fas fa-check-circle" style="color: #48bb78;" title="إجابة موثقة"></i>' : ''}
                        </div>
                        <p style="color: #4a5568; margin: 0; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                            ${question.answer.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, ' ')}
                        </p>
                        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: #718096;">
                            <span>تم الرد في ${this.formatDate(question.answer.answeredDate)}</span>
                            <span><i class="fas fa-heart" style="margin-left: 0.3rem; color: #e53e3e;"></i>${question.answer.likes}</span>
                        </div>
                    </div>
                ` : `
                    <div style="background: #fffaf0; padding: 1rem; border-radius: 10px; border-left: 4px solid #ed8936; text-align: center; color: #dd6b20;">
                        <i class="fas fa-clock" style="margin-left: 0.5rem;"></i>
                        في انتظار إجابة من أحد الخبراء
                    </div>
                `}
            </div>
        `;
    }

    renderExperts() {
        let expertsHtml = '';
        this.experts.forEach(expert => {
            expertsHtml += `
                <div class="expert-card" style="background: #f7fafc; padding: 1.5rem; border-radius: 15px; text-align: center; transition: transform 0.3s ease;"
                     onmouseover="this.style.transform='translateY(-3px)'"
                     onmouseout="this.style.transform='translateY(0)'">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        ${expert.avatar}
                    </div>
                    <h4 style="color: #2d3748; margin: 0 0 0.3rem 0;">${expert.name}</h4>
                    <p style="color: #4299e1; margin: 0 0 1rem 0; font-weight: 600; font-size: 0.9rem;">${expert.title}</p>
                    <p style="color: #718096; font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem;">${expert.bio}</p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.8rem; color: #718096;">
                        <span><strong>${expert.answersCount}</strong> إجابة</span>
                        <span>⭐ ${expert.rating}</span>
                    </div>
                    
                    <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; justify-content: center;">
                        ${expert.specialties.map(specialty => {
                            const category = this.categories.get(specialty);
                            return `<span style="background: ${category.color}; color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">${category.name}</span>`;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        return expertsHtml;
    }

    // Event Handlers and Functions
    attachQAEventListeners() {
        // Event listeners are handled by inline onclick events
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.updateQuestionsDisplay();
    }

    filterByCategory(categoryId) {
        this.currentCategory = categoryId;
        document.getElementById('categoryFilter').value = categoryId;
        this.updateQuestionsDisplay();
    }

    sortQuestions(criteria) {
        this.sortBy = criteria;
        this.updateQuestionsDisplay();
    }

    getFilteredQuestions() {
        let filteredQuestions = Array.from(this.questions.values());

        // Filter by category
        if (this.currentCategory !== 'all') {
            filteredQuestions = filteredQuestions.filter(q => q.category === this.currentCategory);
        }

        // Filter by search query
        if (this.searchQuery) {
            filteredQuestions = filteredQuestions.filter(q => 
                q.question.toLowerCase().includes(this.searchQuery) ||
                q.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)) ||
                (q.isAnswered && q.answer.content.toLowerCase().includes(this.searchQuery))
            );
        }

        // Sort questions
        switch (this.sortBy) {
            case 'recent':
                filteredQuestions.sort((a, b) => b.askedDate - a.askedDate);
                break;
            case 'popular':
                filteredQuestions.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
                break;
            case 'unanswered':
                filteredQuestions = filteredQuestions.filter(q => !q.isAnswered);
                break;
            case 'answered':
                filteredQuestions = filteredQuestions.filter(q => q.isAnswered);
                break;
        }

        return filteredQuestions;
    }

    updateQuestionsDisplay() {
        const questionsList = document.getElementById('questionsList');
        if (questionsList) {
            questionsList.innerHTML = this.renderQuestions();
        }
    }

    // Question Actions
    openQuestion(questionId) {
        const question = this.questions.get(questionId);
        if (!question) return;

        // Increment views
        question.views++;

        // Create question modal
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

        const category = this.categories.get(question.category);
        const expert = question.isAnswered ? this.experts.get(question.answer.expertId) : null;

        modal.innerHTML = `
            <div style="background: white; border-radius: 15px; max-width: 800px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;">
                <!-- Modal Header -->
                <div style="padding: 2rem; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <span style="background: ${category.color}; color: white; padding: 0.4rem 1rem; border-radius: 15px; font-size: 0.9rem; font-weight: 600;">
                                    ${category.name}
                                </span>
                                ${question.isAnswered ? 
                                    '<span style="background: #48bb78; color: white; padding: 0.4rem 1rem; border-radius: 15px; font-size: 0.9rem;"><i class="fas fa-check"></i> مجاب</span>' : 
                                    '<span style="background: #ed8936; color: white; padding: 0.4rem 1rem; border-radius: 15px; font-size: 0.9rem;"><i class="fas fa-clock"></i> في الانتظار</span>'
                                }
                            </div>
                            <h2 style="color: #2d3748; margin: 0; line-height: 1.4;">${question.question}</h2>
                        </div>
                        <button onclick="document.body.removeChild(this.closest('.question-modal'))" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #718096; padding: 0.5rem;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; color: #718096; font-size: 0.9rem;">
                        <div style="display: flex; align-items: center; gap: 1.5rem;">
                            <span><i class="fas fa-user" style="margin-left: 0.3rem;"></i>${question.askedBy}</span>
                            <span><i class="fas fa-calendar" style="margin-left: 0.3rem;"></i>${this.formatDate(question.askedDate)}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1.5rem;">
                            <span><i class="fas fa-eye" style="margin-left: 0.3rem;"></i>${question.views}</span>
                            <span><i class="fas fa-heart" style="margin-left: 0.3rem;"></i>${question.likes}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Modal Content -->
                <div style="flex: 1; overflow-y: auto; padding: 2rem;">
                    <!-- Tags -->
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
                        ${question.tags.map(tag => `
                            <span style="background: #f7fafc; color: #4a5568; padding: 0.4rem 1rem; border-radius: 15px; font-size: 0.9rem;">${tag}</span>
                        `).join('')}
                    </div>
                    
                    <!-- Answer Section -->
                    ${question.isAnswered ? `
                        <div style="background: #f0fff4; padding: 2rem; border-radius: 15px; border: 2px solid #48bb78;">
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                                <div style="width: 60px; height: 60px; background: #48bb78; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                    ${expert.avatar}
                                </div>
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <h4 style="color: #2d3748; margin: 0;">${expert.name}</h4>
                                        ${question.answer.isVerified ? '<i class="fas fa-check-circle" style="color: #48bb78;" title="إجابة موثقة"></i>' : ''}
                                    </div>
                                    <p style="color: #718096; margin: 0; font-size: 0.9rem;">${expert.title}</p>
                                </div>
                                <div style="text-align: center; color: #718096; font-size: 0.8rem;">
                                    <div>تم الرد في</div>
                                    <div>${this.formatDate(question.answer.answeredDate)}</div>
                                </div>
                            </div>
                            
                            <div style="color: #2d3748; line-height: 1.8; font-size: 1rem;">
                                ${question.answer.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}
                            </div>
                            
                            <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
                                <button onclick="copticQA.likeAnswer('${questionId}')" 
                                        style="background: #e53e3e; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                                    <i class="fas fa-heart"></i>
                                    أعجبني (${question.answer.likes})
                                </button>
                                <button onclick="copticQA.shareAnswer('${questionId}')" 
                                        style="background: #4299e1; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer;">
                                    <i class="fas fa-share"></i> مشاركة
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div style="background: #fffaf0; padding: 2rem; border-radius: 15px; border: 2px solid #ed8936; text-align: center;">
                            <i class="fas fa-clock" style="font-size: 3rem; color: #ed8936; margin-bottom: 1rem;"></i>
                            <h4 style="color: #dd6b20; margin: 0 0 1rem 0;">في انتظار الإجابة</h4>
                            <p style="color: #744210; margin: 0;">سيقوم أحد خبرائنا بالإجابة على هذا السؤال قريباً</p>
                        </div>
                    `}
                </div>
                
                <!-- Modal Footer -->
                <div style="padding: 2rem; border-top: 1px solid #e2e8f0; display: flex; gap: 1rem; justify-content: flex-end;">
                    <button onclick="copticQA.toggleFavorite('${questionId}'); this.innerHTML='<i class=\\"fas fa-heart\\"></i> ${this.favorites.has(questionId) ? 'إزالة من' : 'إضافة إلى'} المفضلة'" 
                            style="background: #e53e3e; color: white; border: none; padding: 1rem 1.5rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-heart"></i> ${this.favorites.has(questionId) ? 'إزالة من' : 'إضافة إلى'} المفضلة
                    </button>
                    <button onclick="copticQA.likeQuestion('${questionId}')" 
                            style="background: #48bb78; color: white; border: none; padding: 1rem 1.5rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-thumbs-up"></i> أعجبني
                    </button>
                </div>
            </div>
        `;

        modal.className = 'question-modal';
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        this.updateQuestionsDisplay();
    }

    showAskQuestionModal() {
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
            <div style="background: white; border-radius: 15px; max-width: 600px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;">
                <!-- Modal Header -->
                <div style="padding: 2rem; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="color: #2d3748; margin: 0;">اطرح سؤالاً جديداً</h3>
                        <button onclick="document.body.removeChild(this.closest('.ask-modal'))" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #718096;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <p style="color: #718096; margin: 0.5rem 0 0 0;">اطرح سؤالك وسيجيب عليه أحد خبرائنا</p>
                </div>
                
                <!-- Modal Content -->
                <div style="flex: 1; overflow-y: auto; padding: 2rem;">
                    <form id="askQuestionForm" onsubmit="copticQA.submitQuestion(event)">
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: #2d3748; font-weight: 600; margin-bottom: 0.5rem;">السؤال *</label>
                            <textarea id="questionText" 
                                      placeholder="اكتب سؤالك هنا..." 
                                      required
                                      style="width: 100%; min-height: 120px; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; resize: vertical; font-family: inherit; line-height: 1.5;"></textarea>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: #2d3748; font-weight: 600; margin-bottom: 0.5rem;">الفئة *</label>
                            <select id="questionCategory" required style="width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px; background: white;">
                                <option value="">اختر الفئة المناسبة</option>
                                ${this.renderCategoryOptions()}
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: #2d3748; font-weight: 600; margin-bottom: 0.5rem;">الكلمات المفتاحية</label>
                            <input type="text" 
                                   id="questionTags" 
                                   placeholder="أدخل الكلمات المفتاحية مفصولة بفواصل"
                                   style="width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px;">
                            <small style="color: #718096; font-size: 0.8rem;">مثال: صلاة، صوم، عقيدة</small>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; color: #2d3748; font-weight: 600; margin-bottom: 0.5rem;">اسمك (اختياري)</label>
                            <input type="text" 
                                   id="askerName" 
                                   placeholder="اسمك أو اتركه فارغاً للنشر كمجهول"
                                   style="width: 100%; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 10px;">
                        </div>
                        
                        <div style="background: #f7fafc; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                            <h5 style="color: #2d3748; margin: 0 0 1rem 0;">نصائح لطرح سؤال جيد:</h5>
                            <ul style="color: #718096; margin: 0; padding-right: 1.5rem; line-height: 1.6;">
                                <li>اجعل السؤال واضحاً ومحدداً</li>
                                <li>اختر الفئة المناسبة</li>
                                <li>أضف الكلمات المفتاحية المناسبة</li>
                                <li>تأكد من أن السؤال لم يُطرح من قبل</li>
                            </ul>
                        </div>
                        
                        <button type="submit" 
                                style="width: 100%; background: linear-gradient(135deg, #4299e1, #3182ce); color: white; border: none; padding: 1rem; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: transform 0.3s ease;"
                                onmouseover="this.style.transform='translateY(-2px)'"
                                onmouseout="this.style.transform='translateY(0)'">
                            <i class="fas fa-paper-plane" style="margin-left: 0.5rem;"></i>إرسال السؤال
                        </button>
                    </form>
                </div>
            </div>
        `;

        modal.className = 'ask-modal';
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    submitQuestion(event) {
        event.preventDefault();
        
        const questionText = document.getElementById('questionText').value.trim();
        const category = document.getElementById('questionCategory').value;
        const tags = document.getElementById('questionTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
        const askerName = document.getElementById('askerName').value.trim() || 'مجهول';
        
        if (!questionText || !category) {
            this.showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Create new question
        const newQuestion = {
            id: 'user_q_' + Date.now(),
            question: questionText,
            category: category,
            askedBy: askerName,
            askedDate: new Date(),
            views: 0,
            likes: 0,
            isAnswered: false,
            tags: tags.length > 0 ? tags : [this.categories.get(category).name],
            isUserQuestion: true
        };
        
        // Add to questions
        this.questions.set(newQuestion.id, newQuestion);
        this.userQuestions.set(newQuestion.id, newQuestion);
        
        // Update category count
        const categoryObj = this.categories.get(category);
        if (categoryObj) {
            categoryObj.count++;
        }
        
        // Save data
        this.saveUserData();
        
        // Close modal
        const modal = document.querySelector('.ask-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        
        // Show success message
        this.showNotification('تم إرسال سؤالك بنجاح! سيتم الرد عليه قريباً.', 'success');
        
        // Update display
        this.updateQuestionsDisplay();
    }

    toggleFavorite(questionId) {
        if (this.favorites.has(questionId)) {
            this.favorites.delete(questionId);
            this.showNotification('تم إزالة السؤال من المفضلة', 'info');
        } else {
            this.favorites.add(questionId);
            this.showNotification('تم إضافة السؤال إلى المفضلة', 'success');
        }
        
        this.saveUserData();
        this.updateQuestionsDisplay();
    }

    likeQuestion(questionId) {
        const question = this.questions.get(questionId);
        if (question) {
            question.likes++;
            this.showNotification('شكراً لك على التقييم!', 'success');
            this.updateQuestionsDisplay();
        }
    }

    likeAnswer(questionId) {
        const question = this.questions.get(questionId);
        if (question && question.isAnswered) {
            question.answer.likes++;
            this.showNotification('شكراً لك على تقييم الإجابة!', 'success');
            this.updateQuestionsDisplay();
        }
    }

    shareAnswer(questionId) {
        const question = this.questions.get(questionId);
        if (!question) return;

        const shareText = `سؤال وجواب: ${question.question}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'سؤال وجواب من الموقع القبطي',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('تم نسخ السؤال والجواب!', 'success');
            });
        }
    }

    // Utility Functions
    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor(diff / 60000);

        if (minutes < 1) return 'الآن';
        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        if (hours < 24) return `منذ ${hours} ساعة`;
        if (days < 7) return `منذ ${days} يوم`;
        
        return date.toLocaleDateString('ar-EG');
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

// Initialize global Q&A system
window.copticQA = new CopticQASystem();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('qaContainer')) {
        copticQA.renderQAInterface();
    }
});

console.log('❓ نظام الأسئلة والأجوبة التفاعلي جاهز!');
