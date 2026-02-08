import { api } from "@/services/api";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MediaCard } from "@/components/media-card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";
import { Anime } from "@/services/types";

export default async function Home() {
  const session = await auth();

  let ongoingAnime: Anime[] = [];
  let latestManga: any[] = [];
  let history: any[] = [];
  let error = null;

  try {
    const results = await Promise.allSettled([
      api.anime.otakudesu.ongoing(),
      api.manga.komikindo.latest(),
      session?.user?.id ? prisma.watchHistory.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' },
        take: 4,
      }) : Promise.resolve([])
    ]);

    if (results[0].status === 'fulfilled') ongoingAnime = results[0].value;
    if (results[1].status === 'fulfilled') latestManga = results[1].value;
    if (results[2].status === 'fulfilled') history = results[2].value;

  } catch (e) {
    console.error("Home page data fetch error", e);
    error = "Failed to load some data";
  }

  const featured = ongoingAnime[0];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {featured && (
        <section className="relative -mx-6 -mt-6 h-[50vh] min-h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${featured.image}')`,
              filter: 'blur(2px) brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

          <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
            <div className="max-w-2xl space-y-4">
              <span className="inline-block rounded-md bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                New Episode
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                {featured.title}
              </h1>
              <p className="line-clamp-2 text-lg text-gray-200">
                {featured.episode} • {featured.type || "Anime"}
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="font-semibold" asChild>
                  <Link href={`/anime/${featured.slug}`}>
                    <Play className="mr-2 h-4 w-4 fill-current" /> Play Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Continue Watching Section */}
      {history.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Continue Watching</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {history.map((item) => (
              <Link key={item.id} href={`/watch/${item.animeId}?ep=${item.episodeNumber}`} className="group relative overflow-hidden rounded-lg border bg-card p-3 shadow-sm transition-colors hover:bg-secondary/50">
                <div className="flex gap-4">
                  {item.image && <img src={item.image} alt={item.title || "Anime"} className="h-20 w-14 rounded object-cover" />}
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h4 className="font-medium line-clamp-1 group-hover:text-primary">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">Episode {item.episodeNumber}</p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ongoing Anime Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ongoing Anime</h2>
          <Button variant="ghost" className="text-sm text-primary">See All</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {ongoingAnime.map((anime) => (
            <MediaCard
              key={anime.slug}
              id={anime.slug}
              title={anime.title}
              image={anime.image}
              rating={undefined}
              type={anime.type || "Anime"}
              href={`/anime/${anime.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Latest Manga Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest Manga</h2>
          <Button variant="ghost" className="text-sm text-primary" asChild>
            <Link href="/manga">See All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {latestManga.slice(0, 10).map((manga) => (
            <MediaCard
              key={manga.slug}
              id={manga.slug}
              title={manga.title}
              image={manga.image}
              type={manga.type || "Manga"}
              href={`/manga/${manga.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
