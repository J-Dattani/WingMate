// Client-side validation for Edit Resident form
(function(){
  var form = document.querySelector('form');
  if(!form) return;

  var ownerEl = document.getElementById('ownerName');
  var emailEl = document.getElementById('email');
  var phoneEl = document.getElementById('phone');
  var wingEl = document.getElementById('wing');
  var floorEl = document.getElementById('floor');
  var blockEl = document.getElementById('block');

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

  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function validPhone(v){ return /^[0-9]{10}$/.test(v); }

  if(ownerEl) ownerEl.addEventListener('input', function(){ clearError(ownerEl, 'ownerErr'); });
  if(emailEl) emailEl.addEventListener('input', function(){ clearError(emailEl, 'emailErr'); });
  if(phoneEl) phoneEl.addEventListener('input', function(){ clearError(phoneEl, 'phoneErr'); });
  if(wingEl) wingEl.addEventListener('input', function(){ clearError(wingEl, 'wingErr'); });
  if(floorEl) floorEl.addEventListener('input', function(){ clearError(floorEl, 'floorErr'); });
  if(blockEl) blockEl.addEventListener('input', function(){ clearError(blockEl, 'blockErr'); });

  // Handle Save Changes (anchor styled as button). Intercept click.
  var saveBtn = Array.from(document.querySelectorAll('a.btn.btn-primary'))
                     .find(a => a.textContent.trim().toLowerCase() === 'save changes');

  if(saveBtn){
    saveBtn.addEventListener('click', function(e){
      e.preventDefault();
      var valid = true;
      var owner = (ownerEl && ownerEl.value || '').trim();
      var email = (emailEl && emailEl.value || '').trim();
      var phone = (phoneEl && phoneEl.value || '').trim();
      var wing = (wingEl && wingEl.value || '').trim();
      var floor = (floorEl && floorEl.value || '').trim();
      var block = (blockEl && blockEl.value || '').trim();

      if(!owner){ showError(ownerEl, 'ownerErr', 'Please enter owner name.'); valid = false; }
      if(!email || !validEmail(email)){ showError(emailEl, 'emailErr', 'Please enter a valid email.'); valid = false; }
      if(!phone || !validPhone(phone)){ showError(phoneEl, 'phoneErr', 'Enter a valid 10-digit phone number.'); valid = false; }
      if(!wing){ showError(wingEl, 'wingErr', 'Please enter wing.'); valid = false; }
      if(!floor){ showError(floorEl, 'floorErr', 'Please enter floor.'); valid = false; }
      if(!block){ showError(blockEl, 'blockErr', 'Please enter block.'); valid = false; }

      if(!valid){
        (ownerEl && !owner && ownerEl.focus()) ||
        (emailEl && (!email || !validEmail(email)) && emailEl.focus()) ||
        (phoneEl && (!phone || !validPhone(phone)) && phoneEl.focus()) ||
        (wingEl && !wing && wingEl.focus()) ||
        (floorEl && !floor && floorEl.focus()) ||
        (blockEl && !block && blockEl.focus());
        return;
      }

      // On success show a quick toast-like alert (no backend) and go back
      alert('Resident details saved (client-side only).');
      window.location.href = './residents.html';
    });
  }
})();