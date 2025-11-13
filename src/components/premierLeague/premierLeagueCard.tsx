import { ActionButtonProvider } from '../context/actionButtonContext';
import AddScoreForm from '../forms/addScoreForm';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import AddTeamForm from './forms/addTeamForm';
import PremierLeagueTable from './premierLeagueTable';

const PremierLeagueCard = () => {
    return (
        <Card className="w-[350px] h-[600px] p-0 gap-4 font-inter">
            <CardHeader className="flex bg-[#37003c] p-4 rounded-t-md items-center">
                <CardTitle className="text-xl">Premier League</CardTitle>
            </CardHeader>
            <ActionButtonProvider tableType="PremierLeague">
                <CardContent className="flex flex-col px-4 pb-4 gap-4 overflow-hidden flex-1">
                    <AddTeamForm />
                    <AddScoreForm tableType="PremierLeague" />
                    <PremierLeagueTable />
                </CardContent>
            </ActionButtonProvider>
        </Card>
    );
};

export default PremierLeagueCard;
