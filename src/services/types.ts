export interface Anime {
    title: string;
    slug: string;
    image: string;
    episode?: string;
    rating?: string;
    status?: string;
    genres?: string[];
    synopsis?: string;
    type?: string;
}

export interface Episode {
    title: string;
    slug: string;
    date?: string;
}

export interface AnimeDetails extends Anime {
    episodes: Episode[];
    releaseDate?: string;
    studio?: string;
    duration?: string;
}

export interface StreamSource {
    url: string;
    quality: string;
    isM3U8: boolean;
}

export interface Manga {
    title: string;
    slug: string;
    image: string;
    chapter?: string;
    rating?: string;
    type?: string;
}

export interface Chapter {
    title: string;
    slug: string;
    date?: string;
}

export interface MangaDetails extends Manga {
    chapters: Chapter[];
    author?: string;
    status?: string;
    synopsis?: string;
}

export interface ChapterImages {
    images: string[];
}
