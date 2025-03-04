import path, { dirname, resolve as resolvePath } from 'path';
import fse from 'fs-extra';
import yaml from 'yaml';
import fs from 'fs';


/**
 * Une collection d'utilitaires pour travailler avec et créer {@link ConfigSource}s.
 *
 * @public
 */
class ConfigSources {

  static defaultForTargets() {

    const targetDir = fse.realpathSync(process.cwd()).replace(/^[a-z]:/, str => str.toLocaleUpperCase('en-US'));

    const rootDir = this.findRootPath(targetDir, path => {
              try {
                const content = fse.readFileSync(path, 'utf8');
                const data = JSON.parse(content);
                return Boolean(data.workspaces);
              } catch (error) {
                throw new Error(
                  `Failed to parse package.json file while searching for root, ${error}`,
                );
              }
            }) as string;

      const configPath = path.resolve(rootDir, "app-config.yaml");

      if (fse.pathExistsSync(configPath)) {
        const fileContents = fse.readFileSync(configPath, "utf8");
        const config = yaml.parse(fileContents);
        return config;
      }

  }

  static findRootPath(
    searchDir: string,
    filterFunc: (pkgJsonPath: string) => boolean,
  ): string | undefined {
    let path = searchDir;
  
    for (let i = 0; i <5; i++) {
      const packagePath = resolvePath(path, 'package.json');
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
      `Iteration limit reached when searching for root package.json at ${searchDir}`,
    );
  }

}

export default ConfigSources;