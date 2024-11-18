// eslint-disable-next-line func-names,import/extensions
import { apiUrl } from '../../../config/config.js';

document.getElementById('delete-launch').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch(`${apiUrl}/sharepoint/delete-launch`, {
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
  alert('Deleting Launch!');
  this.reset(); // Reset the form
});
