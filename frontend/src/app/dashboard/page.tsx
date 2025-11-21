'use client';

import { useState, useRef, useEffect } from 'react';
import { LinkedInPreview, TwitterPreview, MediumPreview } from '@/components/Previews';
import { createClient } from '@/utils/supabase/client';

export default function DashboardPage() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('LinkedIn');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [editorWidth, setEditorWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic, 
          tone, 
          platform,
          user_id: user?.id // Send user_id if available
        }),
      });
      const data = await res.json();
      setContent(data.content);
    } catch (error) {
      console.error(error);
      alert('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      
      // Constrain width between 300px and 70% of container
      const minWidth = 300;
      const maxWidth = containerRect.width * 0.7;
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setEditorWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="editor-container" ref={containerRef}>
      {/* LEFT SIDE: The Lab */}
      <div className="editor-pane" style={{ width: `${editorWidth}px` }}>
        <header>
          <h1>New Generation</h1>
          <p className="text-muted">Create viral content in seconds.</p>
        </header>

        <div className="form-group">
          <label>Topic</label>
          <input 
            type="text" 
            className="input" 
            placeholder="e.g., AI Agents in 2025"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="form-group">
            <label>Platform</label>
            <select 
              className="input" 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter / X</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Tone</label>
            <select 
              className="input" 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Funny">Funny</option>
              <option value="Controversial">Controversial</option>
              <option value="Inspirational">Inspirational</option>
            </select>
          </div>
        </div>

        <button 
          className="btn btn-primary w-full" 
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Draft ✨'}
        </button>

        {/* Manual Edit Area */}
        {content && (
          <div className="form-group" style={{ marginTop: '20px' }}>
            <label>Edit Content</label>
            <textarea 
              className="input" 
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
            />
          </div>
        )}
      </div>

      {/* RESIZER */}
      <div 
        className={`resizer ${isResizing ? 'resizing' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="resizer-line"></div>
      </div>

      {/* RIGHT SIDE: The Preview */}
      <div className="preview-pane">
        <div className="preview-header">
          <span className="badge">Live Preview ({platform})</span>
        </div>
        
        <div className="preview-scroll-area">
          {platform === 'LinkedIn' && <LinkedInPreview content={content} />}
          {platform === 'Twitter' && <TwitterPreview content={content} />}
          {platform === 'Medium' && <MediumPreview content={content} />}
        </div>
      </div>

      <style jsx>{`
        .editor-container {
          display: flex;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        .editor-pane {
          padding: 30px;
          background: white;
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow-y: auto;
          flex-shrink: 0;
        }

        .resizer {
          width: 8px;
          background: var(--border-color);
          cursor: col-resize;
          position: relative;
          flex-shrink: 0;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resizer:hover,
        .resizer.resizing {
          background: #2563eb;
        }

        .resizer-line {
          width: 2px;
          height: 40px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
        }

        .preview-pane {
          background: #000000;
          display: flex;
          flex-direction: column;
          height: 100vh;
          flex: 1;
          min-width: 0;
        }

        .preview-header {
          padding: 16px 30px;
          background: #1e1e1e;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .badge {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #a3a3a3;
        }

        .preview-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        header { margin-bottom: 30px; }
        h1 { font-size: 1.5rem; margin-bottom: 4px; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
      `}</style>
    </div>
  );
}
