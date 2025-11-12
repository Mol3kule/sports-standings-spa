import { z } from 'zod';
export const AddScoreSchema = z
    .object({
        teamOneId: z.string().min(1, 'Must be selected'),
        teamTwoId: z.string().min(1, 'Must be selected'),
        teamOneScore: z.number().min(0, 'Team One Score must be at least 0').optional(),
        teamTwoScore: z.number().min(0, 'Team Two Score must be at least 0').optional(),
    })
    .refine((data) => data.teamOneId !== data.teamTwoId, {
        message: 'Team One ID and Team Two ID must be different',
    })
    .refine(
        (data) => {
            if (data.teamTwoId) {
                return data.teamOneScore !== undefined;
            }
            return true;
        },
        {
            message: 'Score is required',
            path: ['teamOneScore'],
        },
    )
    .refine(
        (data) => {
            if (data.teamTwoId) {
                return data.teamTwoScore !== undefined;
            }
            return true;
        },
        {
            message: 'Score is required',
            path: ['teamTwoScore'],
        },
    );
