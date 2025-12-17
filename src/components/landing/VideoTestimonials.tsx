import { motion } from "framer-motion";

const videoTestimonials = [
  {
    url: "https://www.youtube.com/embed/AAMRvprQa4E",
    title: "Depoimento de Paciente",
    description: "Experiência na Clínica",
  },
  {
    url: "https://www.youtube.com/embed/RrCZTIYJyi8",
    title: "História de Recuperação",
    description: "A maneira de tratar",
  },
  {
    url: "https://www.youtube.com/embed/fpqybFgk-II",
    title: "Experiência na Clínica",
    description: "Atendimento diferenciado",
  },
];

const VideoTestimonials = () => {
  return (
    <section id="depoimentos" className="py-16 lg:py-24 bg-background">
      <div className="container px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Confiado por Líderes do Setor
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja o que nossos clientes dizem sobre sua experiência
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted shadow-lg border border-border">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-foreground">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
