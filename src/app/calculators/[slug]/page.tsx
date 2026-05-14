import { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators } from "@/lib/content";
import CalculatorClient from "./CalculatorClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const calc = calculators[slug];
  if (!calc) return { title: "Calculator Not Found" };
  return {
    title: `${calc.title} | Federal Reserve Simulator`,
    description: calc.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(calculators).map(slug => ({ slug }));
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = calculators[slug];
  if (!calc) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.title,
    description: calc.description,
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <a href="/" className="text-sm text-blue-500 hover:text-blue-400 mb-4 inline-block">← Back to Simulator</a>
          <h1 className="text-4xl font-bold mb-4">{calc.title}</h1>
          <p className="text-xl text-gray-400">{calc.intro}</p>
        </div>

        <CalculatorClient calc={calc} />

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
    </>
  );
}
