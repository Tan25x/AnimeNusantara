// Anime API Service for ShivraHub
// Supports: otakudesu (otd), donghua (dnh)
// Based on actual ShivraHub API documentation

import { shivraHub } from "./shivrahub";
import type {
    AnimeProvider,
    AnimeHomeResponse,
    AnimeDetail,
    AnimeSearchResult,
    EpisodeDetail,
    AnimeItem,
} from "@/types";

// Provider endpoint mappings (correct paths from ShivraHub API)
const PROVIDER_ENDPOINTS: Record<AnimeProvider, string> = {
    otakudesu: "/otd",
    kuramanime: "/kura", // placeholder - verify actual endpoint
    winbu: "/winbu", // placeholder - verify actual endpoint
    nimegami: "/nimegami", // placeholder - verify actual endpoint
    animeindo: "/anindo", // placeholder - verify actual endpoint
};

// Default provider
const DEFAULT_PROVIDER: AnimeProvider = "otakudesu";

/**
 * Get ongoing anime list
 */
export async function getOngoingAnime(
    provider: AnimeProvider = DEFAULT_PROVIDER,
    page: number = 1
): Promise<{ data: AnimeItem[]; pagination: { hasNext: boolean } }> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/ongoing?page=${page}`;
    return shivraHub.get(endpoint);
}

/**
 * Get completed anime list
 */
export async function getCompletedAnime(
    provider: AnimeProvider = DEFAULT_PROVIDER,
    page: number = 1
): Promise<{ data: AnimeItem[]; pagination: { hasNext: boolean } }> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/completed?page=${page}`;
    return shivraHub.get(endpoint);
}

/**
 * Get anime detail by slug
 */
export async function getAnimeDetail(
    slug: string,
    provider: AnimeProvider = DEFAULT_PROVIDER
): Promise<AnimeDetail> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/anime/${slug}`;
    return shivraHub.get<AnimeDetail>(endpoint);
}

/**
 * Get episode streaming data
 */
export async function getEpisode(
    slug: string,
    provider: AnimeProvider = DEFAULT_PROVIDER
): Promise<EpisodeDetail> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/episode/${slug}`;
    return shivraHub.get<EpisodeDetail>(endpoint);
}

/**
 * Get batch download links
 */
export async function getBatch(
    slug: string,
    provider: AnimeProvider = DEFAULT_PROVIDER
): Promise<unknown> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/batch/${slug}`;
    return shivraHub.get(endpoint);
}

/**
 * Search anime by query
 */
export async function searchAnime(
    query: string,
    provider: AnimeProvider = DEFAULT_PROVIDER
): Promise<AnimeSearchResult[]> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/search?q=${encodeURIComponent(query)}`;
    return shivraHub.get<AnimeSearchResult[]>(endpoint);
}

/**
 * Get anime schedule
 */
export async function getSchedule(
    provider: AnimeProvider = DEFAULT_PROVIDER,
    day?: string
): Promise<unknown> {
    const endpoint = day
        ? `${PROVIDER_ENDPOINTS[provider]}/schedule?day=${day}`
        : `${PROVIDER_ENDPOINTS[provider]}/schedule`;
    return shivraHub.get(endpoint);
}

/**
 * Get all genres
 */
export async function getGenres(
    provider: AnimeProvider = DEFAULT_PROVIDER
): Promise<{ slug: string; name: string }[]> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/genres`;
    return shivraHub.get(endpoint);
}

/**
 * Get anime by genre
 */
export async function getAnimeByGenre(
    genreSlug: string,
    provider: AnimeProvider = DEFAULT_PROVIDER,
    page: number = 1
): Promise<{ data: AnimeItem[]; pagination: { hasNext: boolean } }> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/genres/${genreSlug}?page=${page}`;
    return shivraHub.get(endpoint);
}

/**
 * Get anime list A-Z
 */
export async function getAnimeList(
    provider: AnimeProvider = DEFAULT_PROVIDER
): Promise<AnimeItem[]> {
    const endpoint = `${PROVIDER_ENDPOINTS[provider]}/list`;
    return shivraHub.get<AnimeItem[]>(endpoint);
}

// Export provider list for UI
export const ANIME_PROVIDERS: { name: string; slug: AnimeProvider }[] = [
    { name: "Otakudesu", slug: "otakudesu" },
    { name: "Kuramanime", slug: "kuramanime" },
    { name: "Winbu", slug: "winbu" },
    { name: "Nimegami", slug: "nimegami" },
    { name: "AnimeIndo", slug: "animeindo" },
];

export { DEFAULT_PROVIDER };
