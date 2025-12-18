import { useEffect } from 'react';

declare global {
  interface Window {
    Cal?: {
      (action: string, ...args: unknown[]): void;
      q?: unknown[];
      loaded?: boolean;
    };
  }
}

export const useCalEmbed = () => {
  useEffect(() => {
    // Load Cal.com embed script
    if (!window.Cal) {
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      document.head.appendChild(script);
      
      window.Cal = function(...args: unknown[]) {
        const cal = window.Cal;
        if (!cal?.loaded) {
          cal.q = cal.q || [];
          cal.q.push(args);
        }
      };
    }
  }, []);

  const openCalPopup = () => {
    if (window.Cal) {
      window.Cal('openModal', {
        calLink: 'creativeia-agentes-t6ryln/creativevoiceia',
        config: {
          layout: 'month_view',
        }
      });
    }
  };

  return { openCalPopup };
};
