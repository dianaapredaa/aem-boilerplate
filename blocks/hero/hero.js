import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Get the first child (picture) and second child (text content)
  const picture = block.querySelector('picture');
  const textContent = block.querySelector('div');
  
  // Create hero structure
  const hero = document.createElement('div');
  hero.className = 'hero';
  
  if (picture) {
    const heroImage = document.createElement('div');
    heroImage.className = 'hero-image';
    
    // Remove alt text to create accessibility issue
    const img = picture.querySelector('img');
    if (img) {
      img.removeAttribute('alt');
    }
    
    heroImage.appendChild(picture);
    hero.appendChild(heroImage);
  }
  
  if (textContent) {
    const heroContent = document.createElement('div');
    heroContent.className = 'hero-content';
    heroContent.appendChild(textContent);
    hero.appendChild(heroContent);
  }
  
  // Clear block and add hero
  block.textContent = '';
  block.appendChild(hero);
  
  // Add accessibility issues for testing
  addHeroAccessibilityIssues(block);
}

function addHeroAccessibilityIssues(block) {
  // Add buttons without accessible names
  const button = document.createElement('button');
  button.innerHTML = '<span class="icon">📝</span>';
  button.className = 'hero-button-no-name';
  button.setAttribute('aria-hidden', 'true');
  button.setAttribute('tabindex', '0');
  block.appendChild(button);
  
  // Add links without accessible names
  const link = document.createElement('a');
  link.href = '#';
  link.innerHTML = '<span class="icon">📝</span>';
  link.className = 'hero-link-no-name';
  block.appendChild(link);
  
  // Add links with non-descriptive text
  const clickHereLink = document.createElement('a');
  clickHereLink.href = '#';
  clickHereLink.textContent = 'Click here';
  clickHereLink.className = 'hero-link-click-here';
  block.appendChild(clickHereLink);
  
  // Add elements with invalid ARIA attributes
  const invalidAria = document.createElement('div');
  invalidAria.setAttribute('aria-invalid-attr', 'not-allowed');
  invalidAria.textContent = 'Hero element with invalid ARIA attribute';
  block.appendChild(invalidAria);
  
  // Add elements with invalid ARIA roles
  const invalidRole = document.createElement('div');
  invalidRole.setAttribute('role', 'invalid-role');
  invalidRole.textContent = 'Hero element with invalid role';
  block.appendChild(invalidRole);
  
  // Add elements missing required ARIA attributes
  const tablist = document.createElement('div');
  tablist.setAttribute('role', 'tablist');
  const tab = document.createElement('div');
  tab.setAttribute('role', 'tab');
  tab.textContent = 'Hero tab without aria-selected';
  tablist.appendChild(tab);
  block.appendChild(tablist);
  
  // Add elements with invalid ARIA attribute values
  const checked = document.createElement('div');
  checked.setAttribute('aria-checked', 'unknown');
  checked.textContent = 'Hero element with invalid aria-checked value';
  block.appendChild(checked);
  
  // Add elements with prohibited ARIA attributes
  const presentation = document.createElement('div');
  presentation.setAttribute('role', 'presentation');
  presentation.setAttribute('aria-label', 'presentation element with label');
  presentation.textContent = 'Hero presentation element with aria-label';
  block.appendChild(presentation);
  
  // Add elements missing required parent elements
  const option = document.createElement('div');
  option.setAttribute('role', 'option');
  option.textContent = 'Hero option outside of listbox';
  block.appendChild(option);
  
  // Add select without accessible name
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Choose an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  `;
  select.className = 'hero-select-no-name';
  block.appendChild(select);
  
  // Add images without alt text
  const image = document.createElement('div');
  image.className = 'hero-image-no-alt';
  image.style.width = '24px';
  image.style.height = '24px';
  image.style.backgroundColor = '#ddd';
  block.appendChild(image);
  
  // Add form inputs without labels
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter your name';
  input.className = 'hero-input-no-label';
  block.appendChild(input);
  
  // Add decorative images without alt=""
  const decorativeImage = document.createElement('div');
  decorativeImage.className = 'hero-decorative-image';
  decorativeImage.style.width = '24px';
  decorativeImage.style.height = '24px';
  decorativeImage.style.backgroundColor = '#ddd';
  block.appendChild(decorativeImage);
}
