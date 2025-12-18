import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    Cal?: {
      (action: string, ...args: unknown[]): void;
      ns?: Record<string, (...args: unknown[]) => void>;
      q?: unknown[];
      loaded?: boolean;
    };
  }
}

export const useCalEmbed = () => {
  useEffect(() => {
    // Load Cal.com embed script only once
    if (typeof window !== 'undefined' && !document.getElementById('cal-embed-script')) {
      // Initialize Cal queue
      window.Cal = window.Cal || function(...args: unknown[]) {
        (window.Cal!.q = window.Cal!.q || []).push(args);
      };

      const script = document.createElement('script');
      script.id = 'cal-embed-script';
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log('Cal.com script loaded');
        if (window.Cal) {
          window.Cal('init', { origin: 'https://cal.com' });
        }
      };
    }
  }, []);

  const openCalPopup = useCallback(() => {
    console.log('Opening Cal popup...');
    if (window.Cal) {
      window.Cal('modal', {
        calLink: 'creativeia-agentes-t6ryln/creativevoiceia',
        config: {
          layout: 'month_view',
        }
      });
    } else {
      // Fallback: open in new tab
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
