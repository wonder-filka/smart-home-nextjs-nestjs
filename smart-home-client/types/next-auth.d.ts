import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: number;
			email: string;
			firstname: string;
			lastname: string;
			isConfirmed: boolean
			name: string;
			sub: number;
			token: string;
			passwordExist: boolean;
			googleId: string;
			photo: string;
			mobile: string
		}
	}

	interface User {
		id: number;
		token: string;
		passwordExist: boolean;
		googleId: string;
		firstname: string;
		lastname: string;
		mobile: string;
		photo: string;
	}

	interface GoogleProfile {
		token: string;

	}

	interface Profile {
		given_name: string;
		family_name: string;
		at_hash: string;
		photo: string;
		mobile: string;
		picture: string;
	}
}