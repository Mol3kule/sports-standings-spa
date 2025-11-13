import { Team } from '@/types/sports.types';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface iRenderScoreTable {
    items: Team[];
    tableHeaderClassName?: string;
    cellClassName?: string;
    tableHeaderRowClassName?: string;
    tableHeadClassName?: string;
    rowClassName?: string;
    displayPlayedMatches?: boolean;
    displayDraws?: boolean;
    displayIcons?: boolean;
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
    displayIcons = false,
}: iRenderScoreTable) => {
    const CustomTableCell = ({ children }: { children: React.ReactNode }) => (
        <TableCell className={cn('text-center', cellClassName)}>{children}</TableCell>
    );

    return (
        <div className="flex flex-1 overflow-y-auto">
            <Table className="flex-1 font-semibold">
                <TableHeader className={cn('bg-[#f3f4f6] sticky top-0 z-10', tableHeaderClassName)}>
                    <TableRow className={cn(rowClassName, tableHeaderRowClassName)}>
                        <CustomTableHead className={cn('w-[50%] text-left', tableHeadClassName)}>
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
                                    <CustomTableCell>
                                        <div className="text-start">{item.name}</div>
                                    </CustomTableCell>
                                    {displayPlayedMatches && <CustomTableCell>{item.gamesPlayed}</CustomTableCell>}
                                    <CustomTableCell>
                                        {displayIcons ? (
                                            <span className="flex items-center gap-1 justify-center">
                                                {item.wins}
                                                <Check className="text-green-500" size={15} />
                                            </span>
                                        ) : (
                                            item.wins
                                        )}
                                    </CustomTableCell>
                                    {displayDraws && <CustomTableCell>{item.draws}</CustomTableCell>}
                                    <CustomTableCell>
                                        {displayIcons ? (
                                            <span className="flex items-center gap-1 justify-center">
                                                {item.losses}
                                                <X className="text-red-500" size={15} />
                                            </span>
                                        ) : (
                                            item.losses
                                        )}
                                    </CustomTableCell>
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
    <TableHead className={cn('text-center', className)}>{children}</TableHead>
);

export default RenderScoreTable;
