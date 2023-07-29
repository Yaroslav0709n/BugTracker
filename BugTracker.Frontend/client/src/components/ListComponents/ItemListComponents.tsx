import React from 'react';

interface ItemListProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
  key: string | undefined; 
}

const ItemListStyles = {
  padding: "10px",
  marginBottom: "10px",
  display: "flex",
  cursor: "pointer",
  width: "1050px", 
  borderRadius: "10px",
  transition: "0.3s",
  backgroundColor: "#DCDCDC",
};

const hoverStyles = {
  backgroundColor: "#F0E68C",
};

const ItemListComponents: React.FC<ItemListProps> = ({ onClick, children, key }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const mergedStyles = isHovered ? { ...ItemListStyles, ...hoverStyles } : ItemListStyles;

  return (
    <div
      onClick={onClick}
      key={key}
      style={mergedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default ItemListComponents;