'use client';

interface HeadingProps {
  title: string;
  description?: string;
  total?: number;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  total,
  description,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">
        {title}&nbsp;
        {total ? <span>({total})</span> : ''}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
