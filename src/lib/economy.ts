// Federal Reserve Simulator - Economic Model Engine

export interface EconomicState {
  quarter: number;
  year: number;
  gdpGrowth: number; // % annualized
  unemployment: number; // %
  inflation: number; // % annualized
  fedFundsRate: number; // %
  consumerConfidence: number; // 0-100
  stockMarket: number; // index points
  debtToGdp: number; // %
  scenario: string;
}

export interface PolicyDecision {
  rateChange: number; // basis points
  forwardGuidance: "hawkish" | "neutral" | "dovish";
  qe: boolean; // quantitative easing
}

export interface QuarterEvent {
  quarter: number;
  year: number;
  description: string;
  type: "crisis" | "boom" | "normal" | "policy" | "external";
  impact: Partial<EconomicState>;
}

export interface GameResult {
  finalState: EconomicState;
  history: EconomicState[];
  events: QuarterEvent[];
  score: number;
  grade: string;
  decisions: PolicyDecision[];
}

const SCENARIOS = [
  {
    name: "2008 Financial Crisis",
    startState: {
      gdpGrowth: -2.5, unemployment: 6.5, inflation: 3.8,
      fedFundsRate: 4.25, consumerConfidence: 38, stockMarket: 8776,
      debtToGdp: 73,
    },
    events: [
      { q: 1, desc: "Lehman Brothers collapses. Credit markets freeze.", type: "crisis" as const },
      { q: 3, desc: "Housing prices fall 30% from peak. Foreclosures surge.", type: "crisis" as const },
      { q: 5, desc: "Unemployment hits 10%. Auto industry seeks bailout.", type: "crisis" as const },
      { q: 8, desc: "Recovery signs emerge. Consumer spending stabilizes.", type: "normal" as const },
    ],
  },
  {
    name: "COVID-19 Pandemic",
    startState: {
      gdpGrowth: -31.4, unemployment: 14.7, inflation: 0.1,
      fedFundsRate: 1.5, consumerConfidence: 21, stockMarket: 18591,
      debtToGdp: 100,
    },
    events: [
      { q: 1, desc: "Global pandemic declared. Lockdowns begin worldwide.", type: "crisis" as const },
      { q: 2, desc: "Congress passes $2.2T stimulus package.", type: "policy" as const },
      { q: 4, desc: "Vaccine rollout begins. Markets rally to record highs.", type: "boom" as const },
      { q: 6, desc: "Supply chain disruptions cause inflation spike.", type: "external" as const },
      { q: 8, desc: "Inflation hits 7%. Pressure to raise rates mounts.", type: "crisis" as const },
    ],
  },
  {
    name: "Dot-Com Bubble",
    startState: {
      gdpGrowth: 4.1, unemployment: 3.9, inflation: 3.4,
      fedFundsRate: 6.5, consumerConfidence: 72, stockMarket: 10788,
      debtToGdp: 55,
    },
    events: [
      { q: 1, desc: "NASDAQ crashes 78% from peak. Tech layoffs begin.", type: "crisis" as const },
      { q: 3, desc: "9/11 attacks shake markets. Travel industry collapses.", type: "external" as const },
      { q: 5, desc: "Corporate scandals (Enron, WorldCom) erode trust.", type: "crisis" as const },
      { q: 8, desc: "Housing market begins unprecedented boom.", type: "boom" as const },
    ],
  },
  {
    name: "Stagflation (1970s)",
    startState: {
      gdpGrowth: -0.5, unemployment: 8.5, inflation: 11.0,
      fedFundsRate: 10.0, consumerConfidence: 45, stockMarket: 802,
      debtToGdp: 35,
    },
    events: [
      { q: 1, desc: "OPEC oil embargo doubles energy prices.", type: "external" as const },
      { q: 3, desc: "Wage-price spiral accelerates. Unions demand raises.", type: "crisis" as const },
      { q: 5, desc: "Public demands action on inflation. Confidence drops.", type: "crisis" as const },
      { q: 8, desc: "Volcker-style shock therapy debate intensifies.", type: "policy" as const },
    ],
  },
];

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function getScenarios(): string[] {
  return SCENARIOS.map(s => s.name);
}

export function createInitialState(scenarioName: string): EconomicState {
  const scenario = SCENARIOS.find(s => s.name === scenarioName) || SCENARIOS[0];
  return {
    quarter: 1,
    year: 1,
    ...scenario.startState,
    scenario: scenario.name,
  };
}

