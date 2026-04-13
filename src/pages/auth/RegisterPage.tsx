import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { simulateDelay } from "@/data/mockData";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.email) errs.email = "البريد مطلوب";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "صيغة غير صحيحة";
    if (!form.password) errs.password = "كلمة المرور مطلوبة";
    else if (form.password.length < 6) errs.password = "6 أحرف على الأقل";
    if (form.confirmPassword !== form.password) errs.confirmPassword = "كلمات المرور غير متطابقة";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    // TODO: await authService.register(form)
    await simulateDelay(1000);
    setIsLoading(false);
    setSuccessMsg("تم إنشاء الحساب! جارٍ تحويلك...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">إنشاء حساب</h1>
          <p className="text-muted-foreground mt-2">أنشئ حسابك الجديد</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {successMsg && (
              <Alert className="border-green-500 text-green-700">
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}
            {(["name", "email", "password", "confirmPassword"] as const).map((field) => (
              <div key={field} className="space-y-1.5">
                <Label htmlFor={field}>
                  {{ name: "الاسم الكامل", email: "البريد الإلكتروني", password: "كلمة المرور", confirmPassword: "تأكيد كلمة المرور" }[field]}
                </Label>
                <Input
                  id={field}
                  type={field.toLowerCase().includes("password") ? "password" : field === "email" ? "email" : "text"}
                  dir={field === "name" ? "rtl" : "ltr"}
                  value={form[field]}
                  onChange={set(field)}
                  className={errors[field] ? "border-destructive" : ""}
                  disabled={isLoading}
                />
                {errors[field] && <p className="text-xs text-destructive">{errors[field]}</p>}
              </div>
            ))}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <><Loader2 size={16} className="animate-spin ml-2" /> جارٍ الإنشاء...</> : "إنشاء الحساب"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
