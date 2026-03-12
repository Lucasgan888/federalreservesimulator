import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Federal Reserve Simulator",
  description: "Terms of service for Federal Reserve Simulator.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-blue">
      <h1 className="text-3xl font-bold text-blue-500">Terms of Service</h1>
      <p className="text-gray-400">Last updated: March 12, 2026</p>

      <h2>Acceptance of Terms</h2>
      <p>By accessing and using Federal Reserve Simulator, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>

      <h2>Description of Service</h2>
      <p>Federal Reserve Simulator is a free, browser-based educational tool that simulates monetary policy decisions. The service is provided for entertainment and educational purposes only and should not be used as financial or investment advice.</p>

      <h2>Educational Purpose Disclaimer</h2>
      <p>This simulator is not affiliated with, endorsed by, or connected to the Federal Reserve System or any government agency. All scenarios, outcomes, and economic models are simplified for educational purposes and do not reflect actual Federal Reserve operations or real-world economic complexity.</p>

      <h2>No Financial Advice</h2>
      <p>The information provided through this simulator is for educational purposes only and does not constitute financial, investment, or economic advice. Do not make financial decisions based solely on this simulator.</p>

      <h2>Service Availability</h2>
      <p>The service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>

      <h2>User Conduct</h2>
      <p>You agree to use the service only for lawful purposes and in accordance with these terms. You may not attempt to interfere with the proper functioning of the service or access it through automated means without permission.</p>

      <h2>Intellectual Property</h2>
      <p>The website design, code, and original content are protected by copyright. The economic concepts and Federal Reserve information presented are based on publicly available educational materials.</p>

      <h2>Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the service.</p>

      <h2>Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.</p>

      <h2>Contact</h2>
      <p>For questions about these terms, please contact us through our website.</p>
    </div>
  );
}
