import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControllersEntity } from './controllers.entity';
import { CreateControllerDto } from './dto/createController.dto';
import { FindControllersDto } from './dto/findControllers.dto';
import { FindControllerDto } from './dto/findController.dto';

@Injectable()
export class ControllersService {
	constructor(
		@InjectRepository(ControllersEntity)
		private readonly controlllerRepository: Repository<ControllersEntity>,
	) { }

	async findAll(findControllersDto: FindControllersDto): Promise<ControllersEntity[]> {
		return await this.controlllerRepository.find({
			where: { userId: findControllersDto.userId },
		});
	}

	async createController(createControllerDto: CreateControllerDto): Promise<ControllersEntity> {
		const controllerBySystemName = await this.controlllerRepository.findOne({
			where: {
				systemName: createControllerDto.systemName,
				userId: createControllerDto.userId,
			},
		})

		if (controllerBySystemName) {
			throw new HttpException(
				'Controller is exist',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}

		const newController = new ControllersEntity()
		Object.assign(newController, createControllerDto)
		return await this.controlllerRepository.save(newController)
	}


	async findController(findControllerDto: FindControllerDto): Promise<ControllersEntity> {
		const controllerData = await this.controlllerRepository.findOne({
			where: {
				userId: findControllerDto.userId,
				systemName: findControllerDto.systemName
			}
		})
		if (!controllerData) {
			throw new HttpException(
				'Controller doesn`t exist',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}
		return controllerData;
	}

	async editController(controllersEntity: ControllersEntity): Promise<ControllersEntity> {
		const controllerData = await this.controlllerRepository.findOne({
			where: {
				userId: controllersEntity.userId,
				systemName: controllersEntity.systemName
			}
		})
		if (!controllerData) {
			throw new HttpException(
				'Controller doesn`t exist',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}
		Object.assign(controllerData, controllersEntity)
		return await this.controlllerRepository.save(controllerData)
	}

	async deleteController(findControllerDto: FindControllerDto): Promise<boolean> {
		const controllerData = await this.controlllerRepository.findOne({
			where: {
				userId: findControllerDto.userId,
				systemName: findControllerDto.systemName
			}
		})
		if (!controllerData) {
			throw new HttpException(
				'Controller doesn`t exist',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}
		const controllerDelete = await this.controlllerRepository.delete(controllerData)
		if (controllerDelete) {
			return true
		} else {
			return false
		}

	}

}

