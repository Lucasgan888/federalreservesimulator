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
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 min-h-screen antialiased">
        <nav className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🏛️</span>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Federal Reserve Simulator</span>
            </a>
            <div className="flex gap-6 text-sm font-medium">
              <a href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Home</a>
              <a href="/about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">About</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 py-8 text-center text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-medium">© {new Date().getFullYear()} Federal Reserve Simulator. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-3">
              <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Privacy</a>
              <a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Terms</a>
            </div>
            <p className="mt-3 text-slate-500 dark:text-slate-600 text-xs">
              For educational purposes only. Not affiliated with the Federal Reserve System.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
