'use client';

import { useAppSelector } from '@/lib/store';
import { selectTables } from '@/reducers/sportsSlice';
import RenderScoreTable from '../renderScoreTable';
import { getCountryList } from '@/lib/countries';

// Table shows: Wins (W), Draws (D), Losses (L), Points (Pts)
const EuroBasketTable = () => {
    const items = useAppSelector(selectTables).EuroBasket;

    const countries = getCountryList();

    const filteredItems = items
        .filter((item) => item.gamesPlayed > 0)
        .map((item) => ({
            ...item,
            name: `${countries.find((c) => c.name.toLowerCase() === item.name.toLowerCase())?.flag} ${item.name}`,
        }));

    return (
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            <p className="text-white font-semibold">Score table:</p>
            <RenderScoreTable
                tableHeaderClassName="bg-green-default"
                tableHeaderRowClassName="bg-transparent"
                tableHeadClassName="text-white"
                rowClassName="border-none text-white font-normal bg-green-dark hover:bg-transparent"
                items={filteredItems}
                displayPlayedMatches={false}
            />
        </div>
    );
};

export default EuroBasketTable;
