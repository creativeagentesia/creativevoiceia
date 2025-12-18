import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    Cal?: any;
  }
}

export const useCalEmbed = () => {
  useEffect(() => {
    // Load Cal.com embed script
    if (typeof window !== 'undefined' && !document.getElementById('cal-embed-script')) {
      const script = document.createElement('script');
      script.id = 'cal-embed-script';
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        // Initialize Cal after script loads
        if (window.Cal) {
          window.Cal("init", { origin: "https://cal.com" });
          
          // Pre-load the popup for faster opening
          window.Cal("preload", {
            calLink: "creativeia-agentes-t6ryln/creativevoiceia"
          });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const openCalPopup = useCallback(() => {
    if (window.Cal) {
      window.Cal("modal", {
        calLink: "creativeia-agentes-t6ryln/creativevoiceia",
        config: {
          layout: "month_view",
          theme: "dark"
        }
      });
    } else {
      // Fallback if Cal is not loaded yet
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
