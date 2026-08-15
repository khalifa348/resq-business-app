export default function BackgroundQ() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Dark base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#100F0F]" />
      {/* Glow orbs */}
      <div className="absolute top-10 right-8 w-40 h-40 bg-[#D4F05A] rounded-full opacity-[0.06] blur-3xl" />
      <div className="absolute bottom-20 left-6 w-52 h-52 bg-[#D4F05A] rounded-full opacity-[0.04] blur-[80px]" />
      <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-[#D4F05A] rounded-full opacity-[0.03] blur-[60px]" />
    </div>
  );
}
