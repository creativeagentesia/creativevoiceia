import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Settings as SettingsIcon, Shield, Key, Database, Construction } from 'lucide-react';

export default function Settings() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <AdminLayout title="Configurações" description="Acesso restrito">
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Acesso Restrito</h3>
            <p className="text-muted-foreground">
              Apenas Super Administradores podem acessar as configurações.
            </p>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Configurações" 
      description="Configure integrações e preferências do sistema"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Integrações
            </CardTitle>
            <CardDescription>
              Configure APIs e serviços externos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Apify (YouTube Scraper)</h4>
                  <p className="text-sm text-muted-foreground">
                    Para extração automática de informações de vídeos
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Stripe</h4>
                  <p className="text-sm text-muted-foreground">
                    Pagamentos e assinaturas
                  </p>
                </div>
                <span className="text-sm text-green-500">Configurado</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Resend</h4>
                  <p className="text-sm text-muted-foreground">
                    Envio de emails
                  </p>
                </div>
                <span className="text-sm text-green-500">Configurado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Banco de Dados
            </CardTitle>
            <CardDescription>
              Informações sobre o armazenamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Seções</span>
                <span className="font-medium">14</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Vídeos</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Usuários</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Contatos</span>
                <span className="font-medium">-</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="py-8 text-center">
            <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Mais Configurações em Breve</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Configurações adicionais como tema, SEO e backups serão adicionadas em futuras atualizações.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
