"use client"

import { TRENDING_MANGA } from "@/lib/mock-data";
import { MediaCard } from "@/components/media-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function MangaLibraryPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manga Library</h1>
                    <p className="text-muted-foreground">Read your favorite Manga, Manhwa, and Manhua.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-full md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search library..." className="pl-8" />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="space-y-8">
                <section>
                    <h2 className="mb-4 text-xl font-semibold">Popular Updates</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {TRENDING_MANGA.map((manga) => (
                            <MediaCard
                                key={manga.id}
                                id={manga.id}
                                title={manga.title}
                                image={manga.image}
                                rating={manga.rating}
                                type={manga.type}
                                href={`/manga/${manga.id}`}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold">Most Read</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {/* Reusing for demo */}
                        {[...TRENDING_MANGA].reverse().map((manga) => (
                            <MediaCard
                                key={`rev-${manga.id}`}
                                id={manga.id}
                                title={manga.title}
                                image={manga.image}
                                rating={manga.rating}
                                type={manga.type}
                                href={`/manga/${manga.id}`}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
