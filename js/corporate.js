const expenseSlider = document.getElementById('expenseRange');
const currentExpenseDisplay = document.getElementById('currentExpenseValue');
const savedMoneyDisplay = document.getElementById('savedMoneyAmount');

if (expenseSlider && currentExpenseDisplay && savedMoneyDisplay) {
    function updateSavingsCalculator() {
        const expenseValue = parseInt(expenseSlider.value, 10);
        currentExpenseDisplay.innerText = `$${expenseValue.toLocaleString()}`;
        const savingsAmount = Math.ceil(expenseValue * 0.20);
        savedMoneyDisplay.innerText = `$${savingsAmount.toLocaleString()}`;
    }

    expenseSlider.addEventListener('input', updateSavingsCalculator);
    updateSavingsCalculator();
}


// ---

// #### 3️⃣ كود الجافا سكريبت لتشغيل منشئ الباقات التفاعلي للشركات
// افتح ملف الـ JS الخارجي المشترك **`js/main.js`**، وانزل إلى نهايته تماماً داخل دالة الـ `DOMContentLoaded` (قبل إغلاق القوس النهائي مباشرة)، وأضف هذا المنطق البرمجي الاستراتيجي [travel_subscription_tool]:

// ```javascript
    /* ==========================================================================
       18. منشئ باقات الشركات التنفيذي التفاعلي اللحظي (corporate.html)
       ========================================================================== */
    const builderChecks = document.querySelectorAll('.corp-builder-check');
    const genTierName = document.getElementById('generatedTierName');
    const genDiscount = document.getElementById('generatedDiscountValue');
    const builderFeedback = document.getElementById('builderFeedbackText');

    if (builderChecks.length > 0 && genTierName && genDiscount && builderFeedback) {
        
        function updateCorporatePackageBuilder() {
            let selectedCount = 0;
            
            // حساب عدد الخدمات اللوجستية التي حددها مسؤول الشركة بالماوس
            builderChecks.forEach(checkbox => {
                if (checkbox.checked) selectedCount++;
            });

            // تحديث شروط ونوع العقد التقديري والخصومات حياً بناءً على الخيارات
            if (selectedCount <= 1) {
                genTierName.innerText = "العقد الفضي الأساسي";
                genDiscount.innerText = "10%";
                builderFeedback.innerText = "باقة ممتازة تغطي أساسيات السفر الجوي وإصدار التذاكر لموظفي الشركات الناشئة.";
            } else if (selectedCount <= 3) {
                genTierName.innerText = "العقد الذهبي التنفيذي";
                genDiscount.innerText = "18%";
                builderFeedback.innerText = "باقة شاملة وموصى بها بشدة تدمج بين الرفاهية والعملية اللوجستية، وتغطي صالات المطار وسيارات الـ VIP.";
            } else if (selectedCount === 4) {
                genTierName.innerText = "عقد النخبة الفاخر (Elite)";
                genDiscount.innerText = "25% ✨";
                builderFeedback.innerText = "المنظومة اللوجستية القصوى والأثقل؛ تغطي كافة الخدمات المتقدمة بما فيها الطيران الخاص والـ Charter المفتوح لشركتكم.";
            }
        }

        // ربط الأحداث بمربعات التشيك بوكس المخصصة الفخمة
        builderChecks.forEach(checkbox => {
            checkbox.addEventListener('change', updateCorporatePackageBuilder);
        });
    }