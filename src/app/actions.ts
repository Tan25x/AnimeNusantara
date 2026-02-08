"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// --- Watchlist Actions ---

export async function addToWatchlist(animeId: string, title: string, image: string, status: ContentStatus = "PLAN_TO_WATCH") {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.watchlist.upsert({
            where: {
                userId_animeId: {
                    userId: session.user.id,
                    animeId,
                },
            },
            update: { status, title, image },
            create: {
                userId: session.user.id,
                animeId,
                status,
                title,
                image,
            },
        });
        revalidatePath("/watchlist");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update watchlist" };
    }
}

export async function removeFromWatchlist(animeId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.watchlist.delete({
            where: {
                userId_animeId: {
                    userId: session.user.id,
                    animeId,
                },
            },
        });
        revalidatePath("/watchlist");
        return { success: true };
    } catch (error) {
        return { error: "Failed to remove from watchlist" };
    }
}

// --- History Actions (Anime) ---

export async function updateWatchHistory(animeId: string, episode: number, progress: number, title: string, image: string) {
    const session = await auth();
    if (!session?.user?.id) return; // Silent fail for guests or handle client side storage

    try {
        await prisma.watchHistory.upsert({
            where: {
                userId_animeId: {
                    userId: session.user.id,
                    animeId,
                },
            },
            update: { episodeNumber: episode, progress, title, image },
            create: {
                userId: session.user.id,
                animeId,
                episodeNumber: episode,
                progress,
                title,
                image,
            },
        });
        revalidatePath("/history");
        revalidatePath("/"); // Update continue watching on home
    } catch (error) {
        console.error("Failed to update history", error);
    }
}

// --- Library Actions (Manga) ---

export async function addToLibrary(mangaId: string, title: string, image: string, status: ContentStatus = "PLAN_TO_READ") {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.savedLibrary.upsert({
            where: {
                userId_mangaId: {
                    userId: session.user.id,
                    mangaId,
                },
            },
            update: { status, title, image },
            create: {
                userId: session.user.id,
                mangaId,
                status,
                title,
                image,
            },
        });
        revalidatePath("/saved");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update library" };
    }
}

// --- Read History (Manga) ---

export async function updateReadHistory(mangaId: string, chapterId: string, chapterNumber: number, title: string, image: string) {
    const session = await auth();
    if (!session?.user?.id) return;

    try {
        await prisma.readHistory.upsert({
            where: {
                userId_mangaId: {
                    userId: session.user.id,
                    mangaId,
                },
            },
            update: { chapterId, chapterNumber, title, image },
            create: {
                userId: session.user.id,
                mangaId,
                chapterId,
                chapterNumber,
                title,
                image,
            },
        });
        revalidatePath("/history");
        revalidatePath("/manga");
    } catch (error) {
        console.error("Failed to update read history", error);
    }
}
