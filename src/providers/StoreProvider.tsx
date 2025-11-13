'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { loadFromStorage } from '@/lib/storage';
import { hydrate } from '@/reducers/sportsSlice';
import { useEffect } from 'react';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Hydrate from localStorage after mount
        const persistedState = loadFromStorage();
        if (persistedState?.sports) {
            store.dispatch(hydrate(persistedState.sports));
        }
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
