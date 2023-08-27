'use client';
import Navbar from '@/components/navbar';
import { Heading } from '@/components/ui/heading';
import { useParams, useRouter } from 'next/navigation';

const DetailNota = () => {
  const params = useParams();
  const router = useRouter();
  return (
    <div className="max-h-screen h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between mb-4">
            <Heading
              title="Detail"
              description={`Detail dari nota: ${params.notaId}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNota;
