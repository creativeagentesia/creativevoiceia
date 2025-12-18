import { motion } from 'framer-motion';

const brands = [
  { name: 'OpenAI', logo: '🤖' },
  { name: 'Google Gemini', logo: '✨' },
  { name: 'Anthropic', logo: '🧠' },
  { name: 'Lovable', logo: '💜' },
  { name: 'ElevenLabs', logo: '🔊' },
  { name: 'Midjourney', logo: '🎨' },
  { name: 'Twilio', logo: '📱' },
  { name: 'Perplexity', logo: '🔍' },
  { name: 'Runway', logo: '🎬' },
  { name: 'Stability AI', logo: '🖼️' },
  { name: 'Replicate', logo: '🔄' },
  { name: 'Hugging Face', logo: '🤗' },
];

const BrandScroller = () => {
  return (
    <section className="py-12 bg-background overflow-hidden border-y border-border/30">
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set of brands */}
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <span className="text-2xl">{brand.logo}</span>
                <span className="text-muted-foreground font-medium whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <span className="text-2xl">{brand.logo}</span>
                <span className="text-muted-foreground font-medium whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandScroller;
