export interface NutritionData {
  sugars_100g?: number;
  sodium_100g?: number;
  "saturated-fat_100g"?: number;
  saturated_fat_100g?: number;
  additives_n?: number;
  fiber_100g?: number;
  proteins_100g?: number;
  energy_100g?: number;
  carbohydrates_100g?: number;
  "energy-kcal_100g"?: number;
}

export function calculateHealthScore(nutrition: NutritionData): number {
  let score = 100;

  // Sugar penalty (per 100g/ml)
  const sugar = nutrition.sugars_100g || 0;
  if (sugar > 22.5) score -= 35;
  else if (sugar > 12) score -= 20;
  else if (sugar > 5) score -= 10;

  // Sodium penalty (per 100g)
  // Open Food Facts returns sodium in grams, threshold is in mg.
  const sodium = (nutrition.sodium_100g || 0) * 1000;
  if (sodium > 600) score -= 30;
  else if (sodium > 400) score -= 20;
  else if (sodium > 120) score -= 10;

  // Saturated fat penalty
  const satFat = nutrition["saturated-fat_100g"] ?? nutrition.saturated_fat_100g ?? 0;
  if (satFat > 5) score -= 20;
  else if (satFat > 1.5) score -= 10;

  // Additives penalty
  const additives = nutrition.additives_n || 0;
  if (additives > 5) score -= 10;
  else if (additives > 2) score -= 5;

  // Fiber bonus
  const fiber = nutrition.fiber_100g || 0;
  if (fiber > 3) score += 5;
  if (fiber > 6) score += 5;

  // Protein bonus
  const protein = nutrition.proteins_100g || 0;
  if (protein > 10) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export const getHealthRating = (score: number) => {
  if (score >= 70) return { label: "Good Choice", color: "text-score-good", bg: "bg-score-good/10", border: "border-score-good/20", icon: "✓" };
  if (score >= 40) return { label: "Moderate", color: "text-score-medium", bg: "bg-score-medium/10", border: "border-score-medium/20", icon: "⚠" };
  return { label: "Use Sparingly", color: "text-score-bad", bg: "bg-score-bad/10", border: "border-score-bad/20", icon: "✗" };
};

export const getNutrientLevel = (type: 'sugar' | 'sodium' | 'satFat', value: number) => {
  const thresholds = {
    sugar: { low: 5, mod: 12 },
    sodium: { low: 120, mod: 400 },
    satFat: { low: 1.5, mod: 5 }
  };
  
  const t = thresholds[type];
  if (value < t.low) return 'low';
  if (value <= t.mod) return 'moderate';
  return 'high';
};

export const getNutrientColor = (level: 'low' | 'moderate' | 'high') => {
  if (level === 'low') return 'var(--color-score-good)';
  if (level === 'moderate') return 'var(--color-score-medium)';
  return 'var(--color-score-bad)';
};
