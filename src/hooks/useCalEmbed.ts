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
    // Load Cal.com embed script
    if (typeof window !== 'undefined' && !document.getElementById('cal-embed-script')) {
      (function (C: Window, A: string, L: string) {
        const p = function (a: unknown, ar?: unknown) {
          a = a || [];
          if (window.Cal) {
            window.Cal.q = window.Cal.q || [];
            window.Cal.q.push([a, ar]);
          }
        };
        if (!window.Cal) {
          const cal = function (...args: unknown[]) {
            p(args);
          };
          cal.q = [] as unknown[];
          cal.loaded = false;
          window.Cal = cal as Window['Cal'];
        }
        const script = document.createElement('script');
        script.id = 'cal-embed-script';
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          if (window.Cal) {
            window.Cal('init', 'creativevoiceia', { origin: 'https://cal.com' });
            window.Cal('ui', {
              theme: 'light',
              styles: { branding: { brandColor: '#8b5cf6' } },
              hideEventTypeDetails: false,
              layout: 'month_view'
            });
          }
        };
      })(window, 'script', 'https://app.cal.com/embed/embed.js');
    }
  }, []);

  const openCalPopup = useCallback(() => {
    if (window.Cal && window.Cal.ns && window.Cal.ns.creativevoiceia) {
      window.Cal.ns.creativevoiceia('modal', {
        calLink: 'creativeia-agentes-t6ryln/creativevoiceia',
        config: {
          layout: 'month_view',
        }
      });
    } else if (window.Cal) {
      // Fallback to direct call
      window.Cal('modal', {
        calLink: 'creativeia-agentes-t6ryln/creativevoiceia',
        config: {
          layout: 'month_view',
        }
      });
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
