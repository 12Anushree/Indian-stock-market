import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend, Cell } from 'recharts';
import { Building2, Cpu, Pill, Car, Zap, ArrowUpRight, ArrowDownRight, BarChart3, Layers } from 'lucide-react';
import { sectors, nifty50Stocks, indices } from '../data/marketData';

const sectorIcons: Record<string, any> = {
  Banking: Building2,
  IT: Cpu,
  Pharma: Pill,
  Auto: Car,
  Energy: Zap,
};

export default function SectorPerformance() {
  const sectorData = sectors.map(s => ({
    name: s.name,
    change: s.change,
    weight: s.weight,
    color: s.color,
    isPositive: s.change >= 0,
  }));

  const heatmapData = sectors.map(s => {
    const stocks = nifty50Stocks.filter(st => st.sector === s.name);
    return {
      sector: s.name,
      avgChange: stocks.length ? stocks.reduce((sum, st) => sum + st.changePct, 0) / stocks.length : s.change,
      count: stocks.length,
      color: s.color,
    };
  });

  const getHeatColor = (val: number) => {
    if (val > 1.5) return '#0a5a30';
    if (val > 0.5) return '#107c41';
    if (val > 0) return '#a5d6a7';
    if (val > -0.5) return '#ffcccb';
    if (val > -1.5) return '#c00000';
    return '#7f0000';
  };

  return (
    <div className="space-y-3">
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#107c41] to-[#0a5a30] text-white">
          <BarChart3 size={12} />
          <span>SECTOR-WISE PERFORMANCE — NIFTY 50 (LIVE)</span>
          <span className="ml-auto text-[10px]">₹ INR | % Change | Market Cap Weighted</span>
        </div>
        <div className="p-3 grid grid-cols-3 gap-4">
          {sectors.map(s => {
            const Icon = sectorIcons[s.name] || BarChart3;
            const isUp = s.change >= 0;
            const stocks = nifty50Stocks.filter(st => st.sector === s.name);
            return (
              <div key={s.name} className="border border-[#d4d4d4] rounded overflow-hidden">
                <div className="px-3 py-2 flex items-center justify-between text-white text-[11px]" style={{ backgroundColor: s.color }}>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Icon size={12} />
                    {s.name}
                  </div>
                  <span className="font-mono">{isUp ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%</span>
                </div>
                <div className="p-2 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Weight in NIFTY</span>
                    <span className="font-mono font-semibold">{s.weight}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Stocks</span>
                    <span className="font-mono">{stocks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Top Stock</span>
                    <span className="font-mono font-semibold text-[#107c41]">{s.topStock}</span>
                  </div>
                  <div className="border-t border-[#e8e8e8] pt-1 mt-1">
                    <div className="text-[10px] text-[#666] mb-0.5">Constituents:</div>
                    <div className="flex flex-wrap gap-1">
                      {stocks.slice(0, 4).map(st => (
                        <span key={st.symbol} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${st.changePct >= 0 ? 'bg-[#e8f5e9] text-[#0a5a30]' : 'bg-[#ffebee] text-[#c00000]'}`}>
                          {st.symbol} {st.changePct >= 0 ? '+' : ''}{st.changePct.toFixed(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="excel-card">
          <div className="excel-card-header">
            <BarChart3 size={12} />
            <span>SECTOR % CHANGE — TODAY</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={260}>
              <ReBarChart data={sectorData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#666' }} domain={[-2, 3]} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#333' }} width={80} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} formatter={(v: any) => Number(v).toFixed(2) + '%'} />
                <Bar dataKey="change" radius={[0, 4, 4, 0]}>
                  {sectorData.map((entry, i) => (
                    <Cell key={i} fill={entry.isPositive ? '#107c41' : '#c00000'} />
                  ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="excel-card">
          <div className="excel-card-header">
            <Layers size={12} />
            <span>SECTOR RADIAL VIEW — NIFTY INDICES</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={260}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={indices.slice(3).map((i) => ({
                name: i.name,
                value: Math.abs(i.changePct) * 30 + 5,
                change: i.changePct,
                fill: i.changePct >= 0 ? '#107c41' : '#c00000',
              }))}>
                <RadialBar dataKey="value" cornerRadius={4} background={{ fill: '#f0f0f0' }} />
                <Legend iconSize={8} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="excel-card">
        <div className="excel-card-header">
          <Layers size={12} />
          <span>SECTOR HEATMAP — AVERAGE % CHANGE BY SECTOR</span>
        </div>
        <div className="p-3 grid grid-cols-8 gap-1.5">
          {heatmapData.map(s => {
            const stocks = nifty50Stocks.filter(st => st.sector === s.sector);
            return (
              <div key={s.sector} className="space-y-1">
                <div
                  className="p-2 rounded text-white text-center"
                  style={{ backgroundColor: getHeatColor(s.avgChange) }}
                >
                  <div className="text-[10px] font-bold">{s.sector}</div>
                  <div className="text-base font-bold font-mono">{s.avgChange >= 0 ? '+' : ''}{s.avgChange.toFixed(2)}%</div>
                </div>
                {stocks.slice(0, 4).map(st => (
                  <div
                    key={st.symbol}
                    className="p-1 rounded text-white text-[9px] flex justify-between"
                    style={{ backgroundColor: getHeatColor(st.changePct), opacity: 0.85 }}
                  >
                    <span className="font-bold">{st.symbol}</span>
                    <span className="font-mono">{st.changePct >= 0 ? '+' : ''}{st.changePct.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="excel-card">
        <div className="excel-card-header">
          <BarChart3 size={12} />
          <span>NIFTY SECTORAL INDICES — LIVE QUOTE</span>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr>
              {['Index', 'LTP', 'Change', 'Chg %', 'Open', 'High', 'Low', 'Status'].map(h => (
                <th key={h} className="excel-grid-header px-2 py-1.5 text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indices.map((idx, i) => (
              <tr key={idx.name} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} style={{ borderBottom: '1px solid #e8e8e8' }}>
                <td className="excel-cell font-semibold text-left text-[#107c41]">{idx.name}</td>
                <td className="excel-cell text-right font-mono font-bold">{idx.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className={`excel-cell text-right font-mono ${idx.change >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
                  {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)}
                </td>
                <td className={`excel-cell text-right font-mono font-bold ${idx.changePct >= 0 ? 'bg-[#e8f5e9] text-[#107c41]' : 'bg-[#ffebee] text-[#c00000]'}`}>
                  {idx.changePct >= 0 ? '▲' : '▼'} {Math.abs(idx.changePct).toFixed(2)}%
                </td>
                <td className="excel-cell text-right font-mono text-[#666]">{idx.open.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="excel-cell text-right font-mono text-[#107c41]">{idx.high.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="excel-cell text-right font-mono text-[#c00000]">{idx.low.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="excel-cell text-center">
                  {idx.changePct >= 0 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#107c41] font-semibold">
                      <ArrowUpRight size={10} /> BULLISH
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#c00000] font-semibold">
                      <ArrowDownRight size={10} /> BEARISH
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
