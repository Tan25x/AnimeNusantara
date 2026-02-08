// IndexedDB wrapper for watch/read history
// Using IndexedDB for larger storage capacity and better performance

const DB_NAME = "anus_history";
const DB_VERSION = 1;
const ANIME_STORE = "anime_history";
const MANGA_STORE = "manga_history";

export interface AnimeHistoryItem {
    slug: string;
    title: string;
    poster: string;
    episodeSlug: string;
    episodeTitle: string;
    progress: number; // Playback position in seconds
    duration: number; // Total duration in seconds
    provider: string;
    watchedAt: number;
}

export interface MangaHistoryItem {
    slug: string;
    title: string;
    cover: string;
    chapterSlug: string;
    chapterTitle: string;
    page: number; // Current page number
    totalPages: number;
    readAt: number;
}

// Open/create database
function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            reject(new Error("IndexedDB not available"));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Anime history store
            if (!db.objectStoreNames.contains(ANIME_STORE)) {
                const animeStore = db.createObjectStore(ANIME_STORE, {
                    keyPath: "slug",
                });
                animeStore.createIndex("watchedAt", "watchedAt", { unique: false });
            }

            // Manga history store
            if (!db.objectStoreNames.contains(MANGA_STORE)) {
                const mangaStore = db.createObjectStore(MANGA_STORE, {
                    keyPath: "slug",
                });
                mangaStore.createIndex("readAt", "readAt", { unique: false });
            }
        };
    });
}

// ============ ANIME HISTORY ============

export async function getAnimeHistory(
    limit: number = 50
): Promise<AnimeHistoryItem[]> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(ANIME_STORE, "readonly");
            const store = transaction.objectStore(ANIME_STORE);
            const index = store.index("watchedAt");
            const request = index.openCursor(null, "prev"); // Newest first

            const results: AnimeHistoryItem[] = [];
            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor && results.length < limit) {
                    results.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    } catch {
        return [];
    }
}

export async function addAnimeHistory(item: AnimeHistoryItem): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(ANIME_STORE, "readwrite");
            const store = transaction.objectStore(ANIME_STORE);
            const request = store.put({ ...item, watchedAt: Date.now() });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch {
        console.error("Failed to add anime history");
    }
}

export async function removeAnimeHistory(slug: string): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(ANIME_STORE, "readwrite");
            const store = transaction.objectStore(ANIME_STORE);
            const request = store.delete(slug);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch {
        console.error("Failed to remove anime history");
    }
}

export async function clearAnimeHistory(): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(ANIME_STORE, "readwrite");
            const store = transaction.objectStore(ANIME_STORE);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch {
        console.error("Failed to clear anime history");
    }
}

// ============ MANGA HISTORY ============

export async function getMangaHistory(
    limit: number = 50
): Promise<MangaHistoryItem[]> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(MANGA_STORE, "readonly");
            const store = transaction.objectStore(MANGA_STORE);
            const index = store.index("readAt");
            const request = index.openCursor(null, "prev"); // Newest first

            const results: MangaHistoryItem[] = [];
            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor && results.length < limit) {
                    results.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            request.onerror = () => reject(request.error);
        });
    } catch {
        return [];
    }
}

export async function addMangaHistory(item: MangaHistoryItem): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(MANGA_STORE, "readwrite");
            const store = transaction.objectStore(MANGA_STORE);
            const request = store.put({ ...item, readAt: Date.now() });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch {
        console.error("Failed to add manga history");
    }
}

export async function removeMangaHistory(slug: string): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(MANGA_STORE, "readwrite");
            const store = transaction.objectStore(MANGA_STORE);
            const request = store.delete(slug);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch {
        console.error("Failed to remove manga history");
    }
}

export async function clearMangaHistory(): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(MANGA_STORE, "readwrite");
            const store = transaction.objectStore(MANGA_STORE);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch {
        console.error("Failed to clear manga history");
    }
}
