// TypeScript interfaces for ShivraHub API responses

// ============ ANIME TYPES ============

export interface AnimeItem {
    title: string;
    slug: string;
    poster: string;
    episode?: string;
    rating?: string;
    status?: string;
    type?: string;
}

export interface AnimeHomeResponse {
    ongoing: AnimeItem[];
    completed: AnimeItem[];
    popular?: AnimeItem[];
}

export interface AnimeDetail {
    title: string;
    alternativeTitle?: string;
    poster: string;
    synopsis: string;
    status: string;
    studio?: string;
    released?: string;
    duration?: string;
    season?: string;
    type?: string;
    rating?: string;
    genres: string[];
    episodes: EpisodeItem[];
}

export interface EpisodeItem {
    title: string;
    slug: string;
    date?: string;
}

export interface StreamingServer {
    name: string;
    slug: string;
}

export interface EpisodeDetail {
    title: string;
    servers: StreamingServer[];
    streamUrl?: string;
    prevEpisode?: string;
    nextEpisode?: string;
}

export interface AnimeSearchResult {
    title: string;
    slug: string;
    poster: string;
    status?: string;
    rating?: string;
}

// ============ MANGA TYPES ============

export interface MangaItem {
    title: string;
    slug: string;
    cover: string;
    type?: "manga" | "manhwa" | "manhua";
    chapter?: string;
    rating?: string;
}

export interface MangaHomeResponse {
    latest: MangaItem[];
    popular: MangaItem[];
    manhwa?: MangaItem[];
    manhua?: MangaItem[];
}

export interface MangaDetail {
    title: string;
    alternativeTitle?: string;
    cover: string;
    synopsis: string;
    status: string;
    author?: string;
    artist?: string;
    type: "manga" | "manhwa" | "manhua";
    genres: string[];
    chapters: ChapterItem[];
}

export interface ChapterItem {
    title: string;
    slug: string;
    date?: string;
}

export interface ChapterPages {
    title: string;
    pages: string[];
    prevChapter?: string;
    nextChapter?: string;
}

export interface MangaSearchResult {
    title: string;
    slug: string;
    cover: string;
    type?: string;
    status?: string;
}

// ============ COMMON TYPES ============

export interface APIError {
    message: string;
    status: number;
}

export type AnimeProvider =
    | "otakudesu"
    | "kuramanime"
    | "winbu"
    | "nimegami"
    | "animeindo";

export type MangaProvider = "komikindo";

export interface ProviderConfig {
    name: string;
    slug: AnimeProvider | MangaProvider;
    baseEndpoint: string;
}
