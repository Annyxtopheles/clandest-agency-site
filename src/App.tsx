import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SmoothCursor } from './components/ui/SmoothCursor';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <>
      <SmoothCursor />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};
