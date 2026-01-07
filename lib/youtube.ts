export interface VideoResult {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
}

export const searchVideos = async (query: string): Promise<VideoResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock Data
    console.log(`Searching for: ${query}`);

    return [
        {
            id: "M7lc1UVf-VE",
            title: "YouTube Developers Guide",
            thumbnail: "https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg",
            channelTitle: "Google Developers"
        },
        {
            id: "tQ0yjYUFKAE",
            title: "Top Hits 2024 - Popular Songs",
            thumbnail: "https://i.ytimg.com/vi/tQ0yjYUFKAE/hqdefault.jpg",
            channelTitle: "Music Charts"
        },
        {
            id: "kffacxfA7G4",
            title: "Justin Bieber - Baby ft. Ludacris",
            thumbnail: "https://i.ytimg.com/vi/kffacxfA7G4/hqdefault.jpg",
            channelTitle: "JustinBieberVEVO"
        },
        {
            id: "9bZkp7q19f0",
            title: "PSY - GANGNAM STYLE(강남스타일) M/V",
            thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
            channelTitle: "officialpsy"
        }
    ];
};
