import { z, ZodError } from "zod";
import { api } from "./axios";
import { HttpMethod, HttpStatusCode } from "./http";
import { AxiosResponse } from "axios";

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

export async function apiFetch<RequestQuery extends object = object, RequestBody = unknown>(
  request: ApiRequest<RequestQuery, RequestBody>,
): Promise<AxiosResponse> {
  const { route, method, queryParams, body, headers } = request;
  return api.request({
    url: route,
    method,
    params: queryParams,
    data: body,
    headers,
  });
}

export type ApiRequest<Query extends object = object, Body = unknown> = {
  route: string;
  method: HttpMethod;
  queryParams?: Query;
  body?: Body;
  headers?: Record<string, string>;
}

export type WithStatusCode<T> = {
  data: T;
  statusCode: number;
  errorCode: number;
}

export class ErrorWithStatusCode extends Error {
  httpStatusCode: number;

  constructor(message: string, httpStatusCode: HttpStatusCode) {
    super(message);
    this.httpStatusCode = httpStatusCode;
  }
}

export const isZodError = (error: unknown): error is ZodError => {
  return error instanceof ZodError;
}

export const isHttpError = (error: unknown): error is ErrorWithStatusCode => {
  return error instanceof ErrorWithStatusCode;
}

export async function apiCall<
  ResponseBodyOutput,
  ResponseBodyInput,
  RequestQuery extends object = object,
  RequestBody = unknown,
  BadRequest = unknown,
>(
  request: ApiRequest<RequestQuery, RequestBody>,
  zodSchema: z.ZodType<ResponseBodyOutput, z.ZodTypeDef, ResponseBodyInput>,
  badRequestSchema?: z.ZodType<BadRequest, z.ZodTypeDef, BadRequest>,
): Promise<ResponseBodyOutput> {
  const response = await apiFetch(request)
  if (response.status === 204) {
    return zodSchema.parse(undefined);
  }
  if (response.status === 400 && badRequestSchema) {
    throw new ErrorWithStatusCode("Bad Request", response.status);
  }

  if (response.status >= 200 && response.status < 300) {
    return zodSchema.parse(response.data);
  }
  
  throw new ErrorWithStatusCode(response.statusText, response.status);
}

