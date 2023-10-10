'use client';

// components
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { Copy, Edit, EyeIcon, Trash } from 'lucide-react';
import { NotaColumn } from './columns';

// hooks
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '@/firebase';
import { useUpdateModal } from '@/hooks/use-update-modal';

const CellAction = ({ data }: { data: NotaColumn }) => {
  const router = useRouter();
  const { onOpen, setId, setData } = useUpdateModal();

  const deleteData = async (id: string) => {
    try {
      await deleteDoc(doc(db, `notaris`, id));
      toast({
        title: `Data telah dihapus`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(data.id);
            toast({
              title: 'Copied the ID',
              description: 'Data ID copied to your clipboard',
            });
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onOpen();
            setId(data.id);
            setData(data);
          }}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/${data.id}`)}>
          <EyeIcon className="h-4 w-4 mr-2" />
          Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteData(data.id)}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
