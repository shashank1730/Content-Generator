'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LinkedInPreview, TwitterPreview, MediumPreview } from '@/components/Previews';

interface Generation {
  id: string;
  topic: string;
  platform: string;
  tone: string;
  content: string;
  created_at: string;
}

export default function HistoryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }
      

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/history?user_id=${user.id}`);
      const data = await response.json();
      setGenerations(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return '💼';
      case 'Twitter': return '🐦';
      case 'Medium': return '📝';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="history-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your history...</p>
        </div>
        <style jsx>{`
          .history-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: var(--bg-primary);
          }
          .loading-state {
            text-align: center;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top-color: var(--accent-color);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="history-container">
      {/* LEFT: History List */}
      <div className="history-list">
        <header>
          <h1>History</h1>
          <p className="text-muted">{generations.length} generation{generations.length !== 1 ? 's' : ''}</p>
        </header>

        {generations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No generations yet</h3>
            <p>Your generated content will appear here</p>
          </div>
        ) : (
          <div className="generations-list">
            {generations.map((gen) => (
              <div
                key={gen.id}
                className={`generation-card ${selectedGeneration?.id === gen.id ? 'active' : ''}`}
                onClick={() => setSelectedGeneration(gen)}
              >
                <div className="card-header">
                  <span className="platform-badge">
                    {getPlatformIcon(gen.platform)} {gen.platform}
                  </span>
                  <span className="date">{formatDate(gen.created_at)}</span>
                </div>
                <h3 className="topic">{gen.topic}</h3>
                <div className="card-footer">
                  <span className="tone-badge">{gen.tone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Preview */}
      <div className="preview-pane">
        {selectedGeneration ? (
          <>
            <div className="preview-header">
              <div>
                <h2>{selectedGeneration.topic}</h2>
                <p className="meta">
                  {getPlatformIcon(selectedGeneration.platform)} {selectedGeneration.platform} • {selectedGeneration.tone} • {formatDate(selectedGeneration.created_at)}
                </p>
              </div>
            </div>
            <div className="preview-scroll-area">
              {selectedGeneration.platform === 'LinkedIn' && <LinkedInPreview content={selectedGeneration.content} />}
              {selectedGeneration.platform === 'Twitter' && <TwitterPreview content={selectedGeneration.content} />}
              {selectedGeneration.platform === 'Medium' && <MediumPreview content={selectedGeneration.content} />}
            </div>
          </>
        ) : (
          <div className="empty-preview">
            <div className="empty-icon">👈</div>
            <h3>Select a generation</h3>
            <p>Click on any item from the history to preview it</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .history-container {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .history-list {
          width: 400px;
          background: white;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        header {
          padding: 30px;
          border-bottom: 1px solid var(--border-color);
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .generations-list {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .generation-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .generation-card:hover {
          border-color: var(--accent-color);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
        }

        .generation-card.active {
          background: #eff6ff;
          border-color: var(--accent-color);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .platform-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 8px;
          background: white;
          border-radius: 6px;
          border: 1px solid var(--border-color);
        }

        .date {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .topic {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .card-footer {
          display: flex;
          gap: 8px;
        }

        .tone-badge {
          font-size: 0.7rem;
          padding: 2px 8px;
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-color);
          border-radius: 4px;
          font-weight: 500;
        }

        .empty-state,
        .empty-preview {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          color: var(--text-secondary);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3,
        .empty-preview h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .preview-pane {
          flex: 1;
          background: #000000;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .preview-header {
          padding: 24px 30px;
          background: #1e1e1e;
          border-bottom: 1px solid #333;
          color: white;
        }

        .preview-header h2 {
          font-size: 1.3rem;
          margin-bottom: 8px;
        }

        .meta {
          font-size: 0.9rem;
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
      `}</style>
    </div>
  );
}
