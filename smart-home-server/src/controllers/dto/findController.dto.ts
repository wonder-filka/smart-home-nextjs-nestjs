import { IsNotEmpty } from 'class-validator'

export class FindControllerDto {
	@IsNotEmpty()
	readonly userId: number;
	readonly systemName: string;
}