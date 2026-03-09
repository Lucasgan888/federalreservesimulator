import { Metadata } from "next";
import { notFound } from "next/navigation";
import { concepts } from "@/lib/content";

export async function generateStaticParams() {
  return Object.keys(concepts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const concept = concepts[params.slug];
  if (!concept) return {};
  return {
    title: `${concept.title} | Federal Reserve Simulator`,
    description: concept.description,
    openGraph: { title: concept.title, description: concept.description },
  };
}

export default function ConceptPage({ params }: { params: { slug: string } }) {
  const concept = concepts[params.slug];
  if (!concept) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <a href="/" className="text-sm text-blue-500 hover:text-blue-400 mb-4 inline-block">← Back to Simulator</a>
        <h1 className="text-4xl font-bold mb-4">{concept.title}</h1>
        <p className="text-xl text-gray-400">{concept.intro}</p>
      </div>

      <div className="prose prose-invert prose-blue max-w-none space-y-8">
        {concept.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-2xl font-bold text-blue-400 mb-3">{section.heading}</h2>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-blue-400 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {concept.faq.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-200 mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-950/30 rounded-xl p-6 border border-blue-900/50">
        <h3 className="font-bold text-blue-400 mb-3">🎮 Try It in the Simulator</h3>
        <p className="text-gray-300 text-sm mb-4">
          See how {concept.title.toLowerCase()} works in practice. Make policy decisions and watch the economy respond in real-time.
        </p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition">
          Launch Simulator
        </a>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-gray-300 mb-3">Related Topics</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {concept.relatedLinks.map((link, i) => (
            <a key={i} href={link.href} className="block p-4 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-800 hover:border-blue-500 transition">
              <span className="text-gray-200 text-sm">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-8">Last updated: {concept.updatedAt}</p>
    </div>
  );
}
