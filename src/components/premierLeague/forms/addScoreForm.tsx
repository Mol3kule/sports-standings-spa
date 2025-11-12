'use client';

import { Label } from '@/components/ui/label';
import { FormWrapper } from './formWrapper';
import { Controller } from 'react-hook-form';
import { usePremierLeagueForm } from '@/hooks/usePremierLeagueForm';
import { Select } from '@/components/select';
import { useAppSelector } from '@/lib/store';
import { selectTables } from '@/reducers/sportsSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/errorMessage';

const AddScoreForm = () => {
    const { addTeamScoreForm, handleAddTeamScoreSubmit } = usePremierLeagueForm();
    const premierLeagueTable = useAppSelector(selectTables).PremierLeague;
    const teamItems = premierLeagueTable.map((team) => ({ value: team.id, label: team.name }));

    const [teamOneId, teamTwoId] = addTeamScoreForm.watch(['teamOneId', 'teamTwoId']);

    const teamOneItems = teamItems.filter((team) => team.value !== teamTwoId?.toString());
    const teamTwoItems = teamItems.filter((team) => team.value !== teamOneId?.toString());

    return (
        <FormWrapper onSubmit={addTeamScoreForm.handleSubmit(handleAddTeamScoreSubmit)}>
            <Label htmlFor="add-score-input" className="capitalize font-bold">
                Add score
            </Label>
            <div className="grid grid-cols-2 gap-2">
                <RenderItem
                    formControl={addTeamScoreForm.control}
                    isTeamOne={true}
                    label={teamItems.find((team) => team.value === teamOneId?.toString())?.label}
                    items={teamOneItems}
                />
                <RenderItem
                    formControl={addTeamScoreForm.control}
                    isTeamOne={false}
                    label={teamItems.find((team) => team.value === teamTwoId?.toString())?.label}
                    items={teamTwoItems}
                />
            </div>
            <Button className="capitalize h-7 w-full">Add score</Button>
        </FormWrapper>
    );
};

const RenderItem = ({
    formControl,
    isTeamOne,
    items,
    label,
}: {
    formControl: ReturnType<typeof usePremierLeagueForm>['addTeamScoreForm']['control'];
    isTeamOne: boolean;
    items: { value: string; label: string }[];
    label?: string | number;
}) => {
    return (
        <div className="grid gap-2">
            <Controller
                control={formControl}
                name={isTeamOne ? 'teamOneId' : 'teamTwoId'}
                render={({ field, fieldState }) => (
                    <div>
                        <Select
                            placeholder="Select a team"
                            value={field.value?.toString()}
                            onChange={field.onChange}
                            items={items}
                        />
                        {fieldState.error && <ErrorMessage message={fieldState.error.message} />}
                    </div>
                )}
            />
            <Controller
                control={formControl}
                name={isTeamOne ? 'teamOneScore' : 'teamTwoScore'}
                render={({ field, fieldState }) => (
                    <div>
                        <Input
                            type="number"
                            className="h-7 font-semibold"
                            {...field}
                            value={field.value ? Number(field.value) : ''}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            placeholder={`${label ?? 'Team'} Score`}
                            disabled={!label}
                            min={0}
                            autoComplete="off"
                        />
                        {fieldState.error && <ErrorMessage message={fieldState.error.message} />}
                    </div>
                )}
            />
        </div>
    );
};

export default AddScoreForm;
