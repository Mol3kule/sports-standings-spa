import EuroBasketCard from '@/components/euroBasket/euroBasketCard';
import PremierLeagueCard from '@/components/premierLeague/premierLeagueCard';

export default function Home() {
    return (
        <main className="min-h-dvh flex items-center justify-center">
            <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-1 max-xl:grid-cols-2 gap-5">
                <PremierLeagueCard />
                <EuroBasketCard />
                <PremierLeagueCard />
            </div>
        </main>
    );
}
