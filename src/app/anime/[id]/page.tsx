import { api } from "@/services/api";
import { addToWatchlist } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Calendar, Clock, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Server Action Wrapper for Button
import { WatchlistButton } from "@/components/watchlist-button";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AnimeDetailsPage({ params }: PageProps) {
    const { id } = await params;

    let anime;
    try {
        anime = await api.anime.otakudesu.detail(id);
    } catch (error) {
        return notFound();
    }

    if (!anime) return notFound();

    return (
        <div className="relative min-h-screen">
            {/* Background Hero */}
            <div className="absolute inset-0 h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${anime.image}')`,
                        filter: 'blur(10px) brightness(0.3)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
            </div>

            <div className="relative container mx-auto px-4 py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <div className="overflow-hidden rounded-lg border shadow-2xl">
                            <img
                                src={anime.image}
                                alt={anime.title}
                                className="h-auto w-[250px] object-cover md:w-[300px]"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6 pt-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white">{anime.title}</h1>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{anime.releaseDate || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{anime.duration || "Unknown"}</span>
                            </div>
                            {anime.type && (
                                <div className="rounded border px-2 py-0.5 text-xs font-semibold uppercase">
                                    {anime.type}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" className="w-full md:w-auto" asChild>
                                <Link href={`/watch/${id}?ep=1`}>
                                    <Play className="mr-2 h-4 w-4 fill-current" />
                                    Start Watching
                                </Link>
                            </Button>
                            <WatchlistButton animeId={anime.slug} title={anime.title} image={anime.image} />
                        </div>

                        <div className="max-w-3xl space-y-2">
                            <h3 className="font-semibold text-foreground">Synopsis</h3>
                            <p className="leading-relaxed text-muted-foreground">
                                {anime.synopsis || "No synopsis available."}
                            </p>
                        </div>

                        {/* Genres */}
                        {anime.genres && (
                            <div className="flex flex-wrap gap-2">
                                {anime.genres.map(genre => (
                                    <span key={genre} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Episodes Section */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold">Episodes</h2>
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            {anime.episodes.map((ep) => {
                                // Extract number from slug if possible, simple heuristic
                                const epNumMatch = ep.slug.match(/episode-(\d+)/);
                                const epNum = epNumMatch ? epNumMatch[1] : ep.title;
                                return (
                                    <Link
                                        key={ep.slug}
                                        href={`/watch/${id}?ep=${epNumMatch ? epNumMatch[1] : 1}`} // We need logic to map episode slug to streaming source
                                        className="group flex flex-col gap-2 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50 text-center"
                                    >
                                        <span className="font-semibold group-hover:text-primary truncate">
                                            {ep.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{ep.date}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