export function applyDecision(
  state: EconomicState,
  decision: PolicyDecision
): { newState: EconomicState; event: QuarterEvent | null } {
  const scenario = SCENARIOS.find(s => s.name === state.scenario) || SCENARIOS[0];
  const newRate = clamp(state.fedFundsRate + decision.rateChange / 100, 0, 20);
  const rateDelta = newRate - state.fedFundsRate;

  // Economic model (simplified IS-LM-PC)
  let gdpEffect = -rateDelta * 0.8 + (Math.random() - 0.5) * 1.5;
  let inflationEffect = -rateDelta * 0.3 + state.gdpGrowth * 0.1 + (Math.random() - 0.5) * 0.5;
  let unemploymentEffect = rateDelta * 0.2 - state.gdpGrowth * 0.15 + (Math.random() - 0.5) * 0.3;

  // Forward guidance effects
  if (decision.forwardGuidance === "dovish") {
    gdpEffect += 0.3;
    inflationEffect += 0.2;
  } else if (decision.forwardGuidance === "hawkish") {
    gdpEffect -= 0.2;
    inflationEffect -= 0.3;
  }

  // QE effects
  if (decision.qe) {
    gdpEffect += 0.5;
    inflationEffect += 0.3;
    unemploymentEffect -= 0.2;
  }

  // Check for scenario events
  let event: QuarterEvent | null = null;
  const scenarioEvent = scenario.events.find(e => e.q === state.quarter);
  if (scenarioEvent) {
    event = {
      quarter: state.quarter,
      year: state.year,
      description: scenarioEvent.desc,
      type: scenarioEvent.type,
      impact: {},
    };
    if (scenarioEvent.type === "crisis") {
      gdpEffect -= 1.5;
      unemploymentEffect += 0.5;
    } else if (scenarioEvent.type === "boom") {
      gdpEffect += 1.5;
      unemploymentEffect -= 0.3;
      inflationEffect += 0.5;
    } else if (scenarioEvent.type === "external") {
      inflationEffect += 1.0;
      gdpEffect -= 0.8;
    }
  }

  const newState: EconomicState = {
    quarter: state.quarter + 1,
    year: Math.ceil((state.quarter + 1) / 4),
    gdpGrowth: clamp(state.gdpGrowth + gdpEffect, -35, 15),
    unemployment: clamp(state.unemployment + unemploymentEffect, 2, 25),
    inflation: clamp(state.inflation + inflationEffect, -2, 20),
    fedFundsRate: newRate,
    consumerConfidence: clamp(
      state.consumerConfidence + gdpEffect * 5 - Math.abs(inflationEffect) * 3 + (Math.random() - 0.5) * 10,
      0, 100
    ),
    stockMarket: Math.round(
      state.stockMarket * (1 + (gdpEffect * 0.02) + (Math.random() - 0.5) * 0.05)
    ),
    debtToGdp: clamp(
      state.debtToGdp + (decision.qe ? 2 : 0) + (state.gdpGrowth < 0 ? 1 : -0.5),
      20, 200
    ),
    scenario: state.scenario,
  };

  return { newState, event };
}

export function calculateScore(history: EconomicState[]): { score: number; grade: string } {
  if (history.length < 2) return { score: 50, grade: "C" };

  const last = history[history.length - 1];

  // Target: 2% inflation, <5% unemployment, positive GDP growth
  const inflationScore = Math.max(0, 30 - Math.abs(last.inflation - 2) * 8);
  const unemploymentScore = Math.max(0, 30 - Math.max(0, last.unemployment - 4) * 5);
  const gdpScore = Math.max(0, 20 + last.gdpGrowth * 3);
  const stabilityScore = Math.max(0, 20 - history.reduce((v, s, i) => {
    if (i === 0) return 0;
    return v + Math.abs(s.gdpGrowth - history[i-1].gdpGrowth);
  }, 0));

  const score = Math.round(clamp(inflationScore + unemploymentScore + gdpScore + stabilityScore, 0, 100));

  let grade: string;
  if (score >= 90) grade = "A+";
  else if (score >= 80) grade = "A";
  else if (score >= 70) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 50) grade = "D";
  else grade = "F";

  return { score, grade };
}

export const TOTAL_QUARTERS = 12;
