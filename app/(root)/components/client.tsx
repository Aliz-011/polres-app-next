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
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import db from '@/firebase';

const HomeClient = () => {
  const [data, setData] = useState<Nota[]>([]);
  const formattedNota: NotaColumn[] = data?.map((item) => ({
    id: item.id,
    dari: item.values.dari,
    kepada: item.values.kepada,
    notaDinas: item.values.notaDinas,
  }));

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'notaris'));
      const querySnapshot = await getDocs(q);
      const arr: Nota[] = [];
      querySnapshot.forEach((doc) =>
        arr.push({ id: doc.id, ...doc.data() } as Nota)
      );
      setData(arr);
    };
    getData();
  }, []);
  return (
    <div className="max-h-screen h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 pt-6">
          <HomeHeading data={data} />
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
          {/* card for info */}
          <CardInfo title="Nota tersimpan" description={data.length} />
          <CardInfo title="Products Sold" description="957000" />

          {/* table etx */}
          <div className="col-span-4 shadow-md dark:border p-4 rounded-xl">
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
  );
};

export default HomeClient;
