import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  
  // Add accessibility issues for testing
  addFooterAccessibilityIssues(block);
}

function addFooterAccessibilityIssues(block) {
  // Add buttons without accessible names
  const button = document.createElement('button');
  button.innerHTML = '<img src="/icons/search.svg" alt="">';
  button.className = 'footer-button-no-name';
  button.setAttribute('aria-hidden', 'true');
  button.setAttribute('tabindex', '0');
  block.appendChild(button);
  
  // Add links without accessible names
  const link = document.createElement('a');
  link.href = '#';
  link.innerHTML = '<img src="/icons/search.svg" alt="">';
  link.className = 'footer-link-no-name';
  block.appendChild(link);
  
  // Add links with non-descriptive text
  const clickHereLink = document.createElement('a');
  clickHereLink.href = '#';
  clickHereLink.textContent = 'Click here';
  clickHereLink.className = 'footer-link-click-here';
  block.appendChild(clickHereLink);
  
  // Add elements with invalid ARIA attributes
  const invalidAria = document.createElement('div');
  invalidAria.setAttribute('aria-invalid-attr', 'not-allowed');
  invalidAria.textContent = 'Footer element with invalid ARIA attribute';
  block.appendChild(invalidAria);
  
  // Add elements with invalid ARIA roles
  const invalidRole = document.createElement('div');
  invalidRole.setAttribute('role', 'invalid-role');
  invalidRole.textContent = 'Footer element with invalid role';
  block.appendChild(invalidRole);
  
  // Add elements missing required ARIA attributes
  const progressbar = document.createElement('div');
  progressbar.setAttribute('role', 'progressbar');
  progressbar.textContent = 'Footer progressbar without aria-valuenow';
  block.appendChild(progressbar);
  
  // Add elements with invalid ARIA attribute values
  const pressed = document.createElement('div');
  pressed.setAttribute('aria-pressed', 'sometimes');
  pressed.textContent = 'Footer element with invalid aria-pressed value';
  block.appendChild(pressed);
  
  // Add elements with prohibited ARIA attributes
  const none = document.createElement('div');
  none.setAttribute('role', 'none');
  none.setAttribute('aria-describedby', 'none-element-with-describedby');
  none.textContent = 'Footer none element with aria-describedby';
  block.appendChild(none);
  
  // Add elements missing required parent elements
  const tabpanel = document.createElement('div');
  tabpanel.setAttribute('role', 'tabpanel');
  tabpanel.textContent = 'Footer tabpanel outside of tablist';
  block.appendChild(tabpanel);
  
  // Add select without accessible name
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Choose an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  `;
  select.className = 'footer-select-no-name';
  block.appendChild(select);
  
  // Add images without alt text
  const image = document.createElement('img');
  image.src = '/icons/search.svg';
  image.className = 'footer-image-no-alt';
  block.appendChild(image);
  
  // Add form inputs without labels
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter your email';
  input.className = 'footer-input-no-label';
  block.appendChild(input);
}
