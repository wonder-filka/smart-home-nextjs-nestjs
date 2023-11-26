import { IsNotEmpty } from 'class-validator'


export class isUserDto {
	@IsNotEmpty()
	readonly email: string;
}