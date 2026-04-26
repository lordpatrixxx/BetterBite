import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import { Product, getProductByBarcode, getAlternatives } from '@/src/lib/openFoodFacts';
import { getProductSummary, getIngredientExplanation } from '@/src/lib/gemini';
import HealthScoreBadge from '@/src/components/ui/HealthScoreBadge';
import NutritionBar from '@/src/components/ui/NutritionBar';
import AlternativeCard from '@/src/components/ui/AlternativeCard';
import { getHealthRating } from '@/src/lib/healthScore';
import { motion, AnimatePresence } from 'motion/react';
import { Info, AlertCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Send, Loader2, Leaf, ArrowLeft, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function ProductDetailPage() {
  const { barcode } = useParams<{ barcode: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [alternatives, setAlternatives] = useState<Product[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [ingredientExplanations, setIngredientExplanations] = useState<Record<string, string>>({});
  const [isExpandingIngredients, setIsExpandingIngredients] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ liked: boolean | null, comment: string }>({ liked: null, comment: "" });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (barcode) {
      fetchProduct();
    }
  }, [barcode]);

  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const p = await getProductByBarcode(barcode!);
      if (!p) {
        setError("Oops! We couldn't find this product.");
        setIsLoading(false);
        return;
      }
      setProduct(p);
      
      // Fetch data in parallel
      const [alts, summary] = await Promise.all([
        getAlternatives(p.category, p.score),
        getProductSummary(p.name, p.score, p.nutrition.sugars_100g || 0)
      ]);
      
      setAlternatives(alts);
      setAiSummary(summary);
    } catch (err) {
      setError("Something went wrong while fetching product data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainIngredient = async (ingredient: string) => {
    if (ingredientExplanations[ingredient]) {
      setIsExpandingIngredients(isExpandingIngredients === ingredient ? null : ingredient);
      return;
    }
    
    setIsExpandingIngredients(ingredient);
    try {
      const explanation = await getIngredientExplanation(ingredient);
      setIngredientExplanations(prev => ({ ...prev, [ingredient]: explanation }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeedback = (liked: boolean) => {
    setFeedback(prev => ({ ...prev, liked }));
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);
    // Simulate Firestore save since setup is pending
    await new Promise(r => setTimeout(r, 1000));
    alert("Thank you for your feedback!");
    setIsSubmittingFeedback(false);
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">{error}</h2>
        <p className="text-text-muted mb-8">Try searching by product name instead or checking the barcode.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold btn-hover">
          <ArrowLeft className="w-5 h-5" /> Back to Search
        </Link>
      </div>
    );
  }

  const rating = getHealthRating(product.score);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-12">
      {/* Header Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square bg-white border border-border rounded-[3rem] p-12 overflow-hidden shadow-inner flex items-center justify-center"
        >
          <img 
            src={product.image} 
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain drop-shadow-xl"
          />
        </motion.div>
        
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-text-faint hover:text-primary transition-colors font-medium text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Search
            </Link>
            <div className="flex flex-wrap gap-2">
               <div className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">
                {product.category}
              </div>
              {product.quantity && (
                <div className="text-[10px] font-bold bg-surface-2 text-text-muted px-3 py-1 rounded-full uppercase tracking-widest border border-border">
                  {product.quantity}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-tight">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-medium font-sans italic opacity-80">{product.brand}</p>
          </div>

          <div className="flex items-center gap-6 p-6 md:p-8 bg-surface rounded-[2.5rem] border border-border shadow-xl shadow-primary/5">
            <HealthScoreBadge score={product.score} size="lg" />
            <div className="flex-1">
              <div className={cn("text-3xl font-display font-black tracking-tight", rating.color)}>
                {rating.label} Quality
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Score based on sugar, sodium, saturated fat, and additives content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Nutrition & AI */}
        <div className="lg:col-span-2 space-y-12">
          {/* AI Summary */}
          {aiSummary && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 relative overflow-hidden group shadow-lg shadow-primary/5"
            >
               <div className="relative z-10">
                 <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-4">
                   <Zap className="w-4 h-4 fill-current" />
                   Health Perspective
                 </div>
                 <p className="text-2xl md:text-3xl font-display font-medium leading-snug text-text">
                   {aiSummary}
                 </p>
               </div>
            </motion.section>
          )}

          {/* Nutrition Breakdown */}
          <section className="bg-surface rounded-[2.5rem] border border-border p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl font-display font-black mb-10">Nutrition Breakdown</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <NutritionBar label="Total Sugars" value={product.nutrition.sugars_100g || 0} unit="g" type="sugar" />
              <NutritionBar label="Sodium Content" value={(product.nutrition.sodium_100g || 0) * 1000} unit="mg" type="sodium" />
              <NutritionBar label="Saturated Fat" value={product.nutrition["saturated-fat_100g"] || 0} unit="g" type="satFat" />
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border md:col-span-2">
                <NutrientSmallStat label="Energy" value={Math.round(product.nutrition["energy-kcal_100g"] || product.nutrition.energy_100g / 4.184 || 0)} unit="kcal" />
                <NutrientSmallStat label="Proteins" value={product.nutrition.proteins_100g || 0} unit="g" />
                <NutrientSmallStat label="Fiber" value={product.nutrition.fiber_100g || 0} unit="g" />
                <NutrientSmallStat label="Carbs" value={product.nutrition.carbohydrates_100g || 0} unit="g" />
              </div>
            </div>
          </section>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <section className="bg-surface rounded-[2.5rem] border border-border p-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <h2 className="text-3xl font-display font-black">Top Ingredients</h2>
                <div className="text-xs font-bold text-text-faint uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-4 h-4" /> Tap to learn more
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.ingredients.slice(0, 10).map((ingredient, i) => (
                  <div key={i} className="flex flex-col border border-border rounded-2xl overflow-hidden bg-bg/30">
                    <button 
                      onClick={() => handleExplainIngredient(ingredient)}
                      className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors text-left"
                    >
                      <span className="font-bold text-sm text-text truncate pr-2 uppercase tracking-tight">{ingredient}</span>
                      {isExpandingIngredients === ingredient ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-text-faint" />}
                    </button>
                    
                    <AnimatePresence>
                      {isExpandingIngredients === ingredient && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-sm text-text-muted leading-relaxed">
                            {ingredientExplanations[ingredient] ? (
                              <div className="bg-surface p-4 rounded-xl border border-primary/10 shadow-inner">
                                {ingredientExplanations[ingredient]}
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 py-2 text-primary font-bold text-xs uppercase tracking-widest animate-pulse">
                                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing ingredient...
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Alternatives & Feedback */}
        <div className="space-y-12">
          {/* Alternatives */}
          <section className="space-y-8">
            <h2 className="text-2xl font-display font-black pl-2 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" /> Healthy Alternatives
            </h2>
            
            <div className="flex flex-col gap-6">
              {alternatives.length > 0 ? (
                alternatives.map((alt) => (
                  <AlternativeCard 
                    key={alt.barcode}
                    product={alt} 
                    comparison={`${Math.round(alt.score - product.score)} pts higher`}
                  />
                ))
              ) : (
                <div className="p-12 text-center bg-surface-2 rounded-3xl border border-dashed border-border border-2">
                   <p className="text-sm font-medium text-text-faint uppercase tracking-widest">No alternatives found</p>
                </div>
              )}
            </div>
          </section>

          {/* User Feedback */}
          <section className="bg-surface rounded-[2.5rem] border border-border p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-display font-black mb-8">Was this helpful?</h3>
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => handleFeedback(true)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all transform hover:scale-105",
                  feedback.liked === true ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-bg/50 border-border text-text-muted hover:border-primary/50"
                )}
              >
                <ThumbsUp className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Yes</span>
              </button>
              <button 
                onClick={() => handleFeedback(false)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all transform hover:scale-105",
                  feedback.liked === false ? "bg-danger text-white border-danger shadow-lg shadow-danger/20" : "bg-bg/50 border-border text-text-muted hover:border-danger/50"
                )}
              >
                <ThumbsDown className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">No</span>
              </button>
            </div>

            <form onSubmit={submitFeedback} className="space-y-4">
              <textarea 
                placeholder="Help us improve with your comments..."
                value={feedback.comment}
                onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full bg-bg/50 border border-border rounded-2xl p-5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] transition-all"
              />
              <button 
                disabled={isSubmittingFeedback || feedback.liked === null}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs btn-hover shadow-lg shadow-primary/10 disabled:opacity-30 disabled:pointer-events-none"
              >
                {isSubmittingFeedback ? "Sending..." : "Submit Feedback"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function NutrientSmallStat({ label, value, unit }: { label: string, value: number, unit: string }) {
  return (
    <div className="p-4 bg-surface rounded-2xl border border-border">
      <div className="text-[10px] text-text-faint font-bold uppercase tracking-widest mb-1">{label}</div>
      <div className="text-lg font-display font-black leading-none">
        {value} <span className="text-xs font-medium text-text-muted uppercase">{unit}</span>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse space-y-12">
      <div className="h-[400px] bg-surface-2 rounded-[3rem]" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="h-40 bg-surface-2 rounded-[2.5rem]" />
          <div className="h-80 bg-surface-2 rounded-[2.5rem]" />
        </div>
        <div className="space-y-12">
          <div className="h-60 bg-surface-2 rounded-[2.5rem]" />
          <div className="h-60 bg-surface-2 rounded-[2.5rem]" />
        </div>
      </div>
    </div>
  );
}
