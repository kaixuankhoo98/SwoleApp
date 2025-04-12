import { api } from "./axios";

export const apiRequest = async <Response = unknown>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    queryParams?: Record<string, any>,
    body?: any,
    headers?: Record<string, string>,
  } = {}
): Promise<Response> => {
  const { method = 'GET', queryParams, body, headers } = options;

  try {
    const response = await api.request<Response>({
      url,
      method,
      params: queryParams,
      data: body,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};