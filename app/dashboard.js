(function () {
  'use strict';

  $('headerBrand').addEventListener('click', () => { location.href = 'index.html'; });
  $('dashHome').addEventListener('click', () => { location.href = 'index.html'; });

  (async function loadStats() {
    var jobs;
    try { jobs = await getJobs(); } catch (e) { jobs = []; }
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
  })();

})();
