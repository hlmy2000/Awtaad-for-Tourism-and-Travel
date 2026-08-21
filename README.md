## Awtad Luxury Travel

Awtad Luxury Travel is a responsive, Arabic-first website for luxury travel and business travel services. It presents flights and transportation, accommodation, visas and travel documents, tours, corporate travel, private charters, and specialized programs through a multi-page experience.

The project is built with vanilla HTML, CSS, and JavaScript, so it can be run directly in a browser or served from any simple static web server.

## Installation

No package manager or build process is required.

1. Download or clone the project.
2. Open the project folder in VS Code or another editor.
3. Open `index.html` in a browser.

For the most reliable experience, especially for local videos and browser security restrictions, use a static server such as the VS Code **Live Server** extension. From the project root, the site should be available at the server's local URL.

## Project Structure

```text
Project_18/
├── index.html                 # Home page
├── assets/                    # Images, logo, and background videos
│   ├── AA/                    # Supporting media collection
│   └── BB/                    # Main website media
├── css/                       # Page-specific and shared stylesheets
│   ├── style.css              # Shared site styles
│   └── *.css                  # Styles for individual pages
├── js/                        # Page interactions and shared behavior
│   ├── script.js              # Navigation, sliders, video, language, and UI features
│   ├── *.js                   # Page-specific JavaScript
│   └── translations/          # Arabic and English dictionaries
├── pages/                     # Secondary pages
└── README.md
```

Main pages include:

- `about.html` - company information
- `flights.html` - flights and transportation
- `accommodation.html` - hotels and accommodation
- `papers.html` - visas and travel documents
- `tours.html` - tourism programs
- `corporate.html` - corporate travel
- `private-charter.html` - private aviation
- `special-tours.html` - specialized programs
- `live-itineraries.html` - live travel itineraries
- `contact.html` - contact and consultation form

## How to Customize

### Content

Edit the text directly in the relevant HTML file. The home page content is in `index.html`, while service pages are in the `pages/` directory.

### Branding and Theme

- Replace `assets/logo.webp` with the new brand logo while keeping the same path, or update the image path in the HTML files.
- Adjust the shared colors, typography, spacing, and responsive rules in `css/style.css`.
- Update page-specific visual treatments in the matching stylesheet, such as `css/flights.css` or `css/contact.css`.
- Change the Google Fonts and Font Awesome CDN references in the `<head>` of the HTML files when using different external assets.

### Images and Videos

Replace the files in `assets/` with media that uses the same filenames, or update the corresponding paths in the HTML and JavaScript files. Hero videos and rotating homepage media are configured in `js/script.js`.

### Translations

Arabic is the source language. Shared Arabic and English UI translations are stored in:

- `js/translations/ar.js`
- `js/translations/en.js`

Add matching keys to both dictionaries when introducing a translatable label. The selected language is remembered in the browser's local storage.

### Navigation and Contact Details

Update navigation links in the header and footer of the HTML pages. Replace the placeholder contact details, social links, form destinations, and map or communication links in the relevant page files and scripts before publishing.

## Features

- Responsive Arabic-first layout with RTL support
- Multi-page service website with shared navigation and footer
- Mobile navigation drawer with dropdown menus and overlay
- Luxury hero sections with image and video backgrounds
- Animated statistics counters and interactive content sections
- Arabic and English language switching with saved preference
- Light and dark mode support
- Consultation and contact interactions
- Travel service pages for individual and corporate customers
- Accessibility-focused attributes and keyboard-friendly controls in the interactive UI
- Google Fonts and Font Awesome integration through CDN
- Static deployment with no framework or build dependency

## Usage

Open the home page through a browser or local static server, then use the navigation menu to browse the available services. On smaller screens, use the menu button to open the navigation drawer. The language and appearance controls can be used to switch the interface and are persisted locally in the browser.

When adding a new page:

1. Create the HTML file inside `pages/`.
2. Link the shared stylesheet and `js/script.js` using paths relative to the new page.
3. Add the page-specific CSS or JavaScript file when needed.
4. Add the page to the navigation and update both translation dictionaries for new shared labels.
5. Test the page at desktop and mobile widths through a local static server.

