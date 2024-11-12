// eslint-disable-next-line func-names
document.getElementById('rollout').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch('https://aem-sites-reverie-msm-launches-eds-deploy-ethos12-416093.stage.cloud.adobe.io/sharepoint/rollout', {
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
  alert('Rollout started!');
  this.reset(); // Reset the form
});
