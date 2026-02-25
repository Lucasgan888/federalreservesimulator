import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Federal Reserve Simulator - Interactive Monetary Policy Game",
  description:
    "Play as the Fed Chair! Set interest rates, manage inflation, and navigate economic crises in this free interactive Federal Reserve monetary policy simulator.",
  keywords: [
    "federal reserve simulator",
    "fed simulator",
    "monetary policy simulator",
    "economics simulator",
    "interest rate game",
    "fed chair simulator",
    "macroeconomics game",
  ],
  openGraph: {
    title: "Federal Reserve Simulator - Interactive Monetary Policy Game",
    description:
      "Play as the Fed Chair! Set interest rates and manage the economy in this free interactive simulator.",
    type: "website",
    url: "https://federalreservesimulator.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
