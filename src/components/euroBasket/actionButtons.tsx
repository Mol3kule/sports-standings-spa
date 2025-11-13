'use client';

import { useActionButton } from '../context/actionButtonContext';
import { Button } from '../ui/button';

const ActionButtons = () => {
    const { toggleAddTeamVisibility, toggleAddScoreVisibility } = useActionButton();

    return (
        <div className="flex items-center justify-between">
            <Button
                onClick={toggleAddTeamVisibility}
                className="bg-orange-default hover:bg-orange-default/90 font-montserrat gap-1 capitalize"
            >
                <span className="text-2xl">+</span> Add team
            </Button>
            <Button
                onClick={toggleAddScoreVisibility}
                className="bg-orange-default hover:bg-orange-default/90 font-montserrat gap-1 capitalize"
            >
                <span className="text-2xl">+</span> Add score
            </Button>
        </div>
    );
};

export default ActionButtons;
