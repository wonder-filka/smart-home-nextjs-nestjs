import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersController } from './controllers.controller';
import { ControllersEntity } from './controllers.entity';
import { ControllersService } from './controllers.service';

@Module({
  imports: [TypeOrmModule.forFeature([ControllersEntity])],
  controllers: [ControllersController],
  providers: [ControllersService]
})
export class ControllersModule { }
