(function () {
  'use strict';

  var reviews = [];
  var currentFilter = 'all';

  async function loadReviews() {
    var list = $('reviewList');
    list.innerHTML = '<div class="empty-state"><i class="fas fa-spinner fa-spin"></i><p>' + t('reviews_loading') + '</p></div>';
    try {
      reviews = await getReviews();
    } catch (e) {
      reviews = [];
    }
    updateStats();
    renderList();
  }

  function getFiltered() {
    if (currentFilter === 'all') return reviews;
    return reviews.filter(function (r) {
      if (currentFilter === 'pending') return !r.approved && r.status !== 'rejected';
      if (currentFilter === 'approved') return r.approved === true;
      if (currentFilter === 'rejected') return r.status === 'rejected';
      return true;
    });
  }

  function updateStats() {
    var total = reviews.length;
    var pending = reviews.filter(function (r) { return !r.approved && r.status !== 'rejected'; }).length;
    var approved = reviews.filter(function (r) { return r.approved === true; }).length;
    var rejected = reviews.filter(function (r) { return r.status === 'rejected'; }).length;
    $('statTotal').textContent = total;
    $('statPending').textContent = pending;
    $('statApproved').textContent = approved;
    $('statRejected').textContent = rejected;
  }

  function renderList() {
    var list = $('reviewList');
    var filtered = getFiltered();

    if (!filtered.length) {
      list.innerHTML = '<div class="empty-state"><i class="fas fa-star"></i><p>' + t('reviews_empty_list') + '</p></div>';
      return;
    }

    list.innerHTML = filtered.map(function (r) {
      var starsHtml = '';
      for (var i = 1; i <= 5; i++) {
        starsHtml += '<i class="fas fa-star' + (i > r.rating ? '" style="color:rgba(255,255,255,0.15)"' : '" style="color:#f0c040"') + '></i>';
      }

      var statusLabel = '';
      var statusClass = '';
      if (r.approved === true) {
        statusLabel = t('reviews_approved');
        statusClass = 'approved';
      } else if (r.status === 'rejected') {
        statusLabel = t('reviews_rejected');
        statusClass = 'rejected';
      } else {
        statusLabel = t('reviews_pending');
        statusClass = 'pending';
      }

      var dateStr = r.date || (r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : '');
      var serviceStr = r.serviceType ? '<span class="review-card-service">' + esc(r.serviceType) + '</span>' : '';

      var actionsHtml = '';
      if (!r.approved && r.status !== 'rejected') {
        actionsHtml += '<button class="job-action-btn approve review-approve" data-id="' + r.id + '"><i class="fas fa-check"></i> ' + t('reviews_approve') + '</button>';
        actionsHtml += '<button class="job-action-btn delete review-reject" data-id="' + r.id + '"><i class="fas fa-times"></i> ' + t('reviews_reject') + '</button>';
      } else if (r.approved) {
        actionsHtml += '<button class="job-action-btn delete review-reject" data-id="' + r.id + '"><i class="fas fa-times"></i> ' + t('reviews_reject') + '</button>';
      } else {
        actionsHtml += '<button class="job-action-btn approve review-approve" data-id="' + r.id + '"><i class="fas fa-check"></i> ' + t('reviews_approve') + '</button>';
      }
      actionsHtml += '<button class="job-action-btn delete review-delete" data-id="' + r.id + '"><i class="fas fa-trash"></i></button>';

      var photoHtml = r.photo ? '<div class="review-card-photo" style="margin:8px 0 0"><img src="' + esc(r.photo) + '" alt="" style="width:100%;max-height:120px;object-fit:cover;border-radius:6px"></div>' : '';

      return '<div class="job-card">'
        + '<div class="job-card-top">'
        + '<div class="job-card-title">' + esc(r.name) + '</div>'
        + '<span class="job-card-badge ' + statusClass + '">' + statusLabel + '</span>'
        + '</div>'
        + '<div class="review-card-stars" style="margin-bottom:6px">' + starsHtml + '</div>'
        + '<div class="job-card-info">'
        + '<span><i class="fas fa-tag"></i> ' + esc(r.serviceType || '—') + '</span>'
        + '<span><i class="fas fa-calendar"></i> ' + dateStr + '</span>'
        + '</div>'
        + '<p style="font-size:0.85rem;color:rgba(255,255,255,0.7);line-height:1.6;margin-bottom:8px">' + esc(r.text) + '</p>'
        + photoHtml
        + '<div class="job-card-actions">' + actionsHtml + '</div>'
        + '</div>';
    }).join('');

    /* Attach event listeners */
    list.querySelectorAll('.review-approve').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        approveReview(id);
      });
    });
    list.querySelectorAll('.review-reject').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        rejectReview(id);
      });
    });
    list.querySelectorAll('.review-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        deleteReviewItem(id);
      });
    });
  }

  async function approveReview(id) {
    try {
      await updateReview(id, { approved: true, status: 'approved' });
      showToast(t('reviews_approved_msg'), 'success');
      loadReviews();
    } catch (e) {
      showToast(t('error_api'), 'error');
    }
  }

  async function rejectReview(id) {
    try {
      await updateReview(id, { approved: false, status: 'rejected' });
      showToast(t('reviews_rejected_msg'), 'success');
      loadReviews();
    } catch (e) {
      showToast(t('error_api'), 'error');
    }
  }

  async function deleteReviewItem(id) {
    var self = this;
    showModal(t('confirm_delete_title'), t('reviews_delete_msg'), t('confirm_yes'), true, async function () {
      try {
        await deleteReview(id);
        showToast(t('deleted'), 'success');
        loadReviews();
      } catch (e) {
        showToast(t('error_api'), 'error');
      }
    });
  }

  /* ===== Filters ===== */
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderList();
    });
  });

  /* ===== Home ===== */
  $('homeBtn').addEventListener('click', function () {
    location.href = 'index.html';
  });
  $('headerBrand').addEventListener('click', function () {
    location.href = 'index.html';
  });
  $('logoutBtn').addEventListener('click', function () {
    location.href = 'index.html';
  });

  loadReviews();
})();
