import { useState } from 'react';
import ExcelRibbon from './components/ExcelRibbon';
import TickerTape from './components/TickerTape';
import Overview from './components/Overview';
import TechnicalAnalysis from './components/TechnicalAnalysis';
import SectorPerformance from './components/SectorPerformance';
import PortfolioTracking from './components/PortfolioTracking';
import Backtesting from './components/Backtesting';
import NewsSentiment from './components/NewsSentiment';
import { LayoutDashboard, BarChart3, Layers, Briefcase, FlaskConical, Newspaper, Maximize2 } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Market Overview', icon: LayoutDashboard },
  { id: 'technicals', label: 'Technical Analysis', icon: BarChart3 },
  { id: 'sectors', label: 'Sector Performance', icon: Layers },
  { id: 'portfolio', label: 'Portfolio Tracker', icon: Briefcase },
  { id: 'backtest', label: 'Backtest Engine', icon: FlaskConical },
  { id: 'news', label: 'News & Sentiment', icon: Newspaper },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'technicals': return <TechnicalAnalysis />;
      case 'sectors': return <SectorPerformance />;
      case 'portfolio': return <PortfolioTracking />;
      case 'backtest': return <Backtesting />;
      case 'news': return <NewsSentiment />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      {/* Excel Title + Ribbon */}
      <ExcelRibbon activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Rupee Notes color decorative band */}
      <div className="flex h-1">
        <div className="flex-1 bg-[#ff9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      {/* Ticker Tape */}
      <TickerTape />

      {/* Formula Bar (Excel style) */}
      <div className="bg-gradient-to-b from-[#fafafa] to-[#ededed] border-b border-[#b4b4b4] px-2 py-1 flex items-center gap-2 text-[11px]">
        <span className="font-bold text-[#107c41]">₹</span>
        <div className="bg-white border border-[#c4c4c4] rounded px-2 py-0.5 font-mono w-12 text-center text-[#666]">
          {activeTab === 'overview' ? 'A1' : activeTab === 'technicals' ? 'B5' : activeTab === 'sectors' ? 'C2' : activeTab === 'portfolio' ? 'D8' : activeTab === 'backtest' ? 'E3' : 'F6'}
        </div>
        <span className="text-[#666] font-mono">fx</span>
        <div className="flex-1 bg-white border border-[#c4c4c4] rounded px-2 py-0.5 font-mono text-[#1f1f1f] flex items-center">
          <span className="text-[#666] mr-2">=</span>
          <span>NSE.LIVEPRICE("{TABS.find(t => t.id === activeTab)?.label}") · ₹ INR · Real-time analytics · Indian Stock Market 2026</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-[#666]">Zoom:</span>
          <button className="px-1.5 py-0.5 hover:bg-white rounded text-[#444]">−</button>
          <span className="font-mono text-[#666]">100%</span>
          <button className="px-1.5 py-0.5 hover:bg-white rounded text-[#444]">+</button>
        </div>
        <button className="p-1 hover:bg-white rounded" title="Fullscreen">
          <Maximize2 size={12} className="text-[#666]" />
        </button>
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-auto p-3 bg-[#f3f3f3]">
        {renderContent()}
      </main>

      {/* Sheet Tabs */}
      <div className="bg-gradient-to-b from-[#ededed] to-[#d4d4d4] border-t border-[#a0a0a0] px-2 pt-2 flex items-center gap-0.5">
        <div className="flex items-center gap-0.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`excel-tab flex items-center gap-1.5 ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon size={11} />
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="flex-1" />
        <button className="excel-tab flex items-center gap-1 text-[#666]">
          <span className="text-base leading-none">+</span> New Sheet
        </button>
        <div className="ml-2 flex items-center gap-1 text-[10px] text-[#666]">
          <button className="w-5 h-5 hover:bg-white rounded flex items-center justify-center">◀</button>
          <button className="w-5 h-5 hover:bg-white rounded flex items-center justify-center">▶</button>
          <span className="ml-2 font-mono">Sheet {TABS.findIndex(t => t.id === activeTab) + 1} of {TABS.length}</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-[#107c41] via-[#0a5a30] to-[#107c41] px-3 py-1 flex items-center justify-between text-white text-[10px]">
        <div className="flex items-center gap-4">
          <span className="font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> READY</span>
          <span>NSE: 15:42 IST</span>
          <span>Last Update: 2 sec ago</span>
          <span>Average: ₹{Math.round(24852.65).toLocaleString('en-IN')}</span>
          <span>Count: 50 stocks tracked</span>
        </div>
        <div className="flex items-center gap-3">
          <span>📊 Sum: ₹4,21,852</span>
          <span>📈 Adv: 32 | Dec: 18</span>
          <span className="font-semibold">🇮🇳 BSE Sensex: 81,842.30 (+0.76%)</span>
          <button className="bg-white/20 px-2 py-0.5 rounded hover:bg-white/30">⚙ Settings</button>
        </div>
      </div>
    </div>
  );
}
