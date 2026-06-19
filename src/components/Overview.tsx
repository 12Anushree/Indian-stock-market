import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Globe, Users, BarChart3, Zap, Building2, Cpu, Coins } from 'lucide-react';
import { nifty50Stocks, sectors, samplePortfolio } from '../data/marketData';
import { GainersLosersPanel } from './TickerTape';
import { formatINR } from '../utils/format';

export default function Overview() {
  const topMovers = [...nifty50Stocks].sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct)).slice(0, 10);

  // Generate market trend data
  const trendData = Array.from({ length: 30 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const base = 24500;
    const noise = Math.sin(i * 0.4) * 200 + Math.cos(i * 0.7) * 150;
    return {
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      nifty: Math.round(base + i * 12 + noise),
      sensex: Math.round((base + i * 12 + noise) * 3.3),
      vix: Math.round(14 + Math.abs(Math.sin(i * 0.5)) * 4),
    };
  });

  const marketCapDist = [
    { name: 'Large Cap (>₹20K Cr)', value: 65, color: '#107c41' },
    { name: 'Mid Cap (₹5K-20K Cr)', value: 22, color: '#5b9bd5' },
    { name: 'Small Cap (<₹5K Cr)', value: 13, color: '#ffc000' },
  ];

  const totalMarketCap = nifty50Stocks.reduce((sum, s) => sum + s.marketCap, 0);
  const totalVolume = nifty50Stocks.reduce((sum, s) => sum + s.volume, 0);
  const advancers = nifty50Stocks.filter(s => s.changePct > 0).length;
  const decliners = nifty50Stocks.filter(s => s.changePct < 0).length;
  const unchanged = 50 - advancers - decliners;

  const portfolioSummary = {
    totalValue: samplePortfolio.reduce((sum, p) => sum + p.qty * p.currentPrice, 0),
    invested: samplePortfolio.reduce((sum, p) => sum + p.qty * p.avgPrice, 0),
  };

  return (
    <div className="space-y-3">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-6 gap-3">
        <KPICard icon={<Activity size={14} />} label="NIFTY 50" value="24,852.65" change="+184.30" changePct="+0.75%" up />
        <KPICard icon={<BarChart3 size={14} />} label="SENSEX" value="81,842.30" change="+612.45" changePct="+0.76%" up />
        <KPICard icon={<Building2 size={14} />} label="BANK NIFTY" value="53,425.80" change="+425.60" changePct="+0.80%" up />
        <KPICard icon={<Cpu size={14} />} label="NIFTY IT" value="42,856.20" change="-180.40" changePct="-0.42%" />
        <KPICard icon={<Coins size={14} />} label="INDIA VIX" value="14.62" change="-0.85" changePct="-5.49%" />
        <KPICard icon={<Globe size={14} />} label="₹/USD" value="84.20" change="+0.32" changePct="+0.38%" up />
      </div>

      {/* Market Trend Chart */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#107c41] to-[#0a5a30] text-white">
          <Activity size={12} />
          <span>MARKET TREND — NIFTY 50 vs SENSEX (30 DAYS)</span>
          <span className="ml-auto text-[10px]">Real-time aggregated chart</span>
        </div>
        <div className="p-3">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="niftyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#107c41" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#107c41" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="sensexGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b9bd5" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#5b9bd5" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#666' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#107c41' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#5b9bd5' }} />
              <Tooltip contentStyle={{ fontSize: 11, padding: 6, border: '1px solid #107c41' }} />
              <Area yAxisId="left" type="monotone" dataKey="nifty" stroke="#107c41" strokeWidth={2} fill="url(#niftyGradient)" name="NIFTY 50" />
              <Area yAxisId="right" type="monotone" dataKey="sensex" stroke="#5b9bd5" strokeWidth={2} fill="url(#sensexGradient)" name="SENSEX" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gainers/Losers + Market Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <GainersLosersPanel />
        </div>
        <div className="space-y-3">
          <div className="excel-card">
            <div className="excel-card-header">
              <Users size={12} />
              <span>ADVANCERS vs DECLINERS</span>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <div>
                  <span className="text-[#107c41] font-bold text-base">{advancers}</span>
                  <span className="text-[#666] ml-1">Advancers</span>
                </div>
                <div>
                  <span className="text-[#c00000] font-bold text-base">{decliners}</span>
                  <span className="text-[#666] ml-1">Decliners</span>
                </div>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden border border-[#d4d4d4]">
                <div className="bg-[#107c41]" style={{ width: `${(advancers / 50) * 100}%` }}></div>
                <div className="bg-[#ffc000]" style={{ width: `${(unchanged / 50) * 100}%` }}></div>
                <div className="bg-[#c00000]" style={{ width: `${(decliners / 50) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-[#666] mt-1.5">
                <span className="text-[#107c41]">{((advancers / 50) * 100).toFixed(0)}%</span>
                <span className="text-[#ffc000]">{unchanged} Unchanged</span>
                <span className="text-[#c00000]">{((decliners / 50) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="excel-card">
            <div className="excel-card-header">
              <Coins size={12} />
              <span>MARKET CAP DISTRIBUTION</span>
            </div>
            <div className="p-2">
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={marketCapDist} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                    {marketCapDist.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} formatter={(v: any) => v + '%'} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-0.5 text-[10px] px-2">
                {marketCapDist.map(s => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded" style={{ backgroundColor: s.color }}></span>
                    <span className="flex-1 truncate">{s.name}</span>
                    <span className="font-mono font-semibold">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Snapshot + Top Movers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="excel-card">
          <div className="excel-card-header">
            <Zap size={12} />
            <span>SECTOR SNAPSHOT — TOP MOVERS</span>
          </div>
          <div className="p-2 space-y-1">
            {sectors.slice(0, 6).map(s => (
              <div key={s.name} className="flex items-center justify-between text-[11px] border-b border-[#f0f0f0] pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-6 rounded" style={{ backgroundColor: s.color }}></span>
                  <span className="font-semibold">{s.name}</span>
                </div>
                <span className={`font-mono font-bold ${s.change >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
                  {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="excel-card col-span-2">
          <div className="excel-card-header">
            <Activity size={12} />
            <span>TOP 10 MARKET MOVERS — NIFTY 50 (BY |% CHANGE|)</span>
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                {['Symbol', 'Name', 'LTP (₹)', 'Change', 'Chg %', 'Volume', 'Mkt Cap'].map(h => (
                  <th key={h} className="excel-grid-header px-2 py-1.5 text-right">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topMovers.map((s, i) => (
                <tr key={s.symbol} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td className="excel-cell text-left font-semibold text-[#107c41]">{s.symbol}</td>
                  <td className="excel-cell text-left text-[#666] truncate max-w-[120px]">{s.name}</td>
                  <td className="excel-cell text-right font-mono font-bold">₹{formatINR(s.price)}</td>
                  <td className={`excel-cell text-right font-mono ${s.change >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
                    {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}
                  </td>
                  <td className={`excel-cell text-right font-mono font-bold ${s.changePct >= 0 ? 'bg-[#e8f5e9] text-[#107c41]' : 'bg-[#ffebee] text-[#c00000]'}`}>
                    {s.changePct >= 0 ? '▲' : '▼'} {Math.abs(s.changePct).toFixed(2)}%
                  </td>
                  <td className="excel-cell text-right font-mono text-[#666]">{(s.volume / 1e5).toFixed(2)}L</td>
                  <td className="excel-cell text-right font-mono">₹{(s.marketCap / 1000).toFixed(1)}K Cr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-4 gap-3">
        <FooterStat label="Total Market Cap (NIFTY 50)" value={`₹${(totalMarketCap / 100000).toFixed(2)} L Cr`} sublabel="≈ $4.2 Trillion USD" />
        <FooterStat label="Total Volume Traded Today" value={`${(totalVolume / 1e7).toFixed(2)} Cr shares`} sublabel="Across NSE & BSE" />
        <FooterStat label="Portfolio Value" value={`₹${formatINR(portfolioSummary.totalValue)}`} sublabel={`Invested: ₹${formatINR(portfolioSummary.invested)}`} />
        <FooterStat label="FII / DII Activity" value="FII: +₹4,250 Cr" sublabel="DII: +₹2,820 Cr (Net Buyers)" />
      </div>
    </div>
  );
}

function KPICard({ icon, label, value, change, changePct, up }: { icon: React.ReactNode; label: string; value: string; change: string; changePct: string; up?: boolean }) {
  return (
    <div className="excel-card">
      <div className="p-2.5">
        <div className="flex items-center justify-between text-[10px] text-[#666] uppercase">
          <span className="flex items-center gap-1 font-semibold">{icon} {label}</span>
          <span className={`text-[10px] font-bold ${up ? 'text-[#107c41]' : 'text-[#c00000]'}`}>{up ? '▲' : '▼'}</span>
        </div>
        <div className="text-lg font-bold font-mono mt-1 text-[#1f1f1f]">{value}</div>
        <div className={`text-[11px] font-mono font-bold ${up ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
          {change} <span className="text-[10px]">({changePct})</span>
        </div>
      </div>
    </div>
  );
}

function FooterStat({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="excel-card" style={{ borderLeft: '4px solid #107c41' }}>
      <div className="p-2.5">
        <div className="text-[10px] text-[#666] uppercase font-semibold">{label}</div>
        <div className="text-base font-bold font-mono mt-1 text-[#107c41]">{value}</div>
        <div className="text-[10px] text-[#666]">{sublabel}</div>
      </div>
    </div>
  );
}
