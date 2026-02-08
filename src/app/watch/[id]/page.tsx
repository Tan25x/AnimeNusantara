import { api } from "@/services/api";
import { updateWatchHistory } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkipForward, MessageCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ ep?: string }>;
}

export default async function WatchPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { ep } = await searchParams; // This is actually the episode slug now

    // We need to fetch details to get the episode list, giving us context
    let anime;
    try {
        anime = await api.anime.otakudesu.detail(id);
    } catch (error) {
        return notFound();
    }

    // Find current episode slug. If ep param is missing, use the first one from the list (usually list is reverse chronological, so last is first?)
    // Otakudesu episodes list usually comes latest first. So fetching index 0 is latest.
    // We want the *first* episode if starting fresh? Or latest?
    // Let's assume if no param, we pick the LAST item in the array (Episode 1).
    const episodes = [...anime.episodes].reverse(); // Now 1, 2, 3...

    let currentEpisodeSlug = ep;
    if (!currentEpisodeSlug && episodes.length > 0) {
        currentEpisodeSlug = episodes[0].slug;
    }

    if (!currentEpisodeSlug) return <div>No episodes found.</div>;

    let streamData;
    try {
        streamData = await api.anime.otakudesu.episode(currentEpisodeSlug);
    } catch (error) {
        // Handle error gracefully
    }

    // Update History (Server Action) - Fire and forget
    if (anime && streamData) {
        // Extract episode number logic (simplified)
        const epNumMatch = currentEpisodeSlug.match(/episode-(\d+)/);
        const epNum = epNumMatch ? parseInt(epNumMatch[1]) : 1;
        updateWatchHistory(id, epNum, 0, anime.title, anime.image);
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
            {/* Main Content (Player) */}
            <div className="flex-1 flex flex-col min-w-0 bg-background">
                <div className="relative aspect-video w-full bg-black">
                    {streamData ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={streamData.stream_url}
                            title="Video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="border-none"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                            <AlertTriangle className="h-10 w-10 mb-2" />
                            <p>Stream not available.</p>
                        </div>
                    )}
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold line-clamp-1">{anime.title}</h1>
                            <h2 className="text-lg text-muted-foreground">Playing: {currentEpisodeSlug}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar (Episode List) */}
            <div className="w-full border-l lg:w-[350px] flex flex-col bg-background">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Episodes</h3>
                    <span className="text-xs text-muted-foreground">{episodes.length} Total</span>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-2">
                        {episodes.map((episode) => (
                            <Link
                                key={episode.slug}
                                href={`/watch/${id}?ep=${episode.slug}`}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg border p-3 hover:bg-accent transition-colors",
                                    episode.slug === currentEpisodeSlug ? "bg-accent border-primary/50" : "bg-card"
                                )}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className={cn("text-sm font-medium truncate", episode.slug === currentEpisodeSlug && "text-primary")}>
                                        {episode.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">{episode.date}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
