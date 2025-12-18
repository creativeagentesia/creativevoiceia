import { useCallback, useState } from 'react';

export const useCalEmbed = () => {
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);

  const openCalPopup = useCallback(() => {
    setIsCalModalOpen(true);
  }, []);

  const closeCalModal = useCallback(() => {
    setIsCalModalOpen(false);
  }, []);

  const scrollToCTA = useCallback(() => {
    const ctaSection = document.getElementById('cta-agendamento');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { 
    openCalPopup, 
    scrollToCTA, 
    isCalModalOpen, 
    setIsCalModalOpen,
    closeCalModal 
  };
};
