// Indian Stock Market 2026 — Realistic synthetic data for NSE/BSE

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePct: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  marketCap: number; // in crores
  pe: number;
}

export const nifty50Stocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', price: 3245.80, change: 62.40, changePct: 1.96, volume: 8542367, high: 3260.50, low: 3180.20, open: 3195.00, prevClose: 3183.40, marketCap: 2198000, pe: 28.4 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', price: 4520.15, change: -38.20, changePct: -0.84, volume: 2145683, high: 4572.00, low: 4510.40, open: 4558.00, prevClose: 4558.35, marketCap: 1640000, pe: 31.2 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', price: 1785.60, change: 24.80, changePct: 1.41, volume: 12543289, high: 1792.00, low: 1758.30, open: 1762.40, prevClose: 1760.80, marketCap: 1356000, pe: 19.8 },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT', price: 1892.45, change: 18.65, changePct: 1.00, volume: 6754321, high: 1905.00, low: 1872.10, open: 1880.00, prevClose: 1873.80, marketCap: 782000, pe: 27.6 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', price: 1342.30, change: 19.40, changePct: 1.47, volume: 9876543, high: 1348.90, low: 1321.50, open: 1325.00, prevClose: 1322.90, marketCap: 945000, pe: 18.4 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', price: 912.75, change: -8.20, changePct: -0.89, volume: 18765432, high: 925.40, low: 908.30, open: 921.00, prevClose: 920.95, marketCap: 812000, pe: 12.8 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', price: 1620.50, change: 34.20, changePct: 2.16, volume: 5432109, high: 1632.00, low: 1588.40, open: 1592.00, prevClose: 1586.30, marketCap: 982000, pe: 56.8 },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', price: 478.20, change: 4.60, changePct: 0.97, volume: 11234567, high: 480.40, low: 473.10, open: 474.00, prevClose: 473.60, marketCap: 598000, pe: 26.4 },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Construction', price: 3685.40, change: -42.30, changePct: -1.14, volume: 1987654, high: 3742.00, low: 3680.10, open: 3730.00, prevClose: 3727.70, marketCap: 506000, pe: 38.2 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', price: 1820.30, change: 12.50, changePct: 0.69, volume: 3456789, high: 1832.00, low: 1808.40, open: 1812.00, prevClose: 1807.80, marketCap: 365000, pe: 22.1 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', price: 2385.60, change: -18.40, changePct: -0.77, volume: 1876543, high: 2408.00, low: 2382.10, open: 2405.00, prevClose: 2404.00, marketCap: 561000, pe: 51.6 },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', price: 1245.80, change: 21.30, changePct: 1.74, volume: 7654321, high: 1252.00, low: 1225.40, open: 1228.00, prevClose: 1224.50, marketCap: 386000, pe: 16.9 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'Finance', price: 7320.50, change: 145.80, changePct: 2.03, volume: 1234567, high: 7345.00, low: 7180.20, open: 7200.00, prevClose: 7174.70, marketCap: 452000, pe: 29.8 },
  { symbol: 'WIPRO', name: 'Wipro', sector: 'IT', price: 542.30, change: 8.40, changePct: 1.57, volume: 4567890, high: 546.00, low: 534.20, open: 535.00, prevClose: 533.90, marketCap: 282000, pe: 22.8 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', price: 1785.40, change: -12.60, changePct: -0.70, volume: 2345678, high: 1802.00, low: 1780.10, open: 1800.00, prevClose: 1798.00, marketCap: 484000, pe: 26.1 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Consumer', price: 2785.20, change: -38.40, changePct: -1.36, volume: 1234567, high: 2832.00, low: 2780.40, open: 2825.00, prevClose: 2823.60, marketCap: 268000, pe: 56.2 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Auto', price: 12450.80, change: 185.40, changePct: 1.51, volume: 654321, high: 12480.00, low: 12280.40, open: 12295.00, prevClose: 12265.40, marketCap: 372000, pe: 27.4 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma', price: 1820.50, change: 28.40, changePct: 1.59, volume: 3456789, high: 1832.00, low: 1795.20, open: 1798.00, prevClose: 1792.10, marketCap: 436000, pe: 36.8 },
  { symbol: 'TITAN', name: 'Titan Company', sector: 'Consumer', price: 3450.20, change: -32.40, changePct: -0.93, volume: 876543, high: 3492.00, low: 3445.40, open: 3485.00, prevClose: 3482.60, marketCap: 306000, pe: 65.4 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Auto', price: 985.40, change: 18.60, changePct: 1.92, volume: 15678901, high: 992.00, low: 968.20, open: 972.00, prevClose: 966.80, marketCap: 354000, pe: 18.6 },
  { symbol: 'NTPC', name: 'NTPC Limited', sector: 'Energy', price: 425.80, change: 6.40, changePct: 1.53, volume: 9876543, high: 428.00, low: 418.50, open: 420.00, prevClose: 419.40, marketCap: 412000, pe: 16.4 },
  { symbol: 'POWERGRID', name: 'Power Grid Corp', sector: 'Energy', price: 348.20, change: -2.80, changePct: -0.80, volume: 6789012, high: 352.00, low: 346.50, open: 351.00, prevClose: 351.00, marketCap: 324000, pe: 18.9 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', sector: 'Cement', price: 11850.40, change: 145.20, changePct: 1.24, volume: 432109, high: 11880.00, low: 11720.40, open: 11725.00, prevClose: 11705.20, marketCap: 342000, pe: 32.6 },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', sector: 'Auto', price: 2985.40, change: 62.40, changePct: 2.13, volume: 2345678, high: 2992.00, low: 2925.20, open: 2930.00, prevClose: 2923.00, marketCap: 372000, pe: 28.4 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', sector: 'Conglomerate', price: 2485.60, change: -42.30, changePct: -1.67, volume: 3456789, high: 2532.00, low: 2480.10, open: 2525.00, prevClose: 2527.90, marketCap: 285000, pe: 84.2 },
  { symbol: 'JSWSTEEL', name: 'JSW Steel', sector: 'Metals', price: 985.40, change: 12.40, changePct: 1.27, volume: 4567890, high: 992.00, low: 974.20, open: 978.00, prevClose: 973.00, marketCap: 238000, pe: 22.6 },
  { symbol: 'TATASTEEL', name: 'Tata Steel', sector: 'Metals', price: 158.40, change: 2.60, changePct: 1.67, volume: 28765432, high: 159.40, low: 156.20, open: 156.40, prevClose: 155.80, marketCap: 198000, pe: 12.4 },
  { symbol: 'COALINDIA', name: 'Coal India', sector: 'Mining', price: 485.60, change: -4.20, changePct: -0.86, volume: 8765432, high: 492.00, low: 484.10, open: 490.00, prevClose: 489.80, marketCap: 298000, pe: 11.2 },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', sector: 'Energy', price: 285.40, change: 4.80, changePct: 1.71, volume: 12345678, high: 287.00, low: 281.20, open: 282.00, prevClose: 280.60, marketCap: 358000, pe: 9.8 },
  { symbol: 'BPCL', name: 'Bharat Petroleum', sector: 'Energy', price: 348.60, change: 6.20, changePct: 1.81, volume: 5678901, high: 350.00, low: 343.40, open: 344.00, prevClose: 342.40, marketCap: 152000, pe: 10.6 },
  { symbol: 'DRREDDY', name: "Dr. Reddy's Laboratories", sector: 'Pharma', price: 1285.40, change: -18.60, changePct: -1.43, volume: 1876543, high: 1308.00, low: 1282.40, open: 1305.00, prevClose: 1304.00, marketCap: 107000, pe: 28.6 },
  { symbol: 'CIPLA', name: 'Cipla', sector: 'Pharma', price: 1520.80, change: 22.40, changePct: 1.50, volume: 2345678, high: 1528.00, low: 1502.20, open: 1505.00, prevClose: 1498.40, marketCap: 122000, pe: 32.4 },
  { symbol: 'DIVISLAB', name: "Divi's Laboratories", sector: 'Pharma', price: 5685.40, change: 85.60, changePct: 1.53, volume: 543210, high: 5712.00, low: 5612.40, open: 5620.00, prevClose: 5599.80, marketCap: 151000, pe: 58.6 },
  { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals', sector: 'Healthcare', price: 6850.40, change: 124.80, changePct: 1.85, volume: 432109, high: 6872.00, low: 6732.40, open: 6740.00, prevClose: 6725.60, marketCap: 98500, pe: 84.2 },
  { symbol: 'TATACONSUM', name: 'Tata Consumer Products', sector: 'FMCG', price: 985.40, change: -8.40, changePct: -0.85, volume: 2345678, high: 998.00, low: 982.40, open: 995.00, prevClose: 993.80, marketCap: 92000, pe: 62.4 },
  { symbol: 'NESTLEIND', name: 'Nestle India', sector: 'FMCG', price: 2285.60, change: 18.40, changePct: 0.81, volume: 876543, high: 2292.00, low: 2265.20, open: 2270.00, prevClose: 2267.20, marketCap: 220000, pe: 68.4 },
  { symbol: 'BRITANNIA', name: 'Britannia Industries', sector: 'FMCG', price: 4850.40, change: -32.40, changePct: -0.66, volume: 432109, high: 4892.00, low: 4845.40, open: 4885.00, prevClose: 4882.80, marketCap: 117000, pe: 52.6 },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance', sector: 'Insurance', price: 685.40, change: 12.40, changePct: 1.84, volume: 3456789, high: 692.00, low: 674.20, open: 678.00, prevClose: 673.00, marketCap: 148000, pe: 84.6 },
  { symbol: 'SBILIFE', name: 'SBI Life Insurance', sector: 'Insurance', price: 1485.40, change: 22.40, changePct: 1.53, volume: 1234567, high: 1492.00, low: 1465.40, open: 1468.00, prevClose: 1463.00, marketCap: 149000, pe: 72.4 },
  { symbol: 'ICICIPRULI', name: 'ICICI Prudential Life', sector: 'Insurance', price: 585.40, change: -8.40, changePct: -1.41, volume: 2345678, high: 595.00, low: 583.40, open: 593.00, prevClose: 593.80, marketCap: 84000, pe: 56.8 },
  { symbol: 'TECHM', name: 'Tech Mahindra', sector: 'IT', price: 1685.40, change: 28.60, changePct: 1.73, volume: 1876543, high: 1692.00, low: 1662.20, open: 1665.00, prevClose: 1656.80, marketCap: 163000, pe: 28.4 },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank', sector: 'Banking', price: 1045.80, change: -18.40, changePct: -1.73, volume: 4567890, high: 1068.00, low: 1042.40, open: 1065.00, prevClose: 1064.20, marketCap: 82000, pe: 14.6 },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp', sector: 'Auto', price: 4485.40, change: 62.40, changePct: 1.41, volume: 876543, high: 4492.00, low: 4425.20, open: 4430.00, prevClose: 4423.00, marketCap: 89000, pe: 22.4 },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', sector: 'Finance', price: 1685.40, change: 32.40, changePct: 1.96, volume: 1234567, high: 1692.00, low: 1655.20, open: 1658.00, prevClose: 1653.00, marketCap: 268000, pe: 28.4 },
  { symbol: 'GRASIM', name: 'Grasim Industries', sector: 'Cement', price: 2685.40, change: -28.40, changePct: -1.05, volume: 543210, high: 2720.00, low: 2680.40, open: 2715.00, prevClose: 2713.80, marketCap: 178000, pe: 22.6 },
  { symbol: 'HINDALCO', name: 'Hindalco Industries', sector: 'Metals', price: 685.40, change: 12.40, changePct: 1.84, volume: 4567890, high: 692.00, low: 674.20, open: 678.00, prevClose: 673.00, marketCap: 154000, pe: 14.8 },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto', sector: 'Auto', price: 9285.40, change: 142.40, changePct: 1.56, volume: 654321, high: 9312.00, low: 9152.20, open: 9160.00, prevClose: 9143.00, marketCap: 268000, pe: 26.4 },
  { symbol: 'EICHERMOT', name: 'Eicher Motors', sector: 'Auto', price: 4685.40, change: 75.40, changePct: 1.64, volume: 765432, high: 4712.00, low: 4615.20, open: 4620.00, prevClose: 4610.00, marketCap: 128000, pe: 28.6 },
  { symbol: 'LTIM', name: 'LTIMindtree', sector: 'IT', price: 6285.40, change: -85.40, changePct: -1.34, volume: 432109, high: 6382.00, low: 6278.40, open: 6375.00, prevClose: 6370.80, marketCap: 178000, pe: 34.2 },
];

// OHLC data for candlestick charts - 30 days
export const generateOHLC = (basePrice: number, days: number = 30, symbol?: string) => {
  const data = [];
  let price = basePrice * 0.92;
  const seed = symbol ? symbol.charCodeAt(0) + (symbol.charCodeAt(1) || 0) : 42;
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < days; i++) {
    const volatility = basePrice * 0.018;
    const trend = (basePrice - price) * 0.08;
    const open = price;
    const close = open + (rand() - 0.45) * volatility + trend;
    const high = Math.max(open, close) + rand() * volatility * 0.6;
    const low = Math.min(open, close) - rand() * volatility * 0.6;
    const volume = Math.floor(2000000 + rand() * 6000000);
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    data.push({
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      open: +open.toFixed(2),
      close: +close.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      volume,
    });
    price = close;
  }
  return data;
};

