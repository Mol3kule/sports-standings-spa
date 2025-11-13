'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormWrapper } from '../formWrapper';
import { useTableForm } from '@/hooks/usePremierLeagueForm';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@/components/ui/errorMessage';
import { useActionButton } from '@/components/context/actionButtonContext';
import { cn } from '@/lib/utils';

const AddTeamForm = () => {
    const { isAddTeamVisible, tableType } = useActionButton();
    const { addTeamForm, handleAddTeamSubmit } = useTableForm(tableType);

    const isWimbledon = tableType === 'Wimbledon';
    const isEurobasket = tableType === 'EuroBasket';

    const placeholder = isWimbledon ? 'Player name' : 'Team name';

    return (
        <>
            {isAddTeamVisible && (
                <FormWrapper
                    className={cn(isEurobasket && 'bg-green-dark', isWimbledon && 'border-2 border-grey-default')}
                    onSubmit={addTeamForm.handleSubmit(handleAddTeamSubmit)}
                >
                    <Label
                        htmlFor={`${tableType}-add-team-input`}
                        className={cn(
                            'capitalize font-semibold',
                            isEurobasket && 'text-white',
                            isWimbledon && 'text-black',
                        )}
                    >
                        {placeholder}
                    </Label>
                    <Controller
                        name="name"
                        control={addTeamForm.control}
                        render={({ field, fieldState }) => (
                            <div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id={`${tableType}-add-team-input`}
                                        placeholder={placeholder}
                                        className={cn(
                                            'capitalize h-7',
                                            isWimbledon && 'bg-transparent text-black',
                                            isEurobasket &&
                                                'bg-green-default border-green-default text-white placeholder:text-white/60',
                                        )}
                                        autoComplete="off"
                                        {...field}
                                    />
                                    <Button variant={isEurobasket ? 'orange' : isWimbledon ? 'green' : 'default'}>
                                        Add
                                    </Button>
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
