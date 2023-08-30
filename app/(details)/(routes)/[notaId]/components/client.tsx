'use client';
// hooks
import db from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type NotaDetails = {
  id: string;
  values: Record<string, any>;
};

const DetailsClient = ({ id }: { id: string }) => {
  const [nota, setNota] = useState<NotaDetails>();

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, 'notaris', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error('Data not existed!');
        }

        setNota({ id: docSnap.id, ...docSnap.data() } as NotaDetails);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="relative">
      <img
        src="/polres_logo.jpeg"
        className="absolute inset-0 w-full h-full object-contain backdrop-blur-md"
        alt="Logo Background"
      />

      <div className="max-h-screen h-screen relative z-10 bg-white dark:bg-inherit bg-opacity-50 rounded-lg backdrop-blur-sm">
        <div className="max-w-5xl mx-auto relative pt-52">
          <div className="w-full flex flex-col gap-y-4 shadow p-6 rounded-xl">
            <div className="flex items-center gap-x-4">
              <h3 className="text-sm">Nomor Nota Dinas: </h3>
              <span className="font-bold ">{nota?.values.notaDinas}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <h3 className="text-sm">Dari: </h3>
              <span className="font-bold ">{nota?.values.dari}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <h3 className="text-sm">Perihal: </h3>
              <span className="font-bold ">{nota?.values.perihal}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <h3 className="text-sm">Kepada: </h3>
              <span className="font-bold ">{nota?.values.kepada}</span>
            </div>
            <div className="flex items-center gap-x-4">
              <h3 className="text-sm">Hari/Tanggal: </h3>
              <span className="font-bold ">
                {new Date(nota?.values.date.seconds * 1000).toLocaleDateString(
                  'id-ID',
                  {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                ) +
                  ' pada ' +
                  new Date(nota?.values.date.seconds).toLocaleTimeString(
                    'it-IT'
                  )}
              </span>
            </div>
            <div className="flex items-center gap-x-4">
              <h3 className="text-sm">Keterangan: </h3>
              <span className="font-bold ">{nota?.values.keterangan}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsClient;
