import { IsNotEmpty } from 'class-validator'

export class LoginUserGoogleDto {
	@IsNotEmpty()
	readonly googleId: string
}