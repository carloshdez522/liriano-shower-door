(function () {
  'use strict';

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
      glass_thickness: 'Glass Thickness', unit_price: 'Unit Price', installation: 'Installation',
      price: 'Price', done: 'Done', confirm_done_title: 'Mark as Done?', confirm_done_msg: 'This job will be moved to completed.',
      completed: 'Completed', manage_jobs: 'Manage Jobs', manage_jobs_desc: 'Estimates, invoices &amp; completed',
      summary: 'Summary', subtotal: 'Subtotal', tax_rate: 'Tax Rate', sales_tax: 'Sales Tax',
      deposit_required: 'Deposit Required', deposit_received: 'Deposit Received', total_summary: 'Total',
      records: 'Records', records_desc: 'Completed &amp; archived jobs',
      pdf_estimate: 'ESTIMATE', pdf_invoice: 'INVOICE',
      pdf_est_from: 'Estimate from:', pdf_inv_from: 'Invoice from:', pdf_est_to: 'Estimate to:', pdf_inv_to: 'Invoice to:',
      pdf_est_no: 'Estimate No', pdf_inv_no: 'Invoice No',       pdf_col_glass: 'Glass Thickness', pdf_col_unit: 'Unit Price', pdf_col_desc: 'Description',
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
      glass_thickness: 'Grosor del Vidrio', unit_price: 'Precio Unitario', installation: 'Instalación',
      price: 'Precio', done: 'Completado', confirm_done_title: '¿Marcar como Completado?',
      confirm_done_msg: 'Este trabajo se moverá a completados.', completed: 'Completado',
      manage_jobs: 'Gestionar Trabajos', manage_jobs_desc: 'Estimados, facturas &amp; completados',
      summary: 'Resumen', subtotal: 'Subtotal', tax_rate: 'Tasa de Impuesto', sales_tax: 'Impuesto de Venta',
      deposit_required: 'Depósito Requerido', deposit_received: 'Depósito Recibido', total_summary: 'Total',
      records: 'Registros', records_desc: 'Trabajos completados &amp; archivados',
      pdf_estimate: 'ESTIMADO', pdf_invoice: 'FACTURA',
      pdf_est_from: 'De (Estimado):', pdf_inv_from: 'De (Factura):', pdf_est_to: 'Para (Estimado):', pdf_inv_to: 'Para (Factura):',
      pdf_est_no: 'Estimado No', pdf_inv_no: 'Factura No',       pdf_col_glass: 'Grosor', pdf_col_unit: 'Precio Unit.', pdf_col_desc: 'Descripción',
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

  /* ===== DATA: localStorage (file://) / API (server) ===== */
  const USE_LOCAL = location.protocol === 'file:';
  const API = '/app/api/';
  const STORAGE_KEY = 'liriano_jobs';

  function loadLocalJobs() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (_) { return []; }
  }
  function saveLocalJobs(jobs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }
  function nextLocalId() {
    const jobs = loadLocalJobs();
    let max = 0;
    for (const j of jobs) { const id = parseInt(j.id, 10); if (id > max) max = id; }
    return String(max + 1);
  }

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

  async function getJobs() {
    if (USE_LOCAL) return loadLocalJobs();
    return await apiFetch('GET');
  }
  async function getJobById(id) {
    if (USE_LOCAL) return loadLocalJobs().find(j => j.id === id) || null;
    return await apiFetch('GET', 'id=' + encodeURIComponent(id));
  }
  async function createJob(data) {
    if (USE_LOCAL) {
      data.id = nextLocalId();
      data.status = 'estimado';
      data.createdAt = Date.now();
      const jobs = loadLocalJobs();
      jobs.push(data);
      saveLocalJobs(jobs);
      return data;
    }
    data.status = 'estimado';
    data.createdAt = Date.now();
    return await apiFetch('POST', null, data);
  }
  async function updateJob(id, data) {
    if (USE_LOCAL) {
      data.id = id;
      const jobs = loadLocalJobs();
      const idx = jobs.findIndex(j => j.id === id);
      if (idx === -1) throw new Error('Job not found');
      jobs[idx] = data;
      saveLocalJobs(jobs);
      return data;
    }
    data.id = id;
    return await apiFetch('PUT', null, data);
  }
  async function deleteJob(id) {
    if (USE_LOCAL) {
      saveLocalJobs(loadLocalJobs().filter(j => j.id !== id));
      return { success: true };
    }
    return await apiFetch('DELETE', 'id=' + encodeURIComponent(id));
  }

  async function toggleJobStatus(id) {
    if (USE_LOCAL) {
      const jobs = loadLocalJobs();
      const job = jobs.find(j => j.id === id);
      if (!job) return null;
      job.status = job.status === 'estimado' ? 'invoice' : 'estimado';
      saveLocalJobs(jobs);
      return job;
    }
    const job = await getJobById(id);
    if (!job) return null;
    job.status = job.status === 'estimado' ? 'invoice' : 'estimado';
    return await updateJob(id, job);
  }

  async function toggleJobDone(id) {
    if (USE_LOCAL) {
      const jobs = loadLocalJobs();
      const job = jobs.find(j => j.id === id);
      if (!job) return null;
      job.status = 'done';
      saveLocalJobs(jobs);
      return job;
    }
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

  /* ===== PDF GENERATION ===== */

  function getLang() {
    return localStorage.getItem('liriano_lang') || 'en';
  }

  async function buildPDFDoc(job) {
    if (!job) return null;
    const isEstimado = job.status === 'estimado';
    const items = job.items || [];
    const lang = getLang();
    const _t = (key) => i18n.en[key] || key;
    const t = _t;

    const pfB64 = window.playfairBoldB64;
    if (!pfB64) throw new Error('Playfair font not loaded');

    const { PDFDocument, StandardFonts, rgb } = PDFLib;

    const tmplB64 = window.plantillaB64;
    if (!tmplB64) throw new Error('Template PDF not loaded');
    const tmplBytes = Uint8Array.from(atob(tmplB64), c => c.charCodeAt(0));
    const pdfDoc = await PDFDocument.load(tmplBytes);
    pdfDoc.registerFontkit(window.fontkit);
    const page = pdfDoc.getPages()[0];
    const ph = page.getHeight();

    const pfBytes = Uint8Array.from(atob(pfB64), c => c.charCodeAt(0));
    const pfF = await pdfDoc.embedFont(pfBytes);
    const hv = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const hb = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const cDark = rgb(0.098, 0.161, 0.239);
    const cGray = rgb(0.333, 0.333, 0.333);
    const cBody = rgb(0.2, 0.2, 0.2);
    const cWhite = rgb(1, 1, 1);

    const mm = 72 / 25.4;
    function jsY(y) { return ph - y * mm; }
    function jsRect(y, h) { return ph - (y + h) * mm; }

    function dText(text, x, y, size, font, color, align) {
      let xp = x * mm;
      if (align === 'right' || align === 'end') xp -= font.widthOfTextAtSize(text, size);
      else if (align === 'center') xp -= font.widthOfTextAtSize(text, size) / 2;
      page.drawText(text, { x: xp, y: jsY(y), size, font, color });
    }

    function tWidth(text, size, font) {
      return font.widthOfTextAtSize(text, size);
    }

    function splitText(text, maxWidthPt, font, size) {
      if (!text) return [''];
      text = String(text);
      const words = text.split(/\s+/);
      const lines = [];
      let line = '';
      for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (tWidth(test, size, font) <= maxWidthPt) {
          line = test;
        } else {
          if (line) lines.push(line);
          line = word;
        }
      }
      if (line) lines.push(line);
      return lines.length ? lines : [text === '' ? '' : text];
    }

    dText(isEstimado ? t('pdf_estimate') : t('pdf_invoice'), 201, 25, 44, pfF, cDark, 'right');

    const prefix = isEstimado ? t('pdf_est_no') : t('pdf_inv_no');
    dText(prefix + ': ' + formatId(job.id), 200, 32, 12, hv, cGray, 'right');
    dText(t('job') + ': ' + (job.job || ''), 200, 38, 12, hv, cGray, 'right');
    dText(t('date') + ': ' + (job.date || ''), 200, 44, 12, hv, cGray, 'right');

    const fromLabel = isEstimado ? t('pdf_est_from') : t('pdf_inv_from');
    dText(fromLabel, 10, 66, 13.5, hv, cGray, 'left');
    dText('Liriano & Son Shower Doors Corp', 10, 72, 14.5, hb, cDark, 'left');
    dText('24528 SW 130 CT Homestead FL 33032', 10, 78, 10.5, hv, cGray, 'left');
    dText('+1 786 222 4264', 10, 84, 10.5, hv, cGray, 'left');

    const toLabel = isEstimado ? t('pdf_est_to') : t('pdf_inv_to');
    dText(toLabel, 200, 66, 13.5, hv, cGray, 'right');
    dText(job.name || '', 200, 72, 14.5, hb, cDark, 'right');
    if (job.address) dText(job.address, 200, 78, 10.5, hv, cGray, 'right');
    if (job.phone) dText(job.phone, 200, 84, 10.5, hv, cGray, 'right');

    const cols = [10, 25, 50, 100, 122, 153, 173];
    const headers = isEstimado
      ? [t('temper'), t('item'), t('pdf_col_glass'), t('dimensions'), t('pdf_col_unit'), t('installation'), t('price')]
      : [t('temper'), t('item'), t('pdf_col_desc'), t('dimensions'), t('pdf_col_glass'), t('installation'), t('price')];
    const rowH = 12;
    const tableY = 96;
    const tLeft = 10;
    const tRight = 200;
    const tWidth2 = tRight - tLeft;

    page.drawRectangle({ x: tLeft * mm, y: jsRect(tableY, rowH), width: tWidth2 * mm, height: rowH * mm, color: cDark });

    for (let ci = 0; ci < cols.length; ci++) {
      page.drawLine({
        start: { x: cols[ci] * mm, y: jsY(tableY) },
        end: { x: cols[ci] * mm, y: jsY(tableY + rowH) },
        color: cDark, thickness: 0.5,
      });
    }
    page.drawLine({
      start: { x: tRight * mm, y: jsY(tableY) },
      end: { x: tRight * mm, y: jsY(tableY + rowH) },
      color: cDark, thickness: 0.5,
    });

    for (let ci = 0; ci < cols.length; ci++) {
      const cw = (ci < cols.length - 1 ? cols[ci + 1] - cols[ci] : tRight - cols[ci]);
      dText(headers[ci], cols[ci] + cw / 2, tableY + rowH / 2 + 1, 10, hv, cWhite, 'center');
    }

    let rowY = tableY + rowH;
    const lineH = 5.5;

    for (let ri = 0; ri < items.length; ri++) {
      const it = items[ri];
      const temper = it.temper === true || it.temper === 'Yes' ? 'x' : '';
      const dims = (it.dimensionsW || it.dimensionsH)
        ? (it.dimensionsW || '?') + ' x ' + (it.dimensionsH || '?') + ' ' + (it.dimensionsUnit || 'in')
        : '';
      const unitPriceStr = it.unitPrice != null ? '$' + String(it.unitPrice) : '';
      const installStr = it.installation != null ? String(it.installation) + (it.installationUnit ? ' ' + it.installationUnit : '') : '';
      const vals = isEstimado
        ? [temper, it.item || '', it.glassThickness || '', dims, unitPriceStr, installStr, '$' + (parseFloat(it.price) || 0).toFixed(2)]
        : [temper, it.item || '', it.description || '', dims, it.glassThickness || '', installStr, '$' + (parseFloat(it.price) || 0).toFixed(2)];

      const cellLines = [];
      let maxLines = 1;
      for (let ci = 0; ci < cols.length; ci++) {
        const cw = (ci < cols.length - 1 ? cols[ci + 1] - cols[ci] : tRight - cols[ci]);
        const lines = splitText(String(vals[ci] || ''), (cw - 2) * mm, hv, 9.5);
        cellLines.push(lines);
        if (lines.length > maxLines) maxLines = lines.length;
      }

      const rowH2 = maxLines * lineH + 2;

      for (let ci = 0; ci < cols.length; ci++) {
        const cw = (ci < cols.length - 1 ? cols[ci + 1] - cols[ci] : tRight - cols[ci]);
        const lines = cellLines[ci];
        const cellOffset = (rowH2 - lines.length * lineH) / 2;
        const xPos = ci === 6 ? cols[ci] + cw - 1 : cols[ci] + cw / 2;
        const align = ci === 6 ? 'right' : 'center';
        for (let li = 0; li < lines.length; li++) {
          const ly = rowY + cellOffset + li * lineH + lineH * 0.70;
          dText(lines[li], xPos, ly, 9.5, hv, cBody, align);
        }
      }

      page.drawLine({
        start: { x: tLeft * mm, y: jsY(rowY + rowH2) },
        end: { x: tRight * mm, y: jsY(rowY + rowH2) },
        color: cDark, thickness: 0.5,
      });
      rowY += rowH2;
    }

    const calcSubtotal = items.reduce((s, it) => s + (parseFloat(it.price) || 0), 0);
    const taxRateVal = parseFloat(job.taxRate) || 0;
    const salesTaxVal = parseFloat(job.salesTax) || 0;
    const depositVal = parseFloat(job.deposit) || 0;
    const totalCalc = calcSubtotal + taxRateVal + salesTaxVal - (isEstimado ? 0 : depositVal);

    const nums = [
      calcSubtotal.toFixed(2),
      taxRateVal.toFixed(2),
      salesTaxVal.toFixed(2),
      depositVal.toFixed(2),
      totalCalc.toFixed(2),
    ];
    const labels = [t('subtotal'), t('tax_rate'), t('sales_tax'),
      isEstimado ? t('deposit_required') : t('deposit_received'),
      t('total_summary').toUpperCase()];

    const longestNum = nums.reduce((a, b) => a.length > b.length ? a : b, '');
    const dollarX = 198 * mm - tWidth(longestNum, 9.5, hv) - tWidth(' ', 9.5, hv);

    for (let si = 0; si < labels.length; si++) {
      const isTotal = si === labels.length - 1;
      const labelLines = splitText(labels[si], 18 * mm, hv, 9.5);
      const numLines = splitText(nums[si], 25 * mm, hv, 9.5);
      const maxSl = Math.max(labelLines.length, numLines.length, 1);
      const rowH2 = maxSl * lineH + 2;

      if (isTotal) {
        page.drawRectangle({ x: 153 * mm, y: jsRect(rowY, rowH2), width: 20 * mm, height: rowH2 * mm, color: cDark });
        page.drawRectangle({ x: 173 * mm, y: jsRect(rowY, rowH2), width: 27 * mm, height: rowH2 * mm, color: cDark });
      }

      const lo = (rowH2 - labelLines.length * lineH) / 2;
      for (let li = 0; li < labelLines.length; li++) {
        const ly = rowY + lo + li * lineH + lineH * 0.70;
        dText(labelLines[li], 153 + 10, ly, 9.5, isTotal ? hb : hv, isTotal ? cWhite : cBody, 'center');
      }

      const dollarY = rowY + (rowH2 - lineH) / 2 + lineH * 0.70;
      dText('$', dollarX / mm, dollarY, 9.5, isTotal ? hb : hv, isTotal ? cWhite : cBody, 'center');

      const no = (rowH2 - numLines.length * lineH) / 2;
      for (let li = 0; li < numLines.length; li++) {
        const ly = rowY + no + li * lineH + lineH * 0.70;
        dText(numLines[li], 198, ly, 9.5, isTotal ? hb : hv, isTotal ? cWhite : cBody, 'right');
      }

      rowY += rowH2;
    }

    const fy = 235;
    const fl = 85;
    page.drawLine({
      start: { x: (108 - fl) * mm, y: jsY(fy) },
      end: { x: (108 + fl) * mm, y: jsY(fy) },
      color: cDark, thickness: 0.5,
    });

    return await pdfDoc.save();
  }
  async function showPDFPreview(job) {
    try {
      if (!job) return;
      const pdfBytes = await buildPDFDoc(job);
      if (!pdfBytes) return;

      const prefix = job.status === 'estimado' ? 'Estimate' : 'Invoice';
      const filename = `${prefix}-${formatId(job.id)} ${job.name || job.job || 'document'}.pdf`;
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const canShare = typeof navigator.share === 'function' && typeof File === 'function';

      const body = document.createElement('div');
      body.style.cssText = 'padding:24px;display:flex;flex-direction:column;gap:12px';

      const dlBtn = document.createElement('button');
      dlBtn.className = 'pdf-btn download';
      dlBtn.innerHTML = '<i class="fas fa-download"></i> ' + t('view_pdf');
      dlBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.click();
      });
      body.appendChild(dlBtn);

      if (canShare) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'pdf-btn share';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> ' + t('pdf_share');
        shareBtn.addEventListener('click', async () => {
          const file = new File([blob], filename, { type: 'application/pdf' });
          try { await navigator.share({ files: [file], title: `${job.job || job.name} - ${job.status === 'estimado' ? t('pdf_estimate') : t('pdf_invoice')}`, text: t('pdf_share_msg').replace('{job}', job.job || job.name || '').replace('{amount}', calcTotal(job).toFixed(2)) }); }
          catch (err) { if (err.name !== 'AbortError') showToast(t('error_api'), 'error'); }
        });
        body.appendChild(shareBtn);
      } else {
        if (job.phone) {
          const waBtn = document.createElement('button');
          waBtn.className = 'pdf-btn whatsapp';
          waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp';
          waBtn.addEventListener('click', () => {
            const phone = job.phone.replace(/[^0-9]/g, '');
            window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(t('pdf_share_msg').replace('{job}', job.job || job.name || '').replace('{amount}', calcTotal(job).toFixed(2))), '_blank');
          });
          body.appendChild(waBtn);
        }
        if (job.email) {
          const mailBtn = document.createElement('button');
          mailBtn.className = 'pdf-btn email';
          mailBtn.innerHTML = '<i class="fas fa-envelope"></i> Email';
          mailBtn.addEventListener('click', () => {
            window.open('mailto:' + job.email + '?subject=' + encodeURIComponent((job.status === 'estimado' ? 'Estimate' : 'Invoice') + ' - ' + (job.job || job.name)) + '&body=' + encodeURIComponent(t('pdf_email_body').replace('{name}', job.name || '').replace('{job}', job.job || '').replace('{amount}', calcTotal(job).toFixed(2))), '_blank');
          });
          body.appendChild(mailBtn);
        }
      }

      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay active';
      overlay.innerHTML = '<div class="modal-box"><h3>' + esc(filename) + '</h3></div>';
      overlay.querySelector('.modal-box').appendChild(body);
      const closeBtn = document.createElement('button');
      closeBtn.className = 'modal-btn cancel';
      closeBtn.textContent = t('confirm_cancel');
      closeBtn.style.marginTop = '8px';
      closeBtn.addEventListener('click', () => { URL.revokeObjectURL(blobUrl); overlay.remove(); });
      body.appendChild(closeBtn);
      document.body.appendChild(overlay);
    } catch (err) {
      showToast('PDF error: ' + err.message, 'error');
      console.error(err);
    }
  }

  /* ===== ID FORMAT ===== */
  function formatId(id) {
    const num = parseInt(id, 10) + 3999;
    const s = String(num).padStart(11, '0');
    return s.slice(0, 6) + '-' + s.slice(6);
  }

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
  window.getLang = getLang;
  window.formatId = formatId;
  window.buildPDFDoc = buildPDFDoc;
  window.showPDFPreview = showPDFPreview;

  /* ===== INIT ===== */
  if (isStandalone) localStorage.setItem('liriano_installed', 'true');
  applyTranslations();
  setLanguage(lang);

})();
