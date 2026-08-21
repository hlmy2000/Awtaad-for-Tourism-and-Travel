/*
 * وظائف الموقع التفاعلية
 * - قائمة الموبايل والقوائم المنسدلة
 * - عدادات الإحصائيات والسلايدر والفيديو
 * - نافذة الاستشارة والدردشة
 * - الوصول، اللغة، والوضع الداكن
 */

/* قائمة الموبايل والقوائم المنسدلة */
// تفعيل القائمة الجانبية مع الخلفية المظلمة (Overlay)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const mobileBreakpoint = 1040;

// إنشاء عنصر الـ Overlay ديناميكيًا وإضافته للصفحة
let navOverlay = document.querySelector('.nav-overlay');
if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
}

function resetMenuIcon() {
    if (!menuToggle) return;
    const icon = menuToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
    menuToggle.style.transform = 'rotate(0deg)';
}

function setMenuState(isOpen) {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.toggle('active', isOpen);
    body.classList.toggle('menu-open', isOpen);
    navOverlay.classList.toggle('active', isOpen); // تفعيل أو إخفاء الخلفية المظلمة
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    const icon = menuToggle.querySelector('i');
    if (icon) {
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }

    menuToggle.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';

    if (!isOpen) {
        document.querySelectorAll('.dropdown').forEach(item => item.classList.remove('open'));
    }

    if (window.innerWidth <= mobileBreakpoint) {
        navLinks.style.transform = isOpen ? 'translateX(0)' : 'translateX(105%)';
        navLinks.style.opacity = isOpen ? '1' : '0';
        navLinks.style.visibility = isOpen ? 'visible' : 'hidden';
    } else {
        navLinks.style.transform = '';
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
    }
}

function updateMobileMenuState() {
    if (!menuToggle || !navLinks) return;

    const isMobile = window.innerWidth <= 1040;
    menuToggle.style.display = isMobile ? 'flex' : 'none';
    navLinks.style.display = 'flex';

    if (!isMobile) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        navOverlay.classList.remove('active');
        navLinks.style.transform = '';
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
        document.querySelectorAll('.dropdown').forEach(item => item.classList.remove('open'));
        resetMenuIcon();
        return;
    }

    if (!navLinks.classList.contains('active')) {
        navLinks.style.transform = 'translateX(105%)';
        navLinks.style.opacity = '0';
        navLinks.style.visibility = 'hidden';
        navOverlay.classList.remove('active');
        document.querySelectorAll('.dropdown').forEach(item => item.classList.remove('open'));
        resetMenuIcon();
    }
}

if (menuToggle && navLinks) {
    updateMobileMenuState();

    // النقر على زر الهامبرغر فتح/إغلاق
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (window.innerWidth > 1040) return;

        const isOpen = navLinks.classList.contains('active');
        setMenuState(!isOpen);
    });

    // النقر على الخلفية المظلمة لإغلاق القائمة
    navOverlay.addEventListener('click', () => {
        if (window.innerWidth <= mobileBreakpoint && navLinks.classList.contains('active')) {
            setMenuState(false);
        }
    });

    // إغلاق القائمة عند الضغط في أي مكان خارج القائمة
    document.addEventListener('click', (event) => {
        if (window.innerWidth > mobileBreakpoint) return;

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle && navLinks.classList.contains('active')) {
            setMenuState(false);
        }
    });

    // التعامل مع روابط القائمة والمجموعات المنسدلة
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            const dropdownParent = link.closest('.dropdown');
            const isDropdownToggle = dropdownParent && dropdownParent.querySelector(':scope > a') === link;

            if (window.innerWidth <= mobileBreakpoint) {
                if (isDropdownToggle) {
                    event.preventDefault();
                    return;
                }

                setMenuState(false);
            }
        });
    });

    window.addEventListener('resize', () => {
        updateMobileMenuState();
    });
}
// تفعيل فتح القوائم المنسدلة داخل الموبايل
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggleLink = dropdown.querySelector(':scope > a');
    if (!toggleLink) return;

    toggleLink.addEventListener('click', (e) => {
        if (window.innerWidth <= mobileBreakpoint) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');

            // إغلاق باقي المنسدلات لفتح واحدة فقط في كل مرة
            dropdowns.forEach(item => {
                if (item !== dropdown) item.classList.remove('open');
            });

            dropdown.classList.toggle('open', !isOpen);
        }
    });
});
/* عدادات الإحصائيات عند ظهور القسم */
const statsSection = document.querySelector('.features-section, .stats, .stats-section');
const counters = document.querySelectorAll('.stat-number');

if (counters.length > 0) {
    // دالة تشغيل العداد لعنصر واحد
    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const hasPercent = counter.getAttribute('data-target').includes('%') || counter.innerText.includes('%');
        let count = 0;
        const speed = 40; // عدد الخطوات
        const increment = target / speed;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count) + (hasPercent ? '%' : '');
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + (hasPercent ? '%' : '');
            }
        };

        updateCount();
    };

    // استخدام Intersection Observer لمراقبة ظهور قسم الإحصائيات
    const observerOptions = {
        root: null,
        threshold: 0.3 // يبدأ العداد عندما يظهر 30% من القسم على الشاشة
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تشغيل جميع العدادات داخل القسم
                counters.forEach(counter => startCounter(counter));
                // إيقاف المراقبة حتى لا تتكرر الحركة مرة أخرى عند السكرول
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ربط المراقب بالقسم الرئيسي للإحصائيات أو بأول عداد
    const targetToObserve = statsSection || counters[0].parentElement;
    if (targetToObserve) {
        statsObserver.observe(targetToObserve);
    }
}

