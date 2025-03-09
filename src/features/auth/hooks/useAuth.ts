import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface AuthHook {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ data: any; error: any }>;
  logout: () => Promise<{ error: any }>;
}

export function useAuth(): AuthHook {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. 초기 세션 가져오기 (getSession은 Promise를 반환)
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    fetchSession();

    // 2. 인증 상태 변경 이벤트 구독 (onAuthStateChange)
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    const subscription = data.subscription;

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 로그인 상태 유지 여부를 판별하기 위한 코드
  // 기능 완성 후 삭제할 것!
  // 유저 정보가 콘솔에 모두 노출됨!!
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  // 3. 로그인 기능 (signInWithPassword 사용)
  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setUser(data?.user ?? null);
    setSession(data?.session ?? null);
    setLoading(false);
    return { data, error };
  };

  // 4. 로그아웃 기능
  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setLoading(false);
    return { error };
  };

  return { user, session, loading, login, logout };
}
