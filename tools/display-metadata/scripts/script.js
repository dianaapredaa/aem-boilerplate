document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('metadata-form');
  const metadataDisplay = document.getElementById('metadata-display');
  const errorMessage = document.getElementById('errorMessage');

  if (form) {
    // eslint-disable-next-line func-names
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default form submission

      fetch('http://localhost:8080/sharepoint/display-metadata', {
        method: 'POST',
        body: new FormData(this),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Parse the JSON from the response
          }
          throw new Error('Network response was not ok.');
        }).then((data) => {
          // Check if 'data' has the expected properties
          document.getElementById('name').textContent = data.name || 'N/A';
          document.getElementById('path').textContent = data.path || 'N/A';
          document.getElementById('id').textContent = data.id || 'N/A';
          document.getElementById('createdBy').textContent = data.createdBy || 'N/A';
          document.getElementById('createdDateTime').textContent = data.createdDateTime || 'N/A';
          document.getElementById('lastModifiedBy').textContent = data.lastModifiedBy || 'N/A';
          document.getElementById('lastModifiedDateTime').textContent = data.lastModifiedDateTime || 'N/A';
          document.getElementById('liveCopies').textContent = data.liveCopies || 'N/A';
          document.getElementById('blueprint').textContent = data.blueprint || 'N/A';

          form.style.display = 'none'; // Hide the form
          metadataDisplay.style.display = 'block'; // Show the metadata details
          errorMessage.textContent = ''; // Clear any previous error message
          // eslint-disable-next-line no-console
        }).catch((error) => console.error('Error:', error));

      // eslint-disable-next-line no-alert
      alert('Looking for Metadata!');
    });
  }
});
