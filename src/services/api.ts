import { Anime, AnimeDetails, StreamSource, Manga, MangaDetails, ChapterImages } from "./types";

const BASE_URL = "https://shivraapi.my.id";

async function fetchAPI<T>(endpoint: string, cacheTime: number = 3600): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        next: { revalidate: cacheTime },
        headers: {
            'User-Agent': 'AdzeStream/1.0'
        }
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export const api = {
    anime: {
        otakudesu: {
            ongoing: () => fetchAPI<Anime[]>("/otd/ongoing"),
            search: (query: string) => fetchAPI<Anime[]>(`/otd/search?q=${encodeURIComponent(query)}`),
            detail: (slug: string) => fetchAPI<AnimeDetails>(`/otd/anime/${slug}`),
            episode: (slug: string) => fetchAPI<{ stream_url: string; qualities: StreamSource[] }>(`/otd/episode/${slug}`),
        },
        animeindo: {
            home: () => fetchAPI<Anime[]>("/anm/home"),
            search: (query: string) => fetchAPI<Anime[]>(`/anm/search?q=${encodeURIComponent(query)}`),
            detail: (slug: string) => fetchAPI<AnimeDetails>(`/anm/anime/${slug}`),
        }
    },
    manga: {
        komikindo: {
            latest: () => fetchAPI<Manga[]>("/komikid/manga/page/1"),
            search: (query: string) => fetchAPI<Manga[]>(`/komikid/search?q=${encodeURIComponent(query)}`),
            detail: (slug: string) => fetchAPI<MangaDetails>(`/komikid/manga/${slug}`),
            chapter: (slug: string) => fetchAPI<ChapterImages>(`/komikid/chapter/${slug}`),
        }
    }
};
