import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Brain, Calendar, Mail } from "lucide-react";
import { useCalEmbed } from "@/hooks/useCalEmbed";

const features = [
  { icon: MessageCircle, label: "Linguagem Natural" },
  { icon: Brain, label: "Consciência de Contexto" },
  { icon: Calendar, label: "Agendamento Instantâneo" },
  { icon: Mail, label: "Confirmação por E-mail" },
];

const VideoDemo = () => {
  const { openCalPopup } = useCalEmbed();
  
  return (
    <section id="video-demo" className="py-20 bg-background">
      <div className="container px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20"
          >
            {/* YouTube Embed */}
            <div className="aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/-6ilG9NZn-M?rel=0&modestbranding=1"
                title="CreativeVoice Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-6 lg:p-10">
              <h3 className="text-white text-xl lg:text-2xl font-display font-bold mb-2">
                Veja Nossa IA em Ação - Conversa Real com Cliente
              </h3>
              <p className="text-white/70 text-sm lg:text-base">
                Assista como nossa IA gerencia um agendamento completo do início ao fim
              </p>
            </div>
          </motion.div>

          {/* Bottom Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Experimente o fluxo natural de conversas com IA
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-foreground"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  {feature.label}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" className="group" onClick={openCalPopup}>
                <Calendar className="w-5 h-5" />
                Agende Sua Apresentação
              </Button>
              <Button variant="outline" size="lg" onClick={openCalPopup}>
                Falar com Especialista
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
