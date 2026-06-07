(function() {
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
      email: 'Email',
      email_ph: 'client@email.com',
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
      pdf_estimate: 'ESTIMATE',
      pdf_invoice: 'INVOICE',
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
      pdf_share: 'Share',
      pdf_share_msg: 'Hi! Here is your {job} - Total: ${amount}',
      client: 'Client',
      item_required: 'Item name is required',
      price_required: 'Price is required',
      add_item: 'Add Item',
      edit_item: 'Edit Item',
      remove: 'Remove',
      dimensions: 'Dimensions',
      unit: 'Unit',
      glass_thickness: 'Hardware Color Glass Thickness',
      unit_price: 'Unit Price',
      installation: 'Installation',
      price: 'Price',
      done: 'Done',
      confirm_done_title: 'Mark as Done?',
      confirm_done_msg: 'This job will be moved to completed.',
      completed: 'Completed',
      manage_jobs: 'Manage Jobs',
      manage_jobs_desc: 'Estimates, invoices &amp; completed',
      summary: 'Summary',
      subtotal: 'Subtotal',
      tax_rate: 'Tax Rate',
      sales_tax: 'Sales Tax',
      deposit_required: 'Deposit Required',
      deposit_received: 'Deposit Received',
      total_summary: 'Total',
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
      email: 'Correo',
      email_ph: 'cliente@email.com',
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
      pdf_estimate: 'ESTIMADO',
      pdf_invoice: 'FACTURA',
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
      pdf_share: 'Compartir',
      pdf_share_msg: '¡Hola! Aquí está su {job} - Total: ${amount}',
      client: 'Cliente',
      item_required: 'El nombre del artículo es requerido',
      price_required: 'El precio es requerido',
      add_item: 'Agregar Artículo',
      edit_item: 'Editar Artículo',
      remove: 'Quitar',
      dimensions: 'Dimensiones',
      unit: 'Unidad',
      glass_thickness: 'Grosor del Vidrio - Color Herraje',
      unit_price: 'Precio Unitario',
      installation: 'Instalación',
      price: 'Precio',
      done: 'Completado',
      confirm_done_title: '¿Marcar como Completado?',
      confirm_done_msg: 'Este trabajo se moverá a completados.',
      completed: 'Completado',
      manage_jobs: 'Gestionar Trabajos',
      manage_jobs_desc: 'Estimados, facturas &amp; completados',
      summary: 'Resumen',
      subtotal: 'Subtotal',
      tax_rate: 'Tasa de Impuesto',
      sales_tax: 'Impuesto de Venta',
      deposit_required: 'Depósito Requerido',
      deposit_received: 'Depósito Recibido',
      total_summary: 'Total',
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
      if (jobsView.style.display !== 'none') {
        renderDashboard(getCurrentFilter());
        updateCounts();
      } else if (detailView.style.display !== 'none' && currentDetailId) {
        showDetail(currentDetailId);
      } else if (formView.style.display !== 'none') {
        formViewTitle.textContent = editingJobId ? t('edit_job') : t('new_job');
        saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
        renderCompactItems();
      } else if (itemFormView.style.display !== 'none') {
        itemFormTitle.textContent = editingItemId ? t('edit_job') : t('add_item');
        itemFormSaveBtn.innerHTML = `<i class="fas fa-check"></i> ${t('save')}`;
        ifTemperText.textContent = ifTemper.checked ? t('yes') : t('no');
      }
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
  const jobsView = $('jobsView');
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
    job: $('valeJob'),
    date: $('valeDate'),
    name: $('valeName'),
    address: $('valeAddress'),
    phone: $('valePhone'),
    email: $('valeEmail'),
  };

  const fSubtotal = $('fSubtotal');
  const fTaxRate = $('fTaxRate');
  const fSalesTax = $('fSalesTax');
  const fDeposit = $('fDeposit');
  const fTotalReadonly = $('fTotalReadonly');

  let editingJobId = null;
  let currentDetailId = null;
  let itemFormStatus = 'estimado';
  let lastView = 'dashboard';

  let idCounter = parseInt(localStorage.getItem('liriano_id_counter') || '3970', 10);

  function nextId() {
    const id = idCounter++;
    localStorage.setItem('liriano_id_counter', String(idCounter));
    return '000000-' + String(id).padStart(5, '0');
  }

  let useRemote = true;

  function lsRead() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch { return []; }
  }

  function lsWrite(jobs) {
    localStorage.setItem(LS_KEY, JSON.stringify(jobs));
  }

  function lsSeed() {}

  /* ===== ROUTING ===== */
  const isFileProtocol = location.protocol === 'file:';

  function navigateTo(path) {
    if (isFileProtocol) {
      const newHash = '#' + path;
      if (location.hash !== newHash) location.hash = newHash;
    } else {
      history.pushState(null, '', '/app' + (path.startsWith('/') ? path : '/' + path));
    }
  }

  async function handleRoute() {
    let path;
    if (isFileProtocol) {
      path = location.hash.replace(/^#/, '') || '/';
    } else {
      path = location.pathname.replace(/^\/app/, '') || '/';
    }
    const parts = path.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
    if (parts.length === 0) {
      showDashboard();
    } else if (parts[0] === 'jobs') {
      if (parts.length === 1) {
        await showJobs();
      } else if (parts[1] === 'new') {
        openForm(null);
      } else if (parts.length >= 3 && parts[2] === 'edit') {
        openForm(parts[1]);
      } else {
        await showDetail(parts[1]);
      }
    } else {
      showDashboard();
    }
  }

  async function routeToDashboard() {
    navigateTo('/');
    showDashboard();
  }

  async function routeToJobs() {
    navigateTo('/jobs');
    await showJobs();
  }

  function routeToNewJob() {
    navigateTo('/jobs/new');
    openForm(null);
  }

  function routeToEditJob(id) {
    navigateTo('/jobs/' + id + '/edit');
    openForm(id);
  }

  async function routeToJobDetail(id) {
    navigateTo('/jobs/' + id);
    await showDetail(id);
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
    if (!useRemote) {
      const jobs = lsRead();
      return jobs.find(j => j.id === id) || null;
    }
    try {
      const res = await fetch(API + '?id=' + id);
      const data = await res.json();
      if (!res.ok) return null;
      return data;
    } catch {
      useRemote = false;
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
      data.id = nextId();
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
    delete job.id;
    return await updateJob(id, job);
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

  /* ===== HELPERS ===== */
  function calcTotal(job) {
    if (!job || !job.items || !job.items.length) return 0;
    return job.items.reduce((sum, it) => sum + (parseFloat(it.price) || 0), 0);
  }

  function calcItemsTotal(items) {
    if (!items || !items.length) return 0;
    return items.reduce((sum, it) => sum + (parseFloat(it.price) || 0), 0);
  }

  function updateFinanceSummary() {
    const subtotal = calcItemsTotal(itemsData);
    const taxRate = parseFloat(fTaxRate.value) || 0;
    const salesTax = parseFloat(fSalesTax.value) || 0;
    const deposit = parseFloat(fDeposit.value) || 0;
    const isEstimado = itemFormStatus === 'estimado';
    const total = subtotal + taxRate + salesTax - (isEstimado ? 0 : deposit);
    fSubtotal.value = subtotal.toFixed(2);
    fTotalReadonly.textContent = '$' + total.toFixed(2);
    const depositLabel = document.getElementById('fDepositLabel');
    if (depositLabel) {
      depositLabel.textContent = isEstimado ? t('deposit_required') : t('deposit_received');
    }
  }

  /* ===== DASHBOARD ===== */
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
        routeToJobDetail(card.dataset.id);
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
      btn.addEventListener('click', e => { e.stopPropagation(); routeToEditJob(btn.dataset.id); });
    });
    jobList.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); showDeleteModal(btn.dataset.id); });
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
    jobsView.style.display = view === 'jobs' ? 'block' : 'none';
    formView.style.display = view === 'form' ? 'block' : 'none';
    detailView.style.display = view === 'detail' ? 'block' : 'none';
    itemFormView.style.display = 'none';
    fabBtn.classList.toggle('hidden', view !== 'jobs');
  }

  async function showJobs() {
    lastView = 'jobs';
    showView('jobs');
    await renderDashboard(getCurrentFilter());
  }

  function showDashboard() {
    lastView = 'dashboard';
    showView('dashboard');
    applyTranslations(dashboardView);
  }

  function showRecords() {
    lastView = 'records';
    showView('records');
  }

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
      const dateStr = j.date ? new Date(j.date + 'T12:00:00').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

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
        ${j.phone ? `<div class="detail-field">
          <span class="detail-field-label">${t('phone')}</span>
          <span class="detail-field-value">${esc(j.phone)}</span>
        </div>` : ''}
        ${j.email ? `<div class="detail-field">
          <span class="detail-field-label">${t('email')}</span>
          <span class="detail-field-value">${esc(j.email)}</span>
        </div>` : ''}
        ${(j.items || []).length > 0 ? `
        <div class="detail-section-title" style="margin-top:16px">${t('items')}</div>
        <div class="detail-items-list">${itemsHtml}</div>
        ` : ''}

        <div class="detail-section-title" style="margin-top:16px">${t('summary')}</div>
        <div class="detail-finance">
          <div class="detail-field">
            <span class="detail-field-label">${t('subtotal')}</span>
            <span class="detail-field-value">$${total.toFixed(2)}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">${t('tax_rate')}</span>
            <span class="detail-field-value">$${(j.taxRate || 0).toFixed(2)}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">${t('sales_tax')}</span>
            <span class="detail-field-value">$${(j.salesTax || 0).toFixed(2)}</span>
          </div>
          <div class="detail-field">
            <span class="detail-field-label">${j.status === 'estimado' ? t('deposit_required') : t('deposit_received')}</span>
            <span class="detail-field-value">$${(j.deposit || 0).toFixed(2)}</span>
          </div>
          <div class="detail-field detail-field-total">
            <span class="detail-field-label">${t('total_summary')}</span>
            <span class="detail-field-value">$${((total + (j.taxRate || 0) + (j.salesTax || 0)) - (j.status === 'estimado' ? 0 : (j.deposit || 0))).toFixed(2)}</span>
          </div>
        </div>

        <div class="detail-actions">
          <button class="detail-btn pdf" id="dtlPdf"><i class="fas fa-file-pdf"></i> PDF</button>
          ${j.status === 'estimado' ? `<button class="detail-btn approve" id="dtlApprove"><i class="fas fa-check-circle"></i> ${t('approve')}</button>` : ''}
          ${j.status === 'invoice' ? `<button class="detail-btn done" id="dtlDone"><i class="fas fa-check-double"></i> ${t('done')}</button>` : ''}
          <button class="detail-btn edit-btn" id="dtlEdit"><i class="fas fa-pen"></i> ${t('edit')}</button>
          <button class="detail-btn delete-btn" id="dtlDelete"><i class="fas fa-trash"></i> ${t('del')}</button>
        </div>`;

      $('dtlPdf').addEventListener('click', () => showPDFPreview(j));
      if (j.status === 'estimado') {
        $('dtlApprove').addEventListener('click', () => showApproveModal(j.id));
      }
      if (j.status === 'invoice') {
        $('dtlDone').addEventListener('click', () => showDoneModal(j.id));
      }
      $('dtlEdit').addEventListener('click', () => routeToEditJob(j.id));
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
        if (lastView === 'detail') await routeToJobs();
        else { await renderDashboard(getCurrentFilter()); await updateCounts(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  function showApproveModal(id) {
    showModal(t('confirm_approve_title'), t('confirm_approve_msg'), t('confirm_yes'), false, async () => {
      try {
        await toggleJobStatus(id);
        showToast(t('approved'));
        if (lastView === 'detail') await routeToJobDetail(id);
        else { await routeToJobs(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  function showDoneModal(id) {
    showModal(t('confirm_done_title'), t('confirm_done_msg'), t('confirm_yes'), false, async () => {
      try {
        await toggleJobDone(id);
        showToast(t('completed'));
        if (lastView === 'detail') await routeToJobs();
        else { await renderDashboard(getCurrentFilter()); await updateCounts(); }
      } catch { showToast(t('error_api'), 'error'); }
    });
  }

  async function toggleJobDone(id) {
    const job = await getJobById(id);
    if (!job) return null;
    job.status = 'done';
    delete job.id;
    return await updateJob(id, job);
  }

  /* ===== ITEMS (compact list + separate item form) ===== */
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
      btn.addEventListener('click', e => {
        e.stopPropagation();
        removeItem(+btn.dataset.itemId);
      });
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
    const descGroup = document.querySelector('#itemFormDesc')?.closest('.form-group');
    const unitPriceGroup = document.querySelector('#itemFormUnitPrice')?.closest('.form-group.price-wrap');
    const glassLabel = document.querySelector('label[for="itemFormGlass"]');
    if (descGroup) descGroup.style.display = isEstimado ? 'none' : '';
    if (unitPriceGroup) unitPriceGroup.style.display = isEstimado ? '' : 'none';
    if (glassLabel) glassLabel.textContent = isEstimado ? (lang === 'es' ? 'Grosor del Vidrio - Color Herraje' : 'Hardware Color Glass Thickness') : (lang === 'es' ? 'Grosor del Vidrio' : 'Glass Thickness');

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

  function collectItems() {
    return itemsData.map(it => ({ ...it }));
  }

  addItemBtn.addEventListener('click', () => openItemForm(null));
  itemFormBack.addEventListener('click', closeItemForm);
  itemFormSaveBtn.addEventListener('click', saveItemFromForm);
  ifTemper.addEventListener('change', () => { ifTemperText.textContent = ifTemper.checked ? t('yes') : t('no'); });
  fTaxRate.addEventListener('input', updateFinanceSummary);
  fSalesTax.addEventListener('input', updateFinanceSummary);
  fDeposit.addEventListener('input', updateFinanceSummary);

  /* ===== FORM SUBMIT ===== */

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
        if (lastView === 'detail') await routeToJobDetail(id);
        else await routeToJobs();
      } else {
        const job = await createJob(data);
        showPDFPreview(job);
        editingJobId = null;
        await routeToJobs();
      }
    } catch {
      showToast(t('error_api'), 'error');
    }
  });

  $('headerBrand').addEventListener('click', () => {
    if (lastView !== 'dashboard') routeToDashboard();
  });
  $('dashboardJobs').addEventListener('click', () => routeToJobs());
  formBack.addEventListener('click', () => {
    editingJobId = null;
    routeToJobs();
  });

  detailBack.addEventListener('click', () => {
    routeToJobs();
  });

  /* ===== PDF MENU (UI only, no PDF generation) ===== */

  async function showPDFPreview(job) {
    if (!job) return;

    const overlay = document.createElement('div');
    overlay.className = 'pdf-blur-overlay';

    const actions = document.createElement('div');
    actions.className = 'pdf-float-actions';

    const dlBtn = document.createElement('button');
    dlBtn.className = 'pdf-btn download';
    dlBtn.innerHTML = `<i class="fas fa-download"></i> ${t('view_pdf')}`;
    dlBtn.addEventListener('click', () => { close(); });
    actions.appendChild(dlBtn);

    if (job.phone) {
      const waBtn = document.createElement('button');
      waBtn.className = 'pdf-btn whatsapp';
      waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> WhatsApp`;
      waBtn.addEventListener('click', async () => {
        const phone = job.phone.replace(/[^0-9]/g, '');
        const msg = encodeURIComponent(
          t('pdf_share_msg').replace('{job}', job.job || job.name || '').replace('{amount}', calcTotal(job).toFixed(2))
        );
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        close();
      });
      actions.appendChild(waBtn);
    }

    document.body.appendChild(overlay);
    document.body.appendChild(actions);

    function close() {
      overlay.remove();
      actions.remove();
    }

    overlay.addEventListener('click', close);
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

  /* ===== CLIENT AUTOCOMPLETE ===== */
  let clientsCache = [];

  async function loadClientsCache() {
    try {
      const jobs = await getJobs();
      clientsCache = extractClients(jobs);
    } catch {
      clientsCache = extractClients(lsRead());
    }
  }

  function extractClients(jobs) {
    const seen = {};
    return jobs.filter(j => {
      if (!j.name || seen[j.name]) return false;
      seen[j.name] = true;
      return true;
    }).map(j => ({ name: j.name, phone: j.phone || '', email: j.email || '', address: j.address || '' }));
  }

  let acIndex = -1;

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
      el.addEventListener('click', () => {
        const idx = +el.dataset.index;
        selectClient(matches[idx]);
      });
    });
  }

  function selectClient(client) {
    f.name.value = client.name;
    f.phone.value = client.phone;
    f.email.value = client.email;
    f.address.value = client.address;
    $('autocompleteList').classList.remove('show');
  }

  f.name.addEventListener('input', () => {
    showAutocomplete(f.name.value);
  });

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
  f.name.addEventListener('blur', () => {
    setTimeout(() => $('autocompleteList').classList.remove('show'), 200);
  });

  /* ===== FAB ===== */
  fabBtn.addEventListener('click', () => routeToNewJob());

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

  /* ===== DATE PICKER: click anywhere opens calendar ===== */
  document.querySelectorAll('.form-group input[type="date"]').forEach(inp => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;cursor:pointer;z-index:1';
    wrap.addEventListener('click', () => { try { inp.showPicker(); } catch(_) {} });
    inp.parentElement.style.position = 'relative';
    inp.parentElement.appendChild(wrap);
  });

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
      await handleRoute();
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
  handleRoute();

  window.addEventListener('popstate', () => handleRoute());
  window.addEventListener('hashchange', () => handleRoute());

  /* ===== INIT ===== */
  if (isStandalone) localStorage.setItem('liriano_installed', 'true');
  applyTranslations();
  setLanguage(lang);
  f.date.value = new Date().toISOString().split('T')[0];

})();
