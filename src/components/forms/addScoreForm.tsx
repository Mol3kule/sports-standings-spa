'use client';

import { Label } from '@/components/ui/label';
import { FormWrapper } from '../formWrapper';
import { Controller } from 'react-hook-form';
import { useTableForm } from '@/hooks/usePremierLeagueForm';
import { Select } from '@/components/select';
import { useAppSelector } from '@/lib/store';
import { selectTables } from '@/reducers/sportsSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/errorMessage';
import { useActionButton } from '@/components/context/actionButtonContext';
import { TableType } from '@/types/sports.types';
import { getCountryList } from '@/lib/countries';
import { cn } from '@/lib/utils';

interface iAddScoreForm {
    tableType: TableType;
}

const AddScoreForm = ({ tableType }: iAddScoreForm) => {
    const { addTeamScoreForm, handleAddTeamScoreSubmit } = useTableForm(tableType);

    const { isAddScoreVisible } = useActionButton();
    const tableData = useAppSelector(selectTables)[tableType];

    const [teamOneId, teamTwoId] = addTeamScoreForm.watch(['teamOneId', 'teamTwoId']);

    // Helper function to check if a team has available opponents
    const hasAvailableOpponents = (teamId: string) => {
        const team = tableData.find((t) => t.id === teamId);
        if (!team) return false;

        // Count how many teams this team hasn't played against yet (excluding itself)
        const availableOpponents = tableData.filter(
            (opponent) => opponent.id !== teamId && !team.playedAgainst.includes(opponent.id),
        );

        return availableOpponents.length > 0;
    };

    const isEurobasket = tableType === 'EuroBasket';
    const isWimbledon = tableType === 'Wimbledon';
    const countries = getCountryList();

    // Only show teams that have available opponents they haven't played against
    const selectableTeams = tableData.filter((team) => hasAvailableOpponents(team.id));
    const teamItems = selectableTeams.map((team) => ({
        value: team.id,
        label: isEurobasket
            ? countries.find((c) => c.name.toLowerCase() === team.name.toLowerCase())?.flag + ' ' + team.name
            : team.name,
    }));

    // Filter out the selected team and teams that have already played against the selected team
    const getAvailableTeamsFor = (selectedTeamId?: string, excludeTeamId?: string) => {
        if (!selectedTeamId) return teamItems;

        const selectedTeam = tableData.find((t) => t.id === selectedTeamId);
        if (!selectedTeam) return teamItems;

        return teamItems.filter(
            (team) => team.value !== excludeTeamId?.toString() && !selectedTeam.playedAgainst.includes(team.value),
        );
    };

    const teamOneItems = getAvailableTeamsFor(teamTwoId, teamTwoId);
    const teamTwoItems = getAvailableTeamsFor(teamOneId, teamOneId);

    const rootError = addTeamScoreForm.formState.errors.root;

    return (
        <>
            {isAddScoreVisible && (
                <FormWrapper
                    className={`${isEurobasket && 'bg-green-dark'}`}
                    onSubmit={addTeamScoreForm.handleSubmit(handleAddTeamScoreSubmit)}
                >
                    <Label
                        htmlFor="add-score-input"
                        className={cn('capitalize font-semibold', isEurobasket && 'text-white')}
                    >
                        Add score
                    </Label>
                    {rootError && <ErrorMessage message={rootError.message} />}
                    <div className="grid grid-cols-2 gap-2">
                        <RenderItem
                            tableType={tableType}
                            formControl={addTeamScoreForm.control}
                            isTeamOne={true}
                            label={teamItems.find((team) => team.value === teamOneId?.toString())?.label}
                            items={teamOneItems}
                        />
                        <RenderItem
                            tableType={tableType}
                            formControl={addTeamScoreForm.control}
                            isTeamOne={false}
                            label={teamItems.find((team) => team.value === teamTwoId?.toString())?.label}
                            items={teamTwoItems}
                        />
                    </div>
                    <Button variant={isEurobasket ? 'orange' : isWimbledon ? 'purple' : 'default'} className="w-full">
                        Add score
                    </Button>
                </FormWrapper>
            )}
        </>
    );
};

const RenderItem = ({
    tableType,
    formControl,
    isTeamOne,
    items,
    label,
}: {
    tableType: TableType;
    formControl: ReturnType<typeof useTableForm>['addTeamScoreForm']['control'];
    isTeamOne: boolean;
    items: { value: string; label: string }[];
    label?: string | number;
}) => {
    const isPremierLeague = tableType === 'PremierLeague';
    const isEurobasket = tableType === 'EuroBasket';

    return (
        <div className="grid gap-2">
            <Controller
                control={formControl}
                name={isTeamOne ? 'teamOneId' : 'teamTwoId'}
                render={({ field, fieldState }) => (
                    <div className="truncate">
                        <Select
                            className={cn(
                                field.value && isPremierLeague
                                    ? 'bg-grey-default'
                                    : isEurobasket && 'bg-green-default text-white',
                                !field.value && 'text-white',
                                isEurobasket && 'border-green-default',
                            )}
                            selectContentClassName={isEurobasket ? 'bg-green-default border-green-dark border-2' : ''}
                            itemClassName={
                                isEurobasket
                                    ? 'text-white bg-green-default focus:bg-green-dark focus:text-white font-montserrat'
                                    : isPremierLeague
                                    ? 'font-inter'
                                    : 'font-space-mono'
                            }
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
                            className={cn(
                                'h-7 placeholder:font-semibold rounded-sm border-2',
                                isEurobasket && 'border-green-default placeholder:text-white/60 text-white',
                            )}
                            {...field}
                            value={field.value !== undefined && field.value !== null ? Number(field.value) : ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? undefined : Number(value));
                            }}
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
