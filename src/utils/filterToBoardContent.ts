import { Content, ContentView } from '../@types/content.type';

export const filterToContentView = (contents: Content[]): ContentView[] => {
    return contents.map(
        (content) =>
            ({
                cast: content.cast,
                directBy: content.directBy,
                awards: content.awards,
                country: content.country,
                productionBy: content.productionBy,
            }) as ContentView,
    );
};
