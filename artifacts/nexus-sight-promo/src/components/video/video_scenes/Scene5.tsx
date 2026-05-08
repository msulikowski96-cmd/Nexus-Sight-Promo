import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, TrendingUp, Star, Zap, Target } from 'lucide-react';

const TIPS = [
  { icon: Target, text: 'Warduj przed drake\'em', prio: 'WYSOKI', color: '#FF2D55' },
  { icon: Zap, text: 'Ogranicz zgony w late game', prio: 'WYSOKI', color: '#FF2D55' },
  { icon: TrendingUp, text: 'Popraw CS/min o 15%', prio: 'ŚREDNI', color: '#F59E0B' },
  { icon: Star, text: 'Skup się na Baronze', prio: 'ŚREDNI', color: '#F59E0B' },
  { icon: Lightbulb, text: 'Lepszy roaming na mid', prio: 'NISKI', color: '#00D48A' },
];

const GRADE_COLORS: Record<string, string> = {
  'S+': '#C89B3C', S: '#C89B3C', 'A+': '#00D48A', A: '#00D48A',
  B: '#0BC4E3', C: '#F59E0B', D: '#FF2D55',
};

export function Scene5() {
  const [phase, setPhase] = useState(0);
  const [displayGrade, setDisplayGrade] = useState('?');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase < 3) return;
    const grades = ['D', 'C', 'B', 'A', 'A+', 'S', 'S+'];
    let i = 0;
    const interval = setInterval(() => {
      setDisplayGrade(grades[i % grades.length]);
      i++;
      if (i >= grades.length + 4) {
        setDisplayGrade('S+');
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #08091C 100%)' }}
      initial={{ clipPath: 'circle(0% at 50% 100%)' }}
      animate={{ clipPath: 'circle(150% at 50% 100%)' }}
      exit={{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated circuit bg */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 0 L40 20 M40 20 L60 20 M60 20 L60 40 M0 40 L20 40 M20 40 L20 60 M20 60 L40 60 M40 60 L40 80" stroke="#C89B3C" strokeWidth="0.8" fill="none"/>
            <circle cx="40" cy="20" r="3" fill="#C89B3C"/>
            <circle cx="60" cy="40" r="3" fill="#0BC4E3"/>
            <circle cx="20" cy="60" r="3" fill="#C89B3C"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(200,155,60,0.12) 0%, transparent 70%)' }}
      />

      {/* AI Header */}
      <motion.div
        className="mt-12 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <Brain style={{ width: '8vw', height: '8vw', color: '#C89B3C' }} />
          <p className="text-[8vw] tracking-[0.1em]" style={{ color: '#C89B3C', fontFamily: 'Bebas Neue' }}>AI ANALIZA</p>
        </div>
        <p className="text-[3vw] text-[#8899AA] tracking-[0.3em] uppercase" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          Powered by Google Gemini 2.0
        </p>
        <div className="h-[2px] w-48 mt-2" style={{ background: 'linear-gradient(90deg, transparent, #C89B3C, transparent)' }} />
      </motion.div>

      {/* Grade reveal */}
      <motion.div
        className="mt-6 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-[3vw] text-[#8899AA] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
          Ocena ogólna
        </p>
        <motion.div
          className="relative flex items-center justify-center rounded-2xl"
          style={{
            width: '36vw', height: '36vw',
            background: 'rgba(200,155,60,0.1)',
            border: '3px solid rgba(200,155,60,0.5)',
            boxShadow: '0 0 40px rgba(200,155,60,0.2), inset 0 0 40px rgba(200,155,60,0.05)',
          }}
          animate={phase >= 3 ? { boxShadow: '0 0 60px rgba(200,155,60,0.5), inset 0 0 40px rgba(200,155,60,0.1)' } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            key={displayGrade}
            className="text-[20vw] leading-none"
            style={{ color: GRADE_COLORS[displayGrade] ?? '#C89B3C', fontFamily: 'Bebas Neue' }}
            animate={displayGrade === 'S+' ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {displayGrade}
          </motion.p>
        </motion.div>
        <p className="text-[3.5vw] text-white font-bold mt-2">Wynik: 87.4 / 100</p>
      </motion.div>

      {/* Tips list */}
      <div className="mt-4 mx-4 w-[88vw] flex flex-col gap-2">
        <p className="text-[3.5vw] text-[#0BC4E3] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'Bebas Neue' }}>
          10 Wskazówek Coachingowych
        </p>
        {TIPS.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-xl px-3 py-2"
              style={{ background: 'rgba(13,18,40,0.8)', border: `1px solid ${tip.color}25` }}
              initial={{ opacity: 0, x: -30 }}
              animate={phase >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Icon style={{ width: '4vw', height: '4vw', color: tip.color, flexShrink: 0 }} />
              <p className="flex-1 text-[3vw] text-white" style={{ fontFamily: 'Inter', fontWeight: 500 }}>{tip.text}</p>
              <div
                className="rounded-full px-2 py-0.5"
                style={{ background: `${tip.color}22` }}
              >
                <p className="text-[2.2vw] font-bold" style={{ color: tip.color }}>{tip.prio}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating pulses */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${12 + i * 8}px`, height: `${12 + i * 8}px`,
            border: '1px solid rgba(200,155,60,0.3)',
            right: `${8 + i * 5}%`,
            top: `${15 + i * 14}%`,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </motion.div>
  );
}
