import React, { createContext, ReactNode, useContext } from 'react';
import { createVersionedContext } from './VersionedContext';
import { createVersionedValueMap } from './VersionedValue';


export type SidebarContextType = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export type SidebarOpenState = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const defaultSidebarOpenStateContext = {
  isOpen: false,
  setOpen: () => {},
};


export const LegacySidebarContext = createContext<SidebarContextType>(
  defaultSidebarOpenStateContext,
);

const VersionedSidebarContext = createVersionedContext<{
  1: SidebarOpenState;
}>('sidebar-open-state-context');


export function SidebarOpenStateProvider(props: {
  children: ReactNode;
  value: SidebarOpenState;
}) {
  const { children, value } = props;
  return (
    <LegacySidebarContext.Provider value={value}>
      <VersionedSidebarContext.Provider
        value={createVersionedValueMap({ 1: value })}
      >
        {children}
      </VersionedSidebarContext.Provider>
    </LegacySidebarContext.Provider>
  );
}


export const useSidebarOpenState = (): SidebarOpenState => {
  const versionedOpenStateContext = useContext(VersionedSidebarContext);
  const legacyOpenStateContext = useContext(LegacySidebarContext);

  if (versionedOpenStateContext === undefined) {
    return legacyOpenStateContext || defaultSidebarOpenStateContext;
  }

  const openStateContext = versionedOpenStateContext.atVersion(1);
  if (openStateContext === undefined) {
    throw new Error('No context found for version 1.');
  }

  return openStateContext;
};
