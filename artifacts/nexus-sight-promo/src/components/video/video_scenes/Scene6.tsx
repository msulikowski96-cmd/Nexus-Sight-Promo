import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Eye, Swords, Brain, Wifi, BarChart2, User, Star, Shield, Target, Globe, Zap } from 'lucide-react';

const FEATURES = [
  { icon: User, label: 'Profil Gracza', color: '#C89B3C' },
  { icon: BarChart2, label: '12+ Metryk', color: '#0BC4E3' },
  { icon: Trophy, label: 'Historia Meczy', color: '#F59E0B' },
  { icon: Brain, label: 'AI Analiza', color: '#8B5CF6' },
  { icon: Wifi, label: 'Live Game', color: '#FF2D55' },
  { icon: Eye, label: 'Vision Score', color: '#00D48A' },
  { icon: Swords, label: 'KDA Index', color: '#FF6B35' },
  { icon: Shield, label: 'Ochrona Danych', color: '#0BC4E3' },
  { icon: Star, label: 'Mastery Top 7', color: '#C89B3C' },
  { icon: Target, label: 'OP Score', color: '#FF2D55' },
  { icon: Globe, label: '16 Serwerów', color: '#00D48A' },
  { icon: Zap, label: 'Szybka Analiza', color: '#F59E0B' },
];

export function Scene6() {
  const [phase, setPhase] = useState(0);
  const [urlIdx, setUrlIdx] = useState(0);
  const url = 'nexus-sight.onrender.com';

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase < 3) return;
    const interval = setInterval(() => {
      setUrlIdx(i => {
        if (i >= url.length) { clearInterval(interval); return i; }
        return i + 1;
      });
    }, 55);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #07091A 60%, #0A0B18 100%)' }}
      initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
      animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Hex grid */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="hex2" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#C89B3C" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex2)" />
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,155,60,0.1) 0%, transparent 70%)' }}
      />

      {/* DARMOWE badge */}
      <motion.div
        className="mt-10 px-8 py-3 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #C89B3C, #8B6914)',
          boxShadow: '0 0 30px rgba(200,155,60,0.4)',
        }}
        initial={{ opacity: 0, scale: 0, rotate: -10 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <p className="text-[7vw] font-black text-[#07091A]" style={{ fontFamily: 'Bebas Neue', letterSpacing: '0.1em' }}>
          100% DARMOWE
        </p>
      </motion.div>

      {/* NEXUS SIGHT title */}
      <motion.div
        className="mt-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 15 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[14vw] leading-none" style={{ color: '#C89B3C', fontFamily: 'Bebas Neue' }}>NEXUS</p>
        <p className="text-[14vw] leading-none text-white -mt-2" style={{ fontFamily: 'Bebas Neue' }}>SIGHT</p>
        <div className="h-[2px] w-48 mt-1" style={{ background: 'linear-gradient(90deg, transparent, #C89B3C, transparent)' }} />
      </motion.div>

      {/* URL typewriter */}
      <motion.div
        className="mt-4 px-5 py-3 rounded-xl flex items-center gap-2"
        style={{
          background: 'rgba(11,196,227,0.08)',
          border: '1px solid rgba(11,196,227,0.3)',
        }}
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Globe style={{ width: '4.5vw', height: '4.5vw', color: '#0BC4E3', flexShrink: 0 }} />
        <p className="text-[4vw] font-bold" style={{ color: '#0BC4E3', fontFamily: 'Inter' }}>
          {url.substring(0, urlIdx)}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-[0.5ch] h-[4vw] ml-0.5 align-middle"
            style={{ background: '#0BC4E3' }}
          />
        </p>
      </motion.div>

      {/* Feature grid */}
      <div className="mt-5 mx-4 grid grid-cols-4 gap-2 w-[88vw]">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.label}
              className="flex flex-col items-center gap-1 rounded-xl py-3"
              style={{ background: 'rgba(13,18,40,0.7)', border: `1px solid ${f.color}25` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20, delay: i * 0.04 }}
            >
              <Icon style={{ width: '6vw', height: '6vw', color: f.color }} />
              <p className="text-[2.2vw] text-center leading-tight" style={{ color: f.color, fontFamily: 'Inter', fontWeight: 600 }}>
                {f.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* SPRAWDŹ TERAZ */}
      <motion.div
        className="mt-5 mb-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.p
          className="text-[8vw] tracking-[0.1em]"
          style={{ color: '#C89B3C', fontFamily: 'Bebas Neue' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          SPRAWDZ TERAZ
        </motion.p>
        <p className="text-[3vw] text-[#8899AA]" style={{ fontFamily: 'Inter' }}>Analiza AI · Rangi · Live Game · Historia</p>
      </motion.div>

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${15 + i * 10}px`, height: `${15 + i * 10}px`,
            background: i % 2 === 0 ? 'rgba(200,155,60,0.2)' : 'rgba(11,196,227,0.2)',
            left: `${5 + i * 20}%`,
            top: `${8 + i * 15}%`,
            filter: 'blur(2px)',
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
    </motion.div>
  );
}
