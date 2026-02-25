document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. Header Scroll Effect
  ===================================================== */
  const header = document.getElementById("header");

  if (header) {
    const handleScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
  }


  /* =====================================================
     2. Fade-up Animation (IntersectionObserver)
  ===================================================== */
  const fadeElements = document.querySelectorAll(".fade-up");

  if (fadeElements.length) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }


  /* =====================================================
     3. Count-up Animation
  ===================================================== */
  const counters = document.querySelectorAll(".count-up");

  if (counters.length) {

    const animateCount = (el, endValue) => {
      const duration = 2000;
      const startTime = performance.now();

      const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(ease * endValue);

        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = endValue.toLocaleString();
        }
      };

      requestAnimationFrame(update);
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        if (!el.dataset.counted) {
          el.dataset.counted = "true";

          const target = parseInt(el.dataset.target, 10);
          if (!isNaN(target)) {
            animateCount(el, target);
          }
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));
  }


  /* =====================================================
     4. FAQ Accordion
  ===================================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length) {
    faqItems.forEach(item => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector(".faq-icon");

      if (!button || !answer) return;

      button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all
        faqItems.forEach(other => {
          other.classList.remove("active");
          const otherAnswer = other.querySelector(".faq-answer");
          const otherIcon = other.querySelector(".faq-icon");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        });

        // Open selected
        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
          if (icon) icon.style.transform = "rotate(45deg)";
        }
      });
    });
  }


  /* =====================================================
     5. Hamburger Menu
  ===================================================== */
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".menu-overlay");
  const body = document.body;

  let mobileMenu = null;

  if (hamburger) {
    const controlsId = hamburger.getAttribute("aria-controls");
    if (controlsId) {
      mobileMenu = document.getElementById(controlsId);
    }
  }

  const toggleMenu = () => {
    if (!hamburger || !mobileMenu || !overlay) return;

    const isOpen = hamburger.classList.toggle("active");

    mobileMenu.classList.toggle("active", isOpen);
    overlay.classList.toggle("active", isOpen);
    body.classList.toggle("menu-open", isOpen);

    hamburger.setAttribute("aria-expanded", isOpen);
  };

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", toggleMenu);
  }

  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });


  /* =====================================================
     6. Contact Demo Form
  ===================================================== */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("これはデモフォームです。実際のご連絡はココナラ内メッセージよりお願いいたします。");
    });
  }


  /* =====================================================
     7. Lucide Icons Init
  ===================================================== */
  if (window.lucide) {
    lucide.createIcons();
  }

});