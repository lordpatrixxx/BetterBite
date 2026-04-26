import { useState, useRef, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { useProductSearch } from '@/src/hooks/useProductSearch';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import HealthScoreBadge from './ui/HealthScoreBadge';

export default function SearchBar({ autoFocus = false, onResultClick }: { autoFocus?: boolean, onResultClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, results, isLoading } = useProductSearch();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (barcode: string) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/product/${barcode}`);
    if (onResultClick) onResultClick();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto px-4 md:px-0">
      <div className={cn(
        "relative flex items-center bg-surface border-2 border-border transition-all duration-300 focus-within:border-primary focus-within:shadow-xl focus-within:shadow-primary/5 rounded-2xl md:rounded-[2rem] px-6 py-4 md:py-6 group",
        isOpen && results.length > 0 && "rounded-b-none"
      )}>
        <Search className="w-5 h-5 text-text-muted group-focus-within:text-primary mr-4 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by product name..."
          autoFocus={autoFocus}
          className="bg-transparent border-none outline-none w-full text-text placeholder:text-text-faint font-medium text-lg"
        />
        {isLoading && <Loader2 className="w-5 h-5 text-primary animate-spin ml-2" />}
        {query && !isLoading && (
          <button onClick={() => setQuery("")} className="ml-2 p-1 hover:bg-surface-2 rounded-full transition-colors text-text-muted">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-surface border-2 border-t-0 border-border z-40 max-h-[400px] overflow-y-auto rounded-b-3xl shadow-2xl"
          >
            {results.map((product) => (
              <button
                key={product.barcode}
                onClick={() => handleSelect(product.barcode)}
                className="w-full flex items-center gap-4 p-4 md:p-5 hover:bg-surface-2 transition-colors border-b border-border last:border-0"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex-shrink-0 p-2 overflow-hidden border border-border">
                  <img src={product.image} alt="" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-display font-bold text-text group-hover:text-primary transition-colors leading-tight mb-0.5 line-clamp-1">{product.name}</div>
                  <div className="text-xs text-text-muted">{product.brand}</div>
                </div>
                <HealthScoreBadge score={product.score} size="sm" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

