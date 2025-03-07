export type JsonPrimitive = number | string | boolean | null;
export type JsonObject = { [key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> {}
export type JsonValue = JsonObject | JsonArray | JsonPrimitive;
export type SubstitutionFunc = (name: string) => Promise<string | undefined>;


/**
 * L'interface utilisée pour représenter la configuration statique lors de l'exécution.
 *
 * @public
 */
export type Config = {
  /**
   * S'abonne à l'objet de configuration afin de recevoir une notification 
   * chaque fois qu'une valeur de la configuration a changé.
   *
   * Cette méthode est facultative à implémenter 
   * vérifier si elle est implémentée avant de l'appeler.
   */
  subscribe?(onChange: () => void): {
    unsubscribe: () => void;
  };

  /**
   * Vérifie si la clé donnée est présente.
   */
  has(key: string): boolean;

  /**
   * Répertorie toutes les clés de configuration disponibles.
   */
  keys(): string[];

  /**
   * Identique à  `getOptional`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  get<T = JsonValue>(key?: string): T;

  /**
   * Lire toutes les données de configuration pour une key donnée.
   *
   * Usage of this method should be avoided as the typed alternatives provide
   * much better error reporting. The main use-case of this method is to determine
   * the type of a configuration value in the case where there are multiple possible
   * shapes of the configuration.
   */
  getOptional<T = JsonValue>(key?: string): T | undefined;

  /**
   * Identique à `getOptionalConfig`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  getConfig(key: string): Config;

  /**
   * Crée une sous-tableau d'objets de configuration.
   * La valeur de configuration à la position de la clé fournie doit être un objet.
   */
  getOptionalConfig(key: string): Config | undefined;

  /**
   * Identique à  `getOptionalConfigArray`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  getConfigArray(key: string): Config[];

  /**
   * Crée une sous-tableau d'objets de configuration.
   * La valeur de configuration à la position de la clé fournie doit être un tableau d'objets.
   */
  getOptionalConfigArray(key: string): Config[] | undefined;

  /**
   * Identique à  `getOptionalNumber`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  getNumber(key: string): number;

  /**
   * Lit une valeur de configuration à la clé fournie, renvoie un number.
   */
  getOptionalNumber(key: string): number | undefined;

  /**
   * Identique à `getOptionalBoolean`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  getBoolean(key: string): boolean;

  /**
   * Lit une valeur de configuration à la clé fournie, renvoie un booléen.
   */
  getOptionalBoolean(key: string): boolean | undefined;

  /**
   * Identique à `getOptionalString`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  getString(key: string): string;

  /**
   * Lit la valeur de key, et renvoie un string.
   */
  getOptionalString(key: string): string | undefined;

  /**
   * Identique à `getOptionalStringArray`, mais génère une erreur s'il n'y a pas de valeur pour la clé fournie.
   */
  getStringArray(key: string): string[];

  /**
   * Lit une valeur de configuration à la clé fournie, et renvoie tableau de chaînes.
   */
  getOptionalStringArray(key: string): string[] | undefined;
};


/**
 * Options de démarrage d'un serveur HTTP.
 *
 * @public
 */
export type HttpServerOptions = {
  listen: {
    port: number;
    host: string;
  };
  https?: {
    certificate: HttpServerCertificateOptions;
  };
};

/**
 * Options de configuration HTTPS pour un serveur HTTP.
 *
 * @public
 */
export type HttpServerCertificateOptions =
  | {
      type: 'pem';
      key: string;
      cert: string;
    }
  | {
      type: 'generated';
      hostname: string;
    };