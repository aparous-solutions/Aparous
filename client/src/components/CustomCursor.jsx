import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Expand ring on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.glass-panel') ||
        target.closest('.interactive') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth inertia loop for outer ring
    let animId;
    const tick = () => {
      const speed = 0.16; // Lerp factor
      ring.x += (mouse.x - ring.x) * speed;
      ring.y += (mouse.y - ring.y) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Central Cyan Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#00f2fe',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transition: 'transform 0.02s linear',
        }}
      />
      {/* Outer Purple Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovered ? (clicked ? '32px' : '45px') : '22px',
          height: hovered ? (clicked ? '32px' : '45px') : '22px',
          borderRadius: '50%',
          border: hovered ? '1.5px solid #a14fff' : '1.5px solid rgba(255, 255, 255, 0.45)',
          backgroundColor: hovered ? 'rgba(161, 79, 255, 0.05)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, background-color 0.25s',
          boxShadow: hovered ? '0 0 15px rgba(161, 79, 255, 0.25)' : 'none',
        }}
      />
    </>
  );
}
