import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import AddScoreForm from './forms/addScoreForm';
import AddTeamForm from './forms/addTeamForm';
import PremierLeagueTable from './premierLeagueTable';

const PremierLeagueCard = () => {
    return (
        <Card className="w-[350px] h-[600px] p-0 gap-4 font-inter">
            <CardHeader className="flex bg-[#37003c] p-4 rounded-t-md items-center">
                <CardTitle className="text-xl">Premier League</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col px-4 pb-4 gap-4 relative overflow-hidden flex-1">
                <AddTeamForm />
                <AddScoreForm />
                <PremierLeagueTable />
            </CardContent>
        </Card>
    );
};

export default PremierLeagueCard;
