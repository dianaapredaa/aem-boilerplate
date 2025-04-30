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
    },

    // Check if element needs a background overlay
    shouldAddBackground(element) {
      const style = window.getComputedStyle(element);
      const bgColor = style.backgroundColor;
      const isTransparent = bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent';
      return isTransparent;
    },

    // Calculate if text needs enhancement based on background
    needsTextEnhancement(element) {
      const style = window.getComputedStyle(element);
      const textColor = style.color;
      const bgColor = style.backgroundColor;
      
      // If background is transparent or image, return true
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        return true;
      }
      
      // Calculate contrast ratio
      const textRgb = this.hexToRgb(textColor);
      const bgRgb = this.hexToRgb(bgColor);
      
      if (!textRgb || !bgRgb) return true;
      
      const textLuminance = this.getLuminance(textRgb.r, textRgb.g, textRgb.b);
      const bgLuminance = this.getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      const contrastRatio = this.getContrastRatio(textLuminance, bgLuminance);
      
      return contrastRatio < 4.5;
    },

    // Analyze image colors to determine dominant colors
    analyzeImageColors(imageData) {
      const colors = new Map();
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a > 0) { // Skip transparent pixels
          const luminance = this.getLuminance(r, g, b);
          const color = `rgb(${r},${g},${b})`;
          colors.set(color, (colors.get(color) || 0) + 1);
        }
      }
      
      return colors;
    },

    // Enhanced contrast check
    ensureMinimumContrast(textColor, bgLuminance) {
      const minContrastRatio = 7; // Increased from 4.5 for better visibility
      const textRgb = this.hexToRgb(textColor);
      const textLuminance = this.getLuminance(textRgb.r, textRgb.g, textRgb.b);
      const contrastRatio = this.getContrastRatio(textLuminance, bgLuminance);
      
      if (contrastRatio < minContrastRatio) {
        // Force to pure white or black for maximum contrast
        return bgLuminance > 0.5 ? '#000000' : '#FFFFFF';
      }
      return textColor;
    },

    // Get the best text color based on image colors with enhanced contrast
    getBestTextColor(colors) {
      let totalLuminance = 0;
      let count = 0;
      let darkPixels = 0;
      
      for (const [color, frequency] of colors) {
        const [r, g, b] = color.match(/\d+/g).map(Number);
        const luminance = this.getLuminance(r, g, b);
        totalLuminance += luminance * frequency;
        count += frequency;
        
        // Consider pixels dark if luminance is below 0.6 (more aggressive)
        if (luminance < 0.6) darkPixels += frequency;
      }
      
      const averageLuminance = totalLuminance / count;
      const darkRatio = darkPixels / count;
      
      // Force white text on darker backgrounds (more aggressive threshold)
      if (darkRatio > 0.3 || averageLuminance < 0.6) {
        return '#FFFFFF';
      }
      
      return '#000000';
    },

    // Enhanced background overlay with stronger contrast
    getBackgroundOverlay(textColor, imageLuminance) {
      if (textColor === '#FFFFFF') {
        // Darker, more opaque background for white text
        return 'rgba(0, 0, 0, 0.85)';
      } else {
        // Lighter, more opaque background for black text
        return 'rgba(255, 255, 255, 0.85)';
      }
    },

    // Enhanced text shadow with stronger outline
    getTextShadow(textColor) {
      if (textColor === '#FFFFFF') {
        // Stronger shadows for white text
        return `
          2px 2px 1px rgba(0, 0, 0, 1),
          -2px -2px 1px rgba(0, 0, 0, 1),
          2px -2px 1px rgba(0, 0, 0, 1),
          -2px 2px 1px rgba(0, 0, 0, 1),
          3px 3px 2px rgba(0, 0, 0, 0.9),
          -3px -3px 2px rgba(0, 0, 0, 0.9),
          3px -3px 2px rgba(0, 0, 0, 0.9),
          -3px 3px 2px rgba(0, 0, 0, 0.9)
        `.trim();
      } else {
        // Stronger shadows for black text
        return `
          2px 2px 1px rgba(255, 255, 255, 1),
          -2px -2px 1px rgba(255, 255, 255, 1),
          2px -2px 1px rgba(255, 255, 255, 1),
          -2px 2px 1px rgba(255, 255, 255, 1),
          3px 3px 2px rgba(255, 255, 255, 0.9),
          -3px -3px 2px rgba(255, 255, 255, 0.9),
          3px -3px 2px rgba(255, 255, 255, 0.9),
          -3px 3px 2px rgba(255, 255, 255, 0.9)
        `.trim();
      }
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

  // Handle text overlays on images with enhanced contrast
  handleImageOverlays() {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
    
    elements.forEach(element => {
      const parent = element.parentElement;
      const image = parent?.querySelector('img');
      
      if (image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        
        const elementRect = element.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        const x = Math.max(0, elementRect.left - imageRect.left);
        const y = Math.max(0, elementRect.top - imageRect.top);
        const width = Math.min(elementRect.width, image.width - x);
        const height = Math.min(elementRect.height, image.height - y);
        
        if (width <= 0 || height <= 0) return;
        
        const imageData = ctx.getImageData(x, y, width, height);
        const colors = this.utils.analyzeImageColors(imageData);
        
        // Get the best text color with enhanced contrast
        const textColor = this.utils.getBestTextColor(colors);
        
        // Calculate average luminance for the background
        let totalLuminance = 0;
        let count = 0;
        for (const [color, frequency] of colors) {
          const [r, g, b] = color.match(/\d+/g).map(Number);
          totalLuminance += this.utils.getLuminance(r, g, b) * frequency;
          count += frequency;
        }
        const avgLuminance = totalLuminance / count;
        
        // Apply enhanced styles with stronger contrast
        element.style.color = textColor;
        element.style.textShadow = this.utils.getTextShadow(textColor);
        element.style.backgroundColor = this.utils.getBackgroundOverlay(textColor, avgLuminance);
        element.style.padding = '8px 16px'; // Increased padding
        element.style.borderRadius = '6px'; // Increased border radius
        element.style.display = 'inline-block';
        element.style.fontWeight = '600'; // Make text bolder
        element.style.letterSpacing = '0.5px'; // Improve readability
      }
    });
  },

  // Initialize color system
  init() {
    const contrastMode = window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'low';
    
    if (contrastMode === 'high') {
      const highContrastColors = this.calculateHighContrastColors();
      this.applyColors(highContrastColors);
      this.handleImageOverlays();
    }

    // Listen for changes in contrast preference
    window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
      if (e.matches) {
        const highContrastColors = this.calculateHighContrastColors();
        this.applyColors(highContrastColors);
        this.handleImageOverlays();
      } else {
        // Reset to original theme colors
        const originalColors = this.getCurrentThemeColors();
        this.applyColors(originalColors);
        // Remove text overlays
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a').forEach(element => {
          element.style.textShadow = '';
          element.style.backgroundColor = '';
          element.style.padding = '';
          element.style.borderRadius = '';
          element.style.color = '';
        });
      }
    });

    // Also handle image overlays when images load
    document.addEventListener('load', (e) => {
      if (e.target.tagName === 'IMG') {
        this.handleImageOverlays();
      }
    }, true);
  }
};

// Export for use in other files
window.ColorSystem = ColorSystem; 