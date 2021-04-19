import { request } from 'umi';

export async function getDashboard(options?: { [key: string]: any }) {
    return request<API.DashboardList>('/api/dashboard', {
      method: 'GET',
      ...(options || {}),
    });
  }