import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
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

  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(12);
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
                <div className="text-3xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
                <div className="text-sm opacity-90">достижений</div>
              </div>
            </div>
            <Progress value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} className="h-2 bg-white/30" />
          </Card>
        </div>

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
            {goals.map((goal, index) => {
              const progress = calculateProgress(goal.current, goal.target);
              return (
                <Card 
                  key={goal.id} 
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
                        onClick={() => deleteGoal(goal.id)}
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
                      onClick={() => updateGoalProgress(goal.id, -Math.ceil(goal.target * 0.1))}
                      disabled={goal.current === 0}
                    >
                      <Icon name="Minus" size={16} className="mr-1" />
                      -{Math.ceil(goal.target * 0.1)}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, Math.ceil(goal.target * 0.1))}
                      disabled={goal.current >= goal.target}
                      className="flex-1"
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      +{Math.ceil(goal.target * 0.1)}
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, goal.target - goal.current)}
                      disabled={goal.current >= goal.target}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Icon name="CheckCheck" size={16} className="mr-1" />
                      Выполнить
                    </Button>
                  </div>
                </Card>
              );
            })}
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full h-12 text-base" size="lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить новую цель
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Создать новую цель</DialogTitle>
                  <DialogDescription>
                    Добавь цель и отслеживай свой прогресс ежедневно
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Название цели</Label>
                    <Input
                      id="name"
                      placeholder="Например: Шаги"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="icon">Иконка</Label>
                    <Select value={newGoal.icon} onValueChange={(value) => setNewGoal({ ...newGoal, icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Footprints">👣 Шаги</SelectItem>
                        <SelectItem value="BookOpen">📖 Чтение</SelectItem>
                        <SelectItem value="Droplets">💧 Вода</SelectItem>
                        <SelectItem value="Dumbbell">💪 Тренировка</SelectItem>
                        <SelectItem value="Moon">🌙 Сон</SelectItem>
                        <SelectItem value="Apple">🍎 Питание</SelectItem>
                        <SelectItem value="Brain">🧠 Медитация</SelectItem>
                        <SelectItem value="Target">🎯 Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="target">Целевое значение: {newGoal.target}</Label>
                    <Slider
                      value={[newGoal.target]}
                      onValueChange={(value) => setNewGoal({ ...newGoal, target: value[0] })}
                      min={10}
                      max={10000}
                      step={10}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Единица измерения</Label>
                    <Input
                      id="unit"
                      placeholder="Например: шагов, страниц, минут"
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Цвет</Label>
                    <Select value={newGoal.color} onValueChange={(value) => setNewGoal({ ...newGoal, color: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="from-purple-500 to-pink-500">🟣 Фиолетовый → Розовый</SelectItem>
                        <SelectItem value="from-blue-500 to-cyan-500">🔵 Синий → Голубой</SelectItem>
                        <SelectItem value="from-orange-500 to-amber-500">🟠 Оранжевый → Жёлтый</SelectItem>
                        <SelectItem value="from-green-500 to-emerald-500">🟢 Зелёный → Изумрудный</SelectItem>
                        <SelectItem value="from-red-500 to-rose-500">🔴 Красный → Розовый</SelectItem>
                        <SelectItem value="from-indigo-500 to-purple-500">🟣 Индиго → Фиолетовый</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addGoal} className="w-full">
                    <Icon name="Check" size={18} className="mr-2" />
                    Создать цель
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="apps" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {blockedApps.map((app, index) => (
                <Card 
                  key={app.id}
                  className={cn(
                    "p-6 text-center transition-all hover:scale-105 animate-scale-in cursor-pointer",
                    app.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => toggleAppLock(app.id)}
                >
                  <div className="text-5xl mb-3">{app.icon}</div>
                  <h4 className="font-semibold mb-2">{app.name}</h4>
                  {app.unlocked ? (
                    <Badge className="bg-green-500">
                      <Icon name="Unlock" size={14} className="mr-1" />
                      Разблокировано
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Icon name="Lock" size={14} className="mr-1" />
                      Заблокировано
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
            <Card className="mt-6 p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={24} className="text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Как разблокировать приложения?</h3>
                  <p className="text-sm text-muted-foreground">
                    Выполни все дневные цели, чтобы получить доступ к заблокированным приложениям. 
                    Чем больше целей выполнишь — тем больше времени получишь!
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
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
          </TabsContent>

          <TabsContent value="stats" className="mt-6 space-y-4">
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
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
};

export default Index;