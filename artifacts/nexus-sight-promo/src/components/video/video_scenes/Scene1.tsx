import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Swords, Trophy, Zap, Shield, Target } from 'lucide-react';

const ICONS = [Eye, Swords, Trophy, Zap, Shield, Target];

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 750),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 1700),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const nexusChars = 'NEXUS'.split('');
  const sightChars = 'SIGHT'.split('');

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #07091A 50%, #0A0D20 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.3, opacity: 0, filter: 'blur(25px)' }}
      transition={{ duration: 0.6, ease: 'circOut' }}
    >
      {/* Hex grid bg */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#C89B3C" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 55%, rgba(200,155,60,0.12) 0%, transparent 70%)' }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{ top: '28%', background: 'linear-gradient(90deg, transparent 0%, #C89B3C 50%, transparent 100%)' }}
        initial={{ scaleX: 0 }}
        animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: 'circOut' }}
      />
      {/* Bottom accent line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{ bottom: '28%', background: 'linear-gradient(90deg, transparent 0%, #C89B3C 50%, transparent 100%)' }}
        initial={{ scaleX: 0 }}
        animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: 'circOut', delay: 0.15 }}
      />

      {/* NEXUS */}
      <div className="flex items-center" style={{ fontFamily: 'Bebas Neue, cursive', lineHeight: 1 }}>
        {nexusChars.map((char, i) => (
          <motion.span
            key={i}
            className="text-[21vw] leading-none"
            style={{ color: '#C89B3C', letterSpacing: '0.05em' }}
            initial={{ opacity: 0, y: -80, rotateX: -90 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: -80, rotateX: -90 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: i * 0.07 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* SIGHT */}
      <div className="flex items-center -mt-3" style={{ fontFamily: 'Bebas Neue, cursive', lineHeight: 1 }}>
        {sightChars.map((char, i) => (
          <motion.span
            key={i}
            className="text-[21vw] leading-none text-white"
            style={{ letterSpacing: '0.05em' }}
            initial={{ opacity: 0, y: 80, rotateX: 90 }}
            animate={phase >= 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 90 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: i * 0.07 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="text-[3.8vw] text-center tracking-[0.25em] uppercase mt-4"
        style={{ color: '#0BC4E3', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={phase >= 4 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(12px)' }}
        transition={{ duration: 0.7 }}
      >
        Statystyki graczy LoL
      </motion.p>

      {/* Icon row */}
      <div className="flex gap-4 mt-8">
        {ICONS.map((Icon, i) => (
          <motion.div
            key={i}
            className="rounded-full flex items-center justify-center"
            style={{
              width: '10vw', height: '10vw',
              background: 'rgba(200,155,60,0.12)',
              border: '1px solid rgba(200,155,60,0.4)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={phase >= 5 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18, delay: i * 0.06 }}
          >
            <Icon style={{ width: '5vw', height: '5vw', color: '#C89B3C' }} />
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${6 + (i % 4) * 4}px`, height: `${6 + (i % 4) * 4}px`,
            background: i % 2 === 0 ? '#C89B3C' : '#0BC4E3',
            opacity: 0.4,
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
}
