'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '../../formWrapper';
import { useTableForm } from '@/hooks/usePremierLeagueForm';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@/components/ui/errorMessage';

const AddTeamForm = () => {
    const { addTeamForm, handleAddTeamSubmit } = useTableForm('PremierLeague');

    return (
        <FormWrapper onSubmit={addTeamForm.handleSubmit(handleAddTeamSubmit)}>
            <Label htmlFor="add-team-input" className="capitalize font-semibold">
                Add team
            </Label>
            <Controller
                name="name"
                control={addTeamForm.control}
                render={({ field, fieldState }) => (
                    <div>
                        <div className="flex items-center gap-2">
                            <Input
                                id="add-team-input"
                                placeholder="Team name"
                                className="capitalize h-7 bg-white border-2 border-grey-border"
                                autoComplete="off"
                                {...field}
                            />
                            <Button className="h-7 px-3">Add</Button>
                        </div>
                        {fieldState.error && <ErrorMessage message={fieldState.error.message} />}
                    </div>
                )}
            />
        </FormWrapper>
    );
};

export default AddTeamForm;
