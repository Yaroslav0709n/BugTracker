const loginLink = document.querySelector('#login-link');
const registrationForm = document.querySelector('#registration-form');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const firstNameError = document.getElementById('firstname-error');
const lastNameError = document.getElementById('lastname-error');


loginLink.addEventListener('click', () => {
    window.location.href = '../login/signin.html';
});


registrationForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const formData = new FormData(registrationForm); 

  fetch('https://localhost:7088/api/Auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role')
    })
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
        throw new Error(response.status);
    }
  })
  .then(data => {
    if (data.includes('Sign up complete')) {
      window.location.href = '../login/signin.html';
    } else {
      console.error('Unexpected response:', data);
    }
  })
  .catch(error => {
    console.error(error);
  });
});


firstNameInput.addEventListener('invalid', function(event){
  event.preventDefault();
  firstNameError.textContent = 'Please enter your first name';
  firstNameError.style.display = 'block';
});

firstNameInput.addEventListener('input', () => {
  firstNameError.textContent = '';
});

lastNameInput.addEventListener('invalid', function(event){
  event.preventDefault();
  lastNameError.textContent = 'Please enter your last name';
  lastNameError.style.display = 'block';
});

lastNameInput.addEventListener('input', () => {
  lastNameError.textContent = '';
});

passwordInput.addEventListener('invalid', function(event) {
  event.preventDefault();
  passwordError.textContent = 'Please enter your password';
  passwordError.style.display = 'block';
});

passwordInput.addEventListener('input', () => {
  passwordError.textContent = '';
});

emailInput.addEventListener('invalid', function(event) {
  event.preventDefault();
  emailError.textContent = 'Please enter a valid email address';
  emailError.style.display = 'block';
});

emailInput.addEventListener('input', () => {
  emailError.textContent = '';
});

