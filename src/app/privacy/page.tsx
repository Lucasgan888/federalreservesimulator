import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Federal Reserve Simulator",
  description: "Privacy policy for Federal Reserve Simulator.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-blue">
      <h1 className="text-3xl font-bold text-blue-500">Privacy Policy</h1>
      <p className="text-gray-400">Last updated: March 12, 2026</p>

      <h2>Overview</h2>
      <p>Federal Reserve Simulator is committed to protecting your privacy. This policy explains how we handle data when you use our service.</p>

      <h2>Information We Collect</h2>
      <p>Federal Reserve Simulator is a client-side application. All game data and calculations are processed entirely in your browser. We do not collect, store, or transmit any personal information or game data to our servers.</p>

      <h2>Analytics</h2>
      <p>We use Google Analytics 4 to understand general usage patterns, such as page views and user interactions. This helps us improve the simulator. The data collected is anonymized and does not include personally identifiable information. You can opt out of Google Analytics by using browser extensions like Google Analytics Opt-out Browser Add-on.</p>

      <h2>Cookies</h2>
      <p>We use essential cookies to ensure the website functions properly. Analytics cookies may be set by Google Analytics. We do not use tracking cookies for advertising purposes.</p>

      <h2>Third-Party Services</h2>
      <p>We may display advertisements through third-party ad networks. These services may use their own cookies and collect data according to their privacy policies. We do not control or have access to this data.</p>

      <h2>Data Security</h2>
      <p>Since all processing happens in your browser and no data is transmitted to our servers, your game data remains private and secure on your device.</p>

      <h2>Children's Privacy</h2>
      <p>Our service is intended for educational purposes and is suitable for all ages. We do not knowingly collect personal information from anyone.</p>

      <h2>Changes to This Policy</h2>
      <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>

      <h2>Contact</h2>
      <p>For privacy-related questions or concerns, please contact us through our website or open an issue on our GitHub repository.</p>
    </div>
  );
}
