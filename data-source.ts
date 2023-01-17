import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '2312117n',
  database: 'twitter',
  entities: ['./dist/**/*.entity.js'],
  synchronize: false,
  logging: true,
  migrations: ['./dist/migrations/*.js'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dataSourceOptions);