/* سلايدر آراء العملاء */
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (slides.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
    let currentSlide = 0;

    function showSlide(index) {
        // إزالة كلاس النشاط من جميع الكروت والنقاط
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active-dot'));

        // ضبط المؤشر في حال تخطي الحدود الرمزية
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        if (index >= 0 && index < slides.length) currentSlide = index;

        // إضافة الكلاسات للعناصر المحددة والنشطة حالياً
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active-dot');
    }

    // تشغيل الأحداث عند الضغط على الأسهم
    nextBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });

    // تشغيل الأحداث عند الضغط على النقاط السفلية مباشرة
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentSlide = parseInt(e.target.getAttribute('data-index'));
            showSlide(currentSlide);
        });
    });

    // تحريك السلايدر تلقائياً كل 6 ثوانٍ لجمالية القالب
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 6000);
}

/* تشغيل فيديوهات الواجهة بالتتابع */
const videoPlaylist = [
    'assets/hero-bg.mp4',       // الفيديو الأول: طائرة خاصة
    'assets/hotel-bg.mp4',      // الفيديو الثاني: منتجع وفندق فاخر
    'assets/corporate-bg.mp4'   // الفيديو الثالث: رجال أعمال وسفر شركات
];

let currentVideoIndex = 0;
const videoElement = document.getElementById('heroVideo');

