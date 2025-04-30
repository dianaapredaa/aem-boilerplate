// Color system utilities
const ColorSystem = {
  // Color contrast calculation utilities
  utils: {
    // Convert hex to RGB
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },

    // Calculate relative luminance
    getLuminance(r, g, b) {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    },

    // Calculate contrast ratio
    getContrastRatio(l1, l2) {
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    },

    // Find contrasting color
    findContrastingColor(baseColor, targetRatio = 4.5) {
      const rgb = this.hexToRgb(baseColor);
      if (!rgb) return '#000000';
      
      const baseLuminance = this.getLuminance(rgb.r, rgb.g, rgb.b);
      const isDark = baseLuminance < 0.5;
      
      // Try to find a color that meets the contrast ratio
      let attempts = 0;
      let testColor = isDark ? '#FFFFFF' : '#000000';
      
      while (attempts < 10) {
        const testRgb = this.hexToRgb(testColor);
        const testLuminance = this.getLuminance(testRgb.r, testRgb.g, testRgb.b);
        const ratio = this.getContrastRatio(baseLuminance, testLuminance);
        
        if (ratio >= targetRatio) break;
        
        // Adjust the test color
        if (isDark) {
          // Make white more transparent
          testColor = this.adjustColorBrightness(testColor, -0.1);
        } else {
          // Make black more transparent
          testColor = this.adjustColorBrightness(testColor, 0.1);
        }
        attempts++;
      }
      
      return testColor;
    },

    // Adjust color brightness
    adjustColorBrightness(hex, factor) {
      const rgb = this.hexToRgb(hex);
      if (!rgb) return hex;
      
      const r = Math.max(0, Math.min(255, Math.round(rgb.r * (1 + factor))));
      const g = Math.max(0, Math.min(255, Math.round(rgb.g * (1 + factor))));
      const b = Math.max(0, Math.min(255, Math.round(rgb.b * (1 + factor))));
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
  },

  // Get current theme colors
  getCurrentThemeColors() {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    return {
      background: style.getPropertyValue('--background-color').trim(),
      text: style.getPropertyValue('--text-color').trim(),
      link: style.getPropertyValue('--link-color').trim(),
      linkHover: style.getPropertyValue('--link-hover-color').trim(),
      light: style.getPropertyValue('--light-color').trim(),
      dark: style.getPropertyValue('--dark-color').trim()
    };
  },

  // Calculate high contrast colors based on current theme
  calculateHighContrastColors() {
    const currentColors = this.getCurrentThemeColors();
    return {
      background: this.utils.findContrastingColor(currentColors.background, 7),
      text: this.utils.findContrastingColor(currentColors.text, 7),
      link: this.utils.findContrastingColor(currentColors.link, 7),
      linkHover: this.utils.findContrastingColor(currentColors.linkHover, 7),
      light: this.utils.findContrastingColor(currentColors.light, 7),
      dark: this.utils.findContrastingColor(currentColors.dark, 7)
    };
  },

  // Apply colors to CSS variables
  applyColors(colors) {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
        value,
        'important'
      );
    });
  },

  // Initialize color system
  init() {
    const contrastMode = window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'low';
    
    if (contrastMode === 'high') {
      const highContrastColors = this.calculateHighContrastColors();
      this.applyColors(highContrastColors);
    }

    // Listen for changes in contrast preference
    window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
      if (e.matches) {
        const highContrastColors = this.calculateHighContrastColors();
        this.applyColors(highContrastColors);
      } else {
        // Reset to original theme colors
        const originalColors = this.getCurrentThemeColors();
        this.applyColors(originalColors);
      }
    });
  }
};

// Export for use in other files
window.ColorSystem = ColorSystem; 