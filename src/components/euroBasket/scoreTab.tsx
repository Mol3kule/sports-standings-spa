'use client';

import { getCountryList } from '@/lib/countries';
import { useAppSelector } from '@/lib/store';
import { selectTables } from '@/reducers/sportsSlice';

const ScoreTab = () => {
    const items = useAppSelector(selectTables).EuroBasket;

    const countries = getCountryList();

    // Get all matches from scoreHistory with timestamps
    const allMatches = items.flatMap((team) =>
        team.scoreHistory.map((score) => ({
            teamId: team.id,
            teamName: team.name,
            opponentId: score.opponentId,
            teamScore: score.teamScore,
            opponentScore: score.opponentScore,
            timestamp: score.timestamp,
        })),
    );

    // Sort by timestamp and get unique matches (each match appears twice in history)
    const sortedMatches = allMatches
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((match, index, self) => {
            // Keep only one entry per match (avoid duplicates)
            return (
                index ===
                self.findIndex(
                    (m) =>
                        m.timestamp === match.timestamp &&
                        ((m.teamId === match.teamId && m.opponentId === match.opponentId) ||
                            (m.teamId === match.opponentId && m.opponentId === match.teamId)),
                )
            );
        })
        .slice(0, 2);

    // Enrich with team data and flags
    const latestTwo = sortedMatches.map((match) => {
        const teamOne = items.find((t) => t.id === match.teamId);
        const teamTwo = items.find((t) => t.id === match.opponentId);

        const teamOneWithFlag = {
            ...teamOne!,
            name: `${countries.find((c) => c.name.toLowerCase() === teamOne!.name.toLowerCase())?.flag} ${
                teamOne!.name
            }`,
        };
        const teamTwoWithFlag = {
            ...teamTwo!,
            name: `${countries.find((c) => c.name.toLowerCase() === teamTwo!.name.toLowerCase())?.flag} ${
                teamTwo!.name
            }`,
        };

        // Determine winner and order teams so winner is on the left
        let leftTeam, rightTeam, leftScore, rightScore;
        if (match.teamScore > match.opponentScore) {
            // Team one won
            leftTeam = teamOneWithFlag;
            rightTeam = teamTwoWithFlag;
            leftScore = match.teamScore;
            rightScore = match.opponentScore;
        } else if (match.opponentScore > match.teamScore) {
            // Team two won
            leftTeam = teamTwoWithFlag;
            rightTeam = teamOneWithFlag;
            leftScore = match.opponentScore;
            rightScore = match.teamScore;
        } else {
            // Draw - keep original order
            leftTeam = teamOneWithFlag;
            rightTeam = teamTwoWithFlag;
            leftScore = match.teamScore;
            rightScore = match.opponentScore;
        }

        return {
            teamOne: leftTeam,
            teamTwo: rightTeam,
            teamOneScore: leftScore,
            teamTwoScore: rightScore,
        };
    });

    if (latestTwo.length === 0) {
        return <div className="text-center text-sm text-muted-foreground py-4">No matches played yet</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {latestTwo.map(({ teamOne, teamTwo, teamOneScore, teamTwoScore }, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b border-b-green-dark rounded">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="font-semibold text-sm text-white">{teamOne.name} </span>
                        <span className="text-xs text-white/60">vs</span>
                        <span className="font-semibold text-sm text-white">{teamTwo.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <span className="text-white">
                            {teamOneScore} - {teamTwoScore}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScoreTab;
