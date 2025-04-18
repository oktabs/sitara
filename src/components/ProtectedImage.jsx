import React from "react";

const ProtectedImage = ({ src, alt, className }) => (
    <div
      className="relative"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none" }}
    >
      <img src={src} alt={alt} className={`${className} pointer-events-none`} draggable="false" />
      <div className="absolute inset-0 bg-transparent"></div>
    </div>
  );
  
export default ProtectedImage;