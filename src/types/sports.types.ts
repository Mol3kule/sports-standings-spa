export interface Team {
    id: string;
    name: string;
    wins: number;
    losses: number;
    points: number;
}

export interface Standing {
    position: number;
    team: Team;
    gamesPlayed: number;
}

export interface SportsState {
    standings: Standing[];
    loading: boolean;
    error: string | null;
    selectedLeague: string | null;
}
