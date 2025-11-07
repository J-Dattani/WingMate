// Registration form validation (password strength and required fields)
(function(){
  const form = document.getElementById('registerForm');
  if(!form) return;
  const feedback = document.getElementById('registerFeedback');

  function validatePassword(pw){
    // At least 8 chars, one uppercase, one lowercase, one digit, one special char
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return re.test(pw);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(feedback) feedback.textContent = '';
    const owner = document.getElementById('ownerNameInput').value.trim();
    const wing = document.getElementById('wingInput').value.trim();
    const floor = document.getElementById('floorInput').value.trim();
    const block = document.getElementById('blockInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const pw = document.getElementById('createPasswordInput').value;
    const pw2 = document.getElementById('confirmPasswordInput').value;

    if(!owner || !wing || !floor || !block){
      if(feedback) feedback.textContent = 'Please fill Owner Name, Wing, Floor and Block.';
      return;
    }
    if(!/^[0-9]{10}$/.test(phone)){
      if(feedback) feedback.textContent = 'Please enter a valid 10-digit phone number.';
      return;
    }
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      if(feedback) feedback.textContent = 'Please enter a valid email address.';
      return;
    }
    if(pw !== pw2){
      if(feedback) feedback.textContent = 'Passwords do not match.';
      return;
    }
    if(!validatePassword(pw)){
      if(feedback) feedback.innerHTML = 'Password must be at least 8 characters and include uppercase, lowercase, number and a special character.';
      return;
    }

    alert('Request submitted locally (no backend). You can now login with the provided credentials.');
    window.location.href = 'login.html';
  });
})();