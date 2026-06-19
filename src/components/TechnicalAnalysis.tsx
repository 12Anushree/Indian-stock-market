import { useMemo, useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, LineChart
} from 'recharts';
import { TrendingUp, Activity, BarChart3, Settings2 } from 'lucide-react';
import { nifty50Stocks, generateOHLC } from '../data/marketData';
import { sma, ema, rsi, macd, formatINR } from '../utils/format';

const INDICATORS = [
  { id: 'sma20', label: 'SMA 20', color: '#5b9bd5' },
  { id: 'sma50', label: 'SMA 50', color: '#ffc000' },
  { id: 'ema12', label: 'EMA 12', color: '#7030a0' },
  { id: 'ema26', label: 'EMA 26', color: '#ed7d31' },
];

export default function TechnicalAnalysis() {
  const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['sma20', 'sma50']);
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');

  const stock = nifty50Stocks.find(s => s.symbol === selectedSymbol) || nifty50Stocks[0];

  const ohlcData = useMemo(() => generateOHLC(stock.price, 60, selectedSymbol), [stock, selectedSymbol]);

  const closePrices = ohlcData.map(d => d.close);

  const enrichedData = useMemo(() => {
    const sma20 = sma(closePrices, 20);
    const sma50 = sma(closePrices, 50);
    const ema12 = ema(closePrices, 12);
    const ema26 = ema(closePrices, 26);
    return ohlcData.map((d, i) => ({
      ...d,
      sma20: sma20[i] !== null ? +(sma20[i] as number).toFixed(2) : null,
      sma50: sma50[i] !== null ? +(sma50[i] as number).toFixed(2) : null,
      ema12: ema12[i] !== null ? +(ema12[i] as number).toFixed(2) : null,
      ema26: ema26[i] !== null ? +(ema26[i] as number).toFixed(2) : null,
      candleRange: [d.low, d.high],
      isUp: d.close >= d.open,
    }));
  }, [ohlcData, closePrices]);

  const rsiData = useMemo(() => {
    const values = rsi(closePrices, 14);
    return ohlcData.map((d, i) => ({
      date: d.date,
      rsi: values[i] !== null ? +(values[i] as number).toFixed(2) : null,
    }));
  }, [ohlcData, closePrices]);

  const macdData = useMemo(() => {
    const m = macd(closePrices);
    return ohlcData.map((d, i) => ({
      date: d.date,
      macd: m.macd[i] !== null ? +(m.macd[i] as number).toFixed(2) : null,
      signal: m.signal[i] !== null ? +(m.signal[i] as number).toFixed(2) : null,
      histogram: m.histogram[i] !== null ? +(m.histogram[i] as number).toFixed(2) : null,
    }));
  }, [ohlcData, closePrices]);

  const currentRSI = rsiData[rsiData.length - 1].rsi || 0;
  const rsiSignal = currentRSI > 70 ? 'Overbought' : currentRSI < 30 ? 'Oversold' : 'Neutral';
  const rsiColor = currentRSI > 70 ? '#c00000' : currentRSI < 30 ? '#107c41' : '#ffc000';

  const currentMACD = macdData[macdData.length - 1];
  const macdSignal = currentMACD.macd !== null && currentMACD.signal !== null && currentMACD.macd > currentMACD.signal ? 'Bullish' : 'Bearish';
  const macdColor = macdSignal === 'Bullish' ? '#107c41' : '#c00000';

  const toggleIndicator = (id: string) => {
    setActiveIndicators(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const CustomCandle = (props: any) => {
    const { x, width, payload } = props;
    if (!payload || !payload.open) return null;
    const { open, close, high, low, isUp } = payload;
    const yScale = props.yScale || ((v: number) => v);
    const o = yScale(open);
    const c = yScale(close);
    const h = yScale(high);
    const l = yScale(low);
    const color = isUp ? '#107c41' : '#c00000';
    const bodyTop = Math.min(o, c);
    const bodyHeight = Math.max(Math.abs(o - c), 1);
    return (
      <g>
        <line x1={x + width / 2} y1={h} x2={x + width / 2} y2={l} stroke={color} strokeWidth={1} />
        <rect x={x + width * 0.15} y={bodyTop} width={width * 0.7} height={bodyHeight} fill={color} stroke={color} />
      </g>
    );
  };

  return (
    <div className="space-y-3">
      {/* Stock Selector & Header */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#107c41] to-[#0a5a30] text-white">
          <BarChart3 size={12} />
          <span>REAL-TIME TECHNICAL ANALYSIS — {selectedSymbol}</span>
          <div className="ml-auto flex items-center gap-2 text-[10px]">
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] border border-white/30 outline-none"
            >
              {nifty50Stocks.map(s => (
                <option key={s.symbol} value={s.symbol} className="text-black">{s.symbol} — {s.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-3 grid grid-cols-6 gap-3">
          <div>
            <div className="text-[10px] text-[#666] uppercase">LTP</div>
            <div className="text-xl font-bold font-mono text-[#107c41]">₹{formatINR(stock.price)}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase">Change</div>
            <div className={`text-base font-bold font-mono ${stock.change >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
              {stock.change >= 0 ? '+' : ''}{formatINR(stock.change)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase">Change %</div>
            <div className={`text-base font-bold font-mono ${stock.changePct >= 0 ? 'text-[#107c41]' : 'text-[#c00000]'}`}>
              {stock.changePct >= 0 ? '▲' : '▼'} {Math.abs(stock.changePct).toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase">Day High / Low</div>
            <div className="text-xs font-mono">₹{formatINR(stock.high)} / ₹{formatINR(stock.low)}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase">Volume</div>
            <div className="text-xs font-mono">{(stock.volume / 1e5).toFixed(2)}L</div>
          </div>
          <div>
            <div className="text-[10px] text-[#666] uppercase">Mkt Cap</div>
            <div className="text-xs font-mono">₹{(stock.marketCap / 100000).toFixed(2)} L Cr</div>
          </div>
        </div>
      </div>

      {/* Indicators Panel */}
      <div className="excel-card">
        <div className="excel-card-header">
          <Settings2 size={12} />
          <span>INDICATORS PANEL — SMA / EMA OVERLAYS</span>
        </div>
        <div className="p-3 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-[#444] mr-2">Chart Type:</span>
          <button
            onClick={() => setChartType('candle')}
            className={`px-3 py-1 text-[11px] rounded border ${chartType === 'candle' ? 'bg-[#107c41] text-white border-[#0a5a30]' : 'bg-white text-[#444] border-[#d4d4d4] hover:bg-[#f0f8f4]'}`}
          >
            🕯️ Candlestick
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 text-[11px] rounded border ${chartType === 'line' ? 'bg-[#107c41] text-white border-[#0a5a30]' : 'bg-white text-[#444] border-[#d4d4d4] hover:bg-[#f0f8f4]'}`}
          >
            📈 Line Chart
          </button>
          <div className="w-px h-6 bg-[#d4d4d4] mx-2" />
          <span className="text-[11px] font-semibold text-[#444] mr-2">Overlays:</span>
          {INDICATORS.map(ind => (
            <button
              key={ind.id}
              onClick={() => toggleIndicator(ind.id)}
              className={`px-3 py-1 text-[11px] rounded border flex items-center gap-1 ${
                activeIndicators.includes(ind.id)
                  ? 'border-transparent text-white'
                  : 'bg-white text-[#666] border-[#d4d4d4]'
              }`}
              style={activeIndicators.includes(ind.id) ? { backgroundColor: ind.color } : {}}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ind.color }}></span>
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* Candlestick + Volume Chart */}
      <div className="excel-card">
        <div className="excel-card-header">
          <Activity size={12} />
          <span>OHLC CANDLESTICK + VOLUME BARS — {chartType === 'candle' ? 'Daily (₹)' : 'Line View'}</span>
          <span className="ml-auto text-[10px] text-[#666] font-normal">Last 60 sessions</span>
        </div>
        <div className="p-2">
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart data={enrichedData} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#666' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#666' }} domain={['dataMin - 50', 'dataMax + 50']} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#666' }} />
              <Tooltip
                contentStyle={{ fontSize: 11, padding: 6, border: '1px solid #107c41', borderRadius: 2 }}
                formatter={(value: any, name: any) => {
                  if (name === 'Volume') return [(Number(value) / 1e5).toFixed(2) + 'L', 'Volume'];
                  return ['₹' + Number(value).toFixed(2), String(name)];
                }}
              />
              {/* Volume bars */}
              <Bar yAxisId="right" dataKey="volume" fill="#b4d4b8" opacity={0.5} />
              {/* Candlestick as Bar */}
              {chartType === 'candle' && (
                <Bar
                  yAxisId="left"
                  dataKey={(d: any) => [d.low, d.high]}
                  fill="#107c41"
                  shape={<CustomCandle />}
                />
              )}
              {/* Line chart alternative */}
              {chartType === 'line' && (
                <Line yAxisId="left" type="monotone" dataKey="close" stroke="#107c41" strokeWidth={2} dot={false} name="Close" />
              )}
              {/* Indicator lines */}
              {activeIndicators.includes('sma20') && <Line yAxisId="left" type="monotone" dataKey="sma20" stroke="#5b9bd5" strokeWidth={1.5} dot={false} name="SMA 20" />}
              {activeIndicators.includes('sma50') && <Line yAxisId="left" type="monotone" dataKey="sma50" stroke="#ffc000" strokeWidth={1.5} dot={false} name="SMA 50" />}
              {activeIndicators.includes('ema12') && <Line yAxisId="left" type="monotone" dataKey="ema12" stroke="#7030a0" strokeWidth={1.5} dot={false} name="EMA 12" />}
              {activeIndicators.includes('ema26') && <Line yAxisId="left" type="monotone" dataKey="ema26" stroke="#ed7d31" strokeWidth={1.5} dot={false} name="EMA 26" />}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RSI & MACD */}
      <div className="grid grid-cols-2 gap-3">
        {/* RSI */}
        <div className="excel-card">
          <div className="excel-card-header">
            <Activity size={12} />
            <span>RSI (14) — Relative Strength Index</span>
            <span className="ml-auto text-[10px] font-mono" style={{ color: rsiColor }}>{currentRSI.toFixed(2)} — {rsiSignal}</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={rsiData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#666' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#666' }} ticks={[0, 30, 50, 70, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} />
                <ReferenceLine y={70} stroke="#c00000" strokeDasharray="3 3" label={{ value: 'Overbought 70', position: 'insideTopRight', fontSize: 9, fill: '#c00000' }} />
                <ReferenceLine y={30} stroke="#107c41" strokeDasharray="3 3" label={{ value: 'Oversold 30', position: 'insideBottomRight', fontSize: 9, fill: '#107c41' }} />
                <ReferenceLine y={50} stroke="#999" strokeDasharray="2 2" />
                <Line type="monotone" dataKey="rsi" stroke={rsiColor} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MACD */}
        <div className="excel-card">
          <div className="excel-card-header">
            <TrendingUp size={12} />
            <span>MACD (12, 26, 9) — Signal: {macdSignal}</span>
            <span className="ml-auto text-[10px] font-mono" style={{ color: macdColor }}>{currentMACD.macd?.toFixed(2)} / {currentMACD.signal?.toFixed(2)}</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart data={macdData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#666' }} />
                <YAxis tick={{ fontSize: 10, fill: '#666' }} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} />
                <ReferenceLine y={0} stroke="#999" />
                <Bar dataKey="histogram" fill="#5b9bd5" />
                <Line type="monotone" dataKey="macd" stroke="#107c41" strokeWidth={2} dot={false} name="MACD" />
                <Line type="monotone" dataKey="signal" stroke="#ed7d31" strokeWidth={2} dot={false} name="Signal" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Signal Summary */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#ffc000] to-[#ff9933] text-white">
          <Activity size={12} />
          <span>TRADING SIGNAL SUMMARY — ALGORITHMIC ANALYSIS</span>
        </div>
        <div className="p-3 grid grid-cols-5 gap-2 text-[11px]">
          <SignalCell label="SMA Crossover" value={enrichedData[enrichedData.length - 1].sma20! > enrichedData[enrichedData.length - 1].sma50! ? 'BULLISH' : 'BEARISH'} bullish={enrichedData[enrichedData.length - 1].sma20! > enrichedData[enrichedData.length - 1].sma50!} />
          <SignalCell label="RSI (14)" value={rsiSignal.toUpperCase()} bullish={currentRSI > 50 && currentRSI < 70} neutral={rsiSignal === 'Neutral'} />
          <SignalCell label="MACD" value={macdSignal.toUpperCase()} bullish={macdSignal === 'Bullish'} />
          <SignalCell label="EMA 12/26" value={enrichedData[enrichedData.length - 1].ema12! > enrichedData[enrichedData.length - 1].ema26! ? 'BULLISH' : 'BEARISH'} bullish={enrichedData[enrichedData.length - 1].ema12! > enrichedData[enrichedData.length - 1].ema26!} />
          <SignalCell label="Volume Trend" value={enrichedData[enrichedData.length - 1].volume > enrichedData[enrichedData.length - 5].volume ? 'HIGH' : 'LOW'} bullish={enrichedData[enrichedData.length - 1].volume > enrichedData[enrichedData.length - 5].volume} />
        </div>
        <div className="px-3 pb-3 text-[10px] text-[#666]">
          <span className="font-semibold">Overall Verdict:</span> <span className="text-[#107c41] font-bold">
            {stock.changePct > 0 ? '▲ BULLISH — Accumulate on dips' : '▼ CAUTIOUS — Wait for confirmation'}
          </span>
          <span className="ml-3">| Recommended: {stock.changePct > 0 ? 'BUY' : 'HOLD'} | Target: ₹{formatINR(stock.price * 1.08)} | Stop Loss: ₹{formatINR(stock.price * 0.95)}</span>
        </div>
      </div>
    </div>
  );
}

function SignalCell({ label, value, bullish, neutral }: { label: string; value: string; bullish?: boolean; neutral?: boolean }) {
  const bg = neutral ? '#ffc000' : bullish ? '#107c41' : '#c00000';
  return (
    <div className="border border-[#d4d4d4] rounded p-2">
      <div className="text-[10px] text-[#666] uppercase">{label}</div>
      <div className="text-sm font-bold mt-1" style={{ color: bg }}>{value}</div>
    </div>
  );
}
