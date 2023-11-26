import { IsNotEmpty, IsEmail } from 'class-validator'

export class updateUserDto {
	readonly firstname: string;
	readonly lastname: string;
	readonly email: string;
	readonly googleId: string;
	readonly mobile: string;
	readonly photo: string;
}

