// Client-side login validation for user side
(function(){
  const form = document.getElementById('loginForm');
  if(!form) return;
  const feedback = document.getElementById('loginFeedback');
  const TEST_USER = { username: 'JD@gmail.com', password: 'JD@mu033' };

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(feedback) feedback.textContent = '';
    const u = document.getElementById('usernameInput').value.trim();
    const p = document.getElementById('passwordInput').value;

    if(!u || !p){
      if(feedback) feedback.textContent = 'Please enter username and password.';
      return;
    }

    if(u === TEST_USER.username && p === TEST_USER.password){
      window.location.href = '../index.html';
    } else {
      if(feedback) feedback.textContent = 'Incorrect username or password.';
    }
  });
})();