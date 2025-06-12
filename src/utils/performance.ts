// Performance optimization utilities
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);

    // Preload critical images
    const heroImage = new Image();
    heroImage.src = '/hero-case-mosaic-1.png';
    
    const caseImage1 = new Image();
    caseImage1.src = '/case-thumb-api.png';
    
    const caseImage2 = new Image();
    caseImage2.src = '/case-thumb-ipe.png';
  }
};

export const optimizeAnimations = () => {
  if (typeof window !== 'undefined') {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable heavy animations
      document.documentElement.style.setProperty('--animation-duration', '0.001s');
      document.documentElement.style.setProperty('--transition-duration', '0.001s');
    }
  }
};

export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
};

export const trackPagePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        console.log('Page Performance Metrics:', {          'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
          'Connection': perfData.connectEnd - perfData.connectStart,
          'First Byte': perfData.responseStart - perfData.requestStart,
          'Download': perfData.responseEnd - perfData.responseStart,
          'DOM Processing': perfData.domComplete - (perfData as any).domLoading,
          'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
        });
      }, 0);
    });
  }
};
