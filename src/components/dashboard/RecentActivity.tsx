import { motion } from 'framer-motion';
import { CheckCircle2, PlusCircle, Edit, MessageSquare, Upload } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const activities = [
  { id: 1, user: 'Alex Rivera', avatar: 'AR', action: 'completed task', target: 'API client setup', time: '2 hours ago', icon: CheckCircle2, iconColor: 'text-status-completed' },
  { id: 2, user: 'Jordan Lee', avatar: 'JL', action: 'created task', target: 'Push notifications', time: '3 hours ago', icon: PlusCircle, iconColor: 'text-primary' },
  { id: 3, user: 'Emily Davis', avatar: 'ED', action: 'updated project', target: 'Website Redesign', time: '5 hours ago', icon: Edit, iconColor: 'text-status-on-hold' },
  { id: 4, user: 'Casey Morgan', avatar: 'CM', action: 'commented on', target: 'Design homepage mockups', time: '6 hours ago', icon: MessageSquare, iconColor: 'text-accent' },
  { id: 5, user: 'Taylor Swift', avatar: 'TS', action: 'uploaded file to', target: 'Brand Guidelines', time: '1 day ago', icon: Upload, iconColor: 'text-muted-foreground' },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl p-6 shadow-sm border border-border"
    >
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            className="flex items-start gap-3"
          >
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {activity.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                <span className="text-muted-foreground"> {activity.action} </span>
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
            <activity.icon size={16} className={activity.iconColor} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
