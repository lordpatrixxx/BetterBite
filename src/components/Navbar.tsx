import { Link, useLocation } from 'react-router-dom';
import { Search, ScanBarcode, Sun, Moon, Menu, X, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar({ onScanOpen, onSearchOpen }: { onScanOpen: () => void, onSearchOpen: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-bg/80 backdrop-blur-md py-3 border-border" : "bg-transparent py-5 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Leaf className="w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-primary">BetterBite</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-text-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={onSearchOpen}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors focus-ring"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-text-muted" />
          </button>
          <button 
            onClick={onScanOpen}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors focus-ring"
            aria-label="Scan Barcode"
          >
            <ScanBarcode className="w-5 h-5 text-text-muted" />
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-2 transition-colors focus-ring"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-text-muted" /> : <Moon className="w-5 h-5 text-text-muted" />}
          </button>
        </div>

        <button 
          className="md:hidden p-2 rounded-md focus-ring"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Leaf className="w-8 h-8 text-primary" />
                <span className="text-xl font-display font-bold text-primary">BetterBite</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-6 items-center justify-center flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-semibold text-text"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 mt-8">
                 <button 
                  onClick={() => { setIsMobileMenuOpen(false); onSearchOpen(); }}
                  className="p-4 rounded-2xl bg-surface-2 focus-ring"
                >
                  <Search className="w-6 h-6" />
                </button>
                 <button 
                  onClick={() => { setIsMobileMenuOpen(false); onScanOpen(); }}
                  className="p-4 rounded-2xl bg-surface-2 focus-ring"
                >
                  <ScanBarcode className="w-6 h-6" />
                </button>
                <button 
                  onClick={toggleDarkMode}
                  className="p-4 rounded-2xl bg-surface-2 focus-ring"
                >
                  {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="mt-auto text-center text-text-faint text-sm">
              Scan. Know. Eat Smarter.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
