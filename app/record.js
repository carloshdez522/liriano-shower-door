(function () {
  'use strict';

  const recordList = $('recordList');
  const searchInput = $('searchInput');
  const exportCsvBtn = $('exportCsvBtn');
  const statAllCount = $('statAllCount');
  const statCount = $('statCount');
  const statTotal = $('statTotal');
  const filterFrom = $('filterFrom');
  const filterTo = $('filterTo');
  let activeFilter = 'all';

  $('headerBrand').addEventListener('click', () => { location.href = 'index.html'; });
  const dh = $('dashHome'); if (dh) dh.addEventListener('click', () => { location.href = 'index.html'; });

  function badgeClass(status) {
    if (status === 'estimado') return 'estimado';
    if (status === 'invoice') return 'invoice';
    if (status === 'done') return 'done';
    if (status === 'deleted') return 'deleted';
    return 'edited';
  }

  function badgeLabel(status) {
    if (status === 'estimado') return t('pdf_estimate');
    if (status === 'invoice') return t('pdf_invoice');
    if (status === 'done') return t('completed');
    if (status === 'deleted') return t('deleted');
    return t('edited');
  }

  function cardStatus(g) {
    const e = g.entries.find(e => e.status !== 'edited') || g.latest;
    return e.status;
  }

  function updateStats(groups) {
    const done = groups.filter(g => cardStatus(g) === 'done');
    const total = done.reduce((s, g) => s + calcTotal(g.latest.snapshot || g.latest), 0);
    statAllCount.textContent = groups.length;
    statCount.textContent = done.length;
    statTotal.textContent = '$' + total.toFixed(2);
  }

  function seedYMD(y,m,d) { return new Date(y,m-1,d,12,0,0).getTime(); }

  async function seedRealisticRecords() {
    const jobs = await getJobs();
    if (!jobs || jobs.length === 0) return;
    const idMap = {};
    for (const j of jobs) idMap[String(j.id)] = j;

    function snap(job) { return JSON.parse(JSON.stringify(job)); }

    function rec(jobId, status, daysOffset) {
      const job = idMap[String(jobId)];
      if (!job) return null;
      const createdAt = seedYMD(2026, 3, daysOffset);
      return {
        jobId: job.id, status: status,
        jobName: job.job || '', clientName: job.name || '',
        snapshot: snap(job), createdAt: createdAt,
      };
    }

    var records = [
      rec(1001, 'estimado', 1), rec(1001, 'edited', 5),
      rec(1002, 'estimado', 1), rec(1002, 'edited', 4), rec(1002, 'invoice', 8),
      rec(1004, 'estimado', 1), rec(1004, 'edited', 3), rec(1004, 'invoice', 8), rec(1004, 'edited', 11),
      rec(1006, 'estimado', 1), rec(1006, 'edited', 6), rec(1006, 'invoice', 13),
      rec(1008, 'estimado', 1), rec(1008, 'invoice', 9), rec(1008, 'done', 17),
      rec(1010, 'estimado', 1), rec(1010, 'invoice', 8), rec(1010, 'edited', 12), rec(1010, 'deleted', 17),
    ].filter(Boolean);

    for (const r of records) {
      await apiFetch('POST', null, r, RECORDS_API);
    }
  }

  window.resetRecords = async function () {
    var all = await getRecords();
    for (const r of all) {
      await deleteRecord(r.id);
    }
    await seedRealisticRecords();
    location.reload();
  };

  function formatTime(ts) {
    const d = new Date(ts);
    const dateStr = d.toLocaleDateString(getLang() === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const timeStr = d.toLocaleTimeString(getLang() === 'es' ? 'es-US' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    return dateStr + ' ' + timeStr;
  }

  async function restoreFromRecord(rec) {
    const snap = rec.snapshot;
    if (!snap) { showToast('No data to restore', 'error'); return; }
    try {
      const prevStatus = (snap.status === 'estimado' || snap.status === 'invoice' || snap.status === 'done') ? snap.status : 'estimado';
      await window.restoreJob(snap, rec.jobId);
      showToast(t('records_recovered'));
      loadRecords();
    } catch (e) {
      showToast('Error restoring: ' + e.message, 'error');
    }
  }

  function timelineEntryHtml(r) {
    const snap = r.snapshot || r;
    const isDeleted = r.status === 'deleted';
    return `
      <div class="timeline-entry">
        <div class="timeline-dot ${badgeClass(r.status)}"></div>
        <div class="timeline-content">
          <span class="timeline-badge ${badgeClass(r.status)}">${badgeLabel(r.status)}</span>
          <span class="timeline-time">${formatTime(r.createdAt)}</span>
          <div class="timeline-actions">
            <button class="timeline-action view" data-record-id="${r.id}" title="View details"><i class="fas fa-eye"></i></button>
            ${isDeleted
              ? `<button class="timeline-action recover" data-record-id="${r.id}" title="${t('records_recover')}"><i class="fas fa-undo-alt"></i></button>`
              : `<button class="timeline-action pdf" data-record-id="${r.id}" title="Download PDF"><i class="fas fa-download"></i></button>`}
          </div>
        </div>
      </div>`;
  }

  function renderList(groups) {
    if (groups.length === 0) {
      recordList.innerHTML = `<div class="empty-state"><i class="fas fa-folder-open"></i><p>${t('records_no_results')}</p></div>`;
      return;
    }

    recordList.innerHTML = groups.map(g => {
      const snap = g.latest.snapshot || g.latest;
      const total = calcTotal(snap);
      const status = cardStatus(g);
      const entriesHtml = g.entries.map(timelineEntryHtml).join('');
      return `
        <div class="job-card" data-jobid="${g.jobId}">
          <div class="job-card-top">
            <div class="job-card-title"><span class="job-card-id-main">#${formatId(g.jobId)}</span></div>
            <span class="job-card-badge ${badgeClass(status)}">${badgeLabel(status)}</span>
          </div>
          <div class="job-card-info">
            <span class="job-card-jobname">${esc(g.jobName)}</span>
            <span><i class="fas fa-user"></i>${esc(g.clientName)}</span>
            <span><i class="fas fa-clock"></i>${g.latest.status === 'edited' ? t('edited') + ':' : ''} ${formatTime(g.latest.createdAt)}</span>
            ${g.entries.length === 1 ? `
            <span class="record-info-actions">
              <button class="timeline-action view" data-record-id="${g.latest.id}" title="View details"><i class="fas fa-eye"></i></button>
              ${g.latest.status === 'deleted'
                ? `<button class="timeline-action recover" data-record-id="${g.latest.id}" title="${t('records_recover')}"><i class="fas fa-undo-alt"></i></button>`
                : `<button class="timeline-action pdf" data-record-id="${g.latest.id}" title="Download PDF"><i class="fas fa-download"></i></button>`}
            </span>` : ''}
          </div>
          <div class="record-expand-wrap">
            <button class="record-expand-btn">
              <span class="record-expand-label">${g.entries.length > 1 ? g.entries.length + ' ' + t('records_changes') : '0 ' + t('records_changes')}</span>
              <i class="fas fa-chevron-down record-expand-icon"></i>
            </button>
          </div>
          <div class="record-timeline">
            ${g.entries.length > 1 ? entriesHtml : `<div class="timeline-empty">${t('records_no_changes')}</div>`}
          </div>
        </div>`;
    }).join('');

    recordList.querySelectorAll('.job-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.record-expand-btn, .timeline-action')) return;
        const btn = card.querySelector('.record-expand-btn');
        if (btn) btn.click();
      });
    });

    recordList.querySelectorAll('.record-expand-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const card = btn.closest('.job-card');
        const timeline = card.querySelector('.record-timeline');
        const isOpen = timeline.classList.toggle('open');
        btn.querySelector('.record-expand-icon').className = 'fas fa-chevron-' + (isOpen ? 'up' : 'down') + ' record-expand-icon';
      });
    });

    recordList.querySelectorAll('.timeline-action.view').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const rec = await getRecordById(btn.dataset.recordId);
        if (rec) showDetailOverlay(rec);
      });
    });

    recordList.querySelectorAll('.timeline-action.pdf').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const rec = await getRecordById(btn.dataset.recordId);
        if (rec && rec.snapshot) {
          const pdfBytes = await buildPDFDoc(rec.snapshot);
          if (pdfBytes) downloadPDF(pdfBytes, rec);
        }
      });
    });

    recordList.querySelectorAll('.timeline-action.recover').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const rec = await getRecordById(btn.dataset.recordId);
        if (rec) await restoreFromRecord(rec);
      });
    });
  }

  function downloadPDF(pdfBytes, rec) {
    const snap = rec.snapshot || rec;
    const prefix = rec.status === 'estimado' ? 'Estimate' : rec.status === 'invoice' ? 'Invoice' : rec.status === 'done' ? 'Completed' : 'Record';
    const ts = new Date(rec.createdAt);
    const dateStr = ts.toISOString().split('T')[0];
    const filename = `${prefix}-${formatId(rec.jobId)}-${dateStr}.pdf`;
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function showDetailOverlay(rec) {
    const snap = rec.snapshot || rec;
    const total = calcTotal(snap);
    const dateStr = snap.date ? new Date(snap.date + 'T12:00:00').toLocaleDateString(getLang() === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

    const itemsHtml = (snap.items || []).map(it => `
      <div class="detail-item-row">
        <div class="detail-item-info">
          <strong>${esc(it.item || '—')}</strong>
          ${(it.dimensionsW || it.dimensionsH) ? `<span class="detail-item-desc">${esc(it.dimensionsW || '?')} x ${esc(it.dimensionsH || '?')} ${esc(it.dimensionsUnit || 'in')}</span>` : ''}
          ${it.description ? `<span class="detail-item-desc">${esc(it.description)}</span>` : ''}
        </div>
        <div class="detail-item-price">$${(parseFloat(it.price) || 0).toFixed(2)}</div>
      </div>
    `).join('');

    const html = `
      <div class="detail-overlay" id="detailOverlay">
        <div class="detail-card">
          <div class="form-top" style="margin-bottom:12px">
            <button class="form-back" id="detailClose"><i class="fas fa-arrow-left"></i></button>
            <h2 class="form-view-title">${t('detail_title')}</h2>
          </div>
          <div class="detail-header">
            <div>
              <h3>${esc(rec.jobName || snap.job || '')}</h3>
              <div class="detail-id">#${formatId(rec.jobId)}</div>
            </div>
            <span class="detail-badge ${badgeClass(rec.status)}">${badgeLabel(rec.status)}</span>
          </div>
          <div class="detail-amount">$${total.toFixed(2)}</div>
          <div class="detail-field"><span class="detail-field-label">${t('date')}</span><span class="detail-field-value">${esc(dateStr)}</span></div>
          <div class="detail-field"><span class="detail-field-label">${t('name')}</span><span class="detail-field-value">${esc(rec.clientName || snap.name || '—')}</span></div>
          <div class="detail-field"><span class="detail-field-label">${t('address')}</span><span class="detail-field-value">${esc(snap.address || '—')}</span></div>
          ${snap.phone ? `<div class="detail-field"><span class="detail-field-label">${t('phone')}</span><span class="detail-field-value">${esc(snap.phone)}</span></div>` : ''}
          <div class="detail-field"><span class="detail-field-label">${t('email')}</span><span class="detail-field-value">${esc(snap.email || '—')}</span></div>
          ${(snap.items || []).length > 0 ? `<div class="detail-section-title" style="margin-top:16px">${t('items')}</div><div class="detail-items-list">${itemsHtml}</div>` : ''}
          <div class="detail-actions" style="margin-top:20px">
            <button class="detail-btn pdf" id="dtlPdf"><i class="fas fa-download"></i> ${t('view_pdf')}</button>
          </div>
        </div>
      </div>`;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);

    $('detailClose').addEventListener('click', () => { $('detailOverlay').remove(); });
    $('detailOverlay').addEventListener('click', e => { if (e.target === $('detailOverlay')) $('detailOverlay').remove(); });
    if ($('dtlPdf')) {
      $('dtlPdf').addEventListener('click', async () => {
        const pdfBytes = await buildPDFDoc(snap);
        if (pdfBytes) downloadPDF(pdfBytes, rec);
      });
    }
  }

  function getLang() {
    return localStorage.getItem('liriano_lang') || 'en';
  }

  function exportCSV() {
    getRecords().then(allRecords => {
      const BOM = '\uFEFF';
      let csv = BOM + 'Job,Client,ID,Status,Date,Time,Items,Total\n';
      for (const r of allRecords) {
        const snap = r.snapshot || r;
        const total = calcTotal(snap);
        const items = (snap.items || []).map(it => (it.item || '') + ' $' + (parseFloat(it.price) || 0).toFixed(2)).join('; ');
        const ts = new Date(r.createdAt);
        const dateStr = ts.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const timeStr = ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const row = [
          r.jobName || snap.job || '',
          r.clientName || snap.name || '',
          formatId(r.jobId),
          badgeLabel(r.status),
          dateStr,
          timeStr,
          items,
          total.toFixed(2),
        ].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',');
        csv += row + '\n';
      }
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'liriano-history.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  async function loadRecords() {
    try {
      let allRecords = await getRecords();

      if (allRecords.length === 0) {
        await seedRealisticRecords();
        allRecords = await getRecords();
      }

      allRecords.sort((a, b) => b.createdAt - a.createdAt);

      const map = {};
      for (const r of allRecords) {
        if (!map[r.jobId]) {
          map[r.jobId] = { jobId: r.jobId, jobName: r.jobName || '', clientName: r.clientName || '', entries: [], latest: null };
        }
        map[r.jobId].entries.push(r);
      }
      let groups = Object.values(map);
      for (const g of groups) {
        g.entries.sort((a, b) => b.createdAt - a.createdAt);
        g.latest = g.entries[0];
      }
      groups.sort((a, b) => b.latest.createdAt - a.latest.createdAt);

      const query = (searchInput.value || '').toLowerCase().trim();
      if (query) {
        groups = groups.filter(g => {
          const haystack = (g.jobName + ' ' + g.clientName + ' ' + formatId(g.jobId) + ' ' + g.jobId).toLowerCase();
          return haystack.includes(query);
        });
      }

      if (activeFilter !== 'all') {
        groups = groups.filter(g => cardStatus(g) === activeFilter);
      }

      const fromVal = filterFrom.value;
      const toVal = filterTo.value;
      if (fromVal || toVal) {
        groups = groups.filter(g => {
          const snap = g.latest.snapshot || g.latest;
          const jobDate = snap.date;
          if (!jobDate) return true;
          if (fromVal && jobDate < fromVal) return false;
          if (toVal && jobDate > toVal) return false;
          return true;
        });
      }

      updateStats(groups);
      renderList(groups);
    } catch {
      recordList.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>${t('error_api')}</p></div>`;
    }
  }

  searchInput.addEventListener('input', loadRecords);
  if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportCSV);
  if (filterFrom) filterFrom.addEventListener('change', loadRecords);
  if (filterTo) filterTo.addEventListener('change', loadRecords);

  document.querySelectorAll('#filterBar .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#filterBar .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      loadRecords();
    });
  });

  const filterClear = $('filterClear');
  if (filterClear) {
    filterClear.addEventListener('click', () => {
      if (filterFrom) filterFrom.value = '';
      if (filterTo) filterTo.value = '';
      if (searchInput) searchInput.value = '';
      activeFilter = 'all';
      document.querySelectorAll('#filterBar .filter-btn').forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('#filterBar .filter-btn[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
      loadRecords();
    });
  }

  [filterFrom, filterTo].forEach(inp => {
    if (!inp) return;
    const wrapper = document.createElement('span');
    wrapper.className = 'date-filter-wrapper';
    inp.parentElement.insertBefore(wrapper, inp);
    wrapper.appendChild(inp);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;cursor:pointer;z-index:1';
    wrap.addEventListener('click', () => { try { inp.showPicker(); } catch(_) {} });
    wrapper.appendChild(wrap);
  });

  loadRecords();

})();
