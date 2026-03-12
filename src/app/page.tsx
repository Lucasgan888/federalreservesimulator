"use client";

import { useState, useCallback } from "react";
import {
  getScenarios,
  createInitialState,
  applyDecision,
  calculateScore,
  TOTAL_QUARTERS,
  type EconomicState,
  type PolicyDecision,
  type QuarterEvent,
} from "@/lib/economy";

function StatCard({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700 text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-default">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
      <p className={`text-xl sm:text-2xl font-bold ${color}`}>{value}<span className="text-sm text-slate-400 dark:text-slate-500 ml-0.5">{unit}</span></p>
    </div>
  );
}

function Dashboard({ state }: { state: EconomicState }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      <StatCard label="GDP Growth" value={state.gdpGrowth.toFixed(1)} unit="%" color={state.gdpGrowth >= 0 ? "text-green-400" : "text-red-400"} />
      <StatCard label="Unemployment" value={state.unemployment.toFixed(1)} unit="%" color={state.unemployment <= 5 ? "text-green-400" : state.unemployment <= 8 ? "text-yellow-400" : "text-red-400"} />
      <StatCard label="Inflation" value={state.inflation.toFixed(1)} unit="%" color={Math.abs(state.inflation - 2) <= 1 ? "text-green-400" : Math.abs(state.inflation - 2) <= 3 ? "text-yellow-400" : "text-red-400"} />
      <StatCard label="Fed Funds Rate" value={state.fedFundsRate.toFixed(2)} unit="%" color="text-blue-400" />
      <StatCard label="Consumer Confidence" value={state.consumerConfidence.toFixed(0)} unit="" color={state.consumerConfidence >= 60 ? "text-green-400" : state.consumerConfidence >= 40 ? "text-yellow-400" : "text-red-400"} />
      <StatCard label="Stock Market" value={state.stockMarket.toLocaleString()} unit="" color="text-purple-400" />
      <StatCard label="Debt/GDP" value={state.debtToGdp.toFixed(0)} unit="%" color={state.debtToGdp <= 80 ? "text-green-400" : state.debtToGdp <= 120 ? "text-yellow-400" : "text-red-400"} />
      <StatCard label="Quarter" value={`Q${((state.quarter - 1) % 4) + 1} Y${state.year}`} unit="" color="text-gray-300" />
    </div>
  );
}

