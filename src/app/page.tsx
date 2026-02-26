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
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}<span className="text-sm text-gray-500">{unit}</span></p>
    </div>
  );
}

function Dashboard({ state }: { state: EconomicState }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-6">
      <h3 className="text-lg font-bold text-blue-400">🏛️ Set Monetary Policy</h3>

      {/* Rate Change */}
      <div>
        <label className="text-sm text-gray-400 block mb-2">
          Federal Funds Rate Change: <span className={`font-bold ${rateChange > 0 ? "text-red-400" : rateChange < 0 ? "text-green-400" : "text-gray-300"}`}>
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
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>-100 bps</span>
          <span>0</span>
          <span>+100 bps</span>
        </div>
      </div>

      {/* Forward Guidance */}
      <div>
        <label className="text-sm text-gray-400 block mb-2">Forward Guidance</label>
        <div className="flex gap-2">
          {(["dovish", "neutral", "hawkish"] as const).map(g => (
            <button
              key={g}
              onClick={() => setGuidance(g)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                guidance === g
                  ? g === "dovish" ? "bg-green-900 text-green-400 border border-green-700"
                  : g === "hawkish" ? "bg-red-900 text-red-400 border border-red-700"
                  : "bg-gray-700 text-gray-200 border border-gray-600"
                  : "bg-gray-800 text-gray-500 border border-gray-700 hover:bg-gray-700"
              }`}
            >
              {g === "dovish" ? "🕊️ Dovish" : g === "hawkish" ? "🦅 Hawkish" : "⚖️ Neutral"}
            </button>
          ))}
        </div>
      </div>

      {/* QE Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm text-gray-400">Quantitative Easing</label>
          <p className="text-xs text-gray-600">Buy bonds to inject liquidity (increases debt)</p>
        </div>
        <button
          onClick={() => setQe(!qe)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            qe ? "bg-blue-900 text-blue-400 border border-blue-700" : "bg-gray-800 text-gray-500 border border-gray-700"
          }`}
        >
          {qe ? "ON" : "OFF"}
        </button>
      </div>

      <button
        onClick={submit}
        className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-bold rounded-xl transition shadow-lg shadow-blue-900/30"
      >
        📋 Submit Policy Decision
      </button>
    </div>
  );
}

function EventBanner({ event }: { event: QuarterEvent }) {
  const colors = {
    crisis: "bg-red-950/50 border-red-900",
    boom: "bg-green-950/50 border-green-900",
    normal: "bg-gray-900/50 border-gray-700",
    policy: "bg-blue-950/50 border-blue-900",
    external: "bg-amber-950/50 border-amber-900",
  };
  const icons = { crisis: "🚨", boom: "📈", normal: "📰", policy: "🏛️", external: "🌍" };

  return (
    <div className={`${colors[event.type]} border rounded-xl p-4 mb-4`}>
      <span className="mr-2">{icons[event.type]}</span>
      <span className="text-sm font-medium">{event.description}</span>
    </div>
  );
}

function GameOver({ history, events, decisions }: { history: EconomicState[]; events: QuarterEvent[]; decisions: PolicyDecision[] }) {
  const { score, grade } = calculateScore(history);
  const final = history[history.length - 1];

  const shareText = `🏛️ Federal Reserve Simulator\n📊 Score: ${score}/100 (${grade})\n📈 GDP: ${final.gdpGrowth.toFixed(1)}% | 💼 Unemployment: ${final.unemployment.toFixed(1)}% | 💰 Inflation: ${final.inflation.toFixed(1)}%\n\nCan you do better? https://federalreservesimulator.com`;

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="text-center py-8 bg-gradient-to-b from-blue-950/40 to-transparent rounded-xl border border-blue-900/50">
        <p className="text-blue-400 text-sm mb-2">Your Performance as Fed Chair</p>
        <p className={`text-7xl font-bold ${
          score >= 70 ? "text-green-400" : score >= 50 ? "text-yellow-400" : "text-red-400"
        }`}>{grade}</p>
        <p className="text-gray-400 mt-2">{score}/100 points</p>
        <button
          onClick={() => navigator.clipboard.writeText(shareText)}
          className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg transition"
        >
          📋 Share Score
        </button>
      </div>

      {/* Final Stats */}
      <Dashboard state={final} />

      {/* History */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="font-bold text-blue-400 mb-3">📜 Policy Timeline</h3>
        <div className="space-y-2">
          {history.slice(1).map((s, i) => (
            <div key={i} className="flex items-center justify-between text-sm border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Q{((s.quarter - 1) % 4)} Y{Math.ceil((s.quarter - 1) / 4)}</span>
              <span className={`${decisions[i]?.rateChange > 0 ? "text-red-400" : decisions[i]?.rateChange < 0 ? "text-green-400" : "text-gray-400"}`}>
                Rate: {s.fedFundsRate.toFixed(2)}% ({decisions[i]?.rateChange > 0 ? "+" : ""}{decisions[i]?.rateChange || 0}bps)
              </span>
              <span className={s.gdpGrowth >= 0 ? "text-green-400" : "text-red-400"}>
                GDP {s.gdpGrowth.toFixed(1)}%
              </span>
              <span className="text-gray-400">
                Infl {s.inflation.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Events Log */}
      {events.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <h3 className="font-bold text-amber-400 mb-3">📰 Major Events</h3>
          <div className="space-y-2">
            {events.map((e, i) => (
              <div key={i} className="text-sm text-gray-400">
                <span className="text-gray-600">Q{e.quarter}:</span> {e.description}
              </div>
            ))}
          </div>
        </div>
      )}
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <p className="text-blue-600 text-sm font-semibold tracking-wider mb-2">🏛️ FREE INTERACTIVE GAME</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          <span className="text-blue-500">Federal Reserve</span> Simulator
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Step into the shoes of the Fed Chair. Set interest rates, manage inflation, and navigate
          economic crises. How well can you steer the economy?
        </p>
        <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
          <span>✅ Real scenarios</span>
          <span>✅ 100% free</span>
          <span>✅ Educational</span>
        </div>
      </div>

      {screen === "menu" && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Choose a Historical Scenario</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {getScenarios().map(s => (
                <button
                  key={s}
                  onClick={() => startGame(s)}
                  className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 hover:border-blue-500 text-left transition"
                >
                  <span className="font-semibold text-gray-200">{s}</span>
                  <p className="text-xs text-gray-500 mt-1">Navigate {TOTAL_QUARTERS} quarters of economic policy</p>
                </button>
              ))}
            </div>
          </div>

          {/* Ad placeholder */}
          <div className="p-4 border border-dashed border-gray-700 rounded text-gray-600 text-xs text-center">
            Advertisement Space
          </div>
        </div>
      )}

      {screen === "playing" && state && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-blue-400">{state.scenario}</h2>
            <span className="text-sm text-gray-500">Quarter {state.quarter} of {TOTAL_QUARTERS}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-blue-500 rounded-full h-2 transition-all" style={{ width: `${(state.quarter / TOTAL_QUARTERS) * 100}%` }} />
          </div>

          {lastEvent && <EventBanner event={lastEvent} />}
          <Dashboard state={state} />
          <DecisionPanel state={state} onDecide={makeDecision} />
        </div>
      )}

      {screen === "done" && (
        <div className="space-y-6">
          <GameOver history={history} events={events} decisions={decisions} />
          <button
            onClick={() => setScreen("menu")}
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl transition"
          >
            🔄 Play Again
          </button>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-16 prose prose-invert prose-blue max-w-none">
        <h2 className="text-2xl font-bold text-blue-500">What is the Federal Reserve Simulator?</h2>
        <p>
          The Federal Reserve Simulator is a free interactive game that puts you in the role of the
          Chair of the Federal Reserve. Make real monetary policy decisions — setting interest rates,
          issuing forward guidance, and deploying quantitative easing — while navigating historical
          economic crises like the 2008 Financial Crisis, COVID-19 pandemic, the Dot-Com Bubble,
          and 1970s Stagflation.
        </p>
        <p>
          Our simulation uses a simplified IS-LM-PC economic model calibrated to real US economic data.
          Every decision you make affects GDP growth, unemployment, inflation, consumer confidence, and
          the stock market. The challenge? Balancing these competing forces to achieve stable growth
          with low inflation and low unemployment — the Fed&apos;s dual mandate.
        </p>

        <h2 className="text-2xl font-bold text-blue-500 mt-8">How to Play the Federal Reserve Simulator</h2>
        <ol>
          <li><strong>Choose a Scenario</strong> — Select from historical economic crises, each with unique starting conditions and events.</li>
          <li><strong>Set Interest Rates</strong> — Adjust the federal funds rate each quarter. Raising rates fights inflation but slows growth. Lowering rates stimulates the economy but may cause inflation.</li>
          <li><strong>Issue Forward Guidance</strong> — Signal your future intentions to markets. Hawkish guidance tightens financial conditions; dovish guidance loosens them.</li>
          <li><strong>Deploy QE (Optional)</strong> — Buy bonds to inject liquidity when rates are near zero. Powerful but increases national debt.</li>
          <li><strong>Navigate Events</strong> — Respond to crises, booms, and external shocks as they happen.</li>
          <li><strong>Get Your Score</strong> — After 12 quarters, see how well you managed the economy compared to the Fed&apos;s targets.</li>
        </ol>

        <h2 className="text-2xl font-bold text-blue-500 mt-8">Understanding Monetary Policy</h2>
        <ul>
          <li><strong>Federal Funds Rate</strong> — The interest rate at which banks lend to each other overnight. The Fed&apos;s primary tool for influencing the economy.</li>
          <li><strong>Forward Guidance</strong> — Communication about future policy intentions. Shapes market expectations and long-term interest rates.</li>
          <li><strong>Quantitative Easing (QE)</strong> — Large-scale asset purchases to lower long-term rates when short-term rates are near zero.</li>
          <li><strong>Dual Mandate</strong> — The Fed&apos;s two goals: maximum employment and stable prices (2% inflation target).</li>
          <li><strong>Phillips Curve</strong> — The trade-off between unemployment and inflation. Lower unemployment often means higher inflation.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-500 mt-8">Frequently Asked Questions</h2>

        <h3>Is the Federal Reserve Simulator free?</h3>
        <p>Yes! It&apos;s completely free with no registration, downloads, or hidden fees. Play as many times as you want.</p>

        <h3>How realistic is the economic model?</h3>
        <p>Our model is based on the IS-LM-PC framework used in economics education, calibrated with real US economic parameters. While simplified for gameplay, it captures the key dynamics of monetary policy transmission.</p>

        <h3>Can I use this for economics classes?</h3>
        <p>Absolutely! Many economics professors use simulations like this to teach monetary policy. The game covers interest rate mechanics, the Phillips Curve, QE, and forward guidance — all core concepts in macroeconomics courses.</p>

        <h3>What scenarios are available?</h3>
        <p>Currently we offer four historical scenarios: the 2008 Financial Crisis, COVID-19 Pandemic, Dot-Com Bubble, and 1970s Stagflation. Each presents unique challenges and economic conditions.</p>

        <h3>How is my score calculated?</h3>
        <p>Your score is based on how close you get to the Fed&apos;s targets: 2% inflation, unemployment below 5%, positive GDP growth, and economic stability (avoiding wild swings). Maximum score is 100.</p>

        <h3>Does it work on mobile?</h3>
        <p>Yes! The simulator is fully responsive and works great on phones, tablets, and desktop computers.</p>
      </section>
    </div>
  );
}
