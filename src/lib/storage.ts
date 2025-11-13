import { RootState } from './store';

const STORAGE_KEY = 'sports-spa-state';

export const saveToStorage = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
        console.error('Could not save state to localStorage:', err);
    }
};

export const loadFromStorage = () => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Could not load state from localStorage:', err);
        return undefined;
    }
};

export const clearStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.error('Could not clear localStorage:', err);
    }
};
