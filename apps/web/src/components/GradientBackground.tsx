export default function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#070B14]" />
      <div className="absolute -top-28 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600/35 via-indigo-600/25 to-cyan-500/25 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[420px] w-[520px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl" />
    </div>
  );
}
