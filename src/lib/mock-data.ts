export const TRENDING_ANIME = [
    {
        id: "1",
        title: "Solo Leveling",
        image: "https://media.kitsu.io/anime/43521/poster_image/small-8a3fb765961d2d09bd71101918379c93.jpeg",
        rating: 9.8,
        type: "TV",
        episodes: 12,
    },
    {
        id: "2",
        title: "Demon Slayer: Kimetsu no Yaiba",
        image: "https://media.kitsu.io/anime/43542/poster_image/small-2e22c073357591605ec6c41b8a5a4153.jpeg",
        rating: 9.5,
        type: "TV",
        episodes: 24,
    },
    {
        id: "3",
        title: "Jujutsu Kaisen",
        image: "https://media.kitsu.io/anime/43389/poster_image/small-0b65319888916d84004944415891369f.jpeg",
        rating: 9.2,
        type: "TV",
        episodes: 24,
    },
    {
        id: "4",
        title: "One Piece",
        image: "https://media.kitsu.io/anime/12/poster_image/small-7b5f543666d62a046554b73373507d3c.jpeg",
        rating: 9.0,
        type: "TV",
        episodes: 1000,
    }
];

export const CONTINUE_WATCHING = [
    {
        id: "1",
        title: "Solo Leveling",
        image: "https://media.kitsu.io/anime/43521/poster_image/small-8a3fb765961d2d09bd71101918379c93.jpeg",
        episode: 5,
        progress: 75, // percentage
    },
];

export const MOCK_EPISODES = Array.from({ length: 12 }, (_, i) => ({
    id: `ep-${i + 1}`,
    number: i + 1,
    title: `Episode ${i + 1}`,
    image: "https://media.kitsu.io/anime/43521/poster_image/small-8a3fb765961d2d09bd71101918379c93.jpeg",
    duration: "24m",
    synopsis: "Jinwoo faces the challenges of the dungeon with his newfound powers."
}));

export const TRENDING_MANGA = [
    {
        id: "m-1",
        title: "Solo Leveling",
        image: "https://media.kitsu.io/manga/40439/poster_image/small-c873ad82782b79a815a51351d3845945.jpeg",
        rating: 9.8,
        type: "Manhwa",
        chapters: 200,
    },
    {
        id: "m-2",
        title: "One Piece",
        image: "https://media.kitsu.io/manga/13931/poster_image/small-7e79df30dc003050949d068e16279f67.jpeg",
        rating: 9.9,
        type: "Manga",
        chapters: 1100,
    },
    {
        id: "m-3",
        title: "Berserk",
        image: "https://media.kitsu.io/manga/1410/poster_image/small-dc24581df2d159a2245c38ac396febe8.jpeg",
        rating: 9.6,
        type: "Manga",
        chapters: 370,
    },
    {
        id: "m-4",
        title: "Omniscient Reader",
        image: "https://media.kitsu.io/manga/56885/poster_image/small-a0841262dce245b7bad924c5521976a1.jpeg",
        rating: 9.5,
        type: "Manhwa",
        chapters: 180,
    },
];

export const MOCK_CHAPTERS = Array.from({ length: 20 }, (_, i) => ({
    id: `ch-${i + 1}`,
    number: i + 1,
    title: `Chapter ${i + 1}`,
    uploaded: "2 days ago",
}));

export const MOCK_PAGES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    image: "https://d30womf5coomej.cloudfront.net/sa/15/82/c4/82c40217983083dbb157bd6362d2b591.jpg", // Placeholder manga page
}));
