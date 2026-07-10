import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Reusable physical-feeling magnetic spring button snap wrapper
export function MagneticButton({ children, className, style, onClick }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate cursor distance vector from elements center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Magnetic pull factor (30% tracking displacement)
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ 
        type: 'spring', 
        stiffness: 160, 
        damping: 12, 
        mass: 0.15 
      }}
      className={className}
      style={{ ...style, display: 'inline-block' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Interactive matrix-style text decryption hover effect
export function DecryptText({ text, className, style }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!_?";
  const intervalRef = useRef(null);

  const startDecrypt = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let iterations = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(intervalRef.current);
      }
      // Speed factor of decryption reveal
      iterations += 1 / 3;
    }, 25);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span 
      onMouseEnter={startDecrypt} 
      className={className} 
      style={{ ...style, cursor: 'pointer', display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
}
