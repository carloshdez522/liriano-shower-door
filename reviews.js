(function () {
  'use strict';

  var translations = {
    en: {
      reviews_form_label: 'Leave a Review',
      reviews_form_title: 'Tell Us About Your Experience',
      reviews_form_p: 'Your feedback helps us improve and helps others choose with confidence.',
      reviews_form_name: 'Your Name', reviews_form_name_ph: 'John Doe',
      reviews_form_service: 'Service Received', reviews_form_select: 'Select a service',
      reviews_form_rating: 'Rating',
      reviews_form_review: 'Your Review', reviews_form_review_ph: 'Tell us about your experience...',
      reviews_form_photo: 'Photo (optional)', reviews_form_photo_btn: 'Add a photo of your project',
      reviews_form_submit: 'Submit Review',
      reviews_form_error: 'Please select a rating and enter your name.',
      reviews_form_network: 'Could not submit your review. Please try again.',
      reviews_form_submitting: 'Submitting...',
      review_modal_title: 'Thank You!',
      review_modal_msg: 'Your review has been submitted successfully.',
      review_modal_exit: 'Exit',
      footer_p: 'Excellence in glass since 2019. Free estimates for all of Miami, Miami-Dade and Broward!',
      footer_copy: '\u00a9 2026 Liriano and Son Shower Doors Corp',
    },
    es: {
      reviews_form_label: 'Deja tu Rese\u00f1a',
      reviews_form_title: 'Cu\u00e9ntanos Tu Experiencia',
      reviews_form_p: 'Tus comentarios nos ayudan a mejorar y ayudan a otros a elegir con confianza.',
      reviews_form_name: 'Tu Nombre', reviews_form_name_ph: 'Juan P\u00e9rez',
      reviews_form_service: 'Servicio Recibido', reviews_form_select: 'Selecciona un servicio',
      reviews_form_rating: 'Puntuaci\u00f3n',
      reviews_form_review: 'Tu Rese\u00f1a', reviews_form_review_ph: 'Cu\u00e9ntanos tu experiencia...',
      reviews_form_photo: 'Foto (opcional)', reviews_form_photo_btn: 'A\u00f1ade una foto de tu proyecto',
      reviews_form_submit: 'Enviar Rese\u00f1a',
      reviews_form_error: 'Por favor selecciona una puntuaci\u00f3n y escribe tu nombre.',
      reviews_form_network: 'No se pudo enviar tu rese\u00f1a. Intenta de nuevo.',
      reviews_form_submitting: 'Enviando...',
      review_modal_title: '\u00a1Gracias!',
      review_modal_msg: 'Tu rese\u00f1a ha sido enviada exitosamente.',
      review_modal_exit: 'Salir',
      footer_p: 'Excelencia en vidrio desde 2019. \u00a1Estimado gratis en Miami, Miami-Dade y Broward!',
      footer_copy: '\u00a9 2026 Liriano and Son Shower Doors Corp',
    }
  };

  var currentLang = localStorage.getItem('liriano_lang') || 'en';
  var selectedRating = 0;
  var selectedPhotoData = null;

  function t(key) {
    return translations[currentLang]?.[key] || translations.en[key] || key;
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('liriano_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(this.getAttribute('data-lang'));
    });
  });

  /* ===== Navbar Scroll ===== */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ===== Star Rating ===== */
  var stars = document.querySelectorAll('#starRating i');
  var ratingInput = document.getElementById('reviewRating');

  function getStarValue(e) {
    var star = e.currentTarget;
    var val = parseFloat(star.getAttribute('data-value'));
    var rect = star.getBoundingClientRect();
    var x = e.clientX - rect.left;
    if (x < rect.width / 2) val = val - 0.5;
    return val < 0.5 ? 0.5 : val;
  }

  stars.forEach(function (star) {
    star.addEventListener('click', function (e) {
      var val = getStarValue(e);
      selectedRating = val;
      ratingInput.value = val;
      updateStars(val);
    });
    star.addEventListener('mousemove', function (e) {
      var val = getStarValue(e);
      updateStars(val);
    });
    star.addEventListener('mouseleave', function () {
      updateStars(selectedRating);
    });
  });

  function updateStars(val) {
    stars.forEach(function (s) {
      var sv = parseFloat(s.getAttribute('data-value'));
      s.className = '';
      if (val >= sv) {
        s.classList.add('fas', 'fa-star', 'active');
      } else if (val >= sv - 0.5) {
        s.classList.add('fas', 'fa-star-half', 'active');
      } else {
        s.classList.add('fas', 'fa-star');
      }
    });
  }

  /* ===== Photo Upload ===== */
  var photoInput = document.getElementById('reviewPhoto');
  var photoPreview = document.getElementById('photoPreview');
  var photoPreviewImg = document.getElementById('photoPreviewImg');
  var photoRemove = document.getElementById('photoRemove');
  var photoUpload = document.getElementById('photoUpload');

  photoInput.addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo must be less than 5MB');
      this.value = '';
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      selectedPhotoData = e.target.result;
      photoPreviewImg.src = selectedPhotoData;
      photoPreview.style.display = 'block';
      photoUpload.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });

  photoRemove.addEventListener('click', function () {
    selectedPhotoData = null;
    photoPreview.style.display = 'none';
    photoUpload.style.display = 'block';
    photoInput.value = '';
  });

  /* ===== Form Submit ===== */
  var form = document.getElementById('reviewForm');
  var submitBtn = document.getElementById('reviewSubmitBtn');
  var modal = document.getElementById('reviewModal');
  var modalStars = document.getElementById('modalStars');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var name = document.getElementById('reviewName').value.trim();
    var text = document.getElementById('reviewText').value.trim();
    var service = document.getElementById('reviewService').value;
    var rating = parseFloat(ratingInput.value);

    if (!name || !rating) {
      alert(t('reviews_form_error'));
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>' + t('reviews_form_submitting') + '</span>';

    var data = {
      name: name,
      rating: rating,
      text: text,
      serviceType: service || '',
      photo: selectedPhotoData || null,
    };

    try {
      var res = await fetch('/app/api/reviews.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
    } catch (err) {
      showToast('Could not submit review. Please try again.', 'error');
      return;
    }

    var starsHtml = '';
    for (var i = 1; i <= 5; i++) {
      var cls = 'fas fa-star' + (i > rating ? ' empty' : '');
      starsHtml += '<i class="' + cls + '"></i>';
    }
    modalStars.innerHTML = starsHtml;
    modal.classList.add('active');
  });

  applyLang(currentLang);
})();
