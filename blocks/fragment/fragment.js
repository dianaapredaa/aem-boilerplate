/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadSections,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
        });
      };
      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.closest('.section').classList.add(...fragmentSection.classList);
      block.closest('.fragment').replaceWith(...fragment.childNodes);
    }
  }
  
  // Add accessibility issues for testing
  addFragmentAccessibilityIssues(block);
}

function addFragmentAccessibilityIssues(block) {
  // Add buttons without accessible names
  const button = document.createElement('button');
  button.innerHTML = '<img src="/icons/search.svg" alt="">';
  button.className = 'fragment-button-no-name';
  button.setAttribute('aria-hidden', 'true');
  button.setAttribute('tabindex', '0');
  block.appendChild(button);
  
  // Add links without accessible names
  const link = document.createElement('a');
  link.href = '#';
  link.innerHTML = '<img src="/icons/search.svg" alt="">';
  link.className = 'fragment-link-no-name';
  block.appendChild(link);
  
  // Add elements with invalid ARIA attributes
  const invalidAria = document.createElement('div');
  invalidAria.setAttribute('aria-invalid-attr', 'not-allowed');
  invalidAria.textContent = 'Fragment element with invalid ARIA attribute';
  block.appendChild(invalidAria);
  
  // Add elements with invalid ARIA roles
  const invalidRole = document.createElement('div');
  invalidRole.setAttribute('role', 'invalid-role');
  invalidRole.textContent = 'Fragment element with invalid role';
  block.appendChild(invalidRole);
  
  // Add elements missing required ARIA attributes
  const combobox = document.createElement('div');
  combobox.setAttribute('role', 'combobox');
  combobox.textContent = 'Fragment combobox without aria-expanded';
  block.appendChild(combobox);
  
  // Add elements with invalid ARIA attribute values
  const expanded = document.createElement('div');
  expanded.setAttribute('aria-expanded', 'maybe');
  expanded.textContent = 'Fragment element with invalid aria-expanded value';
  block.appendChild(expanded);
  
  // Add elements with prohibited ARIA attributes
  const presentation = document.createElement('div');
  presentation.setAttribute('role', 'presentation');
  presentation.setAttribute('aria-label', 'presentation element with label');
  presentation.textContent = 'Fragment presentation element with aria-label';
  block.appendChild(presentation);
  
  // Add elements missing required parent elements
  const tab = document.createElement('div');
  tab.setAttribute('role', 'tab');
  tab.textContent = 'Fragment tab outside of tablist';
  block.appendChild(tab);
  
  // Add select without accessible name
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="">Choose an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  `;
  select.className = 'fragment-select-no-name';
  block.appendChild(select);
}
