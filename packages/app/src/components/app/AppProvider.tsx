import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { LocalStorage } from './localStorage';

export type SidebarPinState = {
  isPinned: boolean;
  toggleSidebar: () => any;
};

const defaultSidebarPinStateContext = {
  isPinned: true,
  toggleSidebar: () => {},
};

export const AppContext = createContext<SidebarPinState>({
  isPinned: true,
  toggleSidebar: () => {},
});

export const AppProvider = (props:{ children: ReactNode }) => {
  const { children } = props;
  const [isPinned, setIsPinned] = useState(() =>
    LocalStorage.getSidebarPinState(),
  );

  useEffect(() => {
    LocalStorage.setSidebarPinState(isPinned);
  }, [isPinned]);
  
  const toggleSidebar = () => setIsPinned(!isPinned);

  return (
    <AppContext.Provider value={{ isPinned, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export function PinStateProvider(props: {
  children: ReactNode;
  value: SidebarPinState;
}) {
  const { children, value } = props;
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  );
}

export const useSidebarPinState = (): SidebarPinState => {
  const pinStateContext = defaultSidebarPinStateContext;
  if (pinStateContext === undefined) {
    throw new Error('No context found for version 1.');
  }

  return pinStateContext;
};