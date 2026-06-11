(function () {
  'use strict';

  /* ===== DOM REFS ===== */
  const jobsView = $('jobsView');
  const formView = $('formView');
  const detailView = $('detailView');
  const detailContent = $('detailContent');
  const jobList = $('jobList');
  const searchInput = $('searchInput');
  const filterBar = $('filterBar');
  const fabBtn = $('fabBtn');
  const formBack = $('formBack');
  const detailBack = $('detailBack');
  const formViewTitle = $('formViewTitle');
  const valeForm = $('valeForm');
  const saveBtn = $('saveBtn');

  const itemsCompactList = $('itemsCompactList');
  const addItemBtn = $('addItemBtn');
  const itemFormView = $('itemFormView');
  const itemFormBack = $('itemFormBack');
  const itemFormTitle = $('itemFormTitle');
  const itemFormBody = $('itemFormBody');
  const itemFormSaveBtn = $('itemFormSaveBtn');
  const ifTemper = $('itemFormTemper');
  const ifTemperText = $('itemFormTemperText');
  const ifName = $('itemFormName');
  const ifDesc = $('itemFormDesc');
  const ifDimW = $('itemFormDimW');
  const ifDimH = $('itemFormDimH');
  const ifDimUnit = $('itemFormDimUnit');
  const ifGlass = $('itemFormGlass');
  const ifInstall = $('itemFormInstall');
  const ifInstallUnit = $('itemFormInstallUnit');
  const ifUnitPrice = $('itemFormUnitPrice');
  const ifPrice = $('itemFormPrice');

  let itemsData = [];
  let itemIdCounter = 0;
  let editingItemId = null;

  const f = {
    job: $('valeJob'), date: $('valeDate'), name: $('valeName'),
    address: $('valeAddress'), phone: $('valePhone'), email: $('valeEmail'),
  };

  const fSubtotal = $('fSubtotal');
  const fTaxRate = $('fTaxRate');
  const fSalesTax = $('fSalesTax');
  const fDeposit = $('fDeposit');
  const fTotalReadonly = $('fTotalReadonly');
  const fDepositLabel = $('fDepositLabel');

  let editingJobId = null;
  let currentDetailId = null;
  let itemFormStatus = 'estimado';
  let lastView = 'jobs';
  let skipPush = false;

  function setUrl(path) {
    if (location.protocol !== 'file:' && !skipPush) {
      history.pushState(null, '', '/app' + path);
    }
    skipPush = false;
  }

  /* ===== NAVIGATION ===== */
  function showView(view) {
    jobsView.style.display = view === 'jobs' ? 'block' : 'none';
    formView.style.display = view === 'form' ? 'block' : 'none';
    detailView.style.display = view === 'detail' ? 'block' : 'none';
    itemFormView.style.display = 'none';
    fabBtn.classList.toggle('hidden', view !== 'jobs');
  }

  function showJobs() {
    lastView = 'jobs';
    showView('jobs');
    getCurrentFilter();
    renderJobList(getCurrentFilter());
    setUrl('/jobs');
  }

  /* ===== FILTERS ===== */
  function getCurrentFilter() {
    const active = filterBar.querySelector('.filter-btn.active');
    return active ? active.dataset.filter : 'all';
  }

  async function updateCounts() {
    try {
      const jobs = await getJobs();
      $('countAll').textContent = jobs.filter(j => j.status !== 'done').length;
      $('countEstimado').textContent = jobs.filter(j => j.status === 'estimado').length;
      $('countInvoice').textContent = jobs.filter(j => j.status === 'invoice').length;
    } catch {}
  }

  async function renderJobList(filter) {
    filter = filter || 'all';
    const query = (searchInput.value || '').toLowerCase().trim();
    let jobs;
    try {
      jobs = await getJobs();
    } catch {
      jobList.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>${t('error_api')}</p></div>`;
      return;
    }
    jobs.sort((a, b) => b.createdAt - a.createdAt);
    if (filter === 'all') jobs = jobs.filter(j => j.status !== 'done');
    else if (filter === 'estimado') jobs = jobs.filter(j => j.status === 'estimado');
    else if (filter === 'invoice') jobs = jobs.filter(j => j.status === 'invoice');
    if (query) {
      const words = query.split(/\s+/).filter(Boolean).map(w => w.replace(/[^a-z0-9]/g, ''));
      jobs = jobs.filter(j => {
        const itemText = (j.items || []).map(it => (it.item || '') + ' ' + (it.description || '')).join(' ');
        const total = calcTotal(j);
        const haystack = (
          (j.name || '') + ' ' + (j.job || '') + ' ' + (j.phone || '') + ' ' + (j.address || '') + ' ' + itemText + ' ' +
          (total || '') + ' ' + (j.date || '') + ' ' + formatId(j.id) + ' ' + (j.id || '') + ' ' +
          (j.phone || '').replace(/[^a-z0-9]/g, '')
        ).toLowerCase();
        return words.every(w => haystack.includes(w));
      });
    }

    updateCounts();

    if (jobs.length === 0) {
      jobList.innerHTML = `<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>${t('empty')}</p></div>`;
      return;
    }

    jobList.innerHTML = jobs.map(j => {
      const badgeClass = j.status === 'estimado' ? 'estimado' : j.status === 'done' ? 'done' : 'invoice';
      const badgeLabel = j.status === 'estimado' ? t('estimados').slice(0, -1) : j.status === 'done' ? t('done') : t('facturas').slice(0, -1);
      const total = calcTotal(j);
      const itemCount = (j.items || []).length;
      const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(getLang() === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
      return `
        <div class="job-card" data-id="${j.id}">
          <div class="job-card-top">
            <div class="job-card-title">${esc(j.job || j.name || '')} <span class="job-card-id">${formatId(j.id)}</span></div>
            <span class="job-card-badge ${badgeClass}">${badgeLabel}</span>
          </div>
          <div class="job-card-info">
            <span><i class="fas fa-user"></i>${esc(j.name || '')}</span>
            <span><i class="fas fa-calendar"></i>${esc(dateStr)}</span>
            ${j.address ? `<span><i class="fas fa-map-pin"></i>${esc(j.address)}</span>` : ''}
          </div>
          <div class="job-card-amount">$${total.toFixed(2)}${itemCount > 0 ? ` <span class="job-card-count">(${itemCount} ${t('items')})</span>` : ''}</div>
          <div class="job-card-actions">
            <button class="job-action-btn view-pdf" data-id="${j.id}"><i class="fas fa-file-pdf"></i> ${t('view_pdf')}</button>
            ${j.status === 'estimado' ? `<button class="job-action-btn approve" data-id="${j.id}"><i class="fas fa-check-circle"></i> ${t('approve')}</button>` : ''}
            ${j.status === 'invoice' ? `<button class="job-action-btn done" data-id="${j.id}"><i class="fas fa-check-double"></i> ${t('done')}</button>` : ''}
            <button class="job-action-btn edit-job" data-id="${j.id}"><i class="fas fa-pen"></i> ${t('edit')}</button>
            <button class="job-action-btn delete" data-id="${j.id}"><i class="fas fa-trash"></i> ${t('del')}</button>
          </div>
        </div>`;
    }).join('');

    jobList.querySelectorAll('.job-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.job-action-btn')) return;
        showDetail(card.dataset.id);
      });
    });
    jobList.querySelectorAll('.view-pdf').forEach(btn => {
      btn.addEventListener('click', async e => { e.stopPropagation(); const j = await getJobById(btn.dataset.id); await showPDFPreview(j, btn); });
    });
    jobList.querySelectorAll('.approve').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); showApproveModal(btn.dataset.id); });
    });
    jobList.querySelectorAll('.done').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); showDoneModal(btn.dataset.id); });
    });
    jobList.querySelectorAll('.edit-job').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openForm(btn.dataset.id); });
    });
    jobList.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); showDeleteModal(btn.dataset.id); });
    });
  }

  /* ===== FORM ===== */
  function openForm(jobId) {
    editingJobId = jobId || null;
    lastView = jobId ? 'detail' : 'jobs';
    showView('form');
    valeForm.reset();

    setUrl('/jobs' + (jobId ? '/' + formatId(jobId) : '/new'));

    if (editingJobId) {
      formViewTitle.textContent = t('edit_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      getJobById(editingJobId).then(j => {
        if (!j) return;
        itemFormStatus = j.status || 'estimado';
        const badge = $('editFormBadge');
        const wrap = $('editFormBadgeWrap');
        badge.textContent = j.status === 'estimado' ? t('pdf_estimate') : t('pdf_invoice');
        badge.className = 'edit-badge ' + (j.status === 'estimado' ? 'estimado' : 'invoice');
        wrap.style.display = '';
        f.job.value = j.job || '';
        f.date.value = j.date || '';
        f.name.value = j.name || '';
        f.address.value = j.address || '';
        f.phone.value = j.phone || '';
        f.email.value = j.email || '';
        fTaxRate.value = j.taxRate ?? '';
        fSalesTax.value = j.salesTax ?? '';
        fDeposit.value = j.deposit ?? '';
        itemsData = (j.items || []).map(it => ({ ...it }));
        itemIdCounter = itemsData.reduce((max, it) => Math.max(max, it.id || 0), 0) + 1;
        renderCompactItems();
      });
    } else {
      itemFormStatus = 'estimado';
      formViewTitle.textContent = t('new_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      $('editFormBadgeWrap').style.display = 'none';
      f.date.value = new Date().toISOString().split('T')[0];
      fTaxRate.value = '';
      fSalesTax.value = '';
      fDeposit.value = '';
      itemsData = [];
      itemIdCounter = 1;
      renderCompactItems();
    }
    applyTranslations(formView);
  }

  /* ===== DETAIL ===== */
  async function showDetail(jobId) {
    currentDetailId = jobId;
    lastView = 'detail';
    showView('detail');
    detailContent.innerHTML = `<div class="detail-loading"><i class="fas fa-spinner"></i></div>`;
    setUrl('/jobs/' + formatId(jobId));

    try {
      const j = await getJobById(jobId);
      if (!j) { detailContent.innerHTML = `<p>${t('error_api')}</p>`; return; }

      const badgeClass = j.status === 'estimado' ? 'estimado' : j.status === 'done' ? 'done' : 'invoice';
      const badgeLabel = j.status === 'estimado' ? t('pdf_estimate') : j.status === 'done' ? t('done') : t('pdf_invoice');
      const total = calcTotal(j);
      const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(getLang() === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

      const isInvoice = j.status === 'invoice';
      const itemsHtml = (j.items || []).map((it, idx) => {
        const installVal = (parseFloat(it.installation) || 0) + (it.installationUnit ? ' ' + it.installationUnit : '');
        return `
        <div class="detail-item-row" data-item-index="${idx}">
          <div class="detail-item-info">
            <strong>${esc(it.item || '—')}</strong>
            ${(it.dimensionsW || it.dimensionsH) ? `<span class="detail-item-desc">${esc(it.dimensionsW || '?')} x ${esc(it.dimensionsH || '?')} ${esc(it.dimensionsUnit || 'in')}</span>` : ''}
            ${it.description ? `<span class="detail-item-desc">${esc(it.description)}</span>` : ''}
          </div>
          <div class="detail-item-price">$${(parseFloat(it.price) || 0).toFixed(2)} <i class="fas fa-chevron-down detail-item-arrow"></i></div>
        </div>
        <div class="detail-item-expand" id="itemExpand${idx}">
          <div class="expand-grid">
            <div class="expand-field"><span class="expand-label">${isInvoice ? t('description') : t('item')}</span><span class="expand-value">${isInvoice ? esc(it.description || '—') : esc(it.item || '—')}</span></div>
            <div class="expand-field"><span class="expand-label">${t('temper')}</span><span class="expand-value">${it.temper ? t('yes') : t('no')}</span></div>
            ${isInvoice ? '' : `<div class="expand-field"><span class="expand-label">${t('glass_thickness')}</span><span class="expand-value">${esc(it.glassThickness || '—')}</span></div>`}
            <div class="expand-field"><span class="expand-label">${t('dimensions')}</span><span class="expand-value">${(it.dimensionsW || 0)} x ${(it.dimensionsH || 0)} ${esc(it.dimensionsUnit || 'in')}</span></div>
            ${isInvoice ? `<div class="expand-field"><span class="expand-label">${t('glass_thickness')}</span><span class="expand-value">${esc(it.glassThickness || '—')}</span></div>` : `<div class="expand-field"><span class="expand-label">${t('unit_price')}</span><span class="expand-value">$${(parseFloat(it.unitPrice) || 0).toFixed(2)}</span></div>`}
            <div class="expand-field"><span class="expand-label">${t('installation')}</span><span class="expand-value">${installVal}</span></div>
            <div class="expand-field"><span class="expand-label">${t('price')}</span><span class="expand-value">$${(parseFloat(it.price) || 0).toFixed(2)}</span></div>
          </div>
        </div>
      `;}).join('');

      detailContent.innerHTML = `
        <div class="detail-header">
          <div>
            <h3>${esc(j.job || '')}</h3>
            <div class="detail-id">#${formatId(j.id)}</div>
          </div>
          <span class="detail-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <div class="detail-amount">$${total.toFixed(2)}</div>

        <div class="detail-field"><span class="detail-field-label">${t('name')}</span><span class="detail-field-value">${esc(j.name || '—')}</span></div>
        <div class="detail-field"><span class="detail-field-label">${t('date')}</span><span class="detail-field-value">${esc(dateStr)}</span></div>
        <div class="detail-field"><span class="detail-field-label">${t('address')}</span><span class="detail-field-value">${esc(j.address || '—')}</span></div>
        ${j.phone ? `<div class="detail-field"><span class="detail-field-label">${t('phone')}</span><span class="detail-field-value">${esc(j.phone)}</span></div>` : ''}
        ${j.email ? `<div class="detail-field"><span class="detail-field-label">${t('email')}</span><span class="detail-field-value">${esc(j.email)}</span></div>` : ''}
        ${(j.items || []).length > 0 ? `<div class="detail-section-title" style="margin-top:16px">${t('items')}</div><div class="detail-items-list">${itemsHtml}</div>` : ''}

        <div class="detail-section-title" style="margin-top:16px">${t('summary')}</div>
        <div class="detail-finance">
          <div class="detail-field"><span class="detail-field-label">${t('subtotal')}</span><span class="detail-field-value">$${total.toFixed(2)}</span></div>
          <div class="detail-field"><span class="detail-field-label">${t('tax_rate')}</span><span class="detail-field-value">$${(j.taxRate || 0).toFixed(2)}</span></div>
          <div class="detail-field"><span class="detail-field-label">${t('sales_tax')}</span><span class="detail-field-value">$${(j.salesTax || 0).toFixed(2)}</span></div>
          <div class="detail-field"><span class="detail-field-label">${j.status === 'estimado' ? t('deposit_required') : t('deposit_received')}</span><span class="detail-field-value">$${(j.deposit || 0).toFixed(2)}</span></div>
          <div class="detail-field detail-field-total"><span class="detail-field-label">${t('total_summary')}</span><span class="detail-field-value">$${((total + (j.taxRate || 0) + (j.salesTax || 0)) - (j.status === 'estimado' ? 0 : (j.deposit || 0))).toFixed(2)}</span></div>
        </div>

        <div class="detail-actions">
          <button class="detail-btn pdf" id="dtlPdf"><i class="fas fa-file-pdf"></i> PDF</button>
          ${j.status === 'estimado' ? `<button class="detail-btn approve" id="dtlApprove"><i class="fas fa-check-circle"></i> ${t('approve')}</button>` : ''}
          ${j.status === 'invoice' ? `<button class="detail-btn done" id="dtlDone"><i class="fas fa-check-double"></i> ${t('done')}</button>` : ''}
          <button class="detail-btn edit-btn" id="dtlEdit"><i class="fas fa-pen"></i> ${t('edit')}</button>
          <button class="detail-btn delete-btn" id="dtlDelete"><i class="fas fa-trash"></i> ${t('del')}</button>
        </div>`;

      $('dtlPdf').addEventListener('click', async () => { await showPDFPreview(j, $('dtlPdf')); });
      if (j.status === 'estimado') { $('dtlApprove').addEventListener('click', () => showApproveModal(j.id)); }
      if (j.status === 'invoice') { $('dtlDone').addEventListener('click', () => showDoneModal(j.id)); }
      $('dtlEdit').addEventListener('click', () => openForm(j.id));
      $('dtlDelete').addEventListener('click', () => showDeleteModal(j.id));

      detailContent.querySelectorAll('.detail-item-row').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.dataset.itemIndex, 10);
          const expand = document.getElementById('itemExpand' + idx);
          if (expand) {
            const isOpen = expand.classList.contains('open');
            expand.classList.toggle('open');
            el.classList.toggle('expanded', !isOpen);
          }
        });
      });
    } catch {
      detailContent.innerHTML = `<div class="empty-state"><p>${t('error_api')}</p></div>`;
    }
  }

  /* ===== MODAL CALLBACKS ===== */
  function showDeleteModal(id) {
    showModal(t('confirm_delete_title'), t('confirm_delete_msg'), t('confirm_yes'), true, async () => {
      try {
        await deleteJob(id);
        showToast(t('deleted'));
        if (lastView === 'detail') showJobs();
        else { await renderJobList(getCurrentFilter()); await updateCounts(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  function showApproveModal(id) {
    showModal(t('confirm_approve_title'), t('confirm_approve_msg'), t('confirm_yes'), false, async () => {
      try {
        await toggleJobStatus(id);
        showToast(t('approved'));
        if (lastView === 'detail') showDetail(id);
        else showJobs();
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  function showDoneModal(id) {
    showModal(t('confirm_done_title'), t('confirm_done_msg'), t('confirm_yes'), false, async () => {
      try {
        await toggleJobDone(id);
        showToast(t('completed'));
        if (lastView === 'detail') showJobs();
        else { await renderJobList(getCurrentFilter()); await updateCounts(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  /* ===== ITEMS ===== */
  function renderCompactItems() {
    itemsCompactList.innerHTML = itemsData.map((it, i) => `
      <div class="item-compact-row" data-item-id="${it.id}">
        <div class="item-compact-body" data-item-id="${it.id}">
          <span class="item-compact-name">${esc(it.item || t('item') + ' ' + (i + 1))}</span>
          <span class="item-compact-price">$${(parseFloat(it.price) || 0).toFixed(2)}</span>
        </div>
        <button type="button" class="item-compact-remove" data-item-id="${it.id}"><i class="fas fa-times"></i></button>
      </div>
    `).join('');

    itemsCompactList.querySelectorAll('.item-compact-body').forEach(el => {
      el.addEventListener('click', () => openItemForm(+el.dataset.itemId));
    });
    itemsCompactList.querySelectorAll('.item-compact-remove').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); removeItem(+btn.dataset.itemId); });
    });
    updateFinanceSummary();
  }

  function removeItem(id) {
    itemsData = itemsData.filter(it => it.id !== id);
    renderCompactItems();
  }

  function openItemForm(itemId) {
    editingItemId = itemId || null;
    formView.style.display = 'none';
    itemFormView.style.display = 'block';

    const isEstimado = itemFormStatus === 'estimado';
    const descGroup = $('itemFormDesc')?.closest('.form-group');
    const unitPriceGroup = $('itemFormUnitPrice')?.closest('.form-group.price-wrap');
    const glassLabel = document.querySelector('label[for="itemFormGlass"]');
    if (descGroup) descGroup.style.display = isEstimado ? 'none' : '';
    if (unitPriceGroup) unitPriceGroup.style.display = isEstimado ? '' : 'none';
    if (glassLabel) glassLabel.textContent = isEstimado ? (getLang() === 'es' ? 'Grosor del Vidrio - Color Herraje' : 'Hardware Color Glass Thickness') : (getLang() === 'es' ? 'Grosor del Vidrio' : 'Glass Thickness');

    if (editingItemId) {
      const it = itemsData.find(x => x.id === editingItemId);
      itemFormTitle.textContent = t('edit_item');
      ifTemper.checked = it ? it.temper : false;
      ifName.value = it ? (it.item || '') : '';
      ifDesc.value = it ? (it.description || '') : '';
      ifDimW.value = it ? (it.dimensionsW || '') : '';
      ifDimH.value = it ? (it.dimensionsH || '') : '';
      ifDimUnit.value = it ? (it.dimensionsUnit || 'in') : 'in';
      ifGlass.value = it ? (it.glassThickness || '') : '';
      ifInstall.value = it ? (it.installation || '') : '';
      ifInstallUnit.value = it ? (it.installationUnit || 'ft') : 'ft';
      ifUnitPrice.value = it ? (it.unitPrice || '') : '';
      ifPrice.value = it ? (it.price || '') : '';
    } else {
      itemFormTitle.textContent = t('add_item');
      ifTemper.checked = false;
      ifName.value = '';
      ifDesc.value = '';
      ifDimW.value = '';
      ifDimH.value = '';
      ifDimUnit.value = 'in';
      ifGlass.value = '';
      ifInstall.value = '';
      ifInstallUnit.value = 'ft';
      ifUnitPrice.value = '';
      ifPrice.value = '';
    }
    ifTemperText.textContent = ifTemper.checked ? t('yes') : t('no');
    applyTranslations(itemFormBody);
  }

  function closeItemForm() {
    itemFormView.style.display = 'none';
    formView.style.display = 'block';
    editingItemId = null;
  }

  function saveItemFromForm() {
    if (!ifName.value.trim()) { showToast(t('item_required'), 'error'); ifName.focus(); return; }
    if (!ifPrice.value.trim() || parseFloat(ifPrice.value) <= 0) { showToast(t('price_required'), 'error'); ifPrice.focus(); return; }
    const item = {
      id: editingItemId || itemIdCounter++,
      temper: ifTemper.checked,
      item: ifName.value.trim(),
      description: ifDesc.value.trim(),
      dimensionsW: parseFloat(ifDimW.value) || 0,
      dimensionsH: parseFloat(ifDimH.value) || 0,
      dimensionsUnit: ifDimUnit.value,
      glassThickness: ifGlass.value.trim(),
      installation: parseFloat(ifInstall.value) || 0,
      installationUnit: ifInstallUnit.value,
      unitPrice: parseFloat(ifUnitPrice.value) || 0,
      price: parseFloat(ifPrice.value) || 0,
    };

    if (editingItemId) {
      const idx = itemsData.findIndex(x => x.id === editingItemId);
      if (idx >= 0) itemsData[idx] = item;
    } else {
      itemsData.push(item);
    }

    renderCompactItems();
    closeItemForm();
  }

  function collectItems() { return itemsData.map(it => ({ ...it })); }

  /* ===== FINANCE SUMMARY ===== */
  function updateFinanceSummary() {
    const subtotal = calcItemsTotal(itemsData);
    const taxRate = parseFloat(fTaxRate.value) || 0;
    const salesTax = parseFloat(fSalesTax.value) || 0;
    const deposit = parseFloat(fDeposit.value) || 0;
    const isEstimado = itemFormStatus === 'estimado';
    const total = subtotal + taxRate + salesTax - (isEstimado ? 0 : deposit);
    fSubtotal.value = subtotal.toFixed(2);
    fTotalReadonly.textContent = '$' + total.toFixed(2);
    if (fDepositLabel) {
      fDepositLabel.textContent = isEstimado ? t('deposit_required') : t('deposit_received');
    }
  }

  /* ===== FORM SUBMIT ===== */
  valeForm.addEventListener('submit', async e => {
    e.preventDefault();
    const phone = f.phone.value.trim();
    const email = f.email.value.trim();
    if (!phone && !email) return;
    const finalItems = collectItems();
    if (finalItems.length === 0) return;
    const data = {
      job: f.job.value.trim(),
      date: f.date.value,
      name: f.name.value.trim(),
      address: f.address.value.trim(),
      phone: phone,
      email: email,
      taxRate: parseFloat(fTaxRate.value) || 0,
      salesTax: parseFloat(fSalesTax.value) || 0,
      deposit: parseFloat(fDeposit.value) || 0,
      items: finalItems,
    };

    try {
      if (editingJobId) {
        await updateJob(editingJobId, data);
        showToast(t('saved'));
        const id = editingJobId;
        editingJobId = null;
        if (lastView === 'detail') showDetail(id);
        else showJobs();
      } else {
        const job = await createJob(data);
        await showPDFPreview(job);
        editingJobId = null;
        showJobs();
      }
    } catch {
      showToast(t('error_api'), 'error');
    }
  });

  /* ===== EVENT LISTENERS ===== */
  $('headerBrand').addEventListener('click', () => { location.href = 'index.html'; });
  formBack.addEventListener('click', () => { editingJobId = null; showJobs(); });
  detailBack.addEventListener('click', () => { showJobs(); });

  const dh = $('dashHome'); if (dh) dh.addEventListener('click', () => { location.href = 'index.html'; });
  searchInput.addEventListener('input', () => { renderJobList(getCurrentFilter()); });

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderJobList(btn.dataset.filter);
  });

  fabBtn.addEventListener('click', () => openForm(null));

  addItemBtn.addEventListener('click', () => openItemForm(null));
  itemFormBack.addEventListener('click', closeItemForm);
  itemFormSaveBtn.addEventListener('click', saveItemFromForm);
  ifTemper.addEventListener('change', () => { ifTemperText.textContent = ifTemper.checked ? t('yes') : t('no'); });
  fTaxRate.addEventListener('input', updateFinanceSummary);
  fSalesTax.addEventListener('input', updateFinanceSummary);
  fDeposit.addEventListener('input', updateFinanceSummary);

  /* ===== CLIENT AUTOCOMPLETE ===== */
  let clientsCache = [];
  let acIndex = -1;

  async function loadClientsCache() {
    try {
      const jobs = await getJobs();
      clientsCache = extractClients(jobs);
    } catch { clientsCache = []; }
  }

  function extractClients(jobs) {
    const seen = {};
    return jobs.filter(j => {
      if (!j.name || seen[j.name]) return false;
      seen[j.name] = true;
      return true;
    }).map(j => ({ name: j.name, phone: j.phone || '', email: j.email || '', address: j.address || '' }));
  }

  function showAutocomplete(query) {
    const list = $('autocompleteList');
    if (!query || query.length < 1) { list.classList.remove('show'); return; }
    const q = query.toLowerCase();
    const matches = clientsCache.filter(c => c.name.toLowerCase().includes(q));
    if (matches.length === 0) { list.classList.remove('show'); return; }
    acIndex = -1;
    list.innerHTML = matches.map((c, i) =>
      `<div class="autocomplete-item" data-index="${i}">${esc(c.name)}<span class="ac-phone">${esc(c.phone || c.email || '')}</span></div>`
    ).join('');
    list.classList.add('show');

    list.querySelectorAll('.autocomplete-item').forEach(el => {
      el.addEventListener('click', () => { selectClient(matches[+el.dataset.index]); });
    });
  }

  function selectClient(client) {
    f.name.value = client.name;
    f.phone.value = client.phone;
    f.email.value = client.email;
    f.address.value = client.address;
    $('autocompleteList').classList.remove('show');
  }

  f.name.addEventListener('input', () => { showAutocomplete(f.name.value); });
  f.name.addEventListener('keydown', e => {
    const list = $('autocompleteList');
    const items = list.querySelectorAll('.autocomplete-item');
    if (!list.classList.contains('show') || items.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items.forEach(el => el.classList.remove('highlight'));
      acIndex = Math.min(acIndex + 1, items.length - 1);
      items[acIndex].classList.add('highlight');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items.forEach(el => el.classList.remove('highlight'));
      acIndex = Math.max(acIndex - 1, 0);
      items[acIndex].classList.add('highlight');
    } else if (e.key === 'Enter' && acIndex >= 0) {
      e.preventDefault();
      const match = clientsCache.filter(c => c.name.toLowerCase().includes(f.name.value.toLowerCase()))[acIndex];
      if (match) selectClient(match);
    }
  });
  f.name.addEventListener('focus', () => { loadClientsCache(); showAutocomplete(f.name.value); });
  f.name.addEventListener('blur', () => { setTimeout(() => $('autocompleteList').classList.remove('show'), 200); });

  /* ===== URL ROUTE INIT ===== */
  async function checkRoute() {
    skipPush = true;
    const path = location.pathname;
    if (path.endsWith('jobs.html')) {
      showJobs();
      return;
    }
    const match = path.match(/^\/app\/jobs\/(.*)$/);
    if (match) {
      const route = match[1];
      if (route === 'new') {
        openForm(null);
      } else if (/^\d{6}-\d{5}$/.test(route)) {
        const num = parseInt(route.replace('-', ''), 10);
        const id = num - 3999;
        const job = await getJobById(id);
        if (job) showDetail(id);
        else showJobs();
      } else showJobs();
    } else showJobs();
  }

  window.addEventListener('popstate', checkRoute);

  function isFormDirty() {
    if (lastView !== 'form') return false;
    if (f.job.value.trim() || f.name.value.trim() || f.address.value.trim() || f.phone.value.trim() || f.email.value.trim()) return true;
    if (itemsData.length > 0) return true;
    return false;
  }

  function saveDraft() {
    if (!isFormDirty()) return;
    const draft = {
      editingJobId: editingJobId,
      itemFormStatus: itemFormStatus,
      job: f.job.value, date: f.date.value, name: f.name.value,
      address: f.address.value, phone: f.phone.value, email: f.email.value,
      taxRate: fTaxRate.value, salesTax: fSalesTax.value, deposit: fDeposit.value,
      items: itemsData.map(it => ({ ...it })),
      savedAt: Date.now(),
    };
    try { localStorage.setItem('liriano_draft', JSON.stringify(draft)); } catch (_) {}
  }

  function restoreDraft() {
    var raw;
    try { raw = localStorage.getItem('liriano_draft'); } catch (_) { return; }
    if (!raw) return;
    var draft;
    try { draft = JSON.parse(raw); } catch (_) { return; }
    var age = Date.now() - (draft.savedAt || 0);
    if (age > 86400000) { localStorage.removeItem('liriano_draft'); return; }
    showModal(
      t('draft_found_title') || 'Unsaved Work',
      (t('draft_found_msg') || 'You have unsaved work from your last session. Continue where you left off?') + ' <small style="display:block;margin-top:8px;opacity:0.6">' + esc(draft.job || draft.name || 'Draft') + '</small>',
      (t('draft_restore') || 'Restore'),
      true,
      function () {
        editingJobId = draft.editingJobId || null;
        itemFormStatus = draft.itemFormStatus || 'estimado';
        if (draft.editingJobId) {
          formViewTitle.textContent = t('edit_job');
          saveBtn.innerHTML = '<i class="fas fa-save"></i> ' + t('save');
          var wrap = $('editFormBadgeWrap');
          var badge = $('editFormBadge');
          badge.textContent = draft.itemFormStatus === 'estimado' ? t('pdf_estimate') : t('pdf_invoice');
          badge.className = 'edit-badge ' + (draft.itemFormStatus === 'estimado' ? 'estimado' : 'invoice');
          wrap.style.display = '';
        } else {
          formViewTitle.textContent = t('new_job');
          saveBtn.innerHTML = '<i class="fas fa-save"></i> ' + t('save');
          $('editFormBadgeWrap').style.display = 'none';
        }
        f.job.value = draft.job || '';
        f.date.value = draft.date || new Date().toISOString().split('T')[0];
        f.name.value = draft.name || '';
        f.address.value = draft.address || '';
        f.phone.value = draft.phone || '';
        f.email.value = draft.email || '';
        fTaxRate.value = draft.taxRate ?? '';
        fSalesTax.value = draft.salesTax ?? '';
        fDeposit.value = draft.deposit ?? '';
        itemsData = (draft.items || []).map(function (it) { return { ...it }; });
        itemIdCounter = itemsData.reduce(function (max, it) { return Math.max(max, it.id || 0); }, 0) + 1;
        showView('form');
        renderCompactItems();
        applyTranslations(formView);
        localStorage.removeItem('liriano_draft');
      },
      function () { localStorage.removeItem('liriano_draft'); }
    );
  }

  window.addEventListener('session-expiring', saveDraft);

  checkRoute();
  restoreDraft();

})();
