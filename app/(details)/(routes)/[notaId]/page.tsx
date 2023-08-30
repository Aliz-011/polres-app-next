import DetailsClient from './components/client';

export default async function DetailNota({
  params,
}: {
  params: { notaId: string };
}) {
  return (
    <>
      <DetailsClient id={params.notaId} />
    </>
  );
}
