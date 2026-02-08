import { api } from "@/services/api";
import { updateReadHistory } from "@/app/actions"; // We'll implement this too
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { List, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ ch?: string }>;
}

export default async function ReaderPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { ch } = await searchParams;

    // We need manga details for the specific chapter list and title
    let manga;
    try {
        manga = await api.manga.komikindo.detail(id);
    } catch (error) {
        return notFound();
    }

    // Determine current chapter
    const chapters = manga.chapters; // assume ordered?
    let currentChapterSlug = ch;
    if (!currentChapterSlug && chapters.length > 0) {
        currentChapterSlug = chapters[chapters.length - 1].slug; // Usually first in list is latest, so reading order might be reversed. Let's assume user starts from Ch1 which might be last.
    }

    if (!currentChapterSlug) return <div>No chapters found.</div>;

    // Fetch images
    let chapterData;
    try {
        chapterData = await api.manga.komikindo.chapter(currentChapterSlug);
    } catch (error) {
        // handle error
    }

    // Server Action for history
    if (manga && currentChapterSlug) {
        // logic to extract number
        updateReadHistory(id, currentChapterSlug!, 1, manga.title, manga.image);
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Sticky Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/manga/${id}`}>
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-sm font-bold line-clamp-1">{manga.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <List className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="text-foreground">
                            <h3 className="mb-4 font-bold">Chapters</h3>
                            <ScrollArea className="h-[calc(100vh-100px)]">
                                <div className="grid gap-1">
                                    {chapters.map(c => (
                                        <Link
                                            key={c.slug}
                                            href={`/read/${id}?ch=${c.slug}`}
                                            className={cn(
                                                "block rounded px-2 py-2 text-sm hover:bg-accent",
                                                c.slug === currentChapterSlug && "bg-accent text-primary font-medium"
                                            )}
                                        >
                                            {c.title}
                                        </Link>
                                    ))}
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            {/* Reader Content */}
            <main className="pt-14 pb-20">
                <div className="mx-auto min-h-screen max-w-3xl space-y-2">
                    {chapterData ? (
                        chapterData.images.map((imgUrl, idx) => (
                            <img
                                key={idx}
                                src={imgUrl}
                                alt={`Page ${idx + 1}`}
                                className="w-full"
                                loading="lazy"
                            />
                        ))
                    ) : (
                        <div className="py-20 text-center">Failed to load chapter images.</div>
                    )}
                </div>

                {/* Navigation Footer */}
                <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-center gap-4 border-t bg-background/95 backdrop-blur">
                    <span className="text-sm font-medium">Reading: {currentChapterSlug}</span>
                </div>
            </main>
        </div>
    )
}
