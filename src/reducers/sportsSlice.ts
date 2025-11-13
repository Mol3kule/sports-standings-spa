import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TableState, Team, TableType, FormType } from '../types/sports.types';
import type { RootState } from '@/lib/store';
import { premierLeagueData } from '@/lib/premierLeagueData';
import { AddScoreSchema } from '@/validators/addScoreSchema';
import { euroBasketData } from '@/lib/eurobasketData';
import { getCountryList } from '@/lib/countries';
import { wimbledonData } from '@/lib/wimbledonData';
import { z } from 'zod';

const initialState: TableState = {
    tables: {
        PremierLeague: premierLeagueData,
        EuroBasket: euroBasketData,
        Wimbledon: wimbledonData,
    },
    loading: false,
    errors: [],
    selectedLeague: null,
};

const sportsSlice = createSlice({
    name: 'sports',
    initialState,
    reducers: {
        /**
         * Action to hydrate state from localStorage
         */
        hydrate: (state, action: PayloadAction<TableState>) => {
            return action.payload;
        },

        /**
         * Action to add a team
         */
        addTeam: (state, action: PayloadAction<{ tableType: TableType; name: string }>) => {
            const { tableType, name } = action.payload;

            // Clear previous errors for this form and table
            state.errors = state.errors.filter(
                (error) => !(error.tableType === tableType && error.formType === 'addTeam'),
            );

            if (tableType === 'EuroBasket') {
                const countries = getCountryList();
                const country = countries.find((c) => c.name.toLowerCase() === name.toLowerCase());

                if (!country) {
                    state.errors.push({
                        tableType,
                        formType: 'addTeam',
                        message: 'Country not found for the given team name',
                    });
                    return;
                }
            }

            // Check for duplicate names
            if (state.tables[tableType].some((standing) => standing.name.toLowerCase() === name.toLowerCase())) {
                state.errors.push({
                    tableType,
                    formType: 'addTeam',
                    message: 'Team with this name already exists',
                });
                return;
            }

            const newTeam: Team = {
                id: `${tableType}-${Date.now()}`,
                name,
                wins: 0,
                losses: 0,
                draws: 0,
                points: 0,
                gamesPlayed: 0,
                playedAgainst: [],
                scoreHistory: [],
                isPlayer: tableType === 'Wimbledon' ? true : false,
            };

            state.tables[tableType].push(newTeam);
        },

        addScore: (state, action: PayloadAction<{ tableType: TableType; data: z.infer<typeof AddScoreSchema> }>) => {
            const { tableType, data } = action.payload;
            const { teamOneId, teamTwoId, teamOneScore, teamTwoScore } = data;

            // Clear previous errors for this form and table
            state.errors = state.errors.filter(
                (error) => !(error.tableType === tableType && error.formType === 'addScore'),
            );

            // Validate scores are provided
            if (teamOneScore === undefined || teamTwoScore === undefined) {
                state.errors.push({
                    tableType,
                    formType: 'addScore',
                    message: 'Both scores are required',
                });
                return;
            }

            // Find both teams
            const teamOne = state.tables[tableType].find((team) => team.id === teamOneId);
            const teamTwo = state.tables[tableType].find((team) => team.id === teamTwoId);

            if (!teamOne || !teamTwo) {
                state.errors.push({
                    tableType,
                    formType: 'addScore',
                    message: 'One or both teams not found',
                });
                return;
            }

            // Check if teams have already played against each other
            if (teamOne.playedAgainst.includes(teamTwoId)) {
                state.errors.push({
                    tableType,
                    formType: 'addScore',
                    message: 'These teams have already played against each other',
                });
                return;
            }

            // Update games played
            teamOne.gamesPlayed += 1;
            teamTwo.gamesPlayed += 1;

            // Add to playedAgainst arrays
            teamOne.playedAgainst.push(teamTwoId);
            teamTwo.playedAgainst.push(teamOneId);

            // Determine result and update stats
            if (teamOneScore > teamTwoScore) {
                // Team One wins
                teamOne.wins += 1;
                teamOne.points += 3;
                teamTwo.losses += 1;
            } else if (teamOneScore < teamTwoScore) {
                // Team Two wins
                teamTwo.wins += 1;
                teamTwo.points += 3;
                teamOne.losses += 1;
            } else {
                // Draw
                teamOne.draws += 1;
                teamOne.points += 1;
                teamTwo.draws += 1;
                teamTwo.points += 1;
            }

            // Update score history
            const timestamp = Date.now();
            teamOne.scoreHistory.push({
                opponentId: teamTwoId,
                teamScore: teamOneScore,
                opponentScore: teamTwoScore,
                timestamp,
            });
            teamTwo.scoreHistory.push({
                opponentId: teamOneId,
                teamScore: teamTwoScore,
                opponentScore: teamOneScore,
                timestamp,
            });
        },

        /**
         * Action to set the selected league
         */
        setSelectedLeague: (state, action: PayloadAction<string>) => {
            state.selectedLeague = action.payload;
        },

        /**
         * Action to clear error for a specific form and table
         */
        clearError: (state, action: PayloadAction<{ tableType: TableType; formType: FormType }>) => {
            const { tableType, formType } = action.payload;
            state.errors = state.errors.filter(
                (error) => !(error.tableType === tableType && error.formType === formType),
            );
        },

        /**
         * Action to clear all errors
         */
        clearAllErrors: (state) => {
            state.errors = [];
        },

        /**
         * Action to reset the sports state
         */
        resetSportsState: () => initialState,
    },
});

export const { hydrate, addTeam, setSelectedLeague, clearError, clearAllErrors, resetSportsState, addScore } =
    sportsSlice.actions;

export default sportsSlice.reducer;

// Selectors
export const selectErrors = (state: RootState) => state.sports.errors;
export const selectError =
    (tableType: TableType, formType: FormType) =>
    (state: RootState): string | null => {
        const error = state.sports.errors.find((error) => error.tableType === tableType && error.formType === formType);
        return error ? error.message : null;
    };
export const selectTables = (state: RootState) => state.sports.tables;
export const selectTable = (tableType: TableType) => (state: RootState) => state.sports.tables[tableType];
export const selectIsLoading = (state: RootState) => state.sports.loading;
export const selectSelectedLeague = (state: RootState) => state.sports.selectedLeague;
