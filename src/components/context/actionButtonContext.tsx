'use client';

import { TableType } from '@/types/sports.types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ActionButtonContextType {
    isAddTeamVisible: boolean;
    toggleAddTeamVisibility: () => void;
    isAddScoreVisible: boolean;
    toggleAddScoreVisibility: () => void;
    tableType: TableType;
}

const ActionButtonContext = createContext<ActionButtonContextType | undefined>(undefined);

export const ActionButtonProvider = ({ children, tableType }: { children: ReactNode; tableType: TableType }) => {
    const [isAddTeamVisible, setIsAddTeamVisible] = useState(tableType === 'PremierLeague');
    const [isAddScoreVisible, setIsAddScoreVisible] = useState(tableType === 'PremierLeague');

    const toggleAddTeamVisibility = () => {
        setIsAddTeamVisible(!isAddTeamVisible);
        setIsAddScoreVisible(false);
    };

    const toggleAddScoreVisibility = () => {
        setIsAddScoreVisible(!isAddScoreVisible);
        setIsAddTeamVisible(false);
    };

    return (
        <ActionButtonContext.Provider
            value={{
                isAddTeamVisible,
                toggleAddTeamVisibility,
                isAddScoreVisible,
                toggleAddScoreVisibility,
                tableType,
            }}
        >
            {children}
        </ActionButtonContext.Provider>
    );
};

export const useActionButton = () => {
    const context = useContext(ActionButtonContext);

    if (!context) {
        throw new Error('useActionButton must be used within ActionButtonProvider');
    }

    return context;
};
