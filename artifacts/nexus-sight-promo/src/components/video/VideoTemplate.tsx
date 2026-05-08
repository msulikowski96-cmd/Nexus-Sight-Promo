import { useEffect, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 3000,
  profil: 3500,
  metryki: 4000,
  historia: 4000,
  ai: 4500,
  cta: 4000,
};

const SCENE_COMPONENTS: Record<string, ComponentType> = {
  intro: Scene1,
  profil: Scene2,
  metryki: Scene3,
  historia: Scene4,
  ai: Scene5,
  cta: Scene6,
};

const SCENE_KEYS = Object.keys(SCENE_DURATIONS);

const PERSIST_POSITIONS = [
  { x: '45vw', y: '38vh', scale: 2.8, opacity: 0.07 },
  { x: '8vw',  y: '12vh', scale: 1.2, opacity: 0.08 },
  { x: '72vw', y: '55vh', scale: 1.6, opacity: 0.06 },
  { x: '18vw', y: '72vh', scale: 0.9, opacity: 0.07 },
  { x: '58vw', y: '22vh', scale: 2.0, opacity: 0.05 },
  { x: '35vw', y: '85vh', scale: 1.3, opacity: 0.06 },
];

const LINE_CONFIGS = [
  { left: ['20%', '5%', '50%', '30%', '10%', '40%'], width: ['60%', '90%', '30%', '65%', '45%', '55%'], top: ['48%', '10%', '85%', '28%', '65%', '18%'] },
];

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = SCENE_KEYS.indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey] ?? Scene1;

  const pos = PERSIST_POSITIONS[sceneIndex] ?? PERSIST_POSITIONS[0];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#07091A' }}>
      {/* Persistent animated background blob */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(200,155,60,0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: pos.x, y: pos.y, scale: pos.scale, opacity: pos.opacity }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Persistent cyan blob */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(11,196,227,0.12) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }}
        animate={{
          x: PERSIST_POSITIONS[(sceneIndex + 2) % 6].x,
          y: PERSIST_POSITIONS[(sceneIndex + 2) % 6].y,
          opacity: sceneIndex === 4 ? 0.08 : 0.05,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Persistent gold accent line */}
      <motion.div
        className="absolute h-[1.5px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #C89B3C 50%, transparent 100%)' }}
        animate={{
          left: LINE_CONFIGS[0].left[sceneIndex] ?? '20%',
          width: LINE_CONFIGS[0].width[sceneIndex] ?? '60%',
          top: LINE_CONFIGS[0].top[sceneIndex] ?? '48%',
          opacity: [3, 5].includes(sceneIndex) ? 0 : 0.4,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Persistent floating diamond */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '6vw', height: '6vw',
          background: 'rgba(200,155,60,0.15)',
          border: '1px solid rgba(200,155,60,0.3)',
          rotate: 45,
        }}
        animate={{
          x: ['75vw', '88vw', '12vw', '60vw', '30vw', '80vw'][sceneIndex],
          y: ['18vh', '62vh', '28vh', '8vh', '72vh', '45vh'][sceneIndex],
          scale: [1, 1.2, 1.5, 0.8, 1.3, 1][sceneIndex],
          opacity: 0.35,
        }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Scene content */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
