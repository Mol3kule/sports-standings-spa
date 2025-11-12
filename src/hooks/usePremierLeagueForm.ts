'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import { addScore, addTeam, selectError } from '@/reducers/sportsSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddTeamSchema } from '@/validators/addTeamShema';
import { z } from 'zod';
import { useEffect } from 'react';
import { AddScoreSchema } from '@/validators/addScoreSchema';

export const usePremierLeagueForm = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);

    const addTeamForm = useForm<z.infer<typeof AddTeamSchema>>({
        resolver: zodResolver(AddTeamSchema),
        defaultValues: {
            name: '',
        },
    });

    const handleAddTeamSubmit = (data: z.infer<typeof AddTeamSchema>) => {
        dispatch(
            addTeam({
                tableType: 'PremierLeague',
                name: data.name.trim(),
            }),
        );
    };

    const addTeamScoreForm = useForm<z.infer<typeof AddScoreSchema>>({
        resolver: zodResolver(AddScoreSchema),
        defaultValues: {
            teamOneId: '',
            teamTwoId: '',
            teamOneScore: undefined,
            teamTwoScore: undefined,
        },
    });

    const handleAddTeamScoreSubmit = (data: z.infer<typeof AddScoreSchema>) => {
        dispatch(
            addScore({
                tableType: 'PremierLeague',
                data,
            }),
        );
    };

    // Set form error if Redux returns an error
    useEffect(() => {
        if (error) {
            addTeamForm.setError('name', {
                type: 'manual',
                message: error,
            });
        }
    }, [error]);

    return {
        addTeamForm,
        handleAddTeamSubmit,
        addTeamScoreForm,
        handleAddTeamScoreSubmit,
    };
};
