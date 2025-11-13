import { Team } from '@/types/sports.types';

export const euroBasketData: Team[] = [
    {
        id: `EuroBasket-lithuania`,
        name: 'Lithuania',
        wins: 1,
        losses: 0,
        points: 3,
        draws: 0,
        gamesPlayed: 1,
        playedAgainst: ['EuroBasket-spain'],
        scoreHistory: [
            {
                opponentId: 'EuroBasket-spain',
                teamScore: 82,
                opponentScore: 77,
                timestamp: 0,
            },
        ],
    },
    {
        id: `EuroBasket-spain`,
        name: 'Spain',
        wins: 0,
        losses: 1,
        points: 0,
        draws: 0,
        gamesPlayed: 1,
        playedAgainst: ['EuroBasket-lithuania'],
        scoreHistory: [
            {
                opponentId: 'EuroBasket-lithuania',
                teamScore: 77,
                opponentScore: 82,
                timestamp: 0,
            },
        ],
    },
    {
        id: `EuroBasket-france`,
        name: 'France',
        wins: 0,
        losses: 0,
        points: 1,
        draws: 1,
        gamesPlayed: 1,
        playedAgainst: ['EuroBasket-germany'],
        scoreHistory: [
            {
                opponentId: 'EuroBasket-germany',
                teamScore: 71,
                opponentScore: 71,
                timestamp: 0,
            },
        ],
    },
    {
        id: `EuroBasket-germany`,
        name: 'Germany',
        wins: 0,
        losses: 0,
        points: 1,
        draws: 1,
        gamesPlayed: 1,
        playedAgainst: ['EuroBasket-france'],
        scoreHistory: [
            {
                opponentId: 'EuroBasket-france',
                teamScore: 71,
                opponentScore: 71,
                timestamp: 0,
            },
        ],
    },
];
