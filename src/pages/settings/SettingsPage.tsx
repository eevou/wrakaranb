import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/store/authContext";
import { simulateDelay } from "@/data/mockData";

export default function SettingsPage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({ name: user?.name ?? "", email: user?.email ?? "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwErrors, setPwErrors] = useState<Partial<typeof passwords>>({});

  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    // TODO: await usersService.update(user.id, profile)
    await simulateDelay(800);
    setProfileLoading(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof pwErrors = {};
    if (!passwords.current) errs.current = "مطلوب";
    if (!passwords.next || passwords.next.length < 6) errs.next = "6 أحرف على الأقل";
    if (passwords.next !== passwords.confirm) errs.confirm = "كلمتا المرور غير متطابقتان";
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setPwLoading(true);
    // TODO: await authService.changePassword(passwords)
    await simulateDelay(800);
    setPwLoading(false);
    setPasswords({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="max-w-2xl space-y-8" dir="rtl">
      <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>

      {/* Profile */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">الملف الشخصي</h2>
        <Separator />
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label>الاسم الكامل</Label>
            <Input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} disabled={profileLoading} />
          </div>
          <div className="space-y-1.5">
            <Label>البريد الإلكتروني</Label>
            <Input dir="ltr" type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} disabled={profileLoading} />
          </div>
          <Button type="submit" disabled={profileLoading} className="gap-2">
            {profileLoading ? <><Loader2 size={14} className="animate-spin" /> جارٍ الحفظ...</> :
             profileSaved  ? <><Check size={14} /> تم الحفظ</> : "حفظ التغييرات"}
          </Button>
        </form>
      </section>

      {/* Password */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">تغيير كلمة المرور</h2>
        <Separator />
        <form onSubmit={handlePasswordChange} className="space-y-4" noValidate>
          {(["current", "next", "confirm"] as const).map((field) => (
            <div key={field} className="space-y-1.5">
              <Label>{{ current: "كلمة المرور الحالية", next: "كلمة المرور الجديدة", confirm: "تأكيد كلمة المرور الجديدة" }[field]}</Label>
              <Input dir="ltr" type="password" value={passwords[field]} onChange={(e) => setPasswords((p) => ({ ...p, [field]: e.target.value }))} className={pwErrors[field] ? "border-destructive" : ""} disabled={pwLoading} />
              {pwErrors[field] && <p className="text-xs text-destructive">{pwErrors[field]}</p>}
            </div>
          ))}
          <Button type="submit" variant="outline" disabled={pwLoading}>
            {pwLoading ? <><Loader2 size={14} className="animate-spin ml-1.5" /> جارٍ التحديث...</> : "تحديث كلمة المرور"}
          </Button>
        </form>
      </section>

      {/* Notifications prefs */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-foreground">تفضيلات الإشعارات</h2>
        <Separator />
        <div className="space-y-4">
          {([
            { key: "email", label: "إشعارات البريد الإلكتروني", desc: "استقبال إشعارات عبر البريد" },
            { key: "push",  label: "إشعارات الدفع",             desc: "إشعارات المتصفح الفورية" },
            { key: "weekly",label: "التقرير الأسبوعي",          desc: "ملخص أسبوعي بالنشاطات" },
          ] as const).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={notifications[key]}
                onCheckedChange={(v) => {
                  setNotifications((p) => ({ ...p, [key]: v }));
                  // TODO: await preferencesService.update({ [key]: v })
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
