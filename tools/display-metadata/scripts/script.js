document.addEventListener('DOMContentLoaded', () => {
  // Add click listeners to get the path of the selected item
  document.querySelectorAll('div[role="row"]').forEach((row) => {
    row.addEventListener('click', () => {
      // Get the path of the selected item
      // Set the path to the filePath input field
      document.getElementById('filePath').value = row.querySelector('div[role="cell"]').textContent;
      // print the path to the console
      // eslint-disable-next-line no-console
      console.log(row.querySelector('div[role="cell"]').textContent);
    });
  });
  const form = document.getElementById('metadata-form');
  const metadataDisplay = document.getElementById('metadata-display');
  const errorMessage = document.getElementById('errorMessage');

  if (form) {
    // eslint-disable-next-line func-names
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default form submission

      fetch('http://localhost:8080/api/metadata', {
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
    });
  }
});
