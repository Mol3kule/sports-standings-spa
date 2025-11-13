'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import { addScore, addTeam, selectError } from '@/reducers/sportsSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddTeamSchema } from '@/validators/addTeamShema';
import { z } from 'zod';
import { useEffect } from 'react';
import { AddScoreSchema } from '@/validators/addScoreSchema';
import { TableType } from '@/types/sports.types';

export const useTableForm = (type: TableType) => {
    const dispatch = useAppDispatch();
    const addTeamError = useAppSelector(selectError(type, 'addTeam'));
    const addScoreError = useAppSelector(selectError(type, 'addScore'));

    const addTeamForm = useForm<z.infer<typeof AddTeamSchema>>({
        resolver: zodResolver(AddTeamSchema),
        defaultValues: {
            name: '',
        },
    });

    const handleAddTeamSubmit = (data: z.infer<typeof AddTeamSchema>) => {
        dispatch(
            addTeam({
                tableType: type,
                name: data.name.trim(),
            }),
        );

        addTeamForm.reset();
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
                tableType: type,
                data,
            }),
        );

        addTeamScoreForm.reset();
    };

    // Set form errors if Redux returns errors
    useEffect(() => {
        if (addTeamError) {
            addTeamForm.setError('name', {
                type: 'manual',
                message: addTeamError,
            });
        } else {
            addTeamForm.clearErrors('name');
        }
    }, [addTeamError, addTeamForm]);

    useEffect(() => {
        if (addScoreError) {
            addTeamScoreForm.setError('root', {
                type: 'manual',
                message: addScoreError,
            });
        } else {
            addTeamScoreForm.clearErrors('root');
            // Reset form on successful submission
            addTeamScoreForm.reset();
        }
    }, [addScoreError, addTeamScoreForm]);

    return {
        addTeamForm,
        handleAddTeamSubmit,
        addTeamScoreForm,
        handleAddTeamScoreSubmit,
    };
};
