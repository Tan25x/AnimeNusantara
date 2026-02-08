import { Anime, AnimeDetails, StreamSource, Manga, MangaDetails, ChapterImages } from "./types";

const BASE_URL = "https://shivraapi.my.id";

interface APIResponseList<T> {
    meta: {
        status: boolean;
        code: number;
        message: string;
        creator: string;
        source: string;
        timestamp: string;
    };
    data: {
        list: T[];
    };
}

interface APIResponseSingle<T> {
    meta: {
        status: boolean;
        code: number;
        message: string;
        creator: string;
        source: string;
        timestamp: string;
    };
    data: T;
}

async function fetchAPIList<T>(endpoint: string, cacheTime: number = 3600): Promise<T[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            next: { revalidate: cacheTime },
            headers: {
                'User-Agent': 'AdzeStream/1.0'
            },
            signal: controller.signal
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const json: APIResponseList<T> = await res.json();
        return json.data.list;
    } finally {
        clearTimeout(timeoutId);
    }
}

async function fetchAPISingle<T>(endpoint: string, cacheTime: number = 3600): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            next: { revalidate: cacheTime },
            headers: {
                'User-Agent': 'AdzeStream/1.0'
            },
            signal: controller.signal
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const json: APIResponseSingle<T> = await res.json();
        return json.data;
    } finally {
        clearTimeout(timeoutId);
    }
}

function mapAnimeFields(item: any): Anime {
    return {
        title: item.title,
        slug: item.slug,
        image: item.cover || item.image,
        episode: item.episode,
        type: item.type,
        rating: item.rating,
        status: item.status,
        genres: item.genres,
        synopsis: item.synopsis
    };
}

function mapMangaFields(item: any): Manga {
    return {
        title: item.title,
        slug: item.slug,
        image: item.cover || item.image,
        chapter: item.chapter,
        type: item.type,
        rating: item.rating
    };
}

function mapAnimeDetails(item: any): AnimeDetails {
    return {
        title: item.title,
        slug: item.slug,
        image: item.cover || item.image,
        episode: item.episode,
        type: item.tipe,
        status: item.status,
        synopsis: item.synopsis,
        genres: item.genre?.map((g: any) => g.name) || [],
        releaseDate: item.tanggal_rilis,
        duration: item.durasi,
        studio: item.studio,
        episodes: item.episode_list?.map((ep: any) => ({
            title: ep.title,
            slug: ep.slug,
            date: ep.date
        })) || []
    };
}

export const api = {
    anime: {
        otakudesu: {
            ongoing: async () => {
                const data = await fetchAPIList<any>("/otd/ongoing");
                return data.map(mapAnimeFields);
            },
            search: async (query: string) => {
                const data = await fetchAPIList<any>(`/otd/search?q=${encodeURIComponent(query)}`);
                return data.map(mapAnimeFields);
            },
            detail: async (slug: string) => {
                const data = await fetchAPISingle<any>(`/otd/anime/${slug}`);
                return mapAnimeDetails(data);
            },
            episode: (slug: string) => fetchAPISingle<{ stream_url: string; qualities: StreamSource[] }>(`/otd/episode/${slug}`),
        },
        animeindo: {
            home: async () => {
                const data = await fetchAPIList<any>("/anm/home");
                return data.map(mapAnimeFields);
            },
            search: async (query: string) => {
                const data = await fetchAPIList<any>(`/anm/search?q=${encodeURIComponent(query)}`);
                return data.map(mapAnimeFields);
            },
            detail: (slug: string) => fetchAPISingle<AnimeDetails>(`/anm/anime/${slug}`),
        }
    },
    manga: {
        komikindo: {
            latest: async () => {
                const data = await fetchAPIList<any>("/komikid/manga/page/1");
                return data.map(mapMangaFields);
            },
            search: async (query: string) => {
                const data = await fetchAPIList<any>(`/komikid/search?q=${encodeURIComponent(query)}`);
                return data.map(mapMangaFields);
            },
            detail: (slug: string) => fetchAPISingle<MangaDetails>(`/komikid/manga/${slug}`),
            chapter: (slug: string) => fetchAPISingle<ChapterImages>(`/komikid/chapter/${slug}`),
        }
    }
};
