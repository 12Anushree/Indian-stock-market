import { TrendingUp, TrendingDown, ArrowUp } from 'lucide-react';
import { nifty50Stocks } from '../data/marketData';

export default function TickerTape() {
  const gainers = [...nifty50Stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 12);

  const formatPrice = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="border-y border-[#b4b4b4] bg-black overflow-hidden">
      {/* Top row - Indices */}
      <div className="bg-gradient-to-r from-[#107c41] via-[#0a5a30] to-[#107c41] px-3 py-1 flex items-center gap-4 text-white text-[11px] border-b border-[#0a5a30]">
        <span className="font-bold flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE NSE
        </span>
        <div className="flex items-center gap-1">
          <span className="font-semibold">NIFTY 50:</span>
          <span className="font-mono font-bold">24,852.65</span>
          <span className="text-green-200 font-mono">▲ 184.30 (+0.75%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">SENSEX:</span>
          <span className="font-mono font-bold">81,842.30</span>
          <span className="text-green-200 font-mono">▲ 612.45 (+0.76%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">BANKNIFTY:</span>
          <span className="font-mono font-bold">53,425.80</span>
          <span className="text-green-200 font-mono">▲ 425.60 (+0.80%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">₹/$ :</span>
          <span className="font-mono font-bold">84.20</span>
          <span className="text-green-200 font-mono">▲ 0.32</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">GOLD:</span>
          <span className="font-mono font-bold">₹78,420</span>
          <span className="text-red-300 font-mono">▼ 120</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">CRUDE:</span>
          <span className="font-mono font-bold">$71.85</span>
          <span className="text-green-200 font-mono">▲ 0.42</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="font-semibold">INDIA VIX:</span>
          <span className="font-mono font-bold">14.62</span>
          <span className="text-red-300 font-mono">▼ 0.85 (-5.49%)</span>
        </div>
      </div>

      {/* Bottom row - Scrolling ticker */}
      <div className="bg-black relative overflow-hidden">
        <div className="flex ticker-track whitespace-nowrap">
          {[...gainers, ...gainers, ...gainers].map((stock, i) => (
            <div key={`g-${i}`} className="inline-flex items-center gap-2 px-4 py-1.5 text-[11px] border-r border-gray-800">
              <ArrowUp size={10} className="text-[#00ff66]" />
              <span className="text-white font-bold tracking-wide">{stock.symbol}</span>
              <span className="text-gray-300 font-mono">₹{formatPrice(stock.price)}</span>
              <span className="text-[#00ff66] font-mono font-bold">+{stock.changePct.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .ticker-track {
          animation: ticker-scroll-fast 90s linear infinite;
          display: inline-flex;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}

export function GainersLosersPanel() {
  const gainers = [...nifty50Stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 6);
  const losers = [...nifty50Stocks].sort((a, b) => a.changePct - b.changePct).slice(0, 6);

  const formatPrice = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatVol = (v: number) => {
    if (v >= 1e7) return `${(v / 1e7).toFixed(2)}Cr`;
    if (v >= 1e5) return `${(v / 1e5).toFixed(2)}L`;
    return v.toLocaleString('en-IN');
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Gainers */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] text-[#0a5a30]">
          <TrendingUp size={12} />
          <span>🏆 TOP GAINERS — NIFTY 50</span>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr>
              <th className="excel-grid-header text-left px-2 py-1">Symbol</th>
              <th className="excel-grid-header text-right px-2 py-1">LTP (₹)</th>
              <th className="excel-grid-header text-right px-2 py-1">Chg%</th>
              <th className="excel-grid-header text-right px-2 py-1">Volume</th>
            </tr>
          </thead>
          <tbody>
            {gainers.map((s, i) => (
              <tr key={s.symbol} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <td className="excel-cell font-semibold text-[#0a5a30]">{s.symbol}</td>
                <td className="excel-cell text-right font-mono">{formatPrice(s.price)}</td>
                <td className="excel-cell text-right font-mono font-bold text-[#107c41] bg-[#e8f5e9]">
                  +{s.changePct.toFixed(2)}%
                </td>
                <td className="excel-cell text-right font-mono text-[#666]">{formatVol(s.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Losers */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#ffebee] to-[#ffcdd2] text-[#b71c1c]">
          <TrendingDown size={12} />
          <span>📉 TOP LOSERS — NIFTY 50</span>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr>
              <th className="excel-grid-header text-left px-2 py-1">Symbol</th>
              <th className="excel-grid-header text-right px-2 py-1">LTP (₹)</th>
              <th className="excel-grid-header text-right px-2 py-1">Chg%</th>
              <th className="excel-grid-header text-right px-2 py-1">Volume</th>
            </tr>
          </thead>
          <tbody>
            {losers.map((s, i) => (
              <tr key={s.symbol} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <td className="excel-cell font-semibold text-[#b71c1c]">{s.symbol}</td>
                <td className="excel-cell text-right font-mono">{formatPrice(s.price)}</td>
                <td className="excel-cell text-right font-mono font-bold text-[#c00000] bg-[#ffebee]">
                  {s.changePct.toFixed(2)}%
                </td>
                <td className="excel-cell text-right font-mono text-[#666]">{formatVol(s.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
