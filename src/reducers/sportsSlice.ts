import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { SportsState, Standing } from '../types/sports.types';
import type { RootState } from '@/lib/store';

const initialState: SportsState = {
    standings: [],
    loading: false,
    error: null,
    selectedLeague: null,
};

export const fetchStandings = createAsyncThunk('sports/fetchStandings', async (league: string, { rejectWithValue }) => {
    try {
        // Mock data testing
        const mockStandings: Standing[] = [
            {
                position: 1,
                team: { id: '1', name: 'Team A', wins: 10, losses: 2, points: 30 },
                gamesPlayed: 12,
            },
            {
                position: 2,
                team: { id: '2', name: 'Team B', wins: 8, losses: 4, points: 24 },
                gamesPlayed: 12,
            },
        ];

        return mockStandings;
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch standings');
    }
});

const sportsSlice = createSlice({
    name: 'sports',
    initialState,
    reducers: {
        /**
         * Action to set the selected league
         */
        setSelectedLeague: (state, action: PayloadAction<string>) => {
            state.selectedLeague = action.payload;
        },

        /**
         * Action to clear error state
         */
        clearError: (state) => {
            state.error = null;
        },

        /**
         * Action to reset the sports state
         */
        resetSportsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStandings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStandings.fulfilled, (state, action) => {
                state.loading = false;
                state.standings = action.payload;
            })
            .addCase(fetchStandings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedLeague, clearError, resetSportsState } = sportsSlice.actions;

export default sportsSlice.reducer;

export const selectStandings = (state: RootState) => state.sports.standings;
export const selectIsLoading = (state: RootState) => state.sports.loading;
export const selectError = (state: RootState) => state.sports.error;
export const selectSelectedLeague = (state: RootState) => state.sports.selectedLeague;
export const selectTopTeams = (n: number) => (state: RootState) => state.sports.standings.slice(0, n);
export const selectHasStandings = (state: RootState) => state.sports.standings.length > 0;
