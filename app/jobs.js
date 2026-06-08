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
          (total || '') + ' ' + (j.date || '') + ' ' + (j.phone || '').replace(/[^a-z0-9]/g, '')
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
            <div class="job-card-title">${esc(j.job || j.name || '')}</div>
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
      btn.addEventListener('click', e => { e.stopPropagation(); getJobById(btn.dataset.id).then(j => showPDFPreview(j)); });
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

    if (editingJobId) {
      formViewTitle.textContent = t('edit_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      getJobById(editingJobId).then(j => {
        if (!j) return;
        itemFormStatus = j.status || 'estimado';
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

    try {
      const j = await getJobById(jobId);
      if (!j) { detailContent.innerHTML = `<p>${t('error_api')}</p>`; return; }

      const badgeClass = j.status === 'estimado' ? 'estimado' : j.status === 'done' ? 'done' : 'invoice';
      const badgeLabel = j.status === 'estimado' ? t('pdf_estimate') : j.status === 'done' ? t('done') : t('pdf_invoice');
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

      detailContent.innerHTML = `
        <div class="detail-header">
          <div>
            <h3>${esc(j.job || '')}</h3>
            <div class="detail-id">#${esc(j.id)}</div>
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

      $('dtlPdf').addEventListener('click', () => showPDFPreview(j));
      if (j.status === 'estimado') { $('dtlApprove').addEventListener('click', () => showApproveModal(j.id)); }
      if (j.status === 'invoice') { $('dtlDone').addEventListener('click', () => showDoneModal(j.id)); }
      $('dtlEdit').addEventListener('click', () => openForm(j.id));
      $('dtlDelete').addEventListener('click', () => showDeleteModal(j.id));
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
        showPDFPreview(job);
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

  /* ===== PDF GENERATION ===== */
  const LOGO_B64 = 'data:image/png;base64,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';

  function buildPDFDoc(job) {
    if (!job) return null;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
    const pageW = 216, pageH = 279;
    const isEstimado = job.status === 'estimado';
    const items = job.items || [];
    const total = calcTotal(job);

    doc.setFillColor('#fffff3');
    doc.rect(0, 0, pageW, pageH, 'F');

    doc.addFileToVFS('PlayfairDisplay-Bold.ttf', playfairBoldB64);
    doc.addFont('PlayfairDisplay-Bold.ttf', 'PlayfairDisplay', 'bold');
    doc.addFileToVFS('GreatVibes-Regular.ttf', greatVibesB64);
    doc.addFont('GreatVibes-Regular.ttf', 'GreatVibes', 'normal');

    doc.addImage(LOGO_B64, 'PNG', 10, 10, 80, null);

    doc.setFont('PlayfairDisplay', 'bold');
    doc.setFontSize(44);
    doc.setTextColor('#19293d');
    doc.text(isEstimado ? t('pdf_estimate') : t('pdf_invoice'), 201, 25, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor('#555');
    doc.text((isEstimado ? t('pdf_est_no') : t('pdf_inv_no')) + ': ' + (job.id || ''), 200, 32, { align: 'right' });
    doc.text(t('job') + ': ' + (job.job || ''), 200, 38, { align: 'right' });
    doc.text(t('date') + ': ' + (job.date || ''), 200, 44, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13.5);
    doc.setTextColor('#555');
    doc.text(isEstimado ? t('pdf_est_from') : t('pdf_inv_from'), 10, 66);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14.5);
    doc.setTextColor('#19293d');
    doc.text('Liriano & Son Shower Doors Corp', 10, 72);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor('#555');
    doc.text('24528 SW 130 CT Homestead FL 33032', 10, 78);
    doc.text('+1 786 222 4264', 10, 84);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13.5);
    doc.setTextColor('#555');
    doc.text(isEstimado ? t('pdf_est_to') : t('pdf_inv_to'), 200, 66, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14.5);
    doc.setTextColor('#19293d');
    doc.text(job.name || '', 200, 72, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor('#555');
    if (job.address) doc.text(job.address, 200, 78, { align: 'right' });
    if (job.phone) doc.text(job.phone, 200, 84, { align: 'right' });

    let calcSubtotal = 0;
    items.forEach(it => { calcSubtotal += parseFloat(it.price) || 0; });

    const cols = [10, 25, 50, 100, 122, 153, 173];
    const headers = isEstimado
      ? [t('temper'), t('item'), t('pdf_col_glass'), t('dimensions'), t('pdf_col_unit'), t('installation'), t('price')]
      : [t('temper'), t('item'), t('description'), t('dimensions'), t('pdf_col_glass'), t('installation'), t('price')];
    const rowH = 12;
    let tableY = 96;

    doc.setFillColor('#19293d');
    doc.setDrawColor('#19293d');
    doc.rect(10, tableY, 190, rowH, 'FD');

    for (let ci = 0; ci < cols.length; ci++) {
      doc.line(cols[ci], tableY, cols[ci], tableY + rowH);
    }
    doc.line(200, tableY, 200, tableY + rowH);

    doc.setTextColor('#ffffff');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    for (let ci = 0; ci < cols.length; ci++) {
      const cw = ci < cols.length - 1 ? cols[ci + 1] - cols[ci] : 200 - cols[ci];
      doc.text(headers[ci], cols[ci] + cw / 2, tableY + rowH / 2 + 1, { align: 'center' });
    }

    let rowY = tableY + rowH;
    doc.setFontSize(9.5);
    doc.setTextColor('#333');
    doc.setDrawColor('#ccc');
    const lineH = 5.5;

    items.forEach(it => {
      const temper = it.temper === 'Yes' ? 'x' : '';
      const dims = (it.dimensionsW || it.dimensionsH)
        ? (it.dimensionsW || '?') + ' x ' + (it.dimensionsH || '?') + ' ' + (it.dimensionsUnit || 'in')
        : '';
      const vals = isEstimado
        ? [temper, it.item || '', it.glassThickness || '', dims, it.unitPrice || '', it.installation || '', '$' + (parseFloat(it.price) || 0).toFixed(2)]
        : [temper, it.item || '', it.description || '', dims, it.glassThickness || '', it.installation || '', '$' + (parseFloat(it.price) || 0).toFixed(2)];

      const cellLines = [];
      let maxLines = 1;
      for (let ci = 0; ci < cols.length; ci++) {
        const cw = ci < cols.length - 1 ? cols[ci + 1] - cols[ci] : 200 - cols[ci];
        const lines = doc.splitTextToSize(String(vals[ci]), cw - 2);
        cellLines.push(lines);
        if (lines.length > maxLines) maxLines = lines.length;
      }

      const rowH2 = maxLines * lineH + 2;

      for (let ci = 0; ci < cols.length; ci++) {
        const cw = ci < cols.length - 1 ? cols[ci + 1] - cols[ci] : 200 - cols[ci];
        const lines = cellLines[ci];
        const cellOffset = (rowH2 - lines.length * lineH) / 2;
        const xPos = ci === 6 ? cols[ci] + cw - 1 : cols[ci] + cw / 2;
        const align = ci === 6 ? 'right' : 'center';
        for (let li = 0; li < lines.length; li++) {
          doc.text(lines[li], xPos, rowY + cellOffset + li * lineH + lineH * 0.70, { align });
        }
      }

      doc.setDrawColor('#19293d');
      doc.line(10, rowY + rowH2, 200, rowY + rowH2);
      rowY += rowH2;
    });

    const subTotal = calcSubtotal;
    const taxRateVal = job.taxRate || 0;
    const salesTaxVal = job.salesTax || 0;
    const depositVal = job.deposit || 0;
    const finTotal = subTotal + taxRateVal + salesTaxVal - (isEstimado ? 0 : depositVal);
    const nums = [subTotal.toFixed(2), taxRateVal.toFixed(2), salesTaxVal.toFixed(2), depositVal.toFixed(2), finTotal.toFixed(2)];
    let longestNum = '';
    nums.forEach(n => { if (n.length > longestNum.length) longestNum = n; });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const dollarX = 198 - doc.getTextWidth(longestNum) - doc.getTextWidth(' ');

    const summary = [
      { label: t('subtotal'), num: nums[0], isCurrency: true, highlight: false },
      { label: t('tax_rate'), num: nums[1], isCurrency: true, highlight: false },
      { label: t('sales_tax'), num: nums[2], isCurrency: true, highlight: false },
      { label: isEstimado ? t('deposit_required') : t('deposit_received'), num: nums[3], isCurrency: true, highlight: false },
      { label: t('total_summary').toUpperCase(), num: nums[4], isCurrency: true, highlight: true }
    ];

    const labelBoxX = 130, labelBoxW = 43, numBoxX = 173, numBoxW = 27;

    for (let si = 0; si < summary.length; si++) {
      const s = summary[si];
      const labelLines = doc.splitTextToSize(s.label, labelBoxW - 2);
      const maxSl = labelLines.length;
      const rowH2 = maxSl * lineH + 2;

      if (s.highlight) {
        doc.setFillColor('#19293d');
        doc.setDrawColor('#19293d');
        doc.rect(labelBoxX, rowY, labelBoxW, rowH2, 'FD');
        doc.rect(numBoxX, rowY, numBoxW, rowH2, 'FD');
        doc.setTextColor('#ffffff');
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setTextColor('#333');
        doc.setFont('helvetica', 'normal');
      }

      const lo = (rowH2 - labelLines.length * lineH) / 2;
      for (let li = 0; li < labelLines.length; li++) {
        doc.text(labelLines[li], labelBoxX + labelBoxW / 2, rowY + lo + li * lineH + lineH * 0.70, { align: 'center' });
      }

      if (s.isCurrency) {
        const dollarY = rowY + (rowH2 - lineH) / 2 + lineH * 0.70;
        doc.text('$', dollarX, dollarY, { align: 'center' });
        const numLines = doc.splitTextToSize(s.num, 22);
        for (let li = 0; li < numLines.length; li++) {
          doc.text(numLines[li], 198, rowY + (rowH2 - numLines.length * lineH) / 2 + li * lineH + lineH * 0.70, { align: 'right' });
        }
      }

      rowY += rowH2;
    }

    doc.setLineWidth(0.2);
    const fy = 235, fl = 85;
    doc.setDrawColor('#19293d');
    doc.setLineWidth(0.5);
    doc.line(108 - fl, fy, 108 + fl, fy);
    doc.setLineWidth(0.2);

    const social = [
      { icon: iconfacebookB64, text: '/misael.liriano.79', url: 'https://www.facebook.com/misael.liriano.79' },
      { icon: iconinstagramB64, text: '/liriano_and_son_showers_doors', url: 'https://www.instagram.com/liriano_and_son_showers_doors/' },
      { icon: iconwhatsappB64, text: '+1 786 222 4264', url: 'https://wa.me/17862224264' }
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor('#333');
    const iconS = 6, groupGap = 10, rowGap = 5;
    const socialY = fy + rowGap;

    let totalW = 0;
    const groupWidths = [];
    social.forEach(s => {
      const tw = doc.getTextWidth(s.text);
      const gw = iconS + 1.5 + tw;
      groupWidths.push(gw);
      totalW += gw + groupGap;
    });
    totalW -= groupGap;
    let curX = 108 - totalW / 2;

    social.forEach((s, si) => {
      const tw = doc.getTextWidth(s.text);
      doc.addImage(s.icon, 'PNG', curX, socialY, iconS, iconS);
      doc.text(s.text, curX + iconS + 1.5, socialY + iconS * 0.75);
      doc.link(curX, socialY, iconS, iconS, { url: s.url });
      doc.link(curX + iconS + 1.5, socialY, tw, iconS, { url: s.url });
      curX += groupWidths[si] + groupGap;
    });

    const social2 = [
      { icon: iconmailB64, text: 'misaelliriano79@gmail.com', url: 'mailto:misaelliriano79@gmail.com' },
      { icon: iconwebB64, text: '/lirianosonglassprofessional.com', url: 'https://lirianosonglassprofessional.com' }
    ];

    const row2Y = socialY + iconS + rowGap;
    let totalW2 = 0;
    const gw2 = [];
    social2.forEach(s => {
      const tw = doc.getTextWidth(s.text);
      const g = iconS + 1.5 + tw;
      gw2.push(g);
      totalW2 += g + 10;
    });
    totalW2 -= 10;
    let curX2 = 108 - totalW2 / 2;

    social2.forEach((s, si) => {
      const tw = doc.getTextWidth(s.text);
      doc.addImage(s.icon, 'PNG', curX2, row2Y, iconS, iconS);
      doc.text(s.text, curX2 + iconS + 1.5, row2Y + iconS * 0.75);
      doc.link(curX2, row2Y, iconS, iconS, { url: s.url });
      doc.link(curX2 + iconS + 1.5, row2Y, tw, iconS, { url: s.url });
      curX2 += gw2[si] + 10;
    });

    doc.setFont('GreatVibes', 'normal');
    doc.setFontSize(22);
    doc.setTextColor('#19293d');
    doc.text(t('pdf_thanks'), 108, socialY + 28, { align: 'center' });

    return doc;
  }

  function showPDFPreview(job) {
    if (!job) return;
    const doc = buildPDFDoc(job);
    if (!doc) return;
    const filename = `${job.job || job.name || 'document'}_${job.status}.pdf`;

    const isMobile = window.innerWidth < 768;
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const canShare = typeof navigator.share === 'function' && typeof File === 'function';

    const overlay = document.createElement('div');
    overlay.className = 'pdf-overlay';

    if (isMobile) {
      overlay.innerHTML = `
        <div class="pdf-overlay-container" style="max-width:90vw;">
          <div class="pdf-toolbar">
            <span class="pdf-toolbar-title">${esc(filename)}</span>
            <button class="pdf-toolbar-close" id="pdfClose">&times;</button>
          </div>
          <div class="pdf-actions" style="padding:20px;">
            <button class="pdf-btn download" id="pdfDl" style="width:100%;margin-bottom:10px;"><i class="fas fa-download"></i> ${t('view_pdf')}</button>
            ${canShare ? `
            <button class="pdf-btn share" id="pdfShare" style="width:100%;"><i class="fas fa-share-alt"></i> ${t('pdf_share')}</button>
            ` : `
            ${job.phone ? `<button class="pdf-btn whatsapp" id="pdfWa" style="width:100%;margin-bottom:10px;"><i class="fab fa-whatsapp"></i> WhatsApp</button>` : ''}
            ${job.email ? `<button class="pdf-btn email" id="pdfMail" style="width:100%;"><i class="fas fa-envelope"></i> Email</button>` : ''}
            `}
          </div>
        </div>`;
      document.body.appendChild(overlay);
    } else {
      overlay.innerHTML = `
        <div class="pdf-overlay-container">
          <div class="pdf-toolbar">
            <span class="pdf-toolbar-title">${esc(filename)}</span>
            <button class="pdf-toolbar-close" id="pdfClose">&times;</button>
          </div>
          <iframe class="pdf-frame" src="${blobUrl}"></iframe>
          <div class="pdf-actions">
            <button class="pdf-btn download" id="pdfDl"><i class="fas fa-download"></i> ${t('view_pdf')}</button>
            ${canShare ? `
            <button class="pdf-btn share" id="pdfShare"><i class="fas fa-share-alt"></i> ${t('pdf_share')}</button>
            ` : `
            ${job.phone ? `<button class="pdf-btn whatsapp" id="pdfWa"><i class="fab fa-whatsapp"></i> WhatsApp</button>` : ''}
            ${job.email ? `<button class="pdf-btn email" id="pdfMail"><i class="fas fa-envelope"></i> Email</button>` : ''}
            `}
          </div>
        </div>`;
      document.body.appendChild(overlay);
    }

    function closePreview() {
      URL.revokeObjectURL(blobUrl);
      overlay.remove();
    }

    $('pdfClose').addEventListener('click', closePreview);
    overlay.addEventListener('click', e => { if (e.target === overlay) closePreview(); });
    $('pdfDl').addEventListener('click', () => { doc.save(filename); });

    if (canShare) {
      $('pdfShare').addEventListener('click', async () => {
        const file = new File([blob], filename, { type: 'application/pdf' });
        const shareData = {
          files: [file],
          title: `${job.job || job.name} - ${job.status === 'estimado' ? t('pdf_estimate') : t('pdf_invoice')}`,
          text: t('pdf_share_msg').replace('{job}', job.job || job.name || '').replace('{amount}', calcTotal(job).toFixed(2))
        };
        try { await navigator.share(shareData); } catch (err) { if (err.name !== 'AbortError') showToast(t('error_api'), 'error'); }
      });
    } else {
      if (job.phone) {
        $('pdfWa').addEventListener('click', () => {
          const phone = job.phone.replace(/[^0-9]/g, '');
          const msg = encodeURIComponent(t('pdf_share_msg').replace('{job}', job.job || job.name || '').replace('{amount}', calcTotal(job).toFixed(2)));
          window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        });
      }
      if (job.email) {
        $('pdfMail').addEventListener('click', () => {
          const subject = encodeURIComponent(`${job.status === 'estimado' ? 'Estimate' : 'Invoice'} - ${job.job || job.name}`);
          const body = encodeURIComponent(t('pdf_email_body').replace('{name}', job.name || '').replace('{job}', job.job || '').replace('{amount}', calcTotal(job).toFixed(2)));
          window.open(`mailto:${job.email}?subject=${subject}&body=${body}`, '_blank');
        });
      }
    }
  }

  function getLang() {
    return localStorage.getItem('liriano_lang') || 'en';
  }

  /* ===== INIT ===== */
  showJobs();

})();
