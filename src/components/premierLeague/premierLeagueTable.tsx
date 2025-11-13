'use client';

import { useAppSelector } from '@/lib/store';
import { selectTables } from '@/reducers/sportsSlice';
import RenderScoreTable from '../renderScoreTable';

// Table shows: Matches Played (P/M), Wins (W), Draws (D), Losses (L), Points (Pts)
const PremierLeagueTable = () => {
    const items = useAppSelector(selectTables).PremierLeague;

    const filteredItems = items.filter((item) => item.gamesPlayed > 0);

    return <RenderScoreTable items={filteredItems} />;
};

export default PremierLeagueTable;
