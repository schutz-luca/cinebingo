import { Content } from '../@types/content.type';
import content from './mock/content.json';

export const ContentService = {
    getContent: () => {
        return content.en as unknown as Content[];
    },
};
