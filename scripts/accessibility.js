console.log('Accessibility script loaded');

// Function to force high contrast mode
function forceHighContrast() {
  console.log('Applying high contrast mode...');
  try {
    document.documentElement.style.setProperty('--background-color', '#000000', 'important');
    document.documentElement.style.setProperty('--text-color', '#ffffff', 'important');
    document.documentElement.style.setProperty('--link-color', '#ffff00', 'important');
    document.documentElement.style.setProperty('--link-hover-color', '#ffd700', 'important');
    document.documentElement.style.setProperty('--light-color', '#333333', 'important');
    document.documentElement.style.setProperty('--dark-color', '#000000', 'important');
    
    // Force body colors
    if (document.body) {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    }
    console.log('High contrast mode applied successfully');
  } catch (error) {
    console.error('Error applying high contrast mode:', error);
  }
}

// Function to check contrast mode
function checkContrastMode() {
  try {
    const contrastMode = window.matchMedia('(prefers-contrast: more)').matches;
    console.log('Contrast mode enabled:', contrastMode);
    
    // Log all matching media queries
    ['more', 'less', 'no-preference', 'custom'].forEach(value => {
      const query = `(prefers-contrast: ${value})`;
      const matches = window.matchMedia(query).matches;
      console.log(`${query}: ${matches}`);
    });

    return contrastMode;
  } catch (error) {
    console.error('Error checking contrast mode:', error);
    return false;
  }
}

// Initialize immediately
console.log('Initializing accessibility features...');

// Check contrast mode immediately
if (checkContrastMode()) {
  forceHighContrast();
}

// Also run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Checking contrast mode again...');
    if (checkContrastMode()) {
      forceHighContrast();
    }
  });
} else {
  // DOM is already ready
  console.log('DOM already loaded - Running immediately...');
  if (checkContrastMode()) {
    forceHighContrast();
  }
}

// Listen for changes in contrast preference
window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
  console.log('Contrast preference changed:', e.matches);
  if (e.matches) {
    forceHighContrast();
  }
}); 