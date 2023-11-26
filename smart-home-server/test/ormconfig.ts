// import { DataSourceOptions } from 'typeorm';

// const config: DataSourceOptions = {
//   type: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   username: 'root',
//   password: 'Uridoz36!',
//   database: 'smart_home',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
// };

// export default config;

// import { DataSourceOptions } from 'typeorm';

// const config: DataSourceOptions = {
//   type: 'mysql',
//   host: '172.20.0.3',
//   username: 'root',
//   password: 'api-smart-home',
//   database: 'api123smart-home',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
// };

// export default config;

// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// const config: MysqlConnectionOptions = {
// 	type: 'mysql',
// 	host: 'localhost',
// 	port: 3306,
// 	username: 'root',
// 	password: 'Uridoz36!',
// 	database: 'smart_home',
// 	entities: [__dirname + '/**/*.entity{.ts,.js}'],
// 	synchronize: false,
// 	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
// };

// export default config;

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
	type: 'mysql',
	host: '172.20.0.2',
	port: 3306,
	username: 'root',
	password: 'api-smart-home',
	database: 'api123smart-home',
	connectTimeout: 30000,
	acquireTimeout: 30000,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: true,
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;