import { IsNotEmpty } from 'class-validator'

export class FindControllersDto {
	@IsNotEmpty()
	readonly userId: number;
}