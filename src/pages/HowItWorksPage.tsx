import { motion } from 'motion/react';
import { Search, ScanBarcode, Info, Heart, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Search or Scan",
      desc: "Whether you're at home or in the grocery store, you can quickly find a product. Use our high-speed barcode scanner or search through thousands of indexed Indian products by name.",
      icon: <ScanBarcode className="w-10 h-10" />,
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Reading the Health Score",
      desc: "Our algorithm calculates a score from 0 to 100 based on the nutritional profile (sugar, sodium, fats) and the quality of ingredients (additives). A 'Good Choice' starts from 70+.",
      icon: <Info className="w-10 h-10" />,
      color: "bg-primary",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Understanding Nutrition Bars",
      desc: "We break down sugar, sodium, and saturated fats into visual bars. See exactly what is 'High', 'Moderate', or 'Low' based on Indian nutritional guidelines.",
      icon: <Sparkles className="w-10 h-10" />,
      color: "bg-warning",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Finding Alternatives",
      desc: "Don't just see what's bad — find out what's better. We'll automatically suggest healthier products in the same category with higher health scores.",
      icon: <Heart className="w-10 h-10" />,
      color: "bg-danger",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "AI Ingredient Explainer",
      desc: "Wondering what Maltodextrin or INS 471 is? Our AI explainer breaks down ingredients into simple, everyday English so you know exactly what you're eating.",
      icon: <Search className="w-10 h-10" />,
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1512428559083-a40ce7ba6e91?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto space-y-6 mb-24">
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter">Your Guide to <br /> Smarter Eating</h1>
        <p className="text-xl text-text-muted">BetterBite simplifies complex nutrition data so you can make informed decisions in seconds.</p>
        <div className="flex justify-center pt-8">
           <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center border border-border"
           >
             <ArrowDown className="w-6 h-6 text-text-faint" />
           </motion.div>
        </div>
      </div>

      <div className="space-y-40">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
              "flex flex-col md:flex-row items-center gap-12 md:gap-24",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <div className="flex-1 space-y-8">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl", step.color)}>
                {step.icon}
              </div>
              <div className="space-y-4">
                <span className="text-primary font-black text-6xl opacity-10 font-display">0{i + 1}</span>
                <h2 className="text-4xl font-display font-black leading-tight">{step.title}</h2>
                <p className="text-lg text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className={cn("absolute -inset-4 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity", step.color)} />
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-surface shadow-2xl">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-40 text-center py-24 bg-surface rounded-[4rem] border border-border shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-black">Ready to Start?</h2>
          <p className="text-lg text-text-muted italic">"Healthy eating is not a diet, its a lifestyle."</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="bg-primary text-white px-10 py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-2 btn-hover">
              Try BetterBite Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
