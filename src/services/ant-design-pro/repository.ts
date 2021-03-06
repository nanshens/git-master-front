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

export async function getAllRepository(options?: { [key: string]: any }) {
  return request<API.RepositoryList>('/api/repository/all', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createRepository(body: API.RepositoryDto, options?: { [key: string]: any }) {
  return request<API.RepositoryDto>('/api/repository', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    data: body,
    ...(options || {}),
  });
}

export async function updateRepository(body: API.RepositoryDto, options?: { [key: string]: any }) {
  return request<API.RepositoryDto>('/api/repository', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}