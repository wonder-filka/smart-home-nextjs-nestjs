import { DataSource } from 'typeorm';


export default new DataSource({
	type: 'mysql',
	host: process.env.DATABASE_HOST,
	port: 3306,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	connectTimeout: 30000,
	logging: true,
	charset: 'utf8mb4',
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: false,
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});

