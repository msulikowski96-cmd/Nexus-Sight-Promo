import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Clock, Users, ChevronUp, ChevronDown, Minus } from 'lucide-react';

const MATCHES = [
  { champ: 'JI', result: 'W', kda: '12/3/8', cs: '214', role: 'ADC', color: '#C89B3C' },
  { champ: 'TH', result: 'W', kda: '1/4/18', cs: '32', role: 'SUP', color: '#0BC4E3' },
  { champ: 'YA', result: 'L', kda: '8/7/5', cs: '187', role: 'MID', color: '#FF2D55' },
  { champ: 'LX', result: 'W', kda: '7/2/14', cs: '165', role: 'MID', color: '#8B5CF6' },
  { champ: 'ZD', result: 'W', kda: '15/5/6', cs: '240', role: 'JNG', color: '#F59E0B' },
];

const PLAYERS_BLUE = ['K4yzer', 'Thresh', 'Orianna', 'Jinx', 'Malph'];
const PLAYERS_RED = ['Faker', 'Jhin', 'Syndra', 'Zed', 'Renekton'];

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const [seconds, setSeconds] = useState(847);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 0),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050810 0%, #080B1C 100%)' }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 40% at 50% 80%, rgba(11,196,227,0.07) 0%, transparent 70%)' }}
      />

      {/* TOP HALF: Match History */}
      <div className="flex-1 flex flex-col px-4 pt-10">
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-[2px] w-6" style={{ background: '#C89B3C' }} />
          <p className="text-[4vw] tracking-[0.2em] text-[#C89B3C] uppercase" style={{ fontFamily: 'Bebas Neue' }}>
            Historia Meczy
          </p>
          <p className="text-[3vw] text-[#8899AA]">ostatnie 20</p>
        </motion.div>

        <div className="flex flex-col gap-1.5">
          {MATCHES.map((m, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{
                background: m.result === 'W' ? 'rgba(0,212,138,0.08)' : 'rgba(255,45,85,0.08)',
                border: `1px solid ${m.result === 'W' ? 'rgba(0,212,138,0.25)' : 'rgba(255,45,85,0.25)'}`,
              }}
              initial={{ opacity: 0, x: -40 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Champion circle */}
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ width: '9vw', height: '9vw', background: `${m.color}22`, border: `2px solid ${m.color}` }}
              >
                <p className="text-[3.5vw] font-black" style={{ color: m.color, fontFamily: 'Bebas Neue' }}>{m.champ}</p>
              </div>

              {/* W/L badge */}
              <div
                className="rounded-lg px-2 py-0.5 shrink-0"
                style={{ background: m.result === 'W' ? 'rgba(0,212,138,0.2)' : 'rgba(255,45,85,0.2)' }}
              >
                <p className="text-[4vw] font-black" style={{ color: m.result === 'W' ? '#00D48A' : '#FF2D55', fontFamily: 'Bebas Neue' }}>
                  {m.result}
                </p>
              </div>

              <div className="flex-1 flex flex-col">
                <p className="text-white text-[3.5vw] font-bold">{m.kda}</p>
                <p className="text-[#8899AA] text-[2.5vw]">{m.role} • {m.cs} CS</p>
              </div>

              {m.result === 'W'
                ? <ChevronUp style={{ width: '4vw', height: '4vw', color: '#00D48A' }} />
                : <ChevronDown style={{ width: '4vw', height: '4vw', color: '#FF2D55' }} />
              }
            </motion.div>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mx-4 my-2 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,155,60,0.4), transparent)' }} />

      {/* BOTTOM HALF: Live Game */}
      <div className="px-4 pb-8">
        <motion.div
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="rounded-full"
            style={{ width: '3vw', height: '3vw', background: '#FF2D55' }}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <p className="text-[4.5vw] font-black tracking-wider" style={{ color: '#FF2D55', fontFamily: 'Bebas Neue' }}>LIVE GAME</p>
          <div className="flex items-center gap-1 ml-auto">
            <Clock style={{ width: '3.5vw', height: '3.5vw', color: '#8899AA' }} />
            <p className="text-[3.5vw] text-white font-mono font-bold">{fmt(seconds)}</p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(11,196,227,0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Blue team */}
          <div style={{ background: 'rgba(11,196,227,0.07)' }} className="px-3 py-2">
            <div className="flex items-center gap-1 mb-1">
              <Users style={{ width: '3vw', height: '3vw', color: '#0BC4E3' }} />
              <p className="text-[2.5vw] text-[#0BC4E3] font-bold">Niebieski Team</p>
            </div>
            <div className="flex gap-2">
              {PLAYERS_BLUE.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="rounded-lg flex items-center justify-center"
                    style={{ width: '14vw', height: '10vw', background: 'rgba(11,196,227,0.15)', border: '1px solid rgba(11,196,227,0.3)' }}
                  >
                    <p className="text-[2.5vw] font-black text-[#0BC4E3]" style={{ fontFamily: 'Bebas Neue' }}>
                      {p.substring(0, 3).toUpperCase()}
                    </p>
                  </div>
                  <p className="text-[2vw] text-[#8899AA] mt-0.5">D2</p>
                </div>
              ))}
            </div>
          </div>
          {/* Red team */}
          <div style={{ background: 'rgba(255,45,85,0.07)' }} className="px-3 py-2">
            <div className="flex items-center gap-1 mb-1">
              <Users style={{ width: '3vw', height: '3vw', color: '#FF2D55' }} />
              <p className="text-[2.5vw] text-[#FF2D55] font-bold">Czerwony Team</p>
            </div>
            <div className="flex gap-2">
              {PLAYERS_RED.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="rounded-lg flex items-center justify-center"
                    style={{ width: '14vw', height: '10vw', background: 'rgba(255,45,85,0.15)', border: '1px solid rgba(255,45,85,0.3)' }}
                  >
                    <p className="text-[2.5vw] font-black text-[#FF2D55]" style={{ fontFamily: 'Bebas Neue' }}>
                      {p.substring(0, 3).toUpperCase()}
                    </p>
                  </div>
                  <p className="text-[2vw] text-[#8899AA] mt-0.5">P1</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
