// Submit handler: redirect to index.html with toast message
(function(){
  var form = document.getElementById('addVehicleForm');
  if(!form) return;

  var numberEl = document.getElementById('vehicleNumber');
  var typeEl = document.getElementById('vehicleType');
  var modelEl = document.getElementById('modelName');

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

  if(numberEl){ numberEl.addEventListener('input', function(){ clearError(numberEl, 'vehNumError'); }); }
  if(typeEl){ typeEl.addEventListener('change', function(){ clearError(typeEl, 'vehTypeError'); }); }
  if(modelEl){ modelEl.addEventListener('input', function(){ clearError(modelEl, 'vehModelError'); }); }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var valid = true;
    var num = (numberEl && numberEl.value || '').trim().toUpperCase();
    var type = (typeEl && typeEl.value) || '';
    var model = (modelEl && modelEl.value || '').trim();

    // Simple vehicle number pattern (very lenient): letters/digits with spaces allowed, 6-12 chars
    var vehPattern = /^[A-Z0-9 ]{6,12}$/;

    if(!num){
      showError(numberEl, 'vehNumError', 'Please enter vehicle number.');
      valid = false;
    } else if(!vehPattern.test(num)){
      showError(numberEl, 'vehNumError', 'Enter a valid vehicle number (e.g., GJ05 1234).');
      valid = false;
    }

    if(!type || type === 'Select Type'){
      showError(typeEl, 'vehTypeError', 'Please select a vehicle type.');
      valid = false;
    }

    if(!model){
      showError(modelEl, 'vehModelError', 'Please enter model name.');
      valid = false;
    }

    if(!valid){
      if(!num && numberEl) numberEl.focus();
      else if((!type || type === 'Select Type') && typeEl) typeEl.focus();
      else if(!model && modelEl) modelEl.focus();
      return;
    }

    var msg = 'Your vehicle request has been submitted successfully. We will review it shortly.';
    var target = '../index.html?toast=1&msg=' + encodeURIComponent(msg);
    window.location.href = target;
  });
})();