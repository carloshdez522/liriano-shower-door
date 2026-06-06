(function () {
  'use strict';

  const API = '/app/api/';
  const LS_KEY = 'liriano_jobs';

  /* ===== I18N ===== */
  const i18n = {
    en: {
      login_user_ph: 'Username',
      login_pass_ph: 'Password',
      login_btn: 'Log In',
      login_error: 'Invalid credentials',
      logout: 'Log out',
      job: 'Job',
      job_ph: 'e.g. Window Installation',
      date: 'Date',
      invoice_to: 'Invoice To',
      name: 'Name',
      name_ph: 'Client name',
      address: 'Address',
      address_ph: 'Street, city, zip',
      phone: 'Phone',
      phone_ph: '+1 (786) 222-4264',
      temper: 'Temper',
      yes: 'Yes',
      no: 'No',
      items: 'Items',
      item: 'Item',
      item_ph: 'e.g. Frameless shower door',
      description: 'Description',
      desc_ph: 'Details, measurements, notes...',
      amount: 'Amount ($)',
      search_ph: 'Search by name, job, phone...',
      save: 'Save',
      new_job: 'New Job',
      edit_job: 'Edit Job',
      dash_title: '',
      all: 'All',
      estimados: 'Estimates',
      facturas: 'Invoices',
      empty: 'No jobs yet. Tap + to create one.',
      view_pdf: 'PDF',
      approve: 'Approve',
      edit: 'Edit',
      del: 'Delete',
      pdf_title: 'ESTIMATE / INVOICE',
      pdf_subject: 'Shower Door Installation',
      pdf_estimate: 'ESTIMATE',
      pdf_invoice: 'INVOICE',
      pdf_total: 'Total',
      pdf_sig: 'Authorized Signature',
      pdf_footer: 'Thank you for your business!',
      confirm_delete_title: 'Delete Job?',
      confirm_delete_msg: 'This cannot be undone.',
      confirm_approve_title: 'Convert to Invoice?',
      confirm_approve_msg: 'This will change the status from estimate to invoice.',
      confirm_cancel: 'Cancel',
      confirm_yes: 'Yes',
      detail_title: 'Details',
      saved: 'Saved',
      deleted: 'Deleted',
      approved: 'Converted to invoice',
      error_api: 'Server error',
    },
    es: {
      login_user_ph: 'Usuario',
      login_pass_ph: 'Contraseña',
      login_btn: 'Entrar',
      login_error: 'Credenciales inválidas',
      logout: 'Salir',
      job: 'Trabajo',
      job_ph: 'Ej: Instalación de ventana',
      date: 'Fecha',
      invoice_to: 'Facturar A',
      name: 'Nombre',
      name_ph: 'Nombre del cliente',
      address: 'Dirección',
      address_ph: 'Calle, ciudad, código postal',
      phone: 'Teléfono',
      phone_ph: '+1 (786) 222-4264',
      temper: 'Temple',
      yes: 'Sí',
      no: 'No',
      items: 'Artículos',
      item: 'Artículo',
      item_ph: 'Ej: Puerta de ducha sin marco',
      description: 'Descripción',
      desc_ph: 'Detalles, medidas, notas...',
      amount: 'Monto ($)',
      search_ph: 'Buscar por nombre, trabajo, teléfono...',
      save: 'Guardar',
      new_job: 'Nuevo Trabajo',
      edit_job: 'Editar Trabajo',
      dash_title: '',
      all: 'Todos',
      estimados: 'Estimados',
      facturas: 'Facturas',
      empty: 'Sin trabajos. Toque + para crear uno.',
      view_pdf: 'PDF',
      approve: 'Aprobar',
      edit: 'Editar',
      del: 'Eliminar',
      pdf_title: 'ESTIMADO / FACTURA',
      pdf_subject: 'Instalación de Puertas de Ducha',
      pdf_estimate: 'ESTIMADO',
      pdf_invoice: 'FACTURA',
      pdf_total: 'Total',
      pdf_sig: 'Firma Autorizada',
      pdf_footer: '¡Gracias por su preferencia!',
      confirm_delete_title: '¿Eliminar Trabajo?',
      confirm_delete_msg: 'No se puede deshacer.',
      confirm_approve_title: '¿Convertir a Factura?',
      confirm_approve_msg: 'Esto cambiará el estado de estimado a factura.',
      confirm_cancel: 'Cancelar',
      confirm_yes: 'Sí',
      detail_title: 'Detalles',
      saved: 'Guardado',
      deleted: 'Eliminado',
      approved: 'Convertido a factura',
      error_api: 'Error del servidor',
    },
  };

  let lang = localStorage.getItem('liriano_lang') || 'en';

  function t(key) {
    return i18n[lang]?.[key] || i18n.en[key] || key;
  }

  function applyTranslations(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
  }

  function setLanguage(l) {
    lang = l;
    localStorage.setItem('liriano_lang', l);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === l);
    });
    applyTranslations();
    if (document.getElementById('appContainer').style.display !== 'none') {
      renderDashboard(getCurrentFilter());
      updateCounts();
    }
  }

  /* ===== DOM REFS ===== */
  const $ = id => document.getElementById(id);
  const loginCard = $('loginCard');
  const loginForm = $('loginForm');
  const username = $('username');
  const password = $('password');
  const loginError = $('loginError');
  const togglePass = $('togglePass');
  const appContainer = $('appContainer');
  const logoutBtn = $('logoutBtn');
  const dashboardView = $('dashboardView');
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

  const f = {
    job: $('valeJob'),
    date: $('valeDate'),
    name: $('valeName'),
    address: $('valeAddress'),
    phone: $('valePhone'),
    temper: $('valeTemper'),
    item: $('valeItem'),
    description: $('valeDescription'),
    amount: $('valeAmount'),
  };

  let editingJobId = null;
  let lastView = 'dashboard';

  let useRemote = true;

  function lsRead() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
  }

  function lsWrite(jobs) {
    localStorage.setItem(LS_KEY, JSON.stringify(jobs));
  }

  function lsSeed() {
    const existing = lsRead();
    if (existing.length > 0) return;
    const sample = [
      { job: 'Shower Door Installation', date: '2026-05-20', name: 'John Smith', address: '123 Main St, Miami, FL', phone: '+1 (305) 555-0101', temper: true, item: 'Frameless 3/8" Glass Door', description: 'Measure 60"x72", clear glass, brushed nickel handle', amount: 1200, status: 'estimado', createdAt: Date.now() - 90000000 },
      { job: 'Window Replacement', date: '2026-05-18', name: 'Maria Garcia', address: '456 Oak Ave, Coral Gables, FL', phone: '+1 (305) 555-0102', temper: true, item: 'Double Hung Window 36"x48"', description: 'Replace old single-pane with energy-efficient double-pane', amount: 850, status: 'invoice', createdAt: Date.now() - 80000000 },
      { job: 'Storefront Glass', date: '2026-05-15', name: 'Carlos Ruiz', address: '789 Pine Rd, Hialeah, FL', phone: '+1 (305) 555-0103', temper: false, item: 'Tempered Storefront Glass 1/4"', description: 'Commercial storefront, 96"x84", include aluminum frame', amount: 3200, status: 'estimado', createdAt: Date.now() - 70000000 },
      { job: 'Frameless Shower Enclosure', date: '2026-05-12', name: 'Ana Lopez', address: '321 Beach Blvd, Miami Beach, FL', phone: '+1 (305) 555-0104', temper: true, item: 'Custom Shower Enclosure', description: 'Neo-angle 48"x48", clear glass, chrome hinges', amount: 2100, status: 'invoice', createdAt: Date.now() - 60000000 },
      { job: 'Glass Railing', date: '2026-05-10', name: 'Robert Johnson', address: '555 Sunset Dr, Key Biscayne, FL', phone: '+1 (305) 555-0105', temper: true, item: 'Glass Railing Panel', description: 'Staircase railing, 60"x42", laminated safety glass', amount: 1750, status: 'estimado', createdAt: Date.now() - 50000000 },
      { job: 'Mirror Installation', date: '2026-05-08', name: 'Sofia Martinez', address: '777 Palm Way, Fort Lauderdale, FL', phone: '+1 (305) 555-0106', temper: false, item: 'Beveled Mirror 36"x48"', description: 'Bathroom wall mirror with beveled edges, silver frame', amount: 450, status: 'invoice', createdAt: Date.now() - 40000000 },
      { job: 'Glass Table Top', date: '2026-05-05', name: 'David Chen', address: '999 Coral Way, Miami, FL', phone: '+1 (305) 555-0107', temper: true, item: 'Round Glass Table Top 48"', description: 'Tempered glass, 1/2" thick, polished edge', amount: 380, status: 'estimado', createdAt: Date.now() - 30000000 },
      { job: 'Commercial Door Repair', date: '2026-05-03', name: 'Miami Office Suites', address: '1000 Brickell Ave, Miami, FL', phone: '+1 (305) 555-0108', temper: true, item: 'Commercial Glass Door', description: 'Replace damaged 1/4" tempered glass, new hinges and closer', amount: 950, status: 'invoice', createdAt: Date.now() - 20000000 },
      { job: 'Custom Mirrored Wall', date: '2026-04-28', name: 'Fit Gym LLC', address: '2000 Flagler St, Miami, FL', phone: '+1 (305) 555-0109', temper: false, item: 'Full Wall Mirror 96"x72"', description: 'Gym wall mirrors, 3/8" thick, mitred edges', amount: 2800, status: 'estimado', createdAt: Date.now() - 10000000 },
      { job: 'Patio Door Glass', date: '2026-04-25', name: 'Linda Torres', address: '1500 SW 8th St, Miami, FL', phone: '+1 (305) 555-0110', temper: true, item: 'Sliding Patio Door Glass 72"x80"', description: 'Replace cracked panel, tempered low-E glass', amount: 1100, status: 'invoice', createdAt: Date.now() },
    ];
    lsWrite(sample);
  }

  async function apiFetch(method, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(API, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t('error_api'));
    return data;
  }

  async function tryAPI(method, body) {
    if (!useRemote) throw new Error('local');
    try {
      return await apiFetch(method, body);
    } catch {
      useRemote = false;
      lsSeed();
      throw new Error('local');
    }
  }

  async function getJobs() {
    try {
      const jobs = await tryAPI('GET');
      return jobs;
    } catch {
      return lsRead();
    }
  }

  async function getJobById(id) {
    try {
      const res = await fetch(API + '?id=' + id);
      const data = await res.json();
      if (!res.ok) return null;
      return data;
    } catch {
      const jobs = lsRead();
      return jobs.find(j => j.id === id) || null;
    }
  }

  async function createJob(data) {
    data.status = 'estimado';
    data.createdAt = Date.now();
    try {
      return await tryAPI('POST', data);
    } catch {
      const jobs = lsRead();
      data.id = Date.now();
      jobs.push(data);
      lsWrite(jobs);
      return data;
    }
  }

  async function updateJob(id, data) {
    data.id = id;
    try {
      return await tryAPI('PUT', data);
    } catch {
      const jobs = lsRead();
      const idx = jobs.findIndex(j => j.id === id);
      if (idx === -1) throw new Error(t('error_api'));
      Object.assign(jobs[idx], data);
      lsWrite(jobs);
      return jobs[idx];
    }
  }

  async function deleteJob(id) {
    try {
      const res = await fetch(API + '?id=' + id, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t('error_api'));
      return data;
    } catch {
      const jobs = lsRead();
      lsWrite(jobs.filter(j => j.id !== id));
      return { success: true };
    }
  }

  async function toggleJobStatus(id) {
    const job = await getJobById(id);
    if (!job) return null;
    job.status = job.status === 'estimado' ? 'invoice' : 'estimado';
    return await updateJob(id, { status: job.status });
  }

  /* ===== TOAST ===== */
  function showToast(msg, type) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.className = 'toast ' + (type || 'success') + ' show';
    clearTimeout(el._hide);
    el._hide = setTimeout(() => el.classList.remove('show'), 2500);
  }

  /* ===== DASHBOARD ===== */
  function getCurrentFilter() {
    const active = filterBar.querySelector('.filter-btn.active');
    return active ? active.dataset.filter : 'all';
  }

  async function updateCounts() {
    try {
      const jobs = await getJobs();
      $('countAll').textContent = jobs.length;
      $('countEstimado').textContent = jobs.filter(j => j.status === 'estimado').length;
      $('countInvoice').textContent = jobs.filter(j => j.status === 'invoice').length;
    } catch {}
  }

  async function renderDashboard(filter) {
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
    if (filter === 'estimado') jobs = jobs.filter(j => j.status === 'estimado');
    else if (filter === 'invoice') jobs = jobs.filter(j => j.status === 'invoice');
    if (query) {
      const words = query.split(/\s+/).filter(Boolean);
      jobs = jobs.filter(j => {
        const haystack = (
          (j.name || '') + ' ' + (j.job || '') + ' ' + (j.phone || '') + ' ' +
          (j.address || '') + ' ' + (j.item || '') + ' ' + (j.description || '') + ' ' +
          (j.amount || '') + ' ' + (j.date || '')
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
      const badgeClass = j.status === 'estimado' ? 'estimado' : 'invoice';
      const badgeLabel = j.status === 'estimado' ? t('estimados').slice(0, -1) : t('facturas').slice(0, -1);
      const amount = parseFloat(j.amount) || 0;
      const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
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
          <div class="job-card-amount">$${amount.toFixed(2)}</div>
          <div class="job-card-actions">
            <button class="job-action-btn view-pdf" data-id="${j.id}"><i class="fas fa-file-pdf"></i> ${t('view_pdf')}</button>
            ${j.status === 'estimado' ? `<button class="job-action-btn approve" data-id="${j.id}"><i class="fas fa-check-circle"></i> ${t('approve')}</button>` : ''}
            <button class="job-action-btn edit-job" data-id="${j.id}"><i class="fas fa-pen"></i> ${t('edit')}</button>
            <button class="job-action-btn delete" data-id="${j.id}"><i class="fas fa-trash"></i> ${t('del')}</button>
          </div>
        </div>`;
    }).join('');

    jobList.querySelectorAll('.job-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.job-action-btn')) return;
        showDetail(+card.dataset.id);
      });
    });
    jobList.querySelectorAll('.view-pdf').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); getJobById(+btn.dataset.id).then(j => generatePDF(j)); });
    });
    jobList.querySelectorAll('.approve').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); showApproveModal(+btn.dataset.id); });
    });
    jobList.querySelectorAll('.edit-job').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openForm(+btn.dataset.id); });
    });
    jobList.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); showDeleteModal(+btn.dataset.id); });
    });
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ===== NAVIGATION ===== */
  function showView(view) {
    dashboardView.style.display = view === 'dashboard' ? 'block' : 'none';
    formView.style.display = view === 'form' ? 'block' : 'none';
    detailView.style.display = view === 'detail' ? 'block' : 'none';
    fabBtn.classList.toggle('hidden', view !== 'dashboard');
  }

  async function showDashboard() {
    lastView = 'dashboard';
    showView('dashboard');
    await renderDashboard(getCurrentFilter());
  }

  function openForm(jobId) {
    editingJobId = jobId || null;
    lastView = jobId ? 'detail' : 'dashboard';
    showView('form');
    valeForm.reset();

    if (editingJobId) {
      formViewTitle.textContent = t('edit_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      getJobById(editingJobId).then(j => {
        if (!j) return;
        f.job.value = j.job || '';
        f.date.value = j.date || '';
        f.name.value = j.name || '';
        f.address.value = j.address || '';
        f.phone.value = j.phone || '';
        f.temper.checked = j.temper || false;
        f.item.value = j.item || '';
        f.description.value = j.description || '';
        f.amount.value = j.amount || '';
        document.getElementById('temperText').textContent = f.temper.checked ? t('yes') : t('no');
      });
    } else {
      formViewTitle.textContent = t('new_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      f.date.value = new Date().toISOString().split('T')[0];
    }
    document.getElementById('temperText').textContent = f.temper.checked ? t('yes') : t('no');
    applyTranslations(formView);
  }

  async function showDetail(jobId) {
    lastView = 'detail';
    showView('detail');
    detailContent.innerHTML = `<div class="detail-loading"><i class="fas fa-spinner"></i></div>`;

    try {
      const j = await getJobById(jobId);
      if (!j) { detailContent.innerHTML = `<p>${t('error_api')}</p>`; return; }

      const badgeClass = j.status === 'estimado' ? 'estimado' : 'invoice';
      const badgeLabel = j.status === 'estimado' ? t('pdf_estimate') : t('pdf_invoice');
      const amount = parseFloat(j.amount) || 0;
      const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

      detailContent.innerHTML = `
        <div class="detail-header">
          <h3>${esc(j.job || '')}</h3>
          <span class="detail-badge ${badgeClass}">${badgeLabel}</span>
        </div>
        <div class="detail-amount">$${amount.toFixed(2)}</div>

        <div class="detail-field">
          <span class="detail-field-label">${t('name')}</span>
          <span class="detail-field-value">${esc(j.name || '—')}</span>
        </div>
        <div class="detail-field">
          <span class="detail-field-label">${t('date')}</span>
          <span class="detail-field-value">${esc(dateStr)}</span>
        </div>
        <div class="detail-field">
          <span class="detail-field-label">${t('address')}</span>
          <span class="detail-field-value">${esc(j.address || '—')}</span>
        </div>
        <div class="detail-field">
          <span class="detail-field-label">${t('phone')}</span>
          <span class="detail-field-value">${esc(j.phone || '—')}</span>
        </div>
        <div class="detail-field">
          <span class="detail-field-label">${t('temper')}</span>
          <span class="detail-field-value">${j.temper ? t('yes') : t('no')}</span>
        </div>
        <div class="detail-field">
          <span class="detail-field-label">${t('item')}</span>
          <span class="detail-field-value">${esc(j.item || '—')}</span>
        </div>
        ${j.description ? `
        <div class="detail-field">
          <span class="detail-field-label">${t('description')}</span>
          <span class="detail-field-value">${esc(j.description)}</span>
        </div>` : ''}

        <div class="detail-actions">
          <button class="detail-btn pdf" id="dtlPdf"><i class="fas fa-file-pdf"></i> PDF</button>
          ${j.status === 'estimado' ? `<button class="detail-btn approve" id="dtlApprove"><i class="fas fa-check-circle"></i> ${t('approve')}</button>` : ''}
          <button class="detail-btn edit-btn" id="dtlEdit"><i class="fas fa-pen"></i> ${t('edit')}</button>
          <button class="detail-btn delete-btn" id="dtlDelete"><i class="fas fa-trash"></i> ${t('del')}</button>
        </div>`;

      $('dtlPdf').addEventListener('click', () => generatePDF(j));
      if (j.status === 'estimado') {
        $('dtlApprove').addEventListener('click', () => showApproveModal(j.id));
      }
      $('dtlEdit').addEventListener('click', () => openForm(j.id));
      $('dtlDelete').addEventListener('click', () => showDeleteModal(j.id));
    } catch {
      detailContent.innerHTML = `<div class="empty-state"><p>${t('error_api')}</p></div>`;
    }
  }

  /* ===== MODALS ===== */
  let modalCallback = null;

  function showModal(title, msg, confirmLabel, isDanger, callback) {
    modalCallback = callback;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal-box">
        <h3>${esc(title)}</h3>
        <p>${esc(msg)}</p>
        <div class="modal-actions">
          <button class="modal-btn cancel" id="modalCancel">${t('confirm_cancel')}</button>
          <button class="modal-btn ${isDanger ? 'danger' : 'confirm'}" id="modalConfirm">${esc(confirmLabel)}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#modalCancel').addEventListener('click', () => {
      overlay.remove();
      modalCallback = null;
    });
    overlay.querySelector('#modalConfirm').addEventListener('click', () => {
      overlay.remove();
      if (modalCallback) modalCallback();
      modalCallback = null;
    });
    overlay.addEventListener('click', e => {
      if (e.target === overlay) { overlay.remove(); modalCallback = null; }
    });
  }

  function showDeleteModal(id) {
    showModal(t('confirm_delete_title'), t('confirm_delete_msg'), t('confirm_yes'), true, async () => {
      try {
        await deleteJob(id);
        showToast(t('deleted'));
        if (lastView === 'detail') await showDashboard();
        else { await renderDashboard(getCurrentFilter()); await updateCounts(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  function showApproveModal(id) {
    showModal(t('confirm_approve_title'), t('confirm_approve_msg'), t('confirm_yes'), false, async () => {
      try {
        await toggleJobStatus(id);
        showToast(t('approved'));
        if (lastView === 'detail') await showDetail(id);
        else { await renderDashboard(getCurrentFilter()); await updateCounts(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  /* ===== FORM SUBMIT ===== */
  valeForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
      job: f.job.value.trim(),
      date: f.date.value,
      name: f.name.value.trim(),
      address: f.address.value.trim(),
      phone: f.phone.value.trim(),
      temper: f.temper.checked,
      item: f.item.value.trim(),
      description: f.description.value.trim(),
      amount: parseFloat(f.amount.value) || 0,
    };

    try {
      if (editingJobId) {
        await updateJob(editingJobId, data);
        showToast(t('saved'));
        const id = editingJobId;
        editingJobId = null;
        if (lastView === 'detail') await showDetail(id);
        else await showDashboard();
      } else {
        const job = await createJob(data);
        generatePDF(job);
        editingJobId = null;
        await showDashboard();
      }
    } catch {
      showToast(t('error_api'), 'error');
    }
  });

  formBack.addEventListener('click', () => {
    editingJobId = null;
    showDashboard();
  });

  detailBack.addEventListener('click', () => {
    showDashboard();
  });

  /* ===== PDF GENERATION ===== */
  function generatePDF(job) {
    if (!job) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = 210, pageH = 297, margin = 18, topBarH = 46;
    const aqua = [102, 224, 192], teal = [11, 43, 59];
    const isEstimado = job.status === 'estimado';

    doc.setFillColor(...teal);
    doc.rect(0, 0, pageW, topBarH, 'F');
    doc.setFillColor(...aqua);
    doc.rect(0, topBarH - 2, pageW, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('LIRIANO & SON SHOWER DOORS CORP', margin, topBarH - 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text(job.date || '', pageW - margin, topBarH - 16, { align: 'right' });
    doc.setFontSize(7);
    doc.text('Miami, FL', pageW - margin, topBarH - 6, { align: 'right' });

    const badgeY = topBarH + 10;
    doc.setFillColor(...(isEstimado ? [224, 160, 48] : [64, 192, 128]));
    doc.roundedRect(margin, badgeY, 40, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(isEstimado ? t('pdf_estimate') : t('pdf_invoice'), margin + 20, badgeY + 5, { align: 'center' });

    const sepY = badgeY + 16;
    doc.setDrawColor(...aqua);
    doc.setLineWidth(0.3);
    doc.line(margin, sepY, pageW - margin, sepY);

    let y = sepY + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...aqua);
    doc.text(t('invoice_to').toUpperCase(), margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(job.name || '', margin, y);
    y += 5;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    if (job.address) { doc.text(job.address, margin, y); y += 4; }
    if (job.phone) { doc.text(job.phone, margin, y); y += 4; }
    if (job.temper) { doc.text('Temper: ' + (job.temper ? t('yes') : t('no')), margin, y); y += 4; }

    y += 4;
    doc.setFillColor(...teal);
    doc.rect(margin, y, pageW - 2 * margin, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(t('item').toUpperCase(), margin + 3, y + 5);
    doc.text(t('description').toUpperCase(), margin + 60, y + 5);
    doc.text(t('amount').toUpperCase(), pageW - margin - 3, y + 5, { align: 'right' });
    y += 7;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    const itemLines = doc.splitTextToSize(job.item || '', 55);
    itemLines.forEach(line => { doc.text(line, margin + 3, y + 3); y += 4; });
    const descLines = doc.splitTextToSize(job.description || '', 70);
    const descStartY = y - itemLines.length * 4 - 2;
    descLines.forEach((line, i) => { doc.text(line, margin + 60, descStartY + i * 4); });
    const descEndY = descStartY + descLines.length * 4;
    y = Math.max(y, descEndY);
    const amountVal = parseFloat(job.amount) || 0;
    doc.setFont('helvetica', 'bold');
    doc.text('$' + amountVal.toFixed(2), pageW - margin - 3, y - descLines.length * 4 + 3, { align: 'right' });

    y += 6;
    doc.setDrawColor(...aqua);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...teal);
    doc.text(t('pdf_total') + ':', pageW - margin - 45, y);
    doc.text('$' + amountVal.toFixed(2), pageW - margin, y, { align: 'right' });

    const sigY = pageH - 50;
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.line(margin, sigY, margin + 60, sigY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(t('pdf_sig'), margin, sigY + 4);

    doc.setFillColor(...teal);
    doc.rect(0, pageH - 14, pageW, 14, 'F');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...aqua);
    doc.text(t('pdf_footer'), pageW / 2, pageH - 5, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(150, 150, 150);
    doc.text('Liriano & Son Shower Doors Corp', pageW / 2, pageH - 1, { align: 'center' });

    if (isEstimado) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text('This is an estimate — not a final invoice.', pageW / 2, pageH - 18, { align: 'center' });
    }

    doc.save(`${job.job || job.name || 'document'}_${job.status}.pdf`);
  }

  /* ===== SEARCH ===== */
  searchInput.addEventListener('input', () => {
    renderDashboard(getCurrentFilter());
  });

  /* ===== FILTERS ===== */
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDashboard(btn.dataset.filter);
  });

  /* ===== TEMPER TOGGLE ===== */
  f.temper.addEventListener('change', () => {
    document.getElementById('temperText').textContent = f.temper.checked ? t('yes') : t('no');
  });

  /* ===== FAB ===== */
  fabBtn.addEventListener('click', () => openForm(null));

  /* ===== INSTALL BUTTON ===== */
  let installPrompt = null;
  const installBtn = $('installBtn');
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const wasInstalled = localStorage.getItem('liriano_installed') === 'true';

  function showInstallModal() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal-box" style="text-align:left">
        <h3 style="text-align:center;margin-bottom:12px">${isIOS ? '📱 Install on iPhone' : '📲 Install App'}</h3>
        ${isIOS ? `
          <p style="margin-bottom:8px;line-height:1.6">1. Tap <b>Share</b> <span style="font-size:1.2rem">⬆</span></p>
          <p style="margin-bottom:8px;line-height:1.6">2. Scroll & tap <b>"Add to Home Screen"</b> <span style="font-size:1.2rem">➕</span></p>
          <p style="margin-bottom:16px;line-height:1.6">3. Tap <b>"Add"</b> top right</p>
        ` : `
          <p style="margin-bottom:16px;line-height:1.6">Open browser menu (⋮) → <b>"Add to Home Screen"</b></p>
        `}
        <div class="modal-actions">
          <button class="modal-btn confirm" id="installModalOk">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#installModalOk').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  if (!isStandalone && !wasInstalled) {
    installBtn.style.display = 'flex';
    window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; });
    installBtn.addEventListener('click', async () => {
      if (installPrompt) {
        installPrompt.prompt();
        const result = await installPrompt.userChoice;
        installPrompt = null;
        if (result.outcome === 'accepted') { installBtn.style.display = 'none'; localStorage.setItem('liriano_installed', 'true'); }
      } else { showInstallModal(); }
    });
    window.addEventListener('appinstalled', () => { installPrompt = null; installBtn.style.display = 'none'; localStorage.setItem('liriano_installed', 'true'); });
  }

  /* ===== LOGIN ===== */
  togglePass.addEventListener('click', () => {
    if (password.type === 'password') { password.type = 'text'; togglePass.querySelector('i').className = 'fas fa-eye-slash'; }
    else { password.type = 'password'; togglePass.querySelector('i').className = 'fas fa-eye'; }
  });

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    loginError.textContent = '';
    if (username.value === 'admin' && password.value === 'liriano2024') {
      loginCard.style.display = 'none';
      document.querySelector('.login-bg').style.display = 'none';
      document.body.classList.remove('login-page');
      appContainer.style.display = 'flex';
      await showDashboard();
    } else {
      loginError.textContent = t('login_error');
    }
  });

  logoutBtn.addEventListener('click', () => {
    loginCard.style.display = '';
    document.querySelector('.login-bg').style.display = '';
    document.body.classList.add('login-page');
    appContainer.style.display = 'none';
  });

  /* ===== LANGUAGE SWITCHING ===== */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  /* ===== AUTO-LOGIN (testing) ===== */
  loginCard.style.display = 'none';
  document.querySelector('.login-bg').style.display = 'none';
  document.body.classList.remove('login-page');
  appContainer.style.display = 'flex';
  showDashboard();

  /* ===== INIT ===== */
  if (isStandalone) localStorage.setItem('liriano_installed', 'true');
  applyTranslations();
  setLanguage(lang);
  f.date.value = new Date().toISOString().split('T')[0];
  document.getElementById('temperText').textContent = t('no');

})();
