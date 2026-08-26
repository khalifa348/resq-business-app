export default function WelcomeHeader() {
  const titleCls = 'text-[13px] font-semibold text-white tracking-wide mt-4';
  const headCls = 'text-[42px] leading-[1.05] font-bold tracking-tight font-display text-white';
  const subCls = 'text-[15px] font-medium text-white/85 mt-4 leading-relaxed mx-auto max-w-[280px]';
  return (
    <section className="mb-0 text-center" data-purpose="welcome-section">
      {/* iPhone-style app icon — lime tile with ink mark, light halo behind */}
      {/* Brand label (icon box removed per design decision) */}
      <div className="flex flex-col items-center">
        <p className={titleCls}>
          RESQ Business
        </p>
      </div>

      {/* Headline */}
      <div className="mt-8">
        <h1 className={headCls}>
          Start your shift
        </h1>
        <p className={subCls}>
          Sign in to accept jobs, track earnings, and keep the city moving.
        </p>
      </div>
    </section>
  );
}
