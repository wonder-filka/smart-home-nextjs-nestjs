import { IsNotEmpty } from 'class-validator'


export class resetPassDto {
	readonly password: string;
	readonly passwordResetToken: string;
}