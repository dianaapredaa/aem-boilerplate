document.getElementById('liveCopyForm').addEventListener('submit', (event) => {
  event.preventDefault();

  fetch('http://localhost:8080/api/submitForm', {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));

  // Form submitted successfully
  // eslint-disable-next-line no-alert
  alert('Form submitted successfully!');
  this.reset(); // Reset the form
});
