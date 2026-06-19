import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Newspaper, TrendingUp, TrendingDown, Minus, ExternalLink, Clock, Filter, Sparkles } from 'lucide-react';
import { newsItems } from '../data/marketData';

const SENTIMENT_COLORS = {
  positive: '#107c41',
  negative: '#c00000',
  neutral: '#ffc000',
};

export default function NewsSentiment() {
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [sectorFilter, setSectorFilter] = useState('All');

  const sectors = ['All', 'Banking', 'IT', 'Pharma', 'Auto', 'Energy', 'Telecom', 'FMCG', 'Market'];

  const filteredNews = useMemo(() => {
    return newsItems.filter(n => {
      if (filter !== 'all' && n.sentiment !== filter) return false;
      if (sectorFilter !== 'All' && n.sector !== sectorFilter) return false;
      return true;
    });
  }, [filter, sectorFilter]);

  const sentimentData = useMemo(() => {
    const counts = { positive: 0, negative: 0, neutral: 0 };
    newsItems.forEach(n => counts[n.sentiment as keyof typeof counts]++);
    return [
      { name: 'Positive', value: counts.positive, color: SENTIMENT_COLORS.positive },
      { name: 'Negative', value: counts.negative, color: SENTIMENT_COLORS.negative },
      { name: 'Neutral', value: counts.neutral, color: SENTIMENT_COLORS.neutral },
    ];
  }, []);

  const sentimentScore = useMemo(() => {
    const total = newsItems.length;
    const score = (sentimentData[0].value - sentimentData[1].value) / total * 100;
    return Math.round(score);
  }, [sentimentData]);

  const sectorSentiment = useMemo(() => {
    const map: Record<string, { pos: number; neg: number; neu: number }> = {};
    newsItems.forEach(n => {
      if (!map[n.sector]) map[n.sector] = { pos: 0, neg: 0, neu: 0 };
      if (n.sentiment === 'positive') map[n.sector].pos++;
      else if (n.sentiment === 'negative') map[n.sector].neg++;
      else map[n.sector].neu++;
    });
    return Object.entries(map).map(([sector, data]) => ({
      sector,
      positive: data.pos,
      negative: -data.neg,
    }));
  }, []);

  const sentimentLabel = sentimentScore > 20 ? 'EXTREMELY BULLISH' : sentimentScore > 5 ? 'BULLISH' : sentimentScore > -5 ? 'NEUTRAL' : sentimentScore > -20 ? 'BEARISH' : 'EXTREMELY BEARISH';
  const sentimentColor = sentimentScore > 5 ? '#107c41' : sentimentScore < -5 ? '#c00000' : '#ffc000';

  return (
    <div className="space-y-3">
      {/* Sentiment Score Header */}
      <div className="grid grid-cols-4 gap-3">
        <div className="excel-card col-span-1" style={{ borderTop: `4px solid ${sentimentColor}` }}>
          <div className="p-4 text-center">
            <Sparkles size={20} className="mx-auto mb-1" style={{ color: sentimentColor }} />
            <div className="text-[10px] text-[#666] uppercase">Market Sentiment Score</div>
            <div className="text-3xl font-bold font-mono mt-1" style={{ color: sentimentColor }}>
              {sentimentScore > 0 ? '+' : ''}{sentimentScore}
            </div>
            <div className="text-xs font-bold mt-1" style={{ color: sentimentColor }}>{sentimentLabel}</div>
            <div className="text-[10px] text-[#666] mt-2">Based on {newsItems.length} news items</div>
          </div>
        </div>

        <div className="excel-card col-span-1">
          <div className="excel-card-header">
            <Filter size={12} />
            <span>SENTIMENT BREAKDOWN</span>
          </div>
          <div className="p-2" style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                  {sentimentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 text-[10px] px-1">
              {sentimentData.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded" style={{ backgroundColor: s.color }}></span>
                  <span className="flex-1">{s.name}</span>
                  <span className="font-mono font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="excel-card col-span-2">
          <div className="excel-card-header">
            <Newspaper size={12} />
            <span>SECTOR-WISE SENTIMENT — POSITIVE vs NEGATIVE</span>
          </div>
          <div className="p-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sectorSentiment} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis type="category" dataKey="sector" tick={{ fontSize: 10, fill: '#333' }} width={60} />
                <Tooltip contentStyle={{ fontSize: 11, padding: 4 }} />
                <Bar dataKey="positive" fill="#107c41" radius={[0, 4, 4, 0]} name="Positive" stackId="a" />
                <Bar dataKey="negative" fill="#c00000" radius={[4, 0, 0, 4]} name="Negative" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="excel-card">
        <div className="excel-card-header bg-gradient-to-r from-[#107c41] to-[#0a5a30] text-white">
          <Newspaper size={12} />
          <span>NEWS & SENTIMENT FEED — LIVE MARKET INTELLIGENCE</span>
        </div>
        <div className="px-3 py-2 flex items-center gap-2 flex-wrap border-b border-[#e0e0e0] bg-[#fafafa]">
          <span className="text-[10px] text-[#666] font-semibold uppercase mr-1">Sentiment:</span>
          {(['all', 'positive', 'negative', 'neutral'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded text-[10px] font-semibold capitalize ${
                filter === f ? 'bg-[#107c41] text-white' : 'bg-white text-[#444] border border-[#d4d4d4] hover:bg-[#f0f8f4]'
              }`}
            >
              {f === 'positive' && '🟢 '}{f === 'negative' && '🔴 '}{f === 'neutral' && '🟡 '}{f}
            </button>
          ))}
          <div className="w-px h-5 bg-[#d4d4d4] mx-1" />
          <span className="text-[10px] text-[#666] font-semibold uppercase mr-1">Sector:</span>
          {sectors.map(s => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-2 py-1 rounded text-[10px] font-semibold ${
                sectorFilter === s ? 'bg-[#107c41] text-white' : 'bg-white text-[#444] border border-[#d4d4d4] hover:bg-[#f0f8f4]'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-[#666]">{filteredNews.length} of {newsItems.length} articles</span>
        </div>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-2 gap-3">
        {filteredNews.map((news, i) => {
          const SentimentIcon = news.sentiment === 'positive' ? TrendingUp : news.sentiment === 'negative' ? TrendingDown : Minus;
          const sentimentBg = SENTIMENT_COLORS[news.sentiment as keyof typeof SENTIMENT_COLORS];
          return (
            <div key={i} className="news-card excel-card overflow-hidden">
              <div className="flex">
                <div className="w-1" style={{ backgroundColor: sentimentBg }}></div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[12px] font-semibold text-[#1f1f1f] leading-tight flex-1">{news.title}</h3>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase flex items-center gap-0.5"
                        style={{ backgroundColor: sentimentBg }}
                      >
                        <SentimentIcon size={9} />
                        {news.sentiment}
                      </span>
                      <span className={`text-[9px] font-semibold uppercase px-1 rounded ${news.impact === 'High' ? 'bg-[#ffebee] text-[#c00000]' : 'bg-[#fff8e1] text-[#f57c00]'}`}>
                        {news.impact} Impact
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#555] mt-1.5 leading-snug">{news.summary}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#666]">
                    <span className="font-semibold">{news.source}</span>
                    <span className="flex items-center gap-0.5"><Clock size={9} /> {news.time}</span>
                    <span className="px-1.5 py-0.5 bg-[#f0f8f4] text-[#0a5a30] rounded font-semibold">{news.sector}</span>
                    <span className="ml-auto flex items-center gap-0.5 text-[#107c41] font-semibold cursor-pointer">
                      Read more <ExternalLink size={9} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNews.length === 0 && (
        <div className="excel-card p-8 text-center text-[#666]">
          <Newspaper size={32} className="mx-auto mb-2 opacity-30" />
          <div className="text-sm">No news articles match the selected filters.</div>
        </div>
      )}
    </div>
  );
}
