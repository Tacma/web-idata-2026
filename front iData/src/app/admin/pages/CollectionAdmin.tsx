import { useState, useEffect } from 'react';
import { CRUDList } from '../components/CRUDList';
import type { CollectionName } from '../../shared/types';

// Import all services
import * as servicesService from '../services/services.service';
import * as industriesService from '../services/industries.service';
import * as caseStudiesService from '../services/caseStudies.service';
import * as blogPostsService from '../services/blogPosts.service';
import * as blogCategoriesService from '../services/blogCategories.service';
import * as jobsService from '../services/jobs.service';
import * as teamMembersService from '../services/teamMembers.service';
import * as resourcesService from '../services/resources.service';
import * as testimonialsService from '../services/testimonials.service';
import * as serviceCategoriesService from '../services/serviceCategories.service';

interface CollectionAdminProps {
  collectionName: CollectionName;
  title: string;
}

export function CollectionAdmin({ collectionName, title }: CollectionAdminProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadItems();
  }, [collectionName]);

  async function loadItems() {
    try {
      setLoading(true);
      let data: any[] = [];
      
      switch (collectionName) {
        case 'services':
          data = await servicesService.getServices();
          break;
        case 'serviceCategories':
          data = await serviceCategoriesService.getAllServiceCategories();
          break;
        case 'industries':
          data = await industriesService.getAllIndustries();
          break;
        case 'caseStudies':
          data = await caseStudiesService.getAllCaseStudies();
          break;
        case 'blogPosts':
          data = await blogPostsService.getAllBlogPosts();
          break;
        case 'blogCategories':
          data = await blogCategoriesService.getAllBlogCategories();
          break;
        case 'jobs':
          data = await jobsService.getAllJobs();
          break;
        case 'teamMembers':
          data = await teamMembersService.getAllTeamMembers();
          break;
        case 'resources':
          data = await resourcesService.getAllResources();
          break;
        case 'testimonials':
          data = await testimonialsService.getAllTestimonials();
          break;
        default:
          data = [];
      }
      
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(newItem: any) {
    try {
      switch (collectionName) {
        case 'services':
          await servicesService.createService(newItem);
          break;
        case 'serviceCategories':
          await serviceCategoriesService.createServiceCategory(newItem);
          break;
        case 'industries':
          await industriesService.createIndustry(newItem);
          break;
        case 'caseStudies':
          await caseStudiesService.createCaseStudy(newItem);
          break;
        case 'blogPosts':
          await blogPostsService.createBlogPost(newItem);
          break;
        case 'blogCategories':
          await blogCategoriesService.createBlogCategory(newItem);
          break;
        case 'jobs':
          await jobsService.createJob(newItem);
          break;
        case 'teamMembers':
          await teamMembersService.createTeamMember(newItem);
          break;
        case 'resources':
          await resourcesService.createResource(newItem);
          break;
        case 'testimonials':
          await testimonialsService.createTestimonial(newItem);
          break;
      }
      await loadItems();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Error al crear el elemento');
    }
  }

  async function handleUpdate(id: string, updates: any) {
    try {
      switch (collectionName) {
        case 'services':
          await servicesService.updateService(id, updates);
          break;
        case 'serviceCategories':
          await serviceCategoriesService.updateServiceCategory(id, updates);
          break;
        case 'industries':
          await industriesService.updateIndustry(id, updates);
          break;
        case 'caseStudies':
          await caseStudiesService.updateCaseStudy(id, updates);
          break;
        case 'blogPosts':
          await blogPostsService.updateBlogPost(id, updates);
          break;
        case 'blogCategories':
          await blogCategoriesService.updateBlogCategory(id, updates);
          break;
        case 'jobs':
          await jobsService.updateJob(id, updates);
          break;
        case 'teamMembers':
          await teamMembersService.updateTeamMember(id, updates);
          break;
        case 'resources':
          await resourcesService.updateResource(id, updates);
          break;
        case 'testimonials':
          await testimonialsService.updateTestimonial(id, updates);
          break;
      }
      await loadItems();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error al actualizar el elemento');
    }
  }

  async function handleDelete(item: any) {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    
    try {
      switch (collectionName) {
        case 'services':
          await servicesService.deleteService(item.id);
          break;
        case 'serviceCategories':
          await serviceCategoriesService.deleteServiceCategory(item.id);
          break;
        case 'industries':
          await industriesService.deleteIndustry(item.id);
          break;
        case 'caseStudies':
          await caseStudiesService.deleteCaseStudy(item.id);
          break;
        case 'blogPosts':
          await blogPostsService.deleteBlogPost(item.id);
          break;
        case 'blogCategories':
          await blogCategoriesService.deleteBlogCategory(item.id);
          break;
        case 'jobs':
          await jobsService.deleteJob(item.id);
          break;
        case 'teamMembers':
          await teamMembersService.deleteTeamMember(item.id);
          break;
        case 'resources':
          await resourcesService.deleteResource(item.id);
          break;
        case 'testimonials':
          await testimonialsService.deleteTestimonial(item.id);
          break;
      }
      await loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error al eliminar el elemento');
    }
  }

  const columns = [
    {
      key: 'title' as any,
      label: 'Título',
      render: (item: any) => item.title_es || item.title || item.name || item.clientName || 'Sin título'
    },
    {
      key: 'status' as any,
      label: 'Estado',
      render: (item: any) => {
        const status = item.status || 'published';
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${
            status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status === 'published' ? 'Publicado' : 'Borrador'}
          </span>
        );
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CRUDList
        title={title}
        items={items}
        columns={columns}
        onCreate={() => setIsCreating(true)}
        onEdit={(item) => setEditingItem(item)}
        onDelete={handleDelete}
      />
    </div>
  );
}
