import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Section {
  id: string;
  name: string;
  component_name: string;
  is_visible: boolean;
  sort_order: number;
}

export function useSectionVisibility() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    try {
      const { data, error } = await supabase
        .from('website_sections')
        .select('id, name, component_name, is_visible, sort_order')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  }

  const isVisible = (componentName: string): boolean => {
    const section = sections.find(s => s.component_name === componentName);
    return section ? section.is_visible : true;
  };

  return { sections, loading, isVisible };
}
