import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Inicial",
    description: "Perfeito para pequenas empresas começando",
    price: "R$199",
    period: "/mês",
    priceId: "price_1SflND2OaCznY7dQgxnluf3s",
    planKey: "inicial",
    features: [
      "500 minutos de voz/mês",
      "100 agendamentos/mês",
      "1.000 e-mails/mês",
      "Análises básicas",
      "Suporte por e-mail",
      "2 integrações",
    ],
    cta: "Contrate Agora",
    popular: false,
    isCheckout: true,
  },
  {
    name: "Profissional",
    description: "Ideal para empresas em crescimento",
    price: "R$399",
    period: "/mês",
    priceId: "price_1SflNR2OaCznY7dQrbLHUleh",
    planKey: "profissional",
    features: [
      "2.000 minutos de voz/mês",
      "Agendamentos ilimitados",
      "5.000 e-mails/mês",
      "Análises avançadas",
      "Suporte prioritário",
      "10 integrações",
      "Modelos personalizados",
      "Acesso à API",
    ],
    cta: "Contrate Agora",
    popular: true,
    isCheckout: true,
  },
  {
    name: "Empresarial",
    description: "Para grandes organizações com necessidades específicas",
    price: "Personalizado",
    period: "",
    priceId: null,
    planKey: "empresarial",
    features: [
      "Minutos de voz ilimitados",
      "Agendamentos ilimitados",
      "E-mails ilimitados",
      "Análises personalizadas",
      "Suporte dedicado 24/7",
      "Integrações ilimitadas",
      "Opção white-label",
      "Treinamento de IA personalizado",
      "Garantia de SLA",
    ],
    cta: "Contatar Vendas",
    popular: false,
    isCheckout: false,
  },
];

const Pricing = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planKey: string, priceId: string) => {
    setLoadingPlan(planKey);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, planName: planKey },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Erro ao iniciar checkout",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="precos" className="py-20 lg:py-32 bg-background">
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
            Preços Simples e Transparentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha o plano que se adapta às necessidades do seu negócio
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/5 to-primary/10 border-2 border-primary shadow-lg"
                  : "bg-card border border-border"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full hero-gradient text-primary-foreground text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl lg:text-5xl font-display font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "gradient" : "outline"}
                size="lg"
                className="w-full"
                disabled={loadingPlan === plan.planKey}
                onClick={() => {
                  if (plan.isCheckout && plan.priceId) {
                    handleCheckout(plan.planKey, plan.priceId);
                  } else {
                    scrollToContact();
                  }
                }}
              >
                {loadingPlan === plan.planKey ? "Carregando..." : plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground mt-8"
        >
          Todos os planos incluem teste grátis de 14 dias • Sem cartão de crédito • Cancele a qualquer momento
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
