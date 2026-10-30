import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AiChatWidget } from './components/ui/AiChatWidget';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  const location = useLocation();

  const handleRouteExitComplete = () => {
    if (typeof window === 'undefined') return;
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait" onExitComplete={handleRouteExitComplete}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.85 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <AiChatWidget />
    </>
  );
};

