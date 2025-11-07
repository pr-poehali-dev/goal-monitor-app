import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';
import StatsCards from '@/components/StatsCards';
import GoalCard from '@/components/GoalCard';
import AddGoalDialog from '@/components/AddGoalDialog';
import AppsTab from '@/components/AppsTab';
import AchievementsTab from '@/components/AchievementsTab';
import StatsTab from '@/components/StatsTab';

interface Goal {
  id: string;
  name: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

interface BlockedApp {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

const Index = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Шаги',
      icon: 'Footprints',
      current: 6542,
      target: 10000,
      unit: 'шагов',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '2',
      name: 'Чтение',
      icon: 'BookOpen',
      current: 12,
      target: 20,
      unit: 'страниц',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '3',
      name: 'Вода',
      icon: 'Droplets',
      current: 5,
      target: 8,
      unit: 'стаканов',
      color: 'from-orange-500 to-amber-500',
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', name: 'Первый шаг', icon: 'Award', unlocked: true, description: 'Выполни первую цель' },
    { id: '2', name: 'Неделя силы', icon: 'Flame', unlocked: true, description: '7 дней подряд' },
    { id: '3', name: 'Марафонец', icon: 'Trophy', unlocked: false, description: '30 дней подряд' },
    { id: '4', name: 'Читатель', icon: 'BookMarked', unlocked: true, description: '100 страниц прочитано' },
    { id: '5', name: 'Гидратация', icon: 'Droplet', unlocked: false, description: '7 дней по 8 стаканов' },
    { id: '6', name: 'Легенда', icon: 'Crown', unlocked: false, description: '100 дней подряд' },
  ]);

  const [blockedApps, setBlockedApps] = useState<BlockedApp[]>([
    { id: '1', name: 'Instagram', icon: '📸', unlocked: false },
    { id: '2', name: 'YouTube', icon: '▶️', unlocked: true },
    { id: '3', name: 'TikTok', icon: '🎵', unlocked: false },
    { id: '4', name: 'Telegram', icon: '✈️', unlocked: true },
  ]);

  const [streak] = useState(7);
  const [level] = useState(12);
  const [xp, setXp] = useState(2450);
  const [xpToNext] = useState(3000);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', icon: 'Target', target: 100, unit: '', color: 'from-purple-500 to-pink-500' });

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const totalProgress = goals.reduce((acc, goal) => acc + calculateProgress(goal.current, goal.target), 0) / goals.length;

  const updateGoalProgress = (goalId: string, change: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.max(0, Math.min(goal.target, goal.current + change));
        const wasCompleted = goal.current >= goal.target;
        const isNowCompleted = newCurrent >= goal.target;
        
        if (!wasCompleted && isNowCompleted) {
          setXp(prev => prev + 100);
          toast({ title: '🎉 Цель выполнена!', description: `+100 XP за ${goal.name}` });
          checkAchievements();
        }
        
        return { ...goal, current: newCurrent };
      }
      return goal;
    }));
  };

  const addGoal = () => {
    if (!newGoal.name || !newGoal.unit) {
      toast({ title: 'Ошибка', description: 'Заполни все поля', variant: 'destructive' });
      return;
    }
    
    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      icon: newGoal.icon,
      current: 0,
      target: newGoal.target,
      unit: newGoal.unit,
      color: newGoal.color
    };
    
    setGoals([...goals, goal]);
    setNewGoal({ name: '', icon: 'Target', target: 100, unit: '', color: 'from-purple-500 to-pink-500' });
    setIsDialogOpen(false);
    toast({ title: '✅ Цель добавлена!', description: `${goal.name} создана` });
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
    toast({ title: '🗑️ Цель удалена' });
  };

  const checkAchievements = () => {
    const completedGoals = goals.filter(g => g.current >= g.target).length;
    if (completedGoals >= goals.length && goals.length > 0) {
      setAchievements(prev => prev.map(a => 
        a.id === '1' ? { ...a, unlocked: true } : a
      ));
    }
  };

  const toggleAppLock = (appId: string) => {
    setBlockedApps(blockedApps.map(app => 
      app.id === appId ? { ...app, unlocked: !app.unlocked } : app
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        
        <header className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FocusQuest
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Прокачивай себя каждый день 🚀</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">Ур. {level}</div>
              <div className="text-xs text-muted-foreground">{xp}/{xpToNext} XP</div>
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </header>

        <StatsCards 
          streak={streak}
          totalProgress={totalProgress}
          unlockedAchievements={achievements.filter(a => a.unlocked).length}
          totalAchievements={achievements.length}
        />

        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="goals" className="gap-2">
              <Icon name="Target" size={16} />
              <span className="hidden sm:inline">Цели</span>
            </TabsTrigger>
            <TabsTrigger value="apps" className="gap-2">
              <Icon name="Lock" size={16} />
              <span className="hidden sm:inline">Приложения</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Icon name="Award" size={16} />
              <span className="hidden sm:inline">Награды</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={16} />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-4 mt-6">
            {goals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                index={index}
                onUpdateProgress={updateGoalProgress}
                onDelete={deleteGoal}
                calculateProgress={calculateProgress}
              />
            ))}
            
            <AddGoalDialog
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              newGoal={newGoal}
              onNewGoalChange={setNewGoal}
              onAddGoal={addGoal}
            />
          </TabsContent>

          <TabsContent value="apps">
            <AppsTab
              blockedApps={blockedApps}
              onToggleAppLock={toggleAppLock}
            />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsTab achievements={achievements} />
          </TabsContent>

          <TabsContent value="stats">
            <StatsTab
              goals={goals}
              calculateProgress={calculateProgress}
            />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default Index;
