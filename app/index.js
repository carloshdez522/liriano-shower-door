(function () {
  'use strict';

  const loginCard = $('loginCard');
  const loginForm = $('loginForm');
  const username = $('username');
  const password = $('password');
  const loginError = $('loginError');
  const togglePass = $('togglePass');
  const appContainer = $('appContainer');
  const logoutBtn = $('logoutBtn');

  togglePass.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      togglePass.querySelector('i').className = 'fas fa-eye-slash';
    } else {
      password.type = 'password';
      togglePass.querySelector('i').className = 'fas fa-eye';
    }
  });

  async function showApp() {
    loginCard.style.display = 'none';
    const bg = document.querySelector('.login-bg');
    if (bg) bg.style.display = 'none';
    document.body.classList.remove('login-page');
    appContainer.style.display = 'flex';
    startHeartbeat();
    loadStats();
    updateReviewsBadge();
  }

  function hideApp() {
    loginCard.style.display = '';
    const bg = document.querySelector('.login-bg');
    if (bg) bg.style.display = '';
    document.body.classList.add('login-page');
    appContainer.style.display = 'none';
    stopHeartbeat();
  }

  async function checkSession() {
    try {
      const res = await fetch('/app/api/auth.php', { credentials: 'same-origin' });
      if (res.ok) {
        await showApp();
        return;
      }
    } catch (_) {}
    hideApp();
  }

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    loginError.textContent = '';
    try {
      const res = await fetch('/app/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        credentials: 'same-origin',
      });
      if (res.ok) {
        await showApp();
      } else {
        loginError.textContent = t('login_error');
      }
    } catch (_) {
      loginError.textContent = t('login_error');
    }
  });

  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('/app/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
        credentials: 'same-origin',
      });
    } catch (_) {}
    hideApp();
  });

  /* ===== NAV CARDS ===== */
  $('dashboardJobs').addEventListener('click', () => { location.href = 'jobs.html'; });
  $('dashboardRecords').addEventListener('click', () => { location.href = 'record.html'; });
  $('dashboardStatsCard').addEventListener('click', () => { location.href = 'dashboard.html'; });
  $('pendingReviews').addEventListener('click', () => { location.href = 'reviews.html'; });
  $('headerBrand').addEventListener('click', () => { location.href = 'index.html'; });

  const pendingCard = $('pendingReviews');

  async function updateReviewsBadge() {
    try {
      const reviews = await getReviews();
      const pending = (reviews || []).filter(r => r.status === 'pending').length;
      let badge = pendingCard.querySelector('.home-card-notif');
      if (pending > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'home-card-notif';
          badge.textContent = '!';
          pendingCard.appendChild(badge);
        }
      } else {
        if (badge) badge.remove();
      }
    } catch (_) {}
  }

  /* ===== STATS ===== */
  async function loadStats() {
    var jobs;
    try {
      jobs = await getJobs();
    } catch (e) {
      jobs = [];
    }
    if (!jobs || jobs.length === 0) {
      var el = document.getElementById('dashboardStats');
      if (el) el.style.display = 'none';
      return;
    }

    var estimados = 0, facturas = 0, completados = 0, totalValue = 0, deposits = 0;
    for (var i = 0; i < jobs.length; i++) {
      var j = jobs[i];
      if (j.status === 'estimado') estimados++;
      else if (j.status === 'invoice') facturas++;
      if (j.status === 'done') completados++;
      if (j.status !== 'deleted') {
        var items = j.items || [];
        for (var k = 0; k < items.length; k++) {
          totalValue += parseFloat(items[k].price) || 0;
        }
        if (j.salesTax) totalValue += parseFloat(j.salesTax) || 0;
        deposits += parseFloat(j.deposit) || 0;
      }
    }

    if (document.getElementById('statEstimados')) document.getElementById('statEstimados').textContent = estimados;
    if (document.getElementById('statFacturas')) document.getElementById('statFacturas').textContent = facturas;
    if (document.getElementById('statCompletados')) document.getElementById('statCompletados').textContent = completados;
    if (document.getElementById('statTotalValue')) document.getElementById('statTotalValue').textContent = '$' + totalValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (document.getElementById('statDeposits')) document.getElementById('statDeposits').textContent = '$' + deposits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var totalActive = estimados + facturas;
    var convRate = totalActive > 0 ? Math.round((facturas / totalActive) * 100) : 0;
    if (document.getElementById('statConversion')) document.getElementById('statConversion').textContent = convRate + '%';
  }

  checkSession();

})();
