import { Content } from '../@types/content.type';
import content from './mock/content.json';

export const ContentService = {
    getContent: () => {
        return content.pt as unknown as Content[];
    },
};
