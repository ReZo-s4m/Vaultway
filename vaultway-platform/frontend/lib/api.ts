import axios from 'axios';
import type { ApiResponse } from '@vaultway/shared';

/**
 * Shared axios instance. `withCredentials` lets the browser send the httpOnly
 * refresh cookie. The access token (kept in memory after login) is attached by
 * the request interceptor — auth wiring lands in Phase 2.
 */
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let accessToken: string | null = null;
export function setAccessToken(token: string | null) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Phase 2: on 401, attempt a silent refresh then retry the request.
    return Promise.reject(error);
  },
);

/** Unwraps the standard ApiResponse envelope, throwing on failure. */
export async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const { data } = await promise;
  if (!data.success) throw new Error(data.message ?? 'Request failed');
  return data.data as T;
}
