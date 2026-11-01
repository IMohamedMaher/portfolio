/**
 * ENG. MOHAMED MAHER - Official Portfolio JavaScript
 * Interactivity, Filtering, WhatsApp Contact Engine
 */

document.addEventListener('DOMContentLoaded', function () {
  const WHATSAPP_PHONE = '201223223463'; // +201223223463

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
  // Contact Form Submission (WhatsApp Integration)
  // ==========================================
  const contactForm = document.getElementById('portfolioContactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim();
      const phone = document.getElementById('contactPhone')?.value.trim();
      const service = document.getElementById('contactService')?.value;
      const message = document.getElementById('contactMsg')?.value.trim();

      if (!name) {
        alert('برجاء كتابة الاسم الكريم.');
        return;
      }

      if (!phone || phone.length < 8) {
        alert('برجاء إدخال رقم الهاتف / الواتساب للتواصل.');
        return;
      }

      const formattedText =
        `*✨ طلب تواصل جديد عبر الموقع الشخصي | Eng. Mohamed Maher ✨*\n` +
        `-----------------------------------------\n` +
        `👤 *الاسم:* ${name}\n` +
        `📞 *الهاتف / واتساب:* ${phone}\n` +
        `💼 *الخدمة المطلوبة:* ${service}\n` +
        (message ? `📝 *تفاصيل الاستفسار:* ${message}\n` : '') +
        `-----------------------------------------\n` +
        `سعدت بالتواصل معك مهندس محمد!`;

      const encoded = encodeURIComponent(formattedText);
      const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;

      // Button visual feedback
      const submitBtn = contactForm.querySelector('.btn-contact-submit');
      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري فتح محادثة الواتساب...</span>';
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
        }, 3000);
      }

      // Open on mobile and desktop
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
  const yr = document.getElementById('year');
  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
});
