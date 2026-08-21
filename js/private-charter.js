
    /* ==========================================================================
       19. تبطئة فيديو واجهة الطيران الخاص الفاخر (private-charter.html)
       ========================================================================== */
    const charterVideo = document.getElementById('charterVideo');
    if (charterVideo) {
        charterVideo.playbackRate = 0.5; // تبطئة حركة الطائرة إلى 50% لتعطي فخامة سينمائية مريحة جداً
    }

    /* ==========================================================================
       20. حاسبة ومحاكاة ميزانية أسعار الطيران الخاص الحية (private-charter.html)
       ========================================================================== */
    const charterHoursSlider = document.getElementById('charterHoursRange');
    const charterHoursDisplay = document.getElementById('charterHoursValue');
    const charterJetSelect = document.getElementById('charterJetSelect');
    const charterAddonChecks = document.querySelectorAll('.charter-addon-check');
    const charterTotalPriceDisplay = document.getElementById('charterTotalPrice');

    if (charterHoursSlider && charterJetSelect && charterTotalPriceDisplay) {
        
        // دالة مخصصة لمعادلة حساب القيمة اللوجستية الإجمالية للطائرة الخاصة
        function calculateCharterFlightBudget() {
            const hours = parseInt(charterHoursSlider.value);
            const hourlyRate = parseInt(charterJetSelect.value);
            
            // تحديث رقم الساعات نصياً أمام العميل
            if (charterHoursDisplay) charterHoursDisplay.innerText = hours;
            
            // أ) الحساب الأساسي: عدد ساعات الطيران مضروباً في التكلفة الساعيّة للفئة المحددة
            let totalBudget = hours * hourlyRate;
            
            // ب) إضافة تكاليف ميزات الرفاهية الإضافية المحددة بالتشيك بوكس
            charterAddonChecks.forEach(addon => {
                if (addon.checked) {
                    totalBudget += parseInt(addon.getAttribute('data-cost'));
                }
            });

            // عرض النتيجة النهائية مع فاصلة الألوف وعلامة الدولار فخامة مطلقة
            charterTotalPriceDisplay.innerText = `$${totalBudget.toLocaleString()}`;
        }

        // تفعيل الأحداث فور تحريك السلايدر أو تغيير الفئة أو تنشيط ميزة مكملة باللمس أو الماوس
        charterHoursSlider.addEventListener('input', calculateCharterFlightBudget);
        charterJetSelect.addEventListener('change', calculateCharterFlightBudget);
        charterAddonChecks.forEach(addon => {
            addon.addEventListener('change', calculateCharterFlightBudget);
        });
    }

    /* ==========================================================================
       21. نظام تشغيل مستشار تخصيص مقصورة الطائرة الخاصة (private-charter.html)
       ========================================================================== */
    const custButtons = document.querySelectorAll('.cust-opt-btn');
    const resLayoutText = document.getElementById('resLayoutText');
    const resCateringText = document.getElementById('resCateringText');

    if (custButtons.length > 0 && resLayoutText && resCateringText) {
        custButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const parentGroup = e.currentTarget.closest('.cust-btn-group');
                const groupType = parentGroup.getAttribute('data-type');
                const selectedValue = e.currentTarget.getAttribute('data-value');

                // 1. إزالة كلاس النشاط والتلوين من كافة أزرار المجموعة المحددة فقط
                parentGroup.querySelectorAll('.cust-opt-btn').forEach(b => b.classList.remove('active-cust-opt'));
                
                // 2. تنشيط الزر الحالي المختار بالماوس
                e.currentTarget.classList.add('active-cust-opt');

                // 3. حقن وتحديث نصوص لوحة العرض الكحلية حياً وبلمح البصر حسب النوع
                if (groupType === 'layout') {
                    resLayoutText.innerText = selectedValue;
                } else if (groupType === 'catering') {
                    resCateringText.innerText = selectedValue;
                }
            });
        });
    }
