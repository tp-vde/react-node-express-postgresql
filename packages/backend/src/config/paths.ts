import path, { dirname, resolve as resolvePath } from "path";
import fse from "fs-extra";
import yaml from "yaml";
import fs from "fs";

/**
 * Une collection d'utilitaires pour travailler avec et créer {@link fileConfig}s.
 *
 * @public
 */

export function fileConfig() {
  const targetDir = fse
    .realpathSync(process.cwd())
    .replace(/^[a-z]:/, (str) => str.toLocaleUpperCase("en-US"));
  const rootDir = findRootPath(targetDir, (path) => {
    try {
      const content = fse.readFileSync(path, "utf8");
      const data = JSON.parse(content);
      return Boolean(data.workspaces);
    } catch (error) {
      throw new Error(
        `Failed to parse package.json file while searching for root, ${error}`
      );
    }
  }) as string;

  let targetRoot = "";
  const getTargetRoot = () => {
    const existsApp = fs.existsSync(resolvePath(targetDir, "app-config.yaml"));
    if (!targetRoot) {
      targetRoot = existsApp ? targetDir : findRootPath(targetDir, (path) => {
          try {
            const content = fs.readFileSync(path, "utf8");
            const data = JSON.parse(content);
            return Boolean(data.workspaces);
          } catch (error) {
            throw new Error(
              `Failed to parse package.json file while searching for root, ${error}`
            );
          }
        }) as string;
    }
    return targetRoot;
  };
  
  const configPath = path.resolve(getTargetRoot(), "app-config.yaml");
  if (fse.pathExistsSync(configPath)) {
    const fileContents = fse.readFileSync(configPath, "utf8");
    const config = yaml.parse(fileContents);
    return config;
  }
}

export function findRootPath(
  searchDir: string,
  filterFunc: (pkgJsonPath: string) => boolean
): string | undefined {
  let path = searchDir;

  for (let i = 0; i < 5; i++) {
    const packagePath = resolvePath(path, "package.json");
    const exists = fs.existsSync(packagePath);
    if (exists && filterFunc(packagePath)) {
      return path;
    }
   
    const newPath = dirname(path);
    if (newPath === path) {
      return undefined;
    }
    path = newPath;
  }

  throw new Error(
    `Iteration limit reached when searching for root package.json at ${searchDir}`
  );
}
