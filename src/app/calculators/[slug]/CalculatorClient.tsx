"use client";

import { useState } from "react";
import type { CalculatorPage } from "@/lib/content";

export default function CalculatorClient({ calc }: { calc: CalculatorPage }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(calc.inputs.map(inp => [inp.label, inp.default || 0]))
  );

  const handleInputChange = (label: string, value: number) => {
    const input = calc.inputs.find(inp => inp.label === label);
    if (input) {
      const clampedValue = Math.max(input.min || 0, Math.min(input.max || Infinity, value));
      setValues({...values, [label]: clampedValue});
    }
  };

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
                onChange={e => handleInputChange(input.label, Number(e.target.value))}
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
  );
}
