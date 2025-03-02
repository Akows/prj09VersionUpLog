import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 (반투명) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-10"
        onClick={onClose}
      />
      {/* 실제 모달 박스 */}
      <div className="relative z-10 bg-[var(--color-bg)] rounded shadow-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;