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