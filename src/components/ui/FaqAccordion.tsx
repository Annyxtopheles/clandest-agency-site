import React, { useState } from 'react';
import { triggerHaptic } from '../../utils/haptics';

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'How much does a project typically cost?',
    answer:
      'We work on transparent, fixed-price project quotes based on concrete deliverables rather than ambiguous hourly rates. Once we review your scope and goals during our initial consultation, you receive a clear, fixed proposal with zero surprise invoices or scope creep.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on scope: Direct-response marketing video edits (VSLs, UGC cuts) typically turn around in 3 to 7 days. Brand identity systems take 1 to 2 weeks. Full custom website redesigns and engineering take 2 to 4 weeks from kickoff to deployment.',
  },
  {
    question: 'Do we get the raw project and master source files?',
    answer:
      'Yes, 100%. Upon final project completion, you receive full commercial rights and all master files: vector Figma files and design assets, raw 4K video project timelines and audio stems, or clean GitHub repository source code with zero vendor lock-in.',
  },
  {
    question: 'How do revisions and feedback work?',
    answer:
      'Feedback is direct and collaborative. You work directly with the makers (Sadman for branding, Nafiur for web, Rafayet for video). We use collaborative platforms like Figma, Frame.io, and direct WhatsApp/Slack channels to iterate rapidly until every asset is pixel-perfect.',
  },
  {
    question: 'Can we meet before committing to work together?',
    answer:
      'Absolutely. We encourage a direct 15-minute intro conversation via Google Meet or WhatsApp call with our founding team to align on your goals, assess fit, and answer any questions before you invest a single dollar.',
  },
];

interface FaqAccordionProps {
  items?: FaqItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items = DEFAULT_FAQS,
  className = '',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    triggerHaptic('selection');
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className={`faq-accordion-container ${className}`} style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--c-border, #E5E7EB)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: isOpen ? '0 4px 20px rgba(46, 79, 148, 0.06)' : 'none',
              }}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  padding: '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: isOpen ? 'var(--c-blue, #2E4F94)' : 'var(--c-text, #1F2937)',
                  transition: 'color 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ paddingRight: '16px' }}>{item.question}</span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'rgba(46, 79, 148, 0.08)' : '#F3F4F6',
                    color: isOpen ? 'var(--c-blue, #2E4F94)' : '#6B7280',
                    fontSize: '20px',
                    lineHeight: 1,
                    transition: 'transform 0.25s ease, background-color 0.2s ease, color 0.2s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      padding: '0 28px 24px 28px',
                      fontSize: '17px',
                      lineHeight: 1.65,
                      color: 'var(--c-text-muted, #4B5563)',
                    }}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};