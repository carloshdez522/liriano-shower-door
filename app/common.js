(function () {
  'use strict';

  const API = '/app/api/';

  const i18n = {
    en: {
      login_user_ph: 'Username', login_pass_ph: 'Password', login_btn: 'Log In', login_error: 'Invalid credentials',
      logout: 'Log out', job: 'Job', job_ph: 'e.g. Window Installation', date: 'Date', invoice_to: 'Invoice To',
      name: 'Name', name_ph: 'Client name', address: 'Address', address_ph: 'Street, city, zip',
      phone: 'Phone', phone_ph: '+1 (786) 222-4264', email: 'Email', email_ph: 'client@email.com',
      temper: 'Temper', yes: 'Yes', no: 'No', items: 'Items', item: 'Item', item_ph: 'e.g. Frameless shower door',
      description: 'Description', desc_ph: 'Details, measurements, notes...', amount: 'Amount ($)',
      search_ph: 'Search by name, job, phone...', save: 'Save', new_job: 'New Job', edit_job: 'Edit Job',
      dash_title: '', all: 'All', estimados: 'Estimates', facturas: 'Invoices',
      empty: 'No jobs yet. Tap + to create one.', view_pdf: 'PDF', approve: 'Approve', edit: 'Edit', del: 'Delete',
      confirm_delete_title: 'Delete Job?', confirm_delete_msg: 'This cannot be undone.',
      confirm_approve_title: 'Convert to Invoice?', confirm_approve_msg: 'This will change the status from estimate to invoice.',
      confirm_cancel: 'Cancel', confirm_yes: 'Yes', detail_title: 'Details', saved: 'Saved', deleted: 'Deleted',
      approved: 'Converted to invoice', error_api: 'Server error',
      pdf_share: 'Share', pdf_share_msg: 'Hi! Here is your {job} - Total: ${amount}',
      pdf_email_body: 'Dear {name},\n\nPlease find attached the {job} document.\n\nTotal: ${amount}\n\nThank you,\nLiriano & Son Shower Doors Corp',
      client: 'Client', item_required: 'Item name is required', price_required: 'Price is required',
      add_item: 'Add Item', edit_item: 'Edit Item', remove: 'Remove', dimensions: 'Dimensions', unit: 'Unit',
      glass_thickness: 'Hardware Color Glass Thickness', unit_price: 'Unit Price', installation: 'Installation',
      price: 'Price', done: 'Done', confirm_done_title: 'Mark as Done?', confirm_done_msg: 'This job will be moved to completed.',
      completed: 'Completed', manage_jobs: 'Manage Jobs', manage_jobs_desc: 'Estimates, invoices &amp; completed',
      summary: 'Summary', subtotal: 'Subtotal', tax_rate: 'Tax Rate', sales_tax: 'Sales Tax',
      deposit_required: 'Deposit Required', deposit_received: 'Deposit Received', total_summary: 'Total',
      records: 'Records', records_desc: 'Completed &amp; archived jobs',
      pdf_estimate: 'ESTIMATE', pdf_invoice: 'INVOICE',
      pdf_est_from: 'Estimate from:', pdf_inv_from: 'Invoice from:', pdf_est_to: 'Estimate to:', pdf_inv_to: 'Invoice to:',
      pdf_est_no: 'Estimate No', pdf_inv_no: 'Invoice No', pdf_col_glass: 'Glass', pdf_col_unit: 'Unit Price',
      pdf_thanks: 'Thank you for choosing us!',
    },
    es: {
      login_user_ph: 'Usuario', login_pass_ph: 'Contraseña', login_btn: 'Entrar', login_error: 'Credenciales inválidas',
      logout: 'Salir', job: 'Trabajo', job_ph: 'Ej: Instalación de ventana', date: 'Fecha', invoice_to: 'Facturar A',
      name: 'Nombre', name_ph: 'Nombre del cliente', address: 'Dirección', address_ph: 'Calle, ciudad, código postal',
      phone: 'Teléfono', phone_ph: '+1 (786) 222-4264', email: 'Correo', email_ph: 'cliente@email.com',
      temper: 'Temple', yes: 'Sí', no: 'No', items: 'Artículos', item: 'Artículo', item_ph: 'Ej: Puerta de ducha sin marco',
      description: 'Descripción', desc_ph: 'Detalles, medidas, notas...', amount: 'Monto ($)',
      search_ph: 'Buscar por nombre, trabajo, teléfono...', save: 'Guardar', new_job: 'Nuevo Trabajo', edit_job: 'Editar Trabajo',
      dash_title: '', all: 'Todos', estimados: 'Estimados', facturas: 'Facturas',
      empty: 'Sin trabajos. Toque + para crear uno.', view_pdf: 'PDF', approve: 'Aprobar', edit: 'Editar', del: 'Eliminar',
      confirm_delete_title: '¿Eliminar Trabajo?', confirm_delete_msg: 'No se puede deshacer.',
      confirm_approve_title: '¿Convertir a Factura?', confirm_approve_msg: 'Esto cambiará el estado de estimado a factura.',
      confirm_cancel: 'Cancelar', confirm_yes: 'Sí', detail_title: 'Detalles', saved: 'Guardado', deleted: 'Eliminado',
      approved: 'Convertido a factura', error_api: 'Error del servidor',
      pdf_share: 'Compartir', pdf_share_msg: '¡Hola! Aquí está su {job} - Total: ${amount}',
      pdf_email_body: 'Estimado {name},\n\nAdjunto encontrará el documento de {job}.\n\nTotal: ${amount}\n\nGracias,\nLiriano & Son Shower Doors Corp',
      client: 'Cliente', item_required: 'El nombre del artículo es requerido', price_required: 'El precio es requerido',
      add_item: 'Agregar Artículo', edit_item: 'Editar Artículo', remove: 'Quitar', dimensions: 'Dimensiones', unit: 'Unidad',
      glass_thickness: 'Grosor del Vidrio - Color Herraje', unit_price: 'Precio Unitario', installation: 'Instalación',
      price: 'Precio', done: 'Completado', confirm_done_title: '¿Marcar como Completado?',
      confirm_done_msg: 'Este trabajo se moverá a completados.', completed: 'Completado',
      manage_jobs: 'Gestionar Trabajos', manage_jobs_desc: 'Estimados, facturas &amp; completados',
      summary: 'Resumen', subtotal: 'Subtotal', tax_rate: 'Tasa de Impuesto', sales_tax: 'Impuesto de Venta',
      deposit_required: 'Depósito Requerido', deposit_received: 'Depósito Recibido', total_summary: 'Total',
      records: 'Registros', records_desc: 'Trabajos completados &amp; archivados',
      pdf_estimate: 'ESTIMADO', pdf_invoice: 'FACTURA',
      pdf_est_from: 'De (Estimado):', pdf_inv_from: 'De (Factura):', pdf_est_to: 'Para (Estimado):', pdf_inv_to: 'Para (Factura):',
      pdf_est_no: 'Estimado No', pdf_inv_no: 'Factura No', pdf_col_glass: 'Grosor', pdf_col_unit: 'Precio Unit.',
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
  }

  function $(id) { return document.getElementById(id); }

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
  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function calcTotal(job) {
    if (!job || !job.items || !job.items.length) return 0;
    return job.items.reduce((sum, it) => sum + (parseFloat(it.price) || 0), 0);
  }

  function calcItemsTotal(items) {
    if (!items || !items.length) return 0;
    return items.reduce((sum, it) => sum + (parseFloat(it.price) || 0), 0);
  }

  /* ===== API (no localStorage fallback) ===== */
  async function apiFetch(method, query, body) {
    let url = API;
    if (query) url += '?' + query;
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(url, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t('error_api'));
    return data;
  }

  async function getJobs() { return await apiFetch('GET'); }
  async function getJobById(id) { return await apiFetch('GET', 'id=' + encodeURIComponent(id)); }
  async function createJob(data) {
    data.status = 'estimado';
    data.createdAt = Date.now();
    return await apiFetch('POST', null, data);
  }
  async function updateJob(id, data) {
    data.id = id;
    return await apiFetch('PUT', null, data);
  }
  async function deleteJob(id) { return await apiFetch('DELETE', 'id=' + encodeURIComponent(id)); }

  async function toggleJobStatus(id) {
    const job = await getJobById(id);
    if (!job) return null;
    job.status = job.status === 'estimado' ? 'invoice' : 'estimado';
    return await updateJob(id, job);
  }

  async function toggleJobDone(id) {
    const job = await getJobById(id);
    if (!job) return null;
    job.status = 'done';
    return await updateJob(id, job);
  }

  /* ===== MODAL ===== */
  function showModal(title, msg, confirmLabel, isDanger, callback) {
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
    overlay.querySelector('#modalCancel').addEventListener('click', () => { overlay.remove(); });
    overlay.querySelector('#modalConfirm').addEventListener('click', () => { overlay.remove(); if (callback) callback(); });
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  /* ===== INSTALL BUTTON ===== */
  let installPrompt = null;
  const installBtn = $('installBtn');
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const wasInstalled = localStorage.getItem('liriano_installed') === 'true';

  if (installBtn && !isStandalone && !wasInstalled) {
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

  function showInstallModal() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal-box" style="text-align:left">
        <h3 style="text-align:center;margin-bottom:12px">${isIOS ? '📱 Install on iPhone' : '📲 Install App'}</h3>
        ${isIOS ? `
          <p style="margin-bottom:8px;line-height:1.6">1. Tap <b>Share</b> <span style="font-size:1.2rem">&#x2B06;</span></p>
          <p style="margin-bottom:8px;line-height:1.6">2. Scroll & tap <b>"Add to Home Screen"</b> <span style="font-size:1.2rem">&#x2795;</span></p>
          <p style="margin-bottom:16px;line-height:1.6">3. Tap <b>"Add"</b> top right</p>
        ` : `
          <p style="margin-bottom:16px;line-height:1.6">Open browser menu (&#x22EE;) &#x2192; <b>"Add to Home Screen"</b></p>
        `}
        <div class="modal-actions">
          <button class="modal-btn confirm" id="installModalOk">OK</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#installModalOk').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  /* ===== DATE PICKER ENHANCEMENT ===== */
  document.querySelectorAll('.form-group input[type="date"]').forEach(inp => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;cursor:pointer;z-index:1';
    wrap.addEventListener('click', () => { try { inp.showPicker(); } catch(_) {} });
    inp.parentElement.style.position = 'relative';
    inp.parentElement.appendChild(wrap);
  });

  /* ===== LANGUAGE SWITCHING ===== */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  /* ===== GLOBAL EXPORTS ===== */
  window.$ = $;
  window.t = t;
  window.esc = esc;
  window.calcTotal = calcTotal;
  window.calcItemsTotal = calcItemsTotal;
  window.showToast = showToast;
  window.getJobs = getJobs;
  window.getJobById = getJobById;
  window.createJob = createJob;
  window.updateJob = updateJob;
  window.deleteJob = deleteJob;
  window.toggleJobStatus = toggleJobStatus;
  window.toggleJobDone = toggleJobDone;
  window.showModal = showModal;
  window.applyTranslations = applyTranslations;
  window.setLanguage = setLanguage;
  window.showInstallModal = showInstallModal;

  /* ===== INIT ===== */
  if (isStandalone) localStorage.setItem('liriano_installed', 'true');
  applyTranslations();
  setLanguage(lang);

})();
