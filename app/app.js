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
      records: 'Records',
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
      records: 'Registros',
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

  function lsSeed() {
    const existing = lsRead();
    if (existing.length > 0) return;
    const base = Date.now();
    const sample = [
      { id:'000000-03970', job:'Master Bath Shower Door', date:'2026-06-03', name:'James Sullivan', address:'8521 Ocean Dr, Miami Beach, FL 33139', phone:'+1 (305) 555-0147', email:'jim.sullivan@email.com', status:'estimado', createdAt:base-70000000, items:[{ id:1, temper:true, item:'Frameless Shower Door 3/8', description:'', dimensionsW:60, dimensionsH:72, dimensionsUnit:'in', glassThickness:'Brushed nickel, 3/8 clear tempered', installation:1, installationUnit:'unit', unitPrice:780, price:780 }] },
      { id:'000000-03971', job:'Downtown Office Partitions', date:'2026-05-30', name:'Maria Lawson', address:'444 Brickell Ave Ste 200, Miami, FL 33131', phone:'+1 (305) 555-0892', email:'mlawson@lawgroup.com', status:'invoice', createdAt:base-60000000, items:[{ id:1, temper:true, item:'Glass Partition 72x96', description:'Full frame aluminum, frosted film', dimensionsW:72, dimensionsH:96, dimensionsUnit:'in', glassThickness:'Aluminum frame, 1/4 laminated', installation:3, installationUnit:'unit', unitPrice:950, price:2850 }] },
      { id:'000000-03972', job:'Waterfront Balcony Railing', date:'2026-05-26', name:'Thomas Rivera', address:'1200 Alton Rd Unit 8B, Miami Beach, FL 33139', phone:'+1 (305) 555-0734', email:'trivera@email.com', status:'estimado', createdAt:base-50000000, items:[{ id:1, temper:true, item:'Glass Balustrade Panel 48x42', description:'', dimensionsW:48, dimensionsH:42, dimensionsUnit:'in', glassThickness:'Stainless steel post, 1/2 tempered', installation:20, installationUnit:'ft', unitPrice:1750, price:1750 }] },
      { id:'000000-03973', job:'Retail Storefront Display', date:'2026-05-20', name:'Jennifer Park', address:'7890 SW 40th St, Miami, FL 33155', phone:'+1 (305) 555-0611', status:'invoice', createdAt:base-40000000, items:[{ id:1, temper:true, item:'Tempered Showcase Glass 36x60', description:'Tempered low-E, anodized frame', dimensionsW:36, dimensionsH:60, dimensionsUnit:'in', glassThickness:'Low-E tempered, anodized frame', installation:4, installationUnit:'unit', unitPrice:520, price:2080 }] },
      { id:'000000-03974', job:'Hotel Lobby Mirror Wall', date:'2026-05-16', name:'Adrian Foster', address:'3000 Collins Ave, Miami Beach, FL 33140', phone:'+1 (305) 555-0945', email:'afoster@fostergroup.com', status:'estimado', createdAt:base-30000000, items:[{ id:1, temper:false, item:'Wall Mirror 120x84', description:'', dimensionsW:120, dimensionsH:84, dimensionsUnit:'in', glassThickness:'1/4 beveled edge', installation:70, installationUnit:'sqft', unitPrice:1200, price:1200 },{ id:2, temper:false, item:'Accent Mirror 48x48', description:'', dimensionsW:48, dimensionsH:48, dimensionsUnit:'in', glassThickness:'1/4 beveled edge', installation:16, installationUnit:'sqft', unitPrice:800, price:800 }] },
      { id:'000000-03975', job:'Bathroom Vanity Glass Splash', date:'2026-05-12', name:'Diana Reyes', address:'5500 Sunset Dr, Coral Gables, FL 33146', phone:'+1 (305) 555-0322', status:'invoice', createdAt:base-20000000, items:[{ id:1, temper:true, item:'Glass Splash 36x24', description:'Brushed brass hardware', dimensionsW:36, dimensionsH:24, dimensionsUnit:'in', glassThickness:'Brushed brass, 3/8 clear', installation:1, installationUnit:'unit', unitPrice:340, price:680 }] },
    ];
    const maxExisting = sample.reduce((m, j) => Math.max(m, parseInt(j.id.split('-')[1], 10) || 0), 3970);
    idCounter = maxExisting + 1;
    localStorage.setItem('liriano_id_counter', String(idCounter));
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
        itemsData = (j.items || []).map(it => ({ ...it }));
        itemIdCounter = itemsData.reduce((max, it) => Math.max(max, it.id || 0), 0) + 1;
        renderCompactItems();
      });
    } else {
      itemFormStatus = 'estimado';
      formViewTitle.textContent = t('new_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      f.date.value = new Date().toISOString().split('T')[0];
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
        if (lastView === 'detail') await showJobs();
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

  function showDoneModal(id) {
    showModal(t('confirm_done_title'), t('confirm_done_msg'), t('confirm_yes'), false, async () => {
      try {
        await toggleJobDone(id);
        showToast(t('completed'));
        if (lastView === 'detail') await showJobs();
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
      items: finalItems,
    };

    try {
      if (editingJobId) {
        await updateJob(editingJobId, data);
        showToast(t('saved'));
        const id = editingJobId;
        editingJobId = null;
        if (lastView === 'detail') await showDetail(id);
        else await showJobs();
      } else {
        const job = await createJob(data);
        showPDFPreview(job);
        editingJobId = null;
        await showJobs();
      }
    } catch {
      showToast(t('error_api'), 'error');
    }
  });

  $('headerBrand').addEventListener('click', () => {
    if (lastView !== 'dashboard') showDashboard();
  });
  $('dashboardJobs').addEventListener('click', () => showJobs());
  $('dashboardRecords').addEventListener('click', () => showRecords());
  formBack.addEventListener('click', () => {
    editingJobId = null;
    showJobs();
  });

  detailBack.addEventListener('click', () => {
    showJobs();
  });

  /* ===== PDF GENERATION ===== */
  function buildPDFDoc(job) {
    if (!job) return null;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = 210, pageH = 297, margin = 18, topBarH = 46;
    const aqua = [102, 224, 192], teal = [11, 43, 59];
    const isEstimado = job.status === 'estimado';
    const items = job.items || [];
    const total = calcTotal(job);

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
    if (job.email) { doc.text(job.email, margin, y); y += 4; }

    // Table header
    y += 4;
    doc.setFillColor(...teal);
    doc.rect(margin, y, pageW - 2 * margin, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);

    if (isEstimado) {
      const colW = [40, 50, 35, 28, 30];
      let cx = margin + 3;
      doc.text(t('item').toUpperCase(), cx, y + 5); cx += colW[0];
      doc.text(t('hardware_color').toUpperCase(), cx, y + 5); cx += colW[1];
      doc.text(lang === 'es' ? 'VIDRIO' : 'GLASS', cx, y + 5); cx += colW[2];
      doc.text(t('unit_price').toUpperCase(), cx, y + 5); cx += colW[3];
      doc.text(t('pdf_total').toUpperCase(), cx, y + 5);
    } else {
      const colW = [40, 50, 35, 28, 30];
      let cx = margin + 3;
      doc.text(t('item').toUpperCase(), cx, y + 5); cx += colW[0];
      doc.text(t('description').toUpperCase(), cx, y + 5); cx += colW[1];
      doc.text(lang === 'es' ? 'GROSOR VIDRIO' : 'GLASS THICKNESS', cx, y + 5); cx += colW[2];
      doc.text(t('unit_price').toUpperCase(), cx, y + 5); cx += colW[3];
      doc.text(t('pdf_total').toUpperCase(), cx, y + 5);
    }
    y += 7;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 2;

    // Item rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);

    items.forEach(it => {
      const itemName = it.item || '';
      const desc = it.description || '';
      const glassLabel = isEstimado
        ? ((it.dimensionsW || it.dimensionsH) ? (it.dimensionsW || '?') + ' x ' + (it.dimensionsH || '?') + ' ' + (it.dimensionsUnit || 'in') : '')
        : (it.glassThickness || '');
      const unitPrice = parseFloat(it.unitPrice) || 0;
      const totalPrice = parseFloat(it.price) || 0;

      const nameLines = doc.splitTextToSize(itemName, 38);
      const descLines = doc.splitTextToSize(desc, 48);
      const glassLines = doc.splitTextToSize(glassLabel, 33);

      const rowH = Math.max(
        nameLines.length * 4,
        descLines.length * 4,
        glassLines.length * 4,
        5
      );

      nameLines.forEach((line, i) => { doc.text(line, margin + 3, y + (i * 4)); });
      descLines.forEach((line, i) => { doc.text(line, margin + 44, y + (i * 4)); });
      glassLines.forEach((line, i) => { doc.text(line, margin + 95, y + (i * 4)); });
      doc.text('$' + unitPrice.toFixed(2), margin + 130, y + 3, { align: 'right' });
      doc.setFont('helvetica', 'bold');
      doc.text('$' + totalPrice.toFixed(2), margin + 160, y + 3, { align: 'right' });
      doc.setFont('helvetica', 'normal');

      y += rowH + 3;
    });

    // Total line
    doc.setDrawColor(...aqua);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...teal);
    doc.text(t('pdf_total') + ':', pageW - margin - 45, y);
    doc.text('$' + total.toFixed(2), pageW - margin, y, { align: 'right' });

    // Signature
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

    return doc;
  }

  function showPDFPreview(job) {
    if (!job) return;
    const doc = buildPDFDoc(job);
    if (!doc) return;
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const filename = `${job.job || job.name || 'document'}_${job.status}.pdf`;

    const canShare = typeof navigator.share === 'function' && typeof File === 'function';

    const overlay = document.createElement('div');
    overlay.className = 'pdf-overlay';
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

})();
