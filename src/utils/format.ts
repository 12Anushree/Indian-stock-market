// Utility functions for Indian stock market formatting & technical indicators

export const formatINR = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatINRCompact = (value: number): string => {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(2)} L`;
  if (value >= 1e3) return `₹${(value / 1e3).toFixed(2)} K`;
  return `₹${formatINR(value)}`;
};

export const formatVolume = (vol: number): string => {
  if (vol >= 1e7) return `${(vol / 1e7).toFixed(2)}Cr`;
  if (vol >= 1e5) return `${(vol / 1e5).toFixed(2)}L`;
  if (vol >= 1e3) return `${(vol / 1e3).toFixed(2)}K`;
  return vol.toString();
};

// Simple Moving Average
export const sma = (data: number[], period: number): (number | null)[] => {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else {
      const slice = data.slice(i - period + 1, i + 1);
      result.push(slice.reduce((a, b) => a + b, 0) / period);
    }
  }
  return result;
};

// Exponential Moving Average
export const ema = (data: number[], period: number): (number | null)[] => {
  const result: (number | null)[] = [];
  const k = 2 / (period + 1);
  let prev: number | null = null;
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null);
    } else if (i === period - 1) {
      const slice = data.slice(0, period);
      prev = slice.reduce((a, b) => a + b, 0) / period;
      result.push(prev);
    } else {
      prev = data[i] * k + (prev as number) * (1 - k);
      result.push(prev);
    }
  }
  return result;
};

// RSI (Relative Strength Index)
export const rsi = (data: number[], period: number = 14): (number | null)[] => {
  const result: (number | null)[] = [];
  let gains = 0;
  let losses = 0;
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      result.push(null);
      continue;
    }
    const diff = data[i] - data[i - 1];
    if (i <= period) {
      if (diff > 0) gains += diff;
      else losses -= diff;
      if (i === period) {
        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        result.push(100 - 100 / (1 + rs));
      } else {
        result.push(null);
      }
    } else {
      const prevRsi = result[i - 1];
      const prevGain = 100 / (200 - prevRsi!) - 1;
      const avgGain = (prevGain * (period - 1) + Math.max(diff, 0)) / period;
      const avgLoss = ((1 - prevGain) * (period - 1) + Math.max(-diff, 0)) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      result.push(100 - 100 / (1 + rs));
    }
  }
  return result;
};

// MACD (Moving Average Convergence Divergence)
export const macd = (data: number[]): { macd: (number | null)[]; signal: (number | null)[]; histogram: (number | null)[] } => {
  const ema12 = ema(data, 12);
  const ema26 = ema(data, 26);
  const macdLine = ema12.map((v, i) => (v !== null && ema26[i] !== null ? v - (ema26[i] as number) : null));
  const validMacd = macdLine.filter((v): v is number => v !== null);
  const signalRaw = ema(validMacd, 9);
  const signal: (number | null)[] = [];
  let sigIdx = 0;
  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] === null) signal.push(null);
    else {
      signal.push(signalRaw[sigIdx]);
      sigIdx++;
    }
  }
  const histogram = macdLine.map((v, i) => (v !== null && signal[i] !== null ? v - (signal[i] as number) : null));
  return { macd: macdLine, signal, histogram };
};
