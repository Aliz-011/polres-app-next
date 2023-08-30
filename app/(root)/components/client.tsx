'use client';

// react
import { useEffect, useState } from 'react';

// components
import HomeHeading from './home-heading';
import CardInfo from './card-info';
import { DataTable } from './data-table';
import RecentActivity from './recent-activity';
import Navbar from '@/components/navbar';
import { Separator } from '@/components/ui/separator';
import { Nota, NotaColumn, columns } from './columns';

// firebase
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '@/firebase';

const HomeClient = () => {
  const [data, setData] = useState<Nota[]>([]);
  const formattedNota: NotaColumn[] = data?.map((item) => ({
    id: item.id,
    dari: item.values.dari,
    kepada: item.values.kepada,
    notaDinas: item.values.notaDinas,
    perihal: item.values.perihal,
  }));

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'notaris'));
      let arr: Nota[] = [];
      const unsubscribe = onSnapshot(q, (qurySnapshot) => {
        qurySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            arr.push({ id: change.doc.id, ...change.doc.data() } as Nota);
          }
          if (change.type === 'modified') {
            arr.push({ id: change.doc.id, ...change.doc.data() } as Nota);
          }
          if (change.type === 'removed') {
            arr.push({ id: change.doc.id, ...change.doc.data() } as Nota);
          }
        });
        setData(arr);
      });

      return () => {
        unsubscribe();
      };
    };
    getData();
  }, [data]);
  return (
    <div className="relative">
      <img
        src="/polres_logo.jpeg"
        className="absolute inset-0 w-full h-full object-contain backdrop-blur-md"
        alt="Logo Background"
      />
      <div className="max-h-screen h-screen relative z-10 bg-white dark:bg-inherit bg-opacity-90 rounded-lg backdrop-blur-sm">
        <Navbar />
        <div className="max-w-5xl mx-auto relative">
          <div className="space-y-4 pt-6">
            <HomeHeading data={data} />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4 h-full">
            {/* card for info */}
            <CardInfo title="Nota tersimpan" description={data.length} />
            <CardInfo title="Products Sold" description="957000" />

            {/* table etx */}
            <div className="col-span-4 shadow-md dark:border p-4 rounded-xl h-full">
              <DataTable
                searchKey="notaDinas"
                columns={columns}
                data={formattedNota}
              />
            </div>

            <div className="col-span-2 shadow-md dark:border p-4 rounded-xl">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
