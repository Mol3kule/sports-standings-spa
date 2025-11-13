export type TableType = 'PremierLeague' | 'EuroBasket' | 'Wimbledon';
export type FormType = 'addTeam' | 'addScore';

export interface Team {
    id: string;
    name: string;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    gamesPlayed: number;
    playedAgainst: string[];
    isPlayer?: boolean;
    scoreHistory: { opponentId: string; teamScore: number; opponentScore: number; timestamp: number }[];
}

export interface FormError {
    tableType: TableType;
    formType: FormType;
    message: string;
}

export interface TableState {
    tables: Record<TableType, Team[]>;
    loading: boolean;
    errors: FormError[];
    selectedLeague: string | null;
}
