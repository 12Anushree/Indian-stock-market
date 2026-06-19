import { FileSpreadsheet, Edit3, Eye, BarChart3, Calculator, Save, Download, Printer, Undo2, Redo2, Search } from 'lucide-react';

interface ExcelRibbonProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ExcelRibbon({ activeTab, onTabChange }: ExcelRibbonProps) {
  return (
    <div className="bg-gradient-to-b from-[#f8f8f8] to-[#e8e8e8] border-b border-[#b4b4b4]">
      {/* Title bar */}
      <div className="bg-gradient-to-r from-[#ff9933] via-[#217346] to-[#138808] px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white text-xs drop-shadow">
          <FileSpreadsheet size={14} />
          <span className="font-bold">📊 NSE Market Analytics Dashboard 2026</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono">₹ INR</span>
          <span className="text-white/90 text-[10px]">— Indian Stock Market Live — भारतीय शेयर बाज़ार</span>
        </div>
        <div className="flex items-center gap-3 text-white text-[11px]">
          <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded font-semibold">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE NSE
          </span>
          <span className="font-mono">15:42:18 IST • 14 Feb 2026</span>
        </div>
      </div>

      {/* Quick Access Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-[#d4d4d4] bg-gradient-to-b from-[#fafafa] to-[#ededed]">
        <button className="p-1 hover:bg-white/60 rounded" title="Save"><Save size={14} className="text-[#107c41]" /></button>
        <button className="p-1 hover:bg-white/60 rounded" title="Undo"><Undo2 size={14} className="text-[#666]" /></button>
        <button className="p-1 hover:bg-white/60 rounded" title="Redo"><Redo2 size={14} className="text-[#666]" /></button>
        <div className="w-px h-4 bg-[#c4c4c4] mx-1" />
        <button className="p-1 hover:bg-white/60 rounded" title="Print"><Printer size={14} className="text-[#666]" /></button>
        <button className="p-1 hover:bg-white/60 rounded" title="Export"><Download size={14} className="text-[#666]" /></button>
        <div className="flex-1" />
        <div className="flex items-center bg-white border border-[#c4c4c4] rounded px-2 py-0.5 text-[11px] text-[#666] gap-1">
          <Search size={11} />
          <span>Search stocks, news, indicators...</span>
        </div>
      </div>

      {/* Ribbon tabs */}
      <div className="flex items-end px-2 pt-1 gap-0.5 border-b border-[#a0a0a0]">
        {['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View', 'Analytics'].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 text-[11px] hover:bg-white/40 ${
              tab === 'Analytics' ? 'bg-white text-[#107c41] font-semibold border-t border-l border-r border-[#a0a0a0] -mb-px' : 'text-[#444]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon content - Analytics Tools */}
      <div className="flex items-stretch bg-gradient-to-b from-white to-[#f5f5f5] px-2 py-2 gap-2 border-b border-[#b4b4b4]">
        <RibbonGroup icon={<Calculator size={14} />} label="Formulas">
          <button onClick={() => onTabChange('overview')} className={`ribbon-btn ${activeTab === 'overview' ? 'active' : ''}`}>📊 SUMIF</button>
          <button onClick={() => onTabChange('technicals')} className={`ribbon-btn ${activeTab === 'technicals' ? 'active' : ''}`}>📈 VLOOKUP</button>
          <button onClick={() => onTabChange('portfolio')} className={`ribbon-btn ${activeTab === 'portfolio' ? 'active' : ''}`}>💰 XIRR</button>
        </RibbonGroup>

        <div className="w-px bg-[#d4d4d4]" />

        <RibbonGroup icon={<BarChart3 size={14} />} label="Charts">
          <button onClick={() => onTabChange('technicals')} className="ribbon-btn">📊 Candlestick</button>
          <button onClick={() => onTabChange('technicals')} className="ribbon-btn">📉 Line</button>
          <button onClick={() => onTabChange('overview')} className="ribbon-btn">🌊 Heat Map</button>
        </RibbonGroup>

        <div className="w-px bg-[#d4d4d4]" />

        <RibbonGroup icon={<Eye size={14} />} label="Indicators">
          <button onClick={() => onTabChange('technicals')} className="ribbon-btn">RSI</button>
          <button onClick={() => onTabChange('technicals')} className="ribbon-btn">MACD</button>
          <button onClick={() => onTabChange('technicals')} className="ribbon-btn">SMA/EMA</button>
          <button onClick={() => onTabChange('technicals')} className="ribbon-btn">BB</button>
        </RibbonGroup>

        <div className="w-px bg-[#d4d4d4]" />

        <RibbonGroup icon={<Edit3 size={14} />} label="Analysis">
          <button onClick={() => onTabChange('sectors')} className="ribbon-btn">🏦 Sectors</button>
          <button onClick={() => onTabChange('backtest')} className="ribbon-btn">🔬 Backtest</button>
          <button onClick={() => onTabChange('news')} className="ribbon-btn">📰 News</button>
        </RibbonGroup>

        <div className="flex-1" />

        <div className="flex flex-col items-end justify-center text-[10px] text-[#666]">
          <span className="font-mono">Last Refresh: 15:42:00</span>
          <span className="text-[#107c41] font-semibold">● LIVE FEED</span>
        </div>
      </div>

      <style>{`
        .ribbon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4px 10px;
          font-size: 10px;
          background: white;
          border: 1px solid #d4d4d4;
          border-radius: 2px;
          min-width: 56px;
          color: #333;
          transition: all 0.1s;
        }
        .ribbon-btn:hover {
          background: #f0f8f4;
          border-color: #107c41;
        }
        .ribbon-btn.active {
          background: #107c41;
          color: white;
          border-color: #0a5a30;
        }
      `}</style>
    </div>
  );
}

function RibbonGroup({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 px-1 pb-1 text-[10px] text-[#666]">
        {icon}
        <span className="font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}
