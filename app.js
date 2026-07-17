document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // INITIALIZE LUCIDE ICONS
  // ==========================================================================
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ==========================================================================
  // STICKY HEADER SCROLL EFFECT
  // ==========================================================================
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinksList) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinksList.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // REVEAL ANIMATIONS ON SCROLL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep it clean
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });

  // ==========================================================================
  // TESTIMONIALS SLIDER
  // ==========================================================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (!slides.length) return;
    
    // Deactivate current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Set new slide index
    currentSlide = (index + slides.length) % slides.length;

    // Activate new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startSlideShow() {
    if (slides.length > 1) {
      slideInterval = setInterval(nextSlide, 6000); // Change slides every 6s
    }
  }

  function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
  }

  // Add click events to dots
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetSlideShow();
    });
  });

  // Start rotation
  startSlideShow();

  // ==========================================================================
  // SIMULATED TERMINAL/CONSOLE
  // ==========================================================================
  const consoleTextEl = document.getElementById('skills-console-text');
  if (consoleTextEl) {
    const lines = [
      "$ run-diagnostics --verbose",
      "[INFO] Initializing port scanners... OK",
      "[INFO] Verifying access parameters... OK",
      "[INFO] Active endpoint streams: 12 systems monitored",
      "[ALERT] Port 80 traffic flagged: potential vulnerability scan",
      "[ACTION] Escalating alert to category [TRIAGED-LOW]",
      "[WORKFLOW] Access controls review logs... 100% compliant",
      "[SYSTEM] All security nodes reporting normal bounds. Terminal ready."
    ];

    consoleTextEl.innerHTML = "";
    let lineIdx = 0;

    function printNextLine() {
      if (lineIdx < lines.length) {
        consoleTextEl.innerHTML += (lineIdx > 0 ? "<br>" : "") + lines[lineIdx];
        lineIdx++;
        // Auto scroll if needed
        consoleTextEl.scrollTop = consoleTextEl.scrollHeight;
        setTimeout(printNextLine, 800 + Math.random() * 600); // Type with random delay
      }
    }

    // Start simulation after about 1s
    setTimeout(printNextLine, 1200);
  }

  // ==========================================================================
  // SECURE CONTACT FORM HANDSHAKE SIMULATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('btn-submit-form');

  if (contactForm && statusMsg && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('fullname').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const compVal = document.getElementById('company').value.trim();
      const msgVal = document.getElementById('message').value.trim();

      if (!nameVal || !emailVal || !msgVal) {
        showFormStatus('ERROR: Missing required fields.', 'error');
        return;
      }

      // Start submission process
      submitBtn.disabled = true;
      contactForm.classList.add('submitting');
      
      const originalBtnText = submitBtn.innerHTML;
      
      // Monospace logs during handshake
      const logs = [
        "INITIATING ENCRYPTED HANDSHAKE...",
        "GENERATING LOCAL EPHEMERAL RSA KEYPAIR...",
        "NEGOTIATING SECURE CIPHER SUITE...",
        "TRANSMITTING ENCRYPTED MESSAGE BLOCK...",
        "VERIFYING RECEIPT SIGNATURE..."
      ];
      
      let logStep = 0;
      statusMsg.className = 'form-status-msg success';
      statusMsg.style.display = 'block';
      
      function runHandshakeLog() {
        if (logStep < logs.length) {
          statusMsg.innerHTML = `[SECURE-CONN] ${logs[logStep]}`;
          submitBtn.innerHTML = `Encrypting... [Step ${logStep + 1}/5]`;
          logStep++;
          setTimeout(runHandshakeLog, 450 + Math.random() * 250);
        } else {
          // Success state
          statusMsg.innerHTML = `[SUCCESS] Handshake secure! Message transmitted. Thank you, ${nameVal}. Javier will follow up shortly.`;
          submitBtn.innerHTML = `Securely Transmitted <i data-lucide="check-circle" style="margin-left: 0.5rem; width: 16px; height: 16px;"></i>`;
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
          
          // Clear inputs
          contactForm.reset();
          
          // Re-enable form after a delay
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }
            // Transition status message out slowly
            setTimeout(() => {
              statusMsg.style.opacity = '0';
              statusMsg.style.transition = 'opacity 1s';
              setTimeout(() => {
                statusMsg.style.display = 'none';
                statusMsg.style.opacity = '1';
              }, 1000);
            }, 6000);
          }, 3000);
        }
      }

      runHandshakeLog();
    });
  }

  function showFormStatus(text, type) {
    statusMsg.className = `form-status-msg ${type}`;
    statusMsg.innerHTML = text;
    statusMsg.style.display = 'block';
  }
});
