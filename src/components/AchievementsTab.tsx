import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

interface AchievementsTabProps {
  achievements: Achievement[];
}

const AchievementsTab = ({ achievements }: AchievementsTabProps) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <Card 
            key={achievement.id}
            className={cn(
              "p-6 text-center transition-all hover:scale-105 animate-fade-in",
              achievement.unlocked 
                ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" 
                : "bg-gray-50 border-gray-200 opacity-60"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Icon 
              name={achievement.icon as any} 
              size={48} 
              className={cn(
                "mx-auto mb-3",
                achievement.unlocked ? "text-yellow-500" : "text-gray-400"
              )}
            />
            <h4 className="font-semibold mb-2">{achievement.name}</h4>
            <p className="text-xs text-muted-foreground mb-3">{achievement.description}</p>
            {achievement.unlocked && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                <Icon name="Check" size={14} className="mr-1" />
                Получено
              </Badge>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsTab;
