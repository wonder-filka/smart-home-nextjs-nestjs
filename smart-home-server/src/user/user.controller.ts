import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { Request } from 'express'
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { updateUserDto } from './dto/updateUser.dto';
import { EmailService } from '@app/email/email.service';
import { forgotPassDto } from './dto/forgotPass.dto';
import { ForgotResponseInterface } from './types/forgotResponse.interface';
import { resetPassDto } from './dto/resetPass.dto';
import { isUserDto } from './dto/isUser.dto';
import { isUserInterface } from './types/isUser.interface';
import { UserConfirmationDto } from './dto/userConfirmation.dto';
import { UserType } from './types/user.type';
import { LoginUserGoogleDto } from './dto/loginGoogle.dto';
import { ChangePassDto } from './dto/changePass.dto';
import { SendCodeEmailDto } from './dto/sendCodeEmail.dto';
import { ChangeEmailDto } from './dto/changeEmail.dto';

@Controller()
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly emailService: EmailService
	) { }

	@Post('users')
	@UsePipes(new ValidationPipe())
	async createUser(
		@Body('user') createUserDto: CreateUserDto
	): Promise<UserType> {
		const user = await this.userService.createUser(createUserDto);
		await this.emailService.registrationCode(user.email, user.registrationCode)
		delete user.registrationCode
		delete user.passwordResetToken
		// delete user.password
		return user;
	}

	@Post('users/google')
	@UsePipes(new ValidationPipe())
	async googleConfirm(
		@Body('user') createUserDto: CreateUserDto
	): Promise<UserResponseInterface> {
		const user = await this.userService.createUserGoogle(createUserDto);
		delete user.registrationCode
		delete user.passwordResetToken
		// delete user.password
		return this.userService.buildUserResponse(user)
	}

	@Post('users/confirm')
	@UsePipes(new ValidationPipe())
	async userConfirmation(
		@Body('user') userConfirmationDto: UserConfirmationDto
	): Promise<UserResponseInterface> {
		const user = await this.userService.userConfirmation(userConfirmationDto)
		console.log('user', user)
		return this.userService.buildUserResponse(user)
	}

	@Post('users/login')
	@UsePipes(new ValidationPipe())
	async login(@Body('user') loginUserDto: LoginUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.login(loginUserDto)
		console.log(user)
		return this.userService.buildUserResponse(user)
	}

	@Post('google/login')
	@UsePipes(new ValidationPipe())
	async loginGoogle(@Body('user') loginUserGoogleDto: LoginUserGoogleDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.loginGoogle(loginUserGoogleDto)
		console.log('userrrrrrr', user)
		return this.userService.buildUserResponse(user)
	}

	@Get('user')
	@UseGuards(AuthGuard)
	async currentUser(
		@User() user: UserEntity,
	): Promise<UserResponseInterface> {
		return this.userService.buildUserResponse(user)
	}

	@Put('user')
	@UseGuards(AuthGuard)
	async updateCurrentUser(
		@User('id') currentUserID: number,
		@Body('user') updateUserDto: updateUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.updateUser(
			currentUserID, updateUserDto,
		);
		return this.userService.buildUserResponse(user)

	}

	@Post('user/changepass')
	@UseGuards(AuthGuard)
	async updatePassUser(
		@Body('user') changePassDto: ChangePassDto,
	): Promise<boolean> {
		const user = await this.userService.changePass(changePassDto);
		return user;

	}

	@Post('user/emailcode')
	@UseGuards(AuthGuard)
	async getEmailCode(@Body('user') sendCodeEmailDto: SendCodeEmailDto): Promise<boolean> {
		const user = await this.userService.saveCodeEmailChange(sendCodeEmailDto.id)
		const email = await this.emailService.sendEmailCode(sendCodeEmailDto.email, user.emailChangeCode)
		if (user) {
			return true
		} else {
			return false
		}
	}

	@Post('user/save_email')
	@UseGuards(AuthGuard)
	async changeEmail(@Body('user') changeEmailDto: ChangeEmailDto): Promise<UserEntity> {
		const user = await this.userService.saveNewEmai(changeEmailDto)
		return user
	}

	@Post('forgotpassword')
	@UsePipes(new ValidationPipe())
	async forgotPassword(@Body('user') forgotPassDto: forgotPassDto): Promise<UserEntity> {
		const user = await this.userService.forgotPass(forgotPassDto);
		await this.emailService.sendResetPasswordLink(user.email, user.passwordResetToken)
		delete user.passwordResetToken;
		console.log('user', user);
		return user;
	}

	@Post('resetpassword')
	@UsePipes(new ValidationPipe())
	async resetPassword(@Body('user') resetPassDto: resetPassDto): Promise<UserEntity> {
		const user = await this.userService.resetPass(resetPassDto);
		return user;
	}

	@Post('isuser')
	@UsePipes(new ValidationPipe())
	async isuser(@Body('user') isUserDto: isUserDto,
	): Promise<isUserInterface> {
		const user = await this.userService.isUser(isUserDto)
		return user;
	}
}
