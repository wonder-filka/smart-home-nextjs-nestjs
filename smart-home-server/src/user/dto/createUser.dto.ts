import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
	readonly firstname: string;
	readonly lastname: string;
	readonly googleId: string;
	readonly mobile: string;
	readonly photo: string;

	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	readonly password: string;
}