import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Federal Reserve Simulator",
  description: "Learn about Federal Reserve Simulator, a free interactive monetary policy simulation game.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-blue">
      <h1 className="text-3xl font-bold text-blue-500">About Federal Reserve Simulator</h1>

      <h2>What is Federal Reserve Simulator?</h2>
      <p>
        Federal Reserve Simulator is a free, interactive educational tool that puts you in the role of the Federal Reserve Chair.
        Make real monetary policy decisions—setting interest rates, issuing forward guidance, and deploying quantitative easing—while
        navigating historical economic crises.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe economic education should be accessible, engaging, and free for everyone. Traditional economics courses can be
        abstract and difficult to grasp. Our simulator makes monetary policy tangible by letting you experience the trade-offs and
        challenges that central bankers face.
      </p>

      <h2>How It Works</h2>
      <p>
        The simulator uses a simplified IS-LM-PC economic model calibrated with real US economic parameters. While simplified for
        gameplay, it captures the key dynamics of monetary policy transmission: how interest rate changes affect GDP growth,
        unemployment, inflation, and financial markets.
      </p>

      <h2>Educational Use</h2>
      <p>
        Federal Reserve Simulator is used by economics students, teachers, and anyone curious about how central banking works.
        It covers core macroeconomic concepts including the Phillips Curve, the dual mandate, quantitative easing, and forward guidance.
      </p>

      <h2>Technology</h2>
      <p>
        Built with Next.js, React, and Tailwind CSS. All processing happens in your browser using modern web technologies.
        No data is sent to external servers, ensuring your privacy and providing instant feedback.
      </p>

      <h2>Open Source</h2>
      <p>
        This project is open source and available on GitHub. We welcome contributions, bug reports, and feature suggestions
        from the community.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Federal Reserve Simulator is not affiliated with the Federal Reserve System or any government agency.
        This tool is for educational purposes only and should not be used as financial or investment advice.
      </p>

      <h2>Contact</h2>
      <p>
        Have questions or feedback? We'd love to hear from you. Reach out through our GitHub repository or website contact form.
      </p>
    </div>
  );
}
