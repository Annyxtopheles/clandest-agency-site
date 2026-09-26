import React, { useState, useEffect } from 'react';
import { ServiceProjectItem } from '../../data/serviceProjects';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { triggerHaptic } from '../../utils/haptics';

interface ProjectGalleryModalProps {
  project: ServiceProjectItem | null;
  onClose: () => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  if (!project) return null;

  const currentImage = project.galleryImages[activeImageIndex] || {
    url: project.coverImage,
    caption: project.title,
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.galleryImages.length);
    triggerHaptic('light');
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
    triggerHaptic('light');
  };

  return (
    <div className="video-modal-overlay active" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="project-gallery-modal-dialog" 
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
          <div className="project-modal-image-wrapper">
            {currentImage.comparison ? (
              <BeforeAfterSlider
                key={`${project.id}-${activeImageIndex}`}
                beforeImage={currentImage.comparison.beforeImage}
                afterImage={currentImage.comparison.afterImage}
                beforeLabel={currentImage.comparison.beforeLabel}
                afterLabel={currentImage.comparison.afterLabel}
              />
            ) : (
              <img 
                src={currentImage.url} 
                alt={currentImage.caption || project.title} 
                className="project-modal-main-img"
              />
            )}

            {project.galleryImages.length > 1 && (
              <>
                <button 
                  className="gallery-nav-btn prev" 
                  onClick={prevImage}
                  aria-label="Previous Image"
                >
                  ‹
                </button>
                <button 
                  className="gallery-nav-btn next" 
                  onClick={nextImage}
                  aria-label="Next Image"
                >
                  ›
                </button>
              </>
            )}
          </div>
          
          {/* Caption & Counter */}
          <div className="project-modal-caption">
            <span>{currentImage.caption}</span>
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
      </div>
    </div>
  );
};
