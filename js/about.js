
    /* ==========================================================================
       26. تشغيل أكورديون الأسئلة الشائعة لصفحة من نحن (about.html)
       ========================================================================== */
    const aboutFaqBtns = document.querySelectorAll('.about-faq-section .about-faq-toggle');
    
    if (aboutFaqBtns.length > 0) {
        aboutFaqBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currentItem = e.currentTarget.closest('.about-faq-item');
                const answerPanel = currentItem.querySelector('.about-faq-panel');
                
                const isOpen = currentItem.classList.contains('faq-open');
                
                // إغلاق أي أكورديون آخر مفتوح بداخل هذا القسم لمنع الازدحام العشوائي
                document.querySelectorAll('.about-faq-section .about-faq-item').forEach(item => {
                    item.classList.remove('faq-open');
                    item.querySelector('.about-faq-panel').style.maxHeight = null;
                });

                if (!isOpen) {
                    currentItem.classList.add('faq-open');
                    // استدعاء وحساب الارتفاع الطبيعي للنص برمجياً لفتحه بنعومة بالغة
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                }
            });
        });
    }
