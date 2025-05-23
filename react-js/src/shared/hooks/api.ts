import { z } from "zod";
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

export const apiRequestWithValidation = <T extends z.ZodType>(
  schema: T,
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    queryParams?: Record<string, any>,
    body?: any,
    headers?: Record<string, string>,
  } = {}
) => {
  return apiRequest<z.infer<T>>(url, options).then((response) => {
    try {
      return schema.parse(response);
    } catch (error) {
      console.error('Validation error:', error);
      throw error;
    }
  });
};