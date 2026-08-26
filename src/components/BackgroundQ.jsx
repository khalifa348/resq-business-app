export default function BackgroundQ() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dark base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EDEDE9] to-[#F5F5F2]" />
      {/* Glow orbs — lime, softer and wider */}
      <div className="absolute top-8 right-6 w-56 h-56 bg-[#A8C256] rounded-full opacity-[0.07] blur-[90px]" />
      <div className="absolute bottom-24 left-4 w-64 h-64 bg-[#8FAE3E] rounded-full opacity-[0.05] blur-[100px]" />
      {/* Grain texture */}
      <div className="grain-overlay" />
    </div>
  );
}
