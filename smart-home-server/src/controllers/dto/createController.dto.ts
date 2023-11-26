import { IsNotEmpty } from 'class-validator'

export class CreateControllerDto {
	@IsNotEmpty()
	readonly userId: number;

	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly systemName: string;

	@IsNotEmpty()
	readonly status: boolean;

	@IsNotEmpty()
	readonly location: string;

	@IsNotEmpty()
	readonly guard: boolean;

}