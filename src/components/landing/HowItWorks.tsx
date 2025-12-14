import { motion } from "framer-motion";
import { Phone, MessageSquare, CalendarCheck, MailCheck } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Phone,
    title: "Cliente Inicia Chamada",
    description: "Cliente liga para o número da sua empresa e é recebido pelo nosso assistente de voz IA",
  },
  {
    number: "2",
    icon: MessageSquare,
    title: "IA Processa Conversa",
    description: "Processamento de linguagem natural em tempo real entende intenção e contexto",
  },
  {
    number: "3",
    icon: CalendarCheck,
    title: "Agendamento Automático",
    description: "Sistema verifica disponibilidade e agenda o compromisso instantaneamente",
  },
  {
    number: "4",
    icon: MailCheck,
    title: "Confirmação por E-mail",
    description: "Ambas as partes recebem confirmações instantâneas por e-mail com todos os detalhes",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 lg:py-32 section-soft">
      <div className="container px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground">
            Simples, perfeito e totalmente automatizado em quatro etapas fáceis
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
              )}

              <div className="relative bg-background rounded-2xl p-6 lg:p-8 shadow-card border border-border text-center group hover:shadow-lg transition-shadow duration-300">
                {/* Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
