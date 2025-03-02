import React, { useState } from 'react';

interface LoginModalContentProps {
  onClose: () => void;
  // 로그인 성공 시 동작할 함수 등
  onLoginSuccess: (user: { name: string }) => void;
}

const LoginModalContent: React.FC<LoginModalContentProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 실제로는 API 호출
    console.log('로그인 시도:', email, password);
    onLoginSuccess({ name: '이유승' });
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
