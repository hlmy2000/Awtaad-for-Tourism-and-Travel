    /* ==========================================================================
       27. نظام التحقق والمحاكاة لـ صندوق المراسلة الفوري (contact.html)
       ========================================================================== */
    const contactForm = document.getElementById('luxuryContactForm');
    const formSubmitBtn = document.getElementById('luxFormSubmitBtn');
    const formAlertBox = document.getElementById('luxFormAlert');

    if (contactForm && formSubmitBtn && formAlertBox) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // منع إعادة تحميل الصفحة الافتراضية لحماية تجربة العميل
            
            // التقاط قيم المدخلات للتحقق اللحظي النظيف
            const name = document.getElementById('luxName').value.trim();
            const email = document.getElementById('luxEmail').value.trim();
            const phone = document.getElementById('luxPhone').value.trim();
            const message = document.getElementById('luxMessage').value.trim();

            if (name !== "" && email !== "" && phone !== "" && message !== "") {
                // إظهار بوكس التأكيد الكحلي الفخم بـ Fade-in ناعم واحترافي للغاية
                formAlertBox.classList.add('show-alert');
                
                // تصفير وإعادة تهيئة الحقول بعد نجاح الإرسال الافتراضي
                contactForm.reset();
            }
        });
    }

    /* ==========================================================================
       27. نظام محاكاة جدولة المواعيد واستشارات الـ VIP حياً (contact.html)
       ========================================================================== */
    const schedBtn = document.getElementById('bookAppointmentBtn');
    const schedDateInput = document.getElementById('schedDate');
    const schedTimeSelect = document.getElementById('schedTime');
    const outTimeText = document.getElementById('outSchedTimeText');
    const outLinkText = document.getElementById('outSchedLinkText');
    const resTitle = document.getElementById('schedResultTitle');
    const schedFeedback = document.getElementById('schedFeedbackText');

    if (schedBtn && schedDateInput && schedTimeSelect && outTimeText && outLinkText && resTitle && schedFeedback) {
        
        // ضبط تاريخ اليوم كحد أدنى لحقل الإدخال لمنع اختيار تواريخ سابقة برمجياً (تأمين كامل)
        const today = new Date().toISOString().split('T')[0];
        schedDateInput.min = today;
        schedDateInput.value = today; // وضع تاريخ اليوم كقيمة ابتدائية

        schedBtn.addEventListener('click', () => {
            const dateValue = schedDateInput.value;
            const timeValue = schedTimeSelect.value;

            if (dateValue !== "") {
                // محاكاة توليد كود وتشفير سري عشوائي للموعد يبهر المشتري
                const randomSessionId = Math.floor(100000 + Math.random() * 900000);
                
                // تحديث العناوين بنجاح وبألوان الهوية الفاخرة
                resTitle.innerText = "🎉 تم تأكيد وتأمين موعدكم!";
                resTitle.style.color = "var(--accent-gold)";
                
                outTimeText.innerText = `${dateValue} في تمام الساعة ${timeValue}`;
                outLinkText.innerText = `https://zoom.us{randomSessionId}`;
                
                schedFeedback.innerText = "باقة استشارية مشفرة بالكامل؛ تم حجز وتخصيص الجلسة بنجاح، وتم إرسال كود التفعيل والدخول الخاص بكم إلى إيميل شركتكم المعتمد فوراً.";
            } else {
                alert('يرجى اختيار تاريخ صالح لجدول استشارتكم الفاخرة أولاً!');
            }
        });
    }

    /* ==========================================================================
       28. نظام محاكاة تتبع حالة الطلبات والمعاملات الحية (contact.html)
       ========================================================================== */
    const reqTrackBtn = document.getElementById('trackRequestBtn');
    const reqTrackInput = document.getElementById('reqTrackerInput');
    const reqResultPanel = document.getElementById('reqTrackerResultPanel');

    // قاعدة بيانات مصفوفة عينات حقيقية من الطلبات لتبهر المشتري
    const mockRequestsDatabase = {
        'lux-101': { code: 'LUX-101', status: 'مكتمل ومؤكد', type: 'حجز طائرة خاصة + تأشيرة شنغن (أوروبا)', progress: 'تم إصدار الفيزا وجدولة الطائرة النفاثة بنجاح وجاهزة للإقلاع', agent: 'المهندس سلمان الميموني' },
        'lux-202': { code: 'LUX-202', status: 'تحت المعالجة', type: 'برنامج علاجي طبي شامل (ألمانيا)', progress: 'تم استلام التقارير المترجمة بامتثال كامل وحجز موعد البروفيسور مسبقاً', agent: 'د. وائل الحسين' },
        'lux-303': { code: 'LUX-303', status: 'مكتمل ومؤكد', type: 'قبول معهد لغات وسكن عائلي (بريطانيا)', progress: 'تم حصد القبول الرسمي وتأمين السكن واستخراج فيزا الطالب بنجاح', agent: 'الأستاذ رائد التميمي' }
    };

    if (reqTrackBtn && reqTrackInput && reqResultPanel) {
        reqTrackBtn.addEventListener('click', () => {
            const reqCode = reqTrackInput.value.toLowerCase().trim().replace(/\s+/g, '');
            
            if (mockRequestsDatabase[reqCode]) {
                const data = mockRequestsDatabase[reqCode];
                
                // حقن وتغذية النصوص بداخل البانيل الكحلي حياً بلمح البصر
                document.getElementById('resReqCode').innerText = data.code;
                document.getElementById('resReqStatus').innerText = data.status;
                document.getElementById('resReqType').innerText = data.type;
                document.getElementById('resReqProgress').innerText = data.progress;
                document.getElementById('resReqAgent').innerText = data.agent;

                // إظهار اللوحة الفخمة بحركة ناعمة انسيابية
                reqResultPanel.classList.add('show-panel');
            } else {
                alert('عذراً، لم يتم العثور على بيانات لهذه المعاملة. يرجى كتابة (LUX-101) أو (LUX-202) أو (LUX-303) للتجربة والمشاهدة الحية!');
                reqResultPanel.classList.remove('show-panel');
            }
        });
    }

    /* ==========================================================================
       29. نظام تشغيل مؤشر حساب زمن الاستجابة المتوقع حياً (contact.html)
       ========================================================================== */
    const estCategorySelect = document.getElementById('estSupportCategory');
    const estMinutesTitle = document.getElementById('estResultMinutes');
    const outEstPriority = document.getElementById('outEstPriorityText');
    const outEstStatus = document.getElementById('outEstStatusText');

    // قاعدة بيانات مصفوفة مواصفات ومحاكاة الـ SLA المتوقعة حياً بالوان الهوية
    const estResponseDatabase = {
        'charter': { time: 'أقل من 5 دقائق ⚡', priority: 'أولوية قصوى (VIP Extreme)', status: 'نشط ومستعد بالكامل لإقلاع طارئ', color: 'var(--secondary-teal)' },
        'corporate': { time: 'خلال 15 دقيقة فقط ⏱️', priority: 'أولوية متقدمة لقطاع الأعمال', status: 'نشط ومتاح لمعالجة عروض العقود والـ SLA', color: 'var(--accent-gold)' },
        'visa': { time: 'خلال 30 دقيقة كحد أقصى', priority: 'أولوية متوسطة (استشارات عامة)', status: 'نشط ويعمل على تدقيق مستندات القنصليات', color: 'var(--accent-gold)' },
        'general': { time: 'خلال 45 دقيقة كحد أقصى', priority: 'أولوية عادية (حجوزات أفراد)', status: 'نشط ويتولى مراجعة بوابات الفنادق والطيران', color: '#dfdbd3' }
    };

    if (estCategorySelect && estMinutesTitle && outEstPriority && outEstStatus) {
        
        function updateLiveResponseEstimator() {
            const selectedCategory = estCategorySelect.value;
            
            if (estResponseDatabase[selectedCategory]) {
                const data = estResponseDatabase[selectedCategory];
                
                // حقن وتحديث نصوص لوحة النتائج الكحلية حياً وبلمح البصر حسب الفئة
                estMinutesTitle.innerText = data.time;
                estMinutesTitle.style.color = data.color; // تلوين وقت الاستجابة باللون المخصص حياً
                
                outEstPriority.innerText = data.priority;
                outEstStatus.innerText = data.status;
            }
        }

        // ربط الأحداث فور تغيير خيار الدروب داون المخصص للعميل بالماوس أو اللمس
        estCategorySelect.addEventListener('change', updateLiveResponseEstimator);
        updateLiveResponseEstimator(); // تشغيل أولي عند تحميل الصفحة لضبط الخيار الافتراضي الأول
    }
