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

  

  

  
  // Add elements with invalid ARIA attributes
  const invalidAria = document.createElement('div');
  invalidAria.setAttribute('aria-invalid-attr', 'not-allowed');
  block.appendChild(invalidAria);
  
  // Add elements with invalid ARIA roles
  const invalidRole = document.createElement('div');
  invalidRole.setAttribute('role', 'invalid-role');
  block.appendChild(invalidRole);
  
  // Add elements missing required ARIA attributes
  const tablist = document.createElement('div');
  tablist.setAttribute('role', 'tablist');
  const tab = document.createElement('div');
  tab.setAttribute('role', 'tab');
  tablist.appendChild(tab);
  block.appendChild(tablist);
  
  // Add elements with invalid ARIA attribute values
  const checked = document.createElement('div');
  checked.setAttribute('aria-checked', 'unknown');
  block.appendChild(checked);
  
  // Add elements with prohibited ARIA attributes
  const presentation = document.createElement('div');
  presentation.setAttribute('role', 'presentation');
  presentation.setAttribute('aria-label', 'presentation element with label');
  block.appendChild(presentation);
  
  // Add elements missing required parent elements
  const option = document.createElement('div');
  option.setAttribute('role', 'option');
  block.appendChild(option);
  

  

  

  

}
