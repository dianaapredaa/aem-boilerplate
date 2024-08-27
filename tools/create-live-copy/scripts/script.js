// eslint-disable-next-line func-names
document.getElementById('Blueprint-path').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    document.getElementById('Blueprint-path').value = URL.createObjectURL(file);
  }
});

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
  alert('Creating Live Copy!');
  this.reset(); // Reset the form
});
