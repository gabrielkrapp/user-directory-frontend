const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export async function request<T>(
  endpoint: string,
  config?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...config?.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch { /* empty */ }

      throw new HttpError(errorMessage, response.status, response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    
    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}

