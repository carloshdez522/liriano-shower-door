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

  /* ===== DASHBOARD CARDS ===== */
  $('dashboardJobs').addEventListener('click', () => { location.href = 'jobs.html'; });
  $('dashboardRecords').addEventListener('click', () => { location.href = 'record.html'; });
  $('headerBrand').addEventListener('click', () => { location.href = 'index.html'; });

  /* ===== AUTO-LOGIN (testing) ===== */
  loginCard.style.display = 'none';
  document.querySelector('.login-bg').style.display = 'none';
  document.body.classList.remove('login-page');
  appContainer.style.display = 'flex';

})();
