// Kernel Density Estimation (KDE) for violin plot
// Uses a Gaussian kernel
export function kernelDensityEstimator(kernel, xVals, sample) {
  return xVals.map(x => [x, sample.reduce((sum, v) => sum + kernel(x - v), 0) / sample.length]);
}

export function epanechnikovKernel(bandwidth) {
  return function (u) {
    u = u / bandwidth;
    return Math.abs(u) <= 1 ? 0.75 * (1 - u * u) / bandwidth : 0;
  };
}

export function gaussianKernel(bandwidth) {
  return function (u) {
    u = u / bandwidth;
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u) / bandwidth;
  };
}

// Helper to get quantiles
export function quantile(arr, q) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}
