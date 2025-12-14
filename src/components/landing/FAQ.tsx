import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona a tecnologia de voz IA?",
    answer: "Nossa tecnologia utiliza processamento de linguagem natural (NLP) avançado e síntese de fala para criar conversas naturais. O sistema entende a intenção do cliente, processa o contexto e responde de forma inteligente, podendo agendar compromissos e enviar confirmações automaticamente.",
  },
  {
    question: "Quais idiomas são suportados?",
    answer: "Suportamos mais de 50 idiomas, incluindo português, inglês, espanhol, francês, alemão, italiano, e muitos outros. Nosso sistema detecta automaticamente o idioma do cliente e responde de acordo.",
  },
  {
    question: "Quão seguros são os dados de agendamento?",
    answer: "A segurança é nossa prioridade. Somos certificados SOC 2 e ISO 27001, e estamos em conformidade com GDPR. Todos os dados são criptografados em trânsito e em repouso, com backups regulares e controles de acesso rigorosos.",
  },
  {
    question: "Posso personalizar os modelos de e-mail?",
    answer: "Sim! Oferecemos modelos totalmente personalizáveis para confirmações, lembretes e acompanhamentos. Você pode incluir sua marca, informações específicas do negócio e links personalizados.",
  },
  {
    question: "Quais integrações estão disponíveis?",
    answer: "Integramos com os principais calendários (Google Calendar, Outlook, Apple Calendar), CRMs (Salesforce, HubSpot), sistemas de pagamento e diversas outras ferramentas de negócios. Nossa API também permite integrações personalizadas.",
  },
  {
    question: "Como funciona o preço?",
    answer: "Oferecemos planos baseados no uso com minutos de voz, agendamentos e e-mails mensais. Todos os planos incluem teste grátis de 14 dias sem necessidade de cartão de crédito. Você pode fazer upgrade ou downgrade a qualquer momento.",
  },
  {
    question: "O que acontece se a IA não conseguir lidar com uma solicitação?",
    answer: "Em casos complexos, a IA pode transferir a chamada para um atendente humano ou coletar informações para retorno. Você também pode configurar fluxos personalizados para situações específicas do seu negócio.",
  },
  {
    question: "Quanto tempo leva para configurar?",
    answer: "A configuração básica leva menos de 5 minutos. Basta criar sua conta, conectar seu calendário e configurar suas preferências. Para personalizações avançadas, oferecemos suporte dedicado para ajudá-lo.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
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
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa saber sobre nosso serviço de voz IA
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
