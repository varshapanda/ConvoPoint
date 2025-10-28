function AnimatedBorder({ children }) {
  return (
    <div 
      className="relative w-full h-full rounded-2xl p-[2px] animate-border flex overflow-hidden shadow-2xl"
      style={{
        background: 'linear-gradient(45deg, #000000, #0a0a0a 50%, #000000) padding-box, conic-gradient(from var(--border-angle), rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.8) 86%, rgba(255,255,255,1) 90%, rgba(255,255,255,0.8) 94%, rgba(255,255,255,0.15)) border-box',
        border: '2px solid transparent'
      }}
    >
      <div className="w-full h-full rounded-2xl bg-black flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default AnimatedBorder;