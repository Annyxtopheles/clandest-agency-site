/**
 * Safe mobile micro-haptic feedback utility.
 * Gracefully no-ops in desktop browsers or environments without vibration support.
 */
export const triggerHaptic = (type: 'light' | 'medium' | 'selection' = 'light') => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light') {
        navigator.vibrate(8);
      } else if (type === 'selection') {
        navigator.vibrate([10]);
      } else if (type === 'medium') {
        navigator.vibrate(18);
      }
    } catch (_) {
      // Ignore browsers blocking vibration without user interaction
    }
  }
};