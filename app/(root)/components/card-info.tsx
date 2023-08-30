'use client';

interface CardInfoProps {
  title: string;
  description: string | number;
  icon?: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, description, icon }) => {
  return (
    <div className="flex items-center justify-between col-span-3 dark:border shadow-md p-4 rounded-xl">
      <div>
        <h3 className="font-bold text-gray-700 dark:text-white text-lg">
          {title}
        </h3>
        <p className="text-gray-500 font-medium text-sm">{description}</p>
      </div>
      {/* <Annoyed /> */}
    </div>
  );
};

export default CardInfo;
