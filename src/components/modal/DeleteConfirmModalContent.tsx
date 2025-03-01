import React from 'react';

interface DeleteConfirmModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  targetName?: string; // "글" or "시리즈" 등
}

const DeleteConfirmModalContent: React.FC<DeleteConfirmModalContentProps> = ({
  onClose,
  onConfirm,
  targetName = '글',
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{targetName} 삭제</h2>
      <p className="mb-4 text-gray-600">
        정말 {targetName}을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </p>
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-3 py-1 border rounded">
          취소
        </button>
        <button onClick={onConfirm} className="px-3 py-1 bg-red-500 text-white rounded">
          삭제
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModalContent;
