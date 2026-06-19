import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Briefcase, Plus, Trash2, TrendingUp, DollarSign, Wallet, Target } from 'lucide-react';
import { samplePortfolio } from '../data/marketData';
import { formatINR } from '../utils/format';

interface PortfolioItem {
  symbol: string;
  qty: number;
  avgPrice: number;
  currentPrice: number;
  sector: string;
}

export default function PortfolioTracking() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(samplePortfolio);
  const [newSymbol, setNewSymbol] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newAvg, setNewAvg] = useState('');

  const summary = useMemo(() => {
    let totalInvested = 0;
    let totalCurrent = 0;
    portfolio.forEach(p => {
      totalInvested += p.qty * p.avgPrice;
      totalCurrent += p.qty * p.currentPrice;
    });
    const totalPL = totalCurrent - totalInvested;
    const totalPLPct = (totalPL / totalInvested) * 100;
    const dayChange = portfolio.reduce((sum, p) => {
      const dayPct = ((p.currentPrice - p.avgPrice * 0.98) / (p.avgPrice * 0.98)) * 100;
      return sum + (p.qty * p.currentPrice * dayPct / 100);
    }, 0);
    return { totalInvested, totalCurrent, totalPL, totalPLPct, dayChange };
  }, [portfolio]);

  const sectorAllocation = useMemo(() => {
    const map: Record<string, number> = {};
    portfolio.forEach(p => {
      map[p.sector] = (map[p.sector] || 0) + p.qty * p.currentPrice;
    });
    return Object.entries(map).map(([sector, value]) => ({ name: sector, value }));
  }, [portfolio]);

  const sectorColors: Record<string, string> = {
    Banking: '#107c41', IT: '#5b9bd5', Pharma: '#ed7d31', Auto: '#ffc000',
    Energy: '#ff9933', FMCG: '#138808', Telecom: '#c00000', Finance: '#7030a0',
    Insurance: '#c00000', Healthcare: '#ed7d31', Consumer: '#ffc000',
    Construction: '#5b9bd5', Cement: '#a5a5a5', Metals: '#7030a0',
    Mining: '#a5a5a5', Conglomerate: '#138808',
  };

  const addStock = () => {
    if (!newSymbol || !newQty || !newAvg) return;
    setPortfolio([...portfolio, {
      symbol: newSymbol.toUpperCase(),
      qty: Number(newQty),
      avgPrice: Number(newAvg),
      currentPrice: Number(newAvg) * (1 + (Math.random() - 0.4) * 0.2),
      sector: 'Other',
    }]);
    setNewSymbol(''); setNewQty(''); setNewAvg('');
  };

  const removeStock = (symbol: string) => {
    setPortfolio(portfolio.filter(p => p.symbol !== symbol));
  };

  const performanceData = useMemo(() => {
    const days = 30;
    const data = [];
    let val = summary.totalInvested * 0.92;
    for (let i = 0; i < days; i++) {
      val += (summary.totalCurrent - summary.totalInvested) / days + (Math.random() - 0.5) * summary.totalInvested * 0.01;
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      data.push({
        date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        value: Math.round(val),
        benchmark: Math.round(summary.totalInvested * (0.92 + (i / days) * 0.12)),
      });
    }
    if (data.length > 0) data[data.length - 1].value = summary.totalCurrent;
    return data;
  }, [summary]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        <SummaryCard icon={<Wallet size={14} />} label="Total Invested" value={`₹${formatINR(summary.totalInvested)}`} color="#5b9bd5" />
        <SummaryCard icon={<DollarSign size={14} />} label="Current Value" value={`₹${formatINR(summary.totalCurrent)}`} color="#107c41" />
        <SummaryCard icon={<TrendingUp size={14} />} label="Total P&L" value={`${summary.totalPL >= 0 ? '+' : ''}₹${formatINR(summary.totalPL)}`} subtitle={`${summary.totalPLPct >= 0 ? '+' : ''}${summary.totalPLPct.toFixed(2)}%`} color={summary.totalPL >= 0 ? '#107c41' : '#c00000'} />
        <SummaryCard icon={<Target size={14} />} label="Day's Change" value={`${summary.dayChange >= 0 ? '+' : ''}₹${formatINR(summary.dayChange)}`} color={summary.dayChange >= 0 ? '#107c41' : '#c00000'} />
      </div>

      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#107c41] to-[#0a5a30] text-white">
          <Briefcase size={12} />
          <span>PORTFOLIO HOLDINGS — {portfolio.length} POSITIONS</span>
          <div className="ml-auto flex items-center gap-2 text-[10px]">
            <input
              type="text"
              placeholder="Symbol"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="px-1.5 py-0.5 rounded text-black border border-white/50 w-16 text-[10px]"
            />
            <input
              type="number"
              placeholder="Qty"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              className="px-1.5 py-0.5 rounded text-black border border-white/50 w-14 text-[10px]"
            />
            <input
              type="number"
              placeholder="Avg ₹"
              value={newAvg}
              onChange={(e) => setNewAvg(e.target.value)}
              className="px-1.5 py-0.5 rounded text-black border border-white/50 w-16 text-[10px]"
            />
            <button onClick={addStock} className="bg-white text-[#107c41] px-2 py-0.5 rounded font-semibold flex items-center gap-1">
              <Plus size={10} /> ADD
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                {['Symbol', 'Sector', 'Qty', 'Avg Price', 'LTP', 'Invested', 'Current', 'P&L ₹', 'P&L %', ''].map(h => (
                  <th key={h} className="excel-grid-header px-2 py-1.5 text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolio.map((p, i) => {
                const invested = p.qty * p.avgPrice;
                const current = p.qty * p.currentPrice;
                const pl = current - invested;
                const plPct = (pl / invested) * 100;
                return (
                  <tr key={p.symbol} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} style={{ borderBottom: '1px solid #e8e8e8' }}>
                    <td className="excel-cell text-left font-semibold text-[#107c41]">{p.symbol}</td>
                    <td className="excel-cell text-left text-[#666]">
                      <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: (sectorColors[p.sector] || '#999') + '20', color: sectorColors[p.sector] || '#999' }}>
                        {p.sector}
                      </span>
                    </td>
                    <td className="excel-cell text-right font-mono">{p.qty}</td>
                    <td className="excel-cell text-right font-mono">₹{formatINR(p.avgPrice)}</td>
                    <td className="excel-cell text-right font-mono font-semibold">₹{formatINR(p.currentPrice)}</td>
                    <td className="excel-cell text-right font-mono text-[#666]">₹{formatINR(invested)}</td>
                    <td className="excel-cell text-right font-mono font-bold">₹{formatINR(current)}</td>
                    <td className={`excel-cell text-right font-mono font-bold ${pl >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
                      {pl >= 0 ? '+' : ''}₹{formatINR(pl)}
                    </td>
                    <td className={`excel-cell text-right font-mono font-bold ${plPct >= 0 ? 'bg-[#e8f5e9] text-[#107c41]' : 'bg-[#ffebee] text-[#c00000]'}`}>
                      {plPct >= 0 ? '▲' : '▼'} {Math.abs(plPct).toFixed(2)}%
                    </td>
                    <td className="excel-cell text-center">
                      <button onClick={() => removeStock(p.symbol)} className="text-[#c00000] hover:bg-[#ffebee] p-1 rounded">
                        <Trash2 size={10} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="excel-card">
          <div className="excel-card-header">
            <Briefcase size={12} />
            <span>SECTOR ALLOCATION</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={sectorAllocation} cx="50%" cy="50%" innerRadius={45} outerRadius={85} paddingAngle={2} dataKey="value">
                  {sectorAllocation.map((entry, i) => (
                    <Cell key={i} fill={sectorColors[entry.name] || '#999'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} formatter={(v: any) => '₹' + formatINR(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 text-[10px] px-2 pb-2">
              {sectorAllocation.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded" style={{ backgroundColor: sectorColors[s.name] || '#999' }}></span>
                  <span className="flex-1">{s.name}</span>
                  <span className="font-mono font-semibold">{((s.value / summary.totalCurrent) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="excel-card col-span-2">
          <div className="excel-card-header">
            <TrendingUp size={12} />
            <span>PORTFOLIO PERFORMANCE — 30 DAYS (₹)</span>
            <span className="ml-auto text-[10px] text-[#666]">vs NIFTY 50 benchmark</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#666' }} />
                <YAxis tick={{ fontSize: 10, fill: '#666' }} tickFormatter={(v) => '₹' + (v / 100000).toFixed(1) + 'L'} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} formatter={(v: any) => '₹' + formatINR(Number(v))} />
                <Line type="monotone" dataKey="value" stroke="#107c41" strokeWidth={2.5} dot={false} name="Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="#5b9bd5" strokeWidth={2} strokeDasharray="4 4" dot={false} name="NIFTY 50" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, subtitle, color }: { icon: React.ReactNode; label: string; value: string; subtitle?: string; color: string }) {
  return (
    <div className="excel-card">
      <div className="p-3">
        <div className="flex items-center gap-1.5 text-[10px] text-[#666] uppercase">
          <span style={{ color }}>{icon}</span>
          <span>{label}</span>
        </div>
        <div className="text-lg font-bold font-mono mt-1" style={{ color }}>{value}</div>
        {subtitle && <div className="text-[11px] font-mono" style={{ color }}>{subtitle}</div>}
      </div>
    </div>
  );
}
