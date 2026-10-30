import React, { useEffect } from 'react';

interface VideoModalProps {
  videoId: string | null;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (videoId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div className="video-modal-overlay active" onClick={onClose}>
      <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close-btn" aria-label="Close Video Player" onClick={onClose}>
          &times;
        </button>
        <div className="video-modal-iframe-box">
          {videoId && videoId.length === 11 ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '320px', padding: '30px', textAlign: 'center', color: '#FFFFFF' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#FFFFFF' }}>{title}</h3>
              <p style={{ color: '#AAAAAA', maxWidth: '440px', margin: '0 auto', fontSize: '16px', lineHeight: 1.5 }}>
                Post-production project link being connected. Please provide the YouTube video link to play the embed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
