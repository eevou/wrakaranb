import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { User } from "@/types";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSubmit: (data: Omit<User, "id" | "createdAt">) => Promise<void>;
}

const EMPTY = { name: "", email: "", role: "user" as User["role"], isActive: true, avatar: "" };

export function UserFormDialog({ open, onOpenChange, user, onSubmit }: UserFormDialogProps) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<typeof EMPTY & { email: string }>>({});
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = !!user;

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, role: user.role, isActive: user.isActive, avatar: user.avatar ?? "" });
    else setForm(EMPTY);
    setErrors({});
  }, [user, open]);

  const set = (field: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.email) errs.email = "البريد مطلوب";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "صيغة غير صحيحة";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSubmit(form);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "تعديل المستخدم" : "إضافة مستخدم جديد"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2" noValidate>
          <div className="space-y-1.5">
            <Label>الاسم الكامل</Label>
            <Input value={form.name} onChange={set("name")} disabled={isLoading} className={errors.name ? "border-destructive" : ""} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>البريد الإلكتروني</Label>
            <Input dir="ltr" type="email" value={form.email} onChange={set("email")} disabled={isLoading} className={errors.email ? "border-destructive" : ""} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>الدور</Label>
            <Select value={form.role} onValueChange={(v) => setForm((p) => ({ ...p, role: v as User["role"] }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="manager">مشرف</SelectItem>
                <SelectItem value="user">مستخدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <><Loader2 size={14} className="animate-spin ml-1.5" /> جارٍ الحفظ...</> : isEdit ? "حفظ التعديلات" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
