import React from "react";

export const MemeCard = ({ template, onClick }) => {
  return (
    <div className="memeImgHolder">
    <img
      style={{ width: 200 }}
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
    />
    </div>
  );
};