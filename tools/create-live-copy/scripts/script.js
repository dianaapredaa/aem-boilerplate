document.addEventListener('DOMContentLoaded', () => {
  // Function to set the URL of the selected document
  const setDocumentUrl = (url) => {
    const inputField = document.getElementById('Blueprint-path');
    if (inputField) {
      inputField.value = url;
    }
  };

  // Example function to simulate document selection
  const simulateDocumentSelection = () => {
    // Simulate getting the URL of the selected document
    const selectedDocumentUrl = 'https://example.com/selected-document-path';
    setDocumentUrl(selectedDocumentUrl);
  };

  // Simulate document selection on page load
  simulateDocumentSelection();

  // Add event listener for actual document selection (replace with real implementation)
  document.querySelectorAll('.document-selector').forEach((element) => {
    element.addEventListener('click', (event) => {
      // eslint-disable-next-line max-len
      const selectedDocumentUrl = event.target.dataset.url; // Assume URL is stored in data-url attribute
      setDocumentUrl(selectedDocumentUrl);
    });
  });

  // Existing form submission logic
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
});
