import React from 'react';
import { useModalContext } from '../../contexts/ModalContext';
import LoginModalContent from '../../features/auth/components/LoginModalContent';
import PersonalSettingsModalContent from '../../features/auth/components/PersonalSettingsModalContent';
import Modal from './Modal';
import DeleteConfirmModalContent from '../../features/posts/components/DeleteConfirmModalContent';

const GlobalModal: React.FC = () => {
  const { modalType, closeModal } = useModalContext();

  return (
    <Modal isOpen={modalType !== 'none'} onClose={closeModal}>
      {modalType === 'login' && (
        <LoginModalContent 
          onClose={closeModal}
          onLoginSuccess={(user) => console.log('로그인 성공:', user)}
        />
      )}
      {modalType === 'settings' && (
        <PersonalSettingsModalContent
          onClose={closeModal}
          onLogout={() => console.log('로그아웃')}
          currentProfile={{ name: '이유승', intro: '안녕하세요', avatarUrl: '/path/to/avatar.jpg' }}
          onUpdateProfile={(newProfile) => console.log('프로필 업데이트:', newProfile)}
        />
      )}
      {modalType === 'delete-series' && (
        <DeleteConfirmModalContent
          onClose={closeModal}
          onConfirm={() => {
            console.log('시리즈 삭제 완료');
            closeModal();
          }}
          targetName="시리즈"
        />
      )}
      {modalType === 'delete-post' && ( 
        <DeleteConfirmModalContent
          onClose={closeModal}
          onConfirm={() => {
            console.log('글 삭제 완료');
            closeModal();
          }}
          targetName="글"
        />
      )}
    </Modal>
  );
};

export default GlobalModal;