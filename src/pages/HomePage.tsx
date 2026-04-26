import { motion } from 'motion/react';
import { ScanBarcode, Search, Info, ShieldCheck, Zap, Heart, Leaf } from 'lucide-react';
import SearchBar from '@/src/components/SearchBar';
import ProductCard from '@/src/components/ui/ProductCard';
import { Product } from '@/src/lib/openFoodFacts';

const EXAMPLE_PRODUCTS: Product[] = [
  {
    barcode: "5449000000996",
    name: "Coca-Cola Original Taste",
    brand: "Coca-Cola",
    category: "Beverage",
    image: "https://world.openfoodfacts.org/images/products/544/900/000/0996/front_en.679.400.jpg",
    quantity: "330 ml",
    ingredients_text: "Carbonated Water, Sugar, Color (Caramel E150d), Phosphoric Acid, Natural Flavorings Including Caffeine.",
    additives_n: 1,
    nutrition: { sugars_100g: 10.6, sodium_100g: 0, "saturated-fat_100g": 0, energy_100g: 180 },
    score: 35
  },
  {
    barcode: "5449000111678",
    name: "Fanta Orange",
    brand: "Fanta",
    category: "Beverage",
    image: "https://world.openfoodfacts.org/images/products/544/900/011/1678/front_en.115.400.jpg",
    quantity: "330 ml",
    ingredients_text: "Carbonated Water, Sugar, Orange Juice from Concentrate (3.7%), Citrus Extract, Citric Acid, Orange Flavorings, Sorbate, Vitamin C, Carotenes.",
    additives_n: 3,
    nutrition: { sugars_100g: 8.5, sodium_100g: 0.01, "saturated-fat_100g": 0, energy_100g: 160 },
    score: 42
  },
  {
    barcode: "8901058000030",
    name: "Maggi 2-Minute Noodles",
    brand: "Maggi",
    category: "Noodles",
    image: "https://world.openfoodfacts.org/images/products/890/105/800/0030/front_en.96.400.jpg",
    quantity: "70g",
    ingredients_text: "Refined wheat flour (Maida), Palm oil, Iodised salt, Wheat gluten, Mineral (Calcium carbonate), Thickeners (508 & 412), Acidity regulators (501(i) & 500(i)) and Humectant (451(i)).",
    additives_n: 5,
    nutrition: { sugars_100g: 1.2, sodium_100g: 1.25, "saturated-fat_100g": 7.4, energy_100g: 440 },
    score: 45
  },
  {
     barcode: "8901021000012",
     name: "Kissan Mixed Fruit Jam",
     brand: "Kissan",
     category: "Sauce/Spread",
     image: "https://world.openfoodfacts.org/images/products/890/102/100/0012/front_en.52.400.jpg",
     quantity: "500g",
     ingredients_text: "Sugar, Mixed Fruit Pulp (45%), Thickener (440), Acidity Regulator (330), Preservative (211), Vitamin B3.",
     additives_n: 3,
     nutrition: { sugars_100g: 68, sodium_100g: 0.02, "saturated-fat_100g": 0, energy_100g: 284 },
     score: 30
  },
  {
    barcode: "8901491101839",
    name: "Lay's Classic Salted",
    brand: "Lay's",
    category: "Snack",
    image: "https://world.openfoodfacts.org/images/products/890/149/110/1839/front_en.30.400.jpg",
    quantity: "52g",
    ingredients_text: "Potato, Edible Vegetable Oil (Palmolein Oil, Rice Bran Oil), Iodised Salt.",
    additives_n: 0,
    nutrition: { sugars_100g: 0.1, sodium_100g: 0.5, "saturated-fat_100g": 13, energy_100g: 544 },
    score: 55
  },
  {
    barcode: "8901030919312",
    name: "Horlicks Original",
    brand: "Horlicks",
    category: "Beverage mix",
    image: "https://world.openfoodfacts.org/images/products/890/103/091/9312/front_en.33.400.jpg",
    quantity: "500g",
    ingredients_text: "Malted Barley (extracted solids) (39%), Wheat Flour (27%), Milk Solids (14%), Sugar, Minerals, Emulsifier (INS 471), Salt, Vitamins, Protein Isolate.",
    additives_n: 1,
    nutrition: { sugars_100g: 13.5, sodium_100g: 0.35, "saturated-fat_100g": 0.8, energy_100g: 377 },
    score: 65
  }
];

export default function HomePage({ onScanOpen }: { onScanOpen: () => void }) {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-tight"
          >
            <Zap className="w-4 h-4 fill-current" />
            Designed for Indian Consumers
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter"
          >
            Know What's In <br className="hidden md:block" /> Your Food
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
          >
            Scan any packaged food barcode or search by name to instantly see its health score and discover better alternatives.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onScanOpen}
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-2 btn-hover shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <ScanBarcode className="w-5 h-5" /> Scan Barcode
            </button>
            <button 
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-surface border-2 border-border text-text px-8 py-4 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-2 btn-hover"
            >
              <Search className="w-5 h-5" /> Search a Product
            </button>
          </motion.div>
        </div>
      </section>


      {/* Search Section */}
      <section id="search-section" className="px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-2">Find a Product</h2>
            <p className="text-text-muted">Type the name of any packaged food product below</p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 md:px-6 py-20 bg-surface-2 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">How BetterBite Works</h2>
            <p className="text-text-muted max-w-xl mx-auto">Three simple steps to making healthier food choices for you and your family.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Search className="w-8 h-8" />, 
                title: "Search or Scan", 
                desc: "Type a product name or use your phone camera to scan the barcode instantly." 
              },
              { 
                icon: <Info className="w-8 h-8" />, 
                title: "See the Score", 
                desc: "Get a clear health rating from 0-100 with a detailed nutrition breakdown." 
              },
              { 
                icon: <Heart className="w-8 h-8" />, 
                title: "Switch to Better", 
                desc: "Discover healthier alternatives in the same category that are better for you." 
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4 p-8 bg-surface rounded-3xl border border-border shadow-sm"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-2xl flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight">{step.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Products */}
      <section className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Indian Products Database</h2>
              <p className="text-text-muted max-w-xl">We've indexed thousands of local Indian packaged goods to help you navigate your grocery aisle.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-primary font-bold hover:underline cursor-pointer">
              Explore More <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {EXAMPLE_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.barcode}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BetterBite Banner */}
      <section className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-hover rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-black leading-tight mb-8">Why Thousands <br /> Trust BetterBite</h2>
              <div className="space-y-6">
                {[
                  { title: "Indian Products First", desc: "Our database is specifically tailored to the Indian market and food culture." },
                  { title: "Science-Based Scoring", desc: "Scores are calculated based on sugar, sodium, saturated fat, and additives." },
                  { title: "Smarter Choices", desc: "Every result shows healthier alternatives you can actually find in stores." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 p-8 flex flex-col justify-center items-center text-center">
                <Leaf className="w-20 h-20 mb-6" />
                <h3 className="text-3xl font-display font-black mb-4 italic">"Scan. Know. Eat Smarter."</h3>
                <p className="text-white/60 mb-8 max-w-xs">Join thousands of Indians making better choices every single day at the supermarket.</p>
                <button onClick={onScanOpen} className="bg-white text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm btn-hover">Start Scanning</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
