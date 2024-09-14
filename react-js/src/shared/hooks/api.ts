export const apiRequest = async <Response = unknown>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',  // Add support for multiple HTTP methods
    queryParams?: Record<string, any>,           // Optional query params for GET requests
    body?: any,                                  // Body data for POST/PUT requests
  } = {},
  baseUrl: string = import.meta.env.MODE ? '' : "http://192.168.1.212:5000"  // Use environment variable or default
): Promise<Response> => {
  console.log('API Request: ', { url, options });

  // Function to build query string from queryParams
  const buildQueryString = (params: Record<string, any>) => {
    const query = Object.entries(params || {})
      .filter(([, value]) => value !== undefined && value !== null)  // Only include defined params
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return query ? `?${query}` : '';
  };

  const { method = 'GET', queryParams, body } = options;

  // Construct full URL with query parameters (only for GET requests)
  const fullUrl = `${baseUrl}${url}${method === 'GET' ? buildQueryString(queryParams || {}) : ''}`;

  // Fetch options, including method and body for POST/PUT requests
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',  // Set default headers
    },
    ...(body ? { body: JSON.stringify(body) } : {}),  // Include body only for non-GET requests
  };

  try {
    const response = await fetch(fullUrl, fetchOptions);

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Automatically parse JSON
    const data = await response.json() as Response;

    return data;  // Type-safe return
  } catch (error) {
    console.error('API Request Failed: ', error);
    throw error;
  }
};
