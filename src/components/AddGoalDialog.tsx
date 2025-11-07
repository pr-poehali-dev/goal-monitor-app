import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface NewGoal {
  name: string;
  icon: string;
  target: number;
  unit: string;
  color: string;
}

interface AddGoalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newGoal: NewGoal;
  onNewGoalChange: (goal: NewGoal) => void;
  onAddGoal: () => void;
}

const AddGoalDialog = ({ isOpen, onOpenChange, newGoal, onNewGoalChange, onAddGoal }: AddGoalDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => onNewGoalChange({ ...newGoal, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon">Иконка</Label>
            <Select value={newGoal.icon} onValueChange={(value) => onNewGoalChange({ ...newGoal, icon: value })}>
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
              onValueChange={(value) => onNewGoalChange({ ...newGoal, target: value[0] })}
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
              onChange={(e) => onNewGoalChange({ ...newGoal, unit: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Цвет</Label>
            <Select value={newGoal.color} onValueChange={(value) => onNewGoalChange({ ...newGoal, color: value })}>
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
          <Button onClick={onAddGoal} className="w-full">
            <Icon name="Check" size={18} className="mr-2" />
            Создать цель
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
