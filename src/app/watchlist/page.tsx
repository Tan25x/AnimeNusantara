import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MediaCard } from "@/components/media-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

export default async function WatchlistPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/api/auth/signin");

    const watchlist = await prisma.watchlist.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' }
    });

    const watching = watchlist.filter(i => i.status === "WATCHING" || i.status === "PLAN_TO_WATCH"); // Simplified for demo
    const completed = watchlist.filter(i => i.status === "COMPLETED");

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">My List</h1>

            <Tabs defaultValue="watching" className="w-full">
                <TabsList>
                    <TabsTrigger value="watching">Watching / Plan</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="watching" className="mt-6">
                    {watching.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {watching.map((item) => (
                                <MediaCard
                                    key={item.animeId}
                                    id={item.animeId}
                                    title={item.title || "Anime"}
                                    image={item.image || ""}
                                    href={`/anime/${item.animeId}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">Empty list.</div>
                    )}
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                    <div className="text-center text-muted-foreground py-12">
                        {completed.length > 0 ? "Completed items..." : "No completed anime yet."}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
