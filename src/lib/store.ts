import { useDispatch, useSelector, useStore } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import sportsReducer from '../reducers/sportsSlice';
import { saveToStorage } from './storage';

export const store = configureStore({
    reducer: {
        sports: sportsReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store changes and save to localStorage
if (typeof window !== 'undefined') {
    store.subscribe(() => {
        saveToStorage(store.getState());
    });
}

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
