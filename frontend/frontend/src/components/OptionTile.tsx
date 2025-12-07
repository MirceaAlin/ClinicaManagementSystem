import React from "react";

interface OptionTileProps {
  label: string;
  onClick?: () => void;
}

const OptionTile: React.FC<OptionTileProps> = ({ label, onClick }) => (
  <div className="option-tile" onClick={onClick}>
    {label}
  </div>
);

export default OptionTile;
