// Show a Bootstrap toast when status dropdown changes (complaints page)
(function(){
  const selects = document.querySelectorAll('.table-container select.form-select');
  const toastEl = document.getElementById('statusToast');
  const toastBody = document.getElementById('toastBody');
  if(!toastEl || !toastBody) return;
  const bsToast = new bootstrap.Toast(toastEl);

  function setToastVariant(status){
    toastEl.classList.remove('text-bg-light','bg-success','bg-danger','bg-info','text-white');
    if(status === 'approved'){
      toastEl.classList.add('bg-success','text-white');
    } else if(status === 'rejected'){
      toastEl.classList.add('bg-danger','text-white');
    } else if(status === 'pending'){
      toastEl.classList.add('bg-info','text-white');
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
      const resident = cells[0] || '';
      const owner = cells[1] || '';
      const context = cells[3] || cells[4] || '';
      const newStatus = sel.value || sel.options[sel.selectedIndex].text;

      toastBody.textContent = `Status changed to "${newStatus}" — Resident: ${resident} | Owner: ${owner} | Info: ${context}`;
      setToastVariant(newStatus);
      bsToast.show();
    });
  });
})();