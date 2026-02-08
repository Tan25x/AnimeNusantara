import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from 'next/link';

export default async function HistoryPage() {
    const session = await auth();
    if (!session?.user?.id) return <div className="p-8 text-center">Please login to view history.</div>;

    const animeHistory = await prisma.watchHistory.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
        take: 20
    });

    const mangaHistory = await prisma.readHistory.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
        take: 20
    });

    return (
        <div className="space-y-8">
            {/* Anime History */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Anime History</h2>
                </div>
                {animeHistory.length > 0 ? (
                    animeHistory.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50">
                            <div className="h-24 w-16 shrink-0 overflow-hidden rounded bg-muted">
                                {item.image && <img src={item.image} alt={item.title || ""} className="h-full w-full object-cover" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">Episode {item.episodeNumber}</p>
                                <div className="mt-2 h-2 w-full max-w-[200px] rounded-full bg-secondary">
                                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="secondary" asChild>
                                    <Link href={`/watch/${item.animeId}?ep=${item.episodeNumber}`}>Resume</Link>
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-muted-foreground">No watch history.</div>
                )}
            </div>

            {/* Manga History */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Manga History</h2>
                </div>
                {mangaHistory.length > 0 ? (
                    mangaHistory.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50">
                            <div className="h-24 w-16 shrink-0 overflow-hidden rounded bg-muted">
                                {item.image && <img src={item.image} alt={item.title || ""} className="h-full w-full object-cover" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">Chapter {item.chapterNumber}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="secondary" asChild>
                                    <Link href={`/read/${item.mangaId}?ch=${item.chapterId}`}>Resume</Link>
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-muted-foreground">No read history.</div>
                )}
            </div>
        </div>
    )
}
