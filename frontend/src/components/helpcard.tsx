import React from "react";

interface HelpCardProps {
  icon: string;
  title: string;
  description: string[];
  highlighted?: boolean;
}

const HelpCard: React.FC<HelpCardProps> = ({
  icon,
  title,
  description,
  highlighted = false,
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border-2
        ${highlighted ? "border-blue-500" : "border-black"}
        bg-[#F9B27D]
        px-6
        py-8
        text-center
        shadow-lg
        text-sm
        font-medium
        leading-relaxed
      `}
    >
      <h3 className="font-semibold mb-4">
        {icon} {title}
      </h3>

      <div className="space-y-3">
        {description.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default HelpCard;
