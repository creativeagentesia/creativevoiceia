import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function RoleGuard({ children, requireAdmin = false }: RoleGuardProps) {
  const { user, loading, isAdmin, userRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar esta área. 
            Entre em contato com um administrador para solicitar acesso.
          </p>
          <p className="text-sm text-muted-foreground">
            Seu papel atual: <span className="font-medium">{userRole || 'Não definido'}</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
