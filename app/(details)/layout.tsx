import './print.module.css';

export const metadata = {
  title: 'Details Page',
  description: 'PDF page, details page, print page',
};

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
