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