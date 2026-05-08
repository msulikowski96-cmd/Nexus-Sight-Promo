import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Eye, Swords, Target, Leaf, Zap, Shield, Crosshair, Brain, TrendingUp, User, BarChart2 } from 'lucide-react';

const METRICS = [
  { icon: Trophy, label: 'OP Score', value: '87', unit: '/100', color: '#C89B3C' },
  { icon: Swords, label: 'KDA Index', value: '3.8', unit: ':1', color: '#FF2D55' },
  { icon: Target, label: 'Kill Part.', value: '68', unit: '%', color: '#0BC4E3' },
  { icon: Eye, label: 'Vision Score', value: '42', unit: '/min', color: '#8B5CF6' },
  { icon: Leaf, label: 'CS/min', value: '7.4', unit: '', color: '#00D48A' },
  { icon: Zap, label: 'Dmg Share', value: '31', unit: '%', color: '#F59E0B' },
  { icon: Shield, label: 'Early Game', value: '74', unit: '%', color: '#0BC4E3' },
  { icon: Crosshair, label: 'Objectives', value: '89', unit: '%', color: '#FF6B35' },
  { icon: Brain, label: 'Tilt Index', value: '2', unit: '/10', color: '#C89B3C' },
  { icon: User, label: 'Archetype', value: 'ADC', unit: '', color: '#FF2D55' },
  { icon: TrendingUp, label: 'Role Detect', value: 'BOT', unit: '', color: '#00D48A' },
  { icon: BarChart2, label: 'Est. Tier', value: 'DIA', unit: '', color: '#8B5CF6' },
];

export function Scene3() {
  const [phase, setPhase] = useState(0);
  const [opScore, setOpScore] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 350),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase < 2) return;
    let start = 0;
    const target = 87;
    const step = setInterval(() => {
      start += 3;
      if (start >= target) { setOpScore(target); clearInterval(step); }
      else setOpScore(start);
    }, 30);
    return () => clearInterval(step);
  }, [phase]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060917 0%, #090C1F 100%)' }}
      initial={{ clipPath: 'inset(50% 0 50% 0)' }}
      animate={{ clipPath: 'inset(0% 0 0% 0)' }}
      exit={{ clipPath: 'inset(50% 0 50% 0)', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 20%, rgba(200,155,60,0.1) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <motion.div
        className="mt-12 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[4.5vw] tracking-[0.2em] text-[#C89B3C] uppercase" style={{ fontFamily: 'Bebas Neue' }}>
          12+ WSKAŹNIKÓW
        </p>
        <p className="text-[3vw] text-[#8899AA] tracking-widest uppercase mt-1" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          Analiza statystyk
        </p>
        <div className="h-[2px] w-40 mt-2" style={{ background: 'linear-gradient(90deg, transparent, #C89B3C, transparent)' }} />
      </motion.div>

      {/* OP Score big circle */}
      <motion.div
        className="mt-5 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: '28vw', height: '28vw',
            background: 'conic-gradient(#C89B3C ' + (opScore / 100 * 360) + 'deg, rgba(200,155,60,0.15) 0deg)',
            boxShadow: '0 0 30px rgba(200,155,60,0.3)',
          }}
        >
          <div
            className="absolute rounded-full flex flex-col items-center justify-center"
            style={{ width: '22vw', height: '22vw', background: '#060917' }}
          >
            <p className="text-[9vw] font-black leading-none" style={{ color: '#C89B3C', fontFamily: 'Bebas Neue' }}>
              {opScore}
            </p>
            <p className="text-[3vw] text-[#8899AA] -mt-1" style={{ fontFamily: 'Inter', fontWeight: 600 }}>OP SCORE</p>
          </div>
        </div>
      </motion.div>

      {/* Metric grid */}
      <div className="mt-4 mx-4 grid grid-cols-3 gap-2 w-[88vw]">
        {METRICS.slice(1).map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              className="rounded-xl p-2 flex flex-col items-start"
              style={{
                background: 'rgba(13,18,40,0.8)',
                border: `1px solid ${m.color}35`,
              }}
              initial={{ opacity: 0, scale: 0.7, y: 15 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.2 + i * 0.05 }}
            >
              <div className="flex items-center gap-1 mb-1">
                <Icon style={{ width: '3.5vw', height: '3.5vw', color: m.color }} />
                <p className="text-[2.5vw] text-[#8899AA]" style={{ fontFamily: 'Inter', fontWeight: 500 }}>{m.label}</p>
              </div>
              <p className="text-[4.5vw] font-black leading-none" style={{ color: m.color, fontFamily: 'Bebas Neue' }}>
                {m.value}<span className="text-[2.5vw] text-[#8899AA]">{m.unit}</span>
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom tag */}
      <motion.div
        className="mt-4 px-5 py-2 rounded-full"
        style={{ background: 'rgba(200,155,60,0.15)', border: '1px solid rgba(200,155,60,0.4)' }}
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[3.5vw] text-[#C89B3C] tracking-widest" style={{ fontFamily: 'Bebas Neue' }}>
          TWOJ STYL GRY ROZKLADANY NA CZYNNIKI
        </p>
      </motion.div>

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${8 + i * 3}px`, height: `${8 + i * 3}px`,
            background: METRICS[i % METRICS.length].color,
            opacity: 0.25,
            left: `${5 + i * 16}%`,
            bottom: `${8 + (i % 3) * 5}%`,
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}
