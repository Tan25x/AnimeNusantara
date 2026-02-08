// localStorage wrapper for favorites (anime & manga)

import type { AnimeItem, MangaItem } from "@/types";

const ANIME_FAVORITES_KEY = "anus_anime_favorites";
const MANGA_FAVORITES_KEY = "anus_manga_favorites";

// ============ ANIME FAVORITES ============

export interface AnimeFavorite extends AnimeItem {
    addedAt: number;
}

export function getAnimeFavorites(): AnimeFavorite[] {
    if (typeof window === "undefined") return [];
    try {
        const data = localStorage.getItem(ANIME_FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function addAnimeFavorite(anime: AnimeItem): void {
    const favorites = getAnimeFavorites();
    const exists = favorites.some((f) => f.slug === anime.slug);
    if (!exists) {
        favorites.unshift({ ...anime, addedAt: Date.now() });
        localStorage.setItem(ANIME_FAVORITES_KEY, JSON.stringify(favorites));
    }
}

export function removeAnimeFavorite(slug: string): void {
    const favorites = getAnimeFavorites().filter((f) => f.slug !== slug);
    localStorage.setItem(ANIME_FAVORITES_KEY, JSON.stringify(favorites));
}

export function isAnimeFavorite(slug: string): boolean {
    return getAnimeFavorites().some((f) => f.slug === slug);
}

// ============ MANGA FAVORITES (Library) ============

export interface MangaFavorite extends MangaItem {
    addedAt: number;
    lastReadChapter?: string;
}

export function getMangaLibrary(): MangaFavorite[] {
    if (typeof window === "undefined") return [];
    try {
        const data = localStorage.getItem(MANGA_FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function addToMangaLibrary(manga: MangaItem): void {
    const library = getMangaLibrary();
    const exists = library.some((m) => m.slug === manga.slug);
    if (!exists) {
        library.unshift({ ...manga, addedAt: Date.now() });
        localStorage.setItem(MANGA_FAVORITES_KEY, JSON.stringify(library));
    }
}

export function removeFromMangaLibrary(slug: string): void {
    const library = getMangaLibrary().filter((m) => m.slug !== slug);
    localStorage.setItem(MANGA_FAVORITES_KEY, JSON.stringify(library));
}

export function isInMangaLibrary(slug: string): boolean {
    return getMangaLibrary().some((m) => m.slug === slug);
}

export function updateMangaProgress(
    slug: string,
    lastReadChapter: string
): void {
    const library = getMangaLibrary().map((m) =>
        m.slug === slug ? { ...m, lastReadChapter } : m
    );
    localStorage.setItem(MANGA_FAVORITES_KEY, JSON.stringify(library));
}
