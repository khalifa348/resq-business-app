export default function BackgroundQ() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dark base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EDEDE9] to-[#F5F5F2]" />
      {/* Glow orbs — lime, softer and wider */}
      <div className="absolute top-8 right-6 w-56 h-56 bg-[#A8C256] rounded-full opacity-[0.07] blur-[90px]" />
      <div className="absolute bottom-24 left-4 w-64 h-64 bg-[#9CC93C] rounded-full opacity-[0.05] blur-[100px]" />
      {/* Stencil watermark */}
      <div className="absolute -bottom-10 -left-6 select-none pointer-events-none">
        <span className="stencil-mark text-[170px]">RESQ</span>
      </div>
      {/* Grain texture */}
      <div className="grain-overlay" />
    </div>
  );
}
