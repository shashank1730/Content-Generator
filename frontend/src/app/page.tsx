'use client';

import Link from 'next/link';
import { LinkedInPreview } from '@/components/Previews';

export default function LandingPage() {
  const demoContent = `🚀 **The Future of Content Creation is Here**

Stop staring at a blank cursor. Our AI Agent researches your topic, matches your tone, and writes viral content for LinkedIn, Twitter, and Medium in seconds.

It's not just a chatbot. It's your personal **Content Architect**.`;

  return (
    <div className="landing-page" suppressHydrationWarning>
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">⚡ AI Creator</div>
        <div className="nav-actions">
          <Link href="/login" className="btn btn-ghost">Log in</Link>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge-pill">✨ v1.0 Now Live</div>
          <h1>Create Viral Content <br /> <span className="gradient-text">in Seconds.</span></h1>
          <p className="subtitle">
            The first AI Agent that researches, writes, and formats content specifically for 
            <strong> LinkedIn, Twitter, and Medium</strong>.
          </p>
          
          <div className="cta-group">
            <Link href="/signup" className="btn btn-primary btn-lg">Start Creating for Free</Link>
            <span className="sub-cta">No credit card required</span>
          </div>
        </div>

        {/* Visual Demo */}
        <div className="hero-visual">
          <div className="visual-card">
            <LinkedInPreview content={demoContent} />
          </div>
          <div className="blob"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🧠</div>
            <h3>Deep Research</h3>
            <p>Our agent browses the web to find real facts and sources before writing a single word.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎨</div>
            <h3>Tone Matching</h3>
            <p>Professional, Funny, or Controversial? You choose the vibe, we handle the voice.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📱</div>
            <h3>Platform Native</h3>
            <p>Perfect formatting for LinkedIn cards, Twitter threads, and Medium articles.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          color: #ffffff;
          font-family: var(--font-geist-sans), sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .landing-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          max-width: 1200px;
          width: calc(100% - 80px);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .logo { 
          font-weight: 700; 
          font-size: 1.3rem; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .nav-actions { display: flex; gap: 16px; align-items: center; }

        /* Hero */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 180px 40px 100px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 32px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 4.5rem;
          line-height: 1.1;
          font-weight: 900;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .gradient-text {
          background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.6));
        }

        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 48px;
          max-width: 540px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .subtitle strong {
          color: #ffffff;
          font-weight: 700;
        }

        .cta-group { 
          display: flex; 
          align-items: center; 
          gap: 20px; 
        }
        
        .btn-lg { 
          padding: 16px 40px; 
          font-size: 1rem; 
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-weight: 600;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .btn-lg:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
        
        .sub-cta { 
          font-size: 0.875rem; 
          color: rgba(255, 255, 255, 0.8); 
          font-weight: 500;
        }

        /* Visual */
        .hero-visual { 
          position: relative; 
          display: flex;
          justify-content: center;
        }
        
        .visual-card {
          position: relative;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.3),
            0 0 100px rgba(6, 182, 212, 0.3);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px;
          transition: transform 0.3s;
        }

        .visual-card:hover {
          transform: scale(1.02);
        }
        
        .blob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150%;
          height: 150%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%);
          filter: blur(60px);
          z-index: -1;
        }

        /* Features */
        .features {
          padding: 100px 0;
          margin-top: 60px;
          position: relative;
          z-index: 1;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card:hover { 
          transform: translateY(-8px); 
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .icon { 
          font-size: 2.5rem; 
          margin-bottom: 24px; 
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        
        h3 { 
          font-size: 1.3rem; 
          font-weight: 700; 
          margin-bottom: 12px; 
          color: #ffffff;
        }
        
        p { 
          color: rgba(255, 255, 255, 0.85); 
          line-height: 1.6; 
          font-size: 1rem;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 60px;
            padding-top: 160px;
          }
          h1 { font-size: 3rem; }
          .hero-content { align-items: center; }
          .subtitle { margin-left: auto; margin-right: auto; }
          .features-grid { grid-template-columns: 1fr; }
          .navbar { width: calc(100% - 40px); }
        }
      `}</style>
    </div>
  );
}
