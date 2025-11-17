import { request } from './httpClient';
import { PaginatedUsersResponse } from '../types/paginatedUsers';

export async function fetchUsers(
  page: number,
  perPage: number,
  delay: number = 5
): Promise<PaginatedUsersResponse> {
  return request<PaginatedUsersResponse>(
    `/users?page=${page}&perPage=${perPage}&delay=${delay}`
  );
}

