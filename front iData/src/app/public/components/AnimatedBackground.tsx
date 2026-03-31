import { motion } from 'motion/react';

export function AnimatedBackground() {
  // Configuración de los blobs amorfos
  const blobs = [
    {
      id: 1,
      color: 'from-blue-300/40 to-purple-300/40',
      size: 'w-[600px] h-[600px]',
      initialX: '-10%',
      initialY: '10%',
      duration: 25,
    },
    {
      id: 2,
      color: 'from-purple-300/40 to-pink-300/40',
      size: 'w-[500px] h-[500px]',
      initialX: '70%',
      initialY: '20%',
      duration: 30,
    },
    {
      id: 3,
      color: 'from-pink-300/40 to-blue-300/40',
      size: 'w-[550px] h-[550px]',
      initialX: '40%',
      initialY: '60%',
      duration: 28,
    },
    {
      id: 4,
      color: 'from-cyan-300/40 to-blue-300/40',
      size: 'w-[450px] h-[450px]',
      initialX: '80%',
      initialY: '70%',
      duration: 32,
    },
    {
      id: 5,
      color: 'from-indigo-300/40 to-purple-300/40',
      size: 'w-[400px] h-[400px]',
      initialX: '15%',
      initialY: '80%',
      duration: 27,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute ${blob.size} rounded-full bg-gradient-to-br ${blob.color}`}
          style={{
            filter: 'blur(60px)',
            left: blob.initialX,
            top: blob.initialY,
          }}
          animate={{
            x: [0, 100, -50, 80, 0],
            y: [0, -80, 60, -40, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}