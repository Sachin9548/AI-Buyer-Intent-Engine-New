// frontend-new/src/lib/api.ts

const API_BASE = "https://api.claarvia.com/api";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("claarvia_token")
      : null;

  // Slash ensure karein taaki URL kabhi break na ho
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  // 401: Unauthorized / Token Expired
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("claarvia_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    throw new Error("Session expired. Please log in again.");
  }

  // Handle Backend Errors
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`,
    );
  }

  // Handle 204 No Content gracefully
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
