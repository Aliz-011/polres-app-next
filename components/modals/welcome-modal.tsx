'use client';

// custom hooks
import { useWelcomeModal } from '@/hooks/use-welcome-modal';

// components
import { Modal } from '../ui/modal';
import { Separator } from '../ui/separator';

const WelcomeModal = () => {
  const { isOpen, onClose } = useWelcomeModal();

  const builts = [
    {
      name: 'Next.js',
      img: '/nextjs.png',
    },
    {
      name: 'Tailwind',
      img: '/tailwind.png',
    },
    {
      name: 'TypeScript',
      img: 'typescript.png',
    },
    {
      name: 'Radix',
      img: 'radix.jpg',
    },
    {
      name: 'MySQL',
      img: 'mysql.png',
    },
  ];

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome Back!"
      description="Get started on managing your organizational data efficiently! Your central platform for handling organizational data. Manage your data to enhance organizational efficiency. Seamlessly handle and utilize your data resources."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Separator />
      <h3 className="text-gray-500 text-sm font-semibold mt-3">Built with:</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-between gap-y-4 pt-2 w-full">
        {builts.map((item) => (
          <div
            className="flex items-center justify-center gap-x-2"
            key={item.name}
          >
            <img src={item.img} alt={item.name} className="w-6 h-6" />
            <p className="text-sm font-medium text-gray-500">{item.name}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default WelcomeModal;
