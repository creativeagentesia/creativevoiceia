import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, MoreHorizontal, Shield, User, UserCog } from 'lucide-react';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  role: 'super_admin' | 'common_user';
}

export default function Users() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const { user: currentUser, isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  async function fetchUsers() {
    try {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Merge profiles with roles
      const usersWithRoles = profiles?.map(profile => {
        const userRole = roles?.find(r => r.user_id === profile.id);
        return {
          ...profile,
          role: (userRole?.role as 'super_admin' | 'common_user') || 'common_user',
        };
      }) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os usuários.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateUserRole(userId: string, newRole: 'super_admin' | 'common_user') {
    if (userId === currentUser?.id) {
      toast({
        title: 'Ação não permitida',
        description: 'Você não pode alterar seu próprio papel.',
        variant: 'destructive',
      });
      return;
    }

    setUpdating(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));

      toast({
        title: 'Papel atualizado',
        description: `O usuário agora é ${newRole === 'super_admin' ? 'Super Admin' : 'Usuário Comum'}.`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o papel do usuário.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  }

  if (!isAdmin) {
    return (
      <AdminLayout title="Usuários" description="Acesso restrito">
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Acesso Restrito</h3>
            <p className="text-muted-foreground">
              Apenas Super Administradores podem gerenciar usuários.
            </p>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  if (loading) {
    return (
      <AdminLayout title="Usuários" description="Gerencie usuários e permissões">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Usuários" 
      description="Gerencie usuários e suas permissões"
    >
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
          <CardDescription>
            Gerencie os usuários do sistema e promova usuários comuns a administradores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        {user.avatar_url ? (
                          <img 
                            src={user.avatar_url} 
                            alt="" 
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {user.full_name || 'Sem nome'}
                        </p>
                        {user.id === currentUser?.id && (
                          <span className="text-xs text-muted-foreground">(Você)</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.role === 'super_admin' ? 'default' : 'secondary'}
                      className="gap-1"
                    >
                      {user.role === 'super_admin' ? (
                        <>
                          <Shield className="h-3 w-3" />
                          Super Admin
                        </>
                      ) : (
                        <>
                          <User className="h-3 w-3" />
                          Usuário Comum
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {user.id !== currentUser?.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            disabled={updating === user.id}
                          >
                            {updating === user.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreHorizontal className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.role === 'common_user' ? (
                            <DropdownMenuItem 
                              onClick={() => updateUserRole(user.id, 'super_admin')}
                            >
                              <UserCog className="mr-2 h-4 w-4" />
                              Promover a Super Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => updateUserRole(user.id, 'common_user')}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Rebaixar a Usuário Comum
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum usuário cadastrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
