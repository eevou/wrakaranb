# Frontend Project — جاهز للربط بـ .NET Backend

مشروع React + TypeScript + Tailwind CSS + shadcn/ui  
يعمل بشكل كامل بـ **Mock Data** ويمكن ربطه بـ .NET API بسهولة.

---

## 🚀 تشغيل المشروع

```bash
# تثبيت الاعتماديات
npm install

# تشغيل بيئة التطوير
npm run dev

# بناء للإنتاج
npm run build
```

---

## 🗂️ هيكل المشروع

```
src/
├── api/
│   ├── client.ts          ← إعدادات Axios + الـ endpoints
│   ├── endpoints.ts       ← جميع مسارات الـ API
│   └── authService.ts     ← خدمات المصادقة (جاهزة للربط)
│
├── components/
│   ├── common/            ← مكونات مشتركة (StatsCard, ConfirmDeleteDialog)
│   ├── forms/             ← نماذج البيانات (UserFormDialog)
│   └── layout/            ← AppLayout, ProtectedRoute
│
├── data/
│   └── mockData.ts        ← بيانات وهمية (تُحذف عند الربط بالـ backend)
│
├── hooks/
│   └── useUsers.ts        ← Hook كامل لإدارة المستخدمين مع CRUD
│
├── pages/
│   ├── auth/              ← Login, Register, ForgotPassword
│   ├── dashboard/         ← الصفحة الرئيسية مع إحصائيات وشارت
│   ├── notifications/     ← صفحة الإشعارات
│   ├── settings/          ← الإعدادات الشخصية
│   └── users/             ← إدارة المستخدمين (جدول + CRUD كامل)
│
├── store/
│   ├── authContext.tsx     ← إدارة حالة المصادقة
│   └── notificationsContext.tsx
│
└── types/
    └── index.ts           ← جميع أنواع TypeScript
```

---

## 🔐 بيانات الدخول التجريبية

| البريد الإلكتروني | كلمة المرور |
|---|---|
| ahmed@example.com | password123 |

---

## 🔌 ربط الـ .NET Backend

### الخطوة 1 — ضبط الـ URL

```bash
# أنشئ ملف .env.local
VITE_API_BASE_URL=https://localhost:7001/api
```

### الخطوة 2 — استبدال Mock بـ Axios

في كل `hook` أو `service`، ابحث عن تعليق `TODO:` وفعّل السطر الحقيقي:

```typescript
// قبل (mock):
await simulateDelay(800);
setUsers([...MOCK_USERS]);

// بعد (real):
const res = await axios.get(ENDPOINTS.USERS.LIST);
setUsers(res.data.data);
```

### الخطوة 3 — JWT Authentication

الـ `authContext.tsx` يحفظ الـ token في `localStorage` تلقائياً.  
الـ `client.ts` يرفق الـ token في كل request تلقائياً.

### الخطوة 4 — CORS في .NET

```csharp
// Program.cs
builder.Services.AddCors(options => {
    options.AddPolicy("Frontend", policy => {
        policy.WithOrigins("http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
app.UseCors("Frontend");
```

---

## ✅ الميزات المنجزة

- [x] تسجيل الدخول مع validation كامل
- [x] تسجيل مستخدم جديد
- [x] نسيت كلمة المرور
- [x] حماية الصفحات (Protected Routes)
- [x] لوحة تحكم مع إحصائيات وشارت
- [x] إدارة المستخدمين (عرض، إضافة، تعديل، حذف، تفعيل/تعطيل)
- [x] بحث في المستخدمين
- [x] إشعارات مع تعليم كمقروء
- [x] صفحة إعدادات مع حفظ حقيقي
- [x] Loading states في كل العمليات
- [x] Error states مع رسائل واضحة
- [x] Sidebar مع Navigation فعّال
- [x] دعم RTL (عربي) كامل
- [x] Responsive (موبايل + ديسكتوب)
