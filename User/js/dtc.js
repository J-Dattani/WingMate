// Submit handler: redirect to index.html with toast message
(function(){
  var form = document.getElementById('dtcForm');
  if(!form) return;
  var queryEl = document.getElementById('queryText');

  function showError(el, id, message){
    if(!el){ alert(message); return; }
    el.classList.add('is-invalid');
    var err = document.getElementById(id);
    if(!err){
      err = document.createElement('div');
      err.id = id;
      err.className = 'invalid-feedback d-block';
      el.parentNode && el.parentNode.appendChild(err);
    }
    err.textContent = message;
  }

  function clearError(el, id){
    if(!el) return;
    el.classList.remove('is-invalid');
    var err = document.getElementById(id);
    if(err) err.remove();
  }

  if(queryEl){
    queryEl.addEventListener('input', function(){ clearError(queryEl, 'dtcQueryError'); });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var text = (queryEl && queryEl.value || '').trim();
    if(!text){
      showError(queryEl, 'dtcQueryError', 'Please enter your query.');
      if(queryEl) queryEl.focus();
      return;
    }

    var msg = 'Your query has been submitted to the committee. A member will contact you shortly.';
    var target = '../index.html?toast=1&msg=' + encodeURIComponent(msg);
    window.location.href = target;
  });
})();
