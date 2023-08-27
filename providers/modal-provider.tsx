'use client';

import { useEffect, useState } from 'react';

import WelcomeModal from '@/components/modals/welcome-modal';
import UploadModal from '@/components/modals/upload-modal';
import UpdateModal from '@/components/modals/update-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <WelcomeModal />
      <UploadModal />
      <UpdateModal />
    </>
  );
};
