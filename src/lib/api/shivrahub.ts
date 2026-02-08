// ShivraHub API Base Client

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://shivraapi.my.id";

interface FetchOptions extends RequestInit {
    timeout?: number;
}

class ShivraHubClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { timeout = 10000, ...fetchOptions } = options;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...fetchOptions,
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    ...fetchOptions.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data as T;
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "AbortError") {
                    throw new Error("Request timed out");
                }
                throw error;
            }
            throw new Error("An unknown error occurred");
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // GET request helper
    async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
        return this.fetch<T>(endpoint, { ...options, method: "GET" });
    }
}

// Singleton instance
export const shivraHub = new ShivraHubClient();

// Export for custom instances if needed
export { ShivraHubClient, API_BASE_URL };
