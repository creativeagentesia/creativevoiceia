import { motion } from "framer-motion";
import { Clock, TrendingUp, PiggyBank, Star, Infinity, Timer } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "100%",
    label: "Disponibilidade 24/7",
    description: "Nunca perca uma oportunidade de agendamento, mesmo fora do horário comercial",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Taxas de Agendamento Mais Altas",
    description: "Aumente a conversão com respostas e confirmações instantâneas",
  },
  {
    icon: PiggyBank,
    value: "60%",
    label: "Eficiência de Custos",
    description: "Reduza custos operacionais em comparação com call centers tradicionais",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Satisfação do Cliente",
    description: "Ofereça experiências excepcionais com tempo de espera zero",
  },
  {
    icon: Infinity,
    value: "∞",
    label: "Escalabilidade",
    description: "Gerencie chamadas simultâneas ilimitadas sem equipe adicional",
  },
  {
    icon: Timer,
    value: "<2s",
    label: "Tempo de Espera Reduzido",
    description: "Conexão e resposta instantâneas para cada cliente",
  },
];

const Impact = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
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
            Impacto Mensurável nos Negócios
          </h2>
          <p className="text-lg text-muted-foreground">
            Resultados reais que transformam suas operações de atendimento ao cliente
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-1">
                    {metric.value}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
