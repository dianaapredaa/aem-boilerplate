// eslint-disable-next-line func-names
document.getElementById('create-live-copy').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch('http://localhost:8080/api/create-live-copy', {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
    } else {
      // eslint-disable-next-line no-alert
      alert('Form submission failed!');
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));

  // eslint-disable-next-line no-alert
  alert('Form submitted successfully!');
  this.reset(); // Reset the form
});

// eslint-disable-next-line func-names
document.getElementById('delete-live-copy').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch('http://localhost:8080/api/delete-live-copy', {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
    } else {
      // eslint-disable-next-line no-alert
      alert('Form submission failed!');
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));

  // eslint-disable-next-line no-alert
  alert('Form submitted successfully!');
  this.reset(); // Reset the form
});
