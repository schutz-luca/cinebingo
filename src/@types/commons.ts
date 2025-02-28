import { Dispatch, ReactNode, SetStateAction } from 'react';

export type StateSet<T> = Dispatch<SetStateAction<T>>;

export interface State<T> {
    value: T;
    set: StateSet<T>;
}

export interface Parent {
    children: ReactNode;
}
