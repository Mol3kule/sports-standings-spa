'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '../../formWrapper';
import { useTableForm } from '@/hooks/usePremierLeagueForm';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@/components/ui/errorMessage';
import { useActionButton } from '@/components/context/actionButtonContext';

const AddTeamForm = () => {
    const { addTeamForm, handleAddTeamSubmit } = useTableForm('EuroBasket');

    const { isAddTeamVisible } = useActionButton();

    return (
        <>
            {isAddTeamVisible && (
                <FormWrapper className="bg-green-dark" onSubmit={addTeamForm.handleSubmit(handleAddTeamSubmit)}>
                    <Label htmlFor="eurobasket-add-team-input" className="capitalize font-semibold text-white">
                        Add team
                    </Label>
                    <Controller
                        name="name"
                        control={addTeamForm.control}
                        render={({ field, fieldState }) => (
                            <div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="eurobasket-add-team-input"
                                        placeholder="Team name"
                                        className="capitalize h-7 bg-green-default border-green-default text-white placeholder:text-white/60"
                                        autoComplete="off"
                                        {...field}
                                    />
                                    <Button variant={'orange'}>Add</Button>
                                </div>
                                {fieldState.error && <ErrorMessage message={fieldState.error.message} />}
                            </div>
                        )}
                    />
                </FormWrapper>
            )}
        </>
    );
};

export default AddTeamForm;
