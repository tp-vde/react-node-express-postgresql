import knex from 'knex';
import knexConfig from './utils/knexConnect';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

export default knex(config);