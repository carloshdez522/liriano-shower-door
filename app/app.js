(function () {
  'use strict';

  const STORAGE_KEY = 'liriano_jobs';

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
  const jobList = $('jobList');
  const emptyState = $('emptyState');
  const searchInput = $('searchInput');
  const filterBar = $('filterBar');
  const fabBtn = $('fabBtn');
  const formBack = $('formBack');
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

  /* ===== LOCAL STORAGE CRUD ===== */
  function getJobs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveJobs(jobs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }

  function createJob(data) {
    const jobs = getJobs();
    const job = {
      id: Date.now(),
      ...data,
      status: 'estimado',
      createdAt: Date.now(),
    };
    jobs.unshift(job);
    saveJobs(jobs);
    return job;
  }

  function updateJob(id, data) {
    const jobs = getJobs();
    const idx = jobs.findIndex(j => j.id === id);
    if (idx === -1) return null;
    jobs[idx] = { ...jobs[idx], ...data };
    saveJobs(jobs);
    return jobs[idx];
  }

  function deleteJob(id) {
    let jobs = getJobs();
    jobs = jobs.filter(j => j.id !== id);
    saveJobs(jobs);
  }

  function toggleJobStatus(id) {
    const jobs = getJobs();
    const j = jobs.find(j => j.id === id);
    if (!j) return null;
    j.status = j.status === 'estimado' ? 'invoice' : 'estimado';
    saveJobs(jobs);
    return j;
  }

  function getJobById(id) {
    return getJobs().find(j => j.id === id) || null;
  }

  /* ===== SEED TEST DATA ===== */
  function seedTestData() {
    if (getJobs().length > 0) return;
    const samples = [
      { job: 'Shower Door Install', date: '2026-06-05', name: 'Maria Rodriguez', address: '1234 SW 8th St, Miami', phone: '+1 (305) 555-0101', temper: true, item: 'Frameless sliding door 60"x72"', description: 'Clear tempered glass, brushed nickel handle', amount: 1850 },
      { job: 'Window Replacement', date: '2026-06-03', name: 'Carlos Mendez', address: '5678 Coral Way, Coral Gables', phone: '+1 (305) 555-0102', temper: false, item: 'Double hung window 36"x48"', description: 'White frame, low-E glass, screens included', amount: 1200 },
      { job: 'Storefront Glass', date: '2026-05-28', name: 'La Tienda Bakery', address: '8901 W Flagler St, Miami', phone: '+1 (786) 555-0103', temper: true, item: 'Commercial storefront 96"x84"', description: 'Tempered laminated glass, aluminum frame, with logo etching', amount: 4200 },
      { job: 'Shower Enclosure', date: '2026-05-20', name: 'Ana Perez', address: '4321 Collins Ave, Miami Beach', phone: '+1 (305) 555-0104', temper: true, item: 'Offset shower door 48"x76"', description: 'Clear glass, chrome hinges and handle, rain guard', amount: 2100 },
      { job: 'Mirror Installation', date: '2026-05-15', name: 'Jose Garcia', address: '7777 Bird Rd, Miami', phone: '+1 (305) 555-0105', temper: false, item: 'Bathroom mirror 36"x48"', description: 'Beveled edges, silver frame, mounting hardware included', amount: 450 },
      { job: 'Glass Railing', date: '2026-05-10', name: 'Ocean View Condo', address: '1500 Ocean Dr, Miami Beach', phone: '+1 (305) 555-0106', temper: true, item: 'Staircase railing 12 linear ft', description: '3/8" tempered glass, stainless steel posts and handrail', amount: 3800 },
      { job: 'Shower Door Repair', date: '2026-05-05', name: 'Luis Fernandez', address: '2500 SW 27th Ave, Miami', phone: '+1 (305) 555-0107', temper: true, item: 'Replacement roller set', description: 'Replaced bottom rollers on sliding door, adjusted track', amount: 250 },
      { job: 'Custom Glass Shelf', date: '2026-04-28', name: 'Patricia Lopez', address: '8900 Kendall Dr, Kendall', phone: '+1 (305) 555-0108', temper: true, item: 'Tempered shelf 12"x48"', description: 'Polished edges, clear glass, with floating shelf brackets', amount: 320 },
      { job: 'Commercial Window', date: '2026-04-20', name: 'Miami Dental Clinic', address: '5500 Biscayne Blvd, Miami', phone: '+1 (305) 555-0109', temper: true, item: 'Fixed window 72"x60"', description: 'Tempered insulated glass unit, aluminum frame, frosted film', amount: 2800 },
      { job: 'Shower Door & Screen', date: '2026-04-15', name: 'Roberto & Sonia Diaz', address: '1200 SW 40th St, Miami', phone: '+1 (305) 555-0110', temper: true, item: 'Pivot shower door 36"x72" + side panel', description: '3/8" tempered glass, oil-rubbed bronze finish, towel bar', amount: 3200 },
    ];
    const now = Date.now();
    samples.forEach((s, i) => {
      const job = { ...s, id: now - i * 100000, status: i < 5 ? 'estimado' : 'invoice', createdAt: now - i * 86400000 };
      const jobs = getJobs();
      jobs.push(job);
      saveJobs(jobs);
    });
  }

  /* ===== DASHBOARD ===== */
  function getCurrentFilter() {
    const active = filterBar.querySelector('.filter-btn.active');
    return active ? active.dataset.filter : 'all';
  }

  function updateCounts() {
    const jobs = getJobs();
    const total = jobs.length;
    const estimados = jobs.filter(j => j.status === 'estimado').length;
    const invoices = jobs.filter(j => j.status === 'invoice').length;
    $('countAll').textContent = total;
    $('countEstimado').textContent = estimados;
    $('countInvoice').textContent = invoices;
  }

  function renderDashboard(filter) {
    filter = filter || 'all';
    const query = (searchInput.value || '').toLowerCase().trim();
    let jobs = getJobs();
    jobs.sort((a, b) => b.createdAt - a.createdAt);
    if (filter === 'estimado') jobs = jobs.filter(j => j.status === 'estimado');
    else if (filter === 'invoice') jobs = jobs.filter(j => j.status === 'invoice');
    if (query) {
      const words = query.split(/\s+/).filter(Boolean);
      jobs = jobs.filter(j => {
        const haystack = (
          (j.name || '') + ' ' +
          (j.job || '') + ' ' +
          (j.phone || '') + ' ' +
          (j.address || '') + ' ' +
          (j.item || '') + ' ' +
          (j.description || '') + ' ' +
          (j.amount || '') + ' ' +
          (j.date || '')
        ).toLowerCase();
        return words.every(w => haystack.includes(w));
      });
    }

    updateCounts();

    if (jobs.length === 0) {
      jobList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-clipboard-list"></i>
          <p>${t('empty')}</p>
        </div>`;
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

    jobList.querySelectorAll('.view-pdf').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); generatePDF(getJobById(+btn.dataset.id)); });
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
  function showDashboard() {
    dashboardView.style.display = 'block';
    formView.style.display = 'none';
    fabBtn.classList.remove('hidden');
    renderDashboard(getCurrentFilter());
  }

  function openForm(jobId) {
    editingJobId = jobId || null;
    dashboardView.style.display = 'none';
    formView.style.display = 'block';
    fabBtn.classList.add('hidden');
    valeForm.reset();

    if (editingJobId) {
      formViewTitle.textContent = t('edit_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      const j = getJobById(editingJobId);
      if (j) {
        f.job.value = j.job || '';
        f.date.value = j.date || '';
        f.name.value = j.name || '';
        f.address.value = j.address || '';
        f.phone.value = j.phone || '';
        f.temper.checked = j.temper || false;
        f.item.value = j.item || '';
        f.description.value = j.description || '';
        f.amount.value = j.amount || '';
      }
    } else {
      formViewTitle.textContent = t('new_job');
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${t('save')}`;
      f.date.value = new Date().toISOString().split('T')[0];
    }
    document.getElementById('temperText').textContent = f.temper.checked ? t('yes') : t('no');
    applyTranslations(formView);
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
      if (e.target === overlay) {
        overlay.remove();
        modalCallback = null;
      }
    });
  }

  function showDeleteModal(id) {
    showModal(t('confirm_delete_title'), t('confirm_delete_msg'), t('confirm_yes'), true, () => {
      deleteJob(id);
      renderDashboard(getCurrentFilter());
      updateCounts();
    });
  }

  function showApproveModal(id) {
    showModal(t('confirm_approve_title'), t('confirm_approve_msg'), t('confirm_yes'), false, () => {
      toggleJobStatus(id);
      renderDashboard(getCurrentFilter());
      updateCounts();
    });
  }

  /* ===== FORM SUBMIT ===== */
  valeForm.addEventListener('submit', e => {
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

    if (editingJobId) {
      updateJob(editingJobId, data);
    } else {
      const job = createJob(data);
      generatePDF(job);
    }

    editingJobId = null;
    showDashboard();
  });

  formBack.addEventListener('click', () => {
    editingJobId = null;
    showDashboard();
  });

  /* ===== PDF GENERATION ===== */
  function generatePDF(job) {
    if (!job) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = 210;
    const pageH = 297;
    const margin = 18;
    const topBarH = 46;
    const aqua = [102, 224, 192];
    const teal = [11, 43, 59];

    // top bar
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

    // status badge
    const isEstimado = job.status === 'estimado';
    const badgeY = topBarH + 10;
    doc.setFillColor(...(isEstimado ? [224, 160, 48] : [64, 192, 128]));
    doc.roundedRect(margin, badgeY, 40, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(isEstimado ? t('pdf_estimate') : t('pdf_invoice'), margin + 20, badgeY + 5, { align: 'center' });

    // separator
    const sepY = badgeY + 16;
    doc.setDrawColor(...aqua);
    doc.setLineWidth(0.3);
    doc.line(margin, sepY, pageW - margin, sepY);

    // client info
    let y = sepY + 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(102, 224, 192);
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

    // items heading
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

    // item row
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
    descLines.forEach((line, i) => {
      doc.text(line, margin + 60, descStartY + i * 4);
    });
    const descEndY = descStartY + descLines.length * 4;
    y = Math.max(y, descEndY);
    const amountVal = parseFloat(job.amount) || 0;
    doc.setFont('helvetica', 'bold');
    doc.text('$' + amountVal.toFixed(2), pageW - margin - 3, y - descLines.length * 4 + 3, { align: 'right' });

    // total line
    y += 6;
    doc.setDrawColor(...aqua);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(11, 43, 59);
    doc.text(t('pdf_total') + ':', pageW - margin - 45, y);
    doc.text('$' + amountVal.toFixed(2), pageW - margin, y, { align: 'right' });

    // signature
    const sigY = pageH - 50;
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.line(margin, sigY, margin + 60, sigY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(t('pdf_sig'), margin, sigY + 4);

    // footer
    doc.setFillColor(...teal);
    doc.rect(0, pageH - 14, pageW, 14, 'F');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(102, 224, 192);
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

  /* ===== LOGIN ===== */
  togglePass.addEventListener('click', () => {
    const input = password;
    const icon = togglePass.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fas fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fas fa-eye';
    }
  });

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginError.textContent = '';
    if (username.value === 'admin' && password.value === 'liriano2024') {
      loginCard.style.display = 'none';
      document.querySelector('.login-bg').style.display = 'none';
      document.body.classList.remove('login-page');
      appContainer.style.display = 'flex';
      showDashboard();
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
  seedTestData();
  loginCard.style.display = 'none';
  document.querySelector('.login-bg').style.display = 'none';
  document.body.classList.remove('login-page');
  appContainer.style.display = 'flex';
  showDashboard();

  /* ===== INIT ===== */
  applyTranslations();
  setLanguage(lang);
  f.date.value = new Date().toISOString().split('T')[0];
  document.getElementById('temperText').textContent = t('no');

})();
