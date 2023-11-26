import { IsNotEmpty } from 'class-validator'


export class ChangeEmailDto {
	id: number;
	email: string;
	code: number;
}