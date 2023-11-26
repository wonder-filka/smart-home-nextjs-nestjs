import { IsNotEmpty } from 'class-validator'


export class forgotPassDto {
	@IsNotEmpty()
	readonly email: string;
}