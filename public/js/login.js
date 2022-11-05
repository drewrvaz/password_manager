const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  window.localStorage.removeItem('pwdPolicy');

  if (username && password) {
    // Send the username and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      
    } else {
      $('#loginMessage').text("Failed to login");
    }
  } else {
    $('#loginMessage').text("You need to enter your username and password. Please try again!");

  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
