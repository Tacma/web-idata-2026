import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { CollectionName } from '../../shared/types';
import { LocalizedForm } from '../components/LocalizedForm';
import { PageSectionDesigner } from '../components/PageSectionDesigner';
import { InsightVisualEditor } from '../components/InsightVisualEditor';
import { ServiceVisualEditor } from '../components/ServiceVisualEditor';
import { getCollectionConfig } from '../config/collections';

interface CollectionEditorPageProps {
  collectionName: CollectionName;
}

export function CollectionEditorPage({ collectionName }: CollectionEditorPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const config = useMemo(() => getCollectionConfig(collectionName), [collectionName]);
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const result = await config.getById(id);
        if (!cancelled) {
          if (!result) {
            setError('No se encontró el registro solicitado.');
          }
          setItem(result);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || 'No fue posible cargar el registro.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [config, id]);

  const initialValues = useMemo(
    () => config.toFormValues(item),
    [config, item]
  );

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setSaving(true);
      setError(null);
      const payload = config.fromFormValues(values, item);

      if (isEditing && id) {
        await config.update(id, payload);
      } else {
        await config.create(payload);
      }

      navigate(config.basePath, {
        state: {
          notice: isEditing
            ? `${config.singularTitle} actualizado correctamente.`
            : `${config.singularTitle} creado correctamente.`,
        },
      });
    } catch (err: any) {
      setError(err?.message || 'No fue posible guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-gray-600">Cargando formulario...</div>
      </div>
    );
  }

  return (
    <div>
      {collectionName === 'services' ? (
        <ServiceVisualEditor
          title={isEditing ? `Editar ${config.singularTitle}` : `Crear ${config.singularTitle}`}
          helperText="Este editor prioriza una experiencia visual para contenidos, relaciones e imágenes del servicio. Los cambios se guardan directamente en Supabase."
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate(config.basePath)}
          backHref={config.basePath}
          backLabel="Volver al listado"
          submitLabel={isEditing ? 'Guardar servicio' : 'Crear servicio'}
          cancelLabel="Cancelar"
          isSubmitting={saving}
          errorMessage={error}
        />
      ) : collectionName === 'blogPosts' ? (
        <InsightVisualEditor
          title={isEditing ? `Editar ${config.singularTitle}` : `Crear ${config.singularTitle}`}
          helperText="Edita la información principal y el contenido de la noticia."
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate(config.basePath)}
          backHref={config.basePath}
          backLabel="Volver al listado"
          submitLabel={isEditing ? 'Guardar insight' : 'Crear insight'}
          cancelLabel="Cancelar"
          isSubmitting={saving}
          errorMessage={error}
        />
      ) : collectionName === 'homeSections' ? (
        <PageSectionDesigner
          title={isEditing ? `Editar ${config.singularTitle}` : `Crear ${config.singularTitle}`}
          helperText="Este editor refleja la estructura actual del Home. El hero principal y el carrusel de logos inferior se administran aquí. Para el marquee se usa una sola versión base del logo en blanco."
          pageSlug="home"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate(config.basePath)}
          submitLabel={isEditing ? 'Guardar sección' : 'Crear sección'}
          cancelLabel="Cancelar"
          isSubmitting={saving}
          errorMessage={error}
        />
      ) : (
        <LocalizedForm
          title={isEditing ? `Editar ${config.singularTitle}` : `Crear ${config.singularTitle}`}
          helperText={`Los cambios guardados impactan directamente el contenido publicado en Supabase para este módulo.`}
          fields={config.fields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate(config.basePath)}
          variant="page"
          backHref={config.basePath}
          backLabel="Volver al listado"
          submitLabel={isEditing ? 'Guardar cambios' : 'Crear registro'}
          cancelLabel="Cancelar"
          isSubmitting={saving}
          errorMessage={error}
        />
      )}
    </div>
  );
}
