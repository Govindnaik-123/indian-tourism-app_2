/**
 * Image Optimization Utilities
 */

export const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

export const preloadImages = (images: string[]) => {
  images.forEach(src => preloadImage(src));
};

/**
 * Generate optimized image URL for external sources
 */
export const getOptimizedImageUrl = (url: string, width: number = 200, height: number = 200): string => {
  // For Pexels images, add optimization parameters
  if (url.includes('pexels.com')) {
    const params = new URLSearchParams();
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');
    params.append('w', width.toString());
    params.append('h', height.toString());
    params.append('fit', 'crop');
    params.append('q', '60'); // Lower quality for faster loading
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }
  return url;
};

/**
 * Create a blur data URL for image placeholders
 */
export const getBlurDataUrl = (width: number = 10, height: number = 10, color: string = 'e5e7eb'): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect fill='%23${color}' width='${width}' height='${height}'/%3E%3C/svg%3E`;
};

/**
 * Lazy load images using Intersection Observer
 */
export const lazyLoadImages = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img[data-lazy]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.lazy || '';
        img.removeAttribute('data-lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};
