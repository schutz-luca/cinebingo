import { ContentView } from '../../@types/content.type';

export interface BoardItem {
    category: keyof ContentView;
    value: string;
    checked: 'correct' | '';
}
