'use client';

import { cn } from '@/lib/utils';
import { useActionButton } from './context/actionButtonContext';
import { Button } from './ui/button';

const ActionButtons = () => {
    const { toggleAddTeamVisibility, toggleAddScoreVisibility, tableType } = useActionButton();

    const isEurobasket = tableType === 'EuroBasket';
    const isWimbledon = tableType === 'Wimbledon';

    return (
        <div className="flex items-center justify-between">
            <Button
                onClick={toggleAddTeamVisibility}
                className={cn(
                    'gap-1 capitalize',
                    isEurobasket && 'bg-orange-default hover:bg-orange-default/90 font-montserrat',
                    isWimbledon && 'font-space-mono bg-green-light hover:bg-green-light/90',
                )}
                size={isWimbledon ? 'lg' : 'default'}
            >
                <span className="text-2xl">+</span> {isWimbledon ? 'Add player' : 'Add team'}
            </Button>
            <Button
                onClick={toggleAddScoreVisibility}
                className={cn(
                    'gap-1 capitalize',
                    isEurobasket && 'bg-orange-default hover:bg-orange-default/90 font-montserrat',
                    isWimbledon && 'font-space-mono bg-purple-default hover:bg-purple-default/90',
                )}
                size={isWimbledon ? 'lg' : 'default'}
            >
                <span className="text-2xl">+</span> Add score
            </Button>
        </div>
    );
};

export default ActionButtons;
