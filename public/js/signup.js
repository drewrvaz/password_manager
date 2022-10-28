const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup1').value.trim();
  const password2 = document.querySelector('#password-signup2').value.trim();

  if (username && password && password2) {
    if (password !== password2) {
      alert('Passwords do not match, please try again')
    } else {
      // Send the username and password to the server
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/login');
        // alert("Successfully signed up!");
        document.querySelector('#signupMessage').removeclass("is-disable").text("Successfully signed up!");
      } else {
        alert('Failed to sign up');
      }
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