// Sector performance
export const sectors = [
  { name: 'Banking', change: 1.42, weight: 28.5, topStock: 'HDFCBANK', color: '#107c41' },
  { name: 'IT', change: -0.42, weight: 14.2, topStock: 'INFY', color: '#5b9bd5' },
  { name: 'Pharma', change: 1.28, weight: 8.6, topStock: 'SUNPHARMA', color: '#ed7d31' },
  { name: 'Auto', change: 1.74, weight: 9.8, topStock: 'MARUTI', color: '#ffc000' },
  { name: 'Energy', change: 1.86, weight: 12.4, topStock: 'RELIANCE', color: '#ff9933' },
  { name: 'FMCG', change: 0.32, weight: 10.2, topStock: 'ITC', color: '#138808' },
  { name: 'Metals', change: 1.45, weight: 5.8, topStock: 'TATASTEEL', color: '#7030a0' },
  { name: 'Telecom', change: 2.16, weight: 4.2, topStock: 'BHARTIARTL', color: '#c00000' },
];

// Market indices
export const indices = [
  { name: 'NIFTY 50', value: 24852.65, change: 184.30, changePct: 0.75, open: 24712.40, high: 24895.20, low: 24685.30 },
  { name: 'SENSEX', value: 81842.30, change: 612.45, changePct: 0.76, open: 81285.60, high: 81968.40, low: 81125.20 },
  { name: 'BANK NIFTY', value: 53425.80, change: 425.60, changePct: 0.80, open: 53085.20, high: 53512.40, low: 52985.60 },
  { name: 'NIFTY IT', value: 42856.20, change: -180.40, changePct: -0.42, open: 43042.40, high: 43125.80, low: 42785.20 },
  { name: 'NIFTY AUTO', value: 25842.60, change: 442.30, changePct: 1.74, open: 25485.20, high: 25895.40, low: 25412.60 },
  { name: 'NIFTY PHARMA', value: 22485.40, change: 285.60, changePct: 1.28, open: 22285.40, high: 22512.80, low: 22212.20 },
];

