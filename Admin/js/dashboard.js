// Show toast if redirected with ?toast=1&msg=...
(function(){
  try {
    var params = new URLSearchParams(window.location.search);
    if(params.get('toast')){
      var raw = params.get('msg') || '';
      var text = decodeURIComponent(raw);
      var toastEl = document.getElementById('redirectToast');
      var toastBody = document.getElementById('redirectToastBody');
      if(toastEl && toastBody){
        toastBody.textContent = text;
        var lower = (text || '').toLowerCase();
        toastEl.classList.remove('text-bg-light','bg-success','bg-info','bg-danger','text-white');
        if(lower.indexOf('thank') !== -1){
          toastEl.classList.add('bg-success','text-white');
        } else {
          toastEl.classList.add('text-bg-light');
        }
        var bs = new bootstrap.Toast(toastEl);
        bs.show();
      }
    }
  } catch(err){
    // silent
  }
})();