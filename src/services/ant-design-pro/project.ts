import { request } from 'umi';

export async function getProject(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProjectList>('/api/project', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getAllProject(options?: { [key: string]: any }) {
  return request<API.ProjectList>('/api/project/all', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createProject(body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectListItem>('/api/project', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateProject(body: API.ProjectListItem, options?: { [key: string]: any }) {
  return request<API.ProjectListItem>('/api/project', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}