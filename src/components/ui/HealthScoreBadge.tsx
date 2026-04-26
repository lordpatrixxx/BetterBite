import { motion } from 'motion/react';
import { getHealthRating } from '@/src/lib/healthScore';
import { cn } from '@/src/lib/utils';

export default function HealthScoreBadge({ score, size = "md", className }: { score: number, size?: "sm" | "md" | "lg", className?: string }) {
  const rating = getHealthRating(score);
  
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-3 text-2xl",
    lg: "px-8 py-5 text-4xl"
  };

  const colors = {
    Good: "bg-score-good/10 text-score-good border-score-good/20",
    Medium: "bg-score-medium/10 text-score-medium border-score-medium/20",
    Bad: "bg-score-bad/10 text-score-bad border-score-bad/20"
  }[rating.label] || "bg-text-faint/10 text-text-faint border-text-faint/20";

  return (
    <div className={cn(
      "inline-flex flex-col items-center justify-center rounded-2xl font-display font-black border backdrop-blur-sm",
      colors,
      sizeClasses[size],
      className
    )}>
      <div className="flex flex-col items-center">
        <span className="leading-none">{score}</span>
        <span className={cn(
          "uppercase font-bold tracking-[0.15em] opacity-80",
          size === 'sm' ? "text-[8px]" : size === 'lg' ? "text-xs" : "text-[10px]"
        )}>Score</span>
      </div>
    </div>
  );
}

