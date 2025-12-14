import { motion } from "framer-motion";
import { Mic, Calendar, Mail, Globe, Brain, Zap } from "lucide-react";

const mainFeatures = [
  {
    icon: Mic,
    title: "IA de Voz em Tempo Real",
    description: "Fluxo de conversa natural com reconhecimento e síntese de fala avançados",
    features: ["Suporte multilíngue", "Detecção de emoções", "Consciência de contexto", "Interrupções naturais"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Calendar,
    title: "Sistema de Agendamento Automático",
    description: "Agendamento inteligente que se integra perfeitamente com sua agenda",
    features: ["Integração com calendário", "Agendamento inteligente", "Resolução de conflitos", "Gerenciamento de fuso horário"],
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    icon: Mail,
    title: "Confirmações por E-mail",
    description: "Notificações instantâneas com modelos personalizáveis e rastreamento",
    features: ["Notificações instantâneas", "Modelos personalizados", "Rastreamento e análises", "Automação de acompanhamento"],
    gradient: "from-fuchsia-500 to-pink-600",
  },
];

const miniFeatures = [
  { icon: Globe, title: "Suporte Multilíngue", description: "Comunique-se com clientes em mais de 50 idiomas" },
  { icon: Brain, title: "Aprendizado de IA", description: "Melhora continuamente a partir de cada conversa" },
  { icon: Zap, title: "Integração Instantânea", description: "Conecte-se com suas ferramentas existentes em minutos" },
];

const Features = () => {
  return (
    <section id="recursos" className="py-20 lg:py-32 bg-background">
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
            Recursos Poderosos para Empresas Modernas
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa para automatizar conversas e agendamentos de clientes
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {feature.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-2">
                {feature.features.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mini Features */}
        <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {miniFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
