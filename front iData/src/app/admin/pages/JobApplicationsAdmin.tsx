import { useState, useEffect } from 'react';
import { Send, Eye, Check, X, Filter, Download } from 'lucide-react';
import { getAllJobApplications, updateJobApplicationStatus, deleteJobApplication } from '../services/jobApplications.service';

export function JobApplicationsAdmin() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);
      const data = await getAllJobApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateJobApplicationStatus(id, status);
      await loadApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al actualizar el estado');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta aplicación?')) return;
    try {
      await deleteJobApplication(id);
      await loadApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Error al eliminar la aplicación');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando aplicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Aplicaciones de Trabajo</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona las aplicaciones recibidas para las vacantes publicadas
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Send className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay aplicaciones todavía</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vacante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{app.name || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{app.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.jobTitle || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={app.status || 'new'}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="new">Nuevo</option>
                      <option value="reviewing">En revisión</option>
                      <option value="interviewing">Entrevistando</option>
                      <option value="accepted">Aceptado</option>
                      <option value="rejected">Rechazado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
