console.log('Accessibility script loaded');

// // Function to calculate relative luminance
// function getLuminance(r, g, b) {
//   const [rs, gs, bs] = [r, g, b].map(c => {
//     c = c / 255;
//     return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
//   });
//   return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
// }

// // Function to calculate contrast ratio
// function getContrastRatio(l1, l2) {
//   const lighter = Math.max(l1, l2);
//   const darker = Math.min(l1, l2);
//   return (lighter + 0.05) / (darker + 0.05);
// }

// // Function to parse color string to RGB
// function parseColor(color) {
//   const div = document.createElement('div');
//   div.style.color = color;
//   document.body.appendChild(div);
//   const rgb = window.getComputedStyle(div).color;
//   document.body.removeChild(div);
//   return rgb.match(/\d+/g).map(Number);
// }

// // Function to adjust color for better contrast
// function adjustColorForContrast(backgroundColor, textColor, targetRatio = 4.5) {
//   const [r1, g1, b1] = parseColor(backgroundColor);
//   const [r2, g2, b2] = parseColor(textColor);
  
//   const l1 = getLuminance(r1, g1, b1);
//   const l2 = getLuminance(r2, g2, b2);
//   const ratio = getContrastRatio(l1, l2);
  
//   if (ratio >= targetRatio) return textColor;
  
//   // Adjust text color for better contrast
//   const isDarkBg = l1 < 0.5;
//   return isDarkBg ? '#FFFFFF' : '#000000';
// }

// // Function to apply contrast adjustments
// function applyContrastAdjustments() {
//   const style = document.createElement('style');
//   document.head.appendChild(style);
  
//   // Get all text elements
//   const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, div');
  
//   textElements.forEach(element => {
//     const computedStyle = window.getComputedStyle(element);
//     const backgroundColor = computedStyle.backgroundColor;
//     const textColor = computedStyle.color;
    
//     const newTextColor = adjustColorForContrast(backgroundColor, textColor);
//     if (newTextColor !== textColor) {
//       element.style.color = newTextColor;
//     }
//   });
// }

// // Check if user has enabled high contrast mode
// function isHighContrastEnabled() {
//   return window.matchMedia('(prefers-contrast: more)').matches;
// }

// // Initialize contrast adjustments only if high contrast is enabled
// document.addEventListener('DOMContentLoaded', () => {
//   // Only apply adjustments if high contrast mode is enabled
//   if (isHighContrastEnabled()) {
//     applyContrastAdjustments();
    
//     // Watch for dynamic content changes
//     const observer = new MutationObserver(() => {
//       applyContrastAdjustments();
//     });
    
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true
//     });
//   }
  
//   // Listen for changes in contrast preference
//   window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
//     if (e.matches) {
//       // High contrast mode was enabled
//       applyContrastAdjustments();
      
//       // Set up observer if not already set up
//       if (!window.contrastObserver) {
//         window.contrastObserver = new MutationObserver(() => {
//           applyContrastAdjustments();
//         });
        
//         window.contrastObserver.observe(document.body, {
//           childList: true,
//           subtree: true
//         });
//       }
//     } else {
//       // High contrast mode was disabled
//       // Remove any applied styles
//       document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, div').forEach(element => {
//         element.style.color = '';
//       });
      
//       // Disconnect observer if it exists
//       if (window.contrastObserver) {
//         window.contrastObserver.disconnect();
//         window.contrastObserver = null;
//       }
//     }
//   });
// }); 

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

// Add test button
function addTestButton() {
  try {
    const button = document.createElement('button');
    button.textContent = 'Test High Contrast';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.backgroundColor = '#000000';
    button.style.color = '#ffffff';
    button.style.border = '2px solid #ffffff';
    button.style.padding = '10px';
    button.style.cursor = 'pointer';
    button.onclick = () => {
      console.log('Manual test of high contrast mode');
      forceHighContrast();
    };
    document.body.appendChild(button);
    console.log('Test button added successfully');
  } catch (error) {
    console.error('Error adding test button:', error);
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
    // Add test button in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      addTestButton();
    }
  });
} else {
  // DOM is already ready
  console.log('DOM already loaded - Running immediately...');
  if (checkContrastMode()) {
    forceHighContrast();
  }
  // Add test button in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    addTestButton();
  }
}

// Listen for changes in contrast preference
window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
  console.log('Contrast preference changed:', e.matches);
  if (e.matches) {
    forceHighContrast();
  }
}); 