import React from "react";
import { Link } from "react-router-dom";

interface WidgetProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  link?: string;
  className?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, icon, content, link, className }) => {
  return (
    <div className={`bg-white rounded-md shadow-md p-6 ${className || ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl text-blue-500 mr-2">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">{content}</div>
        {link && (
          <Link to={link} className="text-blue-500 hover:underline">
            View More
          </Link>
        )}
      </div>
    </div>
  );
};

export default Widget;
