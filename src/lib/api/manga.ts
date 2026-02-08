// Manga API Service for ShivraHub
// Provider: Komikindo (exclusive per MCP constraints)

import { shivraHub } from "./shivrahub";
import type {
    MangaHomeResponse,
    MangaDetail,
    MangaSearchResult,
    ChapterPages,
    MangaItem,
} from "@/types";

// Komikindo base endpoint
const KOMIKINDO_BASE = "/komikid";

/**
 * Get manga home page data (latest, popular, by type)
 */
export async function getMangaHome(): Promise<MangaHomeResponse> {
    return shivraHub.get<MangaHomeResponse>(`${KOMIKINDO_BASE}/manga`);
}

/**
 * Get manga detail by slug
 */
export async function getMangaDetail(slug: string): Promise<MangaDetail> {
    return shivraHub.get<MangaDetail>(`${KOMIKINDO_BASE}/detail/${slug}`);
}

/**
 * Get chapter list for a manga
 */
export async function getMangaChapters(
    slug: string
): Promise<{ chapters: { title: string; slug: string; date?: string }[] }> {
    return shivraHub.get(`${KOMIKINDO_BASE}/chapters/${slug}`);
}

/**
 * Get chapter pages (images) for reading
 */
export async function getChapterPages(slug: string): Promise<ChapterPages> {
    return shivraHub.get<ChapterPages>(`${KOMIKINDO_BASE}/pages/${slug}`);
}

/**
 * Search manga by query
 */
export async function searchManga(query: string): Promise<MangaSearchResult[]> {
    return shivraHub.get<MangaSearchResult[]>(
        `${KOMIKINDO_BASE}/search/${encodeURIComponent(query)}`
    );
}

/**
 * Get manga by type (manga, manhwa, manhua)
 */
export async function getMangaByType(
    type: "manga" | "manhwa" | "manhua",
    page: number = 1
): Promise<MangaItem[]> {
    return shivraHub.get<MangaItem[]>(`${KOMIKINDO_BASE}/${type}?page=${page}`);
}

/**
 * Get latest manga updates
 */
export async function getLatestManga(page: number = 1): Promise<MangaItem[]> {
    return shivraHub.get<MangaItem[]>(`${KOMIKINDO_BASE}/latest?page=${page}`);
}

/**
 * Get popular manga
 */
export async function getPopularManga(page: number = 1): Promise<MangaItem[]> {
    return shivraHub.get<MangaItem[]>(`${KOMIKINDO_BASE}/popular?page=${page}`);
}

// Manga types for filtering
export const MANGA_TYPES = [
    { name: "Manga", slug: "manga" },
    { name: "Manhwa", slug: "manhwa" },
    { name: "Manhua", slug: "manhua" },
] as const;
