import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Federal Reserve Simulator - Interactive Monetary Policy Game Free",
  description:
    "Play as the Fed Chair! Set interest rates, manage inflation, and navigate economic crises in this free interactive Federal Reserve simulator. Based on real historical scenarios.",
  keywords:
    "federal reserve simulator, fed simulator, monetary policy simulator, economics simulator, interest rate game, fed chair simulator, macroeconomics game, economics education",
  openGraph: {
    title: "Federal Reserve Simulator - Interactive Monetary Policy Game Free",
    description:
      "Step into the shoes of the Fed Chair. Set interest rates and manage the economy in real historical scenarios. Free to play.",
    url: "https://federalreservesimulator.com",
    siteName: "Federal Reserve Simulator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federal Reserve Simulator",
    description: "Can you manage the economy? Play as the Fed Chair in this free interactive simulator.",
  },
  alternates: { canonical: "https://federalreservesimulator.com" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CMFN98P501" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-CMFN98P501');` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Federal Reserve Simulator",
              url: "https://federalreservesimulator.com",
              description: "Free interactive Federal Reserve monetary policy simulator game",
              applicationCategory: "Game",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased">
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <span className="font-bold text-lg text-blue-500">Federal Reserve Simulator</span>
            </a>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="/" className="hover:text-blue-500 transition">Home</a>
              <a href="/about" className="hover:text-blue-500 transition">About</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-16 py-8 text-center text-sm text-gray-500">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-6 p-4 border border-dashed border-gray-700 rounded text-gray-600 text-xs">
              Advertisement Space
            </div>
            <p>© {new Date().getFullYear()} Federal Reserve Simulator. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="/privacy" className="hover:text-blue-500 transition">Privacy</a>
              <a href="/terms" className="hover:text-blue-500 transition">Terms</a>
            </div>
            <p className="mt-2 text-gray-600 text-xs">
              For educational purposes only. Not affiliated with the Federal Reserve System.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
