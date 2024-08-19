// eslint-disable-next-line max-len
// logic to autocomplete the blueprint path filed with the path to the file we have activated the form from

// Get the current file path
const currentPath = window.location.pathname;

// Get the blueprint path field
const blueprintPath = document.getElementById('blueprintPath');

// Set the blueprint path field value to the current path
if (blueprintPath) {
  blueprintPath.value = currentPath;

  // Add a change event listener to the blueprint path field

  blueprintPath.addEventListener('change', () => {
    // Set the blueprint path field value to the current path
    blueprintPath.value = currentPath;
  });
}

// eslint-disable-next-line func-names
document.getElementById('liveCopyForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch('http://localhost:8080/api/submitForm', {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));

  this.reset(); // Reset the form
});
