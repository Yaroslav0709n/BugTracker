const registerLink = document.querySelector('#register-link');

const loginForm = document.querySelector('#login-form');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');


registerLink.addEventListener('click', () => {
    window.location.href = '../register/signup.html';
});


loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const formData = new FormData(loginForm); 
  fetch('https://localhost:7088/api/Auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: formData.get('email'),
    password: formData.get('password')
  })
})
.then(async response => {
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.token);
    window.location.href = '../main/mainPage.html';
  } else if (response.status === 400) {
    const error = await response.json();
    if (error.message === 'Invalid email') {
      document.getElementById('email-error').textContent = 'Invalid email';
    } else if (error.message === 'Invalid password') {
      document.getElementById('password-error').textContent = 'Invalid password';
    }
  } else {
    throw new Error('Failed to login');
  }
})
.catch(error => {
  console.error(error);
});
});


passwordInput.addEventListener('invalid', function(event) {
  event.preventDefault();
  passwordError.textContent = 'Please enter your password';
  passwordError.style.display = 'block';
});

passwordInput.addEventListener('input', function(event) {
  nameError.style.display = 'none';
});

emailInput.addEventListener('invalid', function(event) {
  event.preventDefault();
  emailError.textContent = 'Please enter a valid email address';
  emailError.style.display = 'block';
});

emailInput.addEventListener('input', () => {
  emailError.textContent = '';
});