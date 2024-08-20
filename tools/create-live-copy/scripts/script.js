// eslint-disable-next-line func-names
document.getElementById('liveCopyForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch('http://localhost:8080/api/submitForm', {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
    }
    // eslint-disable-next-line no-console
  }).catch(() => {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      errorMessage.textContent = 'An error occurred while submitting the form. Please try again.';
    }
  });
});
