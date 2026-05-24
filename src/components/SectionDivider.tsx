export default function SectionDivider() {
  return (
    <div className="relative h-5 overflow-hidden">
      {/* Top Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent blur-3xl" />

      {/* Ambient Line */}
      <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Glow Orb */}
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/10 blur-[100px]" />
    </div>
  );
}