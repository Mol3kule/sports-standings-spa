'use client';

import { useAppSelector } from '@/lib/store';
import { selectTables } from '@/reducers/sportsSlice';
import RenderScoreTable from '../renderScoreTable';

// Table shows: Matches Played (P/M), Wins (W), Losses (L), Points (Pts)
const WimbledonTable = () => {
    const items = useAppSelector(selectTables).Wimbledon;

    const filteredItems = items.filter((item) => item.gamesPlayed > 0);

    return <RenderScoreTable items={filteredItems} displayDraws={false} displayIcons />;
};

export default WimbledonTable;