if (videoElement) {
    // دالة لتشغيل الفيديو الحالي وضبط خصائصه
    function loadAndPlayVideo(index) {
        // ضبط المسار
        videoElement.src = videoPlaylist[index];
        videoElement.load();
        
        // تبطئة السرعة إلى 50% ليمشي الفيديو بهدوء تام وفخامة
        videoElement.playbackRate = 0.5; 
        
        // إزالة تأثير التلاشي ليظهر الفيديو الجديد بنعومة
        videoElement.style.opacity = '1';
        videoElement.play().catch(error => console.log("تحذير تشغيل الفيديو:", error));
    }

    // تشغيل الفيديو الأول فور تحميل الصفحة
    loadAndPlayVideo(currentVideoIndex);

    // متابعة وقت الفيديو لعمل تلاشي (Fade Out) قبل نهايته بثانية كاملة
    videoElement.addEventListener('timeupdate', () => {
        if (videoElement.duration - videoElement.currentTime <= 1.0) {
            videoElement.style.transition = 'opacity 1s ease-in-out';
            videoElement.style.opacity = '0'; // يتلاشى ببطء إلى الخلفية المظلمة
        }
    });

    // الحدث الأهم: عند انتهاء الفيديو الحالي تماماً، انتقل للتالي بنعومة
    videoElement.addEventListener('ended', () => {
        // الانتقال للفيديو التالي في المصفوفة
        currentVideoIndex++;
        
        // إذا انتهت كل الفيديوهات، عُد إلى الفيديو الأول (صفر) لإعادة الدورة بالكامل
        if (currentVideoIndex >= videoPlaylist.length) {
            currentVideoIndex = 0;
        }
        
        // تشغيل الفيديو الجديد
        loadAndPlayVideo(currentVideoIndex);
    });
}

    /* نافذة حجز الاستشارة */
    // أ) توليد هيكل الـ HTML كاملاً برمجياً في الذاكرة وحقنه أسفل الـ Body فوراً
    const modalHTML = `
        <div class="vip-modal-overlay" id="vipConsultModal">
            <div class="vip-modal-box">
                <button class="vip-modal-close" id="closeVipModalBtn">✕</button>
                <div class="vip-modal-header">
                    <i class="fa-solid fa-crown modal-crown-icon"></i>
                    <h3>طلب استشارة لوجستية مخصصة</h3>
                    <p>سجل بياناتك التنفيذية أدناه وسيتواصل معك مستشار السفر المخصص خلال 15 دقيقة</p>
                </div>
                <form class="vip-modal-form" id="vipModalForm" onsubmit="return false;">
                    <div class="modal-field">
                        <label><i class="fa-solid fa-user"></i> الاسم الكريم:</label>
                        <input type="text" id="modalName" placeholder="أدخل اسمك بالكامل..." required>
                    </div>
                    <div class="modal-field">
                        <label><i class="fa-solid fa-phone"></i> رقم الهاتف المباشر:</label>
                        <input type="tel" id="modalPhone" placeholder="+966..." required>
                    </div>
                    <div class="modal-field">
                        <label><i class="fa-solid fa-sliders"></i> قطاع الخدمة المستهدف:</label>
                        <select id="modalService" class="modal-custom-select">
                            <option value="1">تأجير الطائرات الخاصة والـ Charter</option>
                            <option value="2">إدارة سفر الشركات والبعثات التجارية</option>
                            <option value="3">البرامج المتخصصة (العلاجية والتعليمية)</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-gold modal-submit-btn" id="modalSubmitBtn">تأكيد حجز الاستشارة الفورية</button>
                </form>
                <div class="modal-success-state" id="modalSuccessState">
                    <i class="fa-solid fa-circle-check success-modal-icon"></i>
                    <h4>تم تأمين طلب استشارتك بنجاح!</h4>
                    <p>تم تخصيص مستشار مناوب لملفك، جاري مراجعة البيانات والاتصال بك هاتفياً فوراً.</p>
                </div>
            </div>
        </div>
    `;

    // زرع البنية السابقة ديناميكياً داخل الصفحة النشطة حالياً بلحظة
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // ب) التقاط العناصر المولدة ديناميكياً والبدء في ربط حركات الأحداث والفتح
    const vipModal = document.getElementById('vipConsultModal');
    const closeModalBtn = document.getElementById('closeVipModalBtn');
    const modalForm = document.getElementById('vipModalForm');
    const modalSuccess = document.getElementById('modalSuccessState');
    
    // التقاط كافة أزرار "احجز استشارتك" أو الروابط الموجهة لصفحة الحجز بالهيدر والصفحات
    const allCtaButtons = document.querySelectorAll('header .btn-gold, .header-cta .btn-gold, a[href*="contact.html"].btn-gold');

    if (vipModal && closeModalBtn) {
        allCtaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                vipModal.classList.add('open-modal');
                document.body.style.overflow = 'hidden';
                if (modalSuccess) modalSuccess.classList.remove('show-success');
            });
        });

        const closeVipModal = () => {
            vipModal.classList.remove('open-modal');
            document.body.style.overflow = '';
        };

        closeModalBtn.addEventListener('click', closeVipModal);
        vipModal.addEventListener('click', (e) => {
            if (e.target === vipModal) closeVipModal();
        });

        if (modalForm && modalSuccess) {
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('modalName').value.trim();
                const phone = document.getElementById('modalPhone').value.trim();

                if (name && phone) {
                    modalSuccess.classList.add('show-success');
                    modalForm.reset();
                }
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && vipModal.classList.contains('open-modal')) {
                closeVipModal();
            }
        });
    }

    /* ==========================================================================
       31. تفعيل التمرير الانسيابي الناعم للموقع بالكامل (Global Smooth Scroll)
       ========================================================================== */
    // أ) تطبيق خاصية التمرير الناعم على مستوى بنية الصفحة برمجياً
    document.documentElement.style.scrollBehavior = 'smooth';

    // ب) تأمين التمرير الناعم لجميع الروابط الداخلية التي تبدأ بعلامة (#)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    if (internalLinks.length > 0) {
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // التأكد من أن الرابط يشير إلى عنصر حقيقي موجود داخل الصفحة
                if (targetId !== '#' && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault(); // منع القفز الافتراضي المفاجئ
                        
                        // التمرير والانزلاق الناعم نحو العنصر المستهدف بدقة
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /* ==========================================================================
       34. حقن وتفعيل ميزات إمكانية الوصول ديناميكياً (Dynamic VIP Accessibility)
       ========================================================================== */
    
    // 1. حقن تلقائي للشارات والأدوار الأمنية لوسائل وقارئات الشاشة (A11y Injection)
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // تأمين عدم وجود حقل alt فارغ لمنع أخطاء فحص الامتثال الدولي
        if (!img.hasAttribute('alt') || img.getAttribute('alt') === "") {
            img.setAttribute('alt', "منصة أوتاد للسفر الفاخر وحلول الأعمال");
        }
    });

    // تأمين أزرار قائمة الموبايل والـ Toggles ديناميكياً
    const menuToggleBtn = document.querySelector('.menu-toggle');
    if (menuToggleBtn) {
        menuToggleBtn.setAttribute('role', 'button');
        menuToggleBtn.setAttribute('aria-label', 'فتح قائمة التنقل اللوجستية الرئيسية');
        if (!menuToggleBtn.hasAttribute('aria-expanded')) {
            menuToggleBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // 2. تحديث وتأمين خصائص المودال المنبثق ديناميكياً فور حقنه في الذاكرة
    const accessibilityModal = document.getElementById('vipConsultModal');
    const accessibilityForm = document.getElementById('vipModalForm');
    if (accessibilityModal && accessibilityForm) {
        accessibilityModal.setAttribute('role', 'dialog');
        accessibilityModal.setAttribute('aria-modal', 'true');
        accessibilityModal.setAttribute('aria-label', 'نافذة حجز استشارة لوجستية مخصصة');
        
        // ربط أحداث فتح وإغلاق المودال ديناميكياً لتحديث شارات الـ ARIA حياً أمام قارئات الشاشة
        const modalObserver = new MutationObserver(() => {
            const isModalOpen = accessibilityModal.classList.contains('open-modal');
            accessibilityModal.setAttribute('aria-hidden', String(!isModalOpen));
        });
        modalObserver.observe(accessibilityModal, { attributes: true, attributeFilter: ['class'] });

    }

    // 4. جعل روابط الهيدر والخدمات كروت قابلة للتفاعل عبر الكيبورد بـ Focus مرئي ناعم
    const interactiveElements = document.querySelectorAll('header a, .service-card, .btn-gold, .v-tab-btn');
    interactiveElements.forEach(elem => {
        if (!elem.hasAttribute('tabindex')) {
            elem.setAttribute('tabindex', '0'); // يتيح لزر Tab في الكيبورد التوقف فوق العنصر الفاخر
        }
    });

    /* ==========================================================================
       36. بناء وحقن وتشغيل حُجرة ومودال الدردشة الفاخرة ديناميكياً (VIP Live Chat)
       ========================================================================== */
    // أ) صياغة وتوليد هيكل الـ HTML بالكامل للشات وأيقونة الرسالة النابضة في الذاكرة
    const chatWidgetHTML = `
        <!-- زر الإطلاق النابض العائم -->
        <div class="vip-chat-trigger" id="vipChatTriggerBtn" title="تواصل مع مستشار النخبة المناوب">
            <i class="fa-solid fa-comments"></i>
        </div>

        <!-- صندوق وحُجرة المحادثة الصغيرة -->
        <div class="vip-chat-window" id="vipChatWindowModal">
            <div class="vip-chat-header">
                <div class="chat-header-title">
                    <h4>مستشار الدعم والكونسيرج</h4>
                    <p>متصل الآن</p>
                </div>
                <button class="vip-chat-close" id="closeVipChatBtn">✕</button>
            </div>
            <div class="vip-chat-body" id="vipChatBodyContainer">
                <!-- الرسالة الترحيبية التلقائية الفاخرة من نظام أوتاد -->
                <div class="chat-msg-row">
                    <div class="chat-agent-avatar"><i class="fa-solid fa-crown"></i></div>
                    <div class="chat-msg-bubble">
                        مرحباً بكم في <strong>أوتاد للسفر الفاخر وحلول الأعمال</strong>. أنا مستشار الكونسيرج المناوب لخدمتكم حالياً؛ كيف يمكنني تأمين لوجستياتكم أو جدولة رحلتكم الخاصة اليوم؟
                    </div>
                </div>
            </div>
            <div class="vip-chat-footer">
                <input type="text" class="vip-chat-input" id="vipChatInputField" placeholder="اكتب استفسارك التنفيذي هنا...">
                <button class="vip-chat-send-btn" id="vipChatSendBtn"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    `;

    // ب) حقن وزرع البنية بالكامل ديناميكياً أسفل الـ Body لتعمل تلقائياً في الـ 12 صفحة
    document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);

    // ج) التقاط العناصر المحدثة وربط ميزات الفتح والإغلاق ومعالجة كتابة الرسائل حياً
    const chatTrigger = document.getElementById('vipChatTriggerBtn');
    const chatWindow = document.getElementById('vipChatWindowModal');
    const chatCloseBtn = document.getElementById('closeVipChatBtn');
    const chatSendBtn = document.getElementById('vipChatSendBtn');
    const chatInput = document.getElementById('vipChatInputField');
    const chatBody = document.getElementById('vipChatBodyContainer');
    
    if (chatTrigger && chatWindow && chatCloseBtn) {
        
    chatTrigger.addEventListener('click', (e) => {
    e.stopPropagation();

    // إغلاق لوحة التحكم عند فتح الشات
    if (ctrlPanel) {
        ctrlPanel.classList.remove('panel-open');
    }

    // فتح / إغلاق الشات
    chatWindow.classList.toggle('chat-open');
});

        // إغلاق لوحة الدردشة عند الضغط خارجها
        document.addEventListener('click', event => {
        
            if (
                chatWindow.classList.contains('chat-open') &&
                !chatWindow.contains(event.target) &&
                !chatTrigger.contains(event.target)
            ) {
                chatWindow.classList.remove('chat-open');
            }
        
        });

        // 2. إغلاق الشات عند ضغط زر (✕)
        chatCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            chatWindow.classList.remove('chat-open');
        });

        // 3. منع انغلاق الشات عند الضغط بداخل الصندوق الكريستالي نفسه لراحة الكتابة
        chatWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 4. دالة ذكية لإضافة رسالة المستخدم حياً بداخل حُجرة الشات لتبهر المشتري بمعاينتها
        function handleVipUserSendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText !== "" && chatBody) {
                
                // صياغة ديف فقاعة رسالة العميل باللون الذهبي والكحلي متناسق هندسياً
                const messageRow = document.createElement('div');
                messageRow.className = 'chat-msg-row';
                messageRow.style.justifyContent = 'flex-end';

                const messageBubble = document.createElement('div');
                messageBubble.className = 'chat-msg-bubble user-message';
                messageBubble.textContent = messageText;

                messageRow.appendChild(messageBubble);
                chatBody.appendChild(messageRow);
                chatInput.value = ""; // تصفير الحقل
                
                // تمرير تلقائي ناعم لأسفل الشات لرؤية الرسالة الجديدة (UX ممتاز)
                chatBody.scrollTop = chatBody.scrollHeight;
            }
        }

        // 5. ربط حدث الإرسال عند ضغط زر الطائرة الورقية أو عند ضغط زر Enter بالكيبورد
        if (chatSendBtn && chatInput) {
            chatSendBtn.addEventListener('click', handleVipUserSendMessage);
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    handleVipUserSendMessage();
                }
            });
        }
    }

    /* ==========================================================================
       37. قاموس الترجمة الدولي الموحد لموقع أوتاد (Global i18n Dictionary)
       ========================================================================== */
    /* =========================================================
       11. EXTERNAL TRANSLATION SYSTEM
       تحميل ملفات الترجمة الخارجية وتشغيلها على جميع الصفحات
       ========================================================= */

    // تحديد مجلد script.js حتى تعمل الملفات من الجذر أو /pages بنفس الطريقة.
    const currentScript = document.currentScript;
    const scriptBasePath = currentScript
        ? new URL('.', currentScript.src).href
        : './';

    // تحميل ملف JavaScript خارجي بشكل آمن.
    function loadTranslationFile(fileName) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[data-awtad-translation="${fileName}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `${scriptBasePath}translations/${fileName}`;
            script.dataset.awtadTranslation = fileName;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Unable to load ${fileName}`));
            document.head.appendChild(script);
        });
    }

    // تحميل العربية والإنجليزية قبل تفعيل زر اللغة.
    const translationFilesReady = Promise.all([
        loadTranslationFile('ar.js'),
        loadTranslationFile('en.js')
    ]).catch(error => {
        console.warn('Awtad translation files could not be loaded:', error);
    });


    /* =========================================================
       12. TRANSLATION ENGINE
       ترجمة عناصر الصفحة مع دعم data-i18n والترجمة النصية المباشرة
       ========================================================= */

    const translationState = {
        originalText: new WeakMap(),
        originalAttributes: new WeakMap(),
        fallbackCache: JSON.parse(localStorage.getItem('awtad-translation-cache') || '{}')
    };

    // حفظ النص الأصلي لكل عنصر قبل أول ترجمة.
    function rememberOriginalContent(element) {
        if (!translationState.originalText.has(element)) {
            translationState.originalText.set(element, element.innerHTML);
        }
    }

    // حفظ الخصائص القابلة للترجمة.
    function rememberOriginalAttribute(element, attribute) {
        if (!translationState.originalAttributes.has(element)) {
            translationState.originalAttributes.set(element, {});
        }

        const attrs = translationState.originalAttributes.get(element);

        if (!(attribute in attrs)) {
            attrs[attribute] = element.getAttribute(attribute);
        }
    }

    // ترجمة عناصر data-i18n باستخدام القاموس الخارجي.
    function applyDictionaryTranslations(lang) {
        const dictionary = lang === 'en'
            ? (window.AWTAD_TRANSLATIONS_EN || {})
            : (window.AWTAD_TRANSLATIONS_AR || {});

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');

            if (dictionary[key]) {
                rememberOriginalContent(element);
                element.innerHTML = dictionary[key];
            }
        });

        // دعم data-i18n-attr="title:KEY,alt:KEY"
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const definitions = element.getAttribute('data-i18n-attr').split(',');

            definitions.forEach(definition => {
                const [attribute, key] = definition.split(':').map(value => value.trim());
                if (!attribute || !key || !dictionary[key]) return;

                rememberOriginalAttribute(element, attribute);
                element.setAttribute(attribute, dictionary[key]);
            });
        });
    }

    // ترجمة النصوص التي لا تحمل data-i18n إذا كانت موجودة في القاموس.
    function translateKnownTextNodes(lang) {
        const dictionary = lang === 'en'
            ? (window.AWTAD_TRANSLATIONS_EN || {})
            : (window.AWTAD_TRANSLATIONS_AR || {});

        if (!Object.keys(dictionary).length) return;

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;

                    const tag = parent.tagName.toLowerCase();
                    if (['script', 'style', 'noscript'].includes(tag)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (parent.closest('[data-i18n]')) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    const text = node.nodeValue.trim();
                    return text && dictionary[text]
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const nodes = [];
        let node;

        while ((node = walker.nextNode())) {
            nodes.push(node);
        }

        nodes.forEach(textNode => {
            const original = textNode.nodeValue;
            const trimmed = original.trim();
            const translated = dictionary[trimmed];

            if (!translated) return;

            const leading = original.match(/^\s*/)?.[0] || '';
            const trailing = original.match(/\s*$/)?.[0] || '';

            textNode.nodeValue = leading + translated + trailing;
        });
    }

    // ترجمة title وalt وبعض النصوص الوصفية المعروفة.
    function translateCommonAttributes(lang) {
        const dictionary = lang === 'en'
            ? (window.AWTAD_TRANSLATIONS_EN || {})
            : (window.AWTAD_TRANSLATIONS_AR || {});

        document.querySelectorAll('[title], [alt], input[placeholder], textarea[placeholder]').forEach(element => {
            ['title', 'alt', 'placeholder'].forEach(attribute => {
                if (!element.hasAttribute(attribute)) return;

                const value = element.getAttribute(attribute);
                if (!dictionary[value]) return;

                rememberOriginalAttribute(element, attribute);
                element.setAttribute(attribute, dictionary[value]);
            });
        });
    }

    // استعادة النصوص والخصائص الأصلية عند الرجوع للعربية.
    function restoreOriginalContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const original = translationState.originalText.get(element);
            if (original !== undefined) {
                element.innerHTML = original;
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrs = translationState.originalAttributes.get(element);
            if (!attrs) return;

            Object.entries(attrs).forEach(([attribute, value]) => {
                if (value === null) {
                    element.removeAttribute(attribute);
                } else {
                    element.setAttribute(attribute, value);
                }
            });
        });
    }

    // محاولة ترجمة نص غير موجود في القاموس بواسطة خدمة خارجية اختيارية.
    // يتم استخدامها فقط عند تفعيل AWTAD_ENABLE_REMOTE_TRANSLATION = true.
    const AWTAD_ENABLE_REMOTE_TRANSLATION = true;

    async function translateRemote(text, targetLanguage) {
        if (!AWTAD_ENABLE_REMOTE_TRANSLATION || !text) return null;

        const cacheKey = `${targetLanguage}:${text}`;
        if (translationState.fallbackCache[cacheKey]) {
            return translationState.fallbackCache[cacheKey];
        }

        try {
            const url = 'https://translate.googleapis.com/translate_a/single'
                + '?client=gtx&sl=ar&tl=' + encodeURIComponent(targetLanguage)
                + '&dt=t&q=' + encodeURIComponent(text);

            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            const translated = Array.isArray(data?.[0])
                ? data[0].map(part => part?.[0] || '').join('')
                : null;

            if (translated) {
                translationState.fallbackCache[cacheKey] = translated;
                localStorage.setItem(
                    'awtad-translation-cache',
                    JSON.stringify(translationState.fallbackCache)
                );
            }

            return translated;
        } catch (error) {
            console.warn('Remote translation unavailable:', error);
            return null;
        }
    }

    // تشغيل الترجمة على الصفحة الحالية.
    async function applyLanguageTranslation(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';

        if (langBtnText) {
            langBtnText.innerText = lang === 'en' ? 'العربية' : 'English';
        }

        await translationFilesReady;

        if (lang === 'ar') {
            restoreOriginalContent();
            translateKnownTextNodes('ar');
            translateCommonAttributes('ar');
            return;
        }

        applyDictionaryTranslations('en');
        translateKnownTextNodes('en');
        translateCommonAttributes('en');

        // الترجمة الخارجية اختيارية حتى لا يصبح الموقع معتمداً على خدمة خارجية.
        if (AWTAD_ENABLE_REMOTE_TRANSLATION) {
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(node) {
                        const parent = node.parentElement;
                        if (!parent) return NodeFilter.FILTER_REJECT;
                        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        const text = node.nodeValue.trim();
                        return /[\u0600-\u06FF]/.test(text)
                            ? NodeFilter.FILTER_ACCEPT
                            : NodeFilter.FILTER_REJECT;
                    }
                }
            );

            const nodes = [];
            let node;
            while ((node = walker.nextNode())) nodes.push(node);

            for (const textNode of nodes) {
                const text = textNode.nodeValue.trim();
                const translated = await translateRemote(text, 'en');
                if (!translated) continue;

                const original = textNode.nodeValue;
                const leading = original.match(/^\s*/)?.[0] || '';
                const trailing = original.match(/\s*$/)?.[0] || '';
                textNode.nodeValue = leading + translated + trailing;
            }
        }
    }


    /* =========================================================
       13. VIP CONTROL CENTER
       لوحة التحكم باللغة + الوضع الليلي
       ========================================================= */

    const controlCenterHTML = `
        <div class="vip-control-trigger" id="vipControlTriggerBtn" title="تخصيص مظهر ومميزات المنصة">
            <i class="fa-solid fa-gear"></i>
        </div>

        <div class="vip-control-panel" id="vipControlPanelModal">
            <div class="vip-control-header">
                <h4><i class="fa-solid fa-sliders"></i> كونسيرج التحكم والمنصة</h4>
                <button class="vip-control-close" id="closeVipControlBtn">✕</button>
            </div>
            <div class="vip-control-body">
                <div class="control-row-item">
                    <label><i class="fa-solid fa-globe"></i> لغة المنصة الحالية:</label>
                    <button class="control-action-btn" id="langToggleBtn" type="button">
                        <i class="fa-solid fa-language"></i>
                        <span id="langBtnText">English</span>
                    </button>
                </div>

                <div class="control-row-item">
                    <label><i class="fa-solid fa-circle-half-stroke"></i> مظهر الإضاءة:</label>
                    <button class="control-action-btn" id="themeToggleBtn" type="button">
                        <i class="fa-solid fa-moon"></i>
                        <span id="themeBtnText">الوضع الليلي</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlCenterHTML);

    const ctrlTrigger = document.getElementById('vipControlTriggerBtn');
    const ctrlPanel = document.getElementById('vipControlPanelModal');
    const panelCloseBtn = document.getElementById('closeVipControlBtn');
    const langBtn = document.getElementById('langToggleBtn');
    const langBtnText = document.getElementById('langBtnText');
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeBtnText = document.getElementById('themeBtnText');
    const globalBody = document.body;

    // فتح وإغلاق لوحة التحكم.
    if (ctrlTrigger && ctrlPanel) {
    ctrlTrigger.addEventListener('click', event => {

        event.stopPropagation();

        // إغلاق الشات عند فتح لوحة التحكم
        if (chatWindow) {
            chatWindow.classList.remove('chat-open');
        }

        // فتح / إغلاق لوحة التحكم
        ctrlPanel.classList.toggle('panel-open');
    });

        // إغلاق لوحة التحكم عند الضغط خارجها
        document.addEventListener('click', event => {
        
            if (
                ctrlPanel.classList.contains('panel-open') &&
                !ctrlPanel.contains(event.target) &&
                !ctrlTrigger.contains(event.target)
            ) {
                ctrlPanel.classList.remove('panel-open');
            }
        });

        // إغلاق لوحة التحكم عند الضغط على زر (✕)
        if (panelCloseBtn) {
            panelCloseBtn.addEventListener('click', event => {
                event.stopPropagation();
                ctrlPanel.classList.remove('panel-open');
            });
        }

        ctrlPanel.addEventListener('click', event => {
            event.stopPropagation();
        });

    }

    // اللغة المحفوظة.
    const savedLanguage = localStorage.getItem('awtad-lang') || 'ar';

    // تفعيل اللغة بعد تحميل ملفات ar.js و en.js.
    translationFilesReady.finally(() => {
        applyLanguageTranslation(savedLanguage);
    });

    // تبديل اللغة من لوحة التحكم.
    if (langBtn) {
        langBtn.addEventListener('click', async event => {
            event.preventDefault();
            event.stopPropagation();

            const currentLanguage =
                document.documentElement.lang === 'en' ? 'ar' : 'en';

            localStorage.setItem('awtad-lang', currentLanguage);
            await applyLanguageTranslation(currentLanguage);
        });
    }


    /* =========================================================
       14. DARK MODE
       الوضع الليلي مع الحفظ المحلي
       ========================================================= */

    const savedTheme = localStorage.getItem('awtad-theme');

    if (savedTheme === 'dark') {
        globalBody.classList.add('dark-theme');
    }

    function updateThemeButton() {
        if (!themeBtn) return;

        const isDark = globalBody.classList.contains('dark-theme');

        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i> <span id="themeBtnText">الوضع المضيء</span>'
            : '<i class="fa-solid fa-moon"></i> <span id="themeBtnText">الوضع الليلي</span>';
    }

    updateThemeButton();

    if (themeBtn) {
        themeBtn.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            globalBody.classList.toggle('dark-theme');

            const isDark = globalBody.classList.contains('dark-theme');
            localStorage.setItem('awtad-theme', isDark ? 'dark' : 'light');

            updateThemeButton();
        });
    }

    /* ==========================================================================
       39. بناء وحقن زر مركز المعرفة والأسئلة العائم ديناميكياً (Blog / FAQs Tracker)
       ========================================================================== */
    // أ) فحص مسار الصفحة الحالي لضبط رابط الانتقال الذكي لصفحة المدونة بدقة في كل المجلدات
    const isInsidePages = window.location.pathname.includes('/pages/');
    const blogPagePath = isInsidePages ? 'blog-faqs.html' : 'pages/blog-faqs.html';

    // ب) صياغة وتوليد هيكل الـ HTML للأيقونة العائمة الجديدة في الذاكرة
    const blogFaqTriggerHTML = `
        <a href="${blogPagePath}" class="vip-blog-faq-trigger" id="vipBlogFaqTriggerBtn" title="الانتقال إلى مدونة المنصة والأسئلة الشائعة">
            <i class="fa-solid fa-book-open"></i>
        </a>
    `;

    // ج) حقن وزرع أيقونة مركز المعرفة ديناميكياً أسفل الـ Body لتظهر في الـ 12 صفحة فوراً 👑
    document.body.insertAdjacentHTML('beforeend', blogFaqTriggerHTML);


    /* ==========================================================================
       40. محرك الفحص الحي وفلترة لوحة الأسئلة والمدونة المتقدمة (blog-faqs.html)
       ========================================================================== */
    // أ) التقاط عناصر لوحة الأسئلة الشائعة الفخمة والربط الحي بالـ Search
    const faqSearchInput = document.getElementById('faqSearchInput');
    const faqItems = document.querySelectorAll('#faqAccordionContainer .faq-item-lux');
    const faqCatBtns = document.querySelectorAll('.faq-categories-nav .faq-cat-btn');

    // 1. منطق الفحص الحي (Live Search Text Checker) بقراءة الحروف فورياً 🔍
    if (faqSearchInput && faqItems.length > 0) {
        faqSearchInput.addEventListener('input', (e) => {
            const searchQuery = e.target.value.toLowerCase().trim();

            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question-text').innerText.toLowerCase();
                const answerText = item.querySelector('.faq-panel-lux p').innerText.toLowerCase();

                // إذا تطابق السؤال أو الجواب مع أحرف البحث يظهر فوراً وإلا يختفي بنعومة
                if (questionText.includes(searchQuery) || answerText.includes(searchQuery)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 2. منطق تصفية وفلترة الأسئلة حسب الأقسام والتصنيفات (FAQ Categories Filter)
    if (faqCatBtns.length > 0 && faqItems.length > 0) {
        faqCatBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetCat = e.currentTarget.getAttribute('data-faq-cat');

                faqCatBtns.forEach(b => b.classList.remove('active-cat-btn'));
                e.currentTarget.classList.add('active-cat-btn');

                faqItems.forEach(item => {
                    const itemCat = item.getAttribute('data-cat');
                    if (targetCat === 'all' || itemCat === targetCat) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. تشغيل حركات الأكورديون الانسيابية بامتثال الـ scrollHeight النظيف
    const faqToggles = document.querySelectorAll('.faq-toggle-lux');
    if (faqToggles.length > 0) {
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const currentItem = e.currentTarget.closest('.faq-item-lux');
                const panel = currentItem.querySelector('.faq-panel-lux');
                const isOpen = currentItem.classList.contains('faq-open');

                document.querySelectorAll('.faq-item-lux').forEach(item => {
                    item.classList.remove('faq-open');
                    item.querySelector('.faq-panel-lux').style.maxHeight = null;
                });

                if (!isOpen) {
                    currentItem.classList.add('faq-open');
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }

    // ==========================================================================
    // ب) محرك تصفية ألبوم المدونة ونظام المقال الداخلي الفخم (Single Post Model)
    // ==========================================================================
    const blogFilterBtns = document.querySelectorAll('.blog-filter-bar .blog-filter-btn');
    const featuredPost = document.querySelector('.featured-post-wrapper');
    const blogCards = document.querySelectorAll('.blog-articles-grid .article-card-lux');

    // 1. تصفية وفلترة كروت ألبوم المدونة (Blog Feed Categorization)
    if (blogFilterBtns.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterValue = e.currentTarget.getAttribute('data-blog-filter');

                blogFilterBtns.forEach(b => b.classList.remove('active-filter'));
                e.currentTarget.classList.add('active-filter');

                // فلترة كروت الشبكة والمقال المثبت
                if (featuredPost) {
                    const featCat = featuredPost.getAttribute('data-blog-cat');
                    featuredPost.style.display = (filterValue === 'all' || filterValue === featCat) ? 'block' : 'none';
                }

                blogCards.forEach(card => {
                    const cardCat = card.getAttribute('data-blog-cat');
                    card.style.display = (filterValue === 'all' || cardCat === filterValue) ? 'block' : 'none';
                });
            });
        });
    }

    // 2. قاعدة بيانات نصوص ومكونات المقالات الداخلية لحقنها حياً بلحظة (Articles DB)
    // 2. قاعدة بيانات نصوص ومكونات المقالات الداخلية لحقنها حياً بلحظة (Articles DB)
    const articlesDatabase = {
        'post-featured': { title: 'بروتوكولات اختيار النفاثة التنفيذية الأنسب لوفود الأعمال القارية', badge: 'طيران خاص VIP', date: '14 أغسطس 2026' },
        'post-1': { title: 'دليل الحصانة والسرية الرقمية لوثائق السفر الدبلوماسية للشركات', badge: 'امتثال ورسميات 🛡️', date: '10 أغسطس 2026' },
        'post-2': { title: 'آليات التنسيق الطبي الدولي وإصدار قبولات المشافي الألمانية الفائقة', badge: 'سياحة علاجية 🏥', date: '05 أغسطس 2026' },
        'post-3': { title: 'إستراتيجيات حوكمة وإدارة ميزانيات سفر الشركات بنظام الـ SLA الصارم', badge: 'سفر الشركات 💼', date: '01 أغسطس 2026' },
        'post-4': { title: 'لوجستيات شحن الأمتعة الدبلوماسية والمعدات الثقيلة لوفود النخبة', badge: 'امتثال ورسميات 🛡️', date: '28 يوليو 2026' }
    };

    // 3. التبديل اللحظي المنزلق بين الألبوم وعرض المقال الفسيح (Single Post Controller)
    const readArticleBtns = document.querySelectorAll('.read-article-btn');
    const blogFeedLayout = document.getElementById('blogMainFeedLayout');
    const singlePostLayout = document.getElementById('singlePostViewLayout');
    const backToFeedBtn = document.getElementById('backToFeedBtn');

    if (readArticleBtns.length > 0 && blogFeedLayout && singlePostLayout && backToFeedBtn) {
        
        readArticleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = e.currentTarget.getAttribute('data-post-id');
                
                if (articlesDatabase[postId]) {
                    const data = articlesDatabase[postId];
                    
                    // حقن العنوان والوسم والتاريخ حياً بداخل ورقة القراءة البيضاء
                    document.getElementById('postInnerTitle').innerText = data.title;
                    document.getElementById('postInnerBadge').innerText = data.badge;
                    document.getElementById('postInnerDate').innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${data.date}`;
                    
                    // إخفاء الألبوم وقذف المقال الداخلي بـ Fade-up فخم وسينمائي
                    blogFeedLayout.style.display = 'none';
                    singlePostLayout.classList.add('view-active');
                    
                    // الصعود التلقائي لقمة الصفحة لراحة بدء القراءة 🔝
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });

        // زر العودة لقائمة الألبوم وإغلاق المقال الداخلي حياً
        backToFeedBtn.addEventListener('click', () => {
            singlePostLayout.classList.remove('view-active');
            blogFeedLayout.style.display = 'block';
            window.scrollTo({ top: 400, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       41. حقن وتأمين أيقونة المفضلة ديناميكياً لكافة الصفحات (Dynamic VIP Favicon)
       ========================================================================== */
    // أ) فحص مسار الوثيقة الحالي لحساب مسار مجلد الملحقات assets بدقة في كل الصفحات
    const isSubFolder = window.location.pathname.includes('/pages/');
    const faviconPath = isSubFolder ? '../assets/logo-favicon.png' : './assets/logo-favicon.png';

    // ب) البحث في الـ head للتأكد مما إذا كانت هناك أيقونة مفضلة قديمة مسجلة
    let faviconLink = document.querySelector("link[rel~='icon']");

    // ج) إذا لم يتم العثور على الوسم، نقوم بتوليده وزرعه برمجياً بالمسار الصحيح فوراً 👑
    if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.type = 'image/png';
        document.head.appendChild(faviconLink);
    }

    // د) حقن وتحديث رابط مسار الأيقونة لتعمل مباشرة على المتصفح
    faviconLink.href = faviconPath;

    /* ==========================================================================
       42. محرك الفحص والتحويل الذكي لصفحة الخطأ (Dynamic Global 404 Redirect)
       ========================================================================== */
    // 1. قاعدة بيانات مصفوفة بأسماء ومسارات كافة الصفحات الحقيقية المعتمدة في قالبك
    const validAwtadPages = [
        'index.html',
        'flights.html',
        'accommodation.html',
        'papers.html',
        'tours.html',
        'corporate.html',
        'private-charter.html',
        'special-tours.html',
        'live-itineraries.html',
        'about.html',
        'contact.html',
        'privacy-policy.html',
        'cookies-policy.html',
        'terms-conditions.html',
        'blog-faqs.html',
        '404.html'
    ];

    // 2. التقاط اسم الملف الحالي الذي يقف عليه المتصفح هلق
    const currentPathName = window.location.pathname;
    const currentFileName = currentPathName.substring(currentPathName.lastIndexOf('/') + 1);

    // 3. فحص أمني: إذا كان الزائر يقف على اسم ملف (وليس المجلد الرئيسي فارغاً) وغير موجود بالقائمة
    if (currentFileName !== "" && !validAwtadPages.includes(currentFileName)) {
        
        // حساب مسار صفحة الـ 404 بدقة بحسب عمق المجلد الحالي لضمان قذفه بشكل سليم
        const isCurrentInPages = currentPathName.includes('/pages/');
        const destination404 = isCurrentInPages ? '../404.html' : './404.html';
        
        // تحويل العميل فوراً وبنعومة مطلقة لصفحة الملاحة الجوية 404 ✈️
        window.location.href = destination404;
    }
