import { IsNotEmpty } from 'class-validator'


export class ChangePassDto {
	@IsNotEmpty()
	readonly id: number;

	@IsNotEmpty()
	readonly password: string;

	@IsNotEmpty()
	readonly newPassword: string;
}