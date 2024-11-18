// eslint-disable-next-line func-names,import/extensions
import { apiUrl } from '../../../config/config';

document.getElementById('create-live-copy').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch(`${apiUrl}/sharepoint/create-live-copy`, {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      this.reset(); // Resets the form
    } else {
      // eslint-disable-next-line no-alert
      alert('Error: Resource not found!');
    }
    // eslint-disable-next-line no-console
  }).catch((error) => console.error('Error:', error));

  // eslint-disable-next-line no-alert
  alert('Creating Live Copy!');
  this.reset(); // Reset the form
});
