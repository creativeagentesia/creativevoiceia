import { useEffect, useCallback } from 'react';

export const useCalEmbed = () => {
  useEffect(() => {
    // Only load once
    if (typeof window !== 'undefined' && !document.getElementById('cal-embed-script')) {
      const script = document.createElement('script');
      script.id = 'cal-embed-script';
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const openCalPopup = useCallback(() => {
    // Always open in new tab - most reliable approach
    window.open('https://cal.com/creativeia-agentes-t6ryln/creativevoiceia', '_blank');
  }, []);

  const scrollToCTA = useCallback(() => {
    const ctaSection = document.getElementById('cta-agendamento');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { openCalPopup, scrollToCTA };
};
