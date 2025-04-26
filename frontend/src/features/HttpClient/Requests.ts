type FetchConfig = {
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
  data?: any;
};

export async function fetchData(endpoint: string, config?: FetchConfig): Promise<any> {
  const { method = 'GET', data } = config || {}; // Default to 'GET' if no method is provided

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(endpoint, options);
    return await response.json();
  } catch (e) {
    console.error('Fetch error:', e);
    throw e;
  }
}
