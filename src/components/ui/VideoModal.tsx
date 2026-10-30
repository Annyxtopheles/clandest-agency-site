import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

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

  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          key={videoId}
          className="video-modal-overlay active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <motion.div
            className="video-modal-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.85 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="video-modal-close-btn" aria-label="Close Video Player" onClick={onClose}>
              &times;
            </button>
            <div className="video-modal-iframe-box">
              {videoId.length === 11 ? (
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
