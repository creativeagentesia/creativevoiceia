import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useCalEmbed } from "@/hooks/useCalEmbed";

const CTA = () => {
  const { openCalPopup } = useCalEmbed();

  return (
    <section id="cta-agendamento" className="py-20 lg:py-32 hero-gradient relative overflow-hidden">
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

          {/* Pulsating CTA Button */}
          <motion.button
            onClick={() => {
              console.log('CTA button clicked');
              openCalPopup();
            }}
            className="relative inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Pulsating glow effect */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-pulse-glow opacity-50" />
            <span className="relative flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Agendar Apresentação Agora
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
