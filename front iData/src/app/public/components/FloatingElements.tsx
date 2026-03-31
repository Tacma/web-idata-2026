import { motion } from 'motion/react';

interface FloatingElementsProps {
  colorMain: string;
  colorAccent: string;
}

export function FloatingElements({ colorMain, colorAccent }: FloatingElementsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Elemento flotante 1 - Superior derecha - MÁS GRANDE Y VISIBLE */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{ background: colorMain, filter: 'blur(80px)' }}
        animate={{
          scale: [1, 1.2, 1.1, 1],
          x: ['-10%', '5%', '0%', '-10%'],
          y: ['-10%', '5%', '-5%', '-10%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ top: '-10%', right: '-10%', opacity: 1 }}
      />
      
      {/* Elemento flotante 2 - Inferior izquierda - MÁS GRANDE Y VISIBLE */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{ background: colorAccent, filter: 'blur(70px)' }}
        animate={{
          scale: [1, 1.15, 1.1, 1],
          x: ['0%', '-10%', '5%', '0%'],
          y: ['0%', '10%', '-5%', '0%'],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        initial={{ bottom: '-15%', left: '-15%', opacity: 1 }}
      />

      {/* Elemento flotante 3 - Centro - NUEVO PARA MÁS PRESENCIA */}
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{ background: colorMain, filter: 'blur(65px)' }}
        animate={{
          scale: [1, 1.25, 1.05, 1],
          x: ['0%', '15%', '-10%', '0%'],
          y: ['0%', '-10%', '5%', '0%'],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        initial={{ top: '40%', right: '30%', opacity: 0.9 }}
      />
    </div>
  );
}