export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
      <div className="flex items-center justify-center">
        <img src="/white-logo.png" alt="YC" className="h-10 w-10 object-contain" />
      </div>
      <div className="flex items-center gap-6 pr-2">
        <a href="#about" className="text-sm text-zinc-400 hover:text-white transition">About</a>
        <a href="#projects" className="text-sm text-zinc-400 hover:text-white transition">Projects</a>
        <a href="#contact" className="text-sm text-zinc-400 hover:text-white transition">Contact</a>
      </div>
    </nav>
  );
}
