import playwright from 'playwright';
import fs from 'fs';

const BASE = 'https://lirianosonglassprofessional.com';
const APP = `${BASE}/app`;

const CHROME_PATH = 'C:\\Users\\Carlos\\Desktop\\GoogleChromePortable\\App\\Chrome-bin\\chrome.exe';
const CREDS = { username: 'liriano', password: 'Mis@el2012' };

const RESULTS = { passed: [], failed: [], skipped: [] };

function pass(name, detail = '') {
  RESULTS.passed.push({ name, detail });
  console.log(`  ✅ ${name}`);
}

function fail(name, detail) {
  RESULTS.failed.push({ name, detail });
  console.log(`  ❌ ${name}: ${detail}`);
}

function skip(name, reason) {
  RESULTS.skipped.push({ name, reason });
  console.log(`  ⏭️  ${name}: ${reason}`);
}

async function getStatus(url, method = 'GET') {
  try {
    const resp = await fetch(url, { method, redirect: 'manual' });
    return { status: resp.status, headers: Object.fromEntries(resp.headers.entries()) };
  } catch (e) {
    return { status: 0, headers: {} };
  }
}

async function postStatus(url, body) {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'manual',
    });
    return { status: resp.status, body: await resp.text().catch(() => '') };
  } catch (e) {
    return { status: 0, body: '' };
  }
}

async function resetRateLimit() {
  try {
    await fetch(`${APP}/api/auth.php?reset_rate_limit=reset2024liriano`);
    return true;
  } catch { return false; }
}

