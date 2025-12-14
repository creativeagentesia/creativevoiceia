import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Clock, X } from "lucide-react";

const benefits = [
  { icon: CreditCard, text: "Sem cartão de crédito" },
  { icon: Clock, text: "Configuração em 5 minutos" },
  { icon: X, text: "Cancele a qualquer momento" },
];

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-background/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-background mb-6">
            Pronto para Automatizar Seu Processo de Agendamento?
          </h2>
          <p className="text-lg text-background/80 mb-10">
            Junte-se a milhares de empresas que já usam IA para transformar seu atendimento ao cliente
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button variant="hero" size="xl" className="group">
              Iniciar Seu Teste Grátis
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Agendar uma Demo
            </Button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.text}
                className="flex items-center gap-2 text-background/80"
              >
                <benefit.icon className="w-4 h-4" />
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
