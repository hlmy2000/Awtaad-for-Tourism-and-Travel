
    /* ==========================================================================
       22. لوحة التبويب الرأسية المتقدمة للخدمات (special-tours.html)
       ========================================================================== */
    const vTabButtons = document.querySelectorAll('.v-tab-btn');
    const vTabPanels = document.querySelectorAll('.v-panel');

    if (vTabButtons.length > 0 && vTabPanels.length > 0) {
        vTabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSpecId = e.currentTarget.getAttribute('data-spec');

                // 1. إزالة التنشيط من كافة الأزرار واللوحات الرأسية
                vTabButtons.forEach(b => b.classList.remove('active-v-tab'));
                vTabPanels.forEach(p => p.classList.remove('active-v-panel'));

                // 2. تفعيل وتلوين العناصر المحددة حالياً بالماوس
                e.currentTarget.classList.add('active-v-tab');
                
                const targetPanel = document.getElementById(targetSpecId);
                if (targetPanel) {
                    targetPanel.classList.add('active-v-panel');
                }
            });
        });
    }

    /* ==========================================================================
       23. نظام تشغيل منشئ ومولد باقات الرحلات المتخصصة الآلي (special-tours.html)
       ========================================================================== */
    const genBtn = document.getElementById('generatePlanBtn');
    const genPurpose = document.getElementById('genPurpose');
    const genTarget = document.getElementById('genTarget');
    const outProgram = document.getElementById('outProgramName');
    const outDuration = document.getElementById('outDurationText');
    const outFeedback = document.getElementById('outFeedbackText');

    // قاعدة بيانات مصفوفة الخطط والحلول اللوجستية المتخصصة المتقاطعة حياً لملء البيانات
    const specialPlansDatabase = {
        'medical-europe': { program: 'برنامج الاستشفاء الألماني الفاخر', duration: 'من 10 إلى 14 يوماً', feedback: 'يتضمن فحصاً طبياً شاملاً في مشفى فرانكفورت الدولي المعتمد، تنسيق السكن الفندقي الـ 5 نجوم للمريض ومرافقيه، مع جولات استجمام ناعمة وهادئة في الطبيعة المصاحبة للشفاء.' },
        'medical-asia': { program: 'برنامج العلاج الطبيعي والطب البديل الاستوائي', duration: 'من 14 إلى 21 يوماً', feedback: 'يغطي جلسات تأهيل وعلاج طبيعي مكثفة في أفضل منتجعات تايوان الطبية المتكاملة، شاملة السكن الصحي والوجبات الغذائية المدروسة والمترجم الميداني المرافق لخطتكم.' },
        'medical-africa': { program: 'باقة الاسترخاء البيئي العلاجي والينابيع الكبريتية', duration: 'من 7 إلى 10 أيام', feedback: 'دمج بين الاستشفاء في الينابيع الكبريتية الطبيعية الساخنة في أفريقيا وجولات بيئية خفيفة لراحة النفس وإعادة الحيوية والنشاط تحت إشراف طبي ولوجستي مخصص من فريقنا.' },
        
        'education-europe': { program: 'دورة اللغة الإنجليزية الأكاديمية ببريطانيا', duration: 'من شهر إلى 3 أشهر (مرن)', feedback: 'تأمين قبول رسمي مكثف في معهد لغات معتمد بأكسفورد، شامل خيارات العيش مع عائلة بريطانية منتقاة لسرعة الطلاقة، وخطوط اتصال ومواصلات ودعم استقبال المطار.' },
        'education-asia': { program: 'دورة اللغات الآسيوية وإدارة الأعمال الدولية', duration: 'شهر واحد مكثف للغاية', feedback: 'دراسة مبادئ اللغة الكورية أو الصينية للأعمال في معاهد تخصصية معتمدة بماليزيا أو تايوان، شاملة السكن الطلابي الحديث وجولات التعرف الثقافي اللوجستية.' },
        'education-africa': { program: 'البعثة الاستكشافية التعليمية والبيئية الميدانية', duration: '3 أسابيع متكاملة', feedback: 'برنامج تعليمي ميداني مميز يجمع بين دراسة لغات محلية خفيفة والمشاركة في بحوث حماية البيئة والمحميات الطبيعية الأفريقية للطلاب وبناء القيادات التنفيذية للنخبة.' },

        'adventure-europe': { program: 'رحلة الكلاسيكو وحضور الفعاليات الرياضية VIP', duration: 'من 4 إلى 6 أيام', feedback: 'تأمين مقاعد المنصات الحصرية (VIP) لحضور كبرى مباريات الدوري الإنجليزي أو دوري أبطال أوروبا، شامل طيران درجة الأعمال الفاخر وفندق 5 نجوم بموقع الحدث مباشرة.' },
        'adventure-asia': { program: 'مغامرة الغوص واستكشاف أعمق البحار وجزر المرجان', duration: '7 أيام متكاملة وشاملة', feedback: 'كورس وغوصات احترافية في أعمق وأجمل المحميات المائية بجزر شرق آسيا، مع توفير كامل المعدات واللوجستيات الحديثة وتأمين طواقم مدربين مرخصين ومرافقين لرحلتكم.' },
        'adventure-africa': { program: 'مغامرة السفاري الأفريقية الكبرى والمغامرات البرية', duration: '8 أيام / 7 ليالي', feedback: 'استكشاف الحياة البرية في كينيا وتنزانيا بسيارات دفع رباعي مكشوفة، إقامة في أكواخ 5 نجوم وسط الغابات، وتذاكر الطيران الداخلي والتأمين اللوجستي الشامل.' }
    };

    if (genBtn && genPurpose && genTarget && outProgram && outDuration && outFeedback) {
        genBtn.addEventListener('click', () => {
            const planKey = `${genPurpose.value}-${genTarget.value}`;
            
            if (specialPlansDatabase[planKey]) {
                const planData = specialPlansDatabase[planKey];
                
                // حقن البيانات والنتائج حياً في كرت النتائج الكحلي المتوهج بالذهبي
                outProgram.innerText = planData.program;
                outDuration.innerText = planData.duration;
                outFeedback.innerText = planData.feedback;
            }
        });
    }

    /* ==========================================================================
       24. تشغيل أكورديون الأسئلة الشائعة بنعومة تامة (special-tours.html)
       ========================================================================== */
    const specialFaqBtns = document.querySelectorAll('.special-faq-section .faq-toggle-btn');
    
    if (specialFaqBtns.length > 0) {
        specialFaqBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currentItem = e.currentTarget.closest('.faq-item');
                const answerPanel = currentItem.querySelector('.faq-answer-panel');
                
                const isOpen = currentItem.classList.contains('faq-open');
                
                // إغلاق أي أكورديون آخر مفتوح بداخل هذا القسم لمنع الازدحام
                document.querySelectorAll('.special-faq-section .faq-item').forEach(item => {
                    item.classList.remove('faq-open');
                    item.querySelector('.faq-answer-panel').style.maxHeight = null;
                });

                if (!isOpen) {
                    currentItem.classList.add('faq-open');
                    // فتح التبويب بنعومة تامة بحسب الارتفاع الطبيعي للنص
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                }
            });
        });
    }
