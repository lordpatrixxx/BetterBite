import { motion } from 'motion/react';
import { Leaf, Users, Target, ShieldCheck, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-24">
      <section className="text-center space-y-6">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl rotate-3">
          <Leaf className="w-12 h-12 fill-current" />
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter">Our BetterBite Story</h1>
        <p className="text-xl text-text-muted leading-relaxed">
          BetterBite was created by IT students at Savitribai Phule Pune University, India, as a college project to help Indian consumers make smarter, healthier food choices in their daily lives.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Target className="w-4 h-4" /> Our Mission
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight">Empowering Consumers Through Transparency</h2>
          <p className="text-text-muted leading-relaxed">
            "We believe every Indian consumer deserves to understand what's in their packaged food — without a nutrition degree."
          </p>
          <p className="text-text-muted leading-relaxed">
            Our app translates complex nutrition labels into a simple, easy-to-understand health score, allowing families to compare products instantly and choose better alternatives.
          </p>
        </div>
        
        <div className="bg-surface-2 rounded-3xl p-8 border border-border relative overflow-hidden group">
          <Leaf className="absolute -bottom-10 -right-10 w-48 h-48 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
          <div className="relative z-10 space-y-6">
             <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                <MapPin className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-display font-bold mb-2">Based in Pune, India</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Developed locally to address the specific nutritional challenges and market variety of the Indian food ecosystem.
                </p>
             </div>
          </div>
        </div>
      </div>

      <section className="space-y-12">
        <div className="text-center">
            <h2 className="text-4xl font-display font-black mb-4">The Team</h2>
            <p className="text-text-muted">Students from Pimpri Chinchwad College of Engineering (PCCOE), Pune.</p>
        </div>

        {/* Faculty Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-surface border-2 border-primary/20 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-primary/10">
            <Users className="w-32 h-32 rotate-12" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shrink-0 rotate-2 group-hover:rotate-0 transition-transform duration-500">
               <img 
                 src="shwetad.jpeg" 
                 alt="Shweta Devdas" 
                 className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                 onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/400x400?text=Shweta+Devdas";
                 }}
               />
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Faculty Guide
              </div>
              <div>
                <h3 className="text-3xl font-display font-black text-text">Shweta Devdas</h3>
                <p className="text-primary font-bold uppercase tracking-wider">Assistant Professor @ PCCOE Pune</p>
              </div>
              <p className="text-text-muted leading-relaxed">
                Guiding the project as part of the Web Development Laboratory course, providing expertise in modern web architectures and industry best practices.
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              name: "Pratik Phapale", 
              prn: "125B1F210", 
              role: "Full Stack Developer", 
              email: "pratik.phapale25@pccoepune.org",
              img: "pratik.jpg"
            },
            { 
              name: "Swastik Phapale", 
              prn: "125B1F212", 
              role: "Backend Developer", 
              email: "swastik.phapale25@pccoepune.org",
              img: "swastik.png"
            },
            { 
              name: "Sarthak Gandhi", 
              prn: "125B1F201", 
              role: "UI/UX Designer", 
              email: "sarthak.gandhi25@pccoepune.org",
              img: "sarthak.jpg"
            },
            { 
              name: "Swapnil Jadhav", 
              prn: "125B1F211", 
              role: "Frontend Developer", 
              email: "swapnil.jadhav25@pccoepune.org",
              img: "swapnil.png"
            }
          ].map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-3xl p-5 text-center space-y-4 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              <div className="relative w-32 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-surface-2 group-hover:border-primary/20 transition-all">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/400x500?text=${member.name.split(' ')[0]}`;
                  }}
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-lg leading-tight">{member.name}</h4>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 mb-2">{member.role}</p>
                <div className="space-y-1 pt-2 border-t border-border/50">
                  <p className="text-[10px] text-text-muted font-mono bg-surface-2 py-0.5 rounded-full inline-block px-3">PRN: {member.prn}</p>
                  <a href={`mailto:${member.email}`} className="text-[10px] text-text-faint hover:text-primary transition-colors block truncate px-2 mt-1">
                    {member.email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface border border-border rounded-[3rem] p-12 text-center space-y-6 shadow-sm overflow-hidden relative">
         <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
         <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold flex items-center justify-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" /> Data & Technology
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            BetterBite is powered by the <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline underline-offset-4">Open Food Facts</a> community database. We use advanced AI models to simplify ingredient explanations and provide personalized recommendations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {["React", "TypeScript", "Tailwind CSS", "Gemini AI", "Vite"].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-surface-2 border border-border rounded-full text-xs font-bold text-text-muted capitalize">
                {tech}
              </span>
            ))}
          </div>
         </div>
      </section>
    </div>
  );
}