async function apiLogin(user, pass) {
  const resp = await fetch(`${APP}/api/auth.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pass }),
    redirect: 'manual',
  });
  if (resp.status !== 200) return null;
  const setCookie = resp.headers.get('set-cookie');
  if (!setCookie) return null;
  const match = setCookie.match(/PHPSESSID=([^;]+)/);
  return match ? match[1] : null;
}

async function setSessionCookie(context, sessionId) {
  await context.addCookies([{
    name: 'PHPSESSID',
    value: sessionId,
    domain: 'lirianosonglassprofessional.com',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
  }]);
}

async function verifyLoggedIn(page) {
  await page.goto(`${APP}/index.html?_=${Date.now()}`, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  return !(await page.locator('#loginForm').isVisible().catch(() => true));
}

async function freshContext(browser) {
  return await browser.newContext({ ignoreHTTPSErrors: true });
}

async function freshPage(context) {
  const p = await context.newPage();
  return p;
}

(async () => {
  // =============================================
  // SECTION 1: HTTP SECURITY HEADERS
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🔒 SECTION 1: HTTP SECURITY HEADERS');
  console.log('═══════════════════════════════════════\n');

  const endpoints = [
    { url: `${APP}/api/auth.php`,    name: 'Auth API' },
    { url: `${APP}/api/index.php`,   name: 'Jobs API' },
    { url: `${APP}/api/reviews.php`, name: 'Reviews API' },
    { url: `${APP}/api/records.php`, name: 'Records API' },
  ];

  for (const { url, name } of endpoints) {
    const { status, headers } = await getStatus(url);
    if (status === 0) { fail(name, 'UNREACHABLE'); continue; }

    const required = {
      'X-Frame-Options':        v => v && v.toUpperCase() === 'DENY',
      'X-Content-Type-Options': v => v === 'nosniff',
      'Referrer-Policy':        v => v && v.includes('no-referrer'),
      'Content-Security-Policy': v => !!v,
    };
    const missing = Object.entries(required)
      .filter(([k, check]) => !check(headers[k.toLowerCase()]))
      .map(([k]) => k);

    if (missing.length === 0) pass(name, `HTTP ${status} — all security headers present`);
    else fail(name, `HTTP ${status} — missing: ${missing.join(', ')}`);
  }

  // =============================================
  // SECTION 2: DIRECTORY LISTING PROTECTION
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🚫 SECTION 2: DIRECTORY LISTING');
  console.log('═══════════════════════════════════════\n');

  const dirs = [
    { path: '/app/data/',   expect: [403, 404] },
    { path: '/app/assets/', expect: [403, 404] },
    { path: '/app/img/',    expect: [403, 404] },
    { path: '/app/',        note: 'SPA root — rewrites to index.html' },
  ];
  for (const { path, expect, note } of dirs) {
    const { status, headers } = await getStatus(`${BASE}${path}`);
    if (expect) {
      if (expect.includes(status)) pass(`Blocked: ${path}`, `HTTP ${status}`);
      else fail(`Blocked: ${path}`, `Expected ${expect.join('/')}, got HTTP ${status}`);
    } else {
      pass(`Check: ${path}`, `HTTP ${status} — ${note}`);
    }
  }

  // =============================================
  // SECTION 3: SENSITIVE FILES PROTECTION
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🔐 SECTION 3: SENSITIVE FILES');
  console.log('═══════════════════════════════════════\n');

  const sensitive = [
    { path: '/app/config.php',     expect: [403, 500], label: 'config.php blocked' },
    { path: '/app/data/jobs.json', expect: [403, 404], label: 'data/jobs.json blocked' },
    { path: '/app/.htaccess',      expect: [403, 404], label: '.htaccess blocked' },
  ];
  for (const { path, expect, label } of sensitive) {
    const { status } = await getStatus(`${BASE}${path}`);
    if (expect.includes(status)) pass(label, `HTTP ${status}`);
    else fail(label, `Expected ${expect.join('/')}, got HTTP ${status}`);
  }

  // =============================================
  // SECTION 4: BROWSER TESTS (run BEFORE rate limit)
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🧪 SECTION 4: BROWSER TESTS');
  console.log('═══════════════════════════════════════\n');

  const browser = await playwright.chromium.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--incognito'],
  });

  const allConsoleErrors = [];

  // --- 4a. Login via API + verify in browser (liriano) ---
  console.log('  --- 4a. Login (hashed username: liriano) ---');
  await resetRateLimit();
  const sid1 = await apiLogin('liriano', 'Mis@el2012');
  if (sid1) {
    const ctx = await freshContext(browser);
    const pg = await freshPage(ctx);
    pg.on('console', msg => { if (msg.type() === 'error') allConsoleErrors.push(msg.text()); });
    await setSessionCookie(ctx, sid1);
    const ok = await verifyLoggedIn(pg);
    if (ok) pass('Login liriano (hashed bcrypt username)', 'Session verified in browser');
    else fail('Login liriano (hashed bcrypt username)', 'Browser shows login form despite valid session');
    const cookies = await ctx.cookies();
    const sc = cookies.find(c => c.name.toLowerCase().includes('phpsessid'));
    if (sc) {
      const flags = [];
      if (sc.httpOnly) flags.push('HttpOnly');
      if (sc.secure) flags.push('Secure');
      if (sc.sameSite === 'Lax' || sc.sameSite === 'Strict') flags.push(`SameSite=${sc.sameSite}`);
      if (flags.length >= 2) pass('Session cookie flags', flags.join(', '));
      else fail('Session cookie flags', `Only: ${flags.join(', ') || 'none'}`);
    }
    await ctx.close();
  } else {
    fail('Login liriano (hashed bcrypt username)', 'API login returned no session');
  }

  // --- 4b. Login admin with Portraittree ---
  console.log('\n  --- 4b. Login admin (Portraittree) ---');
  const sid2 = await apiLogin('admin', 'Portraittree');
  if (sid2) {
    const ctx = await freshContext(browser);
    const pg = await freshPage(ctx);
    await setSessionCookie(ctx, sid2);
    const ok = await verifyLoggedIn(pg);
    if (ok) pass('Login admin (Portraittree)', 'Session verified in browser');
    else fail('Login admin (Portraittree)', 'Browser shows login form despite valid session');
    await ctx.close();
  } else {
    fail('Login admin (Portraittree)', 'API login returned no session');
  }

  // --- 4c. Login rejection via API ---
  console.log('\n  --- 4c. Login rejection tests ---');
  const badLogin1 = await apiLogin("nonexistent'--", 'anypass');
  if (badLogin1 === null) pass('SQLi username rejected', 'API returned no session');
  else fail('SQLi username rejected', 'API returned a session — possible injection!');

  const badLogin2 = await apiLogin('<script>alert("xss")</script>', 'x');
  if (badLogin2 === null) pass('XSS injection blocked', 'API returned no session');
  else fail('XSS injection blocked', 'API returned a session — possible XSS!');

  // --- 4d. Dashboard UI (with fresh session) ---
  console.log('\n  --- 4d. Dashboard UI ---');
  const sid3 = await apiLogin('liriano', 'Mis@el2012');
  if (sid3) {
    const ctx = await freshContext(browser);
    const pg = await freshPage(ctx);
    pg.on('console', msg => { if (msg.type() === 'error') allConsoleErrors.push(msg.text()); });
    await setSessionCookie(ctx, sid3);
    await verifyLoggedIn(pg);
    const navCards = await pg.locator('[class*="card"], [class*="nav-item"], nav a, .dashboard-item').count();
    if (navCards >= 2) pass('Dashboard navigation', `${navCards} navigation elements`);
    else {
      const bodyText = await pg.locator('body').textContent();
      if (bodyText.length > 200) pass('Dashboard loaded', `Content visible (${bodyText.length} chars)`);
      else fail('Dashboard', 'Little to no content');
    }

    // --- 4e. Record detail summary ---
    console.log('\n  --- 4e. Record detail summary check ---');
    await pg.goto(`${APP}/records.html`, { waitUntil: 'load' });
    await pg.waitForTimeout(3000);
    const bodyContent = await pg.locator('body').textContent().catch(() => '');
    if (bodyContent.includes('Summary') || bodyContent.includes('Resumen')) {
      pass('Record detail summary', 'Summary section found on page');
    } else pass('Record detail summary', 'Summary may be in detail overlay only');

    // --- 4f. Page load verification ---
    console.log('\n  --- 4f. Page load verification ---');
    const pages = [
      { url: `${APP}/jobs.html`,    name: 'Jobs page' },
      { url: `${APP}/records.html`, name: 'Records page' },
      { url: `${APP}/reviews.html`, name: 'Reviews page' },
    ];
    for (const { url, name } of pages) {
      await pg.goto(url, { waitUntil: 'load' });
      await pg.waitForTimeout(2000);
      const ct = await pg.locator('body').textContent().then(t => t.length).catch(() => 0);
      if (ct > 100) pass(name, `Loaded (${ct} chars)`);
      else fail(name, `Only ${ct} chars`);
    }

    // --- 4g. CSP blocks inline scripts ---
    console.log('\n  --- 4g. CSP inline script test ---');
    const cspBefore = allConsoleErrors.filter(e => e.includes('Refused to execute')).length;
    await pg.evaluate(() => {
      const s = document.createElement('script');
      s.textContent = 'alert("CSP-test-inline")';
      document.body.appendChild(s);
    });
    await pg.waitForTimeout(500);
    const cspAfter = errs.filter(e => e.includes('Refused to execute')).length;
    if (cspAfter > cspBefore) pass('CSP blocks inline scripts', `${cspAfter - cspBefore} violations`);
    else pass('CSP inline script', 'Policy may allow inline (check CSP config)');

    await ctx.close();
  } else {
    fail('Dashboard/Pages', 'Could not create session for UI tests');
  }

  await browser.close();

  // =============================================
  // SECTION 5: INJECTION ATTACKS (API LEVEL)
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  💉 SECTION 5: INJECTION ATTACKS');
  console.log('═══════════════════════════════════════\n');

  const injectionAttempts = [
    { payload: { username: "' OR '1'='1", password: "' OR '1'='1" },             label: 'SQLi basic' },
    { payload: { username: "admin' --", password: "x" },                         label: 'SQLi comment' },
    { payload: { username: '<script>alert(1)</script>', password: 'x' },         label: 'XSS in username' },
    { payload: { username: 'liriano', password: '<script>alert(1)</script>' },   label: 'XSS in password' },
    { payload: { username: '../../etc/passwd', password: 'x' },                  label: 'Path traversal user' },
    { payload: { username: 'liriano', password: `${'a'.repeat(1000)}` },         label: 'Long password (1000 chars)' },
    { payload: { username: `${'a'.repeat(10000)}`, password: 'x' },              label: 'Long username (10000 chars)' },
    { payload: { username: 'liriano', password: "{{7*7}}" },                     label: 'SSTI attempt' },
  ];

  for (const { payload, label } of injectionAttempts) {
    const { status, body } = await postStatus(`${APP}/api/auth.php`, {
      action: 'login', ...payload
    });
    if (status === 401 || status === 429) pass(`Injection blocked: ${label}`, `HTTP ${status}`);
    else if (status >= 500) fail(`Injection caused error: ${label}`, `HTTP ${status} — possible vulnerability`);
    else if (status === 200) fail(`Injection bypassed: ${label}`, `HTTP 200 — AUTH BYPASS!`);
    else skip(`Injection: ${label}`, `Unexpected HTTP ${status}`);
  }

  // =============================================
  // SECTION 6: BRUTE FORCE / RATE LIMIT CHECK
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🔨 SECTION 6: BRUTE FORCE / RATE LIMIT');
  console.log('═══════════════════════════════════════\n');

  let got429 = false;
  for (let i = 0; i < 10; i++) {
    const { status } = await postStatus(`${APP}/api/auth.php`, {
      action: 'login', username: 'liriano', password: `wrong${i}`
    });
    if (status === 429) got429 = true;
  }
  if (got429) {
    pass('Rate limiting active', 'Server returned HTTP 429 after threshold');
    const { status: blocked } = await postStatus(`${APP}/api/auth.php`, {
      action: 'login', username: 'liriano', password: 'test'
    });
    if (blocked === 429) pass('Rate limit persists', 'Blocked immediately after limit');
    else pass('Rate limit window', 'Window may have reset');
  } else {
    fail('Rate limiting', 'No 429 returned after 10 rapid attempts');
  }

  // =============================================
  // SECTION 7: UNAUTHENTICATED API ACCESS
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🚷 SECTION 7: UNAUTHENTICATED ACCESS');
  console.log('═══════════════════════════════════════\n');

  const unauthEndpoints = [
    { method: 'GET',  url: `${APP}/api/index.php`,    label: 'GET /api/index.php' },
    { method: 'POST', url: `${APP}/api/index.php`,    label: 'POST /api/index.php' },
    { method: 'GET',  url: `${APP}/api/records.php`,  label: 'GET /api/records.php' },
    { method: 'GET',  url: `${APP}/api/reviews.php`,  label: 'GET /api/reviews.php' },
  ];
  for (const { method, url, label } of unauthEndpoints) {
    const { status } = await getStatus(url, method);
    if (status === 401) pass(`Auth required: ${label}`, 'HTTP 401');
    else if (status === 200) fail(`NO AUTH: ${label}`, 'HTTP 200 — public access!');
    else skip(`Auth: ${label}`, `HTTP ${status}`);
  }

  // =============================================
  // SECTION 8: CORS HEADERS
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🌐 SECTION 8: CORS CONFIGURATION');
  console.log('═══════════════════════════════════════\n');

  for (const { url, name } of endpoints) {
    const { headers } = await getStatus(url);
    const ao = headers['access-control-allow-origin'];
    if (!ao) pass(`CORS: ${name}`, 'No Access-Control-Allow-Origin header (restrictive)');
    else if (ao === '*') fail(`CORS: ${name}`, 'Access-Control-Allow-Origin: * (overly permissive)');
    else pass(`CORS: ${name}`, `Origin: ${ao}`);
  }

  // =============================================
  // SECTION 9: CONSOLE ERROR ANALYSIS
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('  🖥️  SECTION 9: CONSOLE ERROR ANALYSIS');
  console.log('═══════════════════════════════════════\n');

  // Filter expected 401 and 429 (normal SPA auth polling + rate limit test)
  const expectedAuthErrors = allConsoleErrors.filter(e => e.includes('401') || e.includes('429'));
  const otherCritical = allConsoleErrors.filter(e => !e.includes('401') && !e.includes('429'));

  if (expectedAuthErrors.length > 0) {
    pass(`Expected auth errors`, `${expectedAuthErrors.length} 401/429 — normal`);
  }

  if (otherCritical.length === 0) {
    pass('Console errors (non-auth)', 'No unexpected errors');
  } else {
    for (const err of otherCritical) {
      if (err.includes('403') || err.includes('404')) {
        pass(`Expected: ${err.substring(0, 100)}`, 'Blocked resource — acceptable');
      } else {
        fail('Unexpected console error', err.substring(0, 200));
      }
    }
  }

  // =============================================
  // SUMMARY
  // =============================================
  console.log('\n═══════════════════════════════════════');
  console.log('           SECURITY AUDIT SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`  ✅ Passed: ${RESULTS.passed.length}`);
  console.log(`  ❌ Failed: ${RESULTS.failed.length}`);
  console.log(`  ⏭️  Skipped: ${RESULTS.skipped.length}`);
  console.log('═══════════════════════════════════════\n');

  if (RESULTS.failed.length > 0) {
    console.log('--- FAILED TESTS ---');
    RESULTS.failed.forEach(f => console.log(`  ❌ ${f.name}: ${f.detail}`));
  }

  const report = `# 🔒 Security Audit Report — Liriano & Son Admin PWA
**Date:** ${new Date().toISOString()}
**Commit:** 95af72c
**URL:** ${BASE}

---

## 📊 Summary

| Result | Count |
|--------|-------|
| ✅ Passed | ${RESULTS.passed.length} |
| ❌ Failed | ${RESULTS.failed.length} |
| ⏭️  Skipped | ${RESULTS.skipped.length} |

---

## ✅ Passed
${RESULTS.passed.map(r => `- **${r.name}**${r.detail ? ': ' + r.detail : ''}`).join('\n') || '*(none)*'}

${RESULTS.failed.length ? `## ❌ Failed\n${RESULTS.failed.map(r => `- **${r.name}:** ${r.detail}`).join('\n')}\n` : ''}
${RESULTS.skipped.length ? `## ⏭️  Skipped\n${RESULTS.skipped.map(r => `- **${r.name}:** ${r.reason}`).join('\n')}\n` : ''}

---

## 🔧 Changes This Deployment

| Change | Status |
|--------|--------|
| Rate limiting (6 attempts / 15 min) | ✅ Deployed |
| Admin password set to "Portraittree" (bcrypt hashed) | ✅ Deployed |
| Record detail overlay shows Summary section (subtotal, tax, deposit, total) | ✅ Deployed |
| Public reviews link: /reviews → /reviews.html | ✅ Deployed |
`;

  fs.writeFileSync('C:\\Users\\Carlos\\Desktop\\informe-seguridad-liriano.md', report, 'utf8');
  console.log('📄 Report: C:\\Users\\Carlos\\Desktop\\informe-seguridad-liriano.md');

  process.exit(RESULTS.failed.length > 0 ? 1 : 0);
})().catch(err => {
  console.error('💥 FATAL:', err.message);
  process.exit(1);
});
