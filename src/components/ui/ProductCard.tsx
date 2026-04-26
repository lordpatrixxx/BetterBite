import { Link } from 'react-router-dom';
import { Product } from '@/src/lib/openFoodFacts';
import HealthScoreBadge from './HealthScoreBadge';
import { getHealthRating } from '@/src/lib/healthScore';
import { motion } from 'motion/react';

export default function ProductCard({ product }: { product: Product }) {
  const rating = getHealthRating(product.score);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-surface border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <Link to={`/product/${product.barcode}`} className="block relative aspect-square overflow-hidden bg-white p-6">
        <img 
          src={product.image} 
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 right-4 ${rating.bg} ${rating.color} px-3 py-1 rounded-full text-xs font-bold border ${rating.border} backdrop-blur-sm`}>
          {rating.label}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Link to={`/product/${product.barcode}`} className="flex-1">
            <h3 className="font-display font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
          <HealthScoreBadge score={product.score} size="sm" />
        </div>
        
        <div className="text-sm text-text-muted mb-4 mt-auto">
          <div className="font-medium text-text-faint uppercase text-[10px] tracking-widest mb-1">Brand</div>
          {product.brand}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-[10px] bg-surface-2 text-text-muted px-2 py-1 rounded-md font-bold uppercase tracking-tight">
            {product.category}
          </div>
          {product.quantity && (
             <div className="text-[10px] text-text-faint px-2 py-1">
              {product.quantity}
           </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

