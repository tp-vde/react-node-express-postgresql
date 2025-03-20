import React, { createContext, useState, ReactNode } from 'react';

type AppContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const AppContext = createContext<AppContextType>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};