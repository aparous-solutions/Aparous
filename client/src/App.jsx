import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import IntroPreloader from './components/IntroPreloader';
import Chatbot from './components/Chatbot';
import ClientHome from './pages/ClientHome';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Register GSAP ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

function App() {
  useEffect(() => {
    // Only run smooth momentum scrolling on the main client-facing path
    if (window.location.pathname !== '/') return;

    // Disable smooth scroll on mobile devices to use native hardware momentum scrolling
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    // Update ScrollTrigger on Lenis scroll updates
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis frame cycles
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Router>
      <Analytics />
      <SpeedInsights />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <IntroPreloader />
              <CustomCursor />
              <CanvasBackground />
              <ClientHome />
              <Chatbot />
            </>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={
              <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#05020c',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '0.85rem',
                letterSpacing: '1px'
              }}>
                LOADING OPERATING DESK...
              </div>
            }>
              <AdminDashboard />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
