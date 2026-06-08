(function () {
  'use strict';

  const recordList = $('recordList');

  $('headerBrand').addEventListener('click', () => { location.href = 'index.html'; });

  async function loadRecords() {
    try {
      const jobs = await getJobs();
      const doneJobs = jobs.filter(j => j.status === 'done');
      doneJobs.sort((a, b) => b.createdAt - a.createdAt);

      if (doneJobs.length === 0) {
        recordList.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>${t('empty')}</p></div>`;
        return;
      }

      recordList.innerHTML = doneJobs.map(j => {
        const total = calcTotal(j);
        const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(getLang() === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
        return `
          <div class="job-card" data-id="${j.id}">
            <div class="job-card-top">
              <div class="job-card-title">${esc(j.job || j.name || '')}</div>
              <span class="job-card-badge done">${t('completed')}</span>
            </div>
            <div class="job-card-info">
              <span><i class="fas fa-user"></i>${esc(j.name || '')}</span>
              <span><i class="fas fa-calendar"></i>${esc(dateStr)}</span>
              ${j.address ? `<span><i class="fas fa-map-pin"></i>${esc(j.address)}</span>` : ''}
            </div>
            <div class="job-card-amount">$${total.toFixed(2)}</div>
            <div class="job-card-actions">
              <button class="job-action-btn view-pdf" data-id="${j.id}"><i class="fas fa-file-pdf"></i> ${t('view_pdf')}</button>
              <button class="job-action-btn delete" data-id="${j.id}"><i class="fas fa-trash"></i> ${t('del')}</button>
            </div>
          </div>`;
      }).join('');

      recordList.querySelectorAll('.job-card').forEach(card => {
        card.addEventListener('click', e => {
          if (e.target.closest('.job-action-btn')) return;
          showRecordDetail(card.dataset.id);
        });
      });

      recordList.querySelectorAll('.view-pdf').forEach(btn => {
        btn.addEventListener('click', e => { e.stopPropagation(); getJobById(btn.dataset.id).then(j => showPDFPreview(j)); });
      });

      recordList.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', e => { e.stopPropagation(); showDeleteModal(btn.dataset.id); });
      });

    } catch {
      recordList.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>${t('error_api')}</p></div>`;
    }
  }

  function showRecordDetail(jobId) {
    getJobById(jobId).then(j => {
      if (!j) return;
      const total = calcTotal(j);
      const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(getLang() === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

      const itemsHtml = (j.items || []).map(it => `
        <div class="detail-item-row">
          <div class="detail-item-info">
            <strong>${esc(it.item || '—')}</strong>
            ${(it.dimensionsW || it.dimensionsH) ? `<span class="detail-item-desc">${esc(it.dimensionsW || '?')} x ${esc(it.dimensionsH || '?')} ${esc(it.dimensionsUnit || 'in')}</span>` : ''}
            ${it.description ? `<span class="detail-item-desc">${esc(it.description)}</span>` : ''}
          </div>
          <div class="detail-item-price">$${(parseFloat(it.price) || 0).toFixed(2)}</div>
        </div>
      `).join('');

      const detailHtml = `
        <div class="detail-overlay" id="detailOverlay">
          <div class="detail-card">
            <div class="form-top" style="margin-bottom:12px">
              <button class="form-back" id="detailClose"><i class="fas fa-arrow-left"></i></button>
              <h2 class="form-view-title">${t('detail_title')}</h2>
            </div>
            <div class="detail-header">
              <div>
                <h3>${esc(j.job || '')}</h3>
                <div class="detail-id">#${esc(j.id)}</div>
              </div>
              <span class="detail-badge done">${t('completed')}</span>
            </div>
            <div class="detail-amount">$${total.toFixed(2)}</div>
            <div class="detail-field"><span class="detail-field-label">${t('name')}</span><span class="detail-field-value">${esc(j.name || '—')}</span></div>
            <div class="detail-field"><span class="detail-field-label">${t('date')}</span><span class="detail-field-value">${esc(dateStr)}</span></div>
            <div class="detail-field"><span class="detail-field-label">${t('address')}</span><span class="detail-field-value">${esc(j.address || '—')}</span></div>
            ${j.phone ? `<div class="detail-field"><span class="detail-field-label">${t('phone')}</span><span class="detail-field-value">${esc(j.phone)}</span></div>` : ''}
            ${(j.items || []).length > 0 ? `<div class="detail-section-title" style="margin-top:16px">${t('items')}</div><div class="detail-items-list">${itemsHtml}</div>` : ''}
            <div class="detail-actions" style="margin-top:20px">
              <button class="detail-btn delete-btn" id="dtlDelete"><i class="fas fa-trash"></i> ${t('del')}</button>
            </div>
          </div>
        </div>`;

      const wrapper = document.createElement('div');
      wrapper.innerHTML = detailHtml;
      document.body.appendChild(wrapper.firstElementChild);

      $('detailClose').addEventListener('click', () => { $('detailOverlay').remove(); });
      $('detailOverlay').addEventListener('click', e => { if (e.target === $('detailOverlay')) $('detailOverlay').remove(); });

      if ($('dtlDelete')) {
        $('dtlDelete').addEventListener('click', () => {
          $('detailOverlay').remove();
          showDeleteModal(j.id);
        });
      }
    });
  }

  function showDeleteModal(id) {
    showModal(t('confirm_delete_title'), t('confirm_delete_msg'), t('confirm_yes'), true, async () => {
      try {
        await deleteJob(id);
        showToast(t('deleted'));
        loadRecords();
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  function getLang() {
    const l = localStorage.getItem('liriano_lang') || 'en';
    return l;
  }

  loadRecords();

})();
