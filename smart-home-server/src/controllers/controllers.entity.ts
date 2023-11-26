import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'controllers' })
export class ControllersEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	name: string;

	@Column()
	systemName: string;

	@Column()
	status: boolean;

	@Column()
	location: string;

	@Column()
	guard: boolean;
}
