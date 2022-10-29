const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup1').value.trim();
  const password2 = document.querySelector('#password-signup2').value.trim();

  if (username && password && password2) {
    if (password !== password2) {
      // alert('Passwords do not match, please try again')
      $('#signupMessage').text("Passwords do not match, please try again");
    } else {
      // Send the username and password to the server
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const loginResponse = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (loginResponse.ok) {
          document.location.replace('/');
        } else {
          $('#signupMessage').text("Failed to automatically login!");
        }
      } else {
        $('#signupMessage').text("Failed to sign up!");
      }
    }
  } else {
    $('#signupMessage').text("You need to enter a username, password, and confirm the password. Please try again!");
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
