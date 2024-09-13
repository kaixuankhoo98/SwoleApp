export const apiRequest = async <Response = unknown>(
  url: string,
  params: RequestInit = {},  // RequestInit is the type used by fetch for params like method, headers, etc.
  baseUrl: string = import.meta.env.MODE ? '' : "http://192.168.1.212:5000"  // Use environment variable or default
): Promise<Response> => {
  console.log('API Request: ', { url, params });

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...params,
    });

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