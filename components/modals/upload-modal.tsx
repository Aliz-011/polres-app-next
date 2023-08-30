'use client';

// library
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { collection, addDoc } from 'firebase/firestore';

// custom hooks
import { useUploadModal } from '@/hooks/use-upload-modal';
import { cn } from '@/lib/utils';
import db from '@/firebase';

// components
import { Modal } from '../ui/modal';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  notaDinas: z.string().min(5),
  dari: z.string().min(5),
  kepada: z.string().min(5),
  perihal: z.string().min(5),
  keterangan: z.string(),
  date: z.date({
    required_error: 'Tanggal harus dimasukkan.',
  }),
});

const UploadModal = () => {
  const { isOpen, onClose } = useUploadModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notaDinas: '',
      dari: '',
      kepada: '',
      keterangan: '',
      perihal: '',
      date: new Date(),
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // add data to database
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const docRef = await addDoc(collection(db, 'notaris'), { values });
      if (!docRef.id) throw Error('Data gagal dibuat');
      toast({
        title: `Data telah ditambahkan`,
      });
      onClose();
      form.reset({
        notaDinas: '',
        dari: '',
        kepada: '',
        keterangan: '',
        perihal: '',
        date: new Date(),
      });
    } catch (error) {
      toast({
        title: error as string,
      });
    }
  };

  const closeForm = () => {
    onClose();
    form.reset({
      notaDinas: '',
      dari: '',
      kepada: '',
      keterangan: '',
      perihal: '',
      date: new Date(),
    });
  };

  return (
    <Modal
      title="Tambah data"
      description="Buat atau tambah data baru."
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="notaDinas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nota Dinas</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor Nota dinas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="dari"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dari</FormLabel>
                    <FormControl>
                      <Input placeholder="Kapolsek Heram" {...field} />
                    </FormControl>
                    <FormDescription>
                      Darimana surat ini berasal
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kepada"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kepada</FormLabel>
                    <FormControl>
                      <Input placeholder="Kabag Ops" {...field} />
                    </FormControl>
                    <FormDescription>
                      Kepada siapa surat ini ditujukan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="perihal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perihal</FormLabel>
                  <FormControl>
                    <Input placeholder="Perihal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hari/Tanggal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan surat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Silahkan cantumkan keterangan dari isi surat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end">
              <Button variant="ghost" onClick={closeForm} type="button">
                Cancel
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default UploadModal;