## Credits

- **Awtad Luxury Travel** - project concept, brand content, and service information.
- **Google Fonts** - Cairo typeface: <https://fonts.google.com/>
- **Font Awesome** - interface icons: <https://fontawesome.com/>

Please verify the licenses and usage terms of any replacement images, videos, fonts, or icons before deploying the website publicly.

## License

Buyer usage terms are defined in `LICENSE.md` (commercial template license for one end project unless the purchase package states otherwise). Reselling the template as a product is not allowed.

---

# أوتاد للسفر الفاخر

أوتاد للسفر الفاخر هو موقع إلكتروني متجاوب، مصمم بشكل أساسي باللغة العربية، لتقديم خدمات السفر الفاخر وسفر الشركات. يعرض الموقع خدمات الطيران والنقل، الإقامة، التأشيرات والوثائق، البرامج السياحية، سفر الشركات، الطيران الخاص، والبرامج المتخصصة ضمن تجربة إلكترونية متعددة الصفحات.

تم بناء المشروع باستخدام HTML وCSS وJavaScript فقط، لذلك يمكن تشغيله مباشرة من المتصفح أو من خلال أي خادم ويب ثابت بسيط.

## التثبيت والتشغيل

لا يحتاج المشروع إلى مدير حزم أو إلى عملية Build.

1. قم بتنزيل المشروع أو استنساخه.
2. افتح مجلد المشروع باستخدام VS Code أو أي محرر آخر.
3. افتح ملف `index.html` في المتصفح.

للحصول على أفضل تجربة، خصوصًا عند تشغيل الفيديوهات المحلية وتجنب قيود أمان المتصفح، يفضل استخدام خادم ثابت مثل إضافة **Live Server** في VS Code. بعد تشغيل الخادم من مجلد المشروع الرئيسي، سيكون الموقع متاحًا على الرابط المحلي الذي يظهره الخادم.

## بنية المشروع

```text
Project_18/
├── index.html                 # الصفحة الرئيسية
├── assets/                    # الصور والشعار وفيديوهات الخلفية
│   ├── AA/                    # مجموعة الوسائط المساعدة
│   └── BB/                    # الوسائط الرئيسية للموقع
├── css/                       # ملفات التنسيق المشتركة والخاصة بالصفحات
│   ├── style.css              # التنسيقات المشتركة للموقع
│   └── *.css                  # تنسيقات الصفحات الفردية
├── js/                        # التفاعلات وسلوك الموقع
│   ├── script.js              # القائمة، الشرائح، الفيديو، اللغة، وميزات الواجهة
│   ├── *.js                   # ملفات JavaScript الخاصة بالصفحات
│   └── translations/          # قواميس اللغة العربية والإنجليزية
├── pages/                     # الصفحات الداخلية
└── README.md
```

### الصفحات الرئيسية

- `about.html` - معلومات عن الشركة
- `flights.html` - الطيران والنقل
- `accommodation.html` - الفنادق والإقامة
- `papers.html` - التأشيرات ووثائق السفر
- `tours.html` - البرامج السياحية
- `corporate.html` - سفر الشركات
- `private-charter.html` - الطيران الخاص
- `special-tours.html` - البرامج المتخصصة
- `live-itineraries.html` - خطط وبرامج الرحلات
- `contact.html` - نموذج التواصل والاستشارة

## كيفية تخصيص المشروع

### المحتوى

قم بتعديل النصوص مباشرة داخل ملف HTML المناسب. محتوى الصفحة الرئيسية موجود في `index.html`، بينما توجد صفحات الخدمات داخل مجلد `pages/`.

### الهوية البصرية والتصميم

- استبدل `assets/logo.webp` بالشعار الجديد مع الحفاظ على المسار نفسه، أو حدّث مسار الصورة داخل ملفات HTML.
- عدّل الألوان والخطوط والمسافات وقواعد التجاوب في `css/style.css`.
- حدّث المظهر الخاص بكل صفحة داخل ملف التنسيق المطابق لها، مثل `css/flights.css` أو `css/contact.css`.
- غيّر روابط Google Fonts وFont Awesome الموجودة داخل وسم `<head>` في ملفات HTML عند استخدام خطوط أو مكتبات خارجية أخرى.

