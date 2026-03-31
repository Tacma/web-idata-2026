import { Mail, Search, Download, Filter, Eye, Check, X, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getContactSubmissions, updateContactSubmissionStatus, exportSubmissionsAsCSV } from '../services/contactSubmissions.service';
import type { ContactSubmission } from '../types';

export function ContactSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    try {
      setLoading(true);
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: ContactSubmission['status']) {
    try {
      await updateContactSubmissionStatus(id, newStatus);
      await loadSubmissions();
      
      // Update selected submission if it's the one being changed
      if (selectedSubmission?.id === id) {
        const updated = submissions.find(s => s.id === id);
        if (updated) {
          setSelectedSubmission({ ...updated, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al actualizar el estado');
    }
  }

  function handleExportCSV() {
    const csv = exportSubmissionsAsCSV(submissions);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      new: { label: 'Nuevo', icon: AlertCircle, color: 'bg-blue-100 text-blue-700 border-blue-200' },
      contacted: { label: 'Contactado', icon: Check, color: 'bg-green-100 text-green-700 border-green-200' },
      qualified: { label: 'Calificado', icon: Check, color: 'bg-purple-100 text-purple-700 border-purple-200' },
      converted: { label: 'Convertido', icon: Check, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      rejected: { label: 'Rechazado', icon: X, color: 'bg-red-100 text-red-700 border-red-200' },
    };
    
    return configs[status as keyof typeof configs] || configs.new;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Leads de contacto</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona y da seguimiento a los contactos recibidos desde el sitio web
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando leads...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions List */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Lista de contactos ({submissions.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {submissions.map((submission) => {
                const statusConfig = getStatusConfig(submission.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <button
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                      selectedSubmission?.id === submission.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {submission.first_name} {submission.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{submission.company}</p>
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{submission.source_type || 'general'}</span>
                      <span>·</span>
                      <span>{formatDate(submission.created_at)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submission Detail */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-6">
            {selectedSubmission ? (
              <div>
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900">Detalles del contacto</h3>
                </div>
                <div className="p-6 space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Información de contacto</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Nombre:</span>{' '}
                        <span className="font-medium text-gray-900">
                          {selectedSubmission.first_name} {selectedSubmission.last_name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>{' '}
                        <a href={`mailto:${selectedSubmission.email}`} className="font-medium text-blue-600 hover:underline">
                          {selectedSubmission.email}
                        </a>
                      </div>
                      {selectedSubmission.phone && (
                        <div>
                          <span className="text-gray-500">Teléfono:</span>{' '}
                          <span className="font-medium text-gray-900">{selectedSubmission.phone}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Empresa:</span>{' '}
                        <span className="font-medium text-gray-900">{selectedSubmission.company}</span>
                      </div>
                      {selectedSubmission.country && (
                        <div>
                          <span className="text-gray-500">País:</span>{' '}
                          <span className="font-medium text-gray-900">{selectedSubmission.country}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Mensaje</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedSubmission.message}
                    </p>
                  </div>

                  {/* Source Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Información de origen</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Tipo de fuente:</span>{' '}
                        <span className="font-medium text-gray-900">{selectedSubmission.source_type || 'General'}</span>
                      </div>
                      {selectedSubmission.source_title && (
                        <div>
                          <span className="text-gray-500">Título fuente:</span>{' '}
                          <span className="font-medium text-gray-900">{selectedSubmission.source_title}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500">Idioma:</span>{' '}
                        <span className="font-medium text-gray-900">{selectedSubmission.language === 'es' ? 'Español' : 'Inglés'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fecha:</span>{' '}
                        <span className="font-medium text-gray-900">{formatDate(selectedSubmission.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Actualizar estado</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['new', 'contacted', 'qualified', 'converted', 'rejected'] as const).map((status) => {
                        const config = getStatusConfig(status);
                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(selectedSubmission.id, status)}
                            className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                              selectedSubmission.status === status
                                ? config.color
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {config.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px] text-center p-6">
                <div>
                  <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona un contacto para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
