function now() {
  return typeof window.performance !== 'undefined' && typeof window.performance.now !== 'undefined' ? window.performance.now() : Date.now();
}

module.exports = now;