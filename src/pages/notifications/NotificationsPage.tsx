import { Bell, Check, CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/store/notificationsContext";
import { formatRelativeTime, cn } from "@/lib/utils";

const TYPE_COLORS = {
  info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  error:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const TYPE_LABELS = { info: "معلومة", success: "نجاح", warning: "تحذير", error: "خطأ" };

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead, dismiss } = useNotifications();

  return (
    <div className="max-w-2xl space-y-5" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">الإشعارات</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">{unreadCount} إشعار غير مقروء</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
            <CheckCheck size={15} /> تعليم الكل كمقروء
          </Button>
        )}
      </div>

      {/* List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Bell size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">لا توجد إشعارات</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                "bg-card border border-border rounded-xl p-4 flex items-start gap-4 transition-colors",
                !n.read && "border-primary/30 bg-primary/5"
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={cn("text-sm font-semibold", !n.read && "text-foreground")}>{n.title}</p>
                  <Badge className={cn("text-xs h-5", TYPE_COLORS[n.type])} variant="secondary">
                    {TYPE_LABELS[n.type]}
                  </Badge>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary inline-block" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(n.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!n.read && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markRead(n.id)} title="تعليم كمقروء">
                    <Check size={14} />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => dismiss(n.id)} title="إخفاء">
                  <X size={14} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
