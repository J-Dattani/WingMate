// Admin login client-side validation (no backend)
(function(){
  const form = document.getElementById('adminLoginForm');
  if(!form) return;
  const feedback = document.getElementById('adminLoginFeedback');
  const ADMIN = { username: 'admin', password: '@Admin123' };

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(feedback) feedback.textContent = '';
    const u = document.getElementById('usernameInput').value.trim();
    const p = document.getElementById('passwordInput').value;

    if(!u || !p){
      if(feedback) feedback.textContent = 'Please enter username and password.';
      return;
    }

    if(u === ADMIN.username && p === ADMIN.password){
      window.location.href = './Dashboard.html';
    } else {
      if(feedback) feedback.textContent = 'Incorrect admin username or password.';
    }
  });
})();