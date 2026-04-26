import { motion } from 'motion/react';
import { getNutrientLevel, getNutrientColor } from '@/src/lib/healthScore';
import { cn } from '@/src/lib/utils';

interface NutritionBarProps {
  label: string;
  value: number;
  unit: string;
  type: 'sugar' | 'sodium' | 'satFat';
}

export default function NutritionBar({ label, value, unit, type }: NutritionBarProps) {
  const level = getNutrientLevel(type, value);
  const color = getNutrientColor(level);
  
  // Mapping values to percentage for visualization (relative to High threshold)
  const maxValues = {
    sugar: 25,
    sodium: 1000,
    satFat: 10
  };
  
  const percentage = Math.min(100, (value / maxValues[type]) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-faint">{label}</span>
          <div className="text-lg font-display font-black leading-none">
            {value} <span className="text-xs font-medium text-text-muted uppercase">{unit}</span>
          </div>
        </div>
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border",
          level === 'low' ? "bg-score-good/10 text-score-good border-score-good/20" :
          level === 'moderate' ? "bg-score-medium/10 text-score-medium border-score-medium/20" :
          "bg-score-bad/10 text-score-bad border-score-bad/20"
        )}>
          {level === 'moderate' ? 'Medium' : level}
        </span>
      </div>
      <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden border border-border/5">
        <motion.div
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 1, ease: "easeOut" }}
           className={cn(
            "h-full rounded-full transition-colors",
            level === 'low' ? "bg-score-good" : level === 'moderate' ? "bg-score-medium" : "bg-score-bad"
           )}
        />
      </div>
    </div>
  );
}

