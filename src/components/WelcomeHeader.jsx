export default function WelcomeHeader({ lightText = false }) {
  const titleCls = lightText
    ? 'text-[13px] font-semibold text-white tracking-wide mt-4'
    : 'text-[13px] font-semibold text-text-primary tracking-wide mt-4';
  const headCls = lightText
    ? 'text-[42px] leading-[1.05] font-bold tracking-tight font-display text-white'
    : 'text-[42px] leading-[1.05] font-bold tracking-tight font-display text-text-primary';
  const subCls = lightText
    ? 'text-[15px] font-medium text-white/85 mt-4 leading-relaxed mx-auto max-w-[280px]'
    : 'text-[15px] font-medium text-text-secondary mt-4 leading-relaxed mx-auto max-w-[280px]';
  return (
    <section className="mb-0 text-center" data-purpose="welcome-section">
      {/* iPhone-style app icon — lime tile with ink mark, light halo behind */}
      {/* Brand label (icon box removed per design decision) */}
      <div className="flex flex-col items-center animate-slideUp delay-0">
        <p className={titleCls}>
          RESQ Business
        </p>
      </div>

      {/* Headline */}
      <div className="animate-slideUp delay-100 mt-8">
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