function DecisionPanel({ state, onDecide }: { state: EconomicState; onDecide: (d: PolicyDecision) => void }) {
  const [rateChange, setRateChange] = useState(0);
  const [guidance, setGuidance] = useState<"hawkish" | "neutral" | "dovish">("neutral");
  const [qe, setQe] = useState(false);

  const submit = () => {
    onDecide({ rateChange, forwardGuidance: guidance, qe });
    setRateChange(0);
    setGuidance("neutral");
    setQe(false);
  };

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-medium space-y-6">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">🏛️ Set Monetary Policy</h3>

      {/* Rate Change */}
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-3">
          Federal Funds Rate Change: <span className={`font-bold ${rateChange > 0 ? "text-red-500" : rateChange < 0 ? "text-green-500" : "text-slate-900 dark:text-slate-100"}`}>
            {rateChange > 0 ? "+" : ""}{rateChange} bps
          </span>
        </label>
        <input
          type="range"
          min={-100}
          max={100}
          step={25}
          value={rateChange}
          onChange={e => setRateChange(Number(e.target.value))}
          className="w-full h-2 accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mt-2">
          <span>-100 bps</span>
          <span>0</span>
          <span>+100 bps</span>
        </div>
      </div>

      {/* Forward Guidance */}
      <div>
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block mb-3">Forward Guidance</label>
        <div className="flex gap-3">
          {(["dovish", "neutral", "hawkish"] as const).map(g => (
            <button
              key={g}
              onClick={() => setGuidance(g)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                guidance === g
                  ? g === "dovish" ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-medium"
                  : g === "hawkish" ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-medium"
                  : "bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-medium"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              {g === "dovish" ? "🕊️ Dovish" : g === "hawkish" ? "🦅 Hawkish" : "⚖️ Neutral"}
            </button>
          ))}
        </div>
      </div>

      {/* QE Toggle */}
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div>
          <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Quantitative Easing</label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Buy bonds to inject liquidity (increases debt)</p>
        </div>
        <button
          onClick={() => setQe(!qe)}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
            qe ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-medium" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
          }`}
        >
          {qe ? "ON" : "OFF"}
        </button>
      </div>

      <button
        onClick={submit}
        className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-medium hover:shadow-strong hover:scale-[1.02]"
      >
        📋 Submit Policy Decision
      </button>
    </div>
  );
}

function EventBanner({ event }: { event: QuarterEvent }) {
  const colors = {
    crisis: "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50",
    boom: "bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/50",
    normal: "bg-gradient-to-r from-slate-500/20 to-slate-600/20 border-slate-500/50",
    policy: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/50",
    external: "bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-500/50",
  };
  const icons = { crisis: "🚨", boom: "📈", normal: "📰", policy: "🏛️", external: "🌍" };

  return (
    <div className={`${colors[event.type]} border-2 rounded-2xl p-5 mb-6 backdrop-blur-sm shadow-medium animate-slideUp`}>
      <span className="text-3xl mr-3">{icons[event.type]}</span>
      <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{event.description}</span>
    </div>
  );
}

function GameOver({ history, events, decisions }: { history: EconomicState[]; events: QuarterEvent[]; decisions: PolicyDecision[] }) {
  const { score, grade } = calculateScore(history);
  const final = history[history.length - 1];

  const shareText = `🏛️ Federal Reserve Simulator\n📊 Score: ${score}/100 (${grade})\n📈 GDP: ${final.gdpGrowth.toFixed(1)}% | 💼 Unemployment: ${final.unemployment.toFixed(1)}% | 💰 Inflation: ${final.inflation.toFixed(1)}%\n\nCan you do better? https://federalreservesimulator.com`;

  return (
    <div className="space-y-8">
      {/* Score */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-purple-500/10 rounded-3xl border-2 border-blue-500/30 shadow-strong backdrop-blur-sm">
        <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-3">Your Performance as Fed Chair</p>
        <p className={`text-8xl font-extrabold mb-4 ${
          score >= 70 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500"
        }`}>{grade}</p>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">{score}/100 points</p>
        <button
          onClick={() => navigator.clipboard.writeText(shareText)}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-medium hover:shadow-strong hover:scale-105"
        >
          📋 Share Score
        </button>
      </div>

      {/* Final Stats */}
      <Dashboard state={final} />

      {/* History */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-medium">
        <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-4">📜 Policy Timeline</h3>
        <div className="space-y-3">
          {history.slice(1).map((s, i) => (
            <div key={i} className="flex items-center justify-between text-sm p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Q{((s.quarter - 1) % 4)} Y{Math.ceil((s.quarter - 1) / 4)}</span>
              <span className={`font-semibold ${decisions[i]?.rateChange > 0 ? "text-red-500" : decisions[i]?.rateChange < 0 ? "text-green-500" : "text-slate-600 dark:text-slate-400"}`}>
                Rate: {s.fedFundsRate.toFixed(2)}% ({decisions[i]?.rateChange > 0 ? "+" : ""}{decisions[i]?.rateChange || 0}bps)
              </span>
              <span className={`font-semibold ${s.gdpGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                GDP {s.gdpGrowth.toFixed(1)}%
              </span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Infl {s.inflation.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Events Log */}
      {events.length > 0 && (
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-medium">
          <h3 className="font-bold text-xl text-amber-600 dark:text-amber-400 mb-4">📰 Major Events</h3>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="text-sm p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50">
                <span className="font-bold text-amber-700 dark:text-amber-500">Q{e.quarter}:</span> <span className="text-slate-700 dark:text-slate-300">{e.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learn More Section */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border-2 border-blue-500/30 backdrop-blur-sm">
        <h3 className="font-bold text-2xl text-slate-900 dark:text-slate-100 mb-6">📚 Want to Learn More?</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/concepts/federal-funds-rate" className="group block p-5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-105">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Federal Funds Rate Explained</span>
          </a>
          <a href="/guides/how-the-fed-fights-inflation" className="group block p-5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-105">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">How the Fed Fights Inflation</span>
          </a>
          <a href="/calculators/rate-impact-calculator" className="group block p-5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-105">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Rate Impact Calculator</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FederalReserveSimulator() {
  const [screen, setScreen] = useState<"menu" | "playing" | "done">("menu");
  const [state, setState] = useState<EconomicState | null>(null);
  const [history, setHistory] = useState<EconomicState[]>([]);
  const [events, setEvents] = useState<QuarterEvent[]>([]);
  const [decisions, setDecisions] = useState<PolicyDecision[]>([]);
  const [lastEvent, setLastEvent] = useState<QuarterEvent | null>(null);

  const startGame = useCallback((scenario: string) => {
    const initial = createInitialState(scenario);
    setState(initial);
    setHistory([initial]);
    setEvents([]);
    setDecisions([]);
    setLastEvent(null);
    setScreen("playing");
  }, []);

  const makeDecision = useCallback((decision: PolicyDecision) => {
    if (!state) return;
    const { newState, event } = applyDecision(state, decision);
    setState(newState);
    setHistory(h => [...h, newState]);
    setDecisions(d => [...d, decision]);
    if (event) {
      setEvents(e => [...e, event]);
      setLastEvent(event);
    } else {
      setLastEvent(null);
    }
    if (newState.quarter > TOTAL_QUARTERS) {
      setScreen("done");
    }
  }, [state]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-full mb-4">
          <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">🏛️ FREE INTERACTIVE GAME</p>
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">Federal Reserve</span>
          <br />
          <span className="text-slate-900 dark:text-slate-100">Simulator</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Step into the shoes of the Fed Chair. Set interest rates, manage inflation, and navigate
          economic crises. How well can you steer the economy?
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="text-green-500">✓</span>
            <span>Real scenarios</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="text-green-500">✓</span>
            <span>100% free</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="text-green-500">✓</span>
            <span>Educational</span>
          </div>
        </div>
      </div>

      {screen === "menu" && (
        <div className="space-y-12 animate-fadeIn">
          {/* 1. Choose Scenario - Primary CTA */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-medium">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">Choose a Historical Scenario</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {getScenarios().map(s => (
                <button
                  key={s}
                  onClick={() => startGame(s)}
                  className="group p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950 dark:hover:to-blue-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-left transition-all duration-300 hover:shadow-medium hover:scale-[1.02]"
                >
                  <span className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{s}</span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Navigate {TOTAL_QUARTERS} quarters of economic policy</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. How It Works - Rate Impact */}
          {/* 3. Learn Monetary Policy - Combined */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-medium">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">📚 Learn Monetary Policy</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <a href="/concepts/federal-funds-rate" className="group block p-5 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950 dark:to-slate-900 hover:from-blue-100 hover:to-slate-100 dark:hover:from-blue-900 dark:hover:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-[1.02]">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Federal Funds Rate</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">The Fed's primary tool</p>
              </a>
              <a href="/concepts/quantitative-easing" className="group block p-5 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950 dark:to-slate-900 hover:from-blue-100 hover:to-slate-100 dark:hover:from-blue-900 dark:hover:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-[1.02]">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Quantitative Easing</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Injecting money at zero rates</p>
              </a>
              <a href="/concepts/soft-landing" className="group block p-5 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950 dark:to-slate-900 hover:from-blue-100 hover:to-slate-100 dark:hover:from-blue-900 dark:hover:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-[1.02]">
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Soft Landing</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Cool inflation without recession</p>
              </a>
              <a href="/guides/how-the-fed-fights-inflation" className="group block p-5 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950 dark:hover:to-blue-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-[1.02]">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Fighting Inflation</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Policy tightening guide</p>
              </a>
              <a href="/guides/what-happens-when-interest-rates-go-up" className="group block p-5 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950 dark:hover:to-blue-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-medium hover:scale-[1.02]">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">When Rates Rise</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Economic ripple effects</p>
              </a>
            </div>
          </div>

          {/* How Rate Changes Affect You */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-medium">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">💰 How Rate Changes Affect You</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/50">
                  <span className="text-3xl">📈</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">When Rates Rise</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Mortgages, loans, and credit cards become more expensive. Savings accounts earn more interest.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-900/50">
                  <span className="text-3xl">📉</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">When Rates Fall</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Borrowing becomes cheaper, encouraging spending. Savings earn less, but stocks may rise.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <a href="/calculators/rate-impact-calculator" className="group block w-full p-8 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-[1.02] text-center">
                  <span className="text-5xl block mb-3">🧮</span>
                  <span className="font-bold text-xl text-white block mb-2">Calculate Your Impact</span>
                  <p className="text-sm text-blue-100">See how rate changes affect your finances</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "playing" && state && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{state.scenario}</h2>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Quarter {state.quarter} of {TOTAL_QUARTERS}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-3 transition-all duration-500" style={{ width: `${(state.quarter / TOTAL_QUARTERS) * 100}%` }} />
          </div>

          {lastEvent && <EventBanner event={lastEvent} />}
          <Dashboard state={state} />
          <DecisionPanel state={state} onDecide={makeDecision} />
        </div>
      )}

      {screen === "done" && (
        <div className="space-y-8 animate-fadeIn">
          <GameOver history={history} events={events} decisions={decisions} />
          <button
            onClick={() => setScreen("menu")}
            className="w-full py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-medium hover:shadow-strong hover:scale-[1.02]"
          >
            🔄 Play Again
          </button>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 space-y-8">
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-medium">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">What is the Federal Reserve Simulator?</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            The Federal Reserve Simulator is a free interactive game that puts you in the role of the
            Chair of the Federal Reserve. Make real monetary policy decisions — setting interest rates,
            issuing forward guidance, and deploying quantitative easing — while navigating historical
            economic crises like the 2008 Financial Crisis, COVID-19 pandemic, the Dot-Com Bubble,
            and 1970s Stagflation.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Our simulation uses a simplified IS-LM-PC economic model calibrated to real US economic data.
            Every decision you make affects GDP growth, unemployment, inflation, consumer confidence, and
            the stock market. The challenge? Balancing these competing forces to achieve stable growth
            with low inflation and low unemployment — the Fed's dual mandate.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/30 shadow-medium">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">How to Play</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Choose a Scenario</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Select from historical economic crises with unique conditions.</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Set Interest Rates</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Adjust rates each quarter. Raising fights inflation but slows growth.</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Deploy QE & Guidance</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Use forward guidance and quantitative easing when needed.</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Get Your Score</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">After 12 quarters, see how well you managed the economy.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-medium">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Key Concepts</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Federal Funds Rate</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">The Fed's primary tool for influencing the economy.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Quantitative Easing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Asset purchases to lower long-term rates.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Dual Mandate</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Maximum employment and 2% inflation target.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Phillips Curve</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Trade-off between unemployment and inflation.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/30 shadow-medium">
          <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">FAQ</h2>
          <div className="space-y-4">
            <details className="group bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex justify-between items-center">
                What is the Federal Reserve Simulator?
                <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">The Federal Reserve Simulator is an interactive educational game where you become the Fed Chair. Control monetary policy, set interest rates, and manage inflation through real economic crises. This Federal Reserve Simulator teaches you how central banking works by letting you experience the challenges of steering the US economy. Navigate scenarios like the 2008 Financial Crisis and COVID-19 pandemic in our Federal Reserve Simulator. Make policy decisions, deploy quantitative easing, and see real-time impacts on GDP, unemployment, and inflation. The Federal Reserve Simulator uses authentic economic models to show how the Fed balances growth and stability.</p>
            </details>
            <details className="group bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex justify-between items-center">
                Is the Federal Reserve Simulator free?
                <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">Yes! The Federal Reserve Simulator is completely free with no registration or downloads required. Learn monetary policy through hands-on experience with the Federal Reserve Simulator at no cost.</p>
            </details>
            <details className="group bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex justify-between items-center">
                How realistic is it?
                <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">Based on IS-LM-PC framework with real US economic parameters.</p>
            </details>
            <details className="group bg-white/80 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer list-none flex justify-between items-center">
                Can I use for classes?
                <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">Absolutely! Used by economics professors to teach monetary policy.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
