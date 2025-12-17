import { motion } from "framer-motion";
import { Stethoscope, UtensilsCrossed, Briefcase, ShoppingBag } from "lucide-react";

const sectors = [
  {
    icon: Stethoscope,
    sector: "Saúde",
    title: "Agendamento de Consultas",
    description: "Simplifique agendamentos de pacientes com agendamento automatizado 24/7",
    example: "Paciente liga para marcar consulta, IA confirma horários disponíveis, agenda consulta e envia confirmação com instruções pré-visita",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: UtensilsCrossed,
    sector: "Restaurantes",
    title: "Gerenciamento de Reservas",
    description: "Gerencie reservas de mesas sem esforço durante horários de pico",
    example: "Cliente solicita mesa para 4 às 19h, IA verifica disponibilidade, confirma reserva e envia lembrete com direções",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Briefcase,
    sector: "Serviços Profissionais",
    title: "Agendamento de Consultas",
    description: "Agende reuniões e consultas com clientes automaticamente",
    example: "Cliente precisa de consulta jurídica, IA encontra horário adequado, agenda reunião e envia convite de calendário com link de vídeo",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ShoppingBag,
    sector: "Varejo",
    title: "Suporte ao Cliente",
    description: "Forneça suporte instantâneo e agende compromissos na loja",
    example: "Cliente pergunta sobre disponibilidade de produto, IA verifica estoque, agenda horário de retirada e confirma por e-mail",
    color: "from-violet-500 to-purple-600",
  },
];

const Sectors = () => {
  return (
    <section className="py-20 lg:py-32 section-soft">
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
            Aplicações por Setor
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluções personalizadas para cada vertical de negócio
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sector.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <sector.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium text-primary mb-1 block">
                    {sector.sector}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {sector.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                {sector.description}
              </p>

              <div className="bg-muted/50 rounded-xl p-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-2 block">
                  Cenário de Exemplo:
                </span>
                <p className="text-sm text-foreground/80">
                  {sector.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
