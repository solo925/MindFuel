import React from "react";

interface HabitCardProps {
  title: string;
  description: string;
  image: string;
  progress: string;
}

const HabitCard: React.FC<HabitCardProps> = ({
  title,
  description,
  image,
  progress,
}) => {
  return (
    <div className="flex items-center border rounded-lg p-5 shadow-sm">
      <img
        src={image}
        alt={title}
        className="w-28 h-20 object-cover rounded-lg mr-4"
      />
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-gray-500 text-sm">Completed {progress} today.</p>
      </div>
    </div>
  );
};

export default HabitCard;
