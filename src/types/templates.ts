import { ElementItem } from './elements';

export interface CategoryDetails {
  title: string;
  color: string;
  id: number;
}

export interface GetTemplatesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isDeleted?: number;
  sortField?: string;
  sortDirection?: string;
  categoryId?: number;
}

export interface TemplateResponse {
  title: string;
  description: string;
  category: CategoryDetails;
  id: number;
  imagePreviewUrl: string;
}

export interface GetTemplatesResponse {
  templates: TemplateResponse[];
  page: number;
  pageSize: number;
  totalForms: number;
  totalPages: number;
}

export interface GetTemplatesDetailsResponse {
  id: number;
  elements: ElementItem[];
  title: string;
  logoUrl: string;
  settings: object;
}