// News & Sentiment
export const newsItems = [
  { title: 'RBI keeps repo rate unchanged at 6.25%, maintains neutral stance', source: 'Economic Times', time: '12 min ago', sentiment: 'positive', impact: 'High', sector: 'Banking', summary: 'Reserve Bank of India maintained the benchmark rate citing balanced inflation risks, signaling stability for equity markets.' },
  { title: 'TCS wins ₹15,000 crore deal with UK-based insurance major', source: 'Mint', time: '38 min ago', sentiment: 'positive', impact: 'High', sector: 'IT', summary: 'The 10-year deal is expected to boost IT sector sentiment and create 8,000 new jobs in India.' },
  { title: 'Reliance Jio announces 5G rollout in all tier-2 cities by Q2 2026', source: 'Business Standard', time: '1 hr ago', sentiment: 'positive', impact: 'Medium', sector: 'Telecom', summary: 'Aggressive 5G expansion plan signals strong ARPU growth potential for Reliance Industries.' },
  { title: 'Foreign portfolio investors net buyers of ₹4,250 cr in equities', source: 'Bloomberg', time: '2 hr ago', sentiment: 'positive', impact: 'Medium', sector: 'Market', summary: 'FII flows turn positive after 3 months, signaling renewed foreign confidence in Indian markets.' },
  { title: 'Monsoon forecast: IMD predicts above-normal rainfall at 105% LPA', source: 'Reuters', time: '3 hr ago', sentiment: 'positive', impact: 'High', sector: 'Agriculture', summary: 'Favorable monsoon forecast boosts rural consumption and FMCG sector outlook for FY26.' },
  { title: 'Sun Pharma receives USFDA approval for generic cancer drug', source: 'Moneycontrol', time: '4 hr ago', sentiment: 'positive', impact: 'Medium', sector: 'Pharma', summary: 'Approval opens $850M addressable market, expected revenue impact of ₹1,200 crore annually.' },
  { title: 'Tata Motors EV sales surge 84% YoY in January 2026', source: 'CNBC', time: '5 hr ago', sentiment: 'positive', impact: 'Medium', sector: 'Auto', summary: 'Strong EV adoption and improving margins support bull case for Tata Motors.' },
  { title: 'Crude oil prices fall below $72 on global demand concerns', source: 'Reuters', time: '6 hr ago', sentiment: 'neutral', impact: 'Low', sector: 'Energy', summary: 'Lower crude is positive for India as it reduces import bill and inflation pressure.' },
  { title: 'Adani Group to invest ₹50,000 crore in green hydrogen projects', source: 'Mint', time: '8 hr ago', sentiment: 'positive', impact: 'High', sector: 'Energy', summary: 'Major capex announcement positions Adani Enterprises in emerging clean energy space.' },
  { title: 'Rupee strengthens to ₹84.20 against US Dollar on FII inflows', source: 'Economic Times', time: '10 hr ago', sentiment: 'positive', impact: 'Medium', sector: 'Forex', summary: 'Strong rupee reduces imported inflation, supportive for market sentiment.' },
  { title: 'HDFC Bank reports 18% YoY growth in net profit for Q3 FY26', source: 'Business Standard', time: '12 hr ago', sentiment: 'positive', impact: 'High', sector: 'Banking', summary: 'Strong NII growth and improving asset quality reinforce banking sector leadership.' },
  { title: 'Global markets jittery on US Fed policy uncertainty', source: 'Bloomberg', time: '14 hr ago', sentiment: 'negative', impact: 'Medium', sector: 'Market', summary: 'Risk-off sentiment in global markets may trigger short-term volatility in Indian equities.' },
];

