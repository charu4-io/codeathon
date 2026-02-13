import React from "react";

interface ProblemCardProps {
  title: string;
  description: React.ReactNode;
  bgColor: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  description,
  bgColor,
}) => {
  return (
    <div
      className={`relative ${bgColor}
      w-96
  rounded-3xl pt-20 pb-10 px-8
  border-4 border-black
  shadow-[6px_6px_0px_black]
  text-center`}
    >
    

      {/* Spacing to prevent overlap */}
      <div className="mt-36">
        <h3 className="font-bold text-lg">
          {title}
        </h3>

        <div className="text-sm mt-4 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
