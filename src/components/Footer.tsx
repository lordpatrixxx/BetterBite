import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-primary">BetterBite</span>
            </Link>
            <p className="text-text-muted text-sm max-w-sm leading-relaxed">
              Empowering Indian consumers to make healthier food choices through science-based data and AI-driven insights.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-text">Quick Links</h4>
            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-text">Data Source</h4>
            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Open Food Facts</a>
              <span className="text-xs">CC BY-SA 3.0</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-faint font-medium">
          <p>© 2026 BetterBite. A PCCOE Pune project guide by Prof. Shweta Devdas.</p>
          <div className="flex gap-6">
             <Link to="/about" className="hover:text-primary">Meet the Team</Link>
             <a href="#" className="hover:text-primary">Privacy Policy</a>
             <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

