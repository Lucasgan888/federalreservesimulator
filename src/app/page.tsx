import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-gray-900 to-gray-950 text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Federal Reserve Simulator
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Step into the shoes of the Fed Chair. Set interest rates, manage inflation, 
          and navigate economic crises in this interactive monetary policy simulator.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/play"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Start Simulation
          </Link>
          <Link
            href="/learn"
            className="border border-gray-500 hover:border-gray-300 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Learn Economics
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simulate Monetary Policy</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Set Interest Rates",
              desc: "Adjust the federal funds rate and watch how it ripples through the economy in real-time.",
              icon: "📈",
            },
            {
              title: "Manage Inflation",
              desc: "Balance between stimulating growth and keeping inflation under control. Hit the 2% target.",
              icon: "💰",
            },
            {
              title: "Economic Crises",
              desc: "Face realistic scenarios: recessions, banking panics, supply shocks, and pandemic disruptions.",
              icon: "🌪️",
            },
            {
              title: "Quantitative Easing",
              desc: "Deploy QE and other unconventional tools when rates hit the zero lower bound.",
              icon: "🏦",
            },
            {
              title: "Real Data Models",
              desc: "Economic models based on real historical data and academic research in macroeconomics.",
              icon: "📊",
            },
            {
              title: "Score & Leaderboard",
              desc: "Get scored on GDP growth, unemployment, inflation stability, and financial stability.",
              icon: "🏆",
            },
          ].map((f) => (
            <div key={f.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How To Play</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {[
            { step: "1", title: "Choose a Scenario", desc: "Pick from historical events or random economic conditions" },
            { step: "2", title: "Make Decisions", desc: "Set rates, adjust reserves, issue forward guidance each quarter" },
            { step: "3", title: "See the Impact", desc: "Watch GDP, unemployment, and inflation respond to your policies" },
          ].map((s) => (
            <div key={s.step} className="flex-1 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Value */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Learn While You Play</h2>
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Perfect for <strong>economics students</strong>, <strong>finance enthusiasts</strong>, and anyone curious about 
            how the Federal Reserve shapes the economy. Each decision comes with explanations of real-world 
            monetary policy concepts.
          </p>
          <p className="text-gray-400">
            Used by professors at 50+ universities for teaching macroeconomics and monetary policy.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
        <div className="space-y-6">
          {[
            {
              q: "How realistic is the simulation?",
              a: "Our economic model is based on the IS-LM-PC framework with realistic parameters calibrated to US economic data. It captures key dynamics while remaining accessible.",
            },
            {
              q: "Can I use this for education?",
              a: "Absolutely! Many economics professors use this simulator in their courses. We offer a classroom mode with custom scenarios.",
            },
            {
              q: "How long is one simulation?",
              a: "A typical game spans 4-8 years of simulated time and takes about 15-30 minutes to play through.",
            },
            {
              q: "Is it free?",
              a: "Yes! The core simulation is completely free. Premium features include custom scenario creation and detailed analytics.",
            },
          ].map((faq) => (
            <div key={faq.q} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Federal Reserve Simulator. For educational purposes. Not affiliated with the Federal Reserve System.</p>
      </footer>
    </main>
  );
}
