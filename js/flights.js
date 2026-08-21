
    /* ==========================================================================
       10. لوحة التبويب المتقدمة والتحكم بمحرك حجز الطيران (flights.html)
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.tab-nav-btn');
    const tabPanels = document.querySelectorAll('.tab-content-panel');
    const oneWayRadio = document.getElementById('oneWayRadio');
    const roundTripRadio = document.getElementById('roundTripRadio');
    const returnFieldGroup = document.getElementById('returnDateFieldGroup');

    // أ) منطق عمل التبديل بين التبويبات الثلاثة (حجز، مقارنة، نقل)
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTabId = e.currentTarget.getAttribute('data-tab');

                tabButtons.forEach(b => b.classList.remove('active-tab'));
                tabPanels.forEach(p => p.classList.remove('active-panel'));

                e.currentTarget.classList.add('active-tab');
                
                const targetPanel = document.getElementById(targetTabId);
                if (targetPanel) {
                    targetPanel.classList.add('active-panel');
                }
            });
        });
    }

    // ب) منطق إظهار وإخفاء حقل العودة في محرك البحث
    if (oneWayRadio && roundTripRadio && returnFieldGroup) {
        function toggleReturnDateField() {
            if (roundTripRadio.checked) {
                returnFieldGroup.classList.add('show-return');
            } else {
                returnFieldGroup.classList.remove('show-return');
            }
        }

        toggleReturnDateField(); // فحص الحالة الابتدائية

        oneWayRadio.addEventListener('change', toggleReturnDateField);
        roundTripRadio.addEventListener('change', toggleReturnDateField);
    }

    
    /* ==========================================================================
       11. نظام محاكاة تتبع حالة الرحلات (Live Tracker) (flights.html)
       ========================================================================== */
    const trackBtn = document.getElementById('trackFlightBtn');
    const trackInput = document.getElementById('flightNumberInput');
    const resultPanel = document.getElementById('trackerResultPanel');

    // مصفوفة بيانات وهمية لمحاكاة استعلام حقيقي يبهر العميل
    const mockFlightsData = {
        'sv123': { code: 'SV 123', status: 'في الموعد', statusClass: 'status-on-time', depCity: 'الرياض (RUH)', arrCity: 'لندن (LHR)', depTime: '14:30', arrTime: '19:45', gate: 'G12', terminal: 'الصالة 3' },
        'ek201': { code: 'EK 201', status: 'متأخرة', statusClass: 'status-delayed', depCity: 'دبي (DXB)', arrCity: 'نيويورك (JFK)', depTime: '08:20', arrTime: '14:15', gate: 'B22', terminal: 'الصالة 1' },
        'tk182': { code: 'TK 182', status: 'في الموعد', statusClass: 'status-on-time', depCity: 'إسطنبول (IST)', arrCity: 'باريس (CDG)', depTime: '11:05', arrTime: '13:40', gate: 'A05', terminal: 'الصالة الرئيسية' }
    };

    if (trackBtn && trackInput && resultPanel) {
        trackBtn.addEventListener('click', () => {
            const flightCode = trackInput.value.toLowerCase().trim().replace(/\s+/g, '');
            
            if (mockFlightsData[flightCode]) {
                const data = mockFlightsData[flightCode];
                
                // تغذية وحقن النصوص داخل اللوحة البرمجية مباشرة
                document.getElementById('resFlightCode').innerText = data.code;
                const statusEl = document.getElementById('resFlightStatus');
                statusEl.innerText = data.status;
                statusEl.className = `flight-status-live ${data.statusClass}`;
                
                document.getElementById('resDepartureCity').innerText = data.depCity;
                document.getElementById('resArrivalCity').innerText = data.arrCity;
                document.getElementById('resDepartureTime').innerText = data.depTime;
                document.getElementById('resArrivalTime').innerText = data.arrTime;
                document.getElementById('resFlightGate').innerText = data.gate;
                document.getElementById('resFlightTerminal').innerText = data.terminal;

                // إظهار اللوحة بحركة ناعمة
                resultPanel.classList.add('show-panel');
            } else {
                alert('عذراً، لم يتم العثور على بيانات لهذه الرحلة. يرجى كتابة (SV123) أو (EK201) أو (TK182) للتجربة!');
                resultPanel.classList.remove('show-panel');
            }
        });
    }

    /* ==========================================================================
       12. تشغيل أكورديون الأسئلة الشائعة بنعومة كاملة (flights.html)
       ========================================================================== */
    const faqBtns = document.querySelectorAll('.faq-toggle-btn');
    
    if (faqBtns.length > 0) {
        faqBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currentItem = e.currentTarget.closest('.faq-item');
                const answerPanel = currentItem.querySelector('.faq-answer-panel');
                
                // التحقق مما إذا كان العنصر الحالي مفتوحاً بالفعل لإغلاقه
                const isOpen = currentItem.classList.contains('faq-open');
                
                // إغلاق أي أكورديون آخر مفتوح لمنع الازدحام العشوائي (نمط احترافي)
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('faq-open');
                    item.querySelector('.faq-answer-panel').style.maxHeight = null;
                });

                if (!isOpen) {
                    currentItem.classList.add('faq-open');
                    // استخدام الـ scrollHeight لحساب الارتفاع الطبيعي للنص برمجياً وفتحه بنعومة بالغة
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                }
            });
        });
    }
