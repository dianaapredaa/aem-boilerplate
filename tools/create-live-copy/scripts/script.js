// eslint-disable-next-line func-names
document.getElementById('create-live-copy').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch('https://aem-sites-reverie-msm-launches-eds-deploy-ethos12-416093.stage.cloud.adobe.io/sharepoint/create-live-copy', {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
      alert('Live copy created successfully!');
    } else if (response.status === 404) {
      alert('Error: Resource not found!');
    } else {
      alert('Form submission failed!');
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));

  // eslint-disable-next-line no-alert
  alert('Creating Live Copy!');
  // this.reset(); // Reset the form
});
