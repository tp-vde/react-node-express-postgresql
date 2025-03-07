import { Config, HttpServerOptions } from './types';

const DEFAULT_PORT = 7007;
const DEFAULT_HOST = '';

/**
 * Reads {@link HttpServerOptions} from a {@link @backstage/config#Config} object.
 *
 * @public
 * @remarks
 *
 * La configuration fourni doit contenir directement les clés « listen » et supplémentaires.
 *
 * @example
 * ```ts
 * const opts = readHttpServerOptions(config.getConfig('backend'));
 * ```
 */
export function readHttpServerOptions(config?: Config): HttpServerOptions {
  return {
    listen: readHttpListenOptions(config),
    https: readHttpsOptions(config),
  };
}

function readHttpListenOptions(config?: Config): HttpServerOptions['listen'] {
  const listen = config?.getOptional('listen');
  if (typeof listen === 'string') {
    const parts = String(listen).split(':');
    const port = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(port)) {
      if (parts.length === 1) {
        return { port, host: DEFAULT_HOST };
      }
      if (parts.length === 2) {
        return { host: parts[0], port };
      }
    }
    throw new Error(
      `Unable to parse listen address ${listen}, expected <port> or <host>:<port>`,
    );
  }

  // Workaround to allow empty string
  const host = config?.getOptional('listen.host') ?? DEFAULT_HOST;
  if (typeof host !== 'string') {
    config?.getString('listen.host'); 
    throw new Error('unreachable');
  }

  return {
    port: config?.getNumber('listen.port') ?? DEFAULT_PORT,
    host,
  };
}

function readHttpsOptions(config?: Config): HttpServerOptions['https'] {
  const https = config?.getOptional('https');
  if (https === true) {
    const baseUrl = config!.getString('baseUrl');
    let hostname;
    try {
      hostname = new URL(baseUrl).hostname;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error(`Invalid baseUrl "${baseUrl}"`);
    }

    return { certificate: { type: 'generated', hostname } };
  }

  const cc = config?.getOptionalConfig('https');
  if (!cc) {
    return undefined;
  }

  return {
    certificate: {
      type: 'pem',
      cert: cc.getString('certificate.cert'),
      key: cc.getString('certificate.key'),
    },
  };
}