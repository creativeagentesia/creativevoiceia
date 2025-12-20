import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2,
  Loader2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Section {
  id: string;
  name: string;
  display_name: string;
  component_name: string;
  is_visible: boolean;
  sort_order: number;
  can_be_deleted: boolean;
}

export default function Sections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    try {
      const { data, error } = await supabase
        .from('website_sections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as seções.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function toggleVisibility(section: Section) {
    setUpdating(section.id);
    try {
      const { error } = await supabase
        .from('website_sections')
        .update({ is_visible: !section.is_visible })
        .eq('id', section.id);

      if (error) throw error;

      setSections(sections.map(s => 
        s.id === section.id ? { ...s, is_visible: !s.is_visible } : s
      ));

      toast({
        title: section.is_visible ? 'Seção ocultada' : 'Seção exibida',
        description: `${section.display_name} foi ${section.is_visible ? 'ocultada' : 'exibida'} no site.`,
      });
    } catch (error) {
      console.error('Error updating section:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar a seção.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  }

  async function moveSection(section: Section, direction: 'up' | 'down') {
    const currentIndex = sections.findIndex(s => s.id === section.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const targetSection = sections[targetIndex];
    
    setUpdating(section.id);
    try {
      // Swap sort_order values
      await supabase
        .from('website_sections')
        .update({ sort_order: targetSection.sort_order })
        .eq('id', section.id);

      await supabase
        .from('website_sections')
        .update({ sort_order: section.sort_order })
        .eq('id', targetSection.id);

      // Update local state
      const newSections = [...sections];
      [newSections[currentIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[currentIndex]];
      
      // Update sort_order in local state
      newSections[currentIndex].sort_order = currentIndex + 1;
      newSections[targetIndex].sort_order = targetIndex + 1;
      
      setSections(newSections);

      toast({
        title: 'Ordem atualizada',
        description: `${section.display_name} foi movida.`,
      });
    } catch (error) {
      console.error('Error moving section:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível reordenar a seção.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Seções" description="Gerencie as seções do site">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Seções" 
      description="Controle a visibilidade e ordem das seções do site"
    >
      <Card>
        <CardHeader>
          <CardTitle>Seções do Site</CardTitle>
          <CardDescription>
            Ative ou desative seções e reorganize a ordem em que aparecem no site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GripVertical className="h-5 w-5" />
                  <span className="text-sm font-mono w-6">{index + 1}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground truncate">
                      {section.display_name}
                    </h4>
                    {!section.can_be_deleted && (
                      <Badge variant="secondary" className="text-xs">
                        Essencial
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Componente: {section.component_name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveSection(section, 'up')}
                    disabled={index === 0 || updating === section.id}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveSection(section, 'down')}
                    disabled={index === sections.length - 1 || updating === section.id}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {section.is_visible ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={section.is_visible}
                      onCheckedChange={() => toggleVisibility(section)}
                      disabled={updating === section.id}
                    />
                  </div>

                  <Link to={`/admin/sections/${section.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>

                  {section.can_be_deleted && (
                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
