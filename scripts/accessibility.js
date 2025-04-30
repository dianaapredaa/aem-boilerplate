console.log('Accessibility script loaded');

// Function to force high contrast mode
function forceHighContrast() {
  console.log('Applying high contrast mode...');
  try {
    ColorSystem.init();
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