// Grid.tsx
import React from 'react';
import './custom.css'; // Import your CSS file

interface GridProps {
  children: React.ReactNode;
  gridTemplateAreas: string;
}

const Grid: React.FC<GridProps> = ({ children, gridTemplateAreas }) => (
  <div className="grid-container" style={{ gridTemplateAreas }}>
    {children}
  </div>
);

interface GridItemProps {
  area: string;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ area, children }) => (
  <div className="grid-item" style={{ gridArea: area }}>
    {children}
  </div>
);

export { Grid, GridItem };
