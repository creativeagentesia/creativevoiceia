import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Layers, Users, Video, FileText, Eye, EyeOff } from 'lucide-react';

interface Stats {
  totalSections: number;
  visibleSections: number;
  hiddenSections: number;
  totalUsers: number;
  totalVideos: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalSections: 0,
    visibleSections: 0,
    hiddenSections: 0,
    totalUsers: 0,
    totalVideos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch sections stats
        const { data: sections } = await supabase
          .from('website_sections')
          .select('is_visible');

        const totalSections = sections?.length || 0;
        const visibleSections = sections?.filter(s => s.is_visible).length || 0;
        const hiddenSections = totalSections - visibleSections;

        // Fetch users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch videos count
        const { count: videosCount } = await supabase
          .from('video_content')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalSections,
          visibleSections,
          hiddenSections,
          totalUsers: usersCount || 0,
          totalVideos: videosCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Seções',
      value: stats.totalSections,
      description: 'Seções do site',
      icon: Layers,
      color: 'text-blue-500',
    },
    {
      title: 'Seções Visíveis',
      value: stats.visibleSections,
      description: 'Ativas no site',
      icon: Eye,
      color: 'text-green-500',
    },
    {
      title: 'Seções Ocultas',
      value: stats.hiddenSections,
      description: 'Desativadas',
      icon: EyeOff,
      color: 'text-orange-500',
    },
    {
      title: 'Usuários',
      value: stats.totalUsers,
      description: 'Cadastrados',
      icon: Users,
      color: 'text-purple-500',
    },
    {
      title: 'Vídeos',
      value: stats.totalVideos,
      description: 'Do YouTube',
      icon: Video,
      color: 'text-red-500',
    },
  ];

  return (
    <AdminLayout 
      title="Dashboard" 
      description="Visão geral do seu site"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao CMS</CardTitle>
            <CardDescription>
              Gerencie todo o conteúdo do seu site a partir deste painel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Seções</h4>
                <p className="text-sm text-muted-foreground">
                  Controle a visibilidade e ordem das seções do site
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Conteúdo</h4>
                <p className="text-sm text-muted-foreground">
                  Edite textos, imagens e outros conteúdos das seções
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Video className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Vídeos</h4>
                <p className="text-sm text-muted-foreground">
                  Adicione vídeos do YouTube às seções de demonstração
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as funcionalidades mais usadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <a 
                href="/admin/sections" 
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Layers className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Gerenciar Seções</span>
              </a>
              <a 
                href="/admin/videos" 
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Video className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Adicionar Vídeos</span>
              </a>
              <a 
                href="/admin/users" 
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Gerenciar Usuários</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
