import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Deactivate preloader after timeline finishes
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 4200);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, []);

  const logoContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      y: '100%', 
      opacity: 0,
      filter: 'blur(8px)'
    },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 1.0, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const quoteVariants = {
    hidden: { 
      opacity: 0, 
      y: 12,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 1.4 // Triggers after the logo letters slide in
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.76, 0, 0.24, 1],
        delay: 1.0 
      }
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          exit={{ 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#05020c',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle volumetric ambient background spotlight */}
          <div style={{
            position: 'absolute',
            width: '45vw',
            height: '45vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(161, 79, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />

          {/* Masked Rising Logo */}
          <motion.div 
            variants={logoContainer}
            initial="hidden"
            animate="visible"
            style={{ 
              display: 'flex', 
              overflow: 'hidden', 
              marginBottom: '20px' 
            }}
          >
            {"APAROUS".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                variants={letterVariants}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                  fontWeight: '900',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-head)',
                  color: '#fff',
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                  display: 'inline-block',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Glowing Separator Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: '140px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #00f2fe, #a14fff, transparent)',
              boxShadow: '0 0 8px #00f2fe, 0 0 16px #a14fff',
              marginBottom: '20px',
              originX: 0.5,
            }}
          />

          {/* Masked Subheading Quote */}
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              variants={quoteVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-head)',
                fontWeight: '400',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Your Problem <span style={{ color: '#00f2fe', textShadow: '0 0 10px rgba(0, 242, 254, 0.3)' }}>Our Solution</span>
            </motion.p>
          </div>

          {/* Bottom loader tracker */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.25)',
            letterSpacing: '2px',
          }}>
            SYSTEMS_INITIALIZING...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
