import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, RefreshCw, Bot, User, ArrowUpRight } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How long does a website take?",
  "How does your pricing work?",
  "Who are the founders?",
  "Do I get all raw source files?"
];

// Lightweight Markdown formatter for links, bold, bullet points
const formatMarkdown = (text: string) => {
  const lines = text.split('\n');

  return (
    <div className="ai-chat-formatted-text">
      {lines.map((line, lineIdx) => {
        const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        const cleanLine = isBullet ? line.trim().substring(2) : line;

        // Process bold and links inside the line
        let currentText = cleanLine;

        // Simple bold parser **text**
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let bMatch;
        let bLastIdx = 0;
        const subParts: { text: string; isBold: boolean }[] = [];

        while ((bMatch = boldRegex.exec(currentText)) !== null) {
          if (bMatch.index > bLastIdx) {
            subParts.push({ text: currentText.substring(bLastIdx, bMatch.index), isBold: false });
          }
          subParts.push({ text: bMatch[1], isBold: true });
          bLastIdx = boldRegex.lastIndex;
        }
        if (bLastIdx < currentText.length) {
          subParts.push({ text: currentText.substring(bLastIdx), isBold: false });
        }

        const renderedLine = subParts.map((sp, spIdx) => {
          // Check for links inside each part
          const linkMatches = [...sp.text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
          if (linkMatches.length === 0) {
            return sp.isBold ? <strong key={spIdx}>{sp.text}</strong> : sp.text;
          }

          const linkNodes: React.ReactNode[] = [];
          let lLast = 0;
          linkMatches.forEach((lm, lmIdx) => {
            const before = sp.text.substring(lLast, lm.index!);
            if (before) linkNodes.push(before);
            const isInternal = lm[2].startsWith('/') || lm[2].startsWith('#');
            linkNodes.push(
              <a
                key={lmIdx}
                href={lm[2]}
                target={isInternal ? '_self' : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                className="ai-chat-inline-link"
              >
                {lm[1]}
                {!isInternal && <ArrowUpRight size={12} className="inline-icon" />}
              </a>
            );
            lLast = lm.index! + lm[0].length;
          });
          if (lLast < sp.text.length) {
            linkNodes.push(sp.text.substring(lLast));
          }

          return sp.isBold ? <strong key={spIdx}>{linkNodes}</strong> : <React.Fragment key={spIdx}>{linkNodes}</React.Fragment>;
        });

        if (isBullet) {
          return (
            <div key={lineIdx} className="ai-chat-bullet-item">
              <span className="ai-chat-bullet-dot">•</span>
              <span>{renderedLine}</span>
            </div>
          );
        }

        return line.trim() === '' ? (
          <div key={lineIdx} className="ai-chat-line-break" />
        ) : (
          <p key={lineIdx} className="ai-chat-paragraph">
            {renderedLine}
          </p>
        );
      })}
    </div>
  );
};

export const AiChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi there! 👋 I am Clandest's AI Assistant.\n\nAsk me anything about our **brand design**, **custom web development**, or **marketing video** services. How can we help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    triggerHaptic();
    setHasInteracted(true);
    setInputValue('');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const outgoingMessages = newHistory
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: outgoingMessages })
      });

      const data = await response.json();
      const replyText = data.reply || (data.details ? `Error: ${data.details}` : data.error) || "Sorry, I couldn't process that. Please reach out to us at clandest.agency@gmail.com!";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "We build high-impact brand systems, custom React websites, and marketing videos. Feel free to [drop us a line directly on our Contact page](/contact) or message us on WhatsApp (+8801869504388)!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    triggerHaptic();
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Chat cleared! How can Clandest Agency help with your project today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="ai-chat-root">
      {/* Floating Trigger Button */}
      <motion.button
        className={`ai-chat-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => {
          triggerHaptic();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Clandest AI Assistant"
      >
        <div className="ai-chat-trigger-inner">
          <div className="ai-chat-icon-box">
            {isOpen ? <X size={20} /> : <Sparkles size={20} className="sparkle-anim" />}
          </div>
          <span className="ai-chat-trigger-label">Ask AI</span>
          <span className="ai-chat-status-dot" title="AI Ready" />
        </div>
      </motion.button>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-modal"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-info">
                <div className="ai-chat-avatar">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="ai-chat-title-row">
                    <span className="ai-chat-title">Clandest AI</span>
                    <span className="ai-chat-pill-badge">Online</span>
                  </div>
                  <p className="ai-chat-subtitle">Direct answers about brand, web & video</p>
                </div>
              </div>
              <div className="ai-chat-header-actions">
                <button
                  onClick={handleReset}
                  className="ai-chat-icon-btn"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RefreshCw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ai-chat-icon-btn"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="ai-chat-messages">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  className={`ai-chat-message-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {msg.role === 'assistant' && (
                    <div className="ai-chat-msg-avatar assistant">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className={`ai-chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                    {msg.role === 'assistant' ? formatMarkdown(msg.content) : <p>{msg.content}</p>}
                    <span className="ai-chat-timestamp">{msg.timestamp}</span>
                  </div>
                  {msg.role === 'user' && (
                    <div className="ai-chat-msg-avatar user">
                      <User size={14} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <div className="ai-chat-message-row assistant-row">
                  <div className="ai-chat-msg-avatar assistant">
                    <Bot size={14} />
                  </div>
                  <div className="ai-chat-bubble assistant-bubble typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}

              {/* Quick Suggestion Chips (visible when user hasn't sent many messages) */}
              {!hasInteracted && messages.length <= 2 && (
                <div className="ai-chat-suggestions">
                  <p className="ai-chat-suggestions-label">Suggested questions:</p>
                  <div className="ai-chat-chips-wrap">
                    {QUICK_PROMPTS.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        className="ai-chat-chip"
                        onClick={() => handleSendMessage(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input Bar */}
            <div className="ai-chat-footer">
              <form
                className="ai-chat-input-form"
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  className="ai-chat-input"
                  placeholder="Ask about services, pricing, timelines..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="ai-chat-send-btn"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="ai-chat-footer-note">
                <span>Want to talk to founders directly?</span>
                <a href="/contact" onClick={() => setIsOpen(false)} className="ai-chat-footer-link">
                  Book a 15-min call →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
