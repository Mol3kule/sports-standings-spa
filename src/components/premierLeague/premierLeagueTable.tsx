'use client';

import { useAppSelector } from '@/lib/store';
// Table shows: Matches Played (P/M), Wins (W), Draws (D), Losses (L), Points (Pts)

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { selectTables } from '@/reducers/sportsSlice';

const PremierLeagueTable = () => {
    const items = useAppSelector(selectTables).PremierLeague;

    const filteredItems = items.filter((item) => item.gamesPlayed > 0);

    return (
        <div className="flex flex-1 overflow-y-auto">
            <Table className="flex-1">
                <TableHeader className="bg-[#f3f4f6] sticky top-0 z-10">
                    <TableRow>
                        <TableHead className="w-[50%]">Team</TableHead>
                        <TableHead>P/M</TableHead>
                        <TableHead>W</TableHead>
                        <TableHead>D</TableHead>
                        <TableHead>L</TableHead>
                        <TableHead>Pts</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="flex-1 overflow-y-auto">
                    {filteredItems.length ? (
                        filteredItems
                            .sort((a, b) => b.points - a.points)
                            .map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.gamesPlayed}</TableCell>
                                    <TableCell>{item.wins}</TableCell>
                                    <TableCell>{item.draws}</TableCell>
                                    <TableCell>{item.losses}</TableCell>
                                    <TableCell>{item.points}</TableCell>
                                </TableRow>
                            ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No teams have played any games yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default PremierLeagueTable;
