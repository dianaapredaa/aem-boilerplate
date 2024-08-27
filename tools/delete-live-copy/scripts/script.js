// check if any file is selected in the Sharepoint when the form is submitted
document.getElementById('delete-live-copy').addEventListener('submit', (event) => {
  const file = document.getElementById('file').files[0];
  if (!file) {
    // eslint-disable-next-line no-alert
    alert('Please select a file!');
    event.preventDefault(); // Prevents the form submission
  }
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
  alert('Deleting Live Copy!');
  this.reset(); // Reset the form
});
