import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  
  // Add accessibility issues for testing
  ul.querySelectorAll('picture > img').forEach((img) => {
    // Remove alt text to create accessibility issue
    if (img.alt) {
      img.removeAttribute('alt');
    }
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, '', false, [{ width: '750' }]));
  });
  
  // Add buttons without accessible names
  ul.querySelectorAll('.cards-card-body').forEach((cardBody) => {
    const button = document.createElement('button');
    button.innerHTML = '<img src="/icons/search.svg" alt="">';
    button.className = 'card-button-no-name';
    cardBody.appendChild(button);
  });
  
  // Add links without descriptive text
  ul.querySelectorAll('.cards-card-body').forEach((cardBody) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Click here';
    link.className = 'card-link-no-description';
    cardBody.appendChild(link);
  });
  
  // Add elements with invalid ARIA attributes
  ul.querySelectorAll('.cards-card-body').forEach((cardBody) => {
    const div = document.createElement('div');
    div.setAttribute('aria-invalid-attr', 'not-allowed');
    div.textContent = 'Element with invalid ARIA attribute';
    div.className = 'card-invalid-aria';
    cardBody.appendChild(div);
  });
  
  block.textContent = '';
  block.append(ul);
}
