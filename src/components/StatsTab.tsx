import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  name: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

interface StatsTabProps {
  goals: Goal[];
  calculateProgress: (current: number, target: number) => number;
}

const StatsTab = ({ goals, calculateProgress }: StatsTabProps) => {
  return (
    <div className="mt-6 space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Calendar" size={20} />
          Календарь активности
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, i) => {
            const hasActivity = Math.random() > 0.3;
            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-lg transition-colors",
                  hasActivity 
                    ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                    : "bg-gray-200"
                )}
                title={`День ${i + 1}`}
              />
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Недельный прогресс
          </h3>
          <div className="space-y-3">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => {
              const progress = Math.floor(Math.random() * 100);
              return (
                <div key={day}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{day}</span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Zap" size={20} />
            Топ целей
          </h3>
          <div className="space-y-4">
            {goals.map((goal, i) => (
              <div key={goal.id} className="flex items-center gap-3">
                <div className="text-2xl font-bold text-muted-foreground">#{i + 1}</div>
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", goal.color)}>
                  <Icon name={goal.icon as any} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(calculateProgress(goal.current, goal.target))}% выполнено
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-1">Отличная работа! 🎉</h3>
            <p className="text-green-600">Ты выполнил 65% целей за эту неделю</p>
          </div>
          <Icon name="PartyPopper" size={48} className="text-green-500" />
        </div>
      </Card>
    </div>
  );
};

export default StatsTab;
