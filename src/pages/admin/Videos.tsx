import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Loader2, Plus, Trash2, Video, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface Section {
  id: string;
  display_name: string;
  component_name: string;
}

interface VideoContent {
  id: string;
  section_id: string;
  youtube_url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  is_visible: boolean;
  sort_order: number;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function Videos() {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch video sections
      const { data: sectionsData } = await supabase
        .from('website_sections')
        .select('id, display_name, component_name')
        .in('component_name', ['VideoDemo', 'VideoTestimonials']);

      setSections(sectionsData || []);

      // Fetch videos
      const { data: videosData } = await supabase
        .from('video_content')
        .select('*')
        .order('sort_order', { ascending: true });

      setVideos(videosData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addVideo() {
    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      toast({
        title: 'URL inválida',
        description: 'Por favor, insira uma URL válida do YouTube.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedSection) {
      toast({
        title: 'Seção não selecionada',
        description: 'Por favor, selecione uma seção para o vídeo.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      const { data, error } = await supabase
        .from('video_content')
        .insert({
          section_id: selectedSection,
          youtube_url: youtubeUrl,
          title: title || null,
          thumbnail_url: thumbnailUrl,
          sort_order: videos.length,
        })
        .select()
        .single();

      if (error) throw error;

      setVideos([...videos, data]);
      setDialogOpen(false);
      setYoutubeUrl('');
      setTitle('');
      setSelectedSection('');

      toast({
        title: 'Vídeo adicionado',
        description: 'O vídeo foi adicionado com sucesso.',
      });
    } catch (error) {
      console.error('Error adding video:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o vídeo.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  async function toggleVisibility(video: VideoContent) {
    try {
      const { error } = await supabase
        .from('video_content')
        .update({ is_visible: !video.is_visible })
        .eq('id', video.id);

      if (error) throw error;

      setVideos(videos.map(v => 
        v.id === video.id ? { ...v, is_visible: !v.is_visible } : v
      ));

      toast({
        title: video.is_visible ? 'Vídeo ocultado' : 'Vídeo exibido',
      });
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  }

  async function deleteVideo(videoId: string) {
    try {
      const { error } = await supabase
        .from('video_content')
        .delete()
        .eq('id', videoId);

      if (error) throw error;

      setVideos(videos.filter(v => v.id !== videoId));

      toast({
        title: 'Vídeo removido',
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o vídeo.',
        variant: 'destructive',
      });
    }
  }

  const getSectionName = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    return section?.display_name || 'Seção desconhecida';
  };

  if (loading) {
    return (
      <AdminLayout title="Vídeos" description="Gerencie vídeos do YouTube">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Vídeos" 
      description="Gerencie vídeos do YouTube para demonstrações e depoimentos"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-muted-foreground">
            {videos.length} vídeo(s) cadastrado(s)
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Vídeo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Vídeo do YouTube</DialogTitle>
              <DialogDescription>
                Cole a URL do vídeo do YouTube e selecione a seção onde ele será exibido.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="youtube-url">URL do YouTube</Label>
                <Input
                  id="youtube-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-title">Título (opcional)</Label>
                <Input
                  id="video-title"
                  placeholder="Título do vídeo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Seção</Label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a seção" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((section) => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.display_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {youtubeUrl && extractYouTubeId(youtubeUrl) && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={`https://img.youtube.com/vi/${extractYouTubeId(youtubeUrl)}/mqdefault.jpg`}
                    alt="Preview"
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={addVideo} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  'Adicionar'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className={!video.is_visible ? 'opacity-60' : ''}>
            <div className="relative aspect-video">
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title || 'Thumbnail'}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
                  <Video className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <a
                href={video.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-8 w-8 text-white" />
              </a>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium line-clamp-1">
                  {video.title || 'Sem título'}
                </h4>
                <Badge variant="secondary" className="shrink-0">
                  {getSectionName(video.section_id)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {video.is_visible ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Switch
                    checked={video.is_visible}
                    onCheckedChange={() => toggleVisibility(video)}
                  />
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => deleteVideo(video.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {videos.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Nenhum vídeo cadastrado</h3>
            <p className="text-muted-foreground mb-4">
              Adicione vídeos do YouTube para exibir no site.
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Primeiro Vídeo
            </Button>
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
}
