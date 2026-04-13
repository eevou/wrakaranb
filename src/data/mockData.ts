import type { User, Notification, DashboardStats } from "@/types";

// ─── Mock Users ───────────────────────────────────────────────────────────────
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "أحمد المطيري",
    email: "ahmed@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
    createdAt: "2024-01-10T08:00:00Z",
    isActive: true,
  },
  {
    id: "2",
    name: "سارة الغامدي",
    email: "sara@example.com",
    role: "manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
    createdAt: "2024-02-15T10:30:00Z",
    isActive: true,
  },
  {
    id: "3",
    name: "خالد العتيبي",
    email: "khalid@example.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=khalid",
    createdAt: "2024-03-20T14:00:00Z",
    isActive: false,
  },
  {
    id: "4",
    name: "نورة الشمري",
    email: "noura@example.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noura",
    createdAt: "2024-04-05T09:15:00Z",
    isActive: true,
  },
  {
    id: "5",
    name: "فهد الدوسري",
    email: "fahad@example.com",
    role: "manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fahad",
    createdAt: "2024-05-12T11:45:00Z",
    isActive: true,
  },
];

// ─── Mock Logged-in User ──────────────────────────────────────────────────────
export const MOCK_CURRENT_USER: User = MOCK_USERS[0];

// ─── Mock Dashboard Stats ─────────────────────────────────────────────────────
export const MOCK_STATS: DashboardStats = {
  totalUsers: 1284,
  activeUsers: 947,
  totalRevenue: 482300,
  growthPercent: 12.5,
};

// ─── Mock Notifications ───────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "مستخدم جديد",
    message: "انضم مستخدم جديد للمنصة",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "n2",
    title: "تم الحفظ",
    message: "تم حفظ التغييرات بنجاح",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: "n3",
    title: "تحذير",
    message: "اقتربت من الحد الأقصى للتخزين",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
];

// ─── Mock Chart Data ──────────────────────────────────────────────────────────
export const MOCK_CHART_DATA = [
  { month: "يناير", users: 400, revenue: 24000 },
  { month: "فبراير", users: 520, revenue: 31200 },
  { month: "مارس", users: 610, revenue: 36600 },
  { month: "أبريل", users: 580, revenue: 34800 },
  { month: "مايو", users: 720, revenue: 43200 },
  { month: "يونيو", users: 890, revenue: 53400 },
  { month: "يوليو", users: 950, revenue: 57000 },
];

// ─── Simulate async API delay ─────────────────────────────────────────────────
export const simulateDelay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));
