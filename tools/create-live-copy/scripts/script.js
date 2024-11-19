// eslint-disable-next-line func-names,import/extensions
import { apiUrl } from '../../../config/config.js';

document.getElementById('create-live-copy').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission

  fetch(`${apiUrl}/sharepoint/create-live-copy`, {
    method: 'POST',
    body: new FormData(this),
  }).then((response) => {
    if (response.ok) {
      return response.json(); // Assuming the response is JSON
    } else {
      console.error('Error: Resource not found!', response.status, response.statusText);
      alert('Error: Resource not found!');
      throw new Error('Resource not found');
    }
  }).then((data) => {
    console.log('Success:', data);
    this.reset(); // Resets the form
  }).catch((error) => {
    console.error('Fetch error:', error);
    alert('Error: Network request failed!');
  });

  // eslint-disable-next-line no-alert
  alert('Creating Live Copy!');
  this.reset(); // Reset the form
});
