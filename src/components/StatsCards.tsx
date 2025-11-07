import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface StatsCardsProps {
  streak: number;
  totalProgress: number;
  unlockedAchievements: number;
  totalAchievements: number;
}

const StatsCards = ({ streak, totalProgress, unlockedAchievements, totalAchievements }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-scale-in">
      <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <Icon name="Flame" size={32} className="animate-pulse-glow" />
          <div className="text-right">
            <div className="text-3xl font-bold">{streak}</div>
            <div className="text-sm opacity-90">дней подряд</div>
          </div>
        </div>
        <Progress value={(streak / 30) * 100} className="h-2 bg-white/30" />
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <Icon name="Target" size={32} />
          <div className="text-right">
            <div className="text-3xl font-bold">{Math.round(totalProgress)}%</div>
            <div className="text-sm opacity-90">выполнено сегодня</div>
          </div>
        </div>
        <Progress value={totalProgress} className="h-2 bg-white/30" />
      </Card>

      <Card className="p-6 bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <Icon name="Trophy" size={32} />
          <div className="text-right">
            <div className="text-3xl font-bold">{unlockedAchievements}</div>
            <div className="text-sm opacity-90">достижений</div>
          </div>
        </div>
        <Progress value={(unlockedAchievements / totalAchievements) * 100} className="h-2 bg-white/30" />
      </Card>
    </div>
  );
};

export default StatsCards;
