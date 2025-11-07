// Simple submit handler: redirect to index.html and show toast there via URL param
(function(){
  var form = document.getElementById('raiseForm');
  if(!form) return;

  var categoryEl = document.getElementById('category');

  // Clear error state on change
  if(categoryEl){
    categoryEl.addEventListener('change', function(){
      categoryEl.classList.remove('is-invalid');
      var err = document.getElementById('categoryError');
      if(err){ err.remove(); }
    });
  }

  function showCategoryError(message){
    if(!categoryEl) { alert(message); return; }
    categoryEl.classList.add('is-invalid');
    var err = document.getElementById('categoryError');
    if(!err){
      err = document.createElement('div');
      err.id = 'categoryError';
      err.className = 'invalid-feedback d-block';
      // append after the select
      if(categoryEl.parentNode){
        categoryEl.parentNode.appendChild(err);
      }
    }
    err.textContent = message;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var messageEl = document.getElementById('message');

    // Validate category selection
    if(!categoryEl || !categoryEl.value || categoryEl.value === 'Select Category'){
      showCategoryError('Please select a category.');
      if(categoryEl) categoryEl.focus();
      return;
    }

    var category = categoryEl.options[categoryEl.selectedIndex].text;
    var msg = 'Thank you for contacting us regarding ' + category + '. We will answer soon.';
    var target = '../index.html?toast=1&msg=' + encodeURIComponent(msg);
    window.location.href = target;
  });
})();
