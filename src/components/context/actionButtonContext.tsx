'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ActionButtonContextType {
    isAddTeamVisible: boolean;
    toggleAddTeamVisibility: () => void;
    isAddScoreVisible: boolean;
    toggleAddScoreVisibility: () => void;
}

const ActionButtonContext = createContext<ActionButtonContextType | undefined>(undefined);

export const ActionButtonProvider = ({ children }: { children: ReactNode }) => {
    const [isAddTeamVisible, setIsAddTeamVisible] = useState(false);
    const [isAddScoreVisible, setIsAddScoreVisible] = useState(false);

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
            value={{ isAddTeamVisible, toggleAddTeamVisibility, isAddScoreVisible, toggleAddScoreVisibility }}
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
