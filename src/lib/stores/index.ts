// Zustand store for app state
import { create } from "zustand";
import type { AnimeProvider } from "@/types";

interface AppState {
    // Anime provider selection
    animeProvider: AnimeProvider;
    setAnimeProvider: (provider: AnimeProvider) => void;

    // Sidebar state
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;

    // Current view/section
    currentSection: "anime" | "manga";
    setCurrentSection: (section: "anime" | "manga") => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Default provider
    animeProvider: "otakudesu",
    setAnimeProvider: (provider) => set({ animeProvider: provider }),

    // Sidebar starts open on desktop
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    // Default to anime section
    currentSection: "anime",
    setCurrentSection: (section) => set({ currentSection: section }),
}));
