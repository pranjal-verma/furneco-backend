import { DataSource, ConnectionOptions } from 'typeorm';
const myDataSource: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'your_password',
  database: 'test',
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
};
export default new DataSource(myDataSource);
