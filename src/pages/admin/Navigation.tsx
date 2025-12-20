import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Loader2, 
  Plus, 
  Trash2, 
  GripVertical,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit,
  Navigation as NavigationIcon
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
}

export default function Navigation() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const { toast } = useToast();

  // Form state
  const [label, setLabel] = useState('');
  const [href, setHref] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .is('parent_id', null)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation:', error);
    } finally {
      setLoading(false);
    }
  }

  function openEditDialog(item: NavigationItem) {
    setEditingItem(item);
    setLabel(item.label);
    setHref(item.href);
    setDialogOpen(true);
  }

  function openAddDialog() {
    setEditingItem(null);
    setLabel('');
    setHref('');
    setDialogOpen(true);
  }

  async function saveItem() {
    if (!label.trim() || !href.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha o nome e o link do item.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        // Update existing
        const { error } = await supabase
          .from('navigation_items')
          .update({ label, href })
          .eq('id', editingItem.id);

        if (error) throw error;

        setItems(items.map(i => 
          i.id === editingItem.id ? { ...i, label, href } : i
        ));

        toast({ title: 'Item atualizado' });
      } else {
        // Create new
        const { data, error } = await supabase
          .from('navigation_items')
          .insert({
            label,
            href,
            sort_order: items.length,
          })
          .select()
          .single();

        if (error) throw error;

        setItems([...items, data]);
        toast({ title: 'Item adicionado' });
      }

      setDialogOpen(false);
      setLabel('');
      setHref('');
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o item.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  async function toggleVisibility(item: NavigationItem) {
    try {
      const { error } = await supabase
        .from('navigation_items')
        .update({ is_visible: !item.is_visible })
        .eq('id', item.id);

      if (error) throw error;

      setItems(items.map(i => 
        i.id === item.id ? { ...i, is_visible: !i.is_visible } : i
      ));
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  }

  async function deleteItem(itemId: string) {
    try {
      const { error } = await supabase
        .from('navigation_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setItems(items.filter(i => i.id !== itemId));
      toast({ title: 'Item removido' });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  async function moveItem(item: NavigationItem, direction: 'up' | 'down') {
    const currentIndex = items.findIndex(i => i.id === item.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= items.length) return;

    const targetItem = items[targetIndex];
    
    try {
      await supabase
        .from('navigation_items')
        .update({ sort_order: targetItem.sort_order })
        .eq('id', item.id);

      await supabase
        .from('navigation_items')
        .update({ sort_order: item.sort_order })
        .eq('id', targetItem.id);

      const newItems = [...items];
      [newItems[currentIndex], newItems[targetIndex]] = [newItems[targetIndex], newItems[currentIndex]];
      setItems(newItems);
    } catch (error) {
      console.error('Error moving item:', error);
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Navegação" description="Gerencie o menu do site">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Navegação" 
      description="Gerencie os itens do menu de navegação do site"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Itens do Menu</CardTitle>
            <CardDescription>
              Configure os links que aparecem no menu de navegação do site.
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Editar Item' : 'Novo Item de Navegação'}
                </DialogTitle>
                <DialogDescription>
                  Configure o nome e o link do item de menu.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Nome do Item</Label>
                  <Input
                    id="label"
                    placeholder="Ex: Funcionalidades"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="href">Link</Label>
                  <Input
                    id="href"
                    placeholder="Ex: #funcionalidades ou /pagina"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use # para âncoras na mesma página ou / para outras páginas.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={saveItem} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    editingItem ? 'Salvar' : 'Adicionar'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GripVertical className="h-5 w-5" />
                    <span className="text-sm font-mono w-6">{index + 1}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">
                      {item.label}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.href}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveItem(item, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveItem(item, 'down')}
                      disabled={index === items.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.is_visible ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={item.is_visible}
                      onCheckedChange={() => toggleVisibility(item)}
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <NavigationIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Nenhum item de navegação</h3>
              <p className="text-muted-foreground mb-4">
                Adicione itens ao menu de navegação do site.
              </p>
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Primeiro Item
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
