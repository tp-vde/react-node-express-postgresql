export type VersionedValue<Versions extends { [version: number]: unknown }> = {
  atVersion<Version extends keyof Versions>(
    version: Version,
  ): Versions[Version] | undefined;
};


export function createVersionedValueMap<
  Versions extends { [version: number]: unknown },
>(versions: Versions): VersionedValue<Versions> {
  Object.freeze(versions);
  const versionedValue: VersionedValue<Versions> = {
    atVersion(version) {
      return versions[version];
    },
  };
  Object.defineProperty(versionedValue, '$map', {
    configurable: true,
    enumerable: true,
    get() {
      return versions;
    },
  });
  return versionedValue;
}
