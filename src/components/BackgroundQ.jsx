export default function BackgroundQ() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dark base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10120D] to-[#0E100C]" />
      {/* Glow orbs — lime, softer and wider */}
      <div className="absolute top-8 right-6 w-56 h-56 bg-[#B9D063] rounded-full opacity-[0.06] blur-[90px]" />
      <div className="absolute bottom-24 left-4 w-64 h-64 bg-[#9DBF4A] rounded-full opacity-[0.04] blur-[100px]" />
      {/* Grain texture */}
      <div className="grain-overlay" />
    </div>
  );
}
