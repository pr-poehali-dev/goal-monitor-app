import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
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

interface GoalCardProps {
  goal: Goal;
  index: number;
  onUpdateProgress: (goalId: string, change: number) => void;
  onDelete: (goalId: string) => void;
  calculateProgress: (current: number, target: number) => number;
}

const GoalCard = ({ goal, index, onUpdateProgress, onDelete, calculateProgress }: GoalCardProps) => {
  const progress = calculateProgress(goal.current, goal.target);
  
  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className={cn("p-3 rounded-2xl bg-gradient-to-br", goal.color)}>
            <Icon name={goal.icon as any} size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{goal.name}</h3>
            <p className="text-sm text-muted-foreground">
              {goal.current} / {goal.target} {goal.unit}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={progress === 100 ? "default" : "secondary"} className="text-lg px-3 py-1">
            {Math.round(progress)}%
          </Badge>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onDelete(goal.id)}
            className="text-destructive hover:text-destructive"
          >
            <Icon name="Trash2" size={18} />
          </Button>
        </div>
      </div>
      <Progress value={progress} className="h-3 mb-4" />
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onUpdateProgress(goal.id, -Math.ceil(goal.target * 0.1))}
          disabled={goal.current === 0}
        >
          <Icon name="Minus" size={16} className="mr-1" />
          -{Math.ceil(goal.target * 0.1)}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onUpdateProgress(goal.id, Math.ceil(goal.target * 0.1))}
          disabled={goal.current >= goal.target}
          className="flex-1"
        >
          <Icon name="Plus" size={16} className="mr-1" />
          +{Math.ceil(goal.target * 0.1)}
        </Button>
        <Button 
          variant="default" 
          size="sm"
          onClick={() => onUpdateProgress(goal.id, goal.target - goal.current)}
          disabled={goal.current >= goal.target}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <Icon name="CheckCheck" size={16} className="mr-1" />
          Выполнить
        </Button>
      </div>
    </Card>
  );
};

export default GoalCard;
