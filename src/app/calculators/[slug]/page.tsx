"use client";

import { useState } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators } from "@/lib/content";

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calc = calculators[params.slug];
  if (!calc) notFound();

  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(calc.inputs.map(inp => [inp.label, inp.default || 0]))
  );

  const mortgage = values["Mortgage Balance"] || 0;
  const creditCard = values["Credit Card Balance"] || 0;
  const autoLoan = values["Auto Loan Balance"] || 0;
  const savings = values["Savings Account Balance"] || 0;
  const rateChange = (values["Rate Change (basis points)"] || 0) / 100;

  const mortgageImpact = mortgage * (rateChange * 0.007);
  const creditCardImpact = creditCard * (rateChange * 0.01);
  const autoLoanImpact = autoLoan * (rateChange * 0.008);
  const savingsImpact = savings * (rateChange * 0.005);
  const totalDebtImpact = mortgageImpact + creditCardImpact + autoLoanImpact;
  const netImpact = savingsImpact - totalDebtImpact;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <a href="/" className="text-sm text-blue-500 hover:text-blue-400 mb-4 inline-block">← Back to Simulator</a>
        <h1 className="text-4xl font-bold mb-4">{calc.title}</h1>
        <p className="text-xl text-gray-400">{calc.intro}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Your Finances</h2>
          <div className="space-y-4">
            {calc.inputs.map((input, i) => (
              <div key={i}>
                <label className="text-sm text-gray-400 block mb-2">{input.label}</label>
                <input
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={values[input.label]}
                  onChange={e => setValues({...values, [input.label]: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-blue-400 mb-4">Annual Impact</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-sm text-gray-400">Mortgage</span>
              <span className={`font-semibold ${mortgageImpact > 0 ? "text-red-400" : mortgageImpact < 0 ? "text-green-400" : "text-gray-400"}`}>
                {mortgageImpact > 0 ? "+" : ""}{mortgageImpact.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-sm text-gray-400">Credit Card</span>
              <span className={`font-semibold ${creditCardImpact > 0 ? "text-red-400" : creditCardImpact < 0 ? "text-green-400" : "text-gray-400"}`}>
                {creditCardImpact > 0 ? "+" : ""}{creditCardImpact.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-sm text-gray-400">Auto Loan</span>
              <span className={`font-semibold ${autoLoanImpact > 0 ? "text-red-400" : autoLoanImpact < 0 ? "text-green-400" : "text-gray-400"}`}>
                {autoLoanImpact > 0 ? "+" : ""}{autoLoanImpact.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-800">
              <span className="text-sm text-gray-400">Savings</span>
              <span className={`font-semibold ${savingsImpact > 0 ? "text-green-400" : savingsImpact < 0 ? "text-red-400" : "text-gray-400"}`}>
                {savingsImpact > 0 ? "+" : ""}{savingsImpact.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-gray-200">Net Impact</span>
              <span className={`text-xl font-bold ${netImpact > 0 ? "text-green-400" : netImpact < 0 ? "text-red-400" : "text-gray-400"}`}>
                {netImpact > 0 ? "+" : ""}${Math.abs(netImpact).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-950/20 rounded-xl p-4 border border-blue-900/30">
        <p className="text-sm text-gray-400"><strong>Note:</strong> {calc.formulaNote}</p>
        <p className="text-sm text-gray-400 mt-2">{calc.resultExplainer}</p>
      </div>

      <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-blue-400 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {calc.faq.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-200 mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-950/30 rounded-xl p-6 border border-blue-900/50">
        <h3 className="font-bold text-blue-400 mb-3">🎮 See It in Action</h3>
        <p className="text-gray-300 text-sm mb-4">
          Experience how Fed rate decisions ripple through the economy. Play the simulator and make your own policy choices.
        </p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition">
          Launch Simulator
        </a>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-gray-300 mb-3">Learn More</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {calc.relatedLinks.map((link, i) => (
            <a key={i} href={link.href} className="block p-4 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-800 hover:border-blue-500 transition">
              <span className="text-gray-200 text-sm">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-8">Last updated: {calc.updatedAt}</p>
    </div>
  );
}
