export type Content = {
    name?: string;
    cast: string[];
    directBy: string;
    awards: string[];
    country: string;
    productionBy: string;
    poster?: string;
    tmdbId?: number;
};

export type ContentView = Omit<Content, 'name' | 'poster' | 'tmdbId'>;
