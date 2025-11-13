import { Team } from '@/types/sports.types';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '@/lib/utils';

interface iRenderScoreTable {
    items: Team[];
    tableHeaderClassName?: string;
    cellClassName?: string;
    tableHeaderRowClassName?: string;
    tableHeadClassName?: string;
    rowClassName?: string;
    displayPlayedMatches?: boolean;
    displayDraws?: boolean;
}

const RenderScoreTable = ({
    items,
    tableHeaderClassName,
    cellClassName,
    tableHeaderRowClassName,
    tableHeadClassName,
    rowClassName,
    displayPlayedMatches = true,
    displayDraws = true,
}: iRenderScoreTable) => {
    const CustomTableCell = ({ children }: { children: React.ReactNode }) => (
        <TableCell className={cellClassName}>{children}</TableCell>
    );

    return (
        <div className="flex flex-1 overflow-y-auto">
            <Table className="flex-1 font-semibold">
                <TableHeader className={cn('bg-[#f3f4f6] sticky top-0 z-10', tableHeaderClassName)}>
                    <TableRow className={cn(rowClassName, tableHeaderRowClassName)}>
                        <CustomTableHead className={cn('w-[50%]', tableHeadClassName)}>
                            {items[0]?.isPlayer ? 'Player' : 'Team'}
                        </CustomTableHead>
                        {displayPlayedMatches && <CustomTableHead className={tableHeadClassName}>P/M</CustomTableHead>}
                        <CustomTableHead className={tableHeadClassName}>W</CustomTableHead>
                        {displayDraws && <CustomTableHead className={tableHeadClassName}>D</CustomTableHead>}
                        <CustomTableHead className={tableHeadClassName}>L</CustomTableHead>
                        <CustomTableHead className={tableHeadClassName}>Pts</CustomTableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="flex-1 overflow-y-auto">
                    {items.length ? (
                        items
                            .sort((a, b) => b.points - a.points)
                            .map((item) => (
                                <TableRow key={item.id} className={rowClassName}>
                                    <CustomTableCell>{item.name}</CustomTableCell>
                                    {displayPlayedMatches && <CustomTableCell>{item.gamesPlayed}</CustomTableCell>}
                                    <CustomTableCell>{item.wins}</CustomTableCell>
                                    {displayDraws && <CustomTableCell>{item.draws}</CustomTableCell>}
                                    <CustomTableCell>{item.losses}</CustomTableCell>
                                    <CustomTableCell>{item.points}</CustomTableCell>
                                </TableRow>
                            ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No data yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

const CustomTableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <TableHead className={className}>{children}</TableHead>
);

export default RenderScoreTable;
