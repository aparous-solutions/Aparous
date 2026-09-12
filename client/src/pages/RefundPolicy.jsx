import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '16px 8%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0f172a', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back to Aparous
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="text-gradient" style={{ fontFamily: 'var(--font-head)', fontSize: '1.25rem', fontWeight: '800' }}>APAROUS</span>
            <span style={{ fontSize: '0.55rem', background: 'var(--accent-purple)', color: '#fff', padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solutions</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 8% 80px 8%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124, 58, 237, 0.08)', padding: '6px 16px', borderRadius: '20px', color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '20px' }}>
          <RefreshCw size={14} /> Cancellation & Refund Policy
        </div>

        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
          Cancellation & Refund Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '40px' }}>
          Last Updated: September 12, 2026 • Effective Date: January 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: '1.7', color: 'var(--text-normal)', fontSize: '0.95rem' }}>
          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>1. Project Cancellation Terms</h2>
            <p>
              Clients may request cancellation of their service package order or project contract by submitting a written notice to <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>aparous.solutions@gmail.com</a> within <strong>24 hours</strong> of initial deposit or payment authorization, provided active engineering design work has not commenced.
            </p>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>2. Refund Eligibility & Criteria</h2>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <strong>Full Refund (100%):</strong> Eligible if cancellation request is received within 24 hours of payment and before project initiation work begins.
              </li>
              <li>
                <strong>Partial Refund (50%):</strong> If cancellation is requested during the initial discovery & UI/UX wireframe planning phase (before custom React development code is constructed).
              </li>
              <li>
                <strong>Non-Refundable:</strong> Once custom code development has commenced or production deliverables (source code, AI workflows, domain deployment) have been delivered to the client, fees are non-refundable due to the bespoke digital nature of our engineering services.
              </li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>3. Refund Process & Timeline (5–7 Business Days)</h2>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(2, 132, 199, 0.05)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(2, 132, 199, 0.15)', marginBottom: '15px' }}>
              <CheckCircle size={22} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#0f172a' }}>Guaranteed Processing Timeline:</strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-normal)' }}>
                  Approved refund amounts will be processed back to the client's original payment method (Credit/Debit Card, Net Banking, UPI, or Wallet) through the Razorpay Payment Gateway within <strong>5 to 7 working days</strong> from the date of refund approval.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>4. Contact for Cancellation Requests</h2>
            <p style={{ marginBottom: '15px' }}>
              To initiate a cancellation or track an existing refund status, please contact our financial operations team:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(124, 58, 237, 0.04)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(124, 58, 237, 0.12)' }}>
              <div><strong>Business Name:</strong> Aparous Solutions</div>
              <div><strong>Support Email:</strong> <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)' }}>aparous.solutions@gmail.com</a> / <a href="mailto:support@aparous.com" style={{ color: 'var(--accent-purple)' }}>support@aparous.com</a></div>
              <div><strong>Direct Phone:</strong> +91 9849836092</div>
              <div><strong>Physical Address:</strong> Hyderabad, Telangana, India - 500008</div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '30px 8%', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Aparous Solutions. All rights reserved.
      </footer>
    </div>
  );
}
