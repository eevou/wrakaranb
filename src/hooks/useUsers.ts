import { useState, useCallback } from "react";
import type { User } from "@/types";
import { MOCK_USERS, simulateDelay } from "@/data/mockData";

export function useUsers() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: const res = await axios.get(ENDPOINTS.USERS.LIST); setUsers(res.data.data);
      await simulateDelay(600);
      setUsers([...MOCK_USERS]);
    } catch {
      setError("فشل في تحميل المستخدمين");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: Omit<User, "id" | "createdAt">) => {
    setIsLoading(true);
    try {
      // TODO: const res = await axios.post(ENDPOINTS.USERS.CREATE, data); setUsers(prev => [...prev, res.data]);
      await simulateDelay(800);
      const newUser: User = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
      setUsers((prev) => [newUser, ...prev]);
      return newUser;
    } catch {
      setError("فشل في إنشاء المستخدم");
      throw new Error("فشل في إنشاء المستخدم");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, data: Partial<User>) => {
    setIsLoading(true);
    try {
      // TODO: const res = await axios.put(ENDPOINTS.USERS.UPDATE(id), data);
      await simulateDelay(700);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    } catch {
      setError("فشل في تحديث المستخدم");
      throw new Error("فشل في تحديث المستخدم");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // TODO: await axios.delete(ENDPOINTS.USERS.DELETE(id));
      await simulateDelay(500);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      setError("فشل في حذف المستخدم");
      throw new Error("فشل في حذف المستخدم");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleActive = useCallback(async (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) await updateUser(id, { isActive: !user.isActive });
  }, [users, updateUser]);

  return { users, isLoading, error, fetchUsers, createUser, updateUser, deleteUser, toggleActive };
}
