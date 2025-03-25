import { createContext, useContext, Context } from 'react';
import { getOrCreateGlobalSingleton } from './globalObject';
import { createVersionedValueMap, VersionedValue } from './VersionedValue';


export function createVersionedContext<
  Versions extends { [version in number]: unknown },
>(key: string): Context<VersionedValue<Versions> | undefined> {
  return getOrCreateGlobalSingleton(key, () =>
    createContext<VersionedValue<Versions> | undefined>(undefined),
  );
}


export function useVersionedContext<
  Versions extends { [version in number]: unknown },
>(key: string): VersionedValue<Versions> | undefined {
  return useContext(createVersionedContext<Versions>(key));
}


export function createVersionedContextForTesting(key: string) {
  return {
    set(versions: { [version in number]: unknown }) {
      (globalThis as any)[`__@vde/${key}__`] = createContext(
        createVersionedValueMap(versions),
      );
    },
    reset() {
      delete (globalThis as any)[`__@vde/${key}__`];
    },
  };
}
