
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: '192.168.1.115',
			port: 25,
			auth: {
				user: 'in@quadrobit.com',
				pass: '09bgfuno54'
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
	}

	async sendResetPasswordLink(email: string, token: string): Promise<void> {
		const url = `https://sh.ext.quadrobit.com/resetpassword?token=${token}`;

		await this.transporter.sendMail({
			from: '"Quadrobit" <in@quadrobit.com>',
			to: email,
			subject: 'Reset Password',
			text: `Please click this link to reset your password: ${url}`,
			html: `<p>Please click this link to reset your password: <a href="${url}">${url}</a></p>`,
		});
	}

	async registrationCode(email: string, code: number): Promise<void> {
		await this.transporter.sendMail({
			from: '"Quadrobit" <in@quadrobit.com>',
			to: email,
			subject: 'Registration code',
			text: `Good day! Your Quadrobit account confirmation code: ${code}. The code is valid for 5 minutes. Do not share the code with unauthorized individuals.`,
			html: `<p>Good day! Your Quadrobit account confirmation code: ${code}. The code is valid for 5 minutes. Do not share the code with unauthorized individuals.</p>`,
		});
	}

	async sendEmailCode(email: string, code: number): Promise<void> {
		await this.transporter.sendMail({
			from: '"Quadrobit" <in@quadrobit.com>',
			to: email,
			subject: 'Change e-mail code',
			text: `Good day! Your Quadrobit e-mail confirmation code: ${code}. The code is valid for 5 minutes. Do not share the code with unauthorized individuals.`,
			html: `<p>Good day! Your Quadrobit e-mail confirmation code: ${code}. The code is valid for 5 minutes. Do not share the code with unauthorized individuals.</p>`,
		});
	}
}