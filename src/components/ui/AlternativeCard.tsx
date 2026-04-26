import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/src/lib/openFoodFacts';
import HealthScoreBadge from './HealthScoreBadge';
import { getHealthRating } from '@/src/lib/healthScore';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface AlternativeCardProps {
  product: Product;
  comparison?: string;
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({ product, comparison }) => {
  const rating = getHealthRating(product.score);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group bg-surface border border-border rounded-3xl overflow-hidden shadow-md flex flex-col h-full"
    >
      <div className="bg-score-good/10 text-score-good px-4 py-2 text-xs font-bold border-b border-score-good/20 flex items-center gap-2">
        <ArrowRight className="w-3 h-3" />
        {comparison || "Better Alternative"}
      </div>
      
      <div className="p-4 flex gap-4 flex-1">
        <div className="w-20 h-24 flex-shrink-0 bg-white rounded-xl p-2 border border-border">
          <img 
            src={product.image} 
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <Link to={`/product/${product.barcode}`}>
            <h3 className="font-display font-bold text-text group-hover:text-primary transition-colors line-clamp-1 leading-tight mb-1">
              {product.name}
            </h3>
          </Link>
          <div className="text-xs text-text-muted mb-2">{product.brand}</div>
          
          <div className="mt-auto flex items-center justify-between">
            <div className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${rating.bg} ${rating.color}`}>
              Score: {product.score}
            </div>
            <Link 
              to={`/product/${product.barcode}`} 
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4"
            >
              See Details <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlternativeCard;
