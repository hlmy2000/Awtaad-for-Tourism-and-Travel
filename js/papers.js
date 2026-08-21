
    /* ==========================================================================
       13. حاسبة رسوم تأمين السفر الدولي الحية اللحظية (papers.html)
       ========================================================================== */
    const insRegionSelect = document.getElementById('insRegionSelect');
    const insDaysSlider = document.getElementById('insDaysRange');
    const insDaysDisplay = document.getElementById('insDaysValue');
    const insTotalPriceDisplay = document.getElementById('insTotalPrice');

    if (insRegionSelect && insDaysSlider && insTotalPriceDisplay) {
        
        // دالة مخصصة لمعادلة حساب الرسوم التقديرية للوثيقة المعتمدة
        function calculateInsuranceTotal() {
            const days = parseInt(insDaysSlider.value);
            const regionMultiplier = parseFloat(insRegionSelect.value);
            
            // تحديث الرقم نصياً أمام العميل
            if (insDaysDisplay) insDaysDisplay.innerText = days;
            
            // معادلة الحساب: (قاعدة أساسية بقيمة $2 لكل يوم سفر) مضروبة في معامل المنطقة المختار
            const basePrice = days * 2;
            const finalPrice = Math.ceil(basePrice * regionMultiplier);
            
            // عرض النتيجة النهائية المتوهجة بالذهبي
            insTotalPriceDisplay.innerText = `$${finalPrice}`;
        }

        // تفعيل الأحداث فور تحريك السلايدر أو تغيير خيارات الدروب داون للمنطقة
        insDaysSlider.addEventListener('input', calculateInsuranceTotal);
        insRegionSelect.addEventListener('change', calculateInsuranceTotal);
    }

    /* ==========================================================================
       14. أداة تدقيق وفحص وجاهزية ملف التأشيرة (papers.html)
       ========================================================================== */
    const auditChecks = document.querySelectorAll('.audit-check');
    const auditPercentText = document.getElementById('auditPercentText');
    const auditBarFill = document.getElementById('auditBarFill');
    const auditFeedbackMsg = document.getElementById('auditFeedbackMsg');

    if (auditChecks.length > 0 && auditPercentText && auditBarFill) {
        
        function calculateFileReadiness() {
            let totalScore = 0;
            
            // حساب مجموع النقاط بناءً على المربعات المحددة
            auditChecks.forEach(checkbox => {
                if (checkbox.checked) {
                    totalScore += parseInt(checkbox.getAttribute('data-weight'));
                }
            });

            // تحديث النص وشريط التقدم بالـ CSS
            auditPercentText.innerText = `${totalScore}%`;
            auditBarFill.style.width = `${totalScore}%`;

            // تحديث رسائل التغذية الراجعة التفاعلية بذكاء حسب النسبة بالوان الهوية
            if (totalScore === 0) {
                auditFeedbackMsg.innerText = "يرجى البدء في تحديد المستندات المتاحة لديك لفحص الملف حالياً.";
                auditBarFill.style.backgroundColor = "var(--accent-gold)";
            } else if (totalScore <= 25) {
                auditFeedbackMsg.innerText = "ملفك في البداية؛ جواز السفر أساسي لكنه غير كافٍ للتقديم. تحتاج لتجهيز باقي الأوراق البنكية.";
                auditBarFill.style.backgroundColor = "var(--alert-brick)"; // تلوين البار بالقرميدي للتنبيه
            } else if (totalScore <= 50) {
                auditFeedbackMsg.innerText = "أحسنت، قمت بتجهيز نصف الأوراق المطلوبة. ينصح بشدة بالبدء في تجهيز خطاب العمل لإكمال الملف.";
                auditBarFill.style.backgroundColor = "var(--accent-gold)";
            } else if (totalScore <= 75) {
                auditFeedbackMsg.innerText = "ملفك قوي وجاهز بنسبة كبيرة جداً! يتبقى لك فقط التأمين الدولي والحجوزات المبدئية لنقوم بإصدارها لك فوراً.";
                auditBarFill.style.backgroundColor = "var(--secondary-teal)"; // تلوين بالأخضر الواحي للجاهزية المتقدمة
            } else if (totalScore === 100) {
                auditFeedbackMsg.innerText = "تهانينا! ملفك مكتمل 100% ومستنداتك جاهزة تماماً لتقديمها للسفارة وحجز الموعد الفوري دون أي تأخير.";
                auditBarFill.style.backgroundColor = "var(--secondary-teal)";
            }
        }

        // ربط الأحداث عند تفعيل أو إلغاء تفعيل أي مربع تشيك
        auditChecks.forEach(checkbox => {
            checkbox.addEventListener('change', calculateFileReadiness);
        });
    }

    /* ==========================================================================
       15. تشغيل ومعالجة مستشار التأشيرات الذكي المباشر (papers.html)
       ========================================================================== */
    const advBtn = document.getElementById('advisorConsultBtn');
    const advNat = document.getElementById('advisorNationality');
    const advDest = document.getElementById('advisorDestination');
    const advCard = document.getElementById('advisorResultCard');

    // قاعدة بيانات مصفوفة شروط التأشيرات المتبادلة برمجياً
    const visaRulesDatabase = {
        'gcc-uk': { badge: 'إعفاء إلكتروني سريع', text: 'بصفتك مواطناً خليجياً، يمكنك التقديم على إعفاء إلكتروني فوري من التأشيرة (EVW) عبر الإنترنت بكل سهولة، وتصدر الوثيقة خلال 24 ساعة فقط دون الحاجة لزيارة السفارة.', class: 'best-choice' },
        'gcc-turkey': { badge: 'إعفاء كامل من التأشيرة', text: 'أخبار رائعة! حاملو جوازات السفر الخليجية معفيّون تماماً من تأشيرة دخول تركيا لأغراض السياحة لمدة تصل إلى 90 يوماً. يمكنك السفر مباشرة بجواز سفرك فقط.', class: 'best-choice' },
        'gcc-japan': { badge: 'تأشيرة إلكترونية مرنة', text: 'يمكنك التقديم على التأشيرة اليابانية الإلكترونية (e-Visa) عبر النظام الموحد بسهولة بالغة، وتستغرق معالجتها حوالي 5 أيام عمل فقط لتصلك على إيميلك.', class: 'economy-choice' },
        'gcc-schengen': { badge: 'فيزا مسبقة من السفارة', text: 'دول الشنغن تتطلب تقديماً مسبقاً عبر المكاتب المعتمدة (VFS Global). نساعدك في حجز الموعد وتجهيز كامل مستنداتك وتأمين السفر الدولي لضمان صدور فيزا طويلة الأجل تصل لـ 5 سنوات.', class: 'regular-choice' },
        
        'egypt-uk': { badge: 'فيزا مسبقة من السفارة', text: 'تتطلب تأشيرة بريطانيا للمواطنين المصريين تقديماً مسبقاً في المركز المعتمد. نساعدك في ترجمة الأوراق القانونية وحجز الموعد وبناء خطة سفر تفصيلية لرفع نسب القبول لأقصى حد.', class: 'regular-choice' },
        'egypt-turkey': { badge: 'تأشيرة إلكترونية أو سفارة', text: 'إذا كان عمرك دون الـ 20 أو فوق الـ 45 عاماً، يمكنك الحصول على فيزا إلكترونية فورية. لغير هذه الأعمار، نساعدك في التقديم الورقي عبر المكتب المعتمد بكل سلاسة وسرعة.', class: 'economy-choice' },
        'egypt-japan': { badge: 'فيزا مسبقة من السفارة', text: 'تتطلب فيزا ورقية مسبقة عبر القنصلية اليابانية بالقاهرة. يتولى فريقنا مراجعة حسابك البنكي، وتجهيز برنامج الرحلة اليومي الدقيق والخطابات المطلوبة لضمان موافقة القنصل.', class: 'regular-choice' },
        'egypt-schengen': { badge: 'فيزا مسبقة من السفارة', text: 'تتطلب تقديماً ورقياً عبر مراكز (VFS/TLS). نقوم بتدقيق كشف الحساب الخاص بك وترجمة المستندات وإصدار تأمين سفر الشنغن الإلزامي بقيمة €30,000 مجاناً مع باقة التقديم لدينا.', class: 'regular-choice' },

        'jordan-uk': { badge: 'فيزا مسبقة من السفارة', text: 'تتطلب تقديماً ورقياً عبر المركز المعتمد. يتولى مستشارونا مراجعة روابط الاستقرار المالي والوظيفي الخاصة بك وتعبئة الطلبات بشكل احترافي لتفادي أي أسباب للرفض.', class: 'regular-choice' },
        'jordan-turkey': { badge: 'إعفاء كامل من التأشيرة', text: 'مبارك! المواطنون الأردنيون معفيّون تماماً من تأشيرة دخول تركيا للسياحة والإقامات القصيرة حتى 90 يوماً. يمكنك حجز تذكرتك والسفر مباشرة بحرية تامة.', class: 'best-choice' },
        'jordan-japan': { badge: 'فيزا مسبقة من السفارة', text: 'تتطلب فيزا ورقية مسبقة عبر السفارة اليابانية بعمّان. نساعدك في حجز الموعد وتأمين حجوزات الطيران والفنادق المؤكدة المطلوبة لملف التأشيرة الخاص بك.', class: 'regular-choice' },
        'jordan-schengen': { badge: 'فيزا مسبقة من السفارة', text: 'تتطلب إجراءات تقديم ورقية وبصمة حيوية في المراكز المعتمدة. فريقنا يتولى حجز الموعد وتعبئة الأبليكيشن المعقد وإصدار وثيقة التأمين الصحي الدولي المطلوبة للسفارة.', class: 'regular-choice' }
    };

    if (advBtn && advNat && advDest && advCard) {
        advBtn.addEventListener('click', () => {
            const ruleKey = `${advNat.value}-${advDest.value}`;
            
            if (visaRulesDatabase[ruleKey]) {
                const rule = visaRulesDatabase[ruleKey];
                
                // حقن البيانات في كرت النتيجة مباشرة
                document.getElementById('advResultText').innerText = rule.text;
                const badgeEl = document.getElementById('advResultBadge');
                badgeEl.innerText = rule.badge;
                badgeEl.className = `flight-status-badge ${rule.class}`; // استخدام كلاسات الألوان الجاهزة لدينا بالـ CSS

                // إظهار الكرت بحركة انسيابية فخمة
                advCard.classList.add('show-advisor');
            }
        });
    }
