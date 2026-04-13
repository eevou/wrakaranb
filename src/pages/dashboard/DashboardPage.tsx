import { Users, UserCheck, TrendingUp, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatsCard } from "@/components/common/StatsCard";
import { useAuth } from "@/store/authContext";
import { MOCK_STATS, MOCK_CHART_DATA, MOCK_USERS } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6" dir="rtl">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">مرحباً، {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">إليك ملخص نشاط المنصة اليوم</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="إجمالي المستخدمين"
          value={MOCK_STATS.totalUsers.toLocaleString("ar-SA")}
          icon={Users}
          trend={{ value: MOCK_STATS.growthPercent, label: "هذا الشهر" }}
        />
        <StatsCard
          title="المستخدمون النشطون"
          value={MOCK_STATS.activeUsers.toLocaleString("ar-SA")}
          icon={UserCheck}
          subtitle={`${Math.round((MOCK_STATS.activeUsers / MOCK_STATS.totalUsers) * 100)}% من الإجمالي`}
        />
        <StatsCard
          title="إجمالي الإيرادات"
          value={formatCurrency(MOCK_STATS.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 8.2, label: "مقارنة بالشهر الماضي" }}
        />
        <StatsCard
          title="معدل النمو"
          value={`${MOCK_STATS.growthPercent}%`}
          icon={TrendingUp}
          trend={{ value: 3.1, label: "مقارنة بالشهر الماضي" }}
        />
      </div>

      {/* Chart + Recent Users */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold text-foreground mb-4">نمو المستخدمين والإيرادات</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MOCK_CHART_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="users" name="المستخدمون" stroke="hsl(var(--primary))" fill="url(#colorUsers)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent users */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold text-foreground mb-4">آخر المستخدمين</h2>
          <div className="space-y-3">
            {MOCK_USERS.slice(0, 5).map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={u.avatar} />
                  <AvatarFallback className="text-xs">{u.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(u.createdAt)}</p>
                </div>
                <Badge variant={u.isActive ? "default" : "secondary"} className="text-xs shrink-0">
                  {u.isActive ? "نشط" : "غير نشط"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
