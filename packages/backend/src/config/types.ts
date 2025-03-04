export type JsonPrimitive = number | string | boolean | null;
export type JsonObject = { [key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> {}
export type JsonValue = JsonObject | JsonArray | JsonPrimitive;
export type SubstitutionFunc = (name: string) => Promise<string | undefined>;

export type Config = {

  /**
   * Le principal cas d'utilisation de cette méthode est de déterminer le type d'une valeur de 
   * configuration dans le cas où il existe plusieurs formes possibles de la configuration.
   */
  get<T = JsonValue>(key?: string): T;

  /**
   * Crée une sous-objet de l'objet de configuration.
   * La valeur de la clé fournie doit être un objet.
   */
  getConfig(key: string): Config;

  /**
   * Crée une sous-objet d'un tableau d'objets de configuration.
   * La valeur de la clé fournie doit être un tableau d'objets.
   */
  getConfigArray(key: string): Config[];

  /**
   * Lit une valeur de la clé donnée, et retourne un nombre.
   */
  getNumber(key: string): number;

  /**
   * Lit une valeur de la clé donnée, et retourne un boolean.
   */
  getBoolean(key: string): boolean;

  /**
   * Lit une valeur de la clé donnée, et retourne un string.
   */
  getString(key: string): string;

  /**
   * Lit une valeur de la clé donnée, et retourne un tableau de strings.
   */
  getStringArray(key: string): string[];

};
