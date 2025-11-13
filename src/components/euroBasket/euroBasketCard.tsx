import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import AddTeamForm from './forms/addTeamForm';
import BasketballIcon from '../icons/basketball.svg';
import Image from 'next/image';
import { ActionButtonProvider } from '../context/actionButtonContext';
import ActionButtons from './actionButtons';
import AddScoreForm from '../forms/addScoreForm';
import EuroBasketTable from './euroBasketTable';
import ScoreTab from './scoreTab';

const EuroBasketCard = () => {
    return (
        <Card className="w-[350px] h-[600px] p-0 gap-4 bg-green-default font-montserrat">
            <CardHeader className="flex flex-row p-4 rounded-t-md items-center gap-3">
                <Image src={BasketballIcon} alt="Basketball Icon" width={24} height={24} />
                <CardTitle className="text-xl uppercase font-normal">Eurobasket</CardTitle>
            </CardHeader>
            <ActionButtonProvider tableType="EuroBasket">
                <CardContent className="flex flex-col px-4 pb-4 gap-4 overflow-hidden flex-1">
                    <ActionButtons />
                    <div className="flex-1 px-3 gap-4 flex flex-col overflow-hidden">
                        <AddTeamForm />
                        <AddScoreForm tableType="EuroBasket" />
                        <ScoreTab />
                        <EuroBasketTable />
                    </div>
                </CardContent>
            </ActionButtonProvider>
        </Card>
    );
};

export default EuroBasketCard;