### الصور والفيديوهات

يمكن استبدال الملفات داخل مجلد `assets/` بوسائط جديدة تحمل أسماء الملفات نفسها، أو تحديث المسارات المرتبطة بها داخل ملفات HTML وJavaScript. يتم إعداد فيديوهات الواجهة والوسائط المتغيرة في الصفحة الرئيسية داخل `js/script.js`.

### الترجمة

اللغة العربية هي اللغة الأساسية للموقع. توجد ترجمات عناصر الواجهة المشتركة باللغة العربية والإنجليزية داخل:

- `js/translations/ar.js`
- `js/translations/en.js`

عند إضافة نص جديد قابل للترجمة، أضف المفتاح المقابل إلى القاموسين. يتم حفظ اللغة المختارة في التخزين المحلي للمتصفح.

### القائمة ومعلومات التواصل

حدّث روابط القائمة في الترويسة والتذييل داخل ملفات HTML. وقبل نشر الموقع، استبدل بيانات التواصل التجريبية، وروابط مواقع التواصل الاجتماعي، ووجهات النماذج، وروابط الخرائط أو قنوات الاتصال داخل الملفات والسكريبتات المناسبة.

## الميزات

- تصميم متجاوب باللغة العربية مع دعم اتجاه الكتابة من اليمين إلى اليسار (RTL)
- موقع خدمات متعدد الصفحات مع قائمة وتذييل مشتركين
- قائمة تنقل جانبية للهواتف مع قوائم منسدلة وطبقة خلفية
- أقسام واجهة فاخرة بخلفيات من الصور والفيديوهات
- عدادات إحصائية متحركة وأقسام تفاعلية
- التبديل بين اللغتين العربية والإنجليزية مع حفظ الاختيار
- دعم الوضع النهاري والوضع الليلي
- تفاعلات الاستشارة والتواصل
- صفحات لخدمات السفر الفردي وسفر الشركات
- خصائص تركّز على سهولة الوصول وأزرار تفاعلية مناسبة للاستخدام عبر لوحة المفاتيح
- دمج Google Fonts وFont Awesome عبر CDN
- إمكانية النشر كموقع ثابت بدون إطار عمل أو اعتماديات Build

## طريقة الاستخدام

افتح الصفحة الرئيسية عبر المتصفح أو من خلال خادم محلي ثابت، ثم استخدم قائمة التنقل لاستعراض الخدمات المتاحة. على الشاشات الصغيرة، استخدم زر القائمة لفتح لوحة التنقل. يمكن استخدام أدوات اللغة والمظهر لتغيير الواجهة، ويتم حفظ هذه الاختيارات محليًا في المتصفح.

### إضافة صفحة جديدة

1. أنشئ ملف HTML داخل مجلد `pages/`.
2. اربط ملف التنسيق المشترك وملف `js/script.js` باستخدام مسارات مناسبة لموقع الصفحة الجديدة.
3. أضف ملف CSS أو JavaScript خاصًا بالصفحة عند الحاجة.
4. أضف الصفحة إلى القائمة، وحدّث قاموسي الترجمة عند إضافة نصوص مشتركة جديدة.
5. اختبر الصفحة على أحجام شاشات سطح المكتب والهاتف باستخدام خادم محلي ثابت.

## الاعتمادات والمصادر

- **أوتاد للسفر الفاخر** - فكرة المشروع، محتوى العلامة التجارية، ومعلومات الخدمات.
- **Google Fonts** - خط Cairo: <https://fonts.google.com/>
- **Font Awesome** - أيقونات الواجهة: <https://fontawesome.com/>

يرجى التحقق من تراخيص وشروط استخدام أي صور أو فيديوهات أو خطوط أو أيقونات يتم استبدالها قبل نشر الموقع بشكل عام.

## الترخيص

شروط استخدام المشتري موجودة في `LICENSE.md` (ترخيص قالب تجاري لمشروع نهائي واحد ما لم تنص باقة الشراء على غير ذلك). إعادة بيع القالب كمنتج غير مسموحة.
