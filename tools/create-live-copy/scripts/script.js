// eslint-disable-next-line func-names
document.getElementById('create-live-copy').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  const form = this; // Store reference to the form element

  fetch('https://aem-sites-reverie-msm-launches-eds-deploy-ethos12-416093.stage.cloud.adobe.io/sharepoint/create-live-copy', {
    method: 'POST',
    body: new FormData(form),
  }).then((response) => {
    if (response.ok) {
      form.reset(); // Resets the form
      alert('Live copy created successfully!');
    } else if (response.status === 404) {
      alert('Error: Resource not found!');
    } else {
      alert('Form submission failed!');
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));
});
