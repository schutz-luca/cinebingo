export type Content = {
    name?: string;
    cast: string[];
    directBy: string;
    awards: string[];
    country: string;
    productionBy: string;
};

export type ContentView = Omit<Content, 'name'>;
