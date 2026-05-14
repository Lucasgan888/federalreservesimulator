import { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides } from "@/lib/content";

export async function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return {};
  return {
    title: `${guide.title} | Federal Reserve Simulator`,
    description: guide.description,
    openGraph: { title: guide.title, description: guide.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "Federal Reserve Simulator" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <a href="/" className="text-sm text-blue-500 hover:text-blue-400 mb-4 inline-block">← Back to Simulator</a>
        <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
        <p className="text-xl text-gray-400">{guide.intro}</p>
      </div>

      <div className="space-y-6">
        {guide.steps.map((step, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-blue-400 mb-3">{step.title}</h2>
            <p className="text-gray-300 leading-relaxed">{step.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-blue-400 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {guide.faq.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-200 mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-950/30 rounded-xl p-6 border border-blue-900/50">
        <h3 className="font-bold text-blue-400 mb-3">🎮 Practice in the Simulator</h3>
        <p className="text-gray-300 text-sm mb-4">
          Apply what you learned. Navigate real economic scenarios and see if you can achieve better outcomes than the actual Fed.
        </p>
        <a href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition">
          Try the Simulator
        </a>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-gray-300 mb-3">Related Resources</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {guide.relatedLinks.map((link, i) => (
            <a key={i} href={link.href} className="block p-4 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-800 hover:border-blue-500 transition">
              <span className="text-gray-200 text-sm">{link.title}</span>
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-8">Last updated: {guide.updatedAt}</p>
    </div>
    </>
  );
}
