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

export async function createProject(body: API.ProjectListDto, options?: { [key: string]: any }) {
  return request<API.ProjectListDto>('/api/project', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function updateProject(body: API.ProjectListDto, options?: { [key: string]: any }) {
  return request<API.ProjectListDto>('/api/project', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function getReleaseInfo(
  params: {
    projectId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProjectReleaseInfo>('/api/project/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function refreshCheckMessage(
  params: {
    projectId: string;
    moduleId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SingleResultDto>('/api/project/refreshcheckcommit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getCheckMessage(
  params: {
    projectId: string;
    moduleId: string;
    gitInfoId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.CheckMessageDto>('/api/project/checkcommit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function postCheckMessage(body: API.CheckCommitDto, options?: { [key: string]: any }) {
  return request<API.SingleResultDto>('/api/project/checkcommit', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function addCheckMessageNote(body: API.CheckCommitDto, options?: { [key: string]: any }) {
  return request<API.SingleResultDto>('/api/project/addcommitnote', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}