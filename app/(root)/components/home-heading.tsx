'use client';
import { useUploadModal } from '@/hooks/use-upload-modal';
// custome hooks
import { useWelcomeModal } from '@/hooks/use-welcome-modal';

// react/library hooks
import { useEffect } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

function HomeHeading({ data }: { data: any }) {
  const uploadModal = useUploadModal();
  const toggleModal = () => {
    uploadModal.onOpen();
  };

  const onOpen = useWelcomeModal((state) => state.onOpen);
  const isOpen = useWelcomeModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, []);
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title="Overview"
          description="Your app all-time overview"
          total={data.length}
        />
        <Button onClick={toggleModal} className="space-x-2" size="sm">
          <PlusIcon className="h-4 w-4" />
          <span>Tambah data</span>
        </Button>
      </div>
    </>
  );
}

export default HomeHeading;
