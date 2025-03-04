import { Config, JsonValue, JsonObject } from './types';


const CONFIG_KEY_PART_PATTERN = /^[a-z][a-z0-9]*(?:[-_][a-z][a-z0-9]*)*$/i;

function isObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function typeOf(value: JsonValue | undefined): string {
  if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  }
  const type = typeof value;
  if (type === 'number' && isNaN(value as number)) {
    return 'nan';
  }
  if (type === 'string' && value === '') {
    return 'empty-string';
  }
  return type;
}

// Separate out a couple of common error messages to reduce bundle size.
const errors = {
  type(key: string) {
    return `Invalid type in config for key '${key}' `;
  },
  missing(key: string) {
    return `Missing required config value at '${key}'`;
  },
  convert(key: string) {
    return `Unable to convert config value for key '${key}' `;
  },
};

export class ConfigReader implements Config {
  constructor(
    private readonly data: JsonObject | undefined,
  ) {}

  get<T = JsonValue>(key?: string): T {
    const value = this.readValue(key);
    if (value === undefined) {
      throw new Error(errors.missing(''));
    }
    return value as T;
  }

  getConfig(key: string): ConfigReader {
    const value = this.readValue(key);

    if (isObject(value)) {
      return this.copy(value);
    }
    
    if (value !== undefined) {
      throw new TypeError(
        errors.type(typeOf(value)),
      );
    }
    if (value === undefined) {
      throw new Error(errors.missing(''));
    }
    return value;
  }

  getConfigArray(key: string): ConfigReader[] {
    const value = this.readConfigValue<JsonObject[]>(key, values => {
      if (!Array.isArray(values)) {
        return { expected: 'object-array' };
      }

      for (const [index, value] of values.entries()) {
        if (!isObject(value)) {
          return { expected: 'object-array', value, key: `${key}[${index}]` };
        }
      }
      return true;
    });

    const configs = value?.map((obj) => this.copy(obj));

    if (configs === undefined) {
      throw new Error(errors.missing(''));
    }
    return configs;
  }

  getNumber(key: string): number {
    const value = this.readConfigValue<string | number>(
      key,
      val =>
        typeof val === 'number' ||
        typeof val === 'string' || { expected: 'number' },
    );

    if (typeof value === 'number') {
      return value ;
    }

    if (value === undefined) {
      throw new Error(errors.missing(''));
    }

    const number = Number(value);
    if (!Number.isFinite(number)) {
      throw new Error(
        errors.convert('number'),
      );
    }

    return number;
  }

  getBoolean(key: string): boolean {
    const value = this.readConfigValue<string | number | boolean>(
      key,
      val =>
        typeof val === 'boolean' ||
        typeof val === 'number' ||
        typeof val === 'string' || { expected: 'boolean' },
    );
    if (typeof value === 'boolean') {
      return value;
    }
    const valueString = String(value).trim();

    if (/^(?:y|yes|true|1|on)$/i.test(valueString)) {
      return true;
    }
    if (/^(?:n|no|false|0|off)$/i.test(valueString)) {
      return false;
    }

    if (value === undefined) {
      throw new Error(errors.missing(''));
    }
    
    throw new Error(errors.convert('boolean'));

    // return value;
  }



  getString(key: string): string {
    const value = this.readConfigValue(
      key,
      value =>
        (typeof value === 'string' && value !== '') || { expected: 'string' },
    ) as string;
    if (value === undefined) {
      throw new Error(errors.missing(''));
    }
    return value;
  }



  getStringArray(key: string): string[] {
    const value = this.readConfigValue(key, values => {
      if (!Array.isArray(values)) {
        return { expected: 'string-array' };
      }
      for (const [index, value] of values.entries()) {
        if (typeof value !== 'string' || value === '') {
          return { expected: 'string-array', value, key: `${key}[${index}]` };
        }
      }
      return true;
    }) as string[];

    if (value === undefined) {
      throw new Error(errors.missing(''));
    }
    return value;
  }

  private copy(data: JsonObject) {
    const reader = new ConfigReader(data);
    return reader;
  }

  private readConfigValue<T extends JsonValue>(
    key: string,
    validate: (
      value: JsonValue,
    ) => { expected: string; value?: JsonValue; key?: string } | true,
  ): T | undefined {
    const value = this.readValue(key);

    const result = validate(value!);
    if (result !== true) {
      const { value: theValue = value } = result;
      throw new TypeError(
        errors.type(typeOf(theValue)),
      );
    }
    return value as T;
  }

  private readValue(key?: string): JsonValue | undefined {
    const parts = key ? key.split('.') : [];
    for (const part of parts) {
      if (!CONFIG_KEY_PART_PATTERN.test(part)) {
        throw new TypeError(`Invalid config key '${key}'`);
      }
    }

    if (this.data === undefined) {
      return undefined;
    }

    let value: JsonValue | undefined = this.data;
    for (const [, part] of parts.entries()) {
      if (isObject(value)) {
        value = value[part];
      } else if (value !== undefined && value !== null) {
        throw new TypeError(
          errors.type(typeOf(value)),
        );
      }
    }

    return value;
  }
}
