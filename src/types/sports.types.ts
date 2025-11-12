export type TableType = 'PremierLeague' | 'EuroBasket' | 'Wimbledon';
export interface Team {
    id: string;
    name: string;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    gamesPlayed: number;
    selectable: boolean;
    playedAgainst: string[];
}

export interface TableState {
    tables: Record<TableType, Team[]>;
    loading: boolean;
    error: string | null;
    selectedLeague: string | null;
}
