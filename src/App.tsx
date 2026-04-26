import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import BarcodeScanner from './components/BarcodeScanner';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bg text-text selection:bg-primary selection:text-white">
        <Navbar 
          onScanOpen={() => setIsScannerOpen(true)} 
          onSearchOpen={() => setIsSearchOverlayOpen(true)} 
        />
        
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<HomePage onScanOpen={() => setIsScannerOpen(true)} />} />
            <Route path="/product/:barcode" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>
        </main>
        
        <Footer />

        <AnimatePresence>
          {isScannerOpen && (
            <BarcodeScanner 
              isOpen={isScannerOpen} 
              onClose={() => setIsScannerOpen(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
