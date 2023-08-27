import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import db from '@/firebase';

type Nota = {
  notaDinas: string;
  dari: string;
  kepada: string;
  perihal: string;
  keterangan: string;
  date: Date;
};

export const addCategory = async (values: Nota) => {
  try {
    await addDoc(collection(db, 'nota'), values);
  } catch (err) {
    console.error(err);
  }
};

export const getProducts = async (setProducts: any) => {
  try {
    const unsub = onSnapshot(collection(db, 'nota'), (doc) => {
      const docs: any = [];
      doc.forEach((d: any) => {
        docs.unshift({ ...d.data(), id: d.id });
      });
      setProducts(docs);
    });
  } catch (err) {
    console.error(err);
    setProducts([]);
  }
};
