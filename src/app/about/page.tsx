import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Federal Reserve Simulator",
  description: "Learn about Federal Reserve Simulator, a free interactive monetary policy simulation game.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-blue">
      <h1 className="text-3xl font-bold text-blue-500">About Federal Reserve Simulator</h1>
      <p>
        Welcome to Federal Reserve Simulator, a free interactive monetary policy simulation game. This project was built to provide a fast, free,
        and easy-to-use tool that works entirely in your browser.
      </p>
      <h2>Our Mission</h2>
      <p>
        We believe great tools should be accessible to everyone. Federal Reserve Simulator is completely free,
        requires no downloads or registration, and processes everything client-side for maximum
        privacy and speed.
      </p>
      <h2>Technology</h2>
      <p>
        Built with Next.js, React, and Tailwind CSS. All processing happens in your browser
        using modern web technologies. No data is ever sent to external servers.
      </p>
      <h2>Disclaimer</h2>
      <p>Not affiliated with the Federal Reserve System. For educational purposes only.</p>
    </div>
  );
}
