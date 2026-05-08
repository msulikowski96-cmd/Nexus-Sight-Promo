import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Star, TrendingUp, ChevronUp, Globe } from 'lucide-react';

const CHAMPION_COLORS = ['#C89B3C', '#0BC4E3', '#FF2D55', '#00D48A', '#8B5CF6', '#F59E0B', '#FF6B35'];
const CHAMPION_NAMES = ['Jinx', 'Thresh', 'Yasuo', 'Lux', 'Zed', 'Ahri', 'Lee'];

const RANKS = [
  { name: 'CHALLENGER', color: '#FFD700', icon: '👑', lp: '1847 LP' },
  { name: 'GRANDMASTER', color: '#FF4444', icon: '⚔', lp: '742 LP' },
  { name: 'MASTER', color: '#9B59B6', icon: '✦', lp: '312 LP' },
];

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060917 0%, #080B1E 100%)' }}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 100% 0%)', opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 30%, rgba(11,196,227,0.08) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <motion.div
        className="mt-16 flex flex-col items-center"
        initial={{ opacity: 0, y: -30 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[3.5vw] tracking-[0.3em] text-[#0BC4E3] uppercase" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
          PROFIL GRACZA
        </p>
        <div className="h-[2px] w-32 mt-2" style={{ background: 'linear-gradient(90deg, transparent, #0BC4E3, transparent)' }} />
      </motion.div>

      {/* Player card */}
      <motion.div
        className="mt-8 mx-6 rounded-2xl p-5 w-[85vw]"
        style={{
          background: 'rgba(13,18,40,0.9)',
          border: '1px solid rgba(200,155,60,0.3)',
          boxShadow: '0 0 30px rgba(200,155,60,0.1)',
        }}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <div className="flex items-center gap-4">
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{ width: '16vw', height: '16vw', background: 'linear-gradient(135deg, #C89B3C, #8B6914)', border: '2px solid #C89B3C' }}
          >
            <User style={{ width: '8vw', height: '8vw', color: '#07091A' }} />
          </div>
          <div className="flex flex-col">
            <p className="text-white font-black text-[5vw]" style={{ fontFamily: 'Bebas Neue' }}>SummonerX #EUW</p>
            <p className="text-[#8899AA] text-[3vw]">Poziom konta: <span className="text-[#C89B3C] font-bold">487</span></p>
            <div className="flex items-center gap-2 mt-1">
              <Globe style={{ width: '3.5vw', height: '3.5vw', color: '#0BC4E3' }} />
              <p className="text-[#0BC4E3] text-[3vw]">16 serwerów regionalnych</p>
            </div>
          </div>
        </div>

        {/* Rank badges */}
        <div className="flex gap-2 mt-4">
          {RANKS.map((rank, i) => (
            <motion.div
              key={rank.name}
              className="flex-1 rounded-xl p-2 flex flex-col items-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${rank.color}40` }}
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
            >
              <p className="text-[3vw] font-black" style={{ color: rank.color, fontFamily: 'Bebas Neue' }}>{rank.name}</p>
              <p className="text-[2.5vw] text-[#8899AA]">{rank.lp}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Champion mastery */}
      <motion.div
        className="mt-6 mx-6 w-[85vw]"
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Star style={{ width: '4vw', height: '4vw', color: '#C89B3C' }} />
          <p className="text-[3.5vw] text-[#C89B3C] tracking-wider uppercase" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
            Mistrzostwo championów
          </p>
        </div>
        <div className="flex gap-2 justify-between">
          {CHAMPION_NAMES.map((name, i) => (
            <motion.div
              key={name}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={phase >= 4 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20, delay: i * 0.07 }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '10vw', height: '10vw',
                  background: `${CHAMPION_COLORS[i]}22`,
                  border: `2px solid ${CHAMPION_COLORS[i]}`,
                }}
              >
                <p className="text-[3.5vw] font-black" style={{ color: CHAMPION_COLORS[i], fontFamily: 'Bebas Neue' }}>
                  {name.substring(0, 2).toUpperCase()}
                </p>
              </div>
              <p className="text-[2.2vw] text-[#8899AA]">{name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* LP History bar */}
      <motion.div
        className="mt-6 mx-6 w-[85vw] rounded-xl p-4"
        style={{ background: 'rgba(13,18,40,0.8)', border: '1px solid rgba(11,196,227,0.2)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp style={{ width: '4vw', height: '4vw', color: '#00D48A' }} />
          <p className="text-[3vw] text-[#00D48A] font-bold">Historia LP</p>
          <ChevronUp style={{ width: '4vw', height: '4vw', color: '#00D48A' }} />
          <p className="text-[3vw] text-[#00D48A] font-black">+247 LP</p>
        </div>
        <div className="flex items-end gap-1 h-10">
          {[30, 45, 38, 55, 50, 65, 72, 60, 80, 88, 75, 95].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: h > 60 ? '#00D48A' : '#0BC4E3', borderRadius: 2 }}
              initial={{ scaleY: 0 }}
              animate={phase >= 5 ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: 'circOut' }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${20 + i * 15}px`, height: `${20 + i * 15}px`,
            background: i % 2 === 0 ? 'rgba(200,155,60,0.15)' : 'rgba(11,196,227,0.15)',
            right: `${5 + i * 8}%`, top: `${10 + i * 20}%`,
            filter: 'blur(2px)',
          }}
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );
}
