// Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Aquí puedes agregar elementos adicionales en el pie de página */}
      <p>&copy; {new Date().getFullYear()} Gym Box. Todos los derechos reservados.</p>
    </footer>
  );
};
