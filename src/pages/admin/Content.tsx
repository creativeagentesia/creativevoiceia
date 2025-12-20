import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Construction } from 'lucide-react';

export default function Content() {
  return (
    <AdminLayout 
      title="Conteúdo" 
      description="Edite o conteúdo das seções do site"
    >
      <Card>
        <CardContent className="py-12 text-center">
          <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Em Desenvolvimento</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            O editor de conteúdo permitirá editar textos, imagens e outros elementos das seções.
            Por enquanto, use a página de Seções para gerenciar a visibilidade.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Textos
            </CardTitle>
            <CardDescription>
              Edite títulos, descrições e parágrafos
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Imagens
            </CardTitle>
            <CardDescription>
              Gerencie fotos e ilustrações do site
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Links
            </CardTitle>
            <CardDescription>
              Configure botões e links de ação
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </AdminLayout>
  );
}
