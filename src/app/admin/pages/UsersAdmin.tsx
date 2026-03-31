import { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Shield } from 'lucide-react';
import { createUser, getAllUsers, deleteUser } from '../services/users.service';

export function UsersAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'editor',
    status: 'active',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async function handleCreate() {
    if (!form.name.trim() || !form.email.trim()) return;
    try {
      setCreating(true);
      await createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
      });
      setForm({ name: '', email: '', role: 'editor', status: 'active' });
      await loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Usuarios y Roles</h1>
          <p className="mt-2 text-sm text-gray-600">Gestiona los usuarios con acceso al admin</p>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating || !form.name.trim() || !form.email.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {creating ? 'Creando...' : 'Crear usuario'}
        </button>
      </div>

      <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-4">
        <input
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          placeholder="Nombre"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="correo@idata.global"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={form.role}
          onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="admin">Administrador</option>
          <option value="editor">Editor</option>
        </select>
        <select
          value={form.status}
          onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{user.name || 'Sin nombre'}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role === 'admin' ? 'Administrador' : 'Editor'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={user.role === 'admin'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
