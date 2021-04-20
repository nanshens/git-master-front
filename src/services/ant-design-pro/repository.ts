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