// Show Bootstrap toast when access dropdown changes (residents page)
(function(){
  const selects = document.querySelectorAll('.table-container select.form-select, .table-container select.form-select-sm');
  const toastEl = document.getElementById('statusToast');
  const toastBody = document.getElementById('toastBody');
  if(!toastEl || !toastBody) return;
  const bsToast = new bootstrap.Toast(toastEl);

  function setToastVariant(status){
    toastEl.classList.remove('text-bg-light','bg-success','bg-danger','bg-info','text-white');
    if((status||'').toLowerCase() === 'granted'){
      toastEl.classList.add('bg-success','text-white');
    } else if((status||'').toLowerCase() === 'revoked'){
      toastEl.classList.add('bg-danger','text-white');
    } else {
      toastEl.classList.add('text-bg-light');
    }
  }

  selects.forEach(s => {
    s.addEventListener('change', function(e){
      const sel = e.target;
      const tr = sel.closest('tr');
      if(!tr) return;
      const cells = Array.from(tr.querySelectorAll('td')).map(td=>td.textContent.trim());
      const owner = cells[0] || '';
      const email = cells[1] || '';
      const phone = cells[2] || '';
      const newStatus = sel.value || sel.options[sel.selectedIndex].text;

      toastBody.textContent = `Access ${newStatus} — Owner: ${owner} | Email: ${email} | Phone: ${phone}`;
      setToastVariant(newStatus);
      bsToast.show();
    });
  });
})();