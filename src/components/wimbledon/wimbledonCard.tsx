import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import WimbledonIcon from '../icons/wimbledon.svg';
import Image from 'next/image';
import { ActionButtonProvider } from '../context/actionButtonContext';
import ActionButtons from '../actionButtons';
import AddTeamForm from '../forms/addTeamForm';
import WimbledonTable from './wimbledonTable';
import AddScoreForm from '../forms/addScoreForm';

const WimbledonCard = () => {
    return (
        <Card className="w-[350px] h-[600px] p-0 gap-4 font-space-mono">
            <CardHeader className="flex flex-row p-4 rounded-t-md items-center gap-3 bg-green-light">
                <Image src={WimbledonIcon} alt="Basketball Icon" width={24} height={24} />
                <CardTitle className="text-xl capitalize font-semibold">Wimbledon</CardTitle>
            </CardHeader>
            <ActionButtonProvider tableType="Wimbledon">
                <CardContent className="flex flex-col px-4 pb-4 gap-4 overflow-hidden flex-1">
                    <ActionButtons />
                    <AddTeamForm />
                    <AddScoreForm tableType="Wimbledon" />
                    <WimbledonTable />
                </CardContent>
            </ActionButtonProvider>
        </Card>
    );
};

export default WimbledonCard;
