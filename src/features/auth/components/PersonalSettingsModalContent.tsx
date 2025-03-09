import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface PersonalSettingsModalContentProps {
  onClose: () => void;
  // 예: 로그아웃 핸들러, 프로필 업데이트 핸들러 등
  onLogout: () => void;
  currentProfile: { name: string; intro: string; avatarUrl: string };
  onUpdateProfile: (newProfile: { name: string; intro: string; avatarUrl: string }) => void;
}

const PersonalSettingsModalContent: React.FC<PersonalSettingsModalContentProps> = ({
  onClose,
  onLogout,
  currentProfile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [intro, setIntro] = useState(currentProfile.intro);
  const [avatarUrl, setAvatarUrl] = useState(currentProfile.avatarUrl);
  const [errorMsg, setErrorMsg] = useState('');

  const { logout } = useAuth();

  const handleSave = () => {
    onUpdateProfile({ name, intro, avatarUrl });
    onClose();
  };

  const handleLogout = async () => {
    try {
      const { error } = await logout();
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      // 로그아웃 후 필요한 후속 작업 호출 (예: onLogout prop)
      onLogout();
      onClose();
    } catch (err) {
      console.error("로그아웃 처리 중 에러 발생:", err);
      setErrorMsg("로그아웃 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">개인 설정</h2>
      <label className="block mb-2">이름</label>
      <input
        type="text"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="block mb-2">소개</label>
      <textarea
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />
      <label className="block mb-2">프로필 이미지 URL</label>
      <input
        type="text"
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />

      <div className="flex justify-between">
        <button onClick={handleLogout} className="px-3 py-1 border rounded hover:bg-gray-100">
          로그아웃
        </button>
        <div className="space-x-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            취소
          </button>
          <button onClick={handleSave} className="px-3 py-1 bg-[var(--color-primary)] text-white rounded">
            저장
          </button>
        </div>
      </div>
      {errorMsg && <p className="mb-4 text-red-500">{errorMsg}</p>}
    </div>
  );
};

export default PersonalSettingsModalContent;
