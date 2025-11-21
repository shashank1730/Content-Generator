import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PreviewProps {
  content: string;
}

export function LinkedInPreview({ content }: { content: string }) {
  return (
    <div className="linkedin-card" suppressHydrationWarning>
      {/* Card Header */}
      <div className="card-header">
        <span className="suggested">Suggested</span>
        <div className="header-actions">
          <span>•••</span>
          <span>✕</span>
        </div>
      </div>

      <div className="user-row">
        <div className="avatar">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
        <div className="meta-col">
          <div className="top-line">
            <span className="name">Krish Dubey</span>
            <span className="linkedin-icon">in</span>
            <span className="degree"> • 3rd+</span>
            <button className="follow-btn">+ Follow</button>
          </div>
          <div className="headline">Founder, @SentientLabs | 24/7 Voice Front Desk for HVAC...</div>
          <div className="time-row">
            <span>9h • Edited • </span>
            <span className="globe">🌐</span>
          </div>
        </div>
      </div>
      
      <div className="content">
        {content ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          "Your LinkedIn post will appear here..."
        )}
        <span className="see-more"> ...more</span>
      </div>
      
      <div className="social-counts">
        <div className="icons">
          <span className="icon-circle like">👍</span>
          <span className="icon-circle bulb">💡</span>
          <span className="icon-circle heart">❤️</span>
        </div>
        <span className="count">37</span>
        <span className="comments">16 comments</span>
      </div>

      <div className="action-bar">
        <button className="action-btn">
          <span className="icon">👍</span> Like
        </button>
        <button className="action-btn">
          <span className="icon">💬</span> Comment
        </button>
        <button className="action-btn">
          <span className="icon">🔄</span> Repost
        </button>
        <button className="action-btn">
          <span className="icon">✈️</span> Send
        </button>
      </div>

      <style jsx>{`
        .linkedin-card {
          background: #1e1e1e;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 12px;
          font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto;
          max-width: 555px;
          width: 100%;
          color: #e1e1e1;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          color: #a3a3a3;
          font-size: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid #333;
          padding-bottom: 8px;
        }

        .user-row { display: flex; gap: 12px; margin-bottom: 12px; }
        .avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; background: #333; }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        
        .meta-col { flex: 1; }
        .top-line { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .name { font-weight: 600; font-size: 14px; color: #ffffff; }
        .linkedin-icon { 
          background: #f8c77e; 
          color: #000; 
          font-size: 10px; 
          font-weight: bold; 
          padding: 0 4px; 
          border-radius: 2px; 
        }
        .degree { color: #a3a3a3; font-size: 12px; }
        .follow-btn { 
          color: #60a5fa; 
          background: transparent; 
          border: none; 
          font-weight: 600; 
          font-size: 14px; 
          cursor: pointer;
          margin-left: auto;
        }

        .headline { font-size: 12px; color: #a3a3a3; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px; }
        .time-row { font-size: 12px; color: #a3a3a3; margin-top: 2px; }

        .content { font-size: 14px; line-height: 1.5; color: #ffffff; white-space: pre-wrap; margin-bottom: 12px; }
        .see-more { color: #a3a3a3; cursor: pointer; }

        .social-counts {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #a3a3a3;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #333;
        }
        .icons { display: flex; align-items: center; margin-right: 6px; }
        .icon-circle { font-size: 10px; margin-right: -4px; z-index: 1; }
        .comments { margin-left: auto; }

        .action-bar {
          display: flex;
          justify-content: space-between;
          padding-top: 4px;
        }
        .action-btn {
          background: transparent;
          border: none;
          color: #e1e1e1;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 8px;
          cursor: pointer;
          border-radius: 4px;
        }
        .action-btn:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}

export const TwitterPreview = ({ content }: PreviewProps) => {
  const tweets = content ? content.split('\n\n') : ["Your Twitter thread will appear here..."];

  return (
    <div className="twitter-thread">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet-card">
          <div className="avatar"></div>
          <div className="tweet-body">
            <div className="header">
              <span className="name">Your Name</span>
              <span className="handle">@username · 1h</span>
            </div>
            <div className="text">{tweet}</div>
            <div className="actions">
              <span>💬 12</span>
              <span>🔄 5</span>
              <span>❤️ 89</span>
              <span>📊 1.2k</span>
            </div>
          </div>
          {index < tweets.length - 1 && <div className="thread-line"></div>}
        </div>
      ))}

      <style jsx>{`
        .twitter-thread {
          max-width: 500px;
          width: 100%;
        }
        .tweet-card {
          background: white;
          border: 1px solid #eff3f4;
          padding: 12px 16px;
          display: flex;
          gap: 12px;
          position: relative;
        }
        .avatar { 
          width: 40px; 
          height: 40px; 
          background: #cbd5e1; 
          border-radius: 50%; 
          flex-shrink: 0;
        }
        .header { margin-bottom: 4px; }
        .name { font-weight: 700; color: #0f1419; margin-right: 5px; }
        .handle { color: #536471; }
        .text { font-size: 15px; line-height: 1.5; color: #0f1419; white-space: pre-wrap; }
        .actions { 
          margin-top: 12px; 
          display: flex; 
          justify-content: space-between; 
          color: #536471; 
          font-size: 13px; 
          max-width: 300px; 
        }
        .thread-line {
          position: absolute;
          left: 31px;
          top: 52px;
          bottom: -12px;
          width: 2px;
          background: #cfd9de;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export const MediumPreview = ({ content }: PreviewProps) => {
  return (
    <div className="medium-article">
      <div className="meta">
        <div className="avatar"></div>
        <div className="info">
          <span className="name">Your Name</span>
          <span className="date">Nov 20 · 5 min read</span>
        </div>
      </div>
      
      <article className="article-body">
        {content ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <>
            <h1>Your Article Title</h1>
            <p>Your Medium article content will appear here...</p>
          </>
        )}
      </article>

      <style jsx>{`
        .medium-article {
          background: white;
          max-width: 700px;
          width: 100%;
          padding: 40px;
          font-family: "Charter", "Bitstream Charter", "Sitka Text", Cambria, serif;
          color: #242424;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .meta { display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
        .avatar { width: 40px; height: 40px; background: #cbd5e1; border-radius: 50%; }
        .info { display: flex; flex-direction: column; font-family: -apple-system, sans-serif; }
        .name { font-size: 14px; font-weight: 500; }
        .date { font-size: 13px; color: #6b6b6b; }
        .article-body { font-size: 20px; line-height: 1.58; }
        h1 { font-size: 32px; font-weight: 700; margin-bottom: 10px; font-family: -apple-system, sans-serif; }
      `}</style>
    </div>
  );
};
