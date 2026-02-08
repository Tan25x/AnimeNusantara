import { api } from "@/services/api";
import { addToLibrary } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Calendar, Layers, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Client Component for Library Button
import { LibraryButton } from "@/components/library-button";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MangaDetailsPage({ params }: PageProps) {
    const { id } = await params;

    let manga;
    try {
        manga = await api.manga.komikindo.detail(id);
    } catch (error) {
        return notFound();
    }

    if (!manga) return notFound();

    return (
        <div className="relative min-h-screen">
            {/* Background Hero */}
            <div className="absolute inset-0 h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${manga.image}')`,
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
                                src={manga.image}
                                alt={manga.title}
                                className="h-auto w-[250px] object-cover md:w-[300px]"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6 pt-4">
                        <h1 className="text-4xl font-bold tracking-tight text-white">{manga.title}</h1>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{manga.status || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Layers className="h-4 w-4" />
                                <span>{manga.chapters.length} Chapters</span>
                            </div>
                            {manga.type && (
                                <div className="rounded border px-2 py-0.5 text-xs font-semibold uppercase">
                                    {manga.type}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" className="w-full md:w-auto" asChild>
                                <Link href={`/read/${id}?ch=${manga.chapters[0]?.slug}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Start Reading
                                </Link>
                            </Button>
                            <LibraryButton mangaId={manga.slug} title={manga.title} image={manga.image} />
                        </div>

                        <div className="max-w-3xl space-y-2">
                            <h3 className="font-semibold text-foreground">Synopsis</h3>
                            <p className="leading-relaxed text-muted-foreground">
                                {manga.synopsis || "No synopsis available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chapters Section */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold">Chapters</h2>
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {manga.chapters.map((ch) => (
                                <Link
                                    key={ch.slug}
                                    href={`/read/${id}?ch=${ch.slug}`}
                                    className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50 group"
                                >
                                    <span className="font-medium group-hover:text-primary">
                                        {ch.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {ch.date}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
