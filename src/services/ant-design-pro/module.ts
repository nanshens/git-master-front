import { request } from 'umi';

export async function getModule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ModuleList>('/api/module', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
} 

export async function getAllModule(options?: { [key: string]: any }) {
  return request<API.ModuleList>('/api/module/all', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createModule(body: API.ModuleListItem, options?: { [key: string]: any }) {
  return request<API.ModuleListItem>('/api/module', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateModule(body: API.ModuleListItem, options?: { [key: string]: any }) {
  return request<API.ModuleListItem>('/api/module', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}