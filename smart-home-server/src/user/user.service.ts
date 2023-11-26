import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { updateUserDto } from './dto/updateUser.dto';
import { forgotPassDto } from './dto/forgotPass.dto';
import { ForgotResponseInterface } from './types/forgotResponse.interface';
import { resetPassDto } from './dto/resetPass.dto';
import { hash } from 'bcrypt';
import { isUserDto } from './dto/isUser.dto';
import { isUserInterface } from './types/isUser.interface';
import { UserConfirmationDto } from './dto/userConfirmation.dto';
import { LoginUserGoogleDto } from './dto/loginGoogle.dto';
import { ChangePassDto } from './dto/changePass.dto';
import { ChangeEmailDto } from './dto/changeEmail.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) { }


	async saveCodeEmailChange(id: number): Promise<UserEntity> {
		const user = await this.findById(id)
		console.log('user', user)
		if (!user) {
			throw new HttpException(
				'User doesn`t exist',
				HttpStatus.UNPROCESSABLE_ENTITY)
		} else {
			user.emailChangeCode = Math.round(Math.random() * (9999 - 1000) + 1000);
			console.log('user', user)
			return await this.userRepository.save(user)

		}
	}


	async saveNewEmai(changeEmailDto: ChangeEmailDto): Promise<UserEntity> {
		const user = await this.findById(changeEmailDto.id)
		if (changeEmailDto.code == user.emailChangeCode) {
			user.email = changeEmailDto.email
			user.emailChangeCode = null
			return await this.userRepository.save(user)
		}
	}




	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const userByEmail = await this.userRepository.findOne({
			where: { email: createUserDto.email }
		})
		if (userByEmail) {
			throw new HttpException(
				'Email are taken',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}

		const newUser = new UserEntity()
		newUser.registrationCode = Math.round(Math.random() * (9999 - 1000) + 1000);
		newUser.isConfirmed = false
		newUser.passwordExist = true
		newUser.mobile = null
		newUser.photo = ''
		Object.assign(newUser, createUserDto)
		return await this.userRepository.save(newUser)
	}

	async createUserGoogle(createUserDto: CreateUserDto): Promise<UserEntity> {
		const googleId = await this.userRepository.findOne({
			where: { googleId: createUserDto.googleId }
		})
		if (googleId) {
			throw new HttpException(
				'Google account is exist',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}

		const newUser = new UserEntity()
		newUser.isConfirmed = true
		newUser.passwordExist = false
		newUser.mobile = null
		Object.assign(newUser, createUserDto)
		return await this.userRepository.save(newUser)
	}


	async userConfirmation(userConfirmationDto: UserConfirmationDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				email: userConfirmationDto.email
			},
			select: ['id', 'email', 'firstname', 'lastname', 'emailChangeCode', 'mobile', 'photo', 'isConfirmed', 'registrationCode', 'passwordExist']
		})
		if (user.registrationCode !== Number(userConfirmationDto.code)) {
			throw new HttpException('Code are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
		}
		user.isConfirmed = true
		user.registrationCode = null
		Object.assign(user, userConfirmationDto)
		await this.userRepository.save(user)
		return user;
	}

	async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				email: loginUserDto.email
			},
			select: ['id', 'email', 'firstname', 'lastname', 'emailChangeCode', 'mobile', 'photo', 'password', 'isConfirmed', 'googleId', 'passwordExist']
		})

		if (!user) {
			throw new HttpException(
				'Credentials are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}

		const isPasswordCorrect = await compare(
			loginUserDto.password,
			user.password)
		if (!isPasswordCorrect) {
			throw new HttpException('Password are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
		}
		delete user.password;
		return user;
	}

	async changePass(changePassDto: ChangePassDto): Promise<boolean> {
		const user = await this.userRepository.findOne({
			where: {
				id: changePassDto.id,
			},
			select: ['id', 'password']
		})
		if (!user) {
			throw new HttpException(
				'Credentials are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}
		const isPasswordCorrect = await compare(
			changePassDto.password,
			user.password)
		if (!isPasswordCorrect) {
			throw new HttpException('Password are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
		} else {
			user.password = changePassDto.newPassword;
			user.passwordExist = true;
			await this.userRepository.save(user);
			return true;
		}
	}

	async loginGoogle(loginUserGoogleDto: LoginUserGoogleDto): Promise<UserEntity> {
		console.log('LoginUserGoogleDto', loginUserGoogleDto)
		const user = await this.userRepository.findOne({
			where: {
				googleId: loginUserGoogleDto.googleId,
			},
			select: ['id', 'email', 'firstname', 'lastname', 'emailChangeCode', 'mobile', 'photo', 'isConfirmed', 'googleId', 'passwordExist']
		})

		if (!user) {
			throw new HttpException(
				'Credentials are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}
		return user;
	}



	findById(id: number): Promise<UserEntity> {
		return this.userRepository.findOne({ where: { id } })
	}

	findByEmail(email: string): Promise<UserEntity> {
		return this.userRepository.findOne({ where: { email } })
	}

	findByPassToken(passwordResetToken: string): Promise<UserEntity> {
		return this.userRepository.findOne({ where: { passwordResetToken } })
	}

	async updateUser(userId: number, updateUserDto: updateUserDto): Promise<UserEntity> {
		const user = await this.findById(userId)
		Object.assign(user, updateUserDto)
		return await this.userRepository.save(user)
	}

	generateJwt(user: UserEntity): string {
		return sign({
			id: user.id,
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname
		}, JWT_SECRET)
	}

	buildUserResponse(user: UserEntity): UserResponseInterface {
		return {
			user: {
				...user,
				token: this.generateJwt(user)
			}
		}
	}

	async forgotPass(forgotPassDto: forgotPassDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				email: forgotPassDto.email,
			},
			select: ['id', 'email']
		})

		if (!user) {
			throw new HttpException(
				'Credentials are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY)
		}
		var crypto = require('crypto')
		const token: string = crypto.randomUUID()
		user.passwordResetToken = token;
		await this.userRepository.save(user)
		return user;
	}

	resetUserResponse(user: UserEntity): ForgotResponseInterface {
		return {
			user: {
				...user,
			}
		}
	}

	async resetPass(resetPassDto: resetPassDto): Promise<UserEntity> {
		let user = await this.findByPassToken(resetPassDto.passwordResetToken)
		Object.assign(user, resetPassDto)
		user.passwordResetToken = null;
		return await this.userRepository.save(user);
	}

	async isUser(isUserDto: isUserDto): Promise<isUserInterface> {
		const userByEmail = await this.userRepository.findOne({
			where: { email: isUserDto.email }
		})
		if (userByEmail) {
			return { isUser: true };
		} else {
			return { isUser: false };
		}
	}
}
