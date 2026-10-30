import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ServiceProjectItem } from '../../data/serviceProjects';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { triggerHaptic } from '../../utils/haptics';

interface ProjectGalleryModalProps {
  project: ServiceProjectItem | null;
  onClose: () => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const overlayMouseDownRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && project && project.galleryImages.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % project.galleryImages.length);
        triggerHaptic('light');
      } else if (e.key === 'ArrowLeft' && project && project.galleryImages.length > 1) {
        setActiveImageIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
        triggerHaptic('light');
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      overlayMouseDownRef.current = true;
    } else {
      overlayMouseDownRef.current = false;
    }
  };

  const handleOverlayMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayMouseDownRef.current && e.target === e.currentTarget) {
      onClose();
    }
    overlayMouseDownRef.current = false;
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="video-modal-overlay active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={handleOverlayMouseDown}
          onMouseUp={handleOverlayMouseUp}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="project-gallery-modal-dialog"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.85 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close-btn"
              aria-label="Close Project Showcase"
              onClick={onClose}
            >
              &times;
            </button>

            {/* 1. Modal Visual Stage (At the very top) */}
            <div className="project-modal-stage">
              <div
                className="project-modal-image-wrapper"
                onTouchStart={(e) => {
                  const currentSlide = project.galleryImages[activeImageIndex];
                  if (currentSlide?.comparison) return;
                  touchStartXRef.current = e.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(e) => {
                  const currentSlide = project.galleryImages[activeImageIndex];
                  if (currentSlide?.comparison || touchStartXRef.current === null || project.galleryImages.length <= 1) {
                    touchStartXRef.current = null;
                    return;
                  }
                  const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
                  const deltaX = endX - touchStartXRef.current;
                  touchStartXRef.current = null;
                  if (Math.abs(deltaX) > 48) {
                    triggerHaptic('light');
                    if (deltaX < 0) {
                      setActiveImageIndex((prev) => (prev + 1) % project.galleryImages.length);
                    } else {
                      setActiveImageIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
                    }
                  }
                }}
              >
                {(project.galleryImages[activeImageIndex] || { url: project.coverImage, caption: project.title }).comparison ? (
                  <BeforeAfterSlider
                    key={`${project.id}-${activeImageIndex}`}
                    beforeImage={project.galleryImages[activeImageIndex].comparison!.beforeImage}
                    afterImage={project.galleryImages[activeImageIndex].comparison!.afterImage}
                  />
                ) : (
                  <img
                    src={(project.galleryImages[activeImageIndex] || { url: project.coverImage }).url}
                    alt={(project.galleryImages[activeImageIndex] || { caption: project.title }).caption || project.title}
                    className="project-modal-main-img"
                  />
                )}

                {project.galleryImages.length > 1 && (
                  <>
                    <button
                      className="gallery-nav-btn prev"
                      onClick={() => {
                        setActiveImageIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
                        triggerHaptic('light');
                      }}
                      aria-label="Previous Image"
                    >
                      ‹
                    </button>
                    <button
                      className="gallery-nav-btn next"
                      onClick={() => {
                        setActiveImageIndex((prev) => (prev + 1) % project.galleryImages.length);
                        triggerHaptic('light');
                      }}
                      aria-label="Next Image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Counter */}
              <div className="project-modal-caption">
                <span>{(project.galleryImages[activeImageIndex] || { caption: project.title }).caption}</span>
                {project.galleryImages.length > 1 && (
                  <span className="project-modal-counter">
                    {activeImageIndex + 1} / {project.galleryImages.length}
                  </span>
                )}
              </div>

              {/* Complete Thumbnails Strip */}
              {project.galleryImages.length > 1 && (
                <div className="project-modal-thumbnails">
                  {project.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      className={`project-modal-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        triggerHaptic('light');
                      }}
                      aria-label={`View slide ${idx + 1}`}
                    >
                      <img src={img.url} alt={`Slide ${idx + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Modal Header (Title & Author underneath visual stage) */}
            <div className="project-modal-header">
              <h2 className="project-modal-title">{project.title}</h2>
              <p className="project-modal-author">{project.author}</p>
            </div>

            {/* 3. Project Description & Deliverables */}
            <div className="project-modal-content">
              <div className="project-modal-summary">
                <h3 className="project-modal-section-title">Overview</h3>
                <p>{project.summary}</p>
              </div>

              <div className="project-modal-deliverables">
                <h3 className="project-modal-section-title">What was delivered</h3>
                <ul className="project-modal-check-list">
                  {project.deliverables.map((deliv, i) => (
                    <li key={i}>
                      <span className="deliverable-check">✓</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Optional Live Demo Link */}
            {project.liveUrl && (
              <div className="project-modal-footer">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal-btn primary"
                  onClick={() => triggerHaptic('selection')}
                >
                  <span>Visit Live Working Demo</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
