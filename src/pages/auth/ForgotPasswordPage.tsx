import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowRight } from "lucide-react";
import { simulateDelay } from "@/data/mockData";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError("أدخل بريداً إلكترونياً صحيحاً"); return; }
    setError("");
    setIsLoading(true);
    // TODO: await authService.forgotPassword(email)
    await simulateDelay(1000);
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">نسيت كلمة المرور؟</h1>
          <p className="text-muted-foreground mt-2 text-sm">سنرسل لك رابط إعادة تعيين كلمة المرور</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm space-y-5">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                <span className="text-2xl">📧</span>
              </div>
              <p className="font-medium">تم الإرسال!</p>
              <p className="text-sm text-muted-foreground">تحقق من بريدك الإلكتروني <span className="font-medium text-foreground">{email}</span></p>
              <Link to="/login">
                <Button variant="outline" className="gap-2 mt-2"><ArrowRight size={16} /> العودة لتسجيل الدخول</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <div className="space-y-1.5">
                <Label>البريد الإلكتروني</Label>
                <Input dir="ltr" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <><Loader2 size={16} className="animate-spin ml-2" /> جارٍ الإرسال...</> : "إرسال رابط الإعادة"}
              </Button>
              <div className="text-center">
                <Link to="/login" className="text-sm text-primary hover:underline">العودة لتسجيل الدخول</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
