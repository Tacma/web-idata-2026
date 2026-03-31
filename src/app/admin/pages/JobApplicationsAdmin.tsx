import { useState, useEffect } from 'react';
import { Send, Eye, X, Download, Mail, Phone, FileText, MapPin, User } from 'lucide-react';
import { getAllJobApplications, updateJobApplicationStatus, deleteJobApplication } from '../services/jobApplications.service';

function formatDate(value?: string | null) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString('es-ES');
}

function downloadCsv(applications: any[]) {
  const rows = applications.map((app) => ({
    id: app.id,
    type: app.application_type,
    status: app.status,
    applied_to: app.applied_to_label,
    first_name: app.first_name,
    last_name: app.last_name,
    email: app.email,
    phone: app.phone,
    country: app.country,
    city: app.city,
    desired_area: app.desired_area || '',
    desired_role: app.desired_role || '',
    years_of_experience: app.years_of_experience || '',
    availability: app.availability || '',
    linkedin_url: app.linkedin_url || '',
    portfolio_url: app.portfolio_url || '',
    salary_expectation: app.salary_expectation || '',
    source_page: app.source_page,
    source_url: app.source_url,
    submitted_at: app.submitted_at,
  }));

  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String((row as Record<string, any>)[header] ?? '').replace(/"/g, '""')}"`)
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `job-applications-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

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
        <button
          onClick={() => downloadCsv(applications)}
          disabled={applications.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
                    <div className="text-sm font-medium text-gray-900">{`${app.first_name || ''} ${app.last_name || ''}`.trim() || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{app.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.applied_to_label || app.job_title || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(app.submitted_at || app.created_at)}
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
                      <option value="archived">Archivado</option>
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

      {selectedApp ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                {`${selectedApp.first_name || ''} ${selectedApp.last_name || ''}`.trim() || 'Postulación'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedApp.applied_to_label || selectedApp.job_title || 'Aplicación sin vacante'}
              </p>
            </div>
            <button
              onClick={() => setSelectedApp(null)}
              className="text-gray-500 hover:text-gray-700"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                <User className="w-4 h-4" />
                Perfil
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-800">Tipo:</span> {selectedApp.application_type === 'open' ? 'Espontánea' : 'Vacante'}</p>
                <p><span className="font-medium text-gray-800">Estado:</span> {selectedApp.status}</p>
                <p><span className="font-medium text-gray-800">Enviada:</span> {formatDate(selectedApp.submitted_at || selectedApp.created_at)}</p>
                <p><span className="font-medium text-gray-800">Experiencia:</span> {selectedApp.years_of_experience || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Disponibilidad:</span> {selectedApp.availability || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Aspiración salarial:</span> {selectedApp.salary_expectation || 'N/A'}</p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                <Mail className="w-4 h-4" />
                Contacto
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-800">Email:</span> {selectedApp.email || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Teléfono:</span> {selectedApp.phone || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Idioma:</span> {selectedApp.language || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">LinkedIn:</span> {selectedApp.linkedin_url ? <a className="text-blue-600 hover:underline" href={selectedApp.linkedin_url} target="_blank" rel="noreferrer">Abrir</a> : 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Portafolio:</span> {selectedApp.portfolio_url ? <a className="text-blue-600 hover:underline" href={selectedApp.portfolio_url} target="_blank" rel="noreferrer">Abrir</a> : 'N/A'}</p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                <MapPin className="w-4 h-4" />
                Ubicación e interés
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-800">País:</span> {selectedApp.country || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Ciudad:</span> {selectedApp.city || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Área deseada:</span> {selectedApp.desired_area || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">Rol deseado:</span> {selectedApp.desired_role || 'N/A'}</p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                <FileText className="w-4 h-4" />
                Archivos y origen
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium text-gray-800">CV:</span> {selectedApp.resume_file_url ? <a className="text-blue-600 hover:underline" href={selectedApp.resume_file_url} target="_blank" rel="noreferrer">Abrir CV</a> : (selectedApp.resume_file_name || 'No disponible')}</p>
                <p><span className="font-medium text-gray-800">Página origen:</span> {selectedApp.source_page || 'N/A'}</p>
                <p><span className="font-medium text-gray-800">URL origen:</span> {selectedApp.source_url ? <a className="text-blue-600 hover:underline break-all" href={selectedApp.source_url} target="_blank" rel="noreferrer">{selectedApp.source_url}</a> : 'N/A'}</p>
              </div>
            </div>
          </div>

          {selectedApp.cover_letter ? (
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Mensaje / Cover letter</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedApp.cover_letter}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
