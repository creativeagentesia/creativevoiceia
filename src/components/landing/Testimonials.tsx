import { motion } from "framer-motion";
import { Star, Shield, Globe, Zap, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Nossa taxa de não comparecimento caiu 40% desde a implementação deste sistema de voz IA. As confirmações e lembretes automatizados são revolucionários.",
    author: "Dra. Sarah Johnson",
    role: "Proprietária de Consultório Médico",
    company: "Clínica HealthFirst",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
  },
  {
    quote: "Gerenciamos mais de 200 reservas diárias agora sem equipe adicional. A IA entende solicitações complexas e as gerencia perfeitamente todas as vezes.",
    author: "Michael Chen",
    role: "Gerente de Restaurante",
    company: "The Golden Spoon",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
  },
  {
    quote: "As pontuações de satisfação do cliente aumentaram significativamente. A disponibilidade 24/7 significa que nunca perdemos um cliente potencial.",
    author: "Emily Rodriguez",
    role: "Consultora Jurídica",
    company: "Rodriguez & Associados",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  },
  {
    quote: "A integração foi incrivelmente simples. Em menos de uma semana já estávamos com o sistema totalmente operacional e nossos clientes adoraram.",
    author: "Carlos Mendes",
    role: "Diretor de Operações",
    company: "TechVision Brasil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  },
  {
    quote: "O suporte ao cliente é excepcional. Sempre que tivemos dúvidas, a equipe respondeu rapidamente e nos ajudou a otimizar nossos processos.",
    author: "Ana Paula Silva",
    role: "Gerente de Atendimento",
    company: "Saúde Integral",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
  },
];

const badges = [
  { icon: Shield, label: "Certificado SOC 2" },
  { icon: Globe, label: "Conforme GDPR" },
  { icon: Zap, label: "99,9% de Tempo de Atividade" },
  { icon: CheckCircle, label: "ISO 27001" },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || testimonials.length <= 3) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll when reaching the cloned section
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  return (
    <section className="py-20 lg:py-32 section-soft overflow-hidden">
      <div className="container px-4 lg:px-8">
        {/* Testimonials Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-hidden pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Double testimonials for infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.author}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
              className="bg-background rounded-2xl p-6 lg:p-8 shadow-card border border-border flex-shrink-0 w-[350px] lg:w-[400px]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 mb-6 leading-relaxed text-sm lg:text-base">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-12"
        >
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border border-border text-sm text-muted-foreground"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
