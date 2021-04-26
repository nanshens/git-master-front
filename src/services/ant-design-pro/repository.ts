import { request } from 'umi';

export async function getRepository(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RepositoryList>('/api/repository', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}  

export async function createRepository(body: API.RepositoryListItem, options?: { [key: string]: any }) {
  return request<API.RepositoryListItem>('/api/repository', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    data: body,
    ...(options || {}),
  });
}

export async function updateRepository(body: API.RepositoryListItem, options?: { [key: string]: any }) {
  return request<API.RepositoryListItem>('/api/repository', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}