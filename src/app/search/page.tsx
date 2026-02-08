import { api } from "@/services/api";
import { MediaCard } from "@/components/media-card";

interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q } = await searchParams;
    const query = q?.toLowerCase() || "";

    if (!query) {
        return (
            <div className="flex h-[50vh] items-center justify-center text-muted-foreground">
                Type something to search...
            </div>
        )
    }

    let animeResults: any[] = [];
    let mangaResults: any[] = [];

    try {
        const [anime, manga] = await Promise.allSettled([
            api.anime.otakudesu.search(query),
            api.manga.komikindo.search(query)
        ]);

        if (anime.status === 'fulfilled') animeResults = anime.value;
        if (manga.status === 'fulfilled') mangaResults = manga.value;
    } catch (error) {
        // ignore
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Search results for "{query}"</h1>

            {animeResults.length > 0 && (
                <section>
                    <h2 className="mb-4 text-xl font-semibold">Anime</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {animeResults.map((anime) => (
                            <MediaCard
                                key={anime.slug}
                                id={anime.slug}
                                title={anime.title}
                                image={anime.image}
                                rating={anime.rating}
                                type={anime.type || "Anime"}
                                href={`/anime/${anime.slug}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {mangaResults.length > 0 && (
                <section>
                    <h2 className="mb-4 text-xl font-semibold">Manga</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {mangaResults.map((manga) => (
                            <MediaCard
                                key={manga.slug}
                                id={manga.slug}
                                title={manga.title}
                                image={manga.image}
                                rating={manga.rating}
                                type={manga.type || "Manga"}
                                href={`/manga/${manga.slug}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {animeResults.length === 0 && mangaResults.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                    No results found.
                </div>
            )}
        </div>
    )
}
