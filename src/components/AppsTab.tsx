import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BlockedApp {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
}

interface AppsTabProps {
  blockedApps: BlockedApp[];
  onToggleAppLock: (appId: string) => void;
}

const AppsTab = ({ blockedApps, onToggleAppLock }: AppsTabProps) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blockedApps.map((app, index) => (
          <Card 
            key={app.id}
            className={cn(
              "p-6 text-center transition-all hover:scale-105 animate-scale-in cursor-pointer",
              app.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onToggleAppLock(app.id)}
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
    </div>
  );
};

export default AppsTab;
