export default function LaunchSimulatorCTA({ text = "Launch Simulator" }: { text?: string }) {
  return (
    <a href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition">
      {text}
    </a>
  );
}
