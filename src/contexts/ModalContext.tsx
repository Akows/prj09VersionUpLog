import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ModalType = 'none' | 'login' | 'settings' | 'delete-series' | 'delete-post';

interface ModalContextProps {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalType, setModalType] = useState<ModalType>('none');

  const openModal = useCallback((type: ModalType) => setModalType(type), []);
  const closeModal = useCallback(() => setModalType('none'), []);

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
