import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ControllersService } from './controllers.service';
import { ControllersEntity } from './controllers.entity';
import { CreateControllerDto } from './dto/createController.dto';
import { FindControllersDto } from './dto/findControllers.dto';
import { FindControllerDto } from './dto/findController.dto';

@Controller('')
export class ControllersController {
	constructor(
		private readonly controllersService: ControllersService,
	) { }

	@Post('controllers/all')
	async findAll(@Body('userId') findControllersDto: FindControllersDto): Promise<ControllersEntity[]> {
		const controllersList = await this.controllersService.findAll(findControllersDto)
		return controllersList;
	}

	@Post('controllers/add')
	async createController(@Body('controller') createControllerDto: CreateControllerDto
	): Promise<ControllersEntity> {
		const controller = await this.controllersService.createController(createControllerDto)
		return controller;
	}

	@Post('controllers/find')
	async findController(@Body('controller') findControllerDto: FindControllerDto): Promise<ControllersEntity> {
		const controllerData = await this.controllersService.findController(findControllerDto)
		return controllerData;
	}
	@Put('controllers/edit')
	async editController(@Body('controller') controllersEntity: ControllersEntity): Promise<ControllersEntity> {
		const controllerData = await this.controllersService.editController(controllersEntity)
		return controllerData;
	}

	@Post('controllers/delete')
	async controllerDelete(@Body('controller') findControllerDto: FindControllerDto): Promise<boolean> {
		const controllerDelete = await this.controllersService.deleteController(findControllerDto)
		if (controllerDelete === true) {
			return true
		} else {
			return false
		}
	}

}
