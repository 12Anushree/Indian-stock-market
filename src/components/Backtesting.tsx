import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import { FlaskConical, Play, Pause, TrendingUp, Award, Activity, BarChart3, Settings2 } from 'lucide-react';
import { backtestStrategies, nifty50Stocks, generateOHLC } from '../data/marketData';

export default function Backtesting() {
  const [selectedStrategy, setSelectedStrategy] = useState(backtestStrategies[0]);
  const [capital, setCapital] = useState(1000000);
  const [period, setPeriod] = useState('1Y');
  const [running, setRunning] = useState(false);

  const selectedStock = nifty50Stocks[0];

  const equityCurve = useMemo(() => {
    const ohlc = generateOHLC(selectedStock.price, 252, selectedStock.symbol);
    const days = ohlc.length;
    const startVal = capital;
    const targetReturn = selectedStrategy.returns;
    const data = [];
    let val = startVal;
    for (let i = 0; i < days; i++) {
      const progress = i / days;
      const noise = (Math.sin(i * 0.3) + Math.cos(i * 0.7)) * 0.005;
      val = startVal * (1 + (targetReturn / 100) * progress + noise);
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      data.push({
        date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        equity: Math.round(val),
        drawdown: val * 0.92,
      });
    }
    return data;
  }, [capital, selectedStrategy]);

  // Monthly returns heatmap-style data
  const monthlyReturns = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(m => ({
      month: m,
      returns: +(Math.random() * 8 - 2).toFixed(2),
    }));
  }, [selectedStrategy]);

  const runBacktest = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1500);
  };

  const finalValue = capital * (1 + selectedStrategy.returns / 100);
  const totalPL = finalValue - capital;

  return (
    <div className="space-y-3">
      {/* Configuration Panel */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#7030a0] to-[#5a247a] text-white">
          <FlaskConical size={12} />
          <span>BACKTESTING ENGINE — STRATEGY CONFIGURATION</span>
        </div>
        <div className="p-3 grid grid-cols-6 gap-3 items-end">
          <div>
            <div className="text-[10px] text-[#666] uppercase mb-1">Trading Capital (₹)</div>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full px-2 py-1 border border-[#d4d4d4] rounded text-sm font-mono"
            />
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase mb-1">Period</div>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full px-2 py-1 border border-[#d4d4d4] rounded text-sm bg-white">
              <option>6M</option>
              <option>1Y</option>
              <option>2Y</option>
              <option>5Y</option>
            </select>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase mb-1">Strategy</div>
            <select value={selectedStrategy.name} onChange={(e) => setSelectedStrategy(backtestStrategies.find(s => s.name === e.target.value) || backtestStrategies[0])} className="w-full px-2 py-1 border border-[#d4d4d4] rounded text-sm bg-white">
              {backtestStrategies.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase mb-1">Stop Loss</div>
            <select className="w-full px-2 py-1 border border-[#d4d4d4] rounded text-sm bg-white">
              <option>2%</option>
              <option>5%</option>
              <option>10%</option>
            </select>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase mb-1">Position Sizing</div>
            <select className="w-full px-2 py-1 border border-[#d4d4d4] rounded text-sm bg-white">
              <option>Kelly Criterion</option>
              <option>Fixed 10%</option>
              <option>Equal Weight</option>
            </select>
          </div>
          <button
            onClick={runBacktest}
            disabled={running}
            className="bg-gradient-to-b from-[#107c41] to-[#0a5a30] hover:from-[#0d8a47] hover:to-[#0a5a30] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {running ? <Pause size={12} /> : <Play size={12} />}
            {running ? 'RUNNING...' : 'RUN BACKTEST'}
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-6 gap-2">
        <MetricCard label="Total Return" value={`+${selectedStrategy.returns.toFixed(2)}%`} subtitle={`₹${(totalPL / 1000).toFixed(0)}K profit`} color="#107c41" icon={<TrendingUp size={14} />} />
        <MetricCard label="CAGR" value={`${(selectedStrategy.returns * 0.85).toFixed(1)}%`} color="#5b9bd5" icon={<Activity size={14} />} />
        <MetricCard label="Sharpe Ratio" value={selectedStrategy.sharpe.toFixed(2)} color="#7030a0" icon={<Award size={14} />} />
        <MetricCard label="Max Drawdown" value={`${selectedStrategy.drawdown.toFixed(1)}%`} color="#c00000" icon={<TrendingUp size={14} />} />
        <MetricCard label="Win Rate" value={`${selectedStrategy.winRate}%`} color="#ed7d31" icon={<Award size={14} />} />
        <MetricCard label="Total Trades" value={selectedStrategy.trades.toString()} color="#ffc000" icon={<BarChart3 size={14} />} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Equity Curve */}
        <div className="excel-card col-span-2">
          <div className="excel-card-header">
            <Activity size={12} />
            <span>EQUITY CURVE — PORTFOLIO VALUE OVER TIME</span>
            <span className="ml-auto text-[10px] text-[#666]">₹ {capital.toLocaleString('en-IN')} → ₹ {Math.round(finalValue).toLocaleString('en-IN')}</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={equityCurve}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#666' }} />
                <YAxis tick={{ fontSize: 10, fill: '#666' }} tickFormatter={(v) => '₹' + (v / 100000).toFixed(1) + 'L'} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} formatter={(v: any) => '₹' + Number(v).toLocaleString('en-IN')} />
                <ReferenceLine y={capital} stroke="#666" strokeDasharray="3 3" label={{ value: 'Initial Capital', fontSize: 9, fill: '#666' }} />
                <Line type="monotone" dataKey="equity" stroke="#107c41" strokeWidth={2.5} dot={false} name="Equity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategy Comparison */}
        <div className="excel-card">
          <div className="excel-card-header">
            <Settings2 size={12} />
            <span>STRATEGY COMPARISON — RETURNS %</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={backtestStrategies} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#666' }} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: '#333' }} width={100} />
                <Tooltip contentStyle={{ fontSize: 10, padding: 4 }} formatter={(v: any) => Number(v).toFixed(2) + '%'} />
                <Bar dataKey="returns" radius={[0, 4, 4, 0]}>
                  {backtestStrategies.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk-Return Scatter */}
      <div className="grid grid-cols-2 gap-3">
        <div className="excel-card">
          <div className="excel-card-header">
            <Activity size={12} />
            <span>RISK vs RETURN SCATTER PLOT</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis type="number" dataKey="drawdown" name="Risk (Drawdown)" tick={{ fontSize: 10, fill: '#666' }} unit="%" domain={[-20, 0]} />
                <YAxis type="number" dataKey="returns" name="Return" tick={{ fontSize: 10, fill: '#666' }} unit="%" domain={[15, 40]} />
                <ZAxis type="number" dataKey="sharpe" range={[100, 600]} name="Sharpe" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ fontSize: 11, padding: 4 }} />
                <Scatter data={backtestStrategies}>
                  {backtestStrategies.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Returns */}
        <div className="excel-card">
          <div className="excel-card-header">
            <BarChart3 size={12} />
            <span>MONTHLY RETURNS — {period}</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis tick={{ fontSize: 10, fill: '#666' }} unit="%" />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} formatter={(v: any) => Number(v).toFixed(2) + '%'} />
                <ReferenceLine y={0} stroke="#666" />
                <Bar dataKey="returns" radius={[4, 4, 0, 0]}>
                  {monthlyReturns.map((entry, i) => (
                    <Cell key={i} fill={entry.returns >= 0 ? '#107c41' : '#c00000'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trade Log */}
      <div className="excel-card">
        <div className="excel-card-header">
          <FlaskConical size={12} />
          <span>RECENT TRADE LOG — {selectedStrategy.name}</span>
        </div>
        <table className="w-full text-[11px]">
          <thead>
            <tr>
              {['Date', 'Symbol', 'Action', 'Qty', 'Entry ₹', 'Exit ₹', 'P&L ₹', 'P&L %', 'Hold Days', 'Result'].map(h => (
                <th key={h} className="excel-grid-header px-2 py-1.5 text-right">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => {
              const stock = nifty50Stocks[i + 5];
              const isWin = Math.random() > 0.35;
              const qty = Math.floor(Math.random() * 100) + 10;
              const entry = stock.price * (0.9 + Math.random() * 0.15);
              const exit = isWin ? entry * (1 + Math.random() * 0.08) : entry * (0.92 + Math.random() * 0.05);
              const pl = (exit - entry) * qty;
              const plPct = ((exit - entry) / entry) * 100;
              const date = new Date();
              date.setDate(date.getDate() - (i * 3 + 2));
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} style={{ borderBottom: '1px solid #e8e8e8' }}>
                  <td className="excel-cell text-left font-mono">{date.toLocaleDateString('en-IN')}</td>
                  <td className="excel-cell text-left font-semibold text-[#107c41]">{stock.symbol}</td>
                  <td className={`excel-cell text-right font-mono font-bold ${Math.random() > 0.5 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
                    {Math.random() > 0.5 ? '▲ BUY' : '▼ SELL'}
                  </td>
                  <td className="excel-cell text-right font-mono">{qty}</td>
                  <td className="excel-cell text-right font-mono">₹{entry.toFixed(2)}</td>
                  <td className="excel-cell text-right font-mono">₹{exit.toFixed(2)}</td>
                  <td className={`excel-cell text-right font-mono font-bold ${pl >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
                    {pl >= 0 ? '+' : ''}₹{pl.toFixed(0)}
                  </td>
                  <td className={`excel-cell text-right font-mono font-bold ${plPct >= 0 ? 'bg-[#e8f5e9] text-[#107c41]' : 'bg-[#ffebee] text-[#c00000]'}`}>
                    {plPct >= 0 ? '▲' : '▼'} {Math.abs(plPct).toFixed(2)}%
                  </td>
                  <td className="excel-cell text-right font-mono">{Math.floor(Math.random() * 20) + 2}</td>
                  <td className="excel-cell text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${isWin ? 'bg-[#e8f5e9] text-[#0a5a30]' : 'bg-[#ffebee] text-[#c00000]'}`}>
                      {isWin ? 'WIN' : 'LOSS'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtitle, color, icon }: { label: string; value: string; subtitle?: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="excel-card">
      <div className="p-2.5">
        <div className="flex items-center justify-between text-[10px] text-[#666] uppercase">
          <span>{label}</span>
          <span style={{ color }}>{icon}</span>
        </div>
        <div className="text-base font-bold font-mono mt-0.5" style={{ color }}>{value}</div>
        {subtitle && <div className="text-[10px] text-[#666]">{subtitle}</div>}
      </div>
    </div>
  );
}
