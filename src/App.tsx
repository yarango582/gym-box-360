import React from "react";
import { useMediaQuery } from "react-responsive";
import PCApp from "./DesktopApp";
import MobileApp from "./MobileApp";

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return <>{isMobile ? <MobileApp /> : <PCApp />}</>;
};

export default App;
