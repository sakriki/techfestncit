// Performance detection utilities for mobile optimization

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  hasTouchScreen: boolean;
  screenSize: 'small' | 'medium' | 'large';
  memoryEstimate: number | null;
  enableHeavyAnimations: boolean;
}

let capabilities: DeviceCapabilities | null = null;

export function getDeviceCapabilities(): DeviceCapabilities {
  if (capabilities) return capabilities;

  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Return default values for SSR
    capabilities = {
      isMobile: false,
      isLowEnd: false,
      supportsWebGL: false,
      hasTouchScreen: false,
      screenSize: 'large',
      memoryEstimate: null,
      enableHeavyAnimations: true
    };
    return capabilities;
  }

  const isMobile = window.innerWidth <= 768 || 
    ('ontouchstart' in window) || 
    (navigator.maxTouchPoints > 0);

  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Detect screen size
  let screenSize: 'small' | 'medium' | 'large';
  if (window.innerWidth <= 480) screenSize = 'small';
  else if (window.innerWidth <= 1024) screenSize = 'medium';
  else screenSize = 'large';

  // Check WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const supportsWebGL = !!gl;

  // Estimate device memory (if available)
  let memoryEstimate: number | null = null;
  if ('deviceMemory' in navigator) {
    memoryEstimate = (navigator as any).deviceMemory;
  }

  // Determine if device is low-end
  const isLowEnd = isMobile && (
    memoryEstimate !== null && memoryEstimate < 4 || // Less than 4GB RAM
    window.innerWidth <= 480 || // Very small screen
    !supportsWebGL // No WebGL support
  );

  capabilities = {
    isMobile,
    isLowEnd,
    supportsWebGL,
    hasTouchScreen,
    screenSize,
    memoryEstimate,
    enableHeavyAnimations: !isLowEnd
  };

  return capabilities;
}

export function shouldReduceAnimations(): boolean {
  const caps = getDeviceCapabilities();
  return caps.isLowEnd || caps.isMobile;
}

export function shouldDisableHeavyAnimations(): boolean {
  const caps = getDeviceCapabilities();
  return caps.isLowEnd;
}

export function getOptimalAnimationSettings() {
  const caps = getDeviceCapabilities();
  
  return {
    // Reduce animation complexity on mobile
    animationComplexity: caps.isMobile ? 'reduced' : 'full',
    
    // Disable heavy animations on low-end devices
    enableHeavyAnimations: !caps.isLowEnd,
    
    // Reduce motion for accessibility and performance
    reduceMotion: caps.isLowEnd,
    
    // Optimize for touch devices
    touchOptimized: caps.hasTouchScreen,
    
    // Adjust frame rate based on device capability
    targetFrameRate: caps.isLowEnd ? 30 : 60
  };
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
} 