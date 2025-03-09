import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginModalContentProps {
  onClose: () => void;
}

const LoginModalContent: React.FC<LoginModalContentProps> = ({ onClose }) => {
  const [email, setEmail] = useState('admin@admin.ad');
  const [password, setPassword] = useState('admin');
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();

  const handleLogin = async () => {
    const { error } = await login(email, password);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    onClose();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <label className="block mb-2">이메일</label>
      <input
        type="text"
        className="w-full mb-4 p-2 border border-[var(--color-border)] rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block mb-2">비밀번호</label>
      <input
        type="password"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <p className="mb-4 text-red-500">{errorMsg}</p>}
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-3 py-1 border rounded">
          취소
        </button>
        <button onClick={handleLogin} className="px-3 py-1 bg-[var(--color-primary)] text-white rounded">
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginModalContent;
