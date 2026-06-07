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
      pdf_close: 'Close',
      pdf_share: 'Share',
      pdf_share_msg: 'Hi! Here is your {job} - Total: ${amount}',
      pdf_email_body: 'Dear {name},\n\nPlease find attached the {job} document.\n\nTotal: ${amount}\n\nThank you,\nLiriano & Son Shower Doors Corp',
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
      pdf_est_from: 'Estimate from:',
      pdf_inv_from: 'Invoice from:',
      pdf_est_to: 'Estimate to:',
      pdf_inv_to: 'Invoice to:',
      pdf_est_no: 'Estimate No',
      pdf_inv_no: 'Invoice No',
      pdf_col_glass: 'Glass',
      pdf_col_unit: 'Unit Price',
      pdf_thanks: 'Thank you for choosing us!',
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
      pdf_close: 'Cerrar',
      pdf_share: 'Compartir',
      pdf_share_msg: '¡Hola! Aquí está su {job} - Total: ${amount}',
      pdf_email_body: 'Estimado {name},\n\nAdjunto encontrará el documento de {job}.\n\nTotal: ${amount}\n\nGracias,\nLiriano & Son Shower Doors Corp',
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
      dones: 'Completados',
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
      pdf_est_from: 'De (Estimado):',
      pdf_inv_from: 'De (Factura):',
      pdf_est_to: 'Para (Estimado):',
      pdf_inv_to: 'Para (Factura):',
      pdf_est_no: 'Estimado No',
      pdf_inv_no: 'Factura No',
      pdf_col_glass: 'Grosor',
      pdf_col_unit: 'Precio Unit.',
      pdf_thanks: '¡Gracias por preferirnos!',
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
  const BASE_PATH = isFileProtocol ? '' : '/app';

  function navigateTo(path) {
    if (isFileProtocol) return;
    const url = BASE_PATH + (path.startsWith('/') ? path : '/' + path);
    history.pushState(null, '', url);
  }

  async function handleRoute() {
    if (isFileProtocol) {
      showDashboard();
      return;
    }
    let path = location.pathname;
    if (path.startsWith(BASE_PATH)) {
      path = path.slice(BASE_PATH.length) || '/';
    } else {
      path = '/';
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

  /* ===== PDF GENERATION ===== */
  const LOGO_B64 = 'data:image/png;base64,' +
  'iVBORw0KGgoAAAANSUhEUgAAATEAAACKCAIAAABNfeo9AAAAtGVYSWZJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAEwIDAAEAAAABAAAAaYcEAAEAAABmAAAAAAAAAGAAAAABAAAAYAAAAAEAAAAGAACQBwAEAAAAMDIxMAGRBwAEAAAAAQIDAACgBwAEAAAAMDEwMAGgAwABAAAA//8AAAKgBAABAAAAMQEAAAOgBAABAAAAigAAAAAAAABqz3t3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI2LTA2LTA2PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkRhdGE+eyZxdW90O2RvYyZxdW90OzomcXVvdDtEQUhMdnBmemo4NCZxdW90OywmcXVvdDt1c2VyJnF1b3Q7OiZxdW90O1VBRjFEaEI0NndvJnF1b3Q7LCZxdW90O2JyYW5kJnF1b3Q7OiZxdW90O0JBRjFEa2x0UEk0JnF1b3Q7fTwvQXR0cmliOkRhdGE+CiAgICAgPEF0dHJpYjpFeHRJZD42NTFjNzYyYi05NDczLTQ3MjktYjgwMi0wYjQ1NDE2MjNiMTc8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAg' +
  'IDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QcOxYWRpciB1biB0w610dWxvIC0gMTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSdyJz8+7N/yygAAIABJREFUeJztnYVbVVnf958/4L3v55kZu5sUkObQLd2NdEo3CqIg0qmogGJ359iKSoqJdIqKtF3jqPN+916cIwIqYnBmZnN9L65z9tm51vr8Yu211/6f8XzyjBgxGllN4FcYyyM7VUilsfnu/4z42TBixIhhkhEj7hLDJCNG3CWGSUaMuEsMk4wYcZcYJhkx4i4xTDJixF1imGTEiLvEMMmIEXeJYZIRI+4SwyQjRtwlhklGjLhLDJOMGHGXGCYZMeIuMUwyYsRdYphkxIi7xDDJiBF3iWGSESPuEsMkI0bcJYZJRoy4SwyTjBhxlxgmGTHiLjFMMmLEXWKYZMSIu8QwyYgRd4lhkhEj7hLDJCNG3CWGSUaMuEsMk4wYcZcYJhkx4i4xTDJixF3qx6Qco6FJfqRPgNE/VhP45cfysKYKKdNMCrBGUvzfrJ96wrJ/L034KgkyGjFNnCs3jl9m2jylxjsjzuQ3kvmzT3XkMWOY/EeKYZJhkmGSu8R9TA4DyxE71ZEnjWHynyeuZPJvo5EnjWHynyeGyX8LlgyTfxcxTDJMMkxylxgmGSwZJrlLDJP/LjIZJrlfDJP/OjIZJrlcDJP/RjIZJrlZDJP/RjIZJrlZDJP/Ria/jOVIt8t/s34Sk/TBRhwShswhYznS7fLfrJ/E5Fh+aRwGxxtpQhgyh0bmSLfLf7N+OJPjBGR4WKrKRlb8cppj+aTH0z5zpAlhyPwSliPdLv/N+vFM8svI6pnlbN0ev3KNtpXjDDElQubfWhN6o3E03++D5QRBOYiLsBzpdvlv1o9lErU7jl9aydD6QkFxbUPTuYKi9Jw8dVPb8YIyOOpAegfqB3IlyOZKcJCvXxC/zBg+aegbzvADD+P4WWP5ZMbw4no/Ce3PxnJEmuNcSI7WNzXovhpxwLiDSQ5OdHsFk8qG1vmFJS33Htx70H639cGlkpL4las1zR1mSqoQFCcLK06XUJslPZ9HXk9A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';
  const LOGO_IMG = new Image();
  LOGO_IMG.src = LOGO_B64;
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

    const labelBoxX = 130;
    const labelBoxW = 43;
    const numBoxX = 173;
    const numBoxW = 27;

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

    const fy = 235;
    const fl = 85;
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
    const iconS = 6;
    const groupGap = 10;
    const rowGap = 5;
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
          text: t('pdf_share_msg')
            .replace('{job}', job.job || job.name || '')
            .replace('{amount}', calcTotal(job).toFixed(2))
        };
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            showToast(t('error_api'), 'error');
          }
        }
      });
    } else {
      if (job.phone) {
        $('pdfWa').addEventListener('click', () => {
          const phone = job.phone.replace(/[^0-9]/g, '');
          const msg = encodeURIComponent(
            t('pdf_share_msg')
              .replace('{job}', job.job || job.name || '')
              .replace('{amount}', calcTotal(job).toFixed(2))
          );
          window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        });
      }

      if (job.email) {
        $('pdfMail').addEventListener('click', () => {
          const subject = encodeURIComponent(`${job.status === 'estimado' ? 'Estimate' : 'Invoice'} - ${job.job || job.name}`);
          const body = encodeURIComponent(
            t('pdf_email_body')
              .replace('{name}', job.name || '')
              .replace('{job}', job.job || '')
              .replace('{amount}', calcTotal(job).toFixed(2))
          );
          window.open(`mailto:${job.email}?subject=${subject}&body=${body}`, '_blank');
        });
      }
    }
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

  /* ===== INIT ===== */
  if (isStandalone) localStorage.setItem('liriano_installed', 'true');
  applyTranslations();
  setLanguage(lang);
  f.date.value = new Date().toISOString().split('T')[0];

})();
