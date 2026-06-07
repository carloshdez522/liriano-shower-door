(function () {
  'use strict';

  /* ----- Mobile Menu ----- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ----- Navbar Scroll ----- */
  var navbar = document.getElementById('navbar');
  var heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    if (scrollY > 60) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
    if (heroBg) { heroBg.style.transform = 'scale(1.1) translateY(' + (scrollY * 0.15) + 'px)'; }
  });

  /* ----- Scroll Animations (Intersection Observer) ----- */
  var animateEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animateEls.forEach(function (el) { observer.observe(el); });
  } else {
    animateEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ----- Stats Counter Animation ----- */
  function animateStats(entries, observer) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      var stats = entry.target.querySelectorAll('.stat-number');
      var targets = [];
      stats.forEach(function(el) {
        var text = el.getAttribute('data-target');
        var suffix = text.replace(/[\d,]+/g, '');
        var num = parseInt(text.replace(/[,+%]/g, ''), 10);
        el.textContent = '0' + suffix;
        targets.push({ el: el, target: num, suffix: suffix, current: 0 });
      });
      var duration = 1000;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        targets.forEach(function(t) {
          t.current = Math.floor(progress * t.target);
          t.el.textContent = t.current + t.suffix;
        });
        if (progress < 1) requestAnimationFrame(step);
        else targets.forEach(function(t) { t.el.textContent = t.target + t.suffix; });
      }
      requestAnimationFrame(step);
    });
  }
  var statsObserver = new IntersectionObserver(animateStats, { threshold: 0.3 });
  var aboutStats = document.querySelector('.about-stats');
  if (aboutStats) statsObserver.observe(aboutStats);

  /* ----- Language Switcher ----- */
  var translations = {
    en: {
      nav_about: 'About Us',
      nav_services: 'Services',
      nav_gallery: 'Gallery',
      nav_contact: 'Contact',

      hero_badge: 'Premium Craftsmanship',
      hero_title: 'Glass Solutions',
      hero_p: 'Transform your home into a sanctuary of elegance. Custom glass installations for discerning homeowners across Miami, Miami-Dade and Broward.',
      hero_btn: 'Request a Free Estimate',
      scroll: 'Scroll',
      about_label: 'About Us',
      about_title: 'Crafting Elegance<br>Since 2019',
      about_p1: '<strong>Liriano &amp; Son Shower Doors Corp</strong> is a family-owned business based in Miami dedicated to transforming homes into works of art. Every project starts with a promise: to give our very best. We specialize in shower doors, but we do much more: balustrades, handrails, interior balconies, office partitions, storefronts, mirrors\u2026 <strong>Anything that can be done with glass, we do it and we do it right.</strong>',
      about_p2: '<strong>Why trust us?</strong><br>Because we treat every installation as if it were in our own home. We use premium materials, care for every detail, and don\u2019t consider a job finished until you are 100% satisfied. Since 2019, we have completed <strong>over 1,200 projects</strong> across Miami, Miami-Dade and Broward. And we still have the same passion as day one.<br><strong style="font-size:1.15em">Request your free estimate \u2014 you won\u2019t regret it.</strong>',
      stat1: 'Years Experience',
      stat2: 'Projects Completed',
      stat3: 'Client Satisfaction',
      services_label: 'Our Services',
      services_title: 'Glass Solutions',
      services_p: 'From elegant shower doors to stunning office partitions and glass railings \u2014 we bring precision and beauty to every installation across Miami, Miami-Dade and Broward. Free estimate for your project!',
      gallery_label: 'Portfolio',
      gallery_title: 'Our Work',
      gallery_p: 'Every project is a testament to our craft. Browse a selection of our recent installations.',
      contact_label: 'Get In Touch',
      contact_title: 'Begin Your Transformation',
      contact_p: 'Ready to elevate your space? Schedule a free consultation with our design team.',
      contact_h3: 'Contact Us',
      contact_desc: 'We\'re ready to help with your next glass project. Response in less than 24 hours.',
      contact_phone: 'Phone',
      contact_email: 'Email',
      form_name: 'Full Name',
      form_email: 'Email Address',
      form_phone: 'Phone Number',
      form_service: 'Service Interest',
      form_select: 'Select a service',
      opt_shower: 'Shower Doors',
      opt_cabinets: 'Custom Cabinets',
      opt_partitions: 'Partitions & Railings',
      opt_repair: 'Repair & Replacement',
      opt_mirrors: 'Custom Mirrors & Glass',
      form_message: 'Message',
      form_btn: 'Send Message',
      form_sent: 'Message Sent \u2713',
      form_other: 'Other',
      form_email_ph: 'john@example.com',
      form_phone_ph: '+1 (786) 222-4264',
      form_msg_ph: 'Tell us about your project...',
      gallery1: 'Frameless Enclosure',
      gallery2: 'Modern Bathroom',
      gallery3: 'Glass Partition',
      gallery4: 'Luxury Design',
      gallery5: 'Residential Glass',
      gallery6: 'Premium Finish',
      gallery7: 'Commercial Project',
      gallery8: 'Total Transformation',
      gallery9: 'Luxury Shower',
      gallery10: 'Modern Glass',
      gallery11: 'Glass Finishes',
      gallery12: 'Residential Project',
      gallery13: 'Contemporary Design',
      gallery14: 'Sliding Door',
      gallery15: 'Commercial Glass',
      gallery16: 'Bathroom Remodel',
      gallery17: 'Professional Installation',
      gallery18: 'Custom Design',
      whatsapp_tooltip: 'Chat for a Free Estimate!',
      gallery_social: 'See more of our work at:',
      service1_title: 'Shower Doors',
      service1_desc: 'Custom shower doors, framed or frameless. Premium hardware, watertight seal, and contemporary and modern style for a classy bathroom.',
      service2_title: 'Custom Cabinets',
      service2_desc: 'Custom glass cabinets for display cases or storefronts. Sliding or hinged doors, clear or frosted glass.',
      service3_title: 'Partitions & Railings',
      service3_desc: 'Railings, balustrades, and glass partitions for indoors and outdoors.',
      service4_title: 'Repair & Replacement',
      service4_desc: 'Repair and replacement of all types of glass. Fast, professional service with the same quality standards as a new installation.',
      service5_title: 'Custom Mirrors & Glass',
      service5_desc: 'Custom mirrors and etched glass designs made to measure for residential and commercial spaces.',
      service6_title: 'Hardware & Accessories',
      service6_desc: 'Premium handles, towel bars, shelves, and accessories in brushed brass, matte black, and chrome finishes.',

      footer_p: 'Excellence in glass since 2019. Free estimates for all of Miami, Miami-Dade and Broward!',
      footer_copy: '\u00a9 2026 Liriano and Son Shower Doors Corp',
      wa_msg: 'Hello! I would like to request a free estimate for my project.'
    },
    es: {
      nav_about: 'Nosotros',
      nav_services: 'Servicios',
      nav_gallery: 'Galer\u00eda',
      nav_contact: 'Contacto',

      hero_badge: 'Artesan\u00eda Premium',
      hero_title: 'Soluciones en Vidrio',
      hero_p: 'Transforma tu hogar en un santuario de elegancia. Instalaci\u00f3n de cristaler\u00eda personalizada para propietarios exigentes en Miami, Miami-Dade y Broward.',
      hero_btn: 'Solicita tu Estimado Gratis',
      scroll: 'Desplazar',
      about_label: 'Nosotros',
      about_title: 'Creando Elegancia<br>Desde 2019',
      about_p1: '<strong>Liriano &amp; Son Shower Doors Corp</strong> es un negocio familiar con sede en Miami dedicado a transformar hogares en obras de arte. Cada proyecto comienza con una promesa: dar lo mejor de nosotros. Nos especializamos en puertas de ba\u00f1o, pero hacemos mucho m\u00e1s: balaustradas, pasamanos, balcones interiores, divisiones de oficinas, expositores, vidrieras, espejos\u2026 <strong>Todo lo que se pueda hacer con vidrio, lo hacemos y lo hacemos bien.</strong>',
      about_p2: '<strong>\u00bfPor qu\u00e9 confiar en nosotros?</strong><br>Porque cada instalaci\u00f3n la tratamos como si fuera en nuestra propia casa. Usamos materiales premium, cuidamos cada detalle y no damos un trabajo por terminado hasta que usted est\u00e9 100% satisfecho. Desde 2019, hemos completado <strong>m\u00e1s de 1200 proyectos</strong> en Miami, Miami-Dade y Broward. Y seguimos con la misma ilusi\u00f3n del primer d\u00eda.<br><strong style="font-size:1.15em">Solicite su estimado gratis, no se arrepentir\u00e1.</strong>',
      stat1: 'A\u00f1os de Experiencia',
      stat2: 'Proyectos Completados',
      stat3: 'Satisfacci\u00f3n del Cliente',
      services_label: 'Servicios',
      services_title: 'Soluciones en Vidrio',
      services_p: 'Desde elegantes puertas de ba\u00f1o hasta divisiones de oficinas y barandas de cristal, brindamos precisi\u00f3n y belleza en cada instalaci\u00f3n en Miami, Miami-Dade y Broward. \u00a1Estimado gratis para tu proyecto!',
      gallery_label: 'Portafolio',
      gallery_title: 'Nuestro Trabajo',
      gallery_p: 'Cada proyecto es un testimonio de nuestra artesan\u00eda. Explore una selecci\u00f3n de nuestras instalaciones recientes.',
      contact_label: 'Contacto',
      contact_title: 'Comienza Tu Transformaci\u00f3n',
      contact_p: '\u00bfListo para elevar tu espacio? Programa una consulta gratuita con nuestro equipo de dise\u00f1o.',
      contact_h3: 'Cont\u00e1ctanos',
      contact_desc: 'Estamos listos para ayudarte con tu pr\u00f3ximo proyecto de vidrio. Respuesta en menos de 24 horas.',
      contact_phone: 'Tel\u00e9fono',
      contact_email: 'Correo',
      form_name: 'Nombre Completo',
      form_email: 'Correo Electr\u00f3nico',
      form_phone: 'Tel\u00e9fono',
      form_service: 'Servicio de Inter\u00e9s',
      form_select: 'Seleccione un servicio',
      opt_shower: 'Puertas de Ducha',
      opt_cabinets: 'Gabinetes Personalizados',
      opt_partitions: 'Particiones y Barandales',
      opt_repair: 'Reparaci\u00f3n y Reemplazo',
      opt_mirrors: 'Espejos y Vidrios Personalizados',
      form_message: 'Mensaje',
      form_btn: 'Enviar Mensaje',
      form_sent: 'Mensaje Enviado \u2713',
      form_other: 'Otro',
      form_email_ph: 'ejemplo@correo.com',
      form_phone_ph: '+1 (786) 222-4264',
      form_msg_ph: 'Cu\u00e9ntanos sobre tu proyecto...',
      gallery1: 'Gabinete Sin Marco',
      gallery2: 'Ba\u00f1o Moderno',
      gallery3: 'Partici\u00f3n de Vidrio',
      gallery4: 'Dise\u00f1o de Lujo',
      gallery5: 'Cristaler\u00eda Residencial',
      gallery6: 'Acabado Premium',
      gallery7: 'Proyecto Comercial',
      gallery8: 'Transformaci\u00f3n Total',
      gallery9: 'Ducha de Lujo',
      gallery10: 'Cristaler\u00eda Moderna',
      gallery11: 'Acabados de Vidrio',
      gallery12: 'Proyecto Residencial',
      gallery13: 'Dise\u00f1o Contempor\u00e1neo',
      gallery14: 'Puerta Corrediza',
      gallery15: 'Cristaler\u00eda Comercial',
      gallery16: 'Remodelaci\u00f3n de Ba\u00f1o',
      gallery17: 'Instalaci\u00f3n Profesional',
      gallery18: 'Dise\u00f1o Personalizado',
      whatsapp_tooltip: '\u00a1Chatea por tu Estimado Gratis!',
      gallery_social: 'Vea m\u00e1s de nuestros trabajos en:',
      service1_title: 'Puertas de Ducha',
      service1_desc: 'Puertas de ducha a medida, con o sin marco. Herrajes de calidad, cierre herm\u00e9tico y estilo contempor\u00e1neo y moderno para un ba\u00f1o con clase.',
      service2_title: 'Gabinetes Personalizados',
      service2_desc: 'Gabinetes de vidrio a medida para vitrinas o expositores. Puertas corredizas o abatibles, vidrios claros, esmerilados o con dise\u00f1o.',
      service3_title: 'Particiones y Barandales',
      service3_desc: 'Barandales, balaustradas y particiones de vidrio para interiores y exteriores.',
      service4_title: 'Reparaci\u00f3n y Reemplazo',
      service4_desc: 'Reparaci\u00f3n y reemplazo de todo tipo de vidrio. Servicio r\u00e1pido, profesional y con los mismos est\u00e1ndares de calidad que en una instalaci\u00f3n nueva.',
      service5_title: 'Espejos y Vidrios Personalizados',
      service5_desc: 'Espejos a medida y dise\u00f1os de vidrio grabado a la medida para espacios residenciales y comerciales.',
      service6_title: 'Herrajes y Accesorios',
      service6_desc: 'Manijas premium, barras de toallas, estantes y accesorios en lat\u00f3n cepillado, negro mate y acabados cromados.',

      footer_p: 'Excelencia en vidrio desde 2019. \u00a1Estimado gratis en Miami, Miami-Dade y Broward!',
      footer_copy: '\u00a9 2026 Liriano and Son Shower Doors Corp',
      wa_msg: '\u00a1Hola! Me gustar\u00eda solicitar un estimado gratis para mi proyecto.'
    }
  };

  function applyLang(lang) {
    var t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    if (window.rebuildCarousel) window.rebuildCarousel();
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      el.href = 'https://wa.me/17862224264?text=' + encodeURIComponent(t.wa_msg);
    });
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(this.getAttribute('data-lang'));
    });
  });

  applyLang('en');

  /* ----- Contact Form ----- */
  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_lxCsmIr43HnxtwWXTAwF8hksE00vCR9r91qtkvSucIATqiW9PHgs2jhSwLQebceZLg/exec';

  var form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    if (btn.disabled) return;
    btn.disabled = true;
    var currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');

    var data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value || 'General',
      message: document.getElementById('message').value
    };

    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    })
    .then(function(response) { return response.json(); })
    .then(function(result) {
      btn.textContent = translations[currentLang].form_sent;
      btn.style.background = '#4caf50';
      setTimeout(function () {
        btn.textContent = translations[currentLang].form_btn;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    })
    .catch(function() {
      btn.textContent = translations[currentLang].form_sent;
      btn.style.background = '#4caf50';
      setTimeout(function () {
        btn.textContent = translations[currentLang].form_btn;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  });

  /* ----- Services Carousel ----- */
  var carouselData = [
    { key: 'service1', icon: 'fa-shower', img: 'images/puerta-ducha.webp' },
    { key: 'service2', icon: 'fa-cube', img: 'images/gabinete-vidrio.webp' },
    { key: 'service3', icon: 'fa-building', img: 'images/barandales.webp' },
    { key: 'service4', icon: 'fa-wrench', img: 'images/reparacion.webp' },
    { key: 'service5', icon: 'fa-image', img: 'images/espejos.webp' },
    { key: 'service6', icon: 'fa-tools', img: 'images/herrajes.webp' }
  ];

  var track = document.getElementById('carouselTrack');
  var dotsContainer = document.getElementById('carouselDots');
  var carouselWrap = document.getElementById('carouselWrap');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  if (!track) { return; }

  function getStep() {
    var c = track.querySelector('.carousel-card');
    if (!c) return 364;
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.gap) || 24;
    return c.offsetWidth + gap;
  }

  function getCenterOff() {
    if (window.innerWidth > 768) return 0;
    var card = track.querySelector('.carousel-card');
    var cw = card ? card.offsetWidth : 280;
    return (carouselWrap.offsetWidth - cw) / 2;
  }

  var totalReal = carouselData.length;
  var current = 0;
  var isAnimating = false;
  var autoTimer = null;
  var isPaused = false;

  function buildCarousel() {
    var lang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
    var t = translations[lang];
    var allData = carouselData.concat(carouselData);
    track.innerHTML = '';
    allData.forEach(function(item, i) {
      var div = document.createElement('div');
      div.className = 'carousel-card';
      div.style.backgroundImage = 'url(' + item.img + ')';
      var title = t[item.key + '_title'];
      var desc = t[item.key + '_desc'];
      div.innerHTML = '<div class="overlay"></div><div class="content"><h3>' + title + '</h3><p>' + desc + '</p></div>';
      track.appendChild(div);
    });
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (var i = 0; i < totalReal; i++) {
      var dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', function() { goTo(parseInt(this.getAttribute('data-index'))); });
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index, instant) {
    if (isAnimating) return;
    isAnimating = true;
    current = index;
    var s = getStep();
    var off = getCenterOff();
    track.style.transition = instant ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = 'translateX(' + (off - current * s) + 'px)';
    var idx = current % totalReal;
    dotsContainer.querySelectorAll('.dot').forEach(function(d, i) { d.classList.toggle('active', i === idx); });
    if (current >= totalReal) {
      setTimeout(function() {
        current = current - totalReal;
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (off - current * s) + 'px)';
        isAnimating = false;
      }, 620);
    } else if (current < 0) {
      setTimeout(function() {
        current = totalReal - 1;
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (off - current * s) + 'px)';
        isAnimating = false;
      }, 620);
    } else {
      setTimeout(function() { isAnimating = false; }, 620);
    }
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startAuto() { stopAuto(); autoTimer = setInterval(function() { if (!isPaused) next(); }, 3500); }
  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

  carouselWrap.addEventListener('mouseenter', function() { isPaused = true; });
  carouselWrap.addEventListener('mouseleave', function() { isPaused = false; });
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  /* Drag / Swipe */
  var dragStartX = 0, isDragging = false, dragOffsetX = 0;
  function onDragStart(cx) { isDragging = true; dragStartX = cx; track.classList.add('dragging'); var s = window.getComputedStyle(track).transform; if (s !== 'none') { var v = s.match(/-?\d+\.?\d*/g); if (v) dragOffsetX = parseFloat(v[4]); } }
  function onDragMove(cx) { if (!isDragging) return; track.style.transform = 'translateX(' + (dragOffsetX + cx - dragStartX) + 'px)'; }
  function onDragEnd() { if (!isDragging) return; isDragging = false; track.classList.remove('dragging'); var s = window.getComputedStyle(track).transform; var fx = 0; if (s !== 'none') { var v = s.match(/-?\d+\.?\d*/g); if (v) fx = parseFloat(v[4]); } var st = getStep(); var off = getCenterOff(); var diff = fx - (off - current * st); track.style.transition = 'transform 0.4s ease'; if (diff < -60) { next(); } else if (diff > 60) { prev(); } else { track.style.transform = 'translateX(' + (off - current * st) + 'px)'; } setTimeout(function() { isAnimating = false; }, 450); }

  track.addEventListener('mousedown', function(e) { onDragStart(e.clientX); });
  window.addEventListener('mousemove', function(e) { onDragMove(e.clientX); });
  window.addEventListener('mouseup', function() { onDragEnd(); });
  track.addEventListener('touchstart', function(e) { onDragStart(e.touches[0].clientX); });
  track.addEventListener('touchmove', function(e) { if (isDragging) e.preventDefault(); onDragMove(e.touches[0].clientX); }, { passive: false });
  track.addEventListener('touchend', function() { onDragEnd(); });
  track.addEventListener('touchcancel', function() { onDragEnd(); });

  buildCarousel();
  buildDots();
  current = 0;
  track.style.transition = 'none';
  track.style.transform = 'translateX(' + getCenterOff() + 'px)';
  startAuto();

  /* Rebuild carousel on language change */
  window.rebuildCarousel = function() {
    stopAuto();
    current = 0;
    buildCarousel();
    buildDots();
    track.style.transition = 'none';
    track.style.transform = 'translateX(' + getCenterOff() + 'px)';
    startAuto();
  };

  /* Reposition on resize */
  window.addEventListener('resize', function() {
    track.style.transition = 'none';
    track.style.transform = 'translateX(' + (getCenterOff() - current * getStep()) + 'px)';
  });

  /* ----- Lightbox ----- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('.lightbox-img');
  var lightboxClose = lightbox.querySelector('.lightbox-close');
  var currentItem = null;
  var isAnimating = false;
  var clone = document.createElement('div');
  document.body.appendChild(clone);

  function ss(el, s) { for (var k in s) el.style[k] = s[k]; }

  function lockScroll() {
    var sb = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sb + 'px';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function calcFinal(r) {
    var vw = window.innerWidth, vh = window.innerHeight;
    var maxW = vw * 0.88, maxH = vh * 0.88;
    var aspect = r.width / r.height;
    var fw, fh;
    if (aspect > maxW / maxH) { fw = maxW; fh = maxW / aspect; }
    else { fh = maxH; fw = maxH * aspect; }
    return { w: Math.round(fw), h: Math.round(fh), l: Math.round((vw - fw) / 2), t: Math.round((vh - fh) / 2) };
  }

  document.querySelectorAll('.gallery-item').forEach(function(item) {
    item.addEventListener('click', function() {
      if (isAnimating) return;
      var img = this.querySelector('img');
      if (!img) return;
      currentItem = this;

      var r = img.getBoundingClientRect();
      var fin = calcFinal(r);

      isAnimating = true;
      currentItem.classList.add('active');

      ss(clone, {
        position: 'fixed', zIndex: '99998', display: 'block',
        backgroundImage: 'url("' + img.src + '")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        left: r.left + 'px', top: r.top + 'px',
        width: r.width + 'px', height: r.height + 'px',
        borderRadius: '8px'
      });

      clone.offsetHeight;

      requestAnimationFrame(function() {
        ss(clone, {
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          left: fin.l + 'px', top: fin.t + 'px',
          width: fin.w + 'px', height: fin.h + 'px',
          borderRadius: '4px'
        });
      });

      setTimeout(function() {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        lockScroll();
        clone.style.display = 'none';
        isAnimating = false;
      }, 420);
    });
  });

  function closeLightbox() {
    if (isAnimating) return;
    if (!currentItem) { lightbox.classList.remove('active'); unlockScroll(); return; }

    var img = currentItem.querySelector('img');
    if (!img) { lightbox.classList.remove('active'); unlockScroll(); return; }

    var r = img.getBoundingClientRect();
    var fin = calcFinal(r);

    ss(clone, {
      position: 'fixed', zIndex: '99998', display: 'block',
      backgroundImage: 'url("' + img.src + '")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      left: fin.l + 'px', top: fin.t + 'px',
      width: fin.w + 'px', height: fin.h + 'px',
      borderRadius: '4px'
    });

    lightbox.classList.remove('active');
    isAnimating = true;
    clone.offsetHeight;

    requestAnimationFrame(function() {
      ss(clone, {
        transition: 'all 0.35s ease',
        backgroundSize: 'cover',
        left: r.left + 'px', top: r.top + 'px',
        width: r.width + 'px', height: r.height + 'px',
        borderRadius: '8px'
      });
    });

    setTimeout(function() {
      clone.style.display = 'none';
      currentItem.classList.remove('active');
      isAnimating = false;
      unlockScroll();
    }, 380);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