// Portfolio sample
export const samplePortfolio = [
  { symbol: 'RELIANCE', qty: 50, avgPrice: 2890.50, currentPrice: 3245.80, sector: 'Energy' },
  { symbol: 'HDFCBANK', qty: 100, avgPrice: 1620.30, currentPrice: 1785.60, sector: 'Banking' },
  { symbol: 'INFY', qty: 75, avgPrice: 1750.80, currentPrice: 1892.45, sector: 'IT' },
  { symbol: 'TCS', qty: 25, avgPrice: 4180.20, currentPrice: 4520.15, sector: 'IT' },
  { symbol: 'MARUTI', qty: 15, avgPrice: 11200.40, currentPrice: 12450.80, sector: 'Auto' },
  { symbol: 'SUNPHARMA', qty: 80, avgPrice: 1620.50, currentPrice: 1820.50, sector: 'Pharma' },
  { symbol: 'TATAMOTORS', qty: 200, avgPrice: 880.20, currentPrice: 985.40, sector: 'Auto' },
  { symbol: 'BHARTIARTL', qty: 60, avgPrice: 1420.30, currentPrice: 1620.50, sector: 'Telecom' },
  { symbol: 'ITC', qty: 500, avgPrice: 442.80, currentPrice: 478.20, sector: 'FMCG' },
  { symbol: 'M&M', qty: 40, avgPrice: 2685.40, currentPrice: 2985.40, sector: 'Auto' },
];

// Backtest strategies
export const backtestStrategies = [
  { name: 'Golden Cross (50/200 SMA)', returns: 28.4, sharpe: 1.85, drawdown: -8.2, winRate: 64, trades: 142, color: '#107c41' },
  { name: 'RSI Mean Reversion', returns: 22.6, sharpe: 1.62, drawdown: -12.4, winRate: 58, trades: 186, color: '#5b9bd5' },
  { name: 'MACD Momentum', returns: 31.2, sharpe: 2.04, drawdown: -7.8, winRate: 61, trades: 124, color: '#ed7d31' },
  { name: 'Bollinger Bands Breakout', returns: 19.8, sharpe: 1.42, drawdown: -14.6, winRate: 52, trades: 168, color: '#ffc000' },
  { name: 'EMA Crossover (12/26)', returns: 26.4, sharpe: 1.78, drawdown: -9.4, winRate: 59, trades: 156, color: '#7030a0' },
  { name: 'Volume-Price Trend', returns: 34.8, sharpe: 2.18, drawdown: -6.8, winRate: 67, trades: 98, color: '#c00000' },
];
