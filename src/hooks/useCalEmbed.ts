import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    Cal?: any;
  }
}

export const useCalEmbed = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Cal?.loaded) {
      // Cal.com official embed snippet
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar?: any) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.createElement("script");
            script.src = A;
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      window.Cal("init", "creativevoiceia", { origin: "https://cal.com" });
    }
  }, []);

  const openCalPopup = useCallback(() => {
    console.log('Opening Cal popup...');
    if (window.Cal?.ns?.creativevoiceia) {
      window.Cal.ns.creativevoiceia("modal", {
        calLink: "creativeia-agentes-t6ryln/creativevoiceia",
        config: { layout: "month_view" }
      });
    } else {
      console.log('Cal not ready, opening in new tab');
      window.open('https://cal.com/creativeia-agentes-t6ryln/creativevoiceia', '_blank');
    }
  }, []);

  const scrollToCTA = useCallback(() => {
    const ctaSection = document.getElementById('cta-agendamento');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { openCalPopup, scrollToCTA };
};
