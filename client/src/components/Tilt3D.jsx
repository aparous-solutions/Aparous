import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Tilt3D({ children, style, className }) {
  const cardRef = useRef(null);

  // Motion values for x/y mouse percentages
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for rotation coordinates
  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 220, damping: 25 });

  // Glare/shine gradients position
  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), { stiffness: 220, damping: 25 });
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), { stiffness: 220, damping: 25 });
  const glareOpacity = useSpring(0, { stiffness: 220, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize values between 0 and 1
    x.set(mouseX / width);
    y.set(mouseY / height);
    glareOpacity.set(0.12);
  };

  const handleMouseLeave = () => {
    // Return springs back to center/neutral states
    x.set(0.5);
    y.set(0.5);
    glareOpacity.set(0);
  };

  const glareStyle = useTransform(
    [glareX, glareY, glareOpacity],
    ([gx, gy, go]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, ${go}) 0%, transparent 80%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.025, y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        ...style
      }}
      className={className}
    >
      {/* Glare reflect layer */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: glareStyle,
          pointerEvents: 'none',
          zIndex: 10,
          borderRadius: 'inherit'
        }}
      />
      {/* Dynamic 3D depth children wrapper */}
      <div style={{ transform: 'translateZ(10px)', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
