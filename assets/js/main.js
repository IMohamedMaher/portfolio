/**
 * ENG. MOHAMED MAHER - Official Portfolio JavaScript
 * Full Bilingual Engine (AR/EN), Filtering, WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', function () {
  const WHATSAPP_PHONE = '201223223463'; // +201223223463
  const htmlRoot = document.documentElement;

  // ==========================================
  // Bilingual Engine (Arabic <-> English)
  // ==========================================
  const langToggle = document.getElementById('langToggle');

  function setLanguage(lang) {
    if (lang === 'en') {
      htmlRoot.setAttribute('lang', 'en');
      htmlRoot.setAttribute('dir', 'ltr');
      document.title = 'Eng. Mohamed Maher | Founder & CEO @ Micro Link | CTO & Principal Architect';
      if (langToggle) {
        langToggle.innerHTML = '<i class="fa-solid fa-globe"></i> <span class="lang-text">العربية</span>';
      }
    } else {
      htmlRoot.setAttribute('lang', 'ar');
      htmlRoot.setAttribute('dir', 'rtl');
      document.title = 'المهندس محمد ماهر | Eng. Mohamed Maher — Founder & CEO of Micro Link | CTO & Principal Architect';
      if (langToggle) {
        langToggle.innerHTML = '<i class="fa-solid fa-globe"></i> <span class="lang-text">English</span>';
      }
    }

    // Update input placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      el.placeholder = (lang === 'en') ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-ar-placeholder');
    });

    // Update select options text
    document.querySelectorAll('option[data-en]').forEach(el => {
      el.textContent = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-ar');
    });

    localStorage.setItem('maher_preferred_lang', lang);
  }

  // Check saved language or default to 'ar'
  const savedLang = localStorage.getItem('maher_preferred_lang') || 'ar';
  setLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const currentLang = htmlRoot.getAttribute('lang') || 'ar';
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  // ==========================================
  // Mobile Nav Toggle
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // ==========================================
  // Projects Filter Tabs
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal || (cat && cat.includes(filterVal))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // Contact Form Submission (Bilingual WhatsApp Engine)
  // ==========================================
  const contactForm = document.getElementById('portfolioContactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const currentLang = htmlRoot.getAttribute('lang') || 'ar';
      const name = document.getElementById('contactName')?.value.trim();
      const phone = document.getElementById('contactPhone')?.value.trim();
      const serviceSelect = document.getElementById('contactService');
      const selectedOption = serviceSelect?.options[serviceSelect.selectedIndex];
      const service = currentLang === 'en' 
        ? (selectedOption?.getAttribute('data-en') || selectedOption?.value)
        : (selectedOption?.getAttribute('data-ar') || selectedOption?.value);
      const message = document.getElementById('contactMsg')?.value.trim();

      if (!name) {
        alert(currentLang === 'en' ? 'Please enter your name.' : 'برجاء كتابة الاسم الكريم.');
        return;
      }

      if (!phone || phone.length < 8) {
        alert(currentLang === 'en' ? 'Please enter a valid phone or WhatsApp number.' : 'برجاء إدخال رقم الهاتف / الواتساب للتواصل.');
        return;
      }

      let formattedText = '';
      if (currentLang === 'en') {
        formattedText =
          `*✨ New Inquiry via Official Portfolio | Eng. Mohamed Maher ✨*\n` +
          `-----------------------------------------\n` +
          `👤 *Name / Organization:* ${name}\n` +
          `📞 *Phone / WhatsApp:* ${phone}\n` +
          `💼 *Required Service:* ${service}\n` +
          (message ? `📝 *Project Brief:* ${message}\n` : '') +
          `-----------------------------------------\n` +
          `Looking forward to collaborating with you Eng. Mohamed!`;
      } else {
        formattedText =
          `*✨ طلب تواصل جديد عبر الموقع الشخصي | Eng. Mohamed Maher ✨*\n` +
          `-----------------------------------------\n` +
          `👤 *الاسم / المؤسسة:* ${name}\n` +
          `📞 *الهاتف / واتساب:* ${phone}\n` +
          `💼 *الخدمة المطلوبة:* ${service}\n` +
          (message ? `📝 *تفاصيل الاستفسار:* ${message}\n` : '') +
          `-----------------------------------------\n` +
          `سعدت بالتواصل معك مهندس محمد!`;
      }

      const encoded = encodeURIComponent(formattedText);
      const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;

      // Button visual feedback
      const submitBtn = contactForm.querySelector('.btn-contact-submit');
      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = currentLang === 'en'
          ? '<i class="fa-solid fa-spinner fa-spin"></i> <span>Opening WhatsApp chat...</span>'
          : '<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري فتح محادثة الواتساب...</span>';
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
        }, 3000);
      }

      // Safe navigation on mobile and desktop
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|FB_IAB|FBAN|FBAV|Instagram/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = waUrl;
      } else {
        const newWin = window.open(waUrl, '_blank');
        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
          window.location.href = waUrl;
        }
      }
    });
  }

  // Set current year
  const currentYear = new Date().getFullYear();
  const yr = document.getElementById('year');
  if (yr) yr.textContent = currentYear;
  const yr2 = document.getElementById('year2');
  if (yr2) yr2.textContent = currentYear;
});
