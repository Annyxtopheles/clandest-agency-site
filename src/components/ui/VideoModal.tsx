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
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
