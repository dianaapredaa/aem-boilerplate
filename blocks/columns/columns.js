export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
        
        // Add accessibility issues for testing
        const img = pic.querySelector('img');
        if (img) {
          // Remove alt text to create accessibility issue
          img.removeAttribute('alt');
        }
      }
      
      // Add elements with invalid ARIA roles
      const invalidRoleDiv = document.createElement('div');
      invalidRoleDiv.setAttribute('role', 'invalid-role');
      invalidRoleDiv.textContent = 'Column with invalid role';
      col.appendChild(invalidRoleDiv);
      
      // Add buttons without accessible names
      const button = document.createElement('button');
      button.innerHTML = '<img src="/icons/search.svg" alt="">';
      button.className = 'column-button-no-name';
      col.appendChild(button);
      
      // Add elements missing required ARIA attributes
      const combobox = document.createElement('div');
      combobox.setAttribute('role', 'combobox');
      combobox.textContent = 'Combobox without aria-expanded';
      col.appendChild(combobox);
    });
  });
}
